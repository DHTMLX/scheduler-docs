---
title: 使用 Next.js 的 React Scheduler
sidebar_label: Next.js
description: 了解如何在 Next.js 中使用 App Router 将 DHTMLX React Scheduler 集成到应用中，包括客户端组件的设置和演示数据。
---

# 使用 Next.js 的 React Scheduler

本教程演示如何创建一个简单的 **Next.js** 应用，并在页面上渲染一个 **DHTMLX React Scheduler**。

:::note
完整的源代码可在 [GitHub](https://github.com/dhtmlx/react-scheduler-nextjs-starter) 获取。
:::

## 前置条件

- Node.js（推荐使用 LTS 版本）
- React + TypeScript 基础
- Next.js 基础（App Router、Server/Client Components）。如需快速回顾，请参阅 Next.js 文档：https://nextjs.org/docs

## 快速开始 - 创建项目

要搭建一个 Next.js 应用，请执行：

~~~bash
npx create-next-app@latest
~~~

在提示时，选择：

- Project name: **react-scheduler-nextjs-quick-start**
- Use the default template (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js 将创建项目结构并安装基本依赖。

安装完成后，进入项目目录：

```bash
cd react-scheduler-nextjs-quick-start
```

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的说明安装 React Scheduler。

在本教程中我们使用 evaluation 包：

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

如果你已经使用 Professional 包，请在命令与导入中将 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

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

Next.js 默认使用 Server Components，但在实际应用中，React Scheduler 通常需要在 Client Component 中渲染。

只有在以下情况需要时才需要这样做：

- 使用 `ref` 访问 Scheduler 实例
- 传入回调（events、templates、data handlers）
- 使用 ReactScheduler `hooks`
- 提供动态配置或 React 元素

因此我们的 Scheduler 组件将以 `"use client"` 开头。

在 `components/Scheduler/Scheduler.tsx` 新建文件：

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

该组件初始化 Scheduler，并为其提供配置、初始数据以及用于将来 API 调用的 `ref`。`config` 对象控制时间线的布局，而 `events` 属性向 Scheduler 提供数据集。我们还通过 props 传递 `activeView` 和 `activeDate`，以便父组件控制 Scheduler 显示的内容。

`data` 属性中的 `save` 函数用于跟踪对 Scheduler 内事件的更新。在本教程中，我们添加了一个简单的占位处理程序来跟踪变更。如果你想将更新发送到后端或绑定到 React 状态，可以参考官方数据绑定指南（[数据绑定指南](integrations/react/overview.md#bindingdata)）。

## 为事件添加颜色样式

通过 `event_class` 模板应用的 CSS 类 (`.blue`, `.violet`, `.green`, `.yellow`) 用于自定义事件的视觉呈现。将以下内容添加到 `app/globals.css`：

~~~css title="app/globals.css"
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
为了让 Scheduler 完整占据页面，请从 `app/globals.css` 中移除默认的暗色模式主题变量，并确保 body 没有额外的 margin：

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## 将 Scheduler 添加到页面

打开 `app/page.tsx`，在主页面上渲染 Scheduler：

~~~tsx title="app/page.tsx"
import Scheduler from '../components/Scheduler/Scheduler';
import { events } from '../data/demoData';

export default function HomePage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Scheduler events={events} />
    </div>
  );
}
~~~

现在页面将显示一个全屏的 Scheduler。

## 启动应用程序

运行开发服务器：

~~~bash
npm run dev
~~~

然后在浏览器中打开 `http://localhost:3000`。现在你应该会看到在 Next.js 应用中运行的 Scheduler，且包含初始数据。

## 总结

你现在有了一个最小的 Next.js 项目，其中包含 DHTMLX React Scheduler：

- Scheduler 以 Client Component（`"use client"`）的形式渲染在 Next.js App Router 内部
- 演示数据从单独的文件加载并作为 props 传递
- `event_class` 模板为事件应用了自定义颜色渐变
- `data.save` 回调将编辑记录到控制台（可连接到后端）

## 下一步

- [基于 React 的数据流](integrations/react/overview.md#bindingdata)
- [React Scheduler 模板文档](integrations/react/configuration-props.md)
- 探索状态管理集成：
  - [使用 Redux Toolkit 的 React Scheduler](integrations/react/state/redux-toolkit.md)
  - [使用 MobX 的 React Scheduler](integrations/react/state/mobx.md)
  - [使用 Zustand 的 React Scheduler](integrations/react/state/zustand.md)