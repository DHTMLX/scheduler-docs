---
title: React Scheduler의 데이터 바인딩 및 관리 기본
sidebar_label: 기본
description: "React Scheduler의 두 가지 데이터 바인딩 모델과 React 상태 및 상태 관리 도구의 기본 패턴에 대한 개요."
---

# React Scheduler의 데이터 바인딩 및 상태 관리

React Scheduler는 두 가지 데이터 바인딩 패턴을 지원합니다:

1. **소스 오브 트루스로서의 React 상태**(대부분의 React 앱에 대해 권장)
2. **소스 오브 트루스로서의 Scheduler**(특수하고 고처리량 케이스에 유용)

두 모델은 모두 유효합니다. 화면당 하나의 모델을 선택하고 일관되게 유지하세요.

아직 기본 차트를 렌더링하지 않았다면 [빠른 시작](integrations/react/quick-start.md)으로 시작하세요.

## 데이터 모델

### 소스 오브 트루스로서의 React 상태(권장)

이 모델에서:

- `events`(종종 `view`/`date`도 함께)를 React 상태나 상태 관리 도구에 보관합니다
- 그 상태를 `<ReactScheduler />`의 props로 전달합니다
- 사용자가 데이터를 편집하면 Scheduler가 `data.save` / `data.batchSave`를 호출합니다
- 상태를 업데이트하면 React가 새 props로 Scheduler를 다시 렌더링합니다

다른 React 컴포넌트가 Scheduler 데이터와 동기화되어 있어야 할 때 이 모델을 사용하세요.

### Scheduler를 진실의 소스로 사용

이 모델에서:

- Scheduler가 내부적으로 데이터를 로드하고 수정합니다
- 필요에 따라 편집 내용을 백엔드 엔드포인트로 전달할 수 있습니다
- React는 모든 개별 이벤트 업데이트를 상태에 미러링하지 않습니다

React가 개별 Scheduler 변경을 즉시 반영할 필요가 없을 때 이 모델을 사용하세요.

## React state as source of truth {#reactstateasthesourceoftruth}

### 최소 예제

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

이 패턴은 React를 이벤트 데이터의 정식 소유자로 만듭니다.

## `data.save`로 업데이트 처리 {#handlingchangeswithdatasave}

`data.save`는 사용자 변경마다 호출됩니다:

```ts
(entity: string, action: string, item: any, id: string | number) => void | Promise<any>
```

Scheduler 이벤트 CRUD의 경우:

- `entity`는 `"event"`
- `action`은 `"create" | "update" | "delete"`
- `item`은 생성/수정/삭제된 이벤트
- `id`는 영향을 받은 이벤트의 ID

### 백엔드 지향 예제

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

백엔드가 생성 시 임시 ID를 realId로 대체하는 경우 Scheduler가 클라이언트와 서버 ID를 조정할 수 있도록 `{ id: realId }`를 반환하세요.

## `data.batchSave`로 대량 업데이트

`data.batchSave`는 짧은 시간에 많은 변경이 발생할 때(예: 촘촘한 편집 세션) 유용합니다.

다음과 같은 상황에서 사용하세요:

- 그룹화된 변경으로 요청 수를 줄이고자 할 때
- 하나의 리듀서/스토어 트랜잭션에서 업데이트를 처리할 때

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

간단한 개별 변경 로직에는 `save`를, 그룹화된 동기화에는 `batchSave`를 사용하세요.

## React 상태로 데이터 로딩

React 주도 모델에서 Scheduler는 React 상태에서 데이터를 가져옵니다. 일반적인 소스는:

- 로컬 컴포넌트 상태
- 글로벌 상태 관리 도구(Redux Toolkit, Zustand, MobX, XState, Jotai, Valtio)
- API 호출

### 로컬 상태 소스

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

### 상태 관리 도구 소스

모든 라이브러리는 동일한 흐름을 따릅니다:

- selector/hook이 상태를 읽습니다
- props가 Scheduler에 데이터를 공급합니다
- `data.save`가 액션/스토어 변이를 디스패치합니다

```tsx
const events = useSchedulerStore((s) => s.events);
const onSave = useSchedulerStore((s) => s.handleSave);

<ReactScheduler events={events} data={{ save: onSave }} />;
```

상태 관리 도구 튜토리얼들:

- [Redux Toolkit으로 React Scheduler 사용](integrations/react/state/redux-toolkit.md)
- [Zustand로 React Scheduler 사용](integrations/react/state/zustand.md)
- [MobX로 React Scheduler 사용](integrations/react/state/mobx.md)
- [XState로 React Scheduler 사용](integrations/react/state/xstate.md)
- [Jotai로 React Scheduler 사용](integrations/react/state/jotai.md)
- [Valtio로 React Scheduler 사용](integrations/react/state/valtio.md)

### API 로딩 소스

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

## Scheduler를 진실의 소스로 {#schedulerasthesourceoftruth}

이 모드에서 React는 컴포넌트를 렌더링하지만 정식 이벤트 상태를 보유하지 않습니다.

### URL 전송 예제

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

### 콜백 전송 예제

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

이 접근 방식은 Scheduler가 주된 런타임 저장소로 남아 있고 React가 모든 단일 업데이트를 렌더링할 필요가 없을 때 사용합니다.

## 올바른 모델 선택

다음 상황에서 **React 주도형** 모델을 사용하세요:

- 여러 React 컴포넌트가 Scheduler 데이터에 의존할 때
- 예측 가능한 글로벌 상태 통합이 필요할 때
- 앱 상태에서 직관적인 실행 취소/다시 실행이 필요할 때

다음 상황에서 **Scheduler 주도형** 모델을 사용하세요:

- React가 대부분 셸/레이아웃인 경우
- Scheduler가 런타임 변이를 관리하는 것을 선호할 때
- 서버 전송이 주요 동기화 메커니즘인 경우

## 다음 단계

- [React Scheduler 개요](integrations/react/overview.md#bindingdata)
- [React Scheduler 구성](integrations/react/configuration-props.md)
- [서버 통합](guides/server-integration.md)