---
title: React Scheduler — Руководство Zustand
sidebar_label: Zustand
description: Узнайте, как интегрировать DHTMLX React Scheduler с Zustand, включая операции CRUD над событиями, синхронизацию вида/даты и отмену/повтор действий.
---

# React Scheduler — Руководство Zustand

Это руководство показывает, как связать **DHTMLX React Scheduler** с хранилищем **Zustand**. Вы будете хранить события и состояние интерфейса пользователя (вид, дата, конфигурация) в Zustand, направлять правки Scheduler через `data.save` и добавлять **undo/redo** с помощью истории на основе снимков.

:::note
Полный исходный код [доступен на GitHub](https://github.com/DHTMLX/react-scheduler-zustand-starter).
:::

## Требования

- Node.js (рекомендуется LTS)
- Основы React + TypeScript
- Знакомство с хуками и селекторами Zustand. Если нужен обзор, см. документацию Zustand: https://zustand.docs.pmnd.rs/

## Быстрая настройка — создание проекта

Создайте проект на Vite + React + TS:

~~~bash
npm create vite@latest scheduler-zustand-demo -- --template react-ts
cd scheduler-zustand-demo
npm install
~~~

Установите Zustand:

~~~bash
npm install zustand
~~~

Установите Material UI (используется для панели инструментов демо):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Установка React Scheduler

Установите React Scheduler так, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом руководстве мы используем пакет trial:

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
Чтобы Scheduler занимал всю страницу, удалите базовые стили из `src/App.css` и добавьте:

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

Создайте `src/types.ts`. Эти типы используются совместно хранилищем и компонентами:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler может прикреплять дополнительные поля (например, пропсы). Держим демо достаточно гибким.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
}
~~~

- `SchedulerEvent` использует сигнатуру индекса, чтобы Scheduler мог добавлять дополнительные поля во время выполнения.
- `SchedulerSnapshot` фиксирует данные, необходимые для undo/redo (события).

## Настройка примерных данных

Создайте `src/seed/data.ts` с несколькими событиями и начальными данными UI. Обратите внимание, что `currentDate` хранится как **число** (timestamp), чтобы состояние хранилища оставалось сериализуемым.

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
Сопутствующая демонстрация включает дополнительные события для более насыщенной визуализации.
:::

## Создание хранилища Zustand

Создайте `src/store.ts`. Это хранилище содержит:

- `events` (данные Scheduler)
- `currentDate` (как временная метка)
- `view` (`day | week | month`)
- `config` (конфигурационный объект Scheduler)
- `past` / `future` (массивы снимков для undo/redo)

Undo/redo интегрированы напрямую в хранилище с использованием снимков. Перед каждым действием, изменяющим данные, `pushHistory` сохраняет снимок текущих событий. Действия `undo` и `redo` меняют текущее состояние на снимок из истории.

~~~ts
import { create } from "zustand";

import { seedDate, seedEvents, seedView } from "./seed/data";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

export interface SchedulerStoreState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;

  setCurrentDate: (date: number) => void;
  setView: (view: SchedulerView) => void;

  createEvent: (event: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>) => SchedulerEvent;
  updateEvent: (event: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => void;
  deleteEvent: (id: SchedulerEvent["id"]) => void;

  undo: () => void;
  redo: () => void;
}

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (events: SchedulerEvent[]): SchedulerSnapshot => ({
  events: deepCopy(events),
});

// Simulate receiving an ID from a backend.
const generateId = () => `id_${Date.now().toString()}`;

export const useSchedulerStore = create<SchedulerStoreState>((set, get) => {
  const pushHistory = () => {
    const { events, past, maxHistory } = get();
    const snapshot = createSnapshot(events);

    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  };

  return {
    events: seedEvents as unknown as SchedulerEvent[],
    currentDate: seedDate,
    view: seedView as SchedulerView,
    config: {},

    past: [],
    future: [],
    maxHistory: 50,

    setCurrentDate: (date) => set({ currentDate: date })),
    setView: (view) => set({ view }),

    createEvent: (event) => {
      pushHistory();

      const id = event.id != null ? event.id : generateId();
      const newEvent: SchedulerEvent = { ...event, id } as SchedulerEvent;

      set({ events: [...get().events, newEvent] });
      return newEvent;
    },

    updateEvent: (event) => {
      const events = get().events;
      const index = events.findIndex((e) => String(e.id) === String(event.id));
      if (index === -1) return;

      pushHistory();
      set({
        events: [...events.slice(0, index), { ...events[index], ...event }, ...events.slice(index + 1)],
      });
    },

    deleteEvent: (id) => {
      const events = get().events;
      const exists = events.some((e) => String(e.id) === String(id));
      if (!exists) return;

      pushHistory();
      set({ events: events.filter((e) => String(e.id) !== String(id)) });
    },

    undo: () => {
      const { past, future, events } = get();
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set({
        events: previous.events,
        past: past.slice(0, -1),
        future: [createSnapshot(events), ...future],
      });
    },

    redo: () => {
      const { past, future, events } = get();
      if (future.length === 0) return;

      const next = future[0];
      set({
        events: next.events,
        past: [...past, createSnapshot(events)],
        future: future.slice(1),
      });
    },
  };
});
~~~

## Создание компонента панели инструментов

Создайте `src/components/Toolbar.tsx`. Это небольшая панель MUI, которая позволяет:

- переключать вид (day/week/month)
- переходить к предыдущему/к сегодняшнему/к следующему шагу
- undo/redo

~~~tsx
import { ButtonGroup, Button, Typography, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
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

## Подключение Scheduler к Zustand

Создайте `src/components/Scheduler.tsx`. Этот компонент:

- читает из хранилища Zustand через селекторы значения `events/view/currentDate/config`
- предоставляет колбэк `data.save`, который вызывает действия хранилища
- возвращает созданные/обновленные сущности из `save`, чтобы Scheduler мог синхронизировать свою внутреннюю логику
- связывает `undo/redo`
- скрывает встроенный навбар и вместо него использует кастомную панель инструментов

~~~tsx
import { useCallback, useMemo } from "react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { useSchedulerStore } from "../store";
import type { SchedulerEvent, SchedulerView } from "../types";

export default function DemoZustandScheduler() {
  const events = useSchedulerStore((s) => s.events);
  const view = useSchedulerStore((s) => s.view);
  const currentDate = useSchedulerStore((s) => s.currentDate);
  const config = useSchedulerStore((s) => s.config);

  const setView = useSchedulerStore((s) => s.setView);
  const setCurrentDate = useSchedulerStore((s) => s.setCurrentDate);
  const createEvent = useSchedulerStore((s) => s.createEvent);
  const updateEvent = useSchedulerStore((s) => s.updateEvent);
  const deleteEvent = useSchedulerStore((s) => s.deleteEvent);
  const undo = useSchedulerStore((s) => s.undo);
  const redo = useSchedulerStore((s) => s.redo);

  const canUndo = useSchedulerStore((s) => s.past.length > 0);
  const canRedo = useSchedulerStore((s) => s.future.length > 0);

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
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
  }, [currentDate, view, setCurrentDate]);

  // Мост Scheduler <-> Zustand: сопоставление CRUD-операций Scheduler с действиями хранилища
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
          return updateEvent({ ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">);
        }
        case "create":
          return createEvent(payload as Omit<SchedulerEvent, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return deleteEvent(deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [updateEvent, createEvent, deleteEvent]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => setView(nextView), [setView]);

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* скрыть встроенную навигационную панель */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

Обратите внимание: в отличие от Redux Toolkit, Zustand не требует обертку `Provider`. Хук `useSchedulerStore` читает напрямую из хранилища.

## Отображение Scheduler во всём приложении

Обновите `src/App.tsx`:

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Итоги

Теперь у вас React Scheduler полностью управляется Zustand:

- Zustand хранит `events`, `view`, `currentDate` и `config` как единственный источник правды
- редактирования пользователя проходят через `data.save` → действия хранилища
- пользовательский интерфейс синхронизирован: Scheduler получает обновлённые `events` через пропсы
- undo/redo реализованы через историю на основе снимков с ограниченным размером стека

## Что дальше

- Пересмотрите концепции, лежащие в основе этого примера, в разделе [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- Изучите конфигурацию и возможности шаблонизации Scheduler в [Обзор React Scheduler](integrations/react/overview.md)
- Добавьте хранение данных (загрузка/сохранение событий через API) через действие Zustand и обновление хранилища
- Исследуйте тот же паттерн с другими менеджерами состояний:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
  - [Использование React Scheduler с XState](integrations/react/state/xstate.md)
  - [Использование React Scheduler с Valtio](integrations/react/state/valtio.md)
  - [Использование React Scheduler с Jotai](integrations/react/state/jotai.md)