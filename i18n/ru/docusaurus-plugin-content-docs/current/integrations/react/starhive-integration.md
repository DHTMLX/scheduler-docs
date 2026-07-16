--- 
title: Интеграция React Scheduler и Starhive  
sidebar_label: Быстрый старт Starhive  
description: "Подключение DHTMLX React Scheduler к NoSQL-бэкенду Starhive через маршруты API Next.js."  
---

# Интеграция React Scheduler и Starhive

Этот учебник подключает **React Scheduler** к NoSQL-бэкенду **Starhive** через обработчики маршрутов Next.js. Starhive предоставляет типизированную схему и сгенерированный клиент TypeScript, поэтому уровень API остаётся минимальным: один конечный пункт загружает события и ресурсы, другой обрабатывает создание / обновление / удаление.

Вы создадите:

- страницу Next.js, которая размещает Scheduler в клиентском компоненте
- `/api/load` - получает события и ресурсы из Starhive при первом рендере
- `/api/event` (POST) и `/api/event/[id]` (PUT, DELETE) - пути записи, используемые Scheduler `dataBridge`

:::note
Полный исходный код доступен на GitHub (ссылка в оригинальном источнике).
:::

## Требования

- основы Next.js + React + TypeScript
- Node.js 18+
- учетная запись [Starhive](https://starhive.com/) (30-дневная пробная версия подходит)

## Шаг 1. Создайте проект

```bash
npx create-next-app@latest react-scheduler-starhive-demo
cd react-scheduler-starhive-demo
```

Установите React Scheduler согласно руководству по установке [React Scheduler](integrations/react/installation.md). Для оценки:

```bash
npm install @dhtmlx/trial-react-scheduler
```

Если вы уже используете пакет Professional, замените `@dhtmlx/trial-react-scheduler` на `@dhx/react-scheduler` в командах и импортируемых элементах.

Также потребуется `axios` — это зависимость-партнёр сгенерированного клиентского Starhive TypeScript. 

```bash
npm install axios
```

## Шаг 2. Настройте пространство Starhive

После входа в систему нажмите **+ Create** в правом верхнем углу и назовите пространство как `Scheduler`.

Внутри пространства создайте два типа: `Resources` и `Events`. Resources хранят строки временной шкалы (команды, люди, комнаты и т. п.). Events ссылаются на один Resource.

Добавьте следующие атрибуты через кнопку **+ Attribute**. Starhive автоматически создаёт `id` для каждого элемента, поэтому объявлять его не нужно.

**Resources type**

| Поле   | Тип |
| ------- | ---- |
| `label` | Text |

**Events type**

| Поле         | Тип                       |
| ------------- | -------------------------- |
| `text`        | Text                       |
| `start_date`  | Date & Time                |
| `end_date`    | Date & Time                |
| `resource_id` | Reference → Resources      |

## Шаг 3. Импорт данных образца

Создайте `scheduler_resources.csv`:

```csv
label
"Frontend Team"
"Backend Team"
"QA Team"
"DevOps"
"Security Team"
```

И `scheduler_events.csv`:

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

В интерфейсе Starhive откройте тип и нажмите CSV импорт для каждого файла.

## Шаг 4. Сгенерируйте и скопируйте схему

Перейдите в **Settings → API Connectors**. Выберите пространство `Scheduler`, укажите язык TypeScript, нажмите **Generate**, затем **Download**.

Распакуйте архив, найдите папку `starhive` в `project/src/io/` и скопируйте её в `lib/starhive/` в вашем проекте Next.js. Сгенерированные файлы содержат рабочие UUID, поэтому повторяйте этот шаг каждый раз, когда схема меняется или вы переключаетесь между рабочими пространствами.

:::note
На момент написания генератор TypeScript Starhive выводит код, который не проходит строгий TypeScript: отсутствует ссылка на `Sla.ts`, реализация `visitSlaAttribute` в литерале `AttributeVisitor`, и вызов `client.request<T>` против поля типа `any` (TS2347). Со стороны демонстрационного репозитория есть три минимальных патча, которые решают эти проблемы; смотрите [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/) для диффов. Повторно применяйте те же патчи при повторной генерации схемы, пока Starhive не выпустит исправление.
:::

## Шаг 5. Настройте клиента Starhive

Создайте `lib/starhiveClient.ts`:

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

Функция кэширует клиент на уровне модуля, чтобы обработчики маршрутов использовали один экземпляр.

Добавьте `.env.local` (или `.env`) в корень проекта:

```env title=".env.local"
STARHIVE_API_TOKEN=ваш-api-токен
STARHIVE_WORKSPACE_ID=ваш-id-рабочего-пространства
```

Сгенерируйте токен API в разделе **Settings → Personal access tokens**. ID рабочего пространства — это фрагмент пути в `https://app.starhive.com/workspace/<workspace-id>/home`.

## Шаг 6. Загружайте события и ресурсы

Создайте `app/api/load/route.ts`:

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
    return NextResponse.json({ error: 'Не удалось загрузить данные' }, { status: 500 });
  }
}
```

Функция `normalizeEvents` превращает каждый объект Starhive в форму, которую ожидает React Scheduler: `{ id, text, start_date, end_date, resource_id }`. Ресурсы сводятся к `{ key, label }`, что и требуется для `y_unit` у представления временной шкалы.

После запуска dev-сервера перейдите по адресу `http://localhost:3000/api/load`, чтобы проверить форму JSON.

## Шаг 7. Рендеринг Scheduler и загрузка событий

Создайте `app/page.tsx`:

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
        console.error('Не удалось загрузить данные ресурсов:', error);
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

Флаг `loading` предпочтительнее проверки `events.length` или `resources.length`: рабочее пространство может действительно не содержать событий и тем не менее нужно отрисовать пустой Scheduler, а не показывать загрузчик.

Запустите `npm run dev` — временная шкала появится вместе с импортированными событиями, сгруппированными по ресурсам.

## Шаг 8. Реализуйте Endpoints CRUD

Scheduler `dataBridge` вызывает три endpoint’а — POST для создания, PUT для обновления, DELETE для удаления — и ожидает определённые формы ответов:

| HTTP-метод | Endpoint                  | Ответ                          |
| ----------- | ------------------------- | --------------------------------- |
| `GET`       | `/api/load`               | `{ events, resources }`           |
| `POST`      | `/api/event`              | `{ action: "inserted", tid: id }` |
| `PUT`       | `/api/event/{event_id}`   | `{ action: "updated" }`           |
| `DELETE`    | `/api/event/{event_id}`   | `{ action: "deleted" }`           |

Создайте обработчик POST по адресу `app/api/event/route.ts`:

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

И динамические обработчики PUT/DELETE по адресу `app/api/event/[id]/route.ts`:

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
В Next.js 15+ аргумент `params` у динамических обработчиков маршрутов является `Promise`. Всегда указывайте тип как `Promise<{...}>` и `await` его перед чтением сегментов — пропуск обёртки `Promise<>` в некоторых сборках может компилироваться, но не проходить строгий режим.
:::

## Шаг 9. Подключите dataBridge

Создайте небольшой клиентский помощник на стороне клиента в `services/scheduler.ts`:

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

Затем подключите `dataBridge` к странице. Обновите `app/page.tsx`, добавив импорты и свойство `data` у `<ReactScheduler>`:

```tsx title="app/page.tsx"
import { createEvent, deleteEvent, updateEvent } from '@/services/scheduler';

// внутри компонента Scheduler:
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

// передайте его компоненту:
<ReactScheduler
  events={events}
  data={dataBridge}
  date={new Date("2026-04-01T00:00:00Z")}
  views={views}
  view={"timeline"}
/>
```

## Протестируйте

```bash
npm run dev
```

Откройте `http://localhost:3000`, перетащите событие в новое время, отредактируйте его текст и удалите одно. Каждое изменение должно немедленно отражаться в интерфейсе Starhive под типом `Events`.

## Заметки по интеграции Starhive

- **Серверные креденшлы только на сервере.** `STARHIVE_API_TOKEN` и `STARHIVE_WORKSPACE_ID` читаются внутри обработчиков маршрутов (`getStarhiveClient`); они не попадают в браузерный бандл. Не переносите клиент Starhive в Клиентский компонент и не публикуйте токен через переменные `NEXT_PUBLIC_*`.
- **Регенерация схемы.** Всякий раз, когда вы добавляете или переименовываете атрибуты в Starhive, регенерируйте TypeScript-схему и заменяйте `lib/starhive/`. Повторно применяйте патчи в [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/), если сборка `next build` жалуется на аналогичные upstream-проблемы.
- **Нет привязки к реальному времени.** В отличие от интеграции с Firebase, Starhive не отправляет изменения подключённым клиентам. Несколько пользователей, редактирующих один Scheduler, могут перезаписывать изменения друг друга. Для много-пользовательских сценариев добавляйте опрос на стороне клиента — или подключайте вебхуки Starhive для отправки уведомлений об инвалидации через SSE / WebSockets и обновляйте состояние `events` при удалённых изменениях.
- **Динамическая загрузка больших наборов данных.** Маршрут `/api/load` загружает каждое событие в рабочем пространстве. В продакшне можно принимать параметры запроса `from` / `to` в обработчике GET, фильтровать по `start_date` / `end_date` и вызывать `scheduler.setLoadMode("day")` на клиенте, чтобы подгружался только видимый диапазон.
- **Справочные атрибуты возвращают массивы.** `Events.getResourceId()` возвращает `string[] | undefined`, потому что ссылочные атрибуты Starhive могут быть мультивалентными. Демка разворачивает через `?.[0] || null`. Если вы разрешаете событиям принадлежать нескольким ресурсам, измените разрешение `y_property` у представления timeline и соответствующим образом обновите вызовы `normalize` / `builder`.

## Связанные страницы

- [Основы связывания данных и управления состоянием](integrations/react/state/state-management-basics.md)  
- [Обзор React Scheduler](integrations/react/overview.md#bindingdata)  
- [Серверная интеграция](guides/server-integration.md)  
- [React Scheduler и интеграция с Firebase](integrations/react/firebase-integration.md) — соседняя схема с синхронизацией в реальном времени