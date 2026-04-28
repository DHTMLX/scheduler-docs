---
sidebar_label: Valtio
title: Использование React Scheduler с Valtio
description: Управляйте состоянием React Scheduler с помощью прокси-хранилища Valtio, применяйте правки пользователей через data.save и добавляйте откат/повтор на основе снимков.
---

# Учебник React Scheduler и Valtio

В этом руководстве показано, как отрисовать **React Scheduler** в приложении на Vite + React + TypeScript и управлять его состоянием с помощью **Valtio**. Вы будете хранить события, текущую дату и активный просмотр в прокси-хранилище Valtio, а затем направлять правки пользователей через колбэк Scheduler`а `data.save`.

К концу руководства у вас будет Scheduler со следующим функционалом:

- многофункциональная панель инструментов (переключатель вида, навигация по дате, отмена/повтор, переключатель режима только чтения)
- управляемая хранилищем CRUD-событий (создание/обновление/удаление)
- откат/повтор на основе снимков (события + конфигурация)

:::note
Полный исходный код доступен [на GitHub](https://github.com/nicetip/react-scheduler-valtio-starter).
:::

## Требования

- основы React + TypeScript
- основы Vite
- базовое понимание Valtio
- Рекомендуется: ознакомиться с привязкой данных в React Scheduler и `data.save` в [документации React Scheduler: Привязка данных](integrations/react/state/state-management-basics.md)

## Создание проекта

Создайте проект на Vite + React + TypeScript:

~~~bash
npm create vite@latest scheduler-valtio-demo -- --template react-ts
cd scheduler-valtio-demo
~~~

## Установка зависимостей

В этом руководстве используются:

- **Valtio** для управления состоянием
- **Material UI** для панели инструментов

Установите пакеты:

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

Если вы используете Yarn:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

## Установка React Scheduler

Установите React Scheduler согласно руководству по установке [React Scheduler installation guide](integrations/react/installation.md).

В этом руководстве используется evaluative-пакет:

```bash
npm install @dhtmlx/trial-react-scheduler
```

или

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Если вы already используете Professional-пакет, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортах.

## Подготовка стилей приложения

React Scheduler ожидает родительский контейнер с детерминированной высотой. Замените стандартные стили в `src/App.css` на:

~~~css title="src/App.css"
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Добавление начальных данных

Создайте `src/seed/data.ts` с небольшим набором данных и значениями по умолчанию для вида/даты:

~~~ts title="src/seed/data.ts"
export const seedEvents = [
  {
    id: 1,
    start_date: "2025-08-11T02:00:00Z",
    end_date: "2025-08-11T10:20:00Z",
    text: "Product Strategy Hike",
  },
  {
    id: 2,
    start_date: "2025-08-12T06:00:00Z",
    end_date: "2025-08-12T11:00:00Z",
    text: "Tranquil Tea Time",
  },
  {
    id: 3,
    start_date: "2025-08-15T03:00:00Z",
    end_date: "2025-08-15T08:00:00Z",
    text: "Demo and Showcase",
  },
  {
    id: 4,
    start_date: "2025-08-12T11:30:00Z",
    end_date: "2025-08-12T19:00:00Z",
    text: "Sprint Review and Retreat",
  },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");

export type SchedulerView = "day" | "week" | "month";
export const seedView: SchedulerView = "week";
~~~

:::note
Сопроводительная демо-страница содержит дополнительные события для более богатой визуализации.
:::

## Создание хранилища Valtio

Создайте `src/store.ts`. Это хранилище содержит:

- `events` (массив событий, передаваемый в Scheduler)
- `currentDate` и `view` (также передаваемые как пропсы)
- `config` (конфигурационный объект Scheduler, включая `readonly`)
- `_past` / `_future` стеки для истории undo/redo

Ключевая особенность — история на основе снимков: мы сохраняем глубокие копии снимков, чтобы undo/redo не держали ссылки на изменяемые массивы. Навигация (`setCurrentDate`/`setView`) намеренно не подлежит undo — только действия, изменяющие данные (CRUD, изменения конфигурации) добавляют в стек истории.

~~~ts title="src/store.ts"
import { proxy, snapshot } from "valtio";
import { seedEvents, seedView, seedDate, type SchedulerView } from "./seed/data";

export type SchedulerEvent = {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
  [key: string]: unknown;
};

export type SchedulerConfig = Record<string, unknown>;

type HistorySnapshot = {
  events: SchedulerEvent[];
  config: SchedulerConfig;
};

const deepClone = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const normalizeId = (value: unknown) => String(value);

export const createSchedulerStore = () => {
  const state = proxy({
    events: seedEvents as SchedulerEvent[],
    currentDate: seedDate as number,
    view: seedView as SchedulerView,
    config: {} as SchedulerConfig,

    // Undo/redo history stacks and capacity
    _past: [] as HistorySnapshot[],
    _future: [] as HistorySnapshot[],
    _cap: 50,
  });

  const getHistorySnapshot = (): HistorySnapshot => {
    const snap = snapshot(state);

    return {
      events: deepClone(snap.events as SchedulerEvent[]),
      config: deepClone(snap.config as SchedulerConfig),
    };
  };

  const recordHistory = () => {
    const snapshotItem = getHistorySnapshot();

    state._past = [...state._past.slice(-state._cap + 1), snapshotItem];
    state._future = [];
  };

  const actions = {
    updateEvent: (payload: Partial<SchedulerEvent> & { id?: string | number }) => {
      const payloadId = payload.id;

      if (payloadId === undefined || payloadId === null) {
        return;
      }

      recordHistory();
      const normalizedPayloadId = normalizeId(payloadId);

      state.events = state.events.map((eventItem) => {
        if (normalizeId(eventItem.id) !== normalizedPayloadId) {
          return eventItem;
        }

        return { ...eventItem, ...payload, id: eventItem.id };
      });
    },

    createEvent: (payload: Partial<SchedulerEvent>) => {
      recordHistory();

      const newEventId = `id_${Date.now().toString()}`;
      const newEvent = { ...payload, id: newEventId } as SchedulerEvent;

      state.events = [...state.events, newEvent];
      return newEvent;
    },

    deleteEvent: (id: string | number) => {
      recordHistory();
      const normalizedId = normalizeId(id);

      state.events = state.events.filter((eventItem) => {
        return normalizeId(eventItem.id) !== normalizedId;
      });
    },

    // Navigation is not an undoable user action in this demo.
    setCurrentDate: (date: number) => {
      state.currentDate = date;
    },

    // Navigation is not an undoable user action in this demo.
    setView: (view: SchedulerView) => {
      state.view = view;
    },

    updateConfig: (partial: Partial<SchedulerConfig>) => {
      recordHistory();
      state.config = { ...state.config, ...partial };
    },

    undo: () => {
      if (state._past.length === 0) return;

      const previous = state._past[state._past.length - 1];
      const current = getHistorySnapshot();

      state._past = state._past.slice(0, -1);
      state._future = [current, ...state._future];

      state.events = previous.events;
      state.config = previous.config;
    },

    redo: () => {
      if (state._future.length === 0) return;

      const next = state._future[0];
      const current = getHistorySnapshot();

      state._future = state._future.slice(1);
      state._past = [...state._past.slice(-state._cap + 1), current];

      state.events = next.events;
      state.config = next.config;
    },
  };

  return { state, actions };
};

export const schedulerStore = createSchedulerStore();
export default schedulerStore;
~~~

## Создание повторно используемой панели инструментов

Создайте `src/components/Toolbar.tsx`. Это небольшая панель MUI, которая позволяет:

- переключать вид (day/week/month)
- перемещаться назад/к сегодняшнему дню/вперед
- отменять/повторить
- переключать режим чтения

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

import type { SchedulerView } from "../seed/data";

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

## Отрисовка React Scheduler и подключение к Valtio

Создайте `src/components/Scheduler.tsx`. Этот компонент:

- подписывается на прокси Valtio через `useSnapshot`
- передает `events`, `date`, `view` и `config` как пропсы React Scheduler
- реализует `data.save` через мост-обработчик `switch/case`, который маршрутизирует изменения в действия хранилища
- обеспечивает работу undo/redo и переключатель конфигурации `readonly`
- скрывает встроенную навигационную панель и использует вместо нее пользовательскую панель инструментов

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";

// Trial import:
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro import:
// import ReactScheduler from "@dhx/react-scheduler";
// import "@dhx/react-scheduler/dist/react-scheduler.css";

import { useSnapshot } from "valtio";

import Toolbar from "./Toolbar";
import schedulerStore from "../store";
import type { SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";

export default function DemoValtioScheduler() {
  const snap = useSnapshot(schedulerStore.state);

  const canUndo = snap._past.length > 0;
  const canRedo = snap._future.length > 0;
  const isReadOnly = Boolean((snap.config as { readonly?: unknown }).readonly);

  const activeDate = useMemo(() => {
    return new Date(snap.currentDate);
  }, [snap.currentDate]);

  const handleSetCurrentDate = useCallback((date: number) => {
    schedulerStore.actions.setCurrentDate(date);
  }, []);

  const handleSetView = useCallback((view: SchedulerView) => {
    schedulerStore.actions.setView(view);
  }, []);

  const handleUndo = useCallback(() => {
    schedulerStore.actions.undo();
  }, []);

  const handleRedo = useCallback(() => {
    schedulerStore.actions.redo();
  }, []);

  const handleReadOnlyChange = useCallback((value: boolean) => {
    schedulerStore.actions.updateConfig({ readonly: value });
  }, []);

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        handleSetCurrentDate(Date.now());
        return;
      }

      const step = action === "next" ? 1 : -1;
      const date = new Date(snap.currentDate);

      if (snap.view === "day") {
        date.setDate(date.getDate() + step);
      } else if (snap.view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }

      handleSetCurrentDate(date.getTime());
    },
    [handleSetCurrentDate, snap.currentDate, snap.view]
  );

  // Мост между Scheduler и Valtio
  const dataBridge = useMemo(() => {
    return {
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
            return schedulerStore.actions.updateEvent(eventWithId);
          }
          case "create":
            return schedulerStore.actions.createEvent(payload as Omit<Partial<SchedulerEvent>, "id">);
          case "delete": {
            const deleteId =
              payload && typeof payload === "object"
                ? (payload as Record<string, unknown>).id ?? id
                : payload ?? id;
            if (deleteId == null) {
              console.warn("Delete called without an id", { payload, id });
              return;
            }
            return schedulerStore.actions.deleteEvent(deleteId as SchedulerEvent["id"]);
          }
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    };
  }, []);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      schedulerStore.actions.setView(nextView);
      schedulerStore.actions.setCurrentDate(date.getTime());
    },
    []
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={snap.view}
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
        events={snap.events}
        view={snap.view}
        date={activeDate}
        xy={memoizedXY} /* скрыть встроенный navbar */
        config={snap.config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Монтирование Scheduler

Обновите `src/App.tsx`:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Запуск приложения

Запустите сервер разработки:

~~~bash
npm run dev
~~~

или:

~~~bash
yarn dev
~~~

## Итоги

В этом руководстве вы:

- создали проект на Vite + React
- отобразили React Scheduler в детерминированном контейнере на всю доступную высоту
- смоделировали `events`, `view`, `currentDate` и `config` в одном прокси-хранилище Valtio
- реализовали откат/повтор на основе снимков с помощью стэков `_past`/`_future` (события + конфигурация)
- маршрутизировали все изменения Scheduler через `data.save` в действия хранилища
- добавили переключатель режима чтения, который блокирует редактирование Scheduler

Это сохраняет компонент Scheduler декларативным (состояние → пропсы), при этом хранилище обладает всей логикой мутации и истории.

## Что дальше

- Изучите две поддерживаемые модели привязки данных в [документации React Scheduler: Привязка данных](integrations/react/state/state-management-basics.md)
- Добавляйте собственные шаблоны и UI, используя проп `templates`
- Изучите ту же схему с другими менеджерами состояний:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
  - [Использование React Scheduler с XState](integrations/react/state/xstate.md)
  - [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)
  - [Использование React Scheduler с Jotai](integrations/react/state/jotai.md)