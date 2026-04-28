--- 
title: "React Scheduler" 
sidebar_label: "Обзор" 
description: "Обзор обёртки React Scheduler, режимы привязки данных, варианты настройки и совместимость с фреймворками." 
---

# React Scheduler

:::note
React Scheduler доступен по лицензиям [Commercial, Enterprise и Ultimate].
Если вы используете Individuals или GPL-версии Scheduler, используйте [dhtmlxScheduler with React](integrations/react/js-scheduler-react.md).
:::

## Обзор

DHTMLX React Scheduler — официальный обёртка для DHTMLX Scheduler на React. Он предоставляет декларативный API для рендеринга и настройки Scheduler, при этом по‑прежнему обеспечивает доступ к встроенному экземпляру Scheduler, когда нужен более тонкий контроль.

**Ключевые особенности:**

- передавайте `events`, `view` и `date` как пропсы
- настраивайте поведение через `config` и `templates`
- обрабатывайте изменения пользователя через `data.save` или `data.batchSave`
- используйте `ref` для прямого доступа к методам API Scheduler

Если вы новичок в DHTMLX Scheduler, смотрите документацию DHTMLX Scheduler [документацию DHTMLX Scheduler](/guides/) для обзора возможностей.

## Установка и доступ к npm

Для оценки и установки профессионального пакета смотрите:

- [Установка](integrations/react/installation.md)

## Требования к версии

- React `18+`

## Основное использование

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

## Привязка данных {#bindingdata}

React Scheduler поддерживает две модели привязки данных.

### React-состояние как источник истины (рекомендовано)

В этой модели React (или менеджер состояний) владеет данными об событиях:

- Scheduler читает события из пропсов
- изменения пользователя вызывают ваш колбэк `data.save`
- колбэк обновляет состояние React
- React повторно рендерит Scheduler с обновлёнными пропсами

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

Эта модель особенно удобна, когда другие элементы UI на React должны оставаться синхронизированными с данными Scheduler.

### Scheduler как источник истины

В этой модели Scheduler управляет своим внутренним состоянием и перенаправляет изменения в ваш бэкенд.

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

Эта модель полезна, когда React не нужен для немедленного отражения каждого обновления.

### Загрузка данных

Данные можно загрузить, используя либо пропсы, либо `data.load`:

```tsx
// Загрузка через пропсы
<ReactScheduler events={eventsFromState} />

// Загрузка через транспорт
<ReactScheduler data={{ load: "/api/scheduler/load" }} />
```

Для требований к формату данных смотрите [Загрузка данных](guides/loading-data.md).

### Сохранение изменений

`data.save` может быть URL-адресом или колбэком.

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

Для деталей поведения на стороне бэкенда смотрите [Server Integration](guides/server-integration.md).

## Замена Lightbox

Scheduler включает встроенный редактор событий под названием [Lightbox](guides/lightbox-editors.md).

Его можно заменить, используя `customLightbox`:

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

Вы также можете перехватить открытие редактора с помощью `onBeforeLightbox`:

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

Справка: [onBeforeLightbox](api/event/onbeforelightbox.md)

## Замена встроенных модальных окон

Удаление можно переопределить через `modals`.

```tsx
<ReactScheduler
  modals={{
    onBeforeEventDelete: ({ event, callback, schedulerInstance }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback(); // вызов колбэка удалит событие
      }
    },
  }}
/>
```

### Настройка модального окна подтверждения повторяемости {#customizingtherecurrenceconfirmationmodal}

Когда пользователь редактирует или перетаскивает повторяющееся событие, появляется модальное окно подтверждения, которое спрашивает: изменить только это вхождение, это и последующие события или всю серию. Можно заменить встроенный диалог на свой через `modals.onRecurrenceConfirm`.

Колбек получает контекст и должен вернуть решение (или Promise, который резолвится в решение):

| Поле | Тип | Описание |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | Было ли действие инициировано из Lightbox или перетаскиванием |
| `occurrence` | `any` | Конкретное вхождение, которое редактируется |
| `series` | `any` | Родительская повторяющаяся задача |
| `labels` | `object` | Локализованные подписи: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | Доступные варианты, например `["occurrence", "following", "series"]` |

Возвращаемое значение (`RecurrenceDecision`): `"occurrence"`, `"following"`, `"series"`, или `null` для отмены.

Пример:

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

## Фильтрация

Используйте проп `filter`, чтобы управлять тем, какие события отображаются:

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

## Доступ к базовому API Scheduler

Когда пропсов недостаточно, получите доступ к экземпляру Scheduler через `ref`:

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

Если вы мутируете Scheduler напрямую, держите пропсы React синхронизированными, чтобы избежать дрейфа состояния.

Смотрите [Обзор методов Scheduler](api/overview/methods_overview.md) для доступных методов.

#### Избегайте конфликтов с пропсами React

- Если вы вручную вызываете `scheduler.parse(( events ))` или `scheduler.addEvent()` в вашем коде, учтите, что возможно потребуется синхронизировать пропсы React. Иначе при следующем рендере React может перезаписать ваши ручные изменения.
- Рекомендуемый подход — полагаться на пропсы обёртки для событий или управлять ими в вашем состоянии React. Затем позвольте обёртке выполнить повторный разбор.

## Совместимость с SSR-фреймворками (Next.js, Remix)

:::note
React Scheduler поддерживает SSR. Во время серверного рендера он выводит контейнер-заглушку и выполняет гидратацию на клиенте.
:::

Используйте руководства, специфичные для фреймворка, для деталей:

- [React Scheduler с Next.js](integrations/react/nextjs.md)
- [React Scheduler с Remix](integrations/react/remix.md)

## Дальнейшие шаги

- [Настройки](integrations/react/configuration-props.md)
- [Привязка данных и основы управления состоянием](integrations/react/state/state-management-basics.md)
- [Быстрый старт](integrations/react/quick-start.md)