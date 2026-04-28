---
title: "React 调度器"
sidebar_label: "概览"
description: "关于 React Scheduler 封装、数据绑定模式、自定义选项以及框架兼容性的概览。"
---

# React 调度器

:::note
React Scheduler 可在 [商业版、企业版和 Ultimate 版许可证](https://dhtmlx.com/docs/products/licenses.shtml) 下使用。
如果你使用 Scheduler 的 Individual 或 GPL 版，请使用 [dhtmlxScheduler with React](integrations/react/js-scheduler-react.md)。
:::

## 概览

DHTMLX React Scheduler 是 DHTMLX Scheduler 的官方 React 封装。它为 Scheduler 提供声明式的渲染和配置 API，同时在需要高级控制时仍然暴露底层的 Scheduler 实例。

**主要特性：**

- 将 `events`、`view` 和 `date` 作为 props 传递
- 使用 `config` 与 `templates` 自定义行为
- 通过 `data.save` 或 `data.batchSave` 处理用户变更
- 使用 `ref` 直接访问 Scheduler API 方法

如果你是 DHTMLX Scheduler 的初学者，请参阅 [DHTMLX Scheduler 文档](/guides/) 了解其功能概览。

## 安装与 npm 访问

关于评估版和专业包的安装，请参阅：

- [Installation](integrations/react/installation.md)

## 版本要求

- React `18+`

## 基本用法

```tsx
import { useMemo, useRef } from "react";
import ReactScheduler, {
  type Event,
  type ReactSchedulerRef,
  type SchedulerConfig,
  type SchedulerTemplates,
} from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

const events: Event[] = [
  {
    id: 1,
    text: "Product Strategy Hike",
    classname: "blue",
    start_date: new Date("2025-12-08T02:00:00Z"),
    end_date: new Date("2025-12-08T10:20:00Z"),
  },
];

export default function BasicSchedulerDemo() {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (_start, _end, event) => event.classname || "",
    }),
    []
  );

  const config: SchedulerConfig = useMemo(
    () => ({
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    }),
    []
  );

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        ref={schedulerRef}
        events={events}
        view="week"
        date={new Date("2025-12-08T00:00:00Z")}
        templates={templates}
        config={config}
      />
    </div>
  );
}
```

## 数据绑定 {#bindingdata}

React Scheduler 支持两种数据绑定模型。

### 以 React 状态作为真实数据源（推荐）

在此模型中，React（或某个状态管理器）拥有事件数据：

- Scheduler 从 props 读取事件
- 用户更改会调用你的 `data.save` 回调
- 回调更新 React 状态
- React 重新渲染带有更新 props 的 Scheduler

```tsx
import { useMemo, useState } from "react";
import ReactScheduler, { type Event } from "@dhtmlx/trial-react-scheduler";

export default function ReactDrivenExample({ seedEvents }: { seedEvents: Event[] }) {
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

  return <ReactScheduler events={events} data={data} />;
}
```

此模型在其他 React UI 需要与 Scheduler 数据保持同步时非常合适。

### Scheduler 作为真实数据源

在此模型中，Scheduler 管理其内部状态并将编辑转发给后端。

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

当你不需要让 React 即刻镜像每次更新时，此模型特别有用。

### 加载数据

你可以通过 props 或 `data.load` 加载数据：

```tsx
// 通过 Props 加载
<ReactScheduler events={eventsFromState} />

// 通过传输加载
<ReactScheduler data={{ load: "/api/scheduler/load" }} />
```

关于数据格式的要求，请参阅 [Loading Data](guides/loading-data.md)。

### 保存变更

`data.save` 可以是一个 URL 或一个回调。

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

有关后端行为的详细信息，请参阅 [Server Integration](guides/server-integration.md)。

## 替换 Lightbox

Scheduler 内置的事件编辑器称为 [Lightbox](guides/lightbox-editors.md)。
你可以通过使用 `customLightbox` 来替换它：

```tsx
import React, { useState } from 'react';

export interface CustomLightboxProps {
  data?: any;
  onSave?: (event: any) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const CustomLightbox: React.FC<CustomLightboxProps> = ({
  data,
  onSave,
  onCancel,
  onDelete
}) => {

  let updatedEventText = data.text || "";

  const handleSaveClick = () => {
    if(onSave)
      onSave({ ...data, text: updatedEventText });
  };

  function PaperComponent(props: any) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef"
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"], input,textarea'}
      >
        <Paper {...props} ref={nodeRef}/>
      </Draggable>
    );
  }


  function TextComponent() {
    const [description, setDescription] = useState<string>(data.text || '');

    return (
      <TextField
        id="event_text"
        hiddenLabel
        multiline
        value="{description}"
        autoFocus
        onChange="{(e)" => {
          updatedEventText = e.target.value;
          setDescription(e.target.value)
        }}
        sx="{{" width: '100%', padding: '8px', marginTop: '10px' }}
      />
    )
  }


  return (
    <Dialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      className="lightbox"
      onClose={onCancel}
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Edit Event
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Description
        </DialogContentText>

        <TextComponent />

        <DialogActions className='buttons'>
          <Button variant="contained" onClick={handleSaveClick}>Save</Button>
          <Button variant="contained" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={onDelete}>Delete</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>

  );
};

export default CustomLightbox;
```

你也可以通过 `onBeforeLightbox` 拦截编辑器的打开：

```tsx
import { useEffect, useRef } from 'react';
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";
import { useNavigate } from 'react-router-dom';


export default function BasicInitDemo() {
  const schedulerRef = useRef<any>(null);

  const { events, handleSaveEvent, handleDeleteEvent, createEvent } 
    = useOutletContext<SchedulerEditorContext>();
  const navigate = useNavigate();

  const handleEventEdit = (id: any) => {
    const schedulerInstance = schedulerRef.current?.instance;
    navigate(`/editor/${id}`, { state: { task: schedulerInstance.getTask(id) } });
  };

  return (
    <ReactScheduler 
      ref={schedulerRef}
      tasks={events}
      onBeforeLightbox={handleEventEdit} />
  );
}
```

参考: [onBeforeLightbox](api/event/onbeforelightbox.md)

## 替换内置模态框

删除确认对话框可以通过 `modals` 覆盖。

```tsx
<ReactScheduler
  modals={{
    onBeforeEventDelete: ({ event, callback, schedulerInstance }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback(); // 调用回调将删除事件
      }
    },
  }}
/>
```

### 自定义 Recurrence 确认模态框 {#customizingtherecurrenceconfirmationmodal}

当用户编辑或拖动重复事件时，会弹出确认模态框，询问应仅修改当前发生、此及之后的事件，还是整个系列。你可以使用 `modals.onRecurrenceConfirm` 替换此内置对话框。

回调接收一个上下文对象，必须返回一个决定（或返回一个 Promise 解析为一个决定）：

字段 | 类型 | 描述
- origin | `"lightbox" \| "dnd"` | 行为是从 Lightbox 触发还是从拖放触发
- occurrence | `any` | 正在编辑的具体发生
- series | `any` | 父级重复事件
- labels | `object` | 本地化标签：`title`、`ok`、`cancel`、`occurrence`、`following`、`series`
- options | `string[]` | 可用选项，例如 `["occurrence", "following", "series"]`

返回值（RecurrenceDecision）：`"occurrence"`、`"following"`、`"series"`，或 `null` 代表取消。

示例：

```tsx
import { useState, useCallback } from "react";

function App() {
  const [recurrencePrompt, setRecurrencePrompt] = useState(null);

  const onRecurrenceConfirm = useCallback((context) => {
    return new Promise((resolve) => {
      setRecurrencePrompt({ context, resolve });
    });
  }, []);

  return (
    <>
      <ReactScheduler
        modals={{ onRecurrenceConfirm }}
      />
      {recurrencePrompt && (
        <MyRecurrenceDialog
          options={recurrencePrompt.context.options}
          labels={recurrencePrompt.context.labels}
          onSelect={(choice) => {
            recurrencePrompt.resolve(choice);
            setRecurrencePrompt(null);
          }}
          onCancel={() => {
            recurrencePrompt.resolve(null);
            setRecurrencePrompt(null);
          }}
        />
      )}
    </>
  );
}
```

## 过滤

使用 `filter` 属性来控制显示哪些事件：

```tsx
import { useCallback, useState } from "react";

function FilteredScheduler({ events }: { events: any[] }) {
  const [query, setQuery] = useState("");

  const filterFn = useCallback(
    (event: any) => {
      if (!query.trim()) return true;
      return event.text?.toLowerCase().includes(query.trim().toLowerCase());
    },
    [query]
  );

  return (
    <>
      <input
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ReactScheduler events={events} filter={filterFn} />
    </>
  );
}
```

## 访问底层 Scheduler API

当 props 不足以满足需求时，可以通过 `ref` 访问 Scheduler 实例：

```tsx
import { useEffect, useRef } from "react";
import ReactScheduler, { type ReactSchedulerRef } from "@dhx/react-scheduler";

export function DirectRefExample({ events }: { events: any[] }) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  useEffect(() => {
    const scheduler = schedulerRef.current?.instance;
    if (!scheduler) return;

    console.log("Events:", scheduler.getEvents());
    scheduler.setCurrentView(new Date());
  }, []);

  return <ReactScheduler ref={schedulerRef} events={events} />;
}
```

如果你直接变更 Scheduler，请确保 React 属性保持同步以避免状态漂移。

有关可用方法，请参阅 [Scheduler Methods Overview](api/overview/methods_overview.md)。

#### 避免与 React 属性冲突

- 如果你在自己的代码中手动调用 `scheduler.parse(( events ))` 或 `scheduler.addEvent()`，请注意你可能需要保持 React 属性同步。否则，下一次 React 重新渲染时，可能会覆盖你手动的更改。
- 推荐的方法是依赖封装器的事件属性，或在你的 React 状态中管理它们。然后让封装器处理重新解析。

## 与 SSR 框架（Next.js、Remix）的兼容性

:::note
React Scheduler 兼容 SSR。在服务器端渲染期间，它会输出一个占位容器，客户端再进行 hydration。
:::

请使用框架特定的指南获取更多细节：

- [React Scheduler with Next.js](integrations/react/nextjs.md)
- [React Scheduler with Remix](integrations/react/remix.md)

## 下一步

- [配置](integrations/react/configuration-props.md)
- [数据绑定与状态管理基础知识](integrations/react/state/state-management-basics.md)
- [快速入门](integrations/react/quick-start.md)