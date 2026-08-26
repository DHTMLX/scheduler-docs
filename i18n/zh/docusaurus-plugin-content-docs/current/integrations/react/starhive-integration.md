--- 
title: React Scheduler 与 Starhive 集成
sidebar_label: Starhive 快速入门
description: "通过 Next.js API 路由，将 DHTMLX React Scheduler 连接到 Starhive NoSQL 后端。"
---

# React Scheduler 与 Starhive 集成

本教程通过 Next.js Route Handlers 将 **React Scheduler** 连接到一个 **Starhive** NoSQL 后端。Starhive 提供带类型的架构和一个生成的 TypeScript 客户端，因此 API 层保持尽量简洁：一个端点用于加载事件和资源，另一个用于创建 / 更新 / 删除。

你将构建：

- 一个在客户端组件中托管 Scheduler 的 Next.js 页面
- `/api/load` - 首次渲染时从 Starhive 获取事件与资源
- `/api/event`（POST）和 `/api/event/[id]`（PUT、DELETE） - Scheduler `dataBridge` 使用的写入路径

:::note
完整的源代码可在 [GitHub 上获取](https://github.com/DHTMLX/react-scheduler-starhive-demo)。
:::

## 前提条件

- Next.js + React + TypeScript 的基础知识
- Node.js 18+
- 一个 [Starhive](https://starhive.com/) 帐户（30 天试用即可）

## 步骤 1. 创建项目

```bash
npx create-next-app@latest react-scheduler-starhive-demo
cd react-scheduler-starhive-demo
```

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的指引安装 React Scheduler。为了评估：

```bash
npm install @dhtmlx/trial-react-scheduler
```

如果你已使用 Professional 版本，请将命令及导入中的 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

你还需要 `axios` —— 它是生成的 Starhive TypeScript 客户端的对等依赖项。

```bash
npm install axios
```

## 步骤 2. 设置 Starhive 空间

登录后，在右上角点击 **+ Create**，将空间命名为 `Scheduler`。

在空间内创建两个类型：`Resources` 与 `Events`。Resources 负责时间线的行（团队、人员、房间等）。Events 参考每一个 Resource。

通过 **+ Attribute** 按钮添加以下属性。Starhive 会为每个项自动生成 `id`，因此你不需要显式声明它。

**Resources 类型**

| 字段 | 类型 |
| ---- | ---- |
| `label` | Text |

**Events 类型**

| 字段 | 类型 |
| ---- | ---- |
| `text` | Text |
| `start_date` | Date & Time |
| `end_date` | Date & Time |
| `resource_id` | Reference → Resources |

## 步骤 3. 导入示例数据

创建 `scheduler_resources.csv`：

```csv
label
"Frontend Team"
"Backend Team"
"QA Team"
"DevOps"
"Security Team"
```

以及 `scheduler_events.csv`：

```csv
text,start_date,end_date,resource_id
"Development","2026-04-01T08:00:00","2026-04-01T10:30:00","Frontend Team"
"Code Review","2026-04-01T09:00:00","2026-04-01T11:30:00","Backend Team"
"QA Testing","2026-04-01T10:00:00","2026-04-01T13:00:00","QA Team"
"Deployment","2026-04-01T11:00:00","2026-04-01T13:30:00","DevOps"
"Incident Response","2026-04-01T12:00:00","2026-04-01T15:00:00","DevOps"
"Maintenance Window","2026-04-01T08:30:00","2026-04-01T11:00:00","Backend Team"
"Security Scan","2026-04-01T13:00:00","2026-04-01T15:30:00","Security Team"
```

在 Starhive UI 中打开各类型并为每个文件点击 CSV 导入。

## 步骤 4. 生成并复制模式

前往 Settings → API Connectors。选择 `Scheduler` 空间，将语言设为 TypeScript，点击 Generate，然后 Download。

解压缩 ZIP，在 `project/src/io/` 下找到 `starhive` 文件夹，并将其拷贝到你 Next.js 项目的 `lib/starhive/` 目录中。生成的文件包含工作区特定的 UUID，因此每当模式变化或切换工作区时你都需要重复此步骤。

:::note
撰写时，Starhive TypeScript 生成器输出的内容尚未通过严格的 TypeScript：存在缺失的 `Sla.ts` 引用、内联 `AttributeVisitor` 字面量中缺失的 `visitSlaAttribute` 实现，以及对一个 **any** 类型字段的 `client.request<T>` 调用（TS2347）。配套的演示仓库提供了三处最小化补丁，能够解决这些问题；请参阅 [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/) 的 diff。在重新生成模式时请再次应用相同补丁，直到 Starhive 提供修复为止。
 :::

## 步骤 5. 配置 Starhive 客户端

创建 `lib/starhiveClient.ts`：

```ts title="lib/starhiveClient.ts"
import { StarhiveClient } from "./starhive/client/StarhiveClient";
import { JSON_DECODERS } from "./starhive/schema/JsonDecoders";

let starhiveClient: StarhiveClient | null = null;

export function getStarhiveClient() {
  if (starhiveClient) return starhiveClient;

  const workspaceId = process.env.STARHIVE_WORKSPACE_ID;
  const apiKey = process.env.STARHIVE_API_TOKEN;

  if (!workspaceId || !apiKey) {
    throw new Error("Missing Starhive configuration (workspaceId or API token)");
  }

  starhiveClient = new StarhiveClient(apiKey, workspaceId, JSON_DECODERS);
  return starhiveClient;
}
```

该函数在模块作用域缓存客户端，因此路由处理程序共享同一个实例。

在项目根目录添加 `.env.local`（或 `.env`）：

```env title=".env.local"
STARHIVE_API_TOKEN=your-api-token
STARHIVE_WORKSPACE_ID=your-workspace-id
```

在 Settings → Personal access tokens 下生成 API 令牌。工作区 ID 是在 `https://app.starhive.com/workspace/<workspace-id>/home` 的路径段。

## 步骤 6. 加载事件与资源

创建 `app/api/load/route.ts`：

```ts title="app/api/load/route.ts"
import { NextResponse } from 'next/server';
import { getStarhiveClient } from '@/lib/starhiveClient';
import { Events } from '@/lib/starhive/schema/Events';
import { Resources } from '@/lib/starhive/schema/Resources';

function normalizeEvents(events: Events[]) {
  return events.map(ev => ({
    id: ev.getId() || '',
    text: ev.getText(),
    start_date: ev.getStartDate(),
    end_date: ev.getEndDate(),
    resource_id: ev.getResourceId()?.[0] || null,
  }));
}

export async function GET() {
  try {
    const client = getStarhiveClient();
    const [events, resources] = await Promise.all([
      client.search<Events>(Events.TYPE_ID, ""),
      client.search<Resources>(Resources.TYPE_ID, "")
    ]);

    return NextResponse.json({
      events: normalizeEvents(events.result),
      resources: resources.result.map((r) => ({
        key: r.getId(),
        label: r.getLabel(),
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
```

`normalizeEvents` 将每个 Starhive 对象扁平化为 React Scheduler 期望的形状：`{ id, text, start_date, end_date, resource_id }`。Resources 将扁平化为 `{ key, label }`，这是时间线视图中的 `y_unit` 所消耗的格式。

在启动开发服务器后访问 `http://localhost:3000/api/load` 以确认 JSON 结构。

## 步骤 7. 渲染 Scheduler 并加载事件

创建 `app/page.tsx`：

```tsx title="app/page.tsx"
'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactScheduler, {
  type Event,
  type SchedulerViewsProp,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';

type Resource = { key: string; label: string };

export default function Scheduler() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/load')
      .then((response) => response.json())
      .then((data) => {
        setResources(data.resources);
        setEvents(data.events);
      })
      .catch((error) => {
        console.error('Failed to load resources data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const views: SchedulerViewsProp = useMemo(
    () => ({
      timeline: [
        {
          name: "timeline",
          x_unit: "hour",
          x_date: "%H:%i",
          x_step: 1,
          x_start: 8,
          x_size: 13,
          x_length: 13,
          event_dy: 50,
          event_min_dy: 50,
          y_property: "resource_id",
          render: "bar",
          y_unit: resources,
        },
      ],
    }),
    [resources]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <ReactScheduler
        events={events}
        date={new Date("2026-04-01T00:00:00Z")}
        views={views}
        view={"timeline"}
      />
    </div>
  );
}
```

使用 `loading` 标志比直接检查 `events.length` 或 `resources.length` 更可靠：一个工作区如果确实没有事件，也应渲染空的 Scheduler 而不是一直处于加载状态。

运行 `npm run dev`，时间线将显示并按资源分组导入的事件。

## 步骤 8. 实现 CRUD 端点

Scheduler 的 `dataBridge` 会调用三个端点 - 创建使用 POST、更新使用 PUT、删除使用 DELETE - 并期望特定的响应结构：

| HTTP 方法 | Endpoint                  | Response                          |
| --------- | ------------------------- | --------------------------------- |
| `GET`     | `/api/load`               | `{ events, resources }`           |
| `POST`    | `/api/event`              | `{ action: "inserted", tid: id }` |
| `PUT`     | `/api/event/{event_id}`   | `{ action: "updated" }`           |
| `DELETE`  | `/api/event/{event_id}`   | `{ action: "deleted" }`           |

在 `app/api/event/route.ts` 上创建 POST 处理程序：

```ts title="app/api/event/route.ts"
import { NextRequest, NextResponse } from 'next/server';
import { getStarhiveClient } from '@/lib/starhiveClient';
import { Events } from '@/lib/starhive/schema/Events';

export async function POST(req: NextRequest) {
  try {
    const { text, start_date, end_date, resource_id } = await req.json();
    const client = getStarhiveClient();

    const event = Events.builder()
      .text(text)
      .startDate(new Date(start_date))
      .endDate(new Date(end_date))
      .resourceId([resource_id])
      .build();

    const result = await client.createObject(event);
    return NextResponse.json({ action: 'inserted', tid: result.getId() });
  } catch (error) {
    return NextResponse.json({ error: 'Create failed' }, { status: 500 });
  }
}
```

以及动态 PUT/DELETE 处理程序在 `app/api/event/[id]/route.ts`：

```ts title="app/api/event/[id]/route.ts"
import { NextRequest, NextResponse } from 'next/server';
import { Events } from "@/lib/starhive/schema/Events";
import { getStarhiveClient } from "@/lib/starhiveClient";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const client = getStarhiveClient();

    const existingEvent = await client.getObject(id, Events.TYPE_ID);
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const updatedEvent = Events.builder()
      .id(id)
      .text(body.text)
      .startDate(new Date(body.start_date))
      .endDate(new Date(body.end_date))
      .resourceId([body.resource_id])
      .build();

    await client.updateObject(updatedEvent);
    return NextResponse.json({ action: 'updated' });
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Update failed', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const client = getStarhiveClient();
    await client.deleteObjectsInBulk([id]);

    return NextResponse.json({ action: 'deleted' });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: error.message },
      { status: 500 }
    );
  }
}
```

:::note
在 Next.js 15+ 中，动态路由处理程序的 `params` 参数是一个 `Promise`。请始终将其类型标注为 `Promise<{...}>`，并在读取段值之前 `await` 它——在某些环境中省略 `Promise<>` 包装会在严格模式下编译失败。
:::

## 步骤 9. 将 dataBridge 与前端连接起来

在 `services/scheduler.ts` 中创建一个小型客户端辅助工具：

```ts title="services/scheduler.ts"
import type { Event } from '@dhtmlx/trial-react-scheduler';

async function request<T>(url: string, options: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function createEvent(event: Event) {
  return request('/api/event', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function updateEvent(event: Event) {
  return request(`/api/event/${event.id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: { 'Content-Type': 'application/json' },
  });
}

export function deleteEvent(id: string | number) {
  return request(`/api/event/${id}`, {
    method: 'DELETE',
  });
}
```

接着将 `dataBridge` 连接到页面中。更新 `app/page.tsx`，添加导入并在 `<ReactScheduler>` 上使用 `data` 属性：

```tsx title="app/page.tsx"
import { createEvent, deleteEvent, updateEvent } from '@/services/scheduler';

// Scheduler 组件内部：
const dataBridge = useMemo(() => ({
  save: (entity: string, action: string, payload: Event, id: string | number) => {
    if (entity !== "event") return;

    switch (action) {
      case "update":
        return updateEvent(payload);
      case "create":
        return createEvent(payload);
      case "delete":
        return deleteEvent(id);
      default:
        console.warn(`Unknown action: ${action}`);
        return;
    }
  },
}), []);

// 将其传给组件：
<ReactScheduler
  events={events}
  data={dataBridge}
  date={new Date("2026-04-01T00:00:00Z")}
  views={views}
  view={"timeline"}
/>
```

## 测试

```bash
npm run dev
```

打开 `http://localhost:3000`，拖动某个事件到新的时间段、编辑文本、删除一个事件。每次修改都会在 Starhive UI 的 `Events` 类型下即时体现。

## 关于 Starhive 集成的说明

- **服务器端凭据独立。** `STARHIVE_API_TOKEN` 和 `STARHIVE_WORKSPACE_ID` 仅在路由处理程序中读取；它们永远不会进入浏览器打包中。不要将 Starhive 客户端放入客户端组件，或通过 `NEXT_PUBLIC_*` 变量暴露令牌。
- **模式再生成。** 当你在 Starhive 中添加或重命名属性时，重新生成 TypeScript 模式并替换 `lib/starhive/`。如果在执行 `next build` 时收到相同的上游问题，请按照 [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/) 的 diff 重新应用补丁，直到 Starhive 提供修复。
- **没有实时同步。** 与 Firebase 集成不同，Starhive 不会将变更推送给已连接的客户端。多用户编辑同一 Scheduler 时会覆盖彼此的改动。若需要支持多用户场景，可以在客户端添加轮询，或将 Starhive 的 Webhooks 连接到 SSE / WebSockets 以在远程变更时刷新 `events` 状态。
- **大数据集的动态加载。** `/api/load` 路由会加载工作空间中的所有事件。生产环境中，可以在 GET 处理程序中接受 `from` / `to` 查询参数，按 `start_date` / `end_date` 进行筛选，并在客户端调用 `scheduler.setLoadMode("day")`，以便仅获取可见范围的数据。
- **引用属性携带数组。** `Events.getResourceId()` 返回 `string[] | undefined`，因为 Starhive 的引用属性是多值的。演示中通过 `?.[0] || null` 进行扁平化处理。如果允许事件属于多个资源，请相应地调整时间线视图的 `y_property` 分辨方案以及 normalize / builder 调用。

## 相关页面

- [数据绑定与状态管理基础](integrations/react/state/state-management-basics.md)
- [React Scheduler 概览](integrations/react/overview.md#bindingdata)
- [服务端集成](guides/server-integration.md)
- [React Scheduler 与 Firebase 集成](integrations/react/firebase-integration.md) - 实时同步的对等模式