---
title: Быстрый старт с React Scheduler
sidebar_label: Быстрый старт
description: 'Пошаговое руководство по использованию компонента React Scheduler'
---

# Быстрый старт с React Scheduler

:::note
Этот туториал охватывает React-обёртку, входящую в выпуски DHTMLX Scheduler: Commercial, Enterprise и Ultimate.
Если вы используете издания **Individual** или **GPL**, следуйте альтернативному руководству:
[Как начать работу с React](integrations/react/js-scheduler-react.md).
:::

Компонент **React Scheduler** — официальная обёртка для **DHTMLX Scheduler**.
Это руководство проведёт вас через создание небольшого приложения на React и отображение базового Scheduler с использованием trial-пакета.

Если вы новичок в React, начните с официальной [документации по React](https://react.dev/learn). Ознакомьтесь с [полным рабочим проектом, соответствующим этому руководству, на GitHub](https://github.com/dhtmlx/react-scheduler-quick-start).

## Требования к версии

- React **18 и выше**

## Создание нового проекта на React

Чтобы создать проект на React и перейти в директорию проекта, выполните следующие команды:

~~~bash
npm create vite@latest react-scheduler-quick-start -- --template react-ts
cd react-scheduler-quick-start
~~~

### Установка React Scheduler

Установите React Scheduler, как описано в [руководстве по установке React Scheduler](integrations/react/installation.md).

В этом руководстве мы используем evaluатion-пакет:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

или

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Если вы уже используете пакет Professional, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортах.

## Добавление демонстрационных данных

Для этого примера мы будем использовать статические данные. Создайте файл с именем `src/demoData.ts`:

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



## Создание компонента Scheduler

Чтобы добавить компонент Scheduler, создайте файл `src/components/Scheduler/Scheduler.tsx` со следующим содержимым:

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


Наконец, CSS-классы (`.violet`, `.green`, `.yellow`) применяются через шаблон `event_class` для настройки внешнего вида событий:

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


## Отображение Scheduler в приложении

Чтобы отобразить Scheduler, замените код в `src/App.tsx` на следующий:

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


После этого запустите приложение с помощью следующей команды:

~~~bash
npm run dev
~~~


На данный момент у вас полностью работающее приложение на React + DHTMLX Scheduler.

Эта конфигурация представляет собой минимальную настройку, необходимую для:

- отрисовки Scheduler
- отображения событий
- применения базовой конфигурации масштаба
- прикрепления экземпляра Scheduler через React ref
- получения событий через обратный вызов `data.save`

Это тот же минимальный пример, используемый в демонстрационном проекте на GitHub.

Далее вы можете продолжать, добавляя более продвинутые функции:

- синхронизацию данных с состоянием React
- загрузку/сохранение данных с вашего бэкенда
- добавление шаблонов и пользовательских рендереров
- добавление фильтрации
- замену Lightbox на собственный компонент

Следующие разделы поочерёдно вводят эти возможности.

## Использование состояния React в качестве источника истины

_(рекомендуется для большинства приложений на React)_

В реальных приложениях события обычно поступают из состояния React.
Ниже приведён полный пример, в котором Scheduler **отправляет изменения обратно в React** через обратный вызов `data.save`.

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
        // ...other props
      />
    </div>
  );
}
~~~

### Почему стоит выбрать этот режим

- React всегда видит те же данные, что и UI Scheduler
- Работает безупречно с Redux / Zustand / Jotai / MobX
- Легко синхронизировать с API бэкенда

## Альтернативный режим: Scheduler — источник истины

_(полезен для очень больших наборов данных)_

В этом режиме React не владеет событиями.

~~~tsx
<ReactScheduler
  data={{
    load: '/api/data', // scheduler loads initial events from here
    save: '/api/data', // scheduler sends updates back here
  }}
/>
~~~

### Когда стоит предпочитать этот режим

- Десятки тысяч событий
- Частые взаимодействия пользователей и обновления
- Вы хотите минимизировать накладные расходы на рендеринг React

## Использование шаблонов

_(возвращайте элементы React из функций шаблонов)_

Шаблоны позволяют настраивать практически каждую часть планировщика.

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

### Подробнее

См. полную секцию здесь: [Документация по шаблонам React Scheduler](integrations/react/configuration-props.md).

## Репозиторий демонстрации GitHub

Полностью рабочий проект, следующий за этим руководством, доступен на GitHub: https://github.com/dhtmlx/react-scheduler-quick-start

## Следующие шаги

- Изучите все доступные свойства компонента [React Scheduler props](integrations/react/configuration-props.md)
- Исследуйте продвинутые функции Scheduler в разделе [Руководства](/guides/)