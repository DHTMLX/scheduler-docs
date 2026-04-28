---
title: Remix 中的 React Scheduler
sidebar_label: Remix
description: 了解如何将 DHTMLX React Scheduler 与 Remix（React Router v7）集成，包括客户端组件的设置和演示数据。
---

# Remix 中的 React Scheduler

本教程展示如何创建一个简单的 **Remix** 应用并在页面上渲染一个 **DHTMLX React Scheduler**。

:::note
完整的源代码可在 [GitHub 上获取](https://github.com/dhtmlx/react-scheduler-remix-starter)。
:::

## 前提条件

- Node.js（推荐使用 LTS）
- React + TypeScript 基础
- Remix / React Router 基础知识。若需要快速回顾，请参阅 Remix 文档： https://remix.run/docs

## 快速设置 - 创建项目

由于 Remix 现已作为 React Router v7 的一部分发布，推荐的搭建项目方式是：

~~~bash
npx create-react-router@latest
~~~

在提示时选择：

- 项目名称：**react-scheduler-remix-quick-start**
- 使用默认模板（React、TypeScript、TailwindCSS、SSR）
- **Install dependencies**: Yes

安装完成后进入项目目录：

```bash
cd react-scheduler-remix-quick-start
```

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 中的说明进行安装。

在本教程中我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

如果你已经使用 Professional 包，请在命令和导入中将 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

## 准备演示数据

在项目根目录创建一个 `data/` 文件夹。在其中添加一个 `demoData.ts` 文件，包含 Scheduler 的初始数据：

~~~ts title="data/demoData.ts"
import type { Event } from '@dhtmlx/trial-react-scheduler';

export const events: Event[] = [
  {
    id: 1,
    classname: 'blue',
    start_date: new Date('2025-12-08T02:00:00Z'),
    end_date: new Date('2025-12-08T10:20:00Z'),
    text: 'Product Strategy Hike',
  },
  {
    id: 2,
    classname: 'blue',
    start_date: new Date('2025-12-08T12:00:00Z'),
    end_date: new Date('2025-12-08T16:00:00Z'),
    text: 'Agile Meditation and Release',
  },
  {
    id: 3,
    classname: 'violet',
    start_date: new Date('2025-12-09T06:00:00Z'),
    end_date: new Date('2025-12-09T11:00:00Z'),
    text: 'Tranquil Tea Time',
  },
  {
    id: 4,
    classname: 'green',
    start_date: new Date('2025-12-09T11:30:00Z'),
    end_date: new Date('2025-12-09T19:00:00Z'),
    text: 'Sprint Review and Retreat',
  },
  {
    id: 5,
    classname: 'yellow',
    start_date: new Date('2025-12-10T06:00:00Z'),
    end_date: new Date('2025-12-10T08:00:00Z'),
    text: 'Stakeholder Sunset Yoga Session',
  },
];
~~~

:::note
配套演示包含更多事件以获得更丰富的视觉效果。
:::

## 创建 Scheduler 组件

Remix 允许通过标准的 React 架构使用客户端组件。在大多数实际场景中，React Scheduler 应该在 Client Component 中渲染。

当你需要时刻访问 Scheduler 实例、传递回调（events、templates、data handlers）、使用 ReactScheduler 的 `hooks`、或提供动态配置/React 元素时，这一点就很重要。

因此，我们的 Scheduler 组件将以 `"use client"` 开头。

在 `components/Scheduler/Scheduler.tsx` 创建一个新文件：

~~~tsx title="components/Scheduler/Scheduler.tsx"
'use client';

import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';

export interface ReactSchedulerProps {
  events: Event[];
  activeView?: string;
  activeDate?: Date;
}

export default function Scheduler({
  events,
  activeView = 'week',
  activeDate = new Date('2025-12-08T00:00:00Z'),
}: ReactSchedulerProps) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (start: Date, end: Date, event: Event) => {
        return event.classname || '';
      },
    }),
    []
  );

  const config: SchedulerConfig = useMemo(() => {
    return {
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    };
  }, []);

  return (
    <ReactScheduler
      ref={schedulerRef}
      events={events}
      view={activeView}
      date={activeDate}
      templates={templates}
      config={config}
      data={{
        save: (entity: string, action: string, data: Event, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~

该组件初始化 Scheduler，并提供配置、初始数据，以及用于未来 API 调用的 `ref`。`config` 对象控制时间线的布局，而 `events` 属性为 Scheduler 提供数据集。我们还通过 props 传递 `activeView` 和 `activeDate`，以便父组件控制 Scheduler 显示的内容。

`data` 属性中的 `save` 函数用于跟踪 Scheduler 内对 events 的修改。在本教程中，我们添加了一个简单的占位处理程序来跟踪变更。如果你想将更新发送到后端或绑定到 React 状态，可以参考官方数据绑定指南（[integrations/react/overview.md#bindingdata](integrations/react/overview.md#bindingdata)）。

## 为事件添加颜色样式

通过 `event_class` 模板应用 CSS 类（`.blue`、`.violet`、`.green`、`.yellow`）来自定义事件的可视外观。将以下内容添加到 `app/app.css`：

~~~css title="app/app.css"
.blue {
  --dhx-scheduler-event-background: linear-gradient(180deg, #0e8af0 0%, #0ec1f0 100%);
}
.violet {
  --dhx-scheduler-event-background: linear-gradient(180deg, #d071ef 0%, #ee71d5 100%);
}
.green {
  --dhx-scheduler-event-background: linear-gradient(180deg, #12d979 0%, #1ecdeb 100%);
}
.yellow {
  --dhx-scheduler-event-background: linear-gradient(180deg, #ffb725 0%, #ffbb25 31.25%, #faea27 100%);
}
~~~

:::note
为了让 Scheduler 占满整个页面，请确保 body 没有额外的边距：

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## 在路由上渲染 Scheduler

打开主页面路由 — `app/routes/home.tsx`。将其内容替换为以下内容：

~~~tsx title="app/routes/home.tsx"
import { events } from '../../data/demoData';
import type { Route } from './+types/home';
import Scheduler from 'components/Scheduler/Scheduler';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Scheduler | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Scheduler | Remix (React Router) Quick Start' },
  ];
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scheduler events={events} />
    </div>
  );
}
~~~

现在 Scheduler 将显示在 `/` 路由上。

## 启动应用

运行开发服务器：

~~~bash
npm run dev
~~~

然后在浏览器中打开 `http://localhost:5173`。现在你应该能看到一个在 Remix 应用中工作的 Scheduler，包含初始数据。

## 摘要

现在你拥有一个最小化的 Remix 项目，其中集成了 DHTMLX React Scheduler：

- Scheduler 作为 Client Component（`"use client"`）渲染在 Remix / React Router v7 中
- 演示数据从单独的文件加载并作为 props 传递
- `event_class` 模板为事件应用自定义颜色渐变
- `data.save` 回调将编辑记录输出到控制台（可与后端对接）

## 下一步

- [基于 React 的数据流](integrations/react/overview.md#bindingdata)
- [React Scheduler 模板文档](integrations/react/configuration-props.md)
- 探索状态管理集成：
  - [将 React Scheduler 与 Redux Toolkit 配合使用](integrations/react/state/redux-toolkit.md)
  - [将 React Scheduler 与 MobX 配合使用](integrations/react/state/mobx.md)
  - [将 React Scheduler 与 Zustand 配合使用](integrations/react/state/zustand.md)