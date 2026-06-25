---
title: React Scheduler — руководство по MobX
sidebar_label: MobX
description: "Отображение React Scheduler на основе наблюдаемого состояния MobX и обработка создания/обновления/удаления через data.save с откатом/повтором изменений на основе снимков."
---

# React Scheduler - MobX Tutorial

Это руководство показывает, как отрисовать **DHTMLX React Scheduler** в приложении на Vite + React + TypeScript и управлять им через хранилище **MobX**. В конце у вас будет рабочий Scheduler, который поддерживает **создание/обновление/удаление**, **просмотр и навигацию по датам**, **откат/повтор изменений на основе снимков** для изменений событий и переключатель **только чтение**.

:::note
Полный исходный код доступен на [GitHub](https://github.com/DHTMLX/react-scheduler-mobx-starter).
:::

Вы создадите:

- хранилище MobX, которое хранит `events`, текущий `view` и `date`
- мост `data.save`, который преобразует редактирования Scheduler в действия хранилища
- простую панель инструментов (виды, навигация, отмена/повтор, переключатель только чтения), размещенную над Scheduler

## Предварительные требования

- Базовые знания React, TypeScript, Vite и MobX
- Рекомендуется: прочитать [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md), чтобы понять режим привязки данных и обратный вызов `data.save`, на котором основан данный учебник.

## Быстрая настройка - создание проекта

На этом этапе мы создадим проект Vite, установим зависимости и проверим, что приложение запускается.

Действия:

- Создать проект Vite React + TypeScript
- Установить MobX + UI зависимости
- Установить React Scheduler (пакет пробной версии)
- Удалить стандартные стили Vite из `App.css`, чтобы Scheduler занимал всё пространство

Перед началом установки установите [Node.js](https://nodejs.org/en/).

Создать проект Vite React + TypeScript:

~~~bash
npm create vite@latest react-scheduler-mobx-demo -- --template react-ts
cd react-scheduler-mobx-demo
~~~

Теперь установите необходимые зависимости.

* Для **npm**:

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* Для **yarn**:

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### Установка React Scheduler

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом учебнике мы используем пакет пробной версии:

```bash
npm install @dhtmlx/trial-react-scheduler
```

или

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортах.

Теперь можно запустить сервер разработки:

~~~bash
npm run dev
~~~

Теперь ваш проект на React должен работать по адресу `http://localhost:5173`.

:::note
Чтобы Scheduler занимал всё пространство страницы, удалите стандартные стили Vite из `src/App.css`.

Обновите `src/App.css` следующим образом.
:::

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Настройка тестовых данных

На этом этапе мы создадим детерминированные сид-данные для Scheduler, чтобы демо выглядело одинаково при каждом запуске.

Действия:

- Создать `src/seed/data.ts` с небольшим набором событий
- Экспортировать начальный `view` и `date`, чтобы Scheduler запускался в предсказуемом состоянии

Создать `src/seed/data.ts`:

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";

export interface SeedEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
}

export const seedEvents: SeedEvent[] = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");

export const seedView: SchedulerView = "week";
~~~

:::note
Сопутствующая демо-версия включает дополнительные события для более насыщенной визуализации.
:::

## Построение компонента панели инструментов

На этом шаге мы создадим простой повторно используемый тулбар, который управляет навигацией Scheduler и историей изменений.

Действия:

- Создать файл `src/components/Toolbar.tsx`
- Добавить кнопки для отображений: **Day / Week / Month**
- Добавить кнопки навигации **Prev / Today / Next**
- Добавить кнопки **Undo / Redo**, привязанные к колбэкам
- Добавить переключатель **Read-only**

Создать `src/components/Toolbar.tsx`:

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

export interface ToolbarProps {
  currentView: string;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: "day" | "week" | "month") => void;
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
          <Button
            key={label}
            variant={currentView === label ? "contained" : "outlined"}
            onClick={() => setView(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}

        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={canUndo === false}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={canRedo === false}>
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
        {new Date(currentDate).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Typography>

      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>&nbsp;&lt;&nbsp;</Button>
        <Button onClick={() => onNavigate?.("today")}>Today</Button>
        <Button onClick={() => onNavigate?.("next")}>&nbsp;&gt;&nbsp;</Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Настройка хранилища MobX

На этом шаге мы создадим хранилище MobX, которое управляет состоянием Scheduler и реализует откат/повтор изменений на основе снимков.

Действия:

- Создать `src/store.ts`
- Хранить `events`, текущий `view`, `currentDate` и `config` как наблюдаемое состояние
- Реализовать методы `createEvent`, `updateEvent`, `deleteEvent`
- Добавить `updateConfig` для переключения режима только чтения
- Добавить стеки истории `past` и `future` и операции `undo`/`redo`

Создать `src/store.ts`:

~~~ts title="src/store.ts"
import { makeAutoObservable } from "mobx";
import type { SchedulerConfig } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SeedEvent, type SchedulerView } from "./seed/data";

export interface SchedulerEvent extends SeedEvent {
  /**
   * Extra Scheduler fields are allowed.
   * The demo only relies on id/start_date/end_date/text.
   */
  [key: string]: unknown;
}

interface Snapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

class SchedulerStore {
  events: SchedulerEvent[] = seedEvents as SchedulerEvent[];
  view: SchedulerView = seedView;
  currentDate: number = seedDate;
  config: SchedulerConfig = {};

  past: Snapshot[] = [];
  future: Snapshot[] = [];
  maxHistory = 50;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  private generateId(): string {
    return `id_${Date.now().toString()}`;
  }

  private snapshot(): Snapshot {
    return {
      events: cloneJson(this.events),
      config: cloneJson(this.config),
    };
  }

  private saveToHistory(): void {
    this.past.push(this.snapshot());
    if (this.past.length > this.maxHistory) {
      this.past.shift();
    }
    this.future = [];
  }

  private restore(snapshot: Snapshot): void {
    this.events = snapshot.events;
    this.config = snapshot.config;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setCurrentDate(date: number): void {
    this.currentDate = date;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setView(view: SchedulerView): void {
    this.view = view;
  }

  updateConfig(partial: Partial<SchedulerConfig>): void {
    this.saveToHistory();
    this.config = { ...this.config, ...partial };
  }

  /**
   * Called by Scheduler's data processor (data.save) on event creation.
   *
   * Important: we return the created event with a final id (simulating a backend-generated id),
   * so Scheduler can replace its temporary id and keep subsequent updates working correctly.
   */
  createEvent(eventDraft: Partial<SchedulerEvent>): SchedulerEvent {
    this.saveToHistory();

    const id = this.generateId();
    const newEvent: SchedulerEvent = {
      ...eventDraft,
      id,
      start_date: String(eventDraft.start_date ?? new Date().toISOString()),
      end_date: String(eventDraft.end_date ?? new Date().toISOString()),
      text: String(eventDraft.text ?? "(no title)"),
    };

    this.events = [...this.events, newEvent];
    return newEvent;
  }

  updateEvent(updatedEvent: Partial<SchedulerEvent> & { id: string | number }): void {
    this.saveToHistory();
    this.events = this.events.map((event) => {
      if (String(event.id) === String(updatedEvent.id)) {
        return { ...event, ...updatedEvent };
      }
      return event;
    });
  }

  deleteEvent(id: string | number): void {
    this.saveToHistory();
    this.events = this.events.filter((event) => String(event.id) !== String(id));
  }

  undo(): void {
    if (this.past.length === 0) {
      return;
    }

    const previous = this.past.pop();
    if (!previous) {
      return;
    }

    this.future.unshift(this.snapshot());
    this.restore(previous);
  }

  redo(): void {
    if (this.future.length === 0) {
      return;
    }

    const next = this.future.shift();
    if (!next) {
      return;
    }

    this.past.push(this.snapshot());
    this.restore(next);
  }
}

const schedulerStore = new SchedulerStore();
export default schedulerStore;
~~~

## Создание основного компонента Scheduler

На этом этапе мы отрисуем React Scheduler и соединим его с хранилищем MobX.

Действия:

- Создать `src/components/Scheduler.tsx`
- Обернуть компонент в `observer`, чтобы он пересоздавался при изменениях в хранилище
- Создать мост `data.save`, который вызывает действия хранилища для создания/обновления/удаления
- Добавить обработчик `onViewChange` для синхронизации изменений вида Scheduler с состоянием
- Подключить переключатель чтения через `updateConfig`
- Скрыть встроенную панель навигации Scheduler и использовать вместо неё панель инструментов

Создать `src/components/Scheduler.tsx`:

~~~tsx title="src/components/Scheduler.tsx"
import { observer } from "mobx-react-lite";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "./Toolbar";
import schedulerStore, { type SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";
import { useCallback, useMemo } from "react";

const DemoMobxScheduler = observer(() => {
  const {
    events,
    view,
    currentDate,
    config,
    canUndo,
    canRedo,
    setView,
    setCurrentDate,
    updateConfig,
    createEvent,
    updateEvent,
    deleteEvent,
    undo,
    redo,
  } = schedulerStore;

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

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
      const nextView: SchedulerView =
        mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => updateConfig({ readonly: value }),
    [updateConfig]
  );

  type DataAction = "create" | "update" | "delete";

  const dataBridge = useMemo(
    () => ({
      save: (entity: string, action: string, payload: unknown, id: string | number) => {
        if (entity !== "event") {
          return;
        }

        const safeAction = action as DataAction;

        if (safeAction === "update") {
          return updateEvent(payload as Partial<SchedulerEvent> & { id: string | number });
        }

        if (safeAction === "create") {
          // Important: return the created event with the final id.
          // This simulates a backend-generated id and keeps subsequent updates working.
          return createEvent(payload as Partial<SchedulerEvent>);
        }

        if (safeAction === "delete") {
          return deleteEvent(id);
        }

        console.warn(`Unknown data.save action: ${action}`);
        return;
      },
    }),
    [updateEvent, createEvent, deleteEvent]
  );

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);

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
});

export default DemoMobxScheduler;
~~~

Наконец, обновите `src/App.tsx`, чтобы отрисовать компонент Scheduler:

~~~tsx title="src/App.tsx"
import { useEffect } from "react";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler - MobX Demo";
  }, []);

  return <Scheduler />;
}

export default App;
~~~

На данном этапе ваше приложение должно рендерить Scheduler с кастомной панелью инструментов над ним.

## Запуск приложения

На этом этапе мы запустим демо и проверим редактирование и историю.

Действия:

- Запустите сервер разработки (если он не запущен)
- Создавайте/редактируйте/перемещайте события и убедитесь, что хранилище обновляется через `data.save`
- Используйте Undo/Redo для отката/применения изменений
- Переключите режим чтения, чтобы заблокировать Scheduler

Запуск:

~~~bash
npm run dev
~~~

Попробуйте:

- Создайте событие (двойной клик по календарю или используйте встроенный редактор)
- Измените событие (изменить текст/время)
- Переместите событие в другой временной слот
- Используйте Undo / Redo в панели инструментов
- Переключите Read-only, чтобы заблокировать Scheduler от редактирования

## Итого

В этом руководстве вы:

- создали проект на базе Vite + React
- добавили React Scheduler и связали его с хранилищем MobX
- реализовали откат/повтор изменений на основе снимков с использованием массивов истории `past`/`future`
- управляли событиями, видом/датой и конфигурацией через наблюдаемое состояние MobX
- использовали обратный вызов `data.save`, чтобы каждое изменение Scheduler превращалось в действие хранилища
- переключатель конфигурации «Только чтение» позволяет заблокировать Scheduler от редактирования

Это сохраняет компонент Scheduler полностью декларативным, в то время как вся логика мутаций и обработка истории инкапсулированы внутри состояния MobX.

## Что дальше

Для дальнейшей работы:

- Вернитесь к концепциям, лежащим в основе данного примера, в [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- Изучите конфигурацию Scheduler и параметры шаблонов в [Обзор React Scheduler](integrations/react/overview.md)
- Протестируйте тот же подход с другими менеджерами состояния:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)
  - [Использование React Scheduler с XState](integrations/react/state/xstate.md)
  - [Использование React Scheduler с Jotai](integrations/react/state/jotai.md)
  - [Использование React Scheduler с Valtio](integrations/react/state/valtio.md)