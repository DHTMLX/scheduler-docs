---
title: 리액트 스케줄러 - XState 튜토리얼
sidebar_label: XState
description: "리액트 스케줄러를 XState와 통합합니다. 머신에서 스케줄러 상태를 모델링하고, data.save를 통한 CRUD 처리, 그리고 undo/redo 및 커스텀 내비게이션을 추가하는 방법을 다룹니다."
---

# 리액트 스케줄러 - XState 튜토리얼

이 튜토리얼은 **DHTMLX React Scheduler**를 **XState** 상태 머신에 연결하는 방법을 보여줍니다. 이벤트와 UI 상태(view/date/config)를 머신에 유지하고, Scheduler 편집을 `data.save`를 통해 라우팅하며, 스냅샷 기반 히스토리로 **undo/redo**를 추가합니다.

:::note
전체 소스 코드는 [GitHub에서 확인 가능](https://github.com/DHTMLX/react-scheduler-xstate-starter).
:::

## 전제 조건

- Node.js (권장 버전 LTS)
- 리액트 + 타입스크립트 기본 이해
- XState 기초 지식(머신, 이벤트, 액션). 복습이 필요하다면 XState 문서를 참조하세요: https://stately.ai/docs/xstate

## 빠른 설정 - 프로젝트 생성

Vite + 리액트 + TS 프로젝트를 생성합니다:

~~~bash
npm create vite@latest scheduler-xstate-demo -- --template react-ts
cd scheduler-xstate-demo
npm install
~~~

XState + React 바인딩을 설치합니다:

~~~bash
npm install xstate @xstate/react
~~~

Material UI 설치(데모 도구 모음에 사용):

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### React Scheduler 설치

React Scheduler를 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 설치합니다.

이 튜토리얼에서는 평가용 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-scheduler
```

또는

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Professional 패키지를 이미 사용 중인 경우, 명령과 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 교체합니다.

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

:::note
Scheduler를 전체 페이지에 차지하도록 하려면 `src/App.css`의 기본 스타일을 제거하고 다음을 추가합니다:

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

## 샘플 데이터 설정

몇 개의 이벤트와 초기 UI 상태를 가진 `src/seed/data.ts`를 생성합니다. 주의: `date`는 숫자(타임스탬프)로 저장되어 머신 컨텍스트가 직렬화 가능하게 유지됩니다.

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";
export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
  [key: string]: unknown;
}

export const seedEvents: SchedulerEvent[] = [
  { id: 1, classname: "blue", start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, classname: "violet", start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, classname: "blue", start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView: SchedulerView = "week";
~~~

- `SchedulerEvent`는 런타임에 추가 필드를 달 수 있도록 인덱스 시그니처를 사용합니다.

:::note
동반 데모에는 시각적 효과를 풍부하게 하는 색상 클래스가 추가로 포함되어 있습니다.
:::

## XState 머신 설정

`src/machine.ts`를 생성합니다. 이 머신은 다음을 저장합니다:

- `events` (스케줄러 데이터)
- `date` (타임스탬프로 저장)
- `view` (`day | week | month`)
- `config` (스케줄러 구성 객체)
- `past` / `future` (undo/redo용 스냅샷 배열)

Undo/redo는 스냅샷을 사용하여 머신에 직접 통합됩니다. 데이터를 수정하기 전마다 `saveToHistory`가 현재의 이벤트, 뷰, 날짜의 스냅샷을 저장합니다. `undo`와 `redo` 트랜지션은 히스토리에서 스냅샷과 현재 상태를 교환합니다.

~~~ts title="src/machine.ts"
import { createMachine, assign } from "xstate";
import {
  seedEvents,
  seedView,
  seedDate,
  type SchedulerView,
  type SchedulerEvent,
  type SchedulerConfig,
} from "./seed/data";

export interface SchedulerMachineContext {
  events: SchedulerEvent[];
  view: SchedulerView;
  date: number;
  config: SchedulerConfig;
  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

interface SchedulerSnapshot {
  events: SchedulerEvent[];
  view: SchedulerView;
  date: number;
}

type SchedulerMachineEvent =
  | { type: "SET_VIEW"; view: SchedulerView }
  | { type: "SET_DATE"; date: number }
  | { type: "CREATE_EVENT"; event: SchedulerEvent }
  | { type: "UPDATE_EVENT"; event: SchedulerEvent }
  | { type: "DELETE_EVENT"; id: string | number }
  | { type: "UNDO" }
  | { type: "REDO" };

const deepClone = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const takeSnapshot = (ctx: SchedulerMachineContext): SchedulerSnapshot => ({
  events: deepClone(ctx.events),
  view: ctx.view,
  date: ctx.date,
});

export const schedulerMachine = createMachine({
  id: "scheduler",
  types: {
    context: {} as SchedulerMachineContext,
    events: {} as SchedulerMachineEvent,
  },
  context: {
    events: seedEvents,
    view: seedView,
    date: seedDate,
    config: {},
    past: [],
    future: [],
    maxHistory: 50,
  },
  initial: "ready",
  states: {
    ready: {
      on: {
        SET_VIEW: { actions: ['saveToHistory', 'setView'] },
        SET_DATE: { actions: ['saveToHistory', 'setDate'] },
        CREATE_EVENT: { actions: ['saveToHistory', 'createEvent'] },
        UPDATE_EVENT: { actions: ['saveToHistory', 'updateEvent'] },
        DELETE_EVENT: { actions: ['saveToHistory', 'deleteEvent'] },
        UNDO: {
          guard: ({ context }) => context.past.length > 0,
          actions: ['undo']
        },
        REDO: {
          guard: ({ context }) => context.future.length > 0,
          actions: ['redo']
        },
      }
    }
  },
},
  {
    actions: {
      saveToHistory: assign({
        past: ({ context }) => {
          const newPast = [...context.past, takeSnapshot(context)];
          if (newPast.length > context.maxHistory) {
            newPast.shift();
          }
          return newPast;
        },
        future: () => [],
      }),
      setView: assign({
        view: ({ event }) => (event as { type: "SET_VIEW"; view: SchedulerView }).view
      }),
      setDate: assign({
        date: ({ event }) => (event as { type: "SET_DATE"; date: number }).date
      }),
      createEvent: assign({
        events: ({ context, event }) => {
            const newId = `id_${Date.now()}`;
            const newEvent = { ...(event as { type: "CREATE_EVENT"; event: SchedulerEvent }).event, id: newId };
            return [...context.events, newEvent];
        }
      }),
      updateEvent: assign({
        events: ({ context, event }) =>
          context.events.map(ev =>
            String(ev.id) === String((event as { type: "UPDATE_EVENT"; event: SchedulerEvent }).event.id)
              ? { ...ev, ...(event as { type: "UPDATE_EVENT"; event: SchedulerEvent }).event }
              : ev
          )
      }),
      deleteEvent: assign({
        events: ({ context, event }) =>
          context.events.filter(ev => String(ev.id) !== String((event as { type: "DELETE_EVENT"; id: string | number }).id))
      }),
      undo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const previousState = context.past[context.past.length - 1];
        const newPast = context.past.slice(0, -1);
        const newFuture = [currentState, ...context.future];

        return {
          ...previousState,
          past: newPast,
          future: newFuture,
        };
      }),
      redo: assign(({ context }) => {
        const currentState = takeSnapshot(context);
        const nextState = context.future[0];
        const newFuture = context.future.slice(1);
        const newPast = [...context.past, currentState];

        return {
          ...nextState,
          past: newPast,
          future: newFuture,
        };
      })
    }
  }
);
~~~



이 시점에서 이 머신은 다음을 제공합니다:

- Scheduler 속성의 단일 소스
- 스냅샷 기반 Undo/Redo(히스토리는 참조가 아닌 복사본을 포함)
- 단일 `SET_DATE` 이벤트 — 전/다음/오늘 탐색 로직은 컴포넌트에 있습니다

:::tip
현대 브라우저만 대상으로 한다면, `deepClone()` 헬퍼는 이미 `structuredClone()`을 우선적으로 사용하고, 더 오래된 환경에서는 JSON 복제를 대체로 사용합니다.
:::

## 제어 도구 모음 컴포넌트 빌드

`src/components/Toolbar.tsx`를 만듭니다. 이 컴포넌트는 작고 MUI 툴바로:

- 뷰를 전환합니다 (일/주/월)
- 이전/오늘/다음으로 탐색
- Undo/Redo를 비활성 상태로 표시하며 동작합니다

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import React from 'react';
import type { SchedulerView } from "../seed/data";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: 'prev' | 'next' | 'today') => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({ currentView, currentDate, canUndo, canRedo, onUndo, onRedo, onNavigate, setView }: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map(l => (
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


## XState에 Scheduler 연결

`src/components/Scheduler.tsx`를 만듭니다. 이 컴포넌트는:

- XState 머신 컨텍스트에서 `events/view/date/config`를 읽습니다
- 머신 이벤트를 보내는 `data.save` 콜백을 노출합니다
- Undo/Redo 및 내비게이션을 연결합니다
- 기본 내비게이션 바를 숨기고 커스텀 툴바를 사용합니다
- `event_class` 템플릿을 통해 색상 클래스를 적용합니다

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";
import { useMachine } from "@xstate/react";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import "./styles.css";
import Toolbar from "./Toolbar";
import { schedulerMachine } from "../machine";
import { type SchedulerView } from "../seed/data";

export default function DemoXStateScheduler() {
  const [state, send] = useMachine(schedulerMachine);

  const canUndo = state.context.past.length > 0;
  const canRedo = state.context.future.length > 0;
  const activeDate = useMemo(() => new Date(state.context.date), [state.context.date]);

  const templates = useMemo(() => ({
    event_class: (_start: Date, _end: Date, event: Record<string, unknown> | null) => {
      if (event == null) {
        return "";
      }
      if (typeof event.classname === "string") {
        return event.classname;
      }
      return "";
    }
  }), []);

  const data = useMemo(() => ({
    save: (entity: string, action: string, payload: Record<string, unknown>, id: string | number) => {
      if (entity !== "event") {
        return;
      }
      switch (action) {
        case "create":
          send({ type: "CREATE_EVENT", event: payload as never });
          break;
        case "update":
          send({ type: "UPDATE_EVENT", event: payload as never });
          break;
        case "delete":
          send({ type: "DELETE_EVENT", id });
          break;
        default:
          console.warn(`Unhandled action: ${action}`);
      }
    }
  }), [send]);

  const handleDateNavigation = useCallback((action: 'prev' | 'next' | 'today') => {
    if (action === 'today') {
      send({ type: "SET_DATE", date: Date.now() })
      return;
    }
    const step = action === 'next' ? 1 : -1;
    const date = new Date(state.context.date);

    if (state.context.view === "day") {
      date.setDate(date.getDate() + step);
    } else if (state.context.view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    send({ type: "SET_DATE", date: date.getTime() })
  }, [state.context.date, state.context.view, send]);

  const handleUndo = useCallback(() => send({ type: "UNDO" }), [send]);
  const handleRedo = useCallback(() => send({ type: "REDO" }), [send]);
  const handleSetView = useCallback((view: SchedulerView) => send({ type: "SET_VIEW", view: view }), [send]);
  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={state.context.view}
        currentDate={activeDate}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        setView={handleSetView}
      />
      <ReactScheduler
        events={state.context events}
        view={state.context.view}
        date={activeDate}
        xy={memoizedXY}
        config={state.context.config}
        data={data}
        templates={templates}
      />
    </div>
  );
}
~~~



주목할 몇 가지 포인트:

- 머신 컨텍스트는 `events`, `view`, `date`에 대한 단일 진실의 원천입니다.
- `data.save` 핸들러는 엔터티 기반의 Scheduler 변경을 머신 이벤트로 변환합니다.
- 기본 Scheduler 탐색 모음을 숨기고(내비게이션 바를 제거) 커스텀 툴바로 대체합니다.
- `event_class` 템플릿은 각 이벤트의 `classname` 필드를 읽어 CSS 클래스으로 적용합니다.

## 이벤트 색상 스타일

`src/components/styles.css`를 생성하고 seed 데이터의 `classname` 값과 일치하는 CSS 클래스를 정의합니다. `event_class` 템플릿이 각 이벤트 요소에 이 클래스를 적용합니다.

~~~css title="src/components/styles.css"
/*
  이벤트 색상화.
  Scheduler는 템플릿에서 반환된 값을 이벤트 컨테이너에 적용합니다.
  Seed 데이터는 `classname`을 사용하므로 템플릿을 통해 매핑하고 이 CSS에서 클래스를 스타일합니다.
*/

.blue {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
  color: #ffffff !important;
}

.green {
  background: #22c55e !important;
  border-color: #16a34a !important;
  color: #ffffff !important;
}

.violet {
  background: #a855f7 !important;
  border-color: #9333ea !important;
  color: #ffffff !important;
}

.yellow {
  background: #f59e0b !important;
  border-color: #d97706 !important;
  color: #111827 !important;
}
~~~

## 앱에 Scheduler 통합하기

`src/App.tsx`와 `src/App.css`를 업데이트합니다:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
    return (
      <Scheduler/>
    );
}
export default App;
~~~

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 요약

이제 XState에 의해 완전히 제어되는 React Scheduler를 얻게 되었습니다:

- Scheduler는 XState 머신 컨텍스트에서 `events`, `view`, `date`, `config`를 읽습니다.
- 사용자의 편집은 `data.save`를 통해 CRUD를 위한 머신 이벤트로 라우팅됩니다.
- Scheduler가 프롭으로 업데이트된 상태를 받기 때문에 UI가 항상 동기화됩니다.
- 스냅샷 기반 히스토리와 `guard` 조건으로 Undo/Redo를 구현했습니다.
- 커스텀 툴바를 통해 뷰 전환, 날짜 탐색, 비활성화된 상태의 Undo/Redo를 제공합니다.

## 다음 단계

- 이 예제의 개념을 다시 살펴보려면 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)를 확인하세요.
- Scheduler의 구성 및 템플레이팅 옵션은 [React Scheduler 개요](integrations/react/overview.md)에서 확인해 보세요.
- API로 이벤트를 로드/저장하는 등 지속성을 추가하려면 머신에 비동기 이벤트를 디스패치하세요.
- 동일한 패턴을 다른 상태 관리 도구와 함께 살펴보려면:
  - [Redux Toolkit과 함께 React Scheduler 사용](integrations/react/state/redux-toolkit.md)
  - [MobX와 함께 React Scheduler 사용](integrations/react/state/mobx.md)
  - [Zustand와 함께 React Scheduler 사용](integrations/react/state/zustand.md)
  - [Jotai와 함께 React Scheduler 사용](integrations/react/state/jotai.md)
  - [Valtio와 함께 React Scheduler 사용](integrations/react/state/valtio.md)

