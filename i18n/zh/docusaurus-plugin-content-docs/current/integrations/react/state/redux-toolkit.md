---
title: React Scheduler - Redux Toolkit 教程
sidebar_label: Redux Toolkit
description: 学习如何将 DHTMLX React Scheduler 与 Redux Toolkit 集成，包括事件的增删改查、视图/日期同步，以及撤销/重做。
---

# React Scheduler - Redux Toolkit 教程

本教程展示如何将 **DHTMLX React Scheduler** 连接到一个 **Redux Toolkit** 存储。你将把事件和 UI 状态（视图/日期/配置）保存在 Redux 中，通过 `data.save` 路由 Scheduler 的编辑，并通过基于快照的历史记录实现 **撤销/重做**，以及一个 **只读** 开关。

:::note
完整的源代码可在 [GitHub 上获取](https://github.com/DHTMLX/react-scheduler-redux-starter)。
:::

## 前提条件

- Node.js（建议使用 LTS 版本）
- React + TypeScript 基础
- Redux 基础知识（actions、reducers、store）。如需回顾，请参阅 Redux 文档：https://redux.js.org/

## 快速设置 - 创建项目

创建一个 Vite + React + TS 项目：

~~~bash
npm create vite@latest scheduler-redux-demo -- --template react-ts
cd scheduler-redux-demo
npm install
~~~

安装 Redux Toolkit + React Redux：

~~~bash
npm install @reduxjs/toolkit react-redux
~~~

安装 Material UI（用于演示工具栏）：

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的说明安装 React Scheduler。

在本教程中，我们使用评估包：

```bash
npm install @dhtmlx/trial-react-scheduler
```

或

```bash
yarn add @dhtmlx/trial-react-scheduler
```

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

运行开发服务器：

~~~bash
npm run dev
~~~

:::note
为了让 Scheduler 占满整页，请从 `src/App.css` 中移除默认样式并添加：

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

## 配置 Redux 存储

创建 `src/redux/store.ts`。这里将 `scheduler` reducer 连接到 Redux 存储：

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

## 定义共享类型

创建 `src/redux/types.ts`。这些类型在切片、动作和组件之间共用：

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler 可能在运行时附加额外字段（如自定义属性）。示例保持宽松。
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent` 使用索引签名，因此 Scheduler 可以在运行时附加额外字段。
- `SchedulerSnapshot` 捕捉撤销/重做所需的数据（事件 + 配置）。

## 设置示例数据

在 `src/seed/data.ts` 中创建几个事件和初始 UI 状态。请注意 `currentDate` 以数字（时间戳）存储，以确保 Redux 状态可序列化。

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
配套演示包含额外的事件，以获得更丰富的视觉效果。
:::

## 定义 Scheduler 操作（创建/更新/删除）

Scheduler 的编辑将通过 Redux 动作进行路由。创建 `src/redux/actions.ts`。

`createEvent` 操作使用一个 "prepare" 回调，从而能生成一个稳定的 ID（模拟后端生成的 ID）。我们还添加了一个小工具 (`dispatchAction`)，用于返回派发的有效载荷——这对 Scheduler 的 `data.save` 可以返回创建/更新的实体很有用。

~~~ts
import { createAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import type { SchedulerEvent } from "./types";

// 模拟从后端接收一个 ID。
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

## 创建 Redux 切片

现在创建 `src/redux/schedulerSlice.ts`。这份切片存储：

- `events`（Scheduler 数据）
- `currentDate`（时间戳）
- `view` (`day | week | month`)
- `config`（Scheduler 配置对象，包括 `readonly`）
- `past` / `future`（用于撤销/重做的快照数组）

撤销/重做直接通过包含快照的切片实现。在每个数据修改操作之前，`pushHistory` 会保存当前的事件和配置的快照。`undo` 和 `redo` reducers 会把当前状态与历史中的快照交换。

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
  // JSON clone is sufficient for this demo:
  // - events/config are plain objects
  // - we want immutable snapshots for undo/redo
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

    // Navigation is not an undoable user action in this demo.
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

## 构建控制工具栏组件

创建 `src/components/Toolbar.tsx`。这是一个简短的 MUI 工具栏，用于：

- 切换视图（day/week/month）
- 向前/回到今天/向后导航
- 撤销/重做
- 开关只读模式

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

## 将 Scheduler 连接到 Redux

创建 `src/components/Scheduler.tsx`。该组件：

- 从扁平化的 Redux 状态中读取 `events/view/currentDate/config`
- 暴露一个 `data.save` 回调来派发 Redux 动作
- 从 `save` 返回创建/更新的实体，以便 Scheduler 可以同步其内部记账
- 连接 `undo/redo` 和 `read-only` 配置开关
- 隐藏内置导航栏，改用自定义工具栏

~~~tsx
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Trial import:
// import ReactScheduler from "@dhtmlx/trial-react-scheduler";
// import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro import:
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

  // Scheduler <-> Redux data bridge
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
        xy={memoizedXY} /* hide built-in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## 将 Redux Provider 集成到应用

最后，用 Redux `Provider` 包装你的应用。更新 `src/App.tsx`：

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

## 总结

现在你拥有一个由 Redux Toolkit 完全驱动的 React Scheduler：

- Scheduler 从 Redux 读取 `events`、`view`、`currentDate` 和 `config`
- 用户编辑通过 `data.save` -> Redux 动作进行路由
- UI 持续保持同步，因为 Scheduler 通过属性接收到更新的 `events`
- 撤销/重做通过直接在切片中集成的基于快照的历史实现
- 一个只读配置开关让你锁定 Scheduler，避免编辑

## 接下来

- 回顾本示例背后的概念，参阅 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- 探索 Scheduler 的配置和模板选项，参阅 [React Scheduler 概览](integrations/react/overview.md)
- 通过派发异步 thunk 并相应更新切片，添加持久化（从 API 载入/保存事件）
- 以同一模式探索其他状态管理器：
  - [使用 React Scheduler 与 MobX](integrations/react/state/mobx.md)
  - [使用 React Scheduler 与 XState](integrations/react/state/xstate.md)
  - [使用 React Scheduler 与 Zustand](integrations/react/state/zustand.md)
  - [使用 React Scheduler 与 Valtio](integrations/react/state/valtio.md)
  - [使用 React Scheduler 与 Jotai](integrations/react/state/jotai.md)