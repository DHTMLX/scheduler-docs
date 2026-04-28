---
title: 리액트 스케줄러 - Redux Toolkit 튜토리얼
sidebar_label: Redux Toolkit
description: DHTMLX React Scheduler를 Redux Toolkit과 통합하는 방법을 알아보고, 이벤트 CRUD, 뷰/날짜 동기화, 그리고 스냅샷 기반의 undo/redo를 포함합니다.
---

# 리액트 스케줄러 - Redux Toolkit 튜토리얼

이 튜토리얼은 **DHTMLX React Scheduler**를 **Redux Toolkit** 저장소에 연결하는 방법을 보여줍니다. 이벤트와 UI 상태(뷰/날짜/구성)를 Redux에 보관하고, Scheduler 편집을 `data.save`를 통해 라우팅하며, 스냅샷 기반의 히스토리로 **undo/redo**를 추가하고 **읽기 전용(read-only)** 토글을 제공합니다.

:::note
전체 소스 코드는 [GitHub에서 확인할 수 있습니다](https://github.com/DHTMLX/react-scheduler-redux-starter).
:::

## 전제 조건

- Node.js (권장 LTS)
- React + TypeScript 기본 지식
- Redux 기본 개념(액션, 리듀서, 스토어). 복습이 필요하다면 Redux 문서를 참고하세요: https://redux.js.org/

## Quick setup - 프로젝트 생성

Vite + React + TS 프로젝트를 생성합니다:

~~~bash
npm create vite@latest scheduler-redux-demo -- --template react-ts
cd scheduler-redux-demo
npm install
~~~

Redux Toolkit + React Redux를 설치합니다:

~~~bash
npm install @reduxjs/toolkit react-redux
~~~

데모 도구 모음에 사용되는 Material UI를 설치합니다:

~~~bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### React Scheduler 설치

다음의 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 React Scheduler를 설치합니다.

이번 튜토리얼에서는 평가 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-scheduler
```

또는

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Professional 패키지를 이미 사용하는 경우, 명령과 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 교체합니다.

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

:::note
Scheduler를 페이지 전체에 차지하도록 만들려면 `src/App.css`의 기본 스타일을 제거하고 아래를 추가합니다:

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

## Redux 저장소 구성

`src/redux/store.ts`를 만들고 `scheduler` 리듀서를 Redux 저장소에 연결합니다:

~~~ts
import { configureStore } from "@reduxjs/toolkit";
import schedulerReducer from "./schedulerSlice";

export const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
~~~

## 공유 타입 정의

`src/redux/types.ts`를 생성합니다. 이 타입은 슬라이스, 액션, 컴포넌트 전반에 걸쳐 공유됩니다:

~~~ts
export type SchedulerView = "day" | "week" | "month";

export interface SchedulerEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;

  // Scheduler가 런타임에 추가 필드를 붙일 수 있도록 허용
  [key: string]: unknown;
}

export type SchedulerConfig = Record<string, unknown>;

export interface SchedulerSnapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}
~~~

- `SchedulerEvent`는 런타임에 추가 필드를 붙일 수 있도록 인덱스 시그니처를 사용합니다.
- `SchedulerSnapshot`은 undo/redo에 필요한 데이터(이벤트 + 구성)를 포착합니다.

## 샘플 데이터 설정

`src/seed/data.ts`를 만들고 몇 개의 이벤트와 초기 UI 상태를 추가합니다. 주의: `currentDate`는 **숫자**(타임스탬프)로 저장되어 Redux 상태의 직렬화를 유지합니다.

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

## Scheduler 동작 정의(생성/수정/삭제)

Scheduler 편집은 Redux 액션을 통해 라우팅됩니다. `src/redux/actions.ts`를 만듭니다.

`createEvent` 액션은 안정적인 ID를 생성하기 위해 "prepare" 콜백을 사용합니다(백엔드에서 생성된 ID를 시뮬레이션). 또한 디스패치된 페이로드를 일관되게 반환하는 작은 헬퍼(`dispatchAction`)를 추가합니다. 이 헬퍼는 Scheduler의 `data.save`가 생성/수정 엔티티를 반환할 수 있기 때문입니다.

~~~ts
import { createAction } from "@reduxjs/toolkit";
import type { Dispatch } from "redux";
import type { SchedulerEvent } from "./types";

// 백엔드에서 ID를 받는 것을 시뮬레이션합니다.
const generateId = () => `id_${Date.now().toString()}`;

export const createEvent = createAction(
  "schedulerDomain/createEvent",
  (eventData: Omit<Partial<SchedulerEvent>, "id">) => {
    const newEvent: SchedulerEvent = {
      ...(eventData as Omit<SchedulerEvent, "id">),
      id: generateId(),
    };
    return { payload: newEvent };
  }
);

export const deleteEvent = createAction(
  "schedulerDomain/deleteEvent",
  (id: SchedulerEvent["id"]) => ({ payload: id })
);

export const updateEvent = createAction(
  "schedulerDomain/updateEvent",
  (eventData: Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">) => ({ payload: eventData })
);

// 디스패치를 실행하고 일관되게 payload를 반환하는 헬퍼 함수
export function dispatchAction<Arg, Payload>(
  dispatch: Dispatch,
  actionCreator: (arg: Arg) => { type: string; payload: Payload },
  arg: Arg
): Payload {
  return dispatch(actionCreator(arg)).payload;
}
~~~

## Redux 슬라이스 생성

이제 `src/redux/schedulerSlice.ts`를 만듭니다. 이 슬라이스는 다음을 저장합니다:

- `events`(스케줄러 데이터)
- `currentDate`(타임스탬프)
- `view`(`day | week | month`)
- `config`(스케줄러 구성 객체, 포함 `readonly`)
- `past` / `future`(undo/redo를 위한 스냅샷 배열)

Undo/redo는 스냅샷을 직접 슬라이스에 통합하여 구현합니다. 데이터를 수정하기 전마다 `pushHistory`가 현재 이벤트와 구성을 스냅샷으로 저장합니다. `undo` 와 `redo` 리듀서는 현재 상태를 히스토리의 스냅샷으로 교환합니다.

~~~ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { seedEvents, seedDate, seedView } from "../seed/data";
import { createEvent, deleteEvent, updateEvent } from "./actions";
import type { SchedulerConfig, SchedulerEvent, SchedulerSnapshot, SchedulerView } from "./types";

interface SchedulerState {
  events: SchedulerEvent[];
  currentDate: number;
  view: SchedulerView;
  config: SchedulerConfig;

  past: SchedulerSnapshot[];
  future: SchedulerSnapshot[];
  maxHistory: number;
}

const deepCopy = <T,>(value: T): T => {
  // 이 데모에 충분한 JSON 복제:
  // - 이벤트/구성은 순수 객체
  // - undo/redo를 위한 불변 스냅샷
  return JSON.parse(JSON.stringify(value)) as T;
};

const createSnapshot = (state: SchedulerState): SchedulerSnapshot => ({
  events: deepCopy(state.events),
  config: deepCopy(state.config),
});

const pushHistory = (state: SchedulerState) => {
  state.past.push(createSnapshot(state));

  if (state.maxHistory > 0 && state.past.length > state.maxHistory) {
    state.past.shift();
  }

  state.future = [];
};

const initialState: SchedulerState = {
  events: seedEvents as unknown as SchedulerEvent[],
  currentDate: seedDate,
  view: seedView as SchedulerView,
  config: {},

  past: [],
  future: [],
  maxHistory: 50,
};

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    undo(state) {
      if (state.past.length === 0) return;

      const previous = state.past[state.past.length - 1];
      const newFuture = createSnapshot(state as SchedulerState);

      state.events = previous.events;
      state.config = previous.config;
      state.past = state.past.slice(0, -1);
      state.future = [newFuture, ...state.future];
    },
    redo(state) {
      if (state.future.length === 0) return;

      const next = state.future[0];
      const newPast = createSnapshot(state as SchedulerState);

      state.events = next.events;
      state.config = next.config;
      state.future = state.future.slice(1);
      state.past = [...state.past, newPast];
    },

    // 사용자가 수행한 네비게이션은 undo 가능行动이 아닙니다.
    setCurrentDate(state, { payload }: PayloadAction<number>) {
      state.currentDate = payload;
    },
    setView(state, { payload }: PayloadAction<SchedulerView>) {
      state.view = payload;
    },

    updateConfig(state, { payload }: PayloadAction<Partial<SchedulerConfig>>) {
      pushHistory(state as SchedulerState);
      state.config = { ...state.config, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events.push(action.payload);
      })
      .addCase(deleteEvent, (state, action) => {
        pushHistory(state as SchedulerState);
        state.events = state.events.filter((e) => String(e.id) !== String(action.payload));
      })
      .addCase(updateEvent, (state, action) => {
        pushHistory(state as SchedulerState);

        const index = state.events.findIndex((e) => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.events[index] = { ...state.events[index], ...action.payload };
        }
      });
  },
});

export const { undo, redo, setCurrentDate, setView, updateConfig } = schedulerSlice.actions;
export default schedulerSlice.reducer;
~~~

## 컨트롤 도구 모음(Toolbar) 구성

`src/components/Toolbar.tsx`를 만듭니다. 이는 다음 기능을 가진 간단한 MUI 도구 모음입니다:

- 뷰 전환(day/week/month)
- 이전/오늘/다음으로 이동
- undo/redo
- 읽기 전용 모드 토글

~~~tsx
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";
import type { SchedulerView } from "../redux/types";

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

## Redux에 Scheduler 연결

`src/components/Scheduler.tsx`를 만듭니다. 이 컴포넌트는 다음을 수행합니다:

- 플랫(flat) Redux 상태에서 `events`/`view`/`currentDate`/`config`를 읽습니다
- Redux 액션을 디스패치하는 `data.save` 콜백을 노출합니다
- `save`에서 생성된/수정된 엔티티를 반환하여 Scheduler의 내부 기록과 동기화합니다
- `undo/redo` 및 `읽기 전용(read-only)` 구성 토글을 연동합니다
- 내장 네비게이션 바를 숨기고 커스텀 도구 모음을 사용합니다

~~~tsx
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// 트라이얼 임포트:
// import ReactScheduler from "@dhtmlx/trial-react-scheduler";
// import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";

// 프로 임포트:
import ReactScheduler from "@dhx/react-scheduler";
import "@dhx/react-scheduler/dist/react-scheduler.css";

import Toolbar from "./Toolbar";
import { redo, setCurrentDate, setView, undo, updateConfig } from "../redux/schedulerSlice";
import { createEvent, updateEvent, deleteEvent, dispatchAction } from "../redux/actions";
import type { AppDispatch, RootState } from "../redux/store";
import type { SchedulerEvent, SchedulerView } from "../redux/types";

export default function ReactSchedulerReduxDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { past, future, events, view, currentDate, config } = useSelector((s: RootState) => s.scheduler);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);
  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);

  const handleDateNavigation = useCallback((action: "prev" | "next" | "today") => {
    if (action === "today") {
      dispatch(setCurrentDate(Date.now()));
      return;
    }

    const step = action === "next" ? 1 : -1;
    const date = new Date(activeDate);

    if (view === "day") {
      date.setDate(date.getDate() + step);
    } else if (view === "week") {
      date.setDate(date.getDate() + step * 7);
    } else {
      date.setMonth(date.getMonth() + step);
    }
    dispatch(setCurrentDate(date.getTime()));
  }, [activeDate, view, dispatch]);

  // Scheduler <-> Redux 데이터 다리
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

          const eventWithId = { ...eventData, id: eventId } as Partial<SchedulerEvent> & Pick<SchedulerEvent, "id">;
          return dispatchAction(dispatch, updateEvent, eventWithId);
        }
        case "create":
          return dispatchAction(dispatch, createEvent, payload as Omit<Partial<SchedulerEvent>, "id">);
        case "delete": {
          const deleteId =
            payload && typeof payload === "object"
              ? (payload as Record<string, unknown>).id ?? id
              : payload ?? id;
          if (deleteId == null) {
            console.warn("Delete called without an id", { payload, id });
            return;
          }
          return dispatchAction(dispatch, deleteEvent, deleteId as SchedulerEvent["id"]);
        }
        default:
          console.warn(`Unknown action: ${action}`);
          return;
      }
    },
  }), [dispatch]);

  const handleViewChange = useCallback(
    (mode: string, date: Date) => {
      const nextView: SchedulerView = mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      dispatch(setView(nextView));
      dispatch(setCurrentDate(date.getTime()));
    },
    [dispatch]
  );

  const handleSetView = useCallback((nextView: SchedulerView) => dispatch(setView(nextView)), [dispatch]);

  const handleUndo = useCallback(() => dispatch(undo()), [dispatch]);
  const handleRedo = useCallback(() => dispatch(redo()), [dispatch]);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => dispatch(updateConfig({ readonly: value })),
    [dispatch]
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
        onUndo={handleUndo}
        onRedo={handleRedo}
        onNavigate={handleDateNavigation}
        onReadOnlyChange={handleReadOnlyChange}
        setView={handleSetView}
      />

      <ReactScheduler
        events={events}
        view={view}
        date={activeDate}
        xy={memoizedXY} /* 내장 navbar 숨김 */
        config={config}
        data={dataBridge}
        onViewChange={handleViewChange}
      />
    </div>
  );
}
~~~

## Redux Provider 연결

마지막으로 애플리케이션을 Redux `Provider`로 감쌉니다. `src/App.tsx`를 업데이트합니다:

~~~tsx
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Scheduler />
    </Provider>
  );
}

export default App;
~~~

## 요약

이제 React Scheduler가 Redux Toolkit으로 완전히 구동됩니다:

- Scheduler는 Redux에서 `events`, `view`, `currentDate`, `config`를 읽습니다
- 사용자의 편집은 `data.save`를 통해 Redux 액션으로 라우팅됩니다
- Scheduler가 프롭스로 업데이트된 `events`를 받기 때문에 UI가 동기화됩니다
- undo/redo는 슬라이스에 직접 통합된 스냅샷 기반 히스토리로 구현됩니다
- 읽기 전용 구성 토글을 통해 Scheduler를 편집에서 잠글 수 있습니다

## 앞으로의 내용

- 이 예제의 개념을 [Data Binding & State Management Basics](integrations/react/state/state-management-basics.md)에서 다시 살펴보기
- [React Scheduler 개요](integrations/react/overview.md)에서 Scheduler의 구성 및 템플레이팅 옵션을 탐색하기
- 비동기 thunk를 디스패치하고 슬라이스를 적절히 업데이트하여 API에서 이벤트를 로드/저장하는 방식으로 지속성을 추가하기
- 동일한 패턴을 다른 상태 관리 도구와 함께 적용하기:
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with XState](integrations/react/state/xstate.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)
  - [Using React Scheduler with Valtio](integrations/react/state/valtio.md)
  - [Using React Scheduler with Jotai](integrations/react/state/jotai.md)