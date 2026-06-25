---
title: React Scheduler 数据绑定与状态管理基础
sidebar_label: 基础
description: "概述 React Scheduler 中的两种数据绑定模型以及 React 状态和状态管理器的基线模式。"
---

# React Scheduler 数据绑定与状态管理

React Scheduler 支持两种数据绑定模式：

1. **以 React 状态作为数据源（推荐）**（适用于大多数 React 应用）
2. **Scheduler 作为数据源**（适用于专门的、高吞吐量场景）

两种模型都是有效的。每个屏幕选择一个模型并保持一致。

如果你还没有渲染出一个基础图表，请从 [Quick Start](integrations/react/quick-start.md) 开始。

## 数据模型

### 以 React 状态为数据源（推荐）

在这种模型中：

- 你将 `events`（以及通常的 `view` / `date`）保存在 React 状态或状态管理器中
- 将该状态传递给 `<ReactScheduler />` 的 props
- 当用户编辑数据时，Scheduler 调用 `data.save` / `data.batchSave`
- 你更新状态，React 会用新 props 重新渲染 Scheduler

当其他 React 组件必须与 Scheduler 数据保持同步时使用。

### Scheduler 作为数据源

在这种模型中：

- Scheduler 在内部加载并变更数据
- 你可选择向后端端点转发编辑
- React 不会将每一次事件更新都镜像到状态中

当 React 不需要立即反映每一个 Scheduler 的改变时使用。

## 以 React 状态为数据源 {#reactstateasthesourceoftruth}

### 最小示例

```tsx
import { useMemo, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import { seedEvents } from "./seed/data";

export default function ReactStateScheduler() {
  const [events, setEvents] = useState<Event[]>(seedEvents);

  const data = useMemo(
    () => ({
      save: (entity: string, action: string, item: Event, id: string | number) => {
        if (entity !== "event") return;

        if (action === "create") {
          setEvents((prev) => [...prev, item]);
          return;
        }

        if (action === "update") {
          setEvents((prev) => prev.map((e) => (e.id === id ? item : e)));
          return;
        }

        if (action === "delete") {
          setEvents((prev) => prev.filter((e) => e.id !== id));
        }
      },
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler events={events} data={data} />
    </div>
  );
}
```

这种模式使 React 成为事件数据的权威所有者。

## 使用 `data.save` 处理更新 {#handlingchangeswithdatasave}

`data.save` 会在每次用户变更时被调用：

```ts
(entity: string, action: string, item: any, id: string | number) => void | Promise<any>
```

对于 Scheduler 的事件增删改查：

- `entity` 是 `"event"`
- `action` 是 `"create" | "update" | "delete"`
- `item` 是创建/更新/删除的事件
- `id` 是受影响的事件 id

### 面向后端的示例

```tsx
const data = {
  save: async (entity: string, action: string, item: any, id: string | number) => {
    if (entity !== "event") return;

    if (action === "create") {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      const created = await response.json();
      return { id: created.id };
    }

    if (action === "update") {
      await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      return;
    }

    if (action === "delete") {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
    }
  },
};
```

如果后端在创建时替换临时 ID，请返回 `{ id: realId }`，以便 Scheduler 能够对客户端和服务器的 ID 进行对齐。

## 使用 `data.batchSave` 进行批量更新

`data.batchSave` 在短时间内发出大量变更时很有用（例如密集编辑会话）。

在你想要：

- 通过分组发送变更来减少请求次数
- 在一个 reducer/store 事务中处理更新

```tsx
<ReactScheduler
  events={events}
  data={{
    batchSave: async (changes) => {
      await fetch("/api/events/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
    },
  }}
/>
```

对简单的逐变更逻辑使用 `save`，对分组同步使用 `batchSave`。

## 将数据加载到 React 状态

在 React 驱动模型中，Scheduler 从 React 状态获取数据。常见来源：

- 本地组件状态
- 全局状态管理器（Redux Toolkit、Zustand、MobX、XState、Jotai、Valtio）
- API 调用

### 本地状态来源

```tsx
import { useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate } from "./seed/data";

export default function LocalStateExample() {
  const [events] = useState<Event[]>(seedEvents);

  return (
    <ReactScheduler
      events={events}
      view={seedView}
      date={seedDate}
    />
  );
}
```

### 状态管理器来源

每个库遵循相同的流程：

- selector/hook 读取状态
- props 将 Scheduler 提供
- `data.save` 派发动作/存储变更

```tsx
const events = useSchedulerStore((s) => s.events);
const onSave = useSchedulerStore((s) => s.handleSave);

<ReactScheduler events={events} data={{ save: onSave }} />;
```

状态管理器教程：

- [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
- [Using React Scheduler with MobX](integrations/react/state/mobx.md)
- [Using React Scheduler with XState](integrations/react/state/xstate.md)
- [Using React Scheduler with Jotai](integrations/react/state/jotai.md)
- [Using React Scheduler with Valtio](integrations/react/state/valtio.md)

### API 加载来源

```tsx
import { useEffect, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";

export default function SchedulerWithApi() {
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    let disposed = false;

    (async () => {
      const response = await fetch("/api/events");
      const payload = await response.json();
      if (!disposed) setEvents(payload.events || []);
    })();

    return () => {
      disposed = true;
    };
  }, []);

  if (!events) return <div>Loading Scheduler...</div>;

  return <ReactScheduler events={events} />;
}
```

## Scheduler 作为数据源 {#schedulerasthesourceoftruth}

在此模式下，React 渲染组件，但不持有事件的权威数据状态。

### URL 传输示例

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### 回调传输示例

```tsx
<ReactScheduler
  data={{
    load: async () => {
      const response = await fetch("/api/scheduler/load");
      return response.json();
    },
    save: async (entity, action, item, id) => {
      await fetch("/api/scheduler/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entity, action, item, id }),
      });
    },
  }}
/>
```

当 Scheduler 可以作为主要运行时存储，且 React 不需要渲染每一个更新时，使用这种方法。

## 选择合适的模型

使用 **React 驱动** 模型时：

- 多个 React 组件依赖 Scheduler 数据
- 你需要可预测的全局状态集成
- 你希望在应用状态中实现简单的撤销/重做

使用 **Scheduler 驱动** 模型时：

- React 主要是外壳/布局
- 你偏好 Scheduler 管理的运行时变更
- 服务器传输是主要的同步机制

## 下一步

- [React Scheduler 概览](integrations/react/overview.md#bindingdata)
- [React Scheduler 配置](integrations/react/configuration-props.md)
- [服务器集成](guides/server-integration.md)