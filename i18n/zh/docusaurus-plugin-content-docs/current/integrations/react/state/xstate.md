--- 
title: React Scheduler - XState 教程
sidebar_label: XState
description: "将 React Scheduler 与 XState 集成。涵盖在状态机中对调度程序状态的建模、通过 data.save 进行 CRUD 操作，以及添加撤销/重做和自定义导航。"
---

# React Scheduler - XState 教程

本教程演示如何将 **DHTMLX React Scheduler** 连接到一个 **XState** 状态机。你将把事件和 UI 状态（视图/日期/配置）保存在状态机中，通过 `data.save` 将 Scheduler 编辑路由，并添加 **撤销/重做**，采用基于快照的历史记录。

:::note
完整源代码可在 [GitHub 上查看](https://github.com/DHTMLX/react-scheduler-xstate-starter)。
:::

## 前提条件

- Node.js（推荐 LTS 版本）
- React + TypeScript 基础
- XState 基础知识（状态机、事件、动作）。若需要快速回顾，请参阅 XState 文档：https://stately.ai/docs/xstate

## 快速设置 - 创建项目

创建一个 Vite + React + TS 项目：

~~~bash
npm create vite@latest scheduler-xstate-demo -- --template react-ts
cd scheduler-xstate-demo
npm install
~~~

安装 XState + React 绑定：

~~~bash
npm install xstate @xstate/react
~~~

安装 Material UI（用于演示工具栏）：

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的描述安装 React Scheduler。

在本教程中，我们使用评估包：

```bash
npm install @dhtmlx/trial-react-scheduler
```

或者

```bash
yarn add @dhtmlx/trial-react-scheduler
```

如果你已经使用 Professional 包，请在命令和导入中把 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

运行开发服务器：

~~~bash
npm run dev
~~~

:::note
若希望 Scheduler 充满整页，请移除 `src/App.css` 的默认样式并添加：

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

## 设置示例数据

在 `src/seed/data.ts` 中创建若干事件和初始 UI 状态。请注意，`date` 以 **数字**（时间戳）存储，以确保机器上下文可序列化。

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

- `SchedulerEvent` 使用索引签名，以便 Scheduler 可以在运行时附加额外字段。

:::note
伴随示例演示包含带颜色类的附加事件，以获得更丰富的视觉效果。
:::

## 设置 XState 机器

创建 `src/machine.ts`。该机器存储：

- `events`（调度数据）
- `date`（时间戳）
- `view`（`day | week | month`）
- `config`（调度配置对象）
- `past` / `future`（用于撤销/重做的快照数组）

撤销/重做直接通过快照集成到机器中。在每次修改数据的操作之前，`saveToHistory` 会保存当前的事件、视图和日期的快照。`undo` 与 `redo` 转换会从历史记录中对当前状态进行替换。

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
  | { type: "UNO" } // 这里是 UNO 还是 UNDO，请保持原文
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

此时，该机器提供了：

- 用于 Scheduler 属性的单一状态来源
- 基于快照的撤销/重做（历史记录包含拷贝而非引用）
- 一个单一的 `SET_DATE` 事件 — 导航逻辑（上一页/下一页/今天）位于组件中

:::tip
如果目标浏览器是现代浏览器，`deepClone()` 帮助函数已经优先使用 `structuredClone()`，并在较老的环境中回退到 JSON 克隆。
:::

## 构建控制工具栏组件

创建 `src/components/Toolbar.tsx`。这是一个小型的 MUI 工具栏，用于：

- 切换视图（day/week/month）
- 导航 上一页/今天/下一页
- 撤销/重做，并在历史为空时禁用

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

## 将 Scheduler 连接到 XState

创建 `src/components/Scheduler.tsx`。该组件：

- 从 XState 机器上下文读取 `events`/`view`/`date`/`config`
- 暴露一个 `data.save` 回调，将 Scheduler 的操作转换为机器事件
- 连接 `undo/redo` 与 导航
- 隐藏内置导航栏，使用自定义工具栏
- 通过 `event_class` 模板将颜色类应用到事件

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

一些细节需要注意：

- 机器上下文是 `events`、`view` 和 `date` 的单一真理来源。
- `data.save` 处理程序会将基于实体的 Scheduler 变更转换为机器事件。
- 我们隐藏内置的 Scheduler 导航栏（`xy={{ nav_height: 0 }}`），并用自定义工具栏替代。
- `event_class` 模板从每个事件中读取 `classname` 字段，并将其应用为 CSS 类。

## 事件颜色样式

创建 `src/components/styles.css`，其中包含与种子数据中的 `classname` 值相匹配的 CSS 类。`event_class` 模板将这些类应用到每个事件元素。

~~~css title="src/components/styles.css"
/*
  事件着色。
  Scheduler 将从 templates.event_class 返回的值应用到事件容器。
  种子数据使用 `classname`，因此我们通过模板映射它并在此处样式化这些类。
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

## 将 Scheduler 集成到应用中

更新 `src/App.tsx` 和 `src/App.css`：

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

## 小结

现在你已经拥有一个由 XState 完全驱动的 React Scheduler：

- Scheduler 从 XState 机器上下文读取 `events`、`view`、`date` 和 `config`
- 用户编辑通过 `data.save` 路由到 CRUD 的机器事件
- 由于 Scheduler 通过 props 接收更新的状态，UI 保持同步
- 撤销/重做通过带有 `guard` 条件的快照历史实现
- 一个自定义工具栏提供视图切换、日期导航，以及带禁用状态的撤销/重做

## 下一步

- 在 [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md) 中回顾本示例背后的概念
- 在 [React Scheduler 概览](integrations/react/overview.md) 中探索 Scheduler 的配置与模板选项
- 通过向机器派发异步事件来实现持久化（从 API 加载/保存事件）
- 将相同的模式应用到其他状态管理器：
  - [在 Redux Toolkit 中使用 React Scheduler](integrations/react/state/redux-toolkit.md)
  - [在 MobX 中使用 React Scheduler](integrations/react/state/mobx.md)
  - [在 Zustand 中使用 React Scheduler](integrations/react/state/zustand.md)
  - [在 Jotai 中使用 React Scheduler](integrations/react/state/jotai.md)
  - [在 Valtio 中使用 React Scheduler](integrations/react/state/valtio.md)