---
title: 在 ReactScheduler 中使用 DHTMLX Scheduler 属性
sidebar_label: 配置
description: "封装属性的完整参考，映射到 Scheduler 配置、模板、事件以及数据回调。"
---

# 在 ReactScheduler 中使用 DHTMLX Scheduler 属性

本页描述了 **React Scheduler** 接受的 props 及其如何映射到 DHTMLX Scheduler API。

## 可用的 props

| Prop | Type | 描述 |
|---|---|---|
| `events` | `Event[]` | 要渲染的 Scheduler 事件。 |
| `view` | `"day" \| "week" \| "month" \| "year" \| ...` | 活动的 Scheduler 视图。 |
| `date` | `Date` | 用于渲染所选视图的活动日期。 |
| `templates` | `SchedulerTemplates` | 映射到 Scheduler 模板（例如，事件样式/文本渲染）。 |
| `config` | `SchedulerConfig` | 映射到 Scheduler 配置选项。 |
| `xy` | `Record<string, number>` | UI 尺寸设置（例如，将内置导航隐藏，`nav_height: 0`）。 |
| `data` | `{ load?: string \| (() => Promise<any>); save?: string \| SaveHandler; batchSave?: BatchSaveHandler }` | 数据加载与变更处理的回调/URL。 |
| `customLightbox` | `ReactElement \| null` | 用你自己的 React 组件替换内置 Lightbox。 |
| `modals` | `SchedulerModals` | 覆盖内置的确认对话框（例如，事件删除确认）。 |
| `filter` | `(event: Event) => boolean` | 筛选在 Scheduler 中显示的事件。 |
| `on<EventName>` props | `(...args) => any` | 映射到 Scheduler 事件的事件处理函数（`onViewChange`、`onBeforeLightbox` 等）。 |

## 基本示例

```tsx
import ReactScheduler, {
  type Event,
  type SchedulerConfig,
  type SchedulerTemplates,
} from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Planning",
    start_date: new Date("2025-12-08T09:00:00Z"),
    end_date: new Date("2025-12-08T10:00:00Z"),
  },
];

const templates: SchedulerTemplates = {
  event_class: (_start, _end, event) => event.classname || "",
};

const config: SchedulerConfig = {
  first_hour: 6,
  last_hour: 22,
  hour_size_px: 60,
};

export default function Demo() {
  return (
    <ReactScheduler
      events={events}
      view="week"
      date={new Date("2025-12-08T00:00:00Z")}
      templates={templates}
      config={config}
    />
  );
}
```

## 数据 prop (`load`, `save`, `batchSave`)

使用 `data` prop 将 Scheduler 连接到后端或 React 管理的状态。

### 使用后端 URL

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### 使用回调处理程序

```tsx
<ReactScheduler
  data={{
    save: async (entity, action, item, id) => {
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
      }

      if (action === "delete") {
        await fetch(`/api/events/${id}`, { method: "DELETE" });
      }
    },
  }}
/>
```

## 模板与配置映射

`templates` 映射到 Scheduler 的模板函数，而 `config` 映射到 Scheduler 的配置选项。

```tsx
<ReactScheduler
  templates={{
    event_class: (_start, _end, event) =>
      event.classname === "important" ? "event-important" : "",
  }}
  config={{
    first_hour: 7,
    last_hour: 21,
    time_step: 15,
  }}
/>
```

## 事件属性

你可以将 Scheduler 事件作为 React props 传递。

```tsx
<ReactScheduler
  onViewChange={(mode, date) => {
    console.log("View changed:", mode, date);
  }}
  onBeforeLightbox={(eventId) => {
    console.log("Opening editor for", eventId);
    return true;
  }}
/>
```

如需完整的受支持事件和回调列表，请参阅：

- [Scheduler events overview](api/overview/events_overview.md)
- [Scheduler methods overview](api/overview/methods_overview.md)
- [Scheduler properties overview](api/overview/properties_overview.md)

## `customLightbox` 与 `modals`

当你想用自定义的事件编辑器替换内置编辑器时，请使用 `customLightbox`。当你需要自定义确认对话框时，请使用 `modals`。

```tsx
<ReactScheduler
  customLightbox={<MyLightbox />}
  modals={{
    onBeforeEventDelete: ({ event, callback }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback();
      }
    },
  }}
/>
```

## 事件过滤

```tsx
<ReactScheduler
  events={events}
  filter={(event) => event.text.toLowerCase().includes(search.toLowerCase())}
/>
```

## 通过 `ref` 直接访问 API

如果某些用例未被 props 覆盖，请使用 `ref` 获取底层 Scheduler 实例。

```tsx
import { useEffect, useRef } from "react";
import ReactScheduler, { type ReactSchedulerRef } from "@dhx/react-scheduler";

export default function DirectApiDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    console.log(scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return <ReactScheduler ref={schedulerRef} events={[]} />;
}
```

## 相关页面

- [React Scheduler Overview](integrations/react/overview.md)
- [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)
- [Quick Start with React Scheduler](integrations/react/quick-start.md)