---
title: 리액트 스케줄러 - Zustand 튜토리얼
sidebar_label: Zustand
description: DHTMLX React Scheduler를 Zustand와 통합하는 방법을 알아보고, 이벤트 CRUD, 뷰/날짜 동기화, 그리고 스냅샷 기반 히스토리를 활용한 undo/redo를 학습합니다.
---

# 리액트 스케줄러 - Zustand 튜토리얼

이 튜토리얼은 **DHTMLX React Scheduler**를 **Zustand** 저장소에 연결하는 방법을 보여줍니다. 이벤트와 UI 상태(view/date/config)를 Zustan에 보관하고, Scheduler 편집을 `data.save`를 통해 라우팅하며, 스냅샷 기반 히스토리로 **undo/redo**를 추가합니다.

:::note
전체 소스 코드는 [GitHub에서 확인 가능합니다](https://github.com/DHTMLX/react-scheduler-zustand-starter).
:::

## 전제 조건

- Node.js (권장: LTS)
- React + TypeScript 기초
- Zustand 훅과 셀렉터에 대한 기본 지식. 복습이 필요한 경우 Zustand 문서를 참조하세요: https://zustand.docs.pmnd.rs/

## 빠른 설정 - 프로젝트 생성

Vite + React + TS 프로젝트 생성:

~~~bash
npm create vite@latest scheduler-zustand-demo -- --template react-ts
cd scheduler-zustand-demo
npm install
~~~

Zustand 설치:

~~~bash
npm install zustand
~~~

Material UI 설치 (데모 툴바에 사용):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### React Scheduler 설치

React Scheduler를 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 설치합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-scheduler
```

또는

```bash
yarn add @dhtmlx/trial-react-scheduler
```

이미 Professional 패키지를 사용하는 경우, 명령과 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 교체하세요.

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

:::note
Scheduler가 페이지 전체를 차지하도록 기본 스타일을 제거하고 아래를 추가합니다:

~~~css
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}
~~~
:::

## 공유 타입 정의

`src/types.ts`를 생성합니다. 이 타입은 저장소와 컴포넌트 전반에서 공유됩니다:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler may attach extra fields (e.g. custom props). Keep the demo permissive.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
}
~~~

- `SchedulerEvent`는 런타임에 추가 필드를 덧붙일 수 있도록 인덱스 시그니처를 사용합니다.
- `SchedulerSnapshot`은 undo/redo에 필요한 데이터를 캡처합니다(이벤트).

## 샘플 데이터 설정

`src/seed/data.ts`를 생성하고 몇 개의 이벤트와 초기 UI 상태를 정의합니다. 주의: `currentDate`는 **숫자**(타임스탬프)로 저장되므로 저장소 상태가 직렬화 가능하게 유지됩니다.

~~~ts
export const seedEvents = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView = "week";
~~~

:::note
동반 데모에는 더 풍부한 시각화를 위한 추가 이벤트가 포함되어 있습니다.
:::

## Zustand 저장소 생성

`src/store.ts`를 생성합니다. 이 저장소는 다음을 보유합니다:

- `events` (Scheduler 데이터)
- `currentDate` (타임스탬프 형태)
- `view` (`day | week | month`)
- `config` (Scheduler 구성 객체)
- `past` / `future` (undo/redo를 위한 스냅샷 배열)

Undo/redo는 스냅샷을 이용해 저장소에 직접 통합됩니다. 데이터를 수정하기 전마다 `pushHistory`가 현재 이벤트의 스냅샷을 저장합니다. `undo` 및 `redo` 액션은 현재 상태를 히스토리의 스냅샷과 교환합니다.

~~~ts
import { create } from "zustand";

import { seedDate, seedEvents, seedView } from "./seed/data";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

export interface SchedulerStoreState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;

  setCurrentDate: (date: number) => void;
  setView: (view: SchedulerView) => void;

  createEvent: (event: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>) => SchedulerEvent;
  updateEvent: (event: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => void;
  deleteEvent: (id: SchedulerEvent["id"]) => void;

  undo: () => void;
  redo: () => void;
}

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (events: SchedulerEvent[]): SchedulerSnapshot => ({
  events: deepCopy(events),
});

// Simulate receiving an ID from a backend.
const generateId = () => `id_${Date.now().toString()}`;

export const useSchedulerStore = create<SchedulerStoreState>((set, get) => {
  const pushHistory = () => {
    const { events, past, maxHistory } = get();
    const snapshot = createSnapshot(events);

    set({
      past: [...past.slice(-maxHistory + 1), snapshot],
      future: [],
    });
  };

  return {
    events: seedEvents as unknown as SchedulerEvent[],
    currentDate: seedDate,
    view: seedView as SchedulerView,
    config: {},

    past: [],
    future: [],
    maxHistory: 50,

    setCurrentDate: (date) => set({ currentDate: date }),
    setView: (view) => set({ view }),

    createEvent: (event) => {
      pushHistory();

      const id = event.id != null ? event.id : generateId();
      const newEvent: SchedulerEvent = { ...event, id } as SchedulerEvent;

      set({ events: [...get().events, newEvent] });
      return newEvent;
    },

    updateEvent: (event) => {
      const events = get().events;
      const index = events.findIndex((e) => String(e.id) === String(event.id));
      if (index === -1) return;

      pushHistory();
      set({
        events: [...events.slice(0, index), { ...events[index], ...event }, ...events.slice(index + 1)],
      });
    },

    deleteEvent: (id) => {
      const events = get().events;
      const exists = events.some((e) => String(e.id) === String(id));
      if (!exists) return;

      pushHistory();
      set({ events: events.filter((e) => String(e.id) !== String(id)) });
    },

    undo: () => {
      const { past, future, events } = get();
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set({
        events: previous.events,
        past: past.slice(0, -1),
        future: [createSnapshot(events), ...future],
      });
    },

    redo: () => {
      const { past, future, events } = get();
      if (future.length === 0) return;

      const next = future[0];
      set({
        events: next.events,
        past: [...past, createSnapshot(events)],
        future: future.slice(1),
      });
    },
  };
});
~~~

## 컨트롤 툴바 컴포넌트 구축

`src/components/Toolbar.tsx`를 생성합니다. 이 컴포넌트는 작은 MUI 툴바로 다음을 제공합니다:

- 뷰 전환(일/주/월)
- 이전/오늘/다음으로 이동
- undo/redo

~~~tsx
import { ButtonGroup, Button, Typography, Stack } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
  setView,
}: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map((l) => (
          <Button key={l} variant={currentView === l ? "contained" : "outlined"} onClick={() => setView(l)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={!canUndo}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={!canRedo}>
            <RedoIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      <Typography variant="subtitle1" sx={{ ml: 1 }}>
        {new Date(currentDate)?.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>
          &nbsp;&lt;&nbsp;
        </Button>
        <Button onClick={() => onNavigate?.("today")}>
          Today
        </Button>
        <Button onClick={() => onNavigate?.("next")}>
          &nbsp;&gt;&nbsp;
        </Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## Zustand에 Scheduler 연결

`src/components/Scheduler.tsx`를 생성합니다. 이 컴포넌트는 다음을 수행합니다:

- Zustand 저장소에서 selectors를 통해 `events/view/currentDate/config`를 읽습니다
- 저장소의 액션을 호출하는 `data.save` 콜백을 노출합니다
- Scheduler의 내부 기록과 동기화를 위해 `save`에서 생성/수정된 엔티티를 반환합니다
- `undo/redo`를 연결합니다
- 기본 내비바를 숨기고 커스텀 툴바를 사용합니다

~~~tsx
import { useCallback, useMemo } from "react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { useSchedulerStore } from "../store";
import type { SchedulerEvent, SchedulerView } from "../types";

export default function DemoZustandScheduler() {
  const events = useSchedulerStore((s) => s.events);
  const view = useSchedulerStore((s) => s.view);
  const currentDate = useSchedulerStore((s) => s.currentDate);
  const config = useSchedulerStore((s) => s.config);

  const setView = useSchedulerStore((s) => s.setView);
  const setCurrentDate = useSchedulerStore((s) => s.setCurrentDate);
  const createEvent = useSchedulerStore((s) => s.createEvent);
  const updateEvent = useSchedulerStore((s) => s.updateEvent);
  const deleteEvent = useSchedulerStore((s) => s.deleteEvent);
  const undo = useSchedulerStore((s) => s.undo);
  const redo = useSchedulerStore((s) => s.redo);

  const canUndo = useSchedulerStore((s) => s.past.length > 0);
  const canRedo = useSchedulerStore((s) => s.future.length > 0);

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
    if (action === "today") {
      setCurrentDate(Date.now());
      return;
    }

    const step = action === "next" ? 1 : -1;
    const date = new Date(currentDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    setCurrentDate(date.getTime());
  }, [currentDate, view, setCurrentDate]);

  // Scheduler <-> Zustand data bridge (maps Scheduler CRUD events to store actions)
  const dataBridge = useMemo(() => ({
    save: (entity: string, action: string, payload: unknown, id: unknown) => {
      if (entity !== "event") return;

      switch (action) {
        case "update": {
          const eventData = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
          const eventId = (eventData as Record<string, unknown>).id ?? id;
          if (eventId == null) {
            console.warn("Update called without an id", { payload, id });
            return;
          }
          return updateEvent({ ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">);
        }
        case "create":
          return createEvent(payload as Omit<SchedulerEvent, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return deleteEvent(deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [updateEvent, createEvent, deleteEvent]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => setView(nextView), [setView]);

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* hide built-in navbar */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

주: Redux Toolkit과 달리 Zustand는 `Provider` 래퍼가 필요하지 않습니다. `useSchedulerStore` 훅이 저장소에서 직접 데이터를 읽습니다.

## 앱에서 Scheduler 렌더링

`src/App.tsx`를 업데이트합니다:

~~~tsx
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## 요약

이제 Zustand로 완전히 구동되는 React Scheduler를 얻었습니다:

- Zustand가 `events`, `view`, `currentDate`, `config`를 단일 진실의 원천으로 유지합니다
- 사용자 편집은 `data.save` → 저장소 액션으로 라우팅됩니다
- Scheduler가 업데이트된 `events`를 props로 받아 UI가 계속 동기화됩니다
- undo/redo는 스냅샷 기반 히스토리를 사용한 제한된 히스토리 스택으로 구현됩니다

## What's next

- 이 예제의 개념을 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)에서 다시 살펴보세요
- [React Scheduler 개요](integrations/react/overview.md)에서 스케줄러의 구성 및 템플레이팅 옵션을 탐색하세요
- Zustand 액션에서 API로부터 이벤트를 로드/저장하는 방식으로 지속성을 추가하고 스토어를 업데이트해 보세요
- 동일한 패턴을 다른 상태 관리 도구와 함께 살펴보기:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)