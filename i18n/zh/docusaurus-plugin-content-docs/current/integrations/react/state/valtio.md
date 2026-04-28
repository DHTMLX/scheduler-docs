---
sidebar_label: Valtio
title: 使用 Valtio 的 React Scheduler
description: 使用 Valtio 代理存储管理 React Scheduler 的状态，通过 data.save 应用用户编辑，并添加基于快照的撤销/重做。
---

# React Scheduler - Valtio 教程

本教程展示如何在一个 Vite + React + TypeScript 应用中渲染 **React Scheduler**，并使用 **Valtio** 管理其状态。你将把事件、当前日期和活动视图保存在一个 Valtio 代理存储中，然后通过 Scheduler 的 `data.save` 回调将用户编辑路由到存储处理函数。

到教程结束时，你将得到一个具备以下特征的 Scheduler：

- 可复用的工具栏（视图切换、日期导航、撤销/重做、只读开关）
- 由存储驱动的事件 CRUD（创建/更新/删除）
- 基于快照的撤销/重做（事件 + 配置）

:::note
完整的源代码可在 GitHub 上查看：[GitHub 演示仓库](https://github.com/nicetip/react-scheduler-valtio-starter)。
:::

## 前提条件

- React + TypeScript 基础
- Vite 基础
- 对 Valtio 的基本了解
- 推荐：在 [React Scheduler 文档：数据绑定](integrations/react/state/state-management-basics.md) 中了解 React Scheduler 的数据绑定和 `data.save`

## 创建一个项目

创建一个 Vite + React + TypeScript 项目：

~~~bash
npm create vite@latest scheduler-valtio-demo -- --template react-ts
cd scheduler-valtio-demo
~~~

## 安装依赖

本教程使用：

- **Valtio** 作为状态管理
- **Material UI** 作为工具栏 UI

安装包：

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

如果你使用 Yarn：

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

## 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的说明安装 React Scheduler。

在本教程中我们使用评估包：

```bash
npm install @dhtmlx/trial-react-scheduler
```

或

```bash
yarn add @dhtmlx/trial-react-scheduler
```

如果你已经使用 Professional 包，请在命令行和导入处将 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

## 准备应用样式

React Scheduler 需要一个高度确定的父容器。将 `src/App.css` 的默认样式替换为：

~~~css title="src/App.css"
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 添加种子数据

在 `src/seed/data.ts` 中创建一个小型数据集以及默认视图/日期：

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
伴生演示包含额外的事件以实现更丰富的视觉效果。
:::

## 创建 Valtio 存储

创建 `src/store.ts`。该存储拥有：

- `events`（传递给 Scheduler 的事件数组）
- `currentDate` 与 `view`（也作为属性传入）
- `config`（Scheduler 配置对象，包括 `readonly`）
- `_past` / `_future` 历史栈用于撤销/重做历史

关键之处在于 **基于快照的历史记录**：我们存放深拷贝的快照，以确保撤销/重做不会保持对可变数组的引用。导航（`setCurrentDate`/`setView`）有意设为不可撤销 — 只有修改数据的操作（CRUD、配置更改）才会推进历史栈。

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

## 创建一个可复用的工具栏

创建 `src/components/Toolbar.tsx`。这是一个小型的 MUI 工具栏，用于：

- 切换视图（day/week/month）
- 导航上一个/当天/下一个
- 撤销/重做
- 切换只读模式

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

## 渲染 React Scheduler 并将其连接到 Valtio

创建 `src/components/Scheduler.tsx`。该组件：

- 通过 `useSnapshot` 订阅 Valtio 代理
- 将 `events`、`date`、`view` 和 `config` 作为 React Scheduler 的属性传递
- 使用带有 `switch/case` 的桥接实现 `data.save`，将变更路由到存储的动作
- 连接 `undo/redo` 与 `read-only` 配置开关
- 隐藏内置导航栏，改用自定义工具栏

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

  // Scheduler <-> Valtio data bridge
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
        xy={memoizedXY} /* hide built-in navbar */
        config={snap.config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## 挂载 Scheduler

更新 `src/App.tsx`：

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## 运行应用

启动开发服务器：

~~~bash
npm run dev
~~~

或者：

~~~bash
yarn dev
~~~

## 摘要

在本教程中你已经：

- 创建了一个 Vite + React 项目
- 在确定高度的容器中渲染 React Scheduler
- 将 `events`、`view`、`currentDate` 和 `config` 在单个 Valtio 代理存储中建模
- 使用 `_past`/`_future` 堆栈实现基于快照的撤销/重做（事件 + 配置）
- 将所有 Scheduler 的变更通过 `data.save` 路由到存储的动作
- 添加了一个只读开关，使 Scheduler 无法编辑

这使 Scheduler 组件保持声明式（state -> props），而存储拥有所有变更逻辑和历史记录。

## 下一步

- 参考 React Scheduler 文档中的 [数据绑定]（Binding Data）来了解两种受支持的数据绑定模型：[Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)（将其替换为中文标题）
- 通过使用 `templates` 属性添加自定义模板和 UI
- 将同样的模式应用到其他状态管理器上：
  - [在 Redux Toolkit 中使用 React Scheduler](integrations/react/state/redux-toolkit.md)
  - [MobX 的 React Scheduler](integrations/react/state/mobx.md) -> 使用 MobX 的 React Scheduler
  - [XState 的 React Scheduler](integrations/react/state/xstate.md) -> 使用 XState 的 React Scheduler
  - [Zustand 的 React Scheduler](integrations/react/state/zustand.md) -> 使用 Zustand 的 React Scheduler
  - [Jotai 的 React Scheduler](integrations/react/state/jotai.md) -> 使用 Jotai 的 React Scheduler