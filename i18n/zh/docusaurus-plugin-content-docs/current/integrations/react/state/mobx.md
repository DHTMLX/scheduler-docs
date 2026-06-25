---
title: 使用 MobX 的 React Scheduler
sidebar_label: MobX
description: "从可观察的 MobX 状态渲染 React Scheduler，并通过 data.save 处理创建/更新/删除，以及基于快照的撤销/重做。"
---

# React Scheduler - MobX 教程

本教程展示如何在 Vite + React + TypeScript 应用中渲染 **DHTMLX React Scheduler**，并由一个 **MobX** 存储驱动它。
到最后，你将拥有一个可用的 Scheduler，支持 **创建/更新/删除**、**视图与日期导航**、对事件变更的**基于快照的撤销/重做**，以及一个 **只读** 开关。

:::note
完整源代码可在 [GitHub 上获取](https://github.com/DHTMLX/react-scheduler-mobx-starter)。
:::

你将构建：

- 一个拥有 `events`、当前 `view` 与 `date` 的 MobX 存储
- 一个将 Scheduler 编辑转换成存储操作的 `data.save` 桥接
- 一个简单的工具栏（视图、导航、撤销/重做、只读切换），位于 Scheduler 之上

## 先决条件

- 具备 React、TypeScript、Vite 和 MobX 的基础知识
- 建议：阅读 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)，以理解本教程所基于的数据绑定模式及 `data.save` 回调。

## 快速上手 - 创建项目

在这一步中，我们将创建一个 Vite 项目、安装依赖并验证应用运行状态。

操作：

- 创建一个 Vite React + TypeScript 项目
- 安装 MobX + UI 相关依赖
- 安装 React Scheduler（试用包）
- 移除 Vite 的默认 `App.css` 样式，以便 Scheduler 能填充视口

在开始之前，请安装 [Node.js](https://nodejs.org/en/)。

创建 Vite React + TypeScript 项目：

~~~bash
npm create vite@latest react-scheduler-mobx-demo -- --template react-ts
cd react-scheduler-mobx-demo
~~~

现在安装所需的依赖。

* 对于 **npm**：

~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* 对于 **yarn**：

~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 安装 React Scheduler。

在本教程中我们使用评估包：

```bash
npm install @dhtmlx/trial-react-scheduler
```

或

```bash
yarn add @dhtmlx/trial-react-scheduler
```

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

现在可以启动开发服务器：

~~~bash
npm run dev
~~~

现在你应该可以在 `http://localhost:5173` 看到你的 React 项目在运行。

:::note
为使 Scheduler 占满页面，请移除 `src/App.css` 的默认 Vite 样式。

将 `src/App.css` 更新为以下内容。
:::  

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 设置示例数据

在这一步中，我们将为 Scheduler 创建确定性的种子数据，使演示在每次运行时都看起来一致。

操作：

- 创建 `src/seed/data.ts`，包含少量事件
- 导出初始的 `view` 与 `date`，使 Scheduler 从一个可预测的状态开始

创建 `src/seed/data.ts`：

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
配套演示还包含额外事件，以获得更丰富的视觉效果。
:::

## 构建控制工具栏组件

在这一步，我们将构建一个简单的可重用工具栏，用于控制 Scheduler 的导航与历史。

操作：

- 创建 `src/components/Toolbar.tsx`
- 添加用于 **Day / Week / Month** 的按钮
- 添加 **Prev / Today / Next** 导航按钮
- 添加与回调绑定的 **Undo / Redo** 按钮
- 添加一个 **Read-only** 开关

创建 `src/components/Toolbar.tsx`：

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

## 设置 MobX 存储

在这一步，我们将创建一个拥有 Scheduler 状态并实现基于快照的撤销/重做的 MobX 存储。

操作：

- 创建 `src/store.ts`
- 将 `events`、`view`、`currentDate` 与 `config` 作为可观察状态进行存储
- 实现 `createEvent`、`updateEvent`、`deleteEvent` 方法
- 添加 `updateConfig` 以进行只读切换
- 添加 `past`/`future` 历史栈及 `undo`/`redo` 操作

创建 `src/store.ts`：

~~~ts title="src/store.ts"
import { makeAutoObservable } from "mobx";
import type { SchedulerConfig } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SeedEvent, type SchedulerView } from "./seed/data";

export interface SchedulerEvent extends SeedEvent {
  /**
   * 允许额外的 Scheduler 字段。
   * 该示例仅依赖 id/start_date/end_date/text。
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
   * Scheduler 的数据处理器（data.save）在创建事件时调用。
   *
   * 重要：返回创建的事件并携带最终 id（模拟后端生成的 id），
   * 以便 Scheduler 能替换其临时 id，并确保后续更新能够正确工作。
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

## 创建主 Scheduler 组件

在这一步中，我们将渲染 React Scheduler 并把它连接到 MobX 存储。

操作：

- 创建 `src/components/Scheduler.tsx`
- 使用 `observer` 包裹组件，使其在存储变化时重新渲染
- 创建一个 `data.save` 桥接，在其中调用存储的创建/更新/删除操作
- 添加 `onViewChange` 处理器，将 Scheduler 的视图变更同步到状态
- 通过 `updateConfig` 将只读切换连通
- 隐藏 Scheduler 自带的导航栏，改用工具栏

创建 `src/components/Scheduler.tsx`：

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

最后，更新 `src/App.tsx` 以渲染 Scheduler 组件：

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

至此，你的应用应能在登录后渲染出带自定义工具栏的 Scheduler。

## 运行应用程序

在这一步，我们将运行演示并验证编辑与历史记录功能。

操作：

- 启动开发服务器（若尚未在运行）
- 创建/编辑/拖动事件，确认通过 `data.save` 更新到存储
- 使用 Undo/Redo 撤销/应用事件变更
- 切换只读模式以锁定 Scheduler

运行：

~~~bash
npm run dev
~~~

试用：

- 创建事件（在日历中双击或使用内置编辑器 UI）
- 编辑事件（修改文本/时间）
- 将事件拖到新的时间槽
- 使用工具栏中的 **Undo** / **Redo**
- 切换 **Read-only**，以锁定 Scheduler 不被编辑

## 总结

在本教程中，你已经：

- 创建了一个 Vite + React 项目
- 添加了 React Scheduler，并将其连接到一个 MobX 存储
- 使用 `past`/`future` 历史数组实现基于快照的撤销/重做
- 通过可观察的 MobX 状态驱动事件、视图/日期与配置
- 使用 `data.save` 回调，使每次 Scheduler 的改动都成为一个存储操作
- 通过只读配置开关让你锁定 Scheduler，避免编辑

这使 Scheduler 组件保持完全声明性，同时所有变更逻辑与历史处理都封装在 MobX 状态中。

## 下一步

若要深入：

- 回顾本示例背后的概念，请参阅 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- 了解 Scheduler 的配置与模板选项，请参阅 [React Scheduler 概览](integrations/react/overview.md)
- 在其他状态管理器中应用相同模式：
  - [使用 Redux Toolkit 的 React Scheduler](integrations/react/state/redux-toolkit.md)
  - [使用 Zustand 的 React Scheduler](integrations/react/state/zustand.md)
  - [使用 XState 的 React Scheduler](integrations/react/state/xstate.md)
  - [使用 Jotai 的 React Scheduler](integrations/react/state/jotai.md)
  - [使用 Valtio 的 React Scheduler](integrations/react/state/valtio.md)