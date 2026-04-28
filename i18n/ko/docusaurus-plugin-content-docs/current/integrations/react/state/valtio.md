---
sidebar_label: Valtio
title: Valtio와 함께 React Scheduler 사용하기
description: Valtio 프록시 저장소로 React Scheduler의 상태를 관리하고, 사용자 편집을 data.save를 통해 적용하며, 스냅샷 기반의 undo/redo를 추가합니다.
---

# React Scheduler - Valtio 튜토리얼

이 튜토리얼은 Vite + React + TypeScript 앱에서 **React Scheduler**를 렌더링하고 **Valtio**로 상태를 관리하는 방법을 보여줍니다. 이벤트, 현재 날짜, 활성 보기를 Valtio 프록시 저장소에 보관한 다음, 사용자의 편집을 Scheduler의 `data.save` 콜백으로 라우팅합니다.

끝까지 따라오면 다음을 갖춘 Scheduler를 얻게 됩니다:

- 재사용 가능한 도구 모음(뷰 전환기, 날짜 탐색, 되돌리기/다시 실행, 읽기 전용 토글)
- 저장소 기반 이벤트 CRUD(생성/수정/삭제)
- 스냅샷 기반 undo/redo(이벤트 + 구성)

:::note
전체 소스 코드는 [GitHub에서 확인 가능](https://github.com/nicetip/react-scheduler-valtio-starter).
:::

## Prerequisites
- React + TypeScript 기초
- Vite 기초
- Valtio에 대한 기본 이해
- 권장: [React Scheduler 문서: 데이터 바인딩](integrations/react/state/state-management-basics.md)에서 `data.save` 및 데이터 바인딩에 대해 읽어보기

## Creating a project
Vite + React + TypeScript 프로젝트를 생성합니다:

~~~bash
npm create vite@latest scheduler-valtio-demo -- --template react-ts
cd scheduler-valtio-demo
~~~

## Installing dependencies
이 튜토리얼은 다음을 사용합니다:

- **Valtio**를 상태 관리에 사용
- **Material UI**를 도구 모음 UI에 사용

패키지를 설치합니다:

~~~bash
npm install valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

 Yarn을 사용하는 경우:

~~~bash
yarn add valtio @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

## Installing React Scheduler
React Scheduler를 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 설치합니다.

이 튜토리얼에서는 평가판 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-scheduler
```

또는

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Professional 패키지를 이미 사용 중이라면 명령어와 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 바꿔서 사용합니다.

## Preparing app styles
React Scheduler는 결정된 높이를 가진 상위 컨테이너를 필요로 합니다. 기본 스타일을 `src/App.css`에서 다음으로 교체합니다:

~~~css title="src/App.css"
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## Adding seed data
작은 데이터 세트와 기본 뷰/날짜를 설정하고 `src/seed/data.ts`를 생성합니다:

~~~ts title="src/seed/data.ts"
export const seedEvents = [
  {
    id: 1,
    start_date: "2025-08-11T02:00:00Z",
    end_date: "2025-08-11T10:20:00Z",
    text: "Product Strategy Hike",
  },
  {
    id: 2,
    start_date: "2025-08-12T06:00:00Z",
    end_date: "2025-08-12T11:00:00Z",
    text: "Tranquil Tea Time",
  },
  {
    id: 3,
    start_date: "2025-08-15T03:00:00Z",
    end_date: "2025-08-15T08:00:00Z",
    text: "Demo and Showcase",
  },
  {
    id: 4,
    start_date: "2025-08-12T11:30:00Z",
    end_date: "2025-08-12T19:00:00Z",
    text: "Sprint Review and Retreat",
  },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");

export type SchedulerView = "day" | "week" | "month";
export const seedView: SchedulerView = "week";
~~~

:::note
보조 데모에는 더 풍성한 시각 효과를 위한 추가 이벤트가 포함되어 있습니다.
:::

## Creating a Valtio store
`src/store.ts`를 생성합니다. 이 저장소는 다음을 소유합니다:

- `events` (Scheduler에 전달되는 이벤트 배열)
- `currentDate` 및 `view` (또한 props로 전달)
- `config` (Scheduler 구성 객체, `readonly` 포함)
- `_past` / `_future` 스택은 Undo/Redo 이력 관리

주요 포인트는 **스냅샷 기반 이력**입니다. 깊은 복제된 스냅샷을 저장하여 Undo/Redo가 mutable 배열에 대한 참조를 유지하지 않도록 합니다. 탐색(`setCurrentDate`/`setView`)은 의도적으로 Undoable하지 않으며 — 데이터를 변경하는 동작(CRUD, 구성 변경)만 이력 스택에 푸시됩니다.

~~~ts title="src/store.ts"
import { proxy, snapshot } from "valtio";
import { seedEvents, seedView, seedDate, type SchedulerView } from "./seed/data";

export type SchedulerEvent = {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
  [key: string]: unknown;
};

export type SchedulerConfig = Record<string, unknown>;

type HistorySnapshot = {
  events: SchedulerEvent[];
  config: SchedulerConfig;
};

const deepClone = <T,>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const normalizeId = (value: unknown) => String(value);

export const createSchedulerStore = () => {
  const state = proxy({
    events: seedEvents as SchedulerEvent[],
    currentDate: seedDate as number,
    view: seedView as SchedulerView,
    config: {} as SchedulerConfig,

    // Undo/redo history stacks and capacity
    _past: [] as HistorySnapshot[],
    _future: [] as HistorySnapshot[],
    _cap: 50,
  });

  const getHistorySnapshot = (): HistorySnapshot => {
    const snap = snapshot(state);

    return {
      events: deepClone(snap.events as SchedulerEvent[]),
      config: deepClone(snap.config as SchedulerConfig),
    };
  };

  const recordHistory = () => {
    const snapshotItem = getHistorySnapshot();

    state._past = [...state._past.slice(-state._cap + 1), snapshotItem];
    state._future = [];
  };

  const actions = {
    updateEvent: (payload: Partial<SchedulerEvent> & { id?: string | number }) => {
      const payloadId = payload.id;

      if (payloadId === undefined || payloadId === null) {
        return;
      }

      recordHistory();
      const normalizedPayloadId = normalizeId(payloadId);

      state.events = state.events.map((eventItem) => {
        if (normalizeId(eventItem.id) !== normalizedPayloadId) {
          return eventItem;
        }

        return { ...eventItem, ...payload, id: eventItem.id };
      });
    },

    createEvent: (payload: Partial<SchedulerEvent>) => {
      recordHistory();

      const newEventId = `id_${Date.now().toString()}`;
      const newEvent = { ...payload, id: newEventId } as SchedulerEvent;

      state.events = [...state.events, newEvent];
      return newEvent;
    },

    deleteEvent: (id: string | number) => {
      recordHistory();
      const normalizedId = normalizeId(id);

      state.events = state.events.filter((eventItem) => {
        return normalizeId(eventItem.id) !== normalizedId;
      });
    },

    // Navigation is not an undoable user action in this demo.
    setCurrentDate: (date: number) => {
      state.currentDate = date;
    },

    // Navigation is not an undoable user action in this demo.
    setView: (view: SchedulerView) => {
      state.view = view;
    },

    updateConfig: (partial: Partial<SchedulerConfig>) => {
      recordHistory();
      state.config = { ...state.config, ...partial };
    },

    undo: () => {
      if (state._past.length === 0) return;

      const previous = state._past[state._past.length - 1];
      const current = getHistorySnapshot();

      state._past = state._past.slice(0, -1);
      state._future = [current, ...state._future];

      state.events = previous.events;
      state.config = previous.config;
    },

    redo: () => {
      if (state._future.length === 0) return;

      const next = state._future[0];
      const current = getHistorySnapshot();

      state._future = state._future.slice(1);
      state._past = [...state._past.slice(-state._cap + 1), current];

      state.events = next.events;
      state.config = next.config;
    },
  };

  return { state, actions };
};

export const schedulerStore = createSchedulerStore();
export default schedulerStore;
~~~

## Creating a reusable toolbar
`src/components/Toolbar.tsx`를 생성합니다. 이 작은 MUI 도구 모음은 다음 기능을 제공합니다:

- 뷰 전환(일/주/월)
- 이전/오늘/다음으로 탐색
- 실행 취소/다시 실행
- 읽기 전용 모드 토글

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

import type { SchedulerView } from "../seed/data";

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

        <FormControlLabel
          label="Read-only"
          control={
            <Switch
              checked={isReadOnly}
              onChange={(e) => onReadOnlyChange?.(e.target.checked)}
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

## Rendering React Scheduler and connecting it to Valtio
`src/components/Scheduler.tsx`를 생성합니다. 이 컴포넌트는 다음을 수행합니다:

- `useSnapshot`을 통해 Valtio 프록시에 구독
- 이벤트들(`events`), 날짜(`date`), 뷰(`view`), 구성(`config`)를 React Scheduler 속성으로 전달
- `data.save`를 브리지로 구현하여 변경 내용을 저장소 액션으로 라우팅하는 `switch/case` 구현
- `undo/redo` 및 `읽기 전용` 구성을 연결
- 내장 네비게이션 바를 숨기고 커스텀 툴바를 사용

~~~tsx title="src/components/Scheduler.tsx"
import { useCallback, useMemo } from "react";

// Trial import:
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// Pro import:
// import ReactScheduler from "@dhx/react-scheduler";
// import "@dhx/react-scheduler/dist/react-scheduler.css";

import { useSnapshot } from "valtio";

import Toolbar from "./Toolbar";
import schedulerStore from "../store";
import type { SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";

export default function DemoValtioScheduler() {
  const snap = useSnapshot(schedulerStore.state);

  const canUndo = snap._past.length > 0;
  const canRedo = snap._future.length > 0;
  const isReadOnly = Boolean((snap.config as { readonly?: unknown }).readonly);

  const activeDate = useMemo(() => {
    return new Date(snap.currentDate);
  }, [snap.currentDate]);

  const handleSetCurrentDate = useCallback((date: number) => {
    schedulerStore.actions.setCurrentDate(date);
  }, []);

  const handleSetView = useCallback((view: SchedulerView) => {
    schedulerStore.actions.setView(view);
  }, []);

  const handleUndo = useCallback(() => {
    schedulerStore.actions.undo();
  }, []);

  const handleRedo = useCallback(() => {
    schedulerStore.actions.redo();
  }, []);

  const handleReadOnlyChange = useCallback((value: boolean) => {
    schedulerStore.actions.updateConfig({ readonly: value });
  }, []);

  const handleDateNavigation = useCallback(
    (action: "prev" | "next" | "today") => {
      if (action === "today") {
        handleSetCurrentDate(Date.now());
        return;
      }

      const step = action === "next" ? 1 : -1;
      const date = new Date(snap.currentDate);

      if (snap.view === "day") {
        date.setDate(date.getDate() + step);
      } else if (snap.view === "week") {
        date.setDate(date.getDate() + step * 7);
      } else {
        date.setMonth(date.getMonth() + step);
      }

      handleSetCurrentDate(date.getTime());
    },
    [handleSetCurrentDate, snap.currentDate, snap.view]
  );

  // Scheduler <-> Valtio data bridge
  const dataBridge = useMemo(() => {
    return {
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

            const eventWithId = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
            return schedulerStore.actions.updateEvent(eventWithId);
          }
          case "create":
            return schedulerStore.actions.createEvent(payload as Omit<Partial<SchedulerEvent>, "id">);
          case "delete": {
            const deleteId =
              payload && typeof payload === "object"
                ? (payload as Record<string, unknown>).id ?? id
                : payload ?? id;
            if (deleteId == null) {
              console.warn("Delete called without an id", { payload, id });
              return;
            }
            return schedulerStore.actions.deleteEvent(deleteId as SchedulerEvent["id"]);
          }
          default:
            console.warn(`Unknown action: ${action}`);
            return;
        }
      },
    };
  }, []);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      schedulerStore.actions.setView(nextView);
      schedulerStore.actions.setCurrentDate(date.getTime());
    },
    []
  );

  const memoizedXY = useMemo(() => ({ nav_height: 0 }), []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        currentView={snap.view}
        currentDate={activeDate}
        isReadOnly={isReadOnly}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={handleReadOnlyChange}
        setView={handleSetView}
      />

      <ReactScheduler
        events={snap.events}
        view={snap.view}
        date={activeDate}
        xy={memoizedXY} /* hide built-in navbar */
        config={snap.config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Mounting the Scheduler
`src/App.tsx`를 업데이트합니다:

~~~tsx title="src/App.tsx"
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return <Scheduler />;
}

export default App;
~~~

## Run the application
개발 서버를 시작합니다:

~~~bash
npm run dev
~~~

또는:

~~~bash
yarn dev
~~~

## Summary
이 튜토리얼을 통해 다음을 수행했습니다:

- Vite + React 프로젝트를 생성
- 결정된 높이의 컨테이너를 가진 React Scheduler 렌더링
- 단일 Valtio 프록시 저장소에 `events`, `view`, `currentDate`, `config`를 모델링
- `_past`/`_future` 스택을 이용한 스냅샷 기반 Undo/Redo 구현 (이벤트 + 구성)
- Scheduler의 모든 변경을 `data.save`를 통해 저장소 액션으로 라우팅
- 읽기 전용 토글을 추가하여 Scheduler 편집을 차단

이로써 Scheduler 컴포넌트는 선언적 상태(상태 -> Props)를 유지하고, 저장소가 모든 변경 로직과 히스토리를 책임지게 됩니다.

## What's next
- React Scheduler의 두 가지 데이터 바인딩 모델에 대해 더 알아보기: [React Scheduler docs: Binding Data](integrations/react/state/state-management-basics.md)
- `templates` prop을 사용해 커스텀 템플릿과 UI를 추가하기
- 같은 패턴을 다른 상태 관리 도구와 함께 적용하기:
  - [Redux Toolkit과 함께 React Scheduler 사용](integrations/react/state/redux-toolkit.md)
  - [MobX와 함께 React Scheduler 사용](integrations/react/state/mobx.md)
  - [XState와 함께 React Scheduler 사용](integrations/react/state/xstate.md)
  - [Zustand와 함께 React Scheduler 사용](integrations/react/state/zustand.md)
  - [Jotai와 함께 React Scheduler 사용](integrations/react/state/jotai.md)