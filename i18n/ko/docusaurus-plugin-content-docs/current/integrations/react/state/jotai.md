---
title: 리액트 스케줄러 - Jotai 튜토리얼
sidebar_label: Jotai
description: 이벤트 CRUD, 뷰/날짜 동기화, 읽기 전용 구성, 그리고 스냅샷 기반 undo/redo를 포함하여 DHTMLX React Scheduler를 Jotai와 함께 통합하는 방법을 학습합니다.
---

# 리액트 스케줄러 - Jotai 튜토리얼

이 튜토리얼은 **DHTMLX React Scheduler**를 **Jotai** 저장소에 연결하는 방법을 보여줍니다. 이벤트와 UI 상태(뷰/날짜/구성)을 원자(atom)에 보관하고, Scheduler의 편집을 `data.save`를 통해 라우팅하며, 스냅샷 기반 이력으로 **undo/redo**를 추가합니다.

:::note
The complete source code is [available on GitHub](https://github.com/DHTMLX/react-scheduler-jotai-starter).
:::

## 전제 조건

- Node.js (LTS 권장)
- React + TypeScript 기본 지식
- Jotai 원자와 `useAtom`/`useSetAtom`에 대한 기본 이해. 복습이 필요하다면 Jotai 문서를 참조하세요: https://jotai.org/

## 빠른 설정 - 프로젝트 생성

Vite + React + TypeScript 프로젝트를 생성합니다:

~~~bash
npm create vite@latest scheduler-jotai-demo -- --template react-ts
cd scheduler-jotai-demo
npm install
~~~

Jotai를 설치합니다:

~~~bash
npm install jotai
~~~

데모 툴바에 사용되는 Material UI를 설치합니다:

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### React Scheduler 설치

React Scheduler 설치 방법은 [React Scheduler 설치 가이드](integrations/react/installation.md) 를 참조하십시오.

이 튜토리얼에서는 평가 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-scheduler
```

또는

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Professional 패키지를 이미 사용하는 경우, 명령과 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 대체하십시오.

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

:::note
Scheduler 전체 화면 차지를 원하면, 기본 스타일을 `src/App.css`에서 제거하고 아래를 추가합니다:

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

`src/types.ts`를 생성합니다. 이 타입은 원자와 컴포넌트 전반에 공유됩니다:

~~~ts
export type SchedulerView = "day" | "week" | "month";
export type SchedulerEventId = string | number;

export interface SchedulerEvent {
  id: SchedulerEventId;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler가 런타임에 추가 필드를 붙일 수 있습니다(예: 커스텀 props). 예제는 허용적으로 작성합니다.
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent`는 런타임에 추가 필드를 Scheduler가 붙일 수 있도록 인덱스 시그니처를 사용합니다.
- `SchedulerSnapshot`은 undo/redo를 위한 필요한 데이터를 캡처합니다(이벤트 + 구성).

## 샘플 데이터 설정

`src/seed/data.ts`를 생성하고 몇 개의 이벤트와 초기 UI 상태를 추가합니다. 주의: `seedDate`는 숫자(타임스탬프)로 저장되어 원자 상태를 직렬화 가능한 상태로 유지합니다.

~~~ts
import type { SchedulerEvent, SchedulerView } from "../types";

export const seedEvents: SchedulerEvent[] = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");
export const seedView: SchedulerView = "week";
~~~

:::note
 companion 데모에는 더 풍부한 시각적 효과를 위한 추가 이벤트가 포함되어 있습니다.
 :::

## Jotai 원자와 액션 만들기

`src/schedulerAtoms.ts`를 생성합니다. 이 설정은 다음을 저장합니다:

- `events` (Scheduler 데이터)
- `currentDate` (타임스탬프)
- `view` (`day | week | month`)
- `config` (Scheduler 구성 객체, `readonly` 포함)
- undo/redo를 위한 `past` / `future` 스냅샷

이 예제에서 undo/redo는 **이벤트 및 구성 변경만** 추적합니다. 날짜 탐색 및 뷰 전환은 히스토리에 추가되지 않습니다.

~~~ts
import { atom } from "jotai";
import { seedDate, seedEvents, seedView } from "./seed/data";
import type {
  SchedulerConfig,
  SchedulerEvent,
  SchedulerEventId,
  SchedulerSnapshot,
  SchedulerView,
} from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;
}

export type SchedulerAction =
  | {
      type: "updateEvent";
      payload: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
    }
  | {
      type: "createEvent";
      payload: Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>;
    }
  | { type: "deleteEvent"; payload: SchedulerEventId }
  | { type: "setCurrentDate"; payload: number }
  | { type: "setView"; payload: SchedulerView }
  | { type: "updateConfig"; payload: Partial<SchedulerConfig> }
  | { type: "undo" }
  | { type: "redo" };

const schedulerStateAtom = atom<SchedulerState>({
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView,
  config: {},
});

const pastAtom = atom<SchedulerSnapshot[]>([]);
const futureAtom = atom<SchedulerSnapshot[]>([]);
const MAX_HISTORY_SIZE = 50;

const deepCopy = <T,>(value: T): T => {
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

export const schedulerActionsAtom = atom(
  null,
  (get, set, action: SchedulerAction): SchedulerEvent | void => {
    const currentState = get(schedulerStateAtom);
    const past = get(pastAtom);
    const future = get(futureAtom);

    const pushHistory = () => {
      set(pastAtom, [...past.slice(-MAX_HISTORY_SIZE + 1), createSnapshot(currentState)]);
      set(futureAtom, []);
    };

    if (action.type === "setCurrentDate") {
      set(schedulerStateAtom, { ...currentState, currentDate: action.payload });
      return;
    }

    if (action.type === "setView") {
      set(schedulerStateAtom, { ...currentState, view: action.payload });
      return;
    }

    if (action.type === "createEvent") {
      pushHistory();
      const id = action.payload.id != null ? action.payload.id : `id_${Date.now().toString()}`;
      const newEvent: SchedulerEvent = { ...action.payload, id } as SchedulerEvent;

      set(schedulerStateAtom, {
        ...currentState,
        events: [...currentState.events, newEvent],
      });
      return newEvent;
    }

    if (action.type === "updateEvent") {
      const index = currentState.events.findIndex((event) => String(event.id) === String(action.payload.id));
      if (index === -1) return;

      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        events: [
          ...currentState.events.slice(0, index),
          { ...currentState.events[index], ...action.payload },
          ...currentState.events.slice(index + 1),
        ],
      });
      return;
    }

    if (action.type === "deleteEvent") {
      const exists = currentState.events.some((event) => String(event.id) === String(action.payload));
      if (!exists) return;

      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        events: currentState.events.filter((event) => String(event.id) !== String(action.payload)),
      });
      return;
    }

    if (action.type === "updateConfig") {
      pushHistory();
      set(schedulerStateAtom, {
        ...currentState,
        config: { ...currentState.config, ...action.payload },
      });
      return;
    }

    if (action.type === "undo") {
      if (past.length === 0) return;

      const previous = past[past.length - 1];
      set(pastAtom, past.slice(0, -1));
      set(futureAtom, [createSnapshot(currentState), ...future]);
      set(schedulerStateAtom, {
        ...currentState,
        events: previous.events,
        config: previous.config,
      });
      return;
    }

    if (action.type === "redo") {
      if (future.length === 0) return;

      const next = future[0];
      set(futureAtom, future.slice(1));
      set(pastAtom, [...past, createSnapshot(currentState)]);
      set(schedulerStateAtom, {
        ...currentState,
        events: next.events,
        config: next.config,
      });
    }
  }
);

export const schedulerStateViewAtom = atom((get) => get(schedulerStateAtom));
export const canUndoAtom = atom((get) => get(pastAtom).length > 0);
export const canRedoAtom = atom((get) => get(futureAtom).length > 0);
~~~

## 컨트롤 툴바 빌드

`src/components/Toolbar.tsx`를 생성합니다. 이 툴바는 다음을 수행합니다:

- 뷰를 전환합니다(일/주/월)
- 이전/오늘/다음으로 네비게이트
- undo/redo를 비활성화 상태로 표시
- 읽기 전용 모드를 토글

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../types";

export interface ToolbarProps {
  currentView: SchedulerView;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: SchedulerView) => void;
}

export default React.memo(function Toolbar({
  currentView,
  currentDate,
  isReadOnly,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNavigate,
  onReadOnlyChange,
  setView,
}: ToolbarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ m: 2 }}>
      <Stack direction="row" gap={1}>
        {(["day", "week", "month"] as const).map((label) => (
          <Button key={label} variant={currentView === label ? "contained" : "outlined"} onClick={() => setView(label)}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
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

        <FormControlLabel
          label="Read-only"
          control={
            <Switch
              checked={isReadOnly}
              onChange={(event) => onReadOnlyChange?.(event.target.checked)}
              inputProps={{ "aria-label": "Toggle read-only" }}
            />
          }
        />
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

## Scheduler를 Jotai에 연결하기

`src/components/Scheduler.tsx`를 생성합니다. 이 컴포넌트는 다음을 수행합니다:

- 원자에서 `events/view/currentDate/config`를 읽습니다
- Scheduler CRUD(`create/update/delete`)를 `data.save`로 연결합니다
- undo/redo, 네비게이션, 읽기 전용 토글을 연결합니다
- 내비게이션 바를 숨기고 커스텀 툴바를 사용합니다

~~~tsx
import { useCallback, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import {
  canRedoAtom,
  canUndoAtom,
  schedulerActionsAtom,
  schedulerStateViewAtom,
} from "../schedulerAtoms";
import type { SchedulerEvent, SchedulerEventId, SchedulerView } from "../types";

type SaveAction = "create" | "update" | "delete";
type SaveEntity = "event";

export default function DemoJotaiScheduler() {
  const state = useAtomValue(schedulerStateViewAtom);
  const dispatchAction = useSetAtom(schedulerActionsAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);

  const { events, view, currentDate, config } = state;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const setCurrentDate = useCallback(
    (dateMs: number) => dispatchAction({ type: "setCurrentDate", payload: dateMs }),
    [dispatchAction]
  );
  const setView = useCallback(
    (nextView: SchedulerView) => dispatchAction({ type: "setView", payload: nextView }),
    [dispatchAction]
  );
  const undo = useCallback(() => dispatchAction({ type: "undo" }), [dispatchAction]);
  const redo = useCallback(() => dispatchAction({ type: "redo" }), [dispatchAction]);
  const updateReadOnly = useCallback(
    (value: boolean) => dispatchAction({ type: "updateConfig", payload: { readonly: value } }),
    [dispatchAction]
  );

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
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
    },
    [currentDate, view, setCurrentDate]
  );

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  // Scheduler <-> Jotai data bridge
  const dataBridge = useMemo(
    () => ({
      save: (entity: SaveEntity, action: SaveAction, payload: unknown, id: unknown) => {
        if (entity !== "event") return;

        switch (action) {
          case "update": {
            const eventData =
              payload && typeof payload === "object" ? (payload as Partial<SchedulerEvent>) : ({} as Partial<SchedulerEvent>);
            const eventId = eventData.id ?? id;
            if (eventId == null) {
              console.warn("Update called without an id", { payload, id });
              return;
            }

            const updatedEvent = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
            dispatchAction({ type: "updateEvent", payload: updatedEvent });
            return updatedEvent;
          }
          case "create": {
            const eventData =
              payload && typeof payload === "object"
                ? (payload as Omit<SchedulerEvent, "id"> & Partial<Pick<SchedulerEvent, "id">>)
                : null;
            if (!eventData) {
              console.warn("Create called without event payload", { payload });
              return;
            }
            return dispatchAction({ type: "createEvent", payload: eventData });
          }
          case "delete": {
            const deleteId =
              payload && typeof payload === "object"
                ? ((payload as { id?: unknown }).id ?? id)
                : payload ?? id;

            if (deleteId == null) {
              console.warn("Delete called without an id", { payload, id });
              return;
            }

            dispatchAction({ type: "deleteEvent", payload: deleteId as SchedulerEventId });
            return deleteId;
          }
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    }),
    [dispatchAction]
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={view}
        currentDate={activeDate}
        isReadOnly={isReadOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={updateReadOnly}
        setView={setView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY}
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

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

이제 React Scheduler가 Jotai로 완전히 구동됩니다.

- Jotai 원자들이 `events`, `view`, `currentDate`, `config`를 단일 진실 소스로 보관합니다
- Scheduler 편집은 타입이 지정된 Jotai 액션으로 연결된 `data.save`를 통해 이루어집니다
- undo/redo는 이벤트/구성 변경에 대한 스냅샷 기반 이력으로 구현됩니다
- 읽기 전용 구성 토글을 통해 Scheduler의 편집을 잠글 수 있습니다
- 커스텀 툴바가 내비게이션, 뷰 전환 및 이력 제어를 처리합니다

## 다음 단계

- 이 예제의 개념을 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)에서 재검토하기
- [React Scheduler 개요](integrations/react/overview.md)에서 Scheduler의 구성 및 템플레이팅 옵션을 살펴보기
- API에서 이벤트를 로드/저장하고 원자 액션을 디스패치하여 지속성을 추가하기
- 동일한 패턴을 다른 상태 관리 도구와 함께 살펴보기:
  - [Redux Toolkit과 함께 React Scheduler 사용하기](integrations/react/state/redux-toolkit.md)
  - [MobX와 함께 React Scheduler 사용하기](integrations/react/state/mobx.md)
  - [XState와 함께 React Scheduler 사용하기](integrations/react/state/xstate.md)
  - [Zustand과 함께 React Scheduler 사용하기](integrations/react/state/zustand.md)
  - [Valtio와 함께 React Scheduler 사용하기](integrations/react/state/valtio.md)