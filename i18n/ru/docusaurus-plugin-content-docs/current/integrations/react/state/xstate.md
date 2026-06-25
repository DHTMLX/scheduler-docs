--- 
title: React Scheduler - XState Руководство 
sidebar_label: XState 
description: "Интегрируйте React Scheduler с XState. Рассматриваются моделирование состояния планировщика в машине состояний, обработка CRUD через data.save и добавление undo/redo + пользовательской навигации." 
--- 

# React Scheduler - XState Руководство

Это руководство показывает, как подключить **DHTMLX React Scheduler** к машине состояний **XState**. Вы будете хранить события и состояние UI (view/date/config) в машине, направлять редактирования Scheduler через `data.save`, и добавлять **undo/redo** на основе истории-снимков.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/react-scheduler-xstate-starter).
::: 

## Требования

- Node.js (рекомендуется LTS)
- Основы React + TypeScript
- Основы XState (машины, события, действия). Если нужно освежить память, см. документацию XState: https://stately.ai/docs/xstate

## Быстрая настройка - создание проекта

Создайте проект Vite + React + TS:

~~~bash
npm create vite@latest scheduler-xstate-demo -- --template react-ts
cd scheduler-xstate-demo
npm install
~~~

Установите привязки XState + React:

~~~bash
npm install xstate @xstate/react
~~~

Установите Material UI (используется для панели инструментов в демо):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Установка React Scheduler

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом руководстве мы используем пакет оценки:

```bash
npm install @dhtmlx/trial-react-scheduler
```

или

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортах.

Запустите сервер разработки:

~~~bash
npm run dev
~~~

:::note
Чтобы Scheduler занимал всю страницу, удалите дефолтные стили из `src/App.css` и добавьте:

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
  
## Настройка образца данных

Создайте `src/seed/data.ts` с несколькими событиями и начальным UI-состоянием. Обратите внимание, что `date` хранится как **число** (timestamp), чтобы контекст машины оставался сериализуемым.

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";
export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
  [key: string]: unknown;
}

export const seedEvents: SchedulerEvent[] = [
  { id: 1, classname: "blue", start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, classname: "violet", start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, classname: "blue", start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView: SchedulerView = "week";
~~~  

- `SchedulerEvent` использует индекатор сигнатуры, чтобы Scheduler мог добавлять дополнительные поля во время выполнения.

:::note
Сопутствующий демо-проект включает дополнительные события с цветовыми классами для более насыщенной визуализации.
:::

## Настройка машины XState

Создайте файл `src/machine.ts`. Эта машина хранит:

- `events` (данные Scheduler)
- `date` (как timestamp)
- `view` (`day | week | month`)
- `config` (конфигурация Scheduler)
- `past` / `future` (массивы снимков для undo/redo)

Undo/redo интегрированы напрямую в машину с использованием снимков. Перед каждым действием, модифицирующим данные, `saveToHistory` сохраняет снимок текущих событий, вида и даты. Переходы `undo` и `redo` меняют текущее состояние на снимок из истории.

~~~ts title="src/machine.ts"
import { createMachine, assign } from "xstate";
import {
  seedEvents,
  seedView,
  seedDate,
  type SchedulerView,
  type SchedulerEvent,
  type SchedulerConfig,
} from "./seed/data";

export interface SchedulerMachineContext {
  events: SchedulerEvent[];
  view: SchedulerView;
  date: number;
  config: SchedulerConfig;
  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

interface SchedulerSnapshot {
  events: SchedulerEvent[];
  view: SchedulerView;
  date: number;
}

type SchedulerMachineEvent =
  | { type: "SET_VIEW"; view: SchedulerView }
  | { type: "SET_DATE"; date: number }
  | { type: "CREATE_EVENT"; event: SchedulerEvent }
  | { type: "UPDATE_EVENT"; event: SchedulerEvent }
  | { type: "DELETE_EVENT"; id: string | number }
  | { type: "UNDO" }
  | { type: "REDO" };

const deepClone = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const takeSnapshot = (ctx: SchedulerMachineContext): SchedulerSnapshot => ({
  events: deepClone(ctx.events),
  view: ctx.view,
  date: ctx.date,
});

export const schedulerMachine = createMachine({
  id: "scheduler",
  types: {
    context: {} as SchedulerMachineContext,
    events: {} as SchedulerMachineEvent,
  },
  context: {
    events: seedEvents,
    view: seedView,
    date: seedDate,
    config: {},
    past: [],
    future: [],
    maxHistory: 50,
  },
  initial: "ready",
  states: {
    ready: {
      on: {
        SET_VIEW: { actions: ['saveToHistory', 'setView'] },
        SET_DATE: { actions: ['saveToHistory', 'setDate'] },
        CREATE_EVENT: { actions: ['saveToHistory', 'createEvent'] },
        UPDATE_EVENT: { actions: ['saveToHistory', 'updateEvent'] },
        DELETE_EVENT: { actions: ['saveToHistory', 'deleteEvent'] },
        UNDO: {
          guard: ({ context }) => context.past.length > 0,
          actions: ['undo']
        },
        REDO: {
          guard: ({ context }) => context.future.length > 0,
          actions: ['redo']
        },
      }
    }
  },
},
  {
    actions: {
      saveToHistory: assign({
        past: ({ context }) => {
          const newPast = [...context.past, takeSnapshot(context)];
          if (newPast.length > context.maxHistory) {
            newPast.shift();
          }
          return newPast;
        },
        future: () => [],
      }),
      setView: assign({
        view: ({ event }) => (event as { type: "SET_VIEW"; view: SchedulerView }).view
      }),
      setDate: assign({
        date: ({ event }) => (event as { type: "SET_DATE"; date: number }).date
      }),
      createEvent: assign({
        events: ({ context, event }) => {
            const newId = `id_${Date.now()}`;
            const newEvent = { ...(event as { type: "CREATE_EVENT"; event: SchedulerEvent }).event, id: newId };
            return [...context.events, newEvent];
        }
      }),
      updateEvent: assign({
        events: ({ context, event }) =>
          context.events.map(ev =>
            String(ev.id) === String((event as { type: "UPDATE_EVENT"; event: SchedulerEvent }).event.id)
              ? { ...ev, ...(event as { type: "UPDATE_EVENT"; event: SchedulerEvent }).event }
              : ev
          )
      }),
      deleteEvent: assign({
        events: ({ context, event }) =>
          context.events.filter(ev => String(ev.id) !== String((event as { type: "DELETE_EVENT"; id: string | number }).id))
      }),
      undo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const previousState = context.past[context.past.length - 1];
        const newPast = context.past.slice(0, -1);
        const newFuture = [currentState, ...context.future];

        return {
          ...previousState,
          past: newPast,
          future: newFuture,
        };
      }),
      redo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const nextState = context.future[0];
        const newFuture = context.future.slice(1);
        const newPast = [...context.past, currentState];

        return {
          ...nextState,
          past: newPast,
          future: newFuture,
        };
      })
    }
  }
);
~~~  

На этом этапе машина обеспечивает:

- Единственный источник правды для пропсов Scheduler
- Undo/redo на основе снимков (история содержит копии, а не ссылки)
- Единичный событие `SET_DATE` — логика навигации (пред/следующая/сегодня) находится в компоненте

:::tip
Если вы целитесь только в современные браузеры, помощник `deepClone()` по умолчанию предпочитает `structuredClone()` и падает на JSON-клонование для устаревших окружений.
:::

## Построение компонента панели управления

Создайте `src/components/Toolbar.tsx`. Это небольшая панель MUI, которая:

- переключает представление (day/week/month)
- позволяет переходы prev/today/next
- поддерживает undo/redo с состоянием отключения, когда история пуста

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import React from 'react';
import type { SchedulerView } from "../seed/data";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: 'prev' | 'next' | 'today') => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({ currentView, currentDate, canUndo, canRedo, onUndo, onRedo, onNavigate, setView }: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map(l => (
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

## Подключение Scheduler к XState

Создайте `src/components/Scheduler.tsx`. Этот компонент:

- читает `events/view/date/config` из контекста машины XState
- предоставляет колбэк `data.save`, который отправляет события машине
- реализует undo/redo и навигацию
- скрывает встроенную панель навигации и использует вместо нее нашу собственную панель
- применяет цветовые классы через шаблон `event_class`

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";
import { useMachine } from "@xstate/react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import "./styles.css";
import Toolbar from "./Toolbar";
import { schedulerMachine } from "../machine";
import { type SchedulerView } from "../seed/data";

export default function DemoXStateScheduler() {
  const [state, send] = useMachine(schedulerMachine);

  const canUndo = state.context.past.length > 0;
  const canRedo = state.context.future.length > 0;
  const activeDate = useMemo(() => new Date(state.context.date), [state.context.date]);

  const templates = useMemo(() => ({
    event_class: (_start: Date, _end: Date, event: Record<string, unknown> | null) => {
      if (event == null) {
        return "";
      }
      if (typeof event.classname === "string") {
        return event.classname;
      }
      return "";
    }
  }), []);

  const data = useMemo(() => ({
    save: (entity: string, action: string, payload: Record<string, unknown>, id: string | number) => {
      if (entity !== "event") {
        return;
      }
      switch (action) {
        case "create":
          send({ type: "CREATE_EVENT", event: payload as never });
          break;
        case "update":
          send({ type: "UPDATE_EVENT", event: payload as never });
          break;
        case "delete":
          send({ type: "DELETE_EVENT", id });
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
      }
    }
  }), [send]);

  const handleDateNavigation = useCallback((action: 'prev' | 'next' | 'today') => {
    if (action === 'today') {
      send({ type: "SET_DATE", date: Date.now() })
      return;
    }
    const step = action === 'next' ? 1 : -1;
    const date = new Date(state.context.date);

    if (state.context.view === "day") {
      date.setDate(date.getDate() + step);
    } else if (state.context.view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    send({ type: "SET_DATE", date: date.getTime() })
  }, [state.context.date, state.context.view, send]);

  const handleUndo = useCallback(() => send({ type: "UNDO" }), [send]);
  const handleRedo = useCallback(() => send({ type: "REDO" }), [send]);
  const handleSetView = useCallback((view: SchedulerView) => send({ type: "SET_VIEW", view: view }), [send]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={state.context.view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />
      <ReactScheduler
        events={state.context.events}
        view={state.context.view}
        date={activeDate}
        xy={memoizedXY}
        config={state.context.config}
        data={data}
        templates={templates}
      />
    </div>
  );
}
~~~ 

Некоторые детали, на которые стоит обратить внимание:

- Контекст машины является единственным источником правды для `events`, `view` и `date`.
- Обработчик `data.save` преобразует изменения Scheduler, зависящие от сущности, в события машины.
- Мы скрываем встроенную панель навигации Scheduler (`xy={{ nav_height: 0 }}`) и заменяем ее собственной панелью.
- Шаблон `event_class` читает поле `classname` у каждого события и применяет его как CSS-класс.

## Стили цветов событий

Создайте файл `src/components/styles.css` с CSS-классами, которые соответствуют значениям `classname` в исходных данных. Шаблон `event_class` применяет эти классы к каждому элементу события.

~~~css title="src/components/styles.css"
/*
  Окраска событий.
  Scheduler применяет значение, возвращаемое из templates.event_class, к контейнеру события.
  В исходных данных используется `classname`, поэтому мы сопоставляем его через шаблон и стилизуем классы здесь.
*/

.blue {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
  color: #ffffff !important;
}

.green {
  background: #22c55e !important;
  border-color: #16a34a !important;
  color: #ffffff !important;
}

.violet {
  background: #a855f7 !important;
  border-color: #9333ea !important;
  color: #ffffff !important;
}

.yellow {
  background: #f59e0b !important;
  border-color: #d97706 !important;
  color: #111827 !important;
}
~~~ 

## Интеграция Scheduler в приложение

Обновите `src/App.tsx` и `src/App.css`:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
      <Scheduler/>
    );
}
export default App;
~~~

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Итоги

Теперь React Scheduler полностью управляется XState:

- Scheduler читает `events`, `view`, `date` и `config` из контекста машины XState
- Редактирования пользователя маршрутизируются через `data.save` -> события машины для CRUD
- UI синхронизирован благодаря тому, что Scheduler получает обновленное состояние через пропсы
- Undo/redo реализованы через историю-снимков с использованием условий `guard`
- Пользовательская панель инструментов обеспечивает переключение представления, навигацию по дате и undo/redo с отключением

## Что дальше

- Пересмотрите концепции, лежащие в основе этого примера, в [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- Изучите конфигурацию Scheduler и_options для templating в [Обзор React Scheduler](integrations/react/overview.md)
- Добавьте персистентность (загрузку/сохранение событий через API) путем отправки асинхронных событий в машину
- Рассмотрите тот же паттерн с другими менеджерами состояния:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
  - [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)
  - [Использование React Scheduler с Jotai](integrations/react/state/jotai.md)
  - [Использование React Scheduler с Valtio](integrations/react/state/valtio.md)