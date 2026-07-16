--- 
title: 리액트 스케줄러와 Starhive 통합
sidebar_label: Starhive 빠른 시작
description: "Next.js API 경로를 통해 DHTMLX React Scheduler를 Starhive NoSQL 백엔드에 연결합니다."
---

# 리액트 스케줄러와 Starhive 통합

이 자습서는 **React Scheduler**를 **Starhive** NoSQL 백엔드에 Next.js Route Handlers를 통해 연결합니다. Starhive는 타입이 지정된 스키마와 생성된 TypeScript 클라이언트를 제공하므로 API 계층은 최소화됩니다: 이벤트와 리소스를 로드하는 하나의 엔드포인트와 생성/수정/삭제를 처리하는 또 다른 엔드포인트가 있습니다.

다음과 같은 구성을 구축합니다:

- 클라이언트 컴포넌트에 Scheduler를 호스팅하는 Next.js 페이지
- `/api/load` - 첫 렌더링 시 Starhive에서 이벤트와 리소스를 가져옵니다
- `/api/event` (POST) 및 `/api/event/[id]` (PUT, DELETE) - Scheduler의 `dataBridge`가 사용하는 쓰기 경로

:::note
전체 소스 코드는 [GitHub에서 이용 가능](https://github.com/DHTMLX/react-scheduler-starhive-demo)합니다.
:::

## 전제 조건

- Next.js + React + TypeScript 기초 지식
- Node.js 18+
- Starhive 계정(30일 체험으로 충분)

## 1단계. 프로젝트 생성

```bash
npx create-next-app@latest react-scheduler-starhive-demo
cd react-scheduler-starhive-demo
```

React Scheduler를 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 설치합니다. 평가용으로:

```bash
npm install @dhtmlx/trial-react-scheduler
```

이미 Professional 패키지를 사용 중이라면 명령 및 가져오기에 있는 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 바꿉니다.

생성된 Starhive TypeScript 클라이언트의 피어 의존성이 필요한 경우도 있으므로 `axios`도 필요합니다.

```bash
npm install axios
```

## 2단계. Starhive 공간 설정

로그인 후 우측 상단 모서리에 있는 **+ Create**를 클릭하고 공간 이름을 `Scheduler`로 설정합니다.

공간 내부에서 두 가지 타입을 만듭니다: `Resources`와 `Events`. Resources는 타임라인의 행을 보유하고(팀, 사람, 방 등), Events는 하나의 Resources를 참조합니다.

다음 속성을 **+ Attribute** 버튼을 통해 추가합니다. Starhive는 각 항목의 `id`를 자동으로 생성하므로 직접 선언할 필요가 없습니다.

**Resources type**

| Field   | Type |
| ------- | ---- |
| `label` | Text |

**Events type**

| Field         | Type                       |
| ------------- | -------------------------- |
| `text`        | Text                       |
| `start_date`  | Date & Time                |
| `end_date`    | Date & Time                |
| `resource_id` | Reference → Resources      |

## 3단계. 샘플 데이터 가져오기

`scheduler_resources.csv`를 생성합니다:

```csv
label
"Frontend Team"
"Backend Team"
"QA Team"
"DevOps"
"Security Team"
```

그리고 `scheduler_events.csv`를 생성합니다:

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

Starhive UI에서 각 파일의 타입을 열고 **CSV import**를 클릭합니다.

## 4단계. 스키마 생성 및 복사

**Settings → API Connectors**로 이동합니다. `Scheduler` 공간을 선택하고 언어를 TypeScript로 설정한 다음 **Generate**, 그리고 **Download**를 클릭합니다.

압축을 풀고 `project/src/io/` 아래의 `starhive` 폴더를 찾은 뒤, Next.js 프로젝트의 `lib/starhive/`로 복사합니다. 생성된 파일은 작업공간별 UUID를 포함하고 있어 스키마가 변경되거나 워크스페이스를 전환할 때마다 이 단계를 반복해야 합니다.

:::note
작성 시점의 Starhive TypeScript 생성기는 엄격한 TypeScript를 통과하지 않는 출력(`Sla.ts` 참조 누락, 인라인 `AttributeVisitor` 리터럴의 구현 누락, `client.request<T>` 호출이 `any`로 타입된 필드에 대해 발생하는 TS2347 등)을 만들 수 있습니다. 보조 데모 저장소에는 이러한 문제를 해결하기 위한 세 가지 최소 패치가 포함되어 있습니다; [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/)에서 차이점을 확인하고 스키마를 재생성할 때마다 동일한 패치를 다시 적용하십시오. Starhive가 수정 사항을 공개할 때까지 계속 적용합니다.
:::

## 5단계. Starhive 클라이언트 구성

`lib/starhiveClient.ts`를 만듭니다:

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

함수는 모듈 범위에서 클라이언트를 캐시하므로 라우트 핸들러가 하나의 인스턴스를 공유합니다.

루트 프로젝트에 `.env.local`(또는 `.env`)를 추가합니다:

```env title=".env.local"
STARHIVE_API_TOKEN=your-api-token
STARHIVE_WORKSPACE_ID=your-workspace-id
```

API 토큰은 설정 → 개인 액세스 토큰에서 생성합니다. 워크스페이스 ID는 `https://app.starhive.com/workspace/<workspace-id>/home` 경로의 일부입니다.

## 6단계. 이벤트와 리소스 불러오기

`app/api/load/route.ts`를 생성합니다:

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
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
```

`normalizeEvents`는 각 Starhive 객체를 React Scheduler가 기대하는 형태로 평면화합니다: `{ id, text, start_date, end_date, resource_id }`. Resources는 `{ key, label }`로 축약되며 이는 타임라인 뷰의 `y_unit`에서 소비됩니다.

개발 서버를 시작한 후 `http://localhost:3000/api/load`를 방문해 JSON 형태를 확인합니다.

## 7단계. Scheduler 렌더링 및 이벤트 불러오기

`app/page.tsx`를 생성합니다:

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
        console.error('Failed to load resources data:', error);
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

로딩 플래그는 이벤트 수를 확인하는 것보다 Scheduler가 비어 있어도 로딩 화면에 머물지 않도록 하는 것이 좋습니다.

`npm run dev`를 실행하면 imported 이벤트가 리소스별로 그룹화된 타임라인이 표시됩니다.

## 8단계. CRUD 엔드포인트 구현

Scheduler의 `dataBridge`는 생성은 POST, 업데이트는 PUT, 삭제는 DELETE의 세 엔드포인트를 호출하며 다음과 같은 응답 형태를 기대합니다:

| HTTP 메서드 | 엔드포인트                 | 응답                          |
| ----------- | ------------------------- | ------------------------------ |
| `GET`       | `/api/load`               | `{ events, resources }`        |
| `POST`      | `/api/event`              | `{ action: "inserted", tid: id }` |
| `PUT`       | `/api/event/{event_id}`   | `{ action: "updated" }`        |
| `DELETE`    | `/api/event/{event_id}`   | `{ action: "deleted" }`        |

POST 핸들러를 `app/api/event/route.ts`에 만듭니다:

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

그리고 동적 PUT/DELETE 핸들러를 `app/api/event/[id]/route.ts`에 추가합니다:

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
Next.js 15+에서 동적 경로 핸들러의 `params` 인수는 `Promise`입니다. 값을 읽기 전에 반드시 `Promise<{...}>`로 타입을 지정하고 `await`하십시오. 일부 설정에서 `Promise<>` 래퍼를 생략하면 컴파일되지만 엄격 모드에서 실패합니다.
:::

## 9단계. dataBridge 연결

클라이언트 측의 작은 헬퍼를 `services/scheduler.ts`에 생성합니다:

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

그다음 페이지에 dataBridge를 연결합니다. imports를 추가하고 `<ReactScheduler>`에 `data` 속성을 추가합니다:

```tsx title="app/page.tsx"
import { createEvent, deleteEvent, updateEvent } from '@/services/scheduler';

// Scheduler 컴포넌트 내부:
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

// 컴포넌트에 데이터 브리지 전달:
<ReactScheduler
  events={events}
  data={dataBridge}
  date={new Date("2026-04-01T00:00:00Z")}
  views={views}
  view={"timeline"}
/>
```

테스트 방법

```bash
npm run dev
```

브라우저에서 http://localhost:3000 를 열고 이벤트를 드래그로 새 시간으로 옮기고, 텍스트를 편집하고 하나를 삭제해 보십시오. 각 변경 사항은 Starhive UI의 `Events` 타입 아래 즉시 반영됩니다.

## Starhive 통합에 대한 참고사항

- 서버 측 자격 증명만 사용합니다. `STARHIVE_API_TOKEN`과 `STARHIVE_WORKSPACE_ID`는 Route Handler 내부에서 읽히며 브라우저 번들에 노출되지 않습니다. 토큰을 Client Component로 올리거나 `NEXT_PUBLIC_*` 변수로 노출하지 마십시오.
- 스키마 재생성. Starhive의 속성을 추가하거나 이름을 바꿀 때는 TypeScript 스키마를 재생성하고 `lib/starhive/`를 교체합니다. 문제가 발생하면 [`lib/starhive/PATCHES.md`](https://github.com/DHTMLX/react-scheduler-starhive-demo/blob/main/lib/starhive/) 경로의 패치를 재적용하십시오.
- 실시간 동기화 없음. Firebase 통합과 달리 Starhive는 연결된 클라이언트에 변경 내용을 푸시하지 않습니다. 여러 사용자가 동일한 Scheduler를 편집하면 서로의 변경 사항이 덮어씌워질 수 있습니다. 다중 사용자 시나리오의 경우 클라이언트 측 폴링을 추가하거나 Starhive 웹훅을 사용해 SSE/웹소켓으로 무효화 이벤트를 보내고 원격 변경 시 `events` 상태를 새로고침하십시오.
- 대용량 데이터 세트의 동적 로딩. `/api/load` 경로는 워크스페이스의 모든 이벤트를 로드합니다. 프로덕션에서는 GET 핸들러에서 `from` / `to` 쿼리 매개변수를 받아 `start_date` / `end_date`를 필터링하고 클라이언트에서 `scheduler.setLoadMode("day")`를 호출하여 보이는 범위의 데이터만 가져오도록 하십시오.
- 참조 속성은 배열을 담습니다. `Events.getResourceId()`는 `string[] | undefined`를 반환합니다. Starhive의 참조 속성은 다-valued이기 때문입니다. 데모는 `?.[0] || null`로 평탄화합니다. 이벤트가 여러 리소스에 속하도록 허용하는 경우 타임라인 뷰의 `y_property` 해상도와 평탄화/빌더 호출을 이에 맞게 조정하십시오.

## 관련 페이지

- [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)
- [React Scheduler 개요](integrations/react/overview.md#bindingdata)
- [서버 통합](guides/server-integration.md)
- [React Scheduler와 Firebase 통합](integrations/react/firebase-integration.md) - 실시간 동기화의 형제 패턴