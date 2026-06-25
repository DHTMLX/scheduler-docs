---
title: React Scheduler с Remix
sidebar_label: Remix
description: Узнайте, как интегрировать DHTMLX React Scheduler с Remix (React Router v7), включая настройку клиентского компонента и демонстрационные данные.
---

# React Scheduler с Remix

Это руководство показывает, как создать простое приложение **Remix** и отрисовать **DHTMLX React Scheduler** на странице.

:::note
Полный исходный код доступен на GitHub: [GitHub](https://github.com/dhtmlx/react-scheduler-remix-starter).
:::

## Необходимые условия

- Node.js (рекомендуется LTS)
- Основы React + TypeScript
- Основы Remix / React Router. Если нужна повторная прокрутка, смотрите документацию Remix: https://remix.run/docs

## Быстрая настройка - создание проекта

Поскольку Remix теперь поставляется как часть **React Router v7**, рекомендуемый способ создания проекта:

~~~bash
npx create-react-router@latest
~~~

При prompts выберите:

- Имя проекта: **react-scheduler-remix-quick-start**
- Использовать шаблон по умолчанию (React, TypeScript, TailwindCSS, SSR)
- **Установить зависимости**: Да

После установки перейдите в каталог проекта:

```bash
cd react-scheduler-remix-quick-start
```

### Установка React Scheduler

Установите React Scheduler, как описано в [гайде установки React Scheduler](integrations/react/installation.md).

В этом уроке используем пакет для оценки:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Если вы уже используете Professional пакет, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортaх.

## Подготовка демонстрационных данных

Создайте папку `data/` в корне проекта. Внутри добавьте файл `demoData.ts`, содержащий начальные данные для Scheduler:

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
Сопутствующая демо-версия включает дополнительные события для более насыщенного визуального отображения.
:::

## Создание компонента Scheduler

Remix позволяет использовать клиентские компоненты через стандартную архитектуру React. Scheduler React следует отрисовывать внутри Client Component в большинстве практических случаев.

Это требуется в тех случаях, когда вы:

- используете `ref` для доступа к экземпляру Scheduler
- передаете колбэки (события, шаблоны, обработчики данных)
- используете ReactScheduler `hooks`
- предоставляете динамическую конфигурацию или React-элементы

Поэтому наш компонент Scheduler начнётся с `"use client"`.

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

Этот компонент инициализирует Scheduler и предоставляет ему конфигурацию, начальные данные и `ref` для будущих вызовов API. Объект `config` управляет компоновкой временной шкалы, в то время как свойство `events` передаёт Scheduler набор данных. Мы также передаём `activeView` и `activeDate` как свойства, чтобы родительский компонент контролировал, что отображает Scheduler.

Функция `save` внутри свойства `data` используется для отслеживания изменений, внесённых в события внутри Scheduler. В этом уроке мы добавляем простой заглушечный обработчик для отслеживания изменений. Если вы хотите отправлять обновления на бэкенд или связывать их со стейтом React, можно следовать официальному руководству по привязке данных [guide](integrations/react/overview.md#bindingdata).

## Добавление стилей цвета событий

CSS-классы (`.blue`, `.violet`, `.green`, `.yellow`) применяются через шаблон `event_class` для настройки визуального отображения событий. Добавьте следующее в `app/app.css`:

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
Чтобы Scheduler занял всю страницу чисто, убедитесь, что у body нет лишних отступов:

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## Отображение Scheduler в маршруте

Откройте главный маршрут страницы — `app/routes/home.tsx`. Замените его содержимое на следующее:

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

Теперь Scheduler будет отображаться на маршруте `/`.

## Запуск приложения

Запустите сервер разработки:

~~~bash
npm run dev
~~~

Затем откройте в браузере `http://localhost:5173`. Вы должны увидеть рабочий Scheduler с начальными данными внутри приложения Remix.

## Итог

У вас теперь минимальный проект Remix с DHTMLX React Scheduler:

- Scheduler рендерится как клиентский компонент (`"use client"`) внутри Remix / React Router v7
- демо-данные загружаются из отдельного файла и передаются как props
- шаблон `event_class` применяет пользовательские градиенты цветов к событиям
- колбэк `data.save` выводит правки в консоль (готов к подключению к бэкенду)

## Что дальше

- [Поток данных, управляемый React](integrations/react/overview.md#bindingdata)
- [Документация по шаблонам React Scheduler](integrations/react/configuration-props.md)
- Изучайте интеграции управления состоянием:
  - [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
  - [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)