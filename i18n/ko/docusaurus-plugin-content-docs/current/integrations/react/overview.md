--- 
title: "리액트 스케줄러" 
sidebar_label: "개요" 
description: "리액트 스케줄러 래퍼의 개요, 데이터 바인딩 모드, 커스터마이제이션 옵션 및 프레임워크 호환성에 대한 개요." 
---

# 리액트 스케줄러

:::note
리액트 스케줄러는 [상용, 엔터프라이즈 및 얼티밋 라이선스](https://dhtmlx.com/docs/products/licenses.shtml) 하에 제공됩니다.
스케줄러의 개인(Individual) 또는 GPL 에디션을 사용하는 경우, [React용 dhtmlxScheduler](integrations/react/js-scheduler-react.md)를 사용하시기 바랍니다.
:::

## 개요

DHTMLX React Scheduler는 DHTMLX Scheduler의 공식 React 래퍼입니다. 고급 제어가 필요할 때 기본 Scheduler 인스턴스를 노출하면서도 Scheduler를 렌더링하고 구성하기 위한 선언적 API를 제공합니다.

**주요 기능:**  

- 프롭스로 `events`, `view`, 및 `date` 전달  
- `config` 및 `templates`로 동작을 커스터마이즈  
- 사용자의 변경을 `data.save` 또는 `data.batchSave`를 통해 처리  
- Scheduler API 메서드에 직접 접근하려면 `ref` 사용  

DHTMLX Scheduler에 익숙하지 않다면, 기능 개요를 보려면 [DHTMLX Scheduler 문서](/guides/)를 참고하세요.

## 설치 및 npm 접근

평가판 및 전문가용 패키지 설치에 대한 내용은 아래를 참고하세요:

- [설치 방법](integrations/react/installation.md)

## 버전 요구사항

- 리액트 `18+`

## 기본 사용법

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

## 데이터 바인딩 {#bindingdata}

리액트 스케줄러는 두 가지 데이터 바인딩 모델을 지원합니다.

### 핵심 원천으로서의 React 상태(권장)

이 모델에서 React(또는 상태 관리 도구)가 이벤트 데이터를 소유합니다:

- Scheduler는 프롭스로 이벤트를 읽습니다
- 사용자의 변경은 `data.save` 콜백을 호출합니다
- 콜백이 React 상태를 업데이트합니다
- React가 업데이트된 프롭으로 Scheduler를 다시 렌더링합니다

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

이 모델은 다른 React UI가 Scheduler 데이터와 동기화되어 있어야 할 때 가장 적합합니다.

### Scheduler를 진실의 원천으로

이 모델에서 Scheduler는 내부 상태를 관리하고 수정사항을 백엔드로 전달합니다.

```tsx
<ReactScheduler
  data={{
    load: "/api/scheduler/load",
    save: "/api/scheduler/save",
  }}
/>
```

이 모델은 React가 매 업데이트를 즉시 반영할 필요가 없을 때 유용합니다.

### 데이터 로드

프롭스나 `data.load` 중 하나를 사용하여 데이터를 로드할 수 있습니다:

```tsx
// Props 기반 로딩
<ReactScheduler events={eventsFromState} />

// 전송 기반 로딩
<ReactScheduler data={{ load: "/api/scheduler/load" }} />
```

데이터 형식 요구사항은 [데이터 로딩](guides/loading-data.md)을 참조하세요.

### 변경 사항 저장

`data.save`는 URL이 될 수 있으며 콜백일 수도 있습니다.

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

백엔드 동작에 대한 세부 내용은 [Server Integration](guides/server-integration.md)을 참조하세요.

## 라이트박스 교체

스케줄러에는 [라이트박스](guides/lightbox-editors.md)라고 하는 내장 이벤트 편집기가 포함되어 있습니다.

이를 `customLightbox`를 사용하여 교체할 수 있습니다:

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

에디터 열기를 차단하는 훅도 제공됩니다(`onBeforeLightbox`):

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

참고: [onBeforeLightbox](api/event/onbeforelightbox.md)

## 내장 모달 교체

삭제 확인 다이얼로그는 `modals`를 통해 재정의할 수 있습니다.

```tsx
<ReactScheduler
  modals={{
    onBeforeEventDelete: ({ event, callback, schedulerInstance }) => {
      if (window.confirm(`Delete "${event.text}"?`)) {
        callback(); // 콜백을 호출하면 이벤트가 삭제됩니다
      }
    },
  }}
/>
```

### 반복 일정 확인 모달 커스터마이즈하기 {#customizingtherecurrenceconfirmationmodal}

사용자가 반복 이벤트를 편집하거나 끌어다 놓은 경우, 특정 발생건만 수정할지, 이후 이벤트까지 포함할지, 아니면 전체 시퀀스를 수정할지 물어보는 확인 모달이 나타납니다. 이 내장 대화상자를 `modals.onRecurrenceConfirm`으로 대체할 수 있습니다.

콜백은 컨텍스트 객체를 받고 결정을 반환해야 합니다(또는 이를 해결하는 Promise):

| 필드 | 타입 | 설명 |
|---|---|---|
| `origin` | `"lightbox" \| "dnd"` | 라이트박스에서 트리거되었는지 여부 또는 드래그 앤 드롭으로 트리거되었는지 여부 |
| `occurrence` | `any` | 편집 중인 특정 발생 건 |
| `series` | `any` | 부모 반복 이벤트 |
| `labels` | `object` | 지역화된 레이블: `title`, `ok`, `cancel`, `occurrence`, `following`, `series` |
| `options` | `string[]` | 사용 가능한 선택지 예: `["occurrence", "following", "series"]` |

Return value (`RecurrenceDecision`): `"occurrence"`, `"following"`, `"series"`, 또는 취소를 의미하는 `null`.

예시:

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

## 필터링

표시되는 이벤트를 제어하려면 `filter` 프롭을 사용하세요:

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

## 기본 Scheduler API에 접근하기

프롭스만으로 부족할 때는 `ref`를 통해 Scheduler 인스턴스에 접근합니다:

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

프로퍼티를 직접 수정하는 경우, 상태 드리프트를 피하기 위해 React 프롭스를 동기화해 두는 것이 좋습니다.

가능한 메서드 목록은 [Scheduler Methods Overview](api/overview/methods_overview.md)를 참조하세요.

#### React 프롭스와의 충돌 방지

- 코드에서 수동으로 `scheduler.parse(( events ))`를 호출하거나 `scheduler.addEvent()`를 호출하는 경우, React 프롭스를 동기화 상태로 유지해야 할 수 있습니다. 그렇지 않으면 다음 React 렌더링 시 수동 변경이 덮어써질 수 있습니다.
- 권장되는 방법은 이벤트에 대해 래퍼의 프롭스에 의존하거나 React 상태에서 관리하는 것이며, 그런 다음 래퍼가 재파싱을 처리하게 두는 것입니다.

## SSR 프레임워크(Next.js, Remix)와의 호환성

:::note
리액트 스케줄러는 SSR 친화적입니다. 서버 렌더링 중에는 플레이스홀더 컨테이너를 출력하고 클라이언트에서 하이드레이션합니다.
:::

세부 내용은 프레임워크별 가이드를 참고하세요:

- [Next.js에서의 React Scheduler](integrations/react/nextjs.md)
- [Remix에서의 React Scheduler](integrations/react/remix.md)

## 다음 단계

- [구성(Configuration)](integrations/react/configuration-props.md)
- [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)
- [빠른 시작(Quick Start)](integrations/react/quick-start.md)