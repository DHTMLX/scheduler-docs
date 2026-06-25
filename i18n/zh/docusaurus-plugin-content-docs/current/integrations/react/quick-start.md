---
title: React Scheduler 快速入门
sidebar_label: 快速入门
description: '逐步指南，使用 React Scheduler 组件'
---

# React Scheduler 快速入门

:::note
本教程涵盖 DHTMLX Scheduler 的商业版、企业版与终极版中包含的 React wrapper。
如果您使用的是 **个人版** 或 **GPL 版**，请参阅替代指南：
[如何在 React 中开始](integrations/react/js-scheduler-react.md)。
:::

The **React Scheduler** 组件是 **DHTMLX Scheduler** 的官方包装器。
本指南将带你创建一个小型 React 应用并使用试用包渲染一个基本的 Scheduler。

如果你是 React 新手，请从官方 [React 文档](https://react.dev/learn) 开始学习。也可以查看在 GitHub 上遵循本教程的完整工作项目：
[a complete working project that follows this tutorial on GitHub](https://github.com/dhtmlx/react-scheduler-quick-start)。

## 版本要求

- React **18 及以上版本**

## 创建一个新的 React 项目

要创建一个 React 项目并进入项目目录，请运行以下命令：

~~~bash
npm create vite@latest react-scheduler-quick-start -- --template react-ts
cd react-scheduler-quick-start
~~~

### 安装 React Scheduler

按照 [React Scheduler 安装指南](integrations/react/installation.md) 的说明安装。

在本教程中，我们使用评估包：

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

或

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

如果您已经使用 Professional 包，请在命令与导入中将 `@dhtmlx/trial-react-scheduler` 替换为 `@dhx/react-scheduler`。

## 添加演示数据

我们在这个示例中使用静态数据。创建一个名为 `src/demoData.ts` 的文件：

~~~ts
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
  // ....
];
~~~  

## 创建一个 Scheduler 组件

要添加一个 Scheduler 组件，请创建 `src/components/Scheduler/Scheduler.tsx` 文件，内容如下：

~~~tsx
import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';
import './styles.css';

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

最后，CSS 类（`.violet`、`.green`、`.yellow`）通过 `event_class` 模板应用，用于自定义事件的视觉外观：

~~~css
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

## 在应用中渲染 Scheduler

要在应用中显示 Scheduler，请将 `src/App.tsx` 的代码替换为以下代码：

~~~tsx
import './App.css';
import Scheduler from './components/Scheduler/Scheduler';
import { events } from './demoData';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scheduler events={events} />
    </div>
  );
}

export default App;
~~~

之后，请使用下面的命令运行应用：

~~~bash
npm run dev
~~~

到此，你将拥有一个 **完全可运行的 React + DHTMLX Scheduler 应用**。

该设置代表实现以下目标所需的 **最小配置**：

- 渲染一个 Scheduler
- 显示事件
- 应用一个基本的比例配置
- 通过 React ref 附加 Scheduler 实例
- 通过 `data.save` 回调接收事件

这是在 [GitHub 演示项目](https://github.com/dhtmlx/react-scheduler-quick-start) 中使用的相同最小示例。

从这里开始，你可以通过添加更高级的功能来继续：

- 与 React 状态同步数据
- 从后端加载/保存数据
- 添加模板和自定义渲染器
- 添加筛选
- 用自定义组件替换 Lightbox

接下来的各节将逐一介绍这些能力。

## 使用 React state 作为数据源（真相源）

（适用于大多数 React 应用的推荐做法）

在实际应用中，事件通常来自 React 状态。下面是一个完整示例，其中 Scheduler 通过 `data.save` 回调将更改发送回 React。

~~~tsx
import { useState } from 'react';
import ReactScheduler, { Event } from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';
import { events as initialEvents } from './demoData';

export default function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const data = {
    save: (entity, action, item, id) => {
      if (entity === 'event') {
        if (action === 'create') setEvents((prev) => [...prev, item]);
        if (action === 'update') setEvents((prev) => prev.map((x) => (x.id === id ? item : x)));
        if (action === 'delete') setEvents((prev) => prev.filter((x) => x.id !== id));
      }
    },
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactScheduler
        events={events}
        data={data}
        // ...其他属性
      />
    </div>
  );
}
~~~

### 为什么选择这种模式

- React 总是看到与 Scheduler UI 相同的数据
- 与 Redux / Zustand / Jotai / MobX 兼容良好
- 易于与后端 API 同步

## 替代模式：Scheduler 作为真相源

（适用于非常大规模的数据集）

在此模式下，React 不拥有事件。

~~~tsx
<ReactScheduler
  data={{
    load: '/api/data', // Scheduler 从这里加载初始事件
    save: '/api/data', // Scheduler 将更新发送到这里
  }}
/>
~~~

### 何时更偏好此模式

- 数万条事件
- 频繁的用户交互与更新
- 你希望最小化 React 渲染开销

## 使用模板

（从模板函数返回 React 元素）

模板几乎可以自定义调度器的每一个部分。

~~~tsx
import ReactScheduler, { SchedulerTemplates } from '@dhtmlx/trial-react-scheduler';
import { useMemo } from 'react';
import EventTextBox from './components/EventTextBox';

const templates: SchedulerTemplates = useMemo(
  () => ({
    event_class: (start, end, event) => {
      return 'templates-' + event.classname || '';
    },
    event_text: (start, end, event) => {
      return <EventTextBox event={event} />;
    },
  }),
  []
);

<ReactScheduler templates={templates} />;
~~~

### 更多细节

请参阅完整章节：[React Scheduler 模板文档](integrations/react/configuration-props.md)。

## GitHub 演示仓库

一个遵循本教程的完整工作项目已在 GitHub 提供：[GitHub 演示仓库](https://github.com/dhtmlx/react-scheduler-quick-start)。

## 下一步

- 学习所有可用的 [React Scheduler 属性](integrations/react/configuration-props.md)
- 在 [Guides](/guides/) 中探索高级 Scheduler 功能