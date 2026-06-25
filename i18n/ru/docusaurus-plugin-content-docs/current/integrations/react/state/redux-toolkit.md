---
title: React Scheduler — Руководство по Redux Toolkit
sidebar_label: Redux Toolkit
description: Узнайте, как интегрировать DHTMLX React Scheduler с Redux Toolkit, включая CRUD-операции над событиями, синхронизацию вида/даты, и undo/redo.
---

# React Scheduler — Руководство по Redux Toolkit

Это руководство показывает, как подключить **DHTMLX React Scheduler** к хранилищу **Redux Toolkit**. Вы будете хранить события и состояние интерфейса пользователя (вид/дата/конфигурация) в Redux, направлять редактирования Scheduler через `data.save`, и добавить **undo/redo** с помощью истории на основе снимков и переключателя **только для чтения**.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/react-scheduler-redux-starter).
:::

## Предварительные требования

- Node.js (рекомендуется LTS)
- Основы React + TypeScript
- Основы Redux (actions, reducers, store). Если нужен повтор, смотрите документацию Redux: https://redux.js.org/

## Быстрая настройка — создание проекта

Создайте проект на Vite + React + TS:

~~~bash
npm create vite@latest scheduler-redux-demo -- --template react-ts
cd scheduler-redux-demo
npm install
~~~

Установите Redux Toolkit + React Redux:

~~~bash
npm install @reduxjs/toolkit react-redux
~~~

Установите Material UI (используется для демо панели инструментов):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Установка React Scheduler

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом руководстве мы используем пакет пробной версии:

```bash
npm install @dhtmlx/trial-react-scheduler
```

или

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Если вы уже используете Professional-пакет, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортах.

Запустите dev-сервер:

~~~bash
npm run dev
~~~

:::note
Чтобы Scheduler занимал всю страницу, удалите стандартные стили из `src/App.css` и добавьте:

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}
~~~
:::

## Настройка хранилища Redux

Создайте `src/redux/store.ts`. Это подключает редуктор `scheduler` к хранилищу Redux:

~~~ts
import { configureStore } from "@reduxjs/toolkit";
import schedulerReducer from "./schedulerSlice";

export const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
~~~

## Определение общих типов

Создайте `src/redux/types.ts`. Эти типы общие для среза, действий и компонентов:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler может прикреплять дополнительные поля (например, произвольные пропсы). Оставим демо максимально разрешающим.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent` использует сигнатуру индекса, чтобы Scheduler мог добавлять дополнительные поля во время выполнения.
- `SchedulerSnapshot` фиксирует данные, необходимые для undo/redo (события + конфигурация).

## Настройка примерных данных

Создайте `src/seed/data.ts` со сверстанными событиями и начальным состоянием UI. Обратите внимание, что `currentDate` хранится как **число** (timestamp), чтобы состояние Redux оставалось сериализуемым.

~~~ts
export const seedEvents = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView = "week";
~~~

:::note
Сопутствующее демо включает дополнительные события для более насыщенной визуализации.
:::

## Определение действий Scheduler (создание/обновление/удаление)

Редактирования Scheduler будут маршрутизироваться через Redux-д.actions. Создайте `src/redux/actions.ts`.

Действие `createEvent` использует колбэк "prepare", чтобы сгенерировать стабильный ID (моделируя ID, возвращаемый бекендом). Мы также добавляем небольшого помощника (`dispatchAction`), который возвращает отправляемое полезное значение — это полезно, потому что `data.save` Scheduler может вернуть созданный/обновленный объект.

~~~ts
import { createAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import type { SchedulerEvent } from "./types";

// Симулируем получение ID от бекенда.
const generateId = () => `id_${Date.now().toString()}`;

export const createEvent = createAction(
  "schedulerDomain/createEvent",
  (eventData: Omit<Partial<SchedulerEvent>, "id">) => {
    const newEvent: SchedulerEvent = {
      ...(eventData as Omit<SchedulerEvent, "id">),
      id: generateId(),
    };
    return { payload: newEvent };
  }
);

export const deleteEvent = createAction(
  "schedulerDomain/deleteEvent",
  (id: SchedulerEvent["id"]) => ({ payload: id })
);

export const updateEvent = createAction(
  "schedulerDomain/updateEvent",
  (eventData: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => ({ payload: eventData })
);

// Helper function to dispatch an action and return its payload consistently
export function dispatchAction<Arg, Payload>(
  dispatch: Dispatch,
  actionCreator: (arg: Arg) => { type: string; payload: Payload },
  arg: Arg
): Payload {
  return dispatch(actionCreator(arg)).payload;
}
~~~

## Создание Redux-среза

Теперь создайте `src/redux/schedulerSlice.ts`. Этот срез хранит:

- `events` (данные Scheduler)
- `currentDate` (как timestamp)
- `view` (`day | week | month`)
- `config` (конфигурацию Scheduler, включая `readonly`)
- `past` / `future` (массивы снимков для undo/redo)

Undo/redo интегрированы непосредственно в срез с использованием снимков. Перед каждым изменением данных вызывается `pushHistory`, который сохраняет снимок текущих событий и конфигурации. Редюсеры `undo` и `redo` меняют текущее состояние на снимок из истории.

~~~ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { seedEvents, seedDate, seedView } from "../seed/data";
import { createEvent, deleteEvent, updateEvent } from "./actions";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

const deepCopy = <T,>(value: T): T => {
  // JSON-клон подходит для этого демо:
  // - события/конфигурации — обычные объекты
  // - нужно иммутабельные снимки для undo/redo
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

const pushHistory = (state: SchedulerState) => {
  state.past.push(createSnapshot(state));

  if (state.maxHistory > 0 && state.past.length > state.maxHistory) {
    state.past.shift();
  }

  state.future = [];
};

const initialState: SchedulerState = {
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView as SchedulerView,
  config: {},

  past: [],
  future: [],
  maxHistory: 50,
};

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    undo(state) {
      if (state.past.length === 0) return;

      const previous = state.past[state.past.length - 1];
      const newFuture = createSnapshot(state as SchedulerState);

      state.events = previous.events;
      state.config = previous.config;
      state.past = state.past.slice(0, -1);
      state.future = [newFuture, ...state.future];
    },
    redo(state) {
      if (state.future.length === 0) return;

      const next = state.future[0];
      const newPast = createSnapshot(state as SchedulerState);

      state.events = next.events;
      state.config = next.config;
      state.future = state.future.slice(1);
      state.past = [...state.past, newPast];
    },

    // Навигация не является undo-действием в этом демо.
    setCurrentDate(state, { payload }: PayloadAction<number>) {
      state.currentDate = payload;
    },
    setView(state, { payload }: PayloadAction<SchedulerView>) {
      state.view = payload;
    },

    updateConfig(state, { payload }: PayloadAction<Partial<SchedulerConfig>>) {
      pushHistory(state as SchedulerState);
      state.config = { ...state.config, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events.push(action.payload);
      })
      .addCase(deleteEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events = state.events.filter((e) => String(e.id) !== String(action.payload));
      })
      .addCase(updateEvent, (state, action) => {
        pushHistory(state as SchedulerState);

        const index = state.events.findIndex((e) => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload };
        }
      });
  },
});

export const { undo, redo, setCurrentDate, setView, updateConfig } = schedulerSlice.actions;
export default schedulerSlice.reducer;
~~~

## Построение компонента панели инструментов

Создайте `src/components/Toolbar.tsx`. Это небольшая панель инструментов Material UI для:

- переключения вида (day/week/month)
- перехода на предыдущий/сегодня/следующий
- undo/redo
- переключения режима только для чтения

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../redux/types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  isReadOnly,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
  onReadOnlyChange,
  setView,
}: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map((l) => (
          <Button key={l} variant={currentView === l ? "contained" : "outlined"} onClick={() => setView(l)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={!canUndo}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={!canRedo}>
            <RedoIcon />
          </Button>
        </ButtonGroup>

        <FormControlLabel
          label="Read-only"
          control={
            <Switch
              checked={isReadOnly}
              onChange={(e) => onReadOnlyChange?.(e.target.checked)}
              inputProps={{ "aria-label": "Toggle read-only" }}
            />
          }
        />
      </Stack>
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {new Date(currentDate)?.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>
          &nbsp;&lt;&nbsp;
        </Button>
        <Button onClick={() => onNavigate?.("today")}>
          Today
        </Button>
        <Button onClick={() => onNavigate?.("next")}>
          &nbsp;&gt;&nbsp;
        </Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Подключение Scheduler к Redux

Создайте `src/components/Scheduler.tsx`. Этот компонент:

- читает `events/view/currentDate/config` из плоского состояния Redux
- предоставляет обратный вызов `data.save`, который диспатчит Redux-акции
- возвращает созданные/обновленные сущности из `save`, чтобы Scheduler мог синхронизировать своё внутреннее учёт
- соединяет `undo/redo` и переключатель конфигурации `read-only`
- скрывает встроенную панель навигации и использует вместо неё пользовательскую панель инструментов

~~~tsx
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Пробная (Trial) версия импорта:
// import ReactScheduler from "@dhtmlx/trial-react-scheduler";
// import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Профессиональная версия импорта:
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { redo, setCurrentDate, setView, undo, updateConfig } from "../redux/schedulerSlice";
import { createEvent, updateEvent, deleteEvent, dispatchAction } from "../redux/actions";
import type { AppDispatch, RootState } from "../redux/store";
import type { SchedulerEvent, SchedulerView } from "../redux/types";

export default function ReactSchedulerReduxDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { past, future, events, view, currentDate, config } = useSelector((s: RootState) => s.scheduler);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
    if (action === "today") {
      dispatch(setCurrentDate(Date.now()));
      return;
    }

    const step = action === "next" ? 1 : -1;
    const date = new Date(activeDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [activeDate, view, dispatch]);

  // Мост Scheduler <-> Redux данных
  const dataBridge = useMemo(() => ({
    save: (entity: string, action: string, payload: unknown, id: unknown) => {
      if (entity !== "event") return;

      switch (action) {
        case "update": {
          const eventData = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
          const eventId = (eventData as Record<string, unknown>).id ?? id;
          if (eventId == null) {
            console.warn("Update called without an id", { payload, id });
            return;
          }

          const eventWithId = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
          return dispatchAction(dispatch, updateEvent, eventWithId);
        }
        case "create":
          return dispatchAction(dispatch, createEvent, payload as Omit<Partial<SchedulerEvent>, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return dispatchAction(dispatch, deleteEvent, deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [dispatch]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      dispatch(setView(nextView));
      dispatch(setCurrentDate(date.getTime()));
    },
    [dispatch]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => dispatch(setView(nextView)), [dispatch]);

  const handleUndo = useCallback(() => dispatch(undo()), [dispatch]);
  const handleRedo = useCallback(() => dispatch(redo()), [dispatch]);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => dispatch(updateConfig({ readonly: value })),
    [dispatch]
  );
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        isReadOnly={isReadOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={handleReadOnlyChange}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* скрыть встроенный navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Интеграция провайдера Redux

Наконец, оберните ваше приложение в провайдер Redux. Обновите `src/App.tsx`:

~~~tsx
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Scheduler />
    </Provider>
  );
}

export default App;
~~~

## Итоги

Теперь React Scheduler полностью управляется через Redux Toolkit:

- Scheduler читает `events`, `view`, `currentDate` и `config` из Redux
- изменения пользователя маршрутизируются через `data.save` → Redux-акции
- UI синхронизирован, потому что Scheduler получает обновлённые `events` через пропсы
- undo/redo реализованы через history на основе снимков, встроенную прямо в срез
- переключатель конфигурации read-only позволяет зафиксировать Scheduler от редактирования

## Что дальше

- Пересмотрите концепции, лежащие в основе этого примера, в [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- Изучите конфигурацию Scheduler и параметры шаблонов в [обзоре React Scheduler](integrations/react/overview.md)
- Добавьте персистенцию (загрузка/сохранение событий через API) через вызов асинхронных thunk-операций и обновление среза соответственно
- Исследуйте тот же подход с другими менеджерами состояния:
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)