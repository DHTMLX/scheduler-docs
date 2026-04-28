---
title: React Scheduler - Zustand 教程
sidebar_label: Zustand
description: 了解如何将 DHTMLX React Scheduler 与 Zustand 集成，包括事件增删改查、视图/日期同步，以及撤销/重做。
---

# React Scheduler - Zustand 教程

本教程演示如何将 **DHTMLX React Scheduler** 连接到一个 **Zustand** 存储。你将把事件和 UI 状态（视图/日期/配置）保存在 Zustand 中，通过 `data.save` 路由 Scheduler 编辑，并通过基于快照的历史记录实现 **撤销/重做**。

:::note
完整源代码可在 [GitHub 上查看](https://github.com/DHTMLX/react-scheduler-zustand-starter)。
:::

## 先决条件

- Node.js（推荐使用 LTS 版本）
- React + TypeScript 基础
- 熟悉 Zustand 的钩子和选择器。如果需要回顾，请参阅 Zustand 文档：https://zustand.docs.pmnd.rs/

## 快速设置 - 创建项目

创建一个 Vite + React + TS 项目：

~~~bash
npm create vite@latest scheduler-zustand-demo -- --template react-ts
cd scheduler-zustand-demo
npm install
~~~

安装 Zustand：

~~~bash
npm install zustand
~~~

安装 Material UI（用于示例工具栏）：

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的描述安装 React Scheduler。

在本教程中我们使用评估包：

```bash
npm install @dhtmlx/trial-react-scheduler
```

或

```bash
yarn add @dhtmlx/trial-react-scheduler
```

如果你已经使用 Professional 包，请在命令和导入中把 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

运行开发服务器：

~~~bash
npm run dev
~~~

:::note
为了让 Scheduler 占满整页，请移除 `src/App.css` 的默认样式并添加：

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

## 定义共享类型

创建 `src/types.ts`。这些类型在存储和组件之间共享：

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler 运行时可能附加额外字段（例如自定义属性）。保持演示的宽容性。
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
}
~~~

- `SchedulerEvent` 使用索引签名，以便 Scheduler 能在运行时附加额外字段。
- `SchedulerSnapshot` 捕获撤销/重做所需的数据（事件）。

## 设置示例数据

创建 `src/seed/data.ts`，包含若干事件和初始的 UI 状态。请注意，`currentDate` 以 **数字**（时间戳）存储，以确保存储状态可序列化。

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
伴随演示还包含额外事件，以获得更丰富的视觉效果。
:::

## 创建 Zustand 存储

创建 `src/store.ts`。该存储包含：

- `events`（Scheduler 数据）
- `currentDate`（以时间戳表示）
- `view`（`day | week | month`）
- `config`（Scheduler 配置对象）
- `past` / `future`（用于撤销/重做的快照数组）

撤销/重做直接通过快照集成到存储中。在每次修改数据的操作之前，`pushHistory` 会保存当前事件的快照。`undo` 和 `redo` 操作会将当前状态与历史中的快照进行切换。

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

// 模拟从后端接收一个 ID
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

## 构建控件工具栏组件

创建 `src/components/Toolbar.tsx`。这是一个小型的 MUI 工具栏，用于：

- 切换视图（day/week/month）
- 导航上一个/今天/下一个
- 撤销/重做

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

## 将 Scheduler 连接到 Zustand

创建 `src/components/Scheduler.tsx`。该组件：

- 通过选择器从 Zustand 存储读取 `events/view/currentDate/config`
- 暴露一个 `data.save` 回调，用于调用存储中的操作
- 从 `save` 返回创建/更新的实体，以便 Scheduler 能同步其内部记账
- 连接 `undo/redo`
- 隐藏内置导航栏，改用自定义工具栏

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

  // Scheduler <-> Zustand 数据桥接（将 Scheduler 的 CRUD 事件映射到存储操作）
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
        xy={memoizedXY} /* hide built-in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

请注意，与 Redux Toolkit 不同，Zustand 不需要 `Provider` 包装。`useSchedulerStore` 钩子直接从存储中读取数据。

## 在应用中渲染 Scheduler

更新 `src/App.tsx`：

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## 总结

现在你已经拥有一个由 Zustand 完全驱动的 React Scheduler：

- Zustand 将 `events`、`view`、`currentDate` 和 `config` 作为单一的事实来源
- 用户编辑通过 `data.save` 路由到存储操作
- 由于 Scheduler 通过属性接收更新后的 `events`，UI 保持同步
- 撤销/重做通过基于快照的历史实现，历史栈有上限

## 下一步

- 重新查看此示例背后的概念，请参考 [数据绑定与状态管理基础]（integrations/react/state/state-management-basics.md）
- 了解 Scheduler 的配置和模板选项，请参阅 [React Scheduler 概览]（integrations/react/overview.md）
- 通过在 Zustand 动作中进行获取并更新存储，添加持久化（从 API 加载/保存事件）
- 使用同样的模式与其他状态管理器配合使用：
  - [使用 Redux Toolkit 的 React Scheduler](integrations/react/state/redux-toolkit.md)
  - [使用 MobX 的 React Scheduler](integrations/react/state/mobx.md)
  - [使用 XState 的 React Scheduler](integrations/react/state/xstate.md)
  - [使用 Valtio 的 React Scheduler](integrations/react/state/valtio.md)
  - [使用 Jotai 的 React Scheduler](integrations/react/state/jotai.md)