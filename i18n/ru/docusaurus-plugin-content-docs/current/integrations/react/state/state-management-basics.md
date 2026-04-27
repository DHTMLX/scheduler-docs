---
title: Привязка данных и управление состоянием. Базовый обзор в React Scheduler
sidebar_label: Основы
description: "Обзор двух моделей привязки данных в React Scheduler и базовые шаблоны работы со состоянием в React и менеджерах состояния."
---

# Привязка данных и управление состоянием в React Scheduler

React Scheduler поддерживает две модели привязки данных:

1. **React state как источник истины** (рекомендуется для большинства приложений на React)
2. **Scheduler как источник истины** (полезно в специализированных случаях с высокой пропускной способностью)

Обе модели допустимы. Выбирайте одну модель на экране и придерживайтесь её.

Если вы ещё не отобразили базовую диаграмму, начните с [Быстрого старта](integrations/react/quick-start.md).

## Модели данных

### React state как источник истины (рекомендовано)

В этой модели:

- вы храните `events` (и часто `view` / `date`) в состоянии React или у менеджера состояний
- вы передаёте это состояние в пропсы `<ReactScheduler />`
- Scheduler вызывает `data.save` / `data.batchSave` при редактировании данных пользователями
- вы обновляете состояние, и React повторно рендерит Scheduler с новыми пропсами

Используйте это, когда другие компоненты React должны синхронизироваться с данными Scheduler.

### Scheduler как источник истины

В этой модели:

- Scheduler загружает и мутирует данные внутри себя
- вы по желанию передаёте изменения в конечные точки бэкенда
- React не зеркалирует каждое обновление события в состоянии

Используйте эту модель, когда React не требует немедленного отражения каждого отдельного изменения Scheduler.

## React state как источник истины {#reactstateasthesourceoftruth}

### Минимальный пример

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

Этот шаблон делает React каноническим владельцем данных событий.

## Обработка изменений с помощью `data.save` {#handlingchangeswithdatasave}

`data.save` вызывается для каждого изменения пользователя:

```ts
(entity: string, action: string, item: any, id: string | number) => void | Promise<any>
```

Для CRUD событий Scheduler:

- `entity` равен `"event"`
- `action` равен `"create" | "update" | "delete"`
- `item` — созданное/обновлённое/удалённое событие
- `id` — идентификатор затронутого события

### Пример на стороне бэкенда

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

Если ваш бэкенд заменяет временные идентификаторы при создании, верните `{ id: realId }`, чтобы Scheduler мог согласовать клиентские и серверные идентификаторы.

## Групповые обновления с помощью `data.batchSave`

`data.batchSave` полезен, когда множество изменений отправляется за короткое время (например, плотные сеансы редактирования).

Используйте его, когда нужно:

- уменьшить число запросов за счёт отправки сгруппированных изменений
- обработать обновления в одной транзакции редуктора/хранилища

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

Используйте `save` для простой логики по изменению и `batchSave` для группированной синхронизации.

## Загрузка данных в состояние React

В управляемой React-моделью Scheduler получает данные из состояния React. Распространённые источники:

- локальное состояние компонента
- глобальный менеджер состояния (Redux Toolkit, Zustand, MobX, XState, Jotai, Valtio)
- вызовы API

### Источник локального состояния

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

### Источник через менеджер состояния

Каждая библиотека следует одинаковому потоку:

- селектор/хук считывает состояние
- пропсы передают данные Scheduler
- `data.save` инициирует действия/мутации в хранилище

```tsx
const events = useSchedulerStore((s) => s.events);
const onSave = useSchedulerStore((s) => s.handleSave);

<ReactScheduler events={events} data={{ save: onSave }} />;
```

Учебные материалы по работе со state-менеджером:

- [Использование React Scheduler с Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Использование React Scheduler с Zustand](integrations/react/state/zustand.md)
- [Использование React Scheduler с MobX](integrations/react/state/mobx.md)
- [Использование React Scheduler с XState](integrations/react/state/xstate.md)
- [Использование React Scheduler с Jotai](integrations/react/state/jotai.md)
- [Использование React Scheduler с Valtio](integrations/react/state/valtio.md)

### Источник загрузки через API

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

## Scheduler как источник истины {#schedulerasthesourceoftruth}

В этом режиме React рендерит компонент, но не хранит каноническое состояние событий.

### Пример транспорта через URL

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### Пример через колбэк

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

Используйте этот подход, когда Scheduler может оставаться основным хранилищем во время выполнения, и React не нуждается в отрисовке каждого обновления.

## Выбор подходящей модели

Используйте модель, управляемую React, когда:

- несколько компонентов React зависят от данных Scheduler
- нужна предсказуемая интеграция глобального состояния
- нужен простой undo/redo в состояниях приложения

Используйте модель, управляемую Scheduler, когда:

- React в основном отвечает за оболочку/макет
- вы предпочитаете управляемые Scheduler изменения во время выполнения
- серверный транспорт является основным механизмом синхронизации

## Что дальше

- [Обзор React Scheduler](integrations/react/overview.md#bindingdata)
- [Настройка React Scheduler](integrations/react/configuration-props.md)
- [Интеграция с сервером](guides/server-integration.md)