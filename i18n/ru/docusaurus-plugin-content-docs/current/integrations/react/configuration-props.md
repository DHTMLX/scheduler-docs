---
title: Использование свойств DHTMLX Scheduler в ReactScheduler
sidebar_label: Конфигурация
description: "Полная справка об обертках пропсов, сопоставляемых с конфигурацией Scheduler, шаблонами, событиями и обратными вызовами данных."
---

# Использование свойств DHTMLX Scheduler в ReactScheduler

Эта страница описывает пропсы, принятые **React Scheduler**, и как они сопоставляются с API DHTMLX Scheduler.

## Доступные свойства

| Свойство | Тип | Описание |
|---|---|---|
| `events` | `Event[]` | События Scheduler, которые нужно отобразить. |
| `view` | `"day" \| "week" \| "month" \| "year" \| ...` | Активный вид Scheduler. |
| `date` | `Date` | Активная дата, используемая для отображения выбранного вида. |
| `templates` | `SchedulerTemplates` | Соответствует шаблонам Scheduler (например, рендеринг стиля/текста события). |
| `config` | `SchedulerConfig` | Соответствует параметрам конфигурации Scheduler. |
| `xy` | `Record<string, number>` | Настройки размера пользовательского интерфейса (например, скрытие встроенной навигации через `nav_height: 0`). |
| `data` | `{ load?: string \| (() => Promise<any>); save?: string \| SaveHandler; batchSave?: BatchSaveHandler }` | Загрузка данных и обработка изменений: колбэки/URL-адреса. |
| `customLightbox` | `ReactElement \| null` | Заменяет встроенный Lightbox вашим React-компонентом. |
| `modals` | `SchedulerModals` | Переопределяет встроенные диалоги подтверждения (например, подтверждение удаления события). |
| `filter` | `(event: Event) => boolean` | Фильтрует события, отображаемые в Scheduler. |
| `on<EventName>` props | `(...args) => any` | Обработчики событий, сопоставленные с событиями Scheduler (`onViewChange`, `onBeforeLightbox` и т. д.). |

## Базовый пример

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

## Свойство data (`load`, `save`, `batchSave`)

Используйте свойство `data`, чтобы подключить Scheduler к вашему бэкенду или к состоянию, управляемому React.

### Использование URL-адресов бэкенда

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### Использование обработчиков обратного вызова

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

## Соответствие шаблонов и конфигурации

`templates` сопоставляются функциям шаблонов Scheduler, тогда как `config` сопоставляется с параметрами конфигурации Scheduler.

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

## Свойства событий

Вы можете передавать события Scheduler в качестве пропсов React.

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

Для полного списка поддерживаемых событий и колбэков смотрите:

- [Обзор событий Scheduler](api/overview/events_overview.md)
- [Обзор методов Scheduler](api/overview/methods_overview.md)
- [Обзор свойств Scheduler](api/overview/properties_overview.md)

## `customLightbox` и `modals`

Используйте `customLightbox`, когда хотите заменить встроенный редактор событий своим React-компонентом.
Используйте `modals`, когда нужны настраиваемые диалоги подтверждения.

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

## Фильтрация событий

```tsx
<ReactScheduler
  events={events}
  filter={(event) => event.text.toLowerCase().includes(search.toLowerCase())}
/>
```

## Прямой доступ к API через `ref`

Если ваш кейс не охвачен пропсами, используйте `ref` для получения базового экземпляра Scheduler.

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

## Связанные страницы

- [Обзор React Scheduler](integrations/react/overview.md)
- [Основы привязки данных и управления состоянием](integrations/react/state/state-management-basics.md)
- [Быстрый старт с React Scheduler](integrations/react/quick-start.md)