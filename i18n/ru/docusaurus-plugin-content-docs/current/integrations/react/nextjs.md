---
title: React Scheduler с Next.js
sidebar_label: Next.js
description: Узнайте, как интегрировать DHTMLX React Scheduler с Next.js, используя App Router, включая настройку клиентского компонента и демонстрационные данные.
---

# React Scheduler с Next.js

Это руководство показывает, как создать простое приложение на **Next.js** и отобразить **DHTMLX React Scheduler** на странице.

:::note
Полный исходный код [доступен на GitHub](https://github.com/dhtmlx/react-scheduler-nextjs-starter).
:::

## Требования

- Node.js (рекомендуется LTS)
- основы React + TypeScript
- основы Next.js (App Router, Server/Client Components). Если нужен повтор, см. документацию Next.js: https://nextjs.org/docs

## Быстрая настройка — создание проекта

Чтобы сгенерировать каркас приложения Next.js, выполните:

~~~bash
npx create-next-app@latest
~~~

При запросе выберите:

- Название проекта: **react-scheduler-nextjs-quick-start**
- Использовать шаблон по умолчанию (TypeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js создаст структуру проекта и установит базовые зависимости.

После установки перейдите в директорию проекта:

```bash
cd react-scheduler-nextjs-quick-start
```

### Установка React Scheduler

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом руководстве мы используем демонстрационный пакет:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортах.

## Подготовка демонстрационных данных

Создайте папку `data/` в корне проекта. Внутри нее добавьте файл `demoData.ts`, содержащий начальные данные для Scheduler:

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
Сопутствующая демо-версия включает дополнительные события для более богатой визуализации.
:::

## Создание компонента Scheduler

Next.js по умолчанию использует Server Components, но React Scheduler в большинстве практических случаев следует рендерить внутри Client Component.

Это требуется, когда вы:

- используете `ref` для доступа к экземпляру Scheduler
- передаете колбэки (events, templates, data handlers)
- используете ReactScheduler `hooks`
- предоставляете динамическую конфигурацию или элементы React

Поэтому наш компонент Scheduler будет начинаться с `"use client"`.

Создайте новый файл по пути `components/Scheduler/Scheduler.tsx`:

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

Этот компонент инициализирует Scheduler и предоставляет ему конфигурацию, начальные данные и `ref` для будущих вызовов API. Объект `config` управляет макетом временной шкалы, в то время как свойства `events` задают набор данных Scheduler. Мы также передаем `activeView` и `activeDate` как свойства, чтобы родительский компонент управлял тем, что отображает Scheduler.

Функция `save`, находящаяся внутри пропа `data`, используется для отслеживания изменений, внесённых в события внутри Scheduler. В этом руководстве мы добавляем простой обработчик-заглушку для отслеживания изменений. Если вы хотите отправлять обновления на бэкенд или связывать их со состоянием React, вы можете следовать официальному руководству по привязке данных [guide](integrations/react/overview.md#bindingdata).

## Добавление стилей цвета событий

CSS-классы (`.blue`, `.violet`, `.green`, `.yellow`) применяются через шаблон `event_class` для настройки визуального вида событий. Добавьте следующее в `app/globals.css`:

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
Чтобы Scheduler занимал всю страницу максимально чисто, удалите переменные темы по умолчанию для тёмного режима из `app/globals.css` и убедитесь, что у body нет лишних отступов (margin):

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## Добавление Scheduler на страницу

Откройте `app/page.tsx` и отобразите Scheduler на главной странице:

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

Теперь страница будет отображать полноэкранный Scheduler.

## Запуск приложения

Запустите сервер разработки:

~~~bash
npm run dev
~~~

Затем откройте `http://localhost:3000` в вашем браузере. Вы увидите работающий Scheduler с начальными данными внутри приложения Next.js.

## Резюме

У вас now есть минимальный проект на Next.js с DHTMLX React Scheduler:

- Scheduler рендерится как Client Component (`"use client"`) внутри App Router Next.js
- демо-данные загружаются из отдельного файла и передаются как пропсы
- шаблон `event_class` применяет настраиваемые цветовые градиенты к событиям
- обратный вызов `data.save` регистрирует правки в консоли (готов к интеграции с бэкендом)

## Что дальше

- [Поток данных, управляемый React](integrations/react/overview.md#bindingdata)
- [Документация по шаблонам React Scheduler](integrations/react/configuration-props.md)
- Изучение интеграций управления состоянием:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
  - [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)