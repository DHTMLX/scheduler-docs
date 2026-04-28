--- 
title: ReactScheduler에서 DHTMLX Scheduler 속성 사용
sidebar_label: 구성
description: "\"React Scheduler\"의 래퍼 props 전체 참조로, Scheduler 구성, 템플릿, 이벤트 및 데이터 콜백에 매핑됩니다."
---

# ReactScheduler에서 DHTMLX Scheduler 속성 사용

이 페이지는 **React Scheduler**가 수락하는 props와 그것들이 DHTMLX Scheduler API에 어떻게 매핑되는지 설명합니다.

## 사용 가능한 속성

| 속성 | 유형 | 설명 |
|---|---|---|
| `events` | `Event[]` | 렌더링할 Scheduler 이벤트들. |
| `view` | `"day" \| "week" \| "month" \| "year" \| ...` | 활성 Scheduler 뷰. |
| `date` | `Date` | 선택된 보기를 렌더링하는 데 사용되는 활성 날짜. |
| `templates` | `SchedulerTemplates` | Scheduler 템플릿에 매핑합니다(예: 이벤트 스타일/텍스트 렌더링). |
| `config` | `SchedulerConfig` | Scheduler 구성 옵션에 매핑됩니다. |
| `xy` | `Record<string, number>` | UI 크기 조정 설정(예: 내장 내비게이션 숨김 `nav_height: 0`). |
| `data` | `{ load?: string \| (() => Promise<any>); save?: string \| SaveHandler; batchSave?: BatchSaveHandler }` | 데이터 로딩 및 변경 처리 콜백/URL. |
| `customLightbox` | `ReactElement \| null` | 내장 Lightbox를 사용자의 React 컴포넌트로 교체합니다. |
| `modals` | `SchedulerModals` | 내장 확인 대화상자를 재정의합니다(예: 이벤트 삭제 확인). |
| `filter` | `(event: Event) => boolean` | Scheduler에 표시될 이벤트를 필터링합니다. |
| `on<EventName>` props | `(...args) => any` | Scheduler 이벤트에 매핑된 이벤트 핸들러들(`onViewChange`, `onBeforeLightbox` 등). |

## 기본 예제

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

## 데이터 속성 (`load`, `save`, `batchSave`)

`data` 속성을 사용하여 Scheduler를 백엔드나 React에서 관리하는 상태에 연결합니다.

### 백엔드 URL 사용하기

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### 콜백 핸들러 사용하기

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

## 템플릿 및 구성 매핑

`templates`는 Scheduler 템플릿 함수에 매핑되고, `config`는 Scheduler 구성 옵션에 매핑됩니다.

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

## 이벤트 속성

Scheduler 이벤트를 React props로 전달할 수 있습니다.

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

지원되는 이벤트 및 콜백의 전체 목록은 다음을 참조하십시오:

- [Scheduler events overview](api/overview/events_overview.md)
- [Scheduler methods overview](api/overview/methods_overview.md)
- [Scheduler properties overview](api/overview/properties_overview.md)

## `customLightbox` 및 `modals`

내장 이벤트 편집기를 사용자의 React 컴포넌트로 대체하려면 `customLightbox`를 사용합니다.
사용자 지정 확인 대화상자가 필요하다면 `modals`를 사용합니다.

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

## 이벤트 필터링

```tsx
<ReactScheduler
  events={events}
  filter={(event) => event.text.toLowerCase().includes(search.toLowerCase())}
/>
```

## `ref`를 통한 직접 API 접근

Prop로 다루지 않는 사용 사례가 있다면, `ref`를 사용하여 기본 Scheduler 인스턴스에 직접 접근하십시오.

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

## 관련 페이지

- [React Scheduler 개요](integrations/react/overview.md)
- [데이터 바인딩 및 상태 관리 기본](integrations/react/state/state-management-basics.md)
- [React Scheduler 빠른 시작](integrations/react/quick-start.md)