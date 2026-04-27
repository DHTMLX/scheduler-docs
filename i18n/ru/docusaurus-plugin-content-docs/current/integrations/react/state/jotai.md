---
title: React Scheduler - Руководство по Jotai
sidebar_label: Jotai
description: Узнайте, как интегрировать DHTMLX React Scheduler с Jotai, включая CRUD-событий, синхронизацию представления/даты, конфигурацию только для чтения и отмену/повтор.
---

# React Scheduler - Руководство по Jotai

Это руководство показывает, как подключить **DHTMLX React Scheduler** к хранилищу **Jotai**. Вы будете хранить события и состояние UI (представление/дата/конфигурация) в атомах, маршрутизировать правки Scheduler через `data.save` и добавить **undo/redo** с историей на основе снимков.

:::note
Полный исходный код доступен на GitHub: [GitHub](https://github.com/DHTMLX/react-scheduler-jotai-starter).
:::

## Предварительные требования

- Node.js (рекомендована версия LTS)
- Основы React + TypeScript
- Знакомство с атомами Jotai и `useAtom`/`useSetAtom`. Если нужен обзор, смотрите документацию Jotai: https://jotai.org/

## Быстрая настройка - создание проекта

Создайте проект на основе Vite + React + TypeScript:

~~~bash
npm create vite@latest scheduler-jotai-demo -- --template react-ts
cd scheduler-jotai-demo
npm install
~~~

Установите Jotai:

~~~bash
npm install jotai
~~~

Установите Material UI (используется в демо-панели инструментов):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Установка React Scheduler

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом руководстве мы используем пакет evaluation:

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

## Определение общих типов

Создайте `src/types.ts`. Эти типы используются в атомах и компонентах:

~~~ts
export type SchedulerView = "day" | "week" | "month";
export type SchedulerEventId = string | number;

export interface SchedulerEvent {
  id: SchedulerEventId;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler может добавлять дополнительные поля (например, пользовательские свойства). Сделайте демо допускающей.
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

## Настройка образца данных

Создайте `src/seed/data.ts` с несколькими событиями и исходным состоянием UI. Обратите внимание, что `seedDate` хранится как **число** (timestamp), чтобы состояние атомов оставалось сериализуемым.

~~~ts
import type { SchedulerEvent, SchedulerView } from "../types";

export const seedEvents: SchedulerEvent[] = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView: SchedulerView = "week";
~~~

:::note
Компаньон-демо включает дополнительные события для более насыщенной визуализации.
:::

## Создание атомов и действий Jotai

Создайте `src/schedulerAtoms.ts`. Эта настройка хранит:

- `events` (данные Scheduler)
- `currentDate` (timestamp)
- `view` (`day | week | month`)
- `config` (конфигурация Scheduler, включая `readonly`)
- `past` / `future` снимки для undo/redo

В этом примере undo/redo отслеживают только мутации событий и конфигурации. Навигация по дате и переключение вида не добавляются в историю.

~~~ts
import { atom } from "jotai";
import { seedDate, seedEvents, seedView } from "./seed/data";
import type {
  SchedulerConfig,
  SchedulerEvent,
  SchedulerEventId,
  SchedulerSnapshot,
  SchedulerView,
} from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;
}

export type SchedulerAction =
  | {
      type: "updateEvent";
      payload: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
    }
  | {
      type: "createEvent";
      payload: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>;
    }
  | { type: "deleteEvent"; payload: SchedulerEventId }
  | { type: "setCurrentDate"; payload: number }
  | { type: "setView"; payload: SchedulerView }
  | { type: "updateConfig"; payload: Partial<SchedulerConfig> }
  | { type: "undo" }
  | { type: "redo" };

const schedulerStateAtom = atom<SchedulerState>({
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView,
  config: {},
});

const pastAtom = atom<SchedulerSnapshot[]>([]);
const futureAtom = atom<SchedulerSnapshot[]>([]);
const MAX_HISTORY_SIZE = 50;

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

export const schedulerActionsAtom = atom(
  null,
  (get, set, action: SchedulerAction): SchedulerEvent | void => {
    const currentState = get(schedulerStateAtom);
    const past = get(pastAtom);
    const future = get(futureAtom);

    const pushHistory = () => {
      set(pastAtom, [...past.slice(-MAX_HISTORY_SIZE + 1), createSnapshot(currentState)]);
      set(futureAtom, []);
    };

    if (action.type === "setCurrentDate") {
      set(schedulerStateAtom, { ...currentState, currentDate: action.payload });
      return;
    }

    if (action.type === "setView") {
      set(schedulerStateAtom, { ...currentState, view: action.payload });
      return;
    }

    if (action.type === "createEvent") {
      pushHistory();
      const id = action.payload.id != null ? action.payload.id : `id_${Date.now().toString()}`;
      const newEvent: SchedulerEvent = { ...action.payload, id } as SchedulerEvent;

      set(schedulerStateAtom, {
        ...currentState,
        events: [...currentState.events, newEvent],
      });
      return newEvent;
    }

    if (action.type === "updateEvent") {
      const index = currentState.events.findIndex((event) => String(event.id) === String(action.payload.id));
      if (index === -1) return;

      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        events: [
          ...currentState.events.slice(0, index),
          { ...currentState.events[index], ...action.payload },
          ...currentState.events.slice(index + 1),
        ],
      });
      return;
    }

    if (action.type === "deleteEvent") {
      const exists = currentState.events.some((event) => String(event.id) === String(action.payload));
      if (!exists) return;

      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        events: currentState.events.filter((event) => String(event.id) !== String(action.payload)),
      });
      return;
    }

    if (action.type === "updateConfig") {
      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        config: { ...currentState.config, ...action.payload },
      });
      return;
    }

    if (action.type === "undo") {
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set(pastAtom, past.slice(0, -1));
      set(futureAtom, [createSnapshot(currentState), ...future]);
      set(schedulerStateAtom, {
        ...currentState,
        events: previous.events,
        config: previous.config,
      });
      return;
    }

    if (action.type === "redo") {
      if (future.length === 0) return;

      const next = future[0];
      set(futureAtom, future.slice(1));
      set(pastAtom, [...past, createSnapshot(currentState)]);
      set(schedulerStateAtom, {
        ...currentState,
        events: next.events,
        config: next.config,
      });
    }
  }
);

export const schedulerStateViewAtom = atom((get) => get(schedulerStateAtom));
export const canUndoAtom = atom((get) => get(pastAtom).length > 0);
export const canRedoAtom = atom((get) => get(futureAtom).length > 0);
~~~

## Построение панели управления

Создайте `src/components/Toolbar.tsx`. Эта панель будет:

- переключать представление (day/week/month)
- навигировать назад/сегодня/вперед
- undo/redo со статусами отключено
- переключать режим только чтения

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

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
        {(["day", "week", "month"] as const).map((label) => (
          <Button key={label} variant={currentView === label ? "contained" : "outlined"} onClick={() => setView(label)}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
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
              onChange={(event) => onReadOnlyChange?.(event.target.checked)}
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

## Подключение Scheduler к Jotai

Создайте `src/components/Scheduler.tsx`. Этот компонент:

- читает `events/view/currentDate/config` из атомов
- связывает CRUD Scheduler (`create/update/delete`) через `data.save`
- подключает undo/redo, навигацию и переключение режима только чтения
- скрывает встроенную панель навигации Scheduler и использует настраиваемую панель инструментов

~~~tsx
import { useCallback, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import {
  canRedoAtom,
  canUndoAtom,
  schedulerActionsAtom,
  schedulerStateViewAtom,
} from "../schedulerAtoms";
import type { SchedulerEvent, SchedulerEventId, SchedulerView } from "../types";

type SaveAction = "create" | "update" | "delete";
type SaveEntity = "event";

export default function DemoJotaiScheduler() {
  const state = useAtomValue(schedulerStateViewAtom);
  const dispatchAction = useSetAtom(schedulerActionsAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);

  const { events, view, currentDate, config } = state;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const setCurrentDate = useCallback(
    (dateMs: number) => dispatchAction({ type: "setCurrentDate", payload: dateMs }),
    [dispatchAction]
  );
  const setView = useCallback(
    (nextView: SchedulerView) => dispatchAction({ type: "setView", payload: nextView }),
    [dispatchAction]
  );
  const undo = useCallback(() => dispatchAction({ type: "undo" }), [dispatchAction]);
  const redo = useCallback(() => dispatchAction({ type: "redo" }), [dispatchAction]);
  const updateReadOnly = useCallback(
    (value: boolean) => dispatchAction({ type: "updateConfig", payload: { readonly: value } }),
    [dispatchAction]
  );

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        setCurrentDate(Date.now());
        return;
      }

      const step = action === "next" ? 1 : -1;
      const date = new Date(currentDate);

      if (view === "day") {
        date.setDate(date.getDate() + step);
      } else if (view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }

      setCurrentDate(date.getTime());
    },
    [currentDate, view, setCurrentDate]
  );

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  // Scheduler <-> Jotai data bridge
  const dataBridge = useMemo(
    () => ({
      save: (entity: SaveEntity, action: SaveAction, payload: unknown, id: unknown) => {
        if (entity !== "event") return;

        switch (action) {
          case "update": {
            const eventData =
              payload && typeof payload === "object" ? (payload as Partial<SchedulerEvent>) : ({} as Partial<SchedulerEvent>);
            const eventId = eventData.id ?? id;
            if (eventId == null) {
              console.warn("Update called without an id", { payload, id });
              return;
            }

            const updatedEvent = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
            dispatchAction({ type: "updateEvent", payload: updatedEvent });
            return updatedEvent;
          }
          case "create": {
            const eventData =
              payload && typeof payload === "object"
                ? (payload as Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>)
                : null;
            if (!eventData) {
              console.warn("Create called without event payload", { payload });
              return;
            }
            return dispatchAction({ type: "createEvent", payload: eventData });
          }
          case "delete": {
            const deleteId =
              payload && typeof payload === "object"
                ? ((payload as { id?: unknown }).id ?? id)
                : payload ?? id;

            if (deleteId == null) {
              console.warn("Delete called without an id", { payload, id });
              return;
            }

            dispatchAction({ type: "deleteEvent", payload: deleteId as SchedulerEventId });
            return deleteId;
          }
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    }),
    [dispatchAction]
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
        onUndo={undo}
        onRedo={redo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={updateReadOnly}
        setView={setView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY}
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Рендер Scheduler в приложении

Обновите `src/App.tsx`:

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Итого

Теперь у вас React Scheduler полностью управляется через Jotai:

- атомы Jotai держат `events`, `view`, `currentDate` и `config` как единственный источник правды
- правки Scheduler маршрутизируются через `data.save` к типизированным действиям Jotai
- undo/redo реализованы с использованием истории на основе снимков для мутаций событий/конфигурации
- переключатель конфигурации только для чтения позволяет заблокировать Scheduler от правок
- настраиваемая панель инструментов обрабатывает навигацию, переключение вида и элементы управления историей

## Что дальше

- Повторно изучите концепции, лежащие в основе этого примера, в разделе [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- Изучите конфигурацию Scheduler и варианты templating в [Обзор React Scheduler](integrations/react/overview.md)
- Добавьте сохранение данных, загружая/сохраняя события через API и отправляя действия атомов
- Исследуйте ту же схему с другими менеджерами состояний:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
  - [Использование React Scheduler с XState](integrations/react/state/xstate.md)
  - [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)
  - [Использование React Scheduler с Valtio](integrations/react/state/valtio.md)