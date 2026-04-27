---
title: MobX와 함께하는 React Scheduler 사용
sidebar_label: MobX
description: "observable MobX 상태에서 React Scheduler를 렌더링하고 `data.save`를 통해 생성/수정/삭제를 처리하며 스냅샷 기반의 실행 취소/다시 실행을 지원합니다."
---

# React Scheduler - MobX 튜토리얼

이 튜토리얼은 **DHTMLX React Scheduler**를 Vite + React + TypeScript 앱에서 렌더링하고 이를 **MobX** 저장소에서 구동하는 방법을 보여줍니다. 
마지막에는 **create/update/delete**, **뷰(view) + 날짜 탐색**, 이벤트 변경에 대한 **스냅샷 기반 Undo/Redo**, 그리고 **읽기 전용(Read-only)** 토글을 지원하는 작동하는 스케줄러를 얻게 됩니다.  
또한 Scheduler 위에 배치되는 간단한 도구 모음도 함께 제공합니다.

:::note
전체 소스 코드는 [GitHub에서 확인 가능합니다](https://github.com/DHTMLX/react-scheduler-mobx-starter).
:::

구현 목표:

- `events`, 현재의 `view`, 그리고 `date`를 소유하는 MobX 저장소
- Scheduler 편집을 저장소 액션으로 변환하는 `data.save` 브리지
- Scheduler 위에 위치하는 간단한 도구 모음(뷰, 탐색, undo/redo, 읽기 전용 토글)

## 사전 지식

- React, TypeScript, Vite, 그리고 MobX에 대한 기초 지식
- 데이터 바인딩 모드와 이 튜토리얼이 기반으로 하는 `data.save` 콜백 구조를 이해하기 위해 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md) 문서를 읽어보는 것을 권장합니다.

## 빠른 설정 - 프로젝트 생성하기

이번 단계에서는 Vite 프로젝트를 생성하고 의존성을 설치한 뒤 앱이 정상적으로 동작하는지 확인합니다.

수행할 작업:

- Vite React + TypeScript 프로젝트 생성
- MobX + UI 의존성 설치
- React Scheduler(평가 패키지) 설치
- Scheduler가 뷰포트를 채우도록 기본 Vite 스타일 제거

시작하기 전에 [Node.js](https://nodejs.org/en/)를 설치합니다.

Vite React + TypeScript 프로젝트를 생성:

~~~bash
npm create vite@latest react-scheduler-mobx-demo -- --template react-ts
cd react-scheduler-mobx-demo
~~~

이제 필요한 의존성을 설치합니다.

* npm 사용 시:
~~~bash
npm install mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

* yarn 사용 시:
~~~bash
yarn add mobx mobx-react-lite @mui/material @mui/icons-material @emotion/react @emotion/styled
~~~

### React Scheduler 설치하기

React Scheduler 설치 방법은 [React Scheduler 설치 가이드](integrations/react/installation.md)를 참고합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

```bash
npm install @dhtmlx/trial-react-scheduler
```

또는

```bash
yarn add @dhtmlx/trial-react-scheduler
```

Professional 패키지를 이미 사용하는 경우, 명령어와 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 교체해 주세요.
다음으로 개발 서버를 시작할 수 있습니다:

~~~bash
npm run dev
~~~

이제 `http://localhost:5173`에서 React 프로젝트가 실행 중이어야 합니다.

:::note
Scheduler가 페이지의 전체 공간을 차지하도록 `src/App.css`의 기본 Vite 스타일을 제거해 주세요.
다음과 같이 `src/App.css`를 업데이트합니다.
:::

~~~css title="src/App.css"
#root, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
~~~

## 샘플 데이터 설정

이 단계에서는 Scheduler가 모든 실행에서 동일하게 보이도록 Deterministic Seed 데이터를 생성합니다.

수행할 작업:

- `src/seed/data.ts`를 만들고 작은 이벤트 집합을 추가
- Scheduler가 예측 가능한 상태에서 시작되도록 초기 `view`와 `date`를 내보냄

`src/seed/data.ts`를 생성:

~~~ts title="src/seed/data.ts"
export type SchedulerView = "day" | "week" | "month";

export interface SeedEvent {
  id: string | number;
  start_date: string;
  end_date: string;
  text: string;
}

export const seedEvents: SeedEvent[] = [
  { id: 1, start_date: "2025-08-11T02:00:00Z", end_date: "2025-08-11T10:20:00Z", text: "Product Strategy Hike" },
  { id: 2, start_date: "2025-08-12T06:00:00Z", end_date: "2025-08-12T11:00:00Z", text: "Tranquil Tea Time" },
  { id: 3, start_date: "2025-08-15T03:00:00Z", end_date: "2025-08-15T08:00:00Z", text: "Demo and Showcase" },
];

export const seedDate = Date.parse("2025-08-15T00:00:00Z");

export const seedView: SchedulerView = "week";
~~~

:::note
Companion 데모에는 시각적 효과를 더하기 위한 추가 이벤트가 포함되어 있습니다.
:::

## 컨트롤 도구 모음 컴포넌트 구성하기

이 단계에서는 Scheduler 내비게이션과 이력(history)을 제어하는 간단하고 재사용 가능한 도구 모음을 구성합니다.

수행할 작업:

- `src/components/Toolbar.tsx` 생성
- **Day / Week / Month** 버튼 추가
- **Prev / Today / Next** 네비게이션 버튼 추가
- 콜백에 연결된 **Undo / Redo** 버튼 추가
- **Read-only** 토글 스위치 추가

`src/components/Toolbar.tsx` 생성:

~~~tsx title="src/components/Toolbar.tsx"
import { ButtonGroup, Button, Typography, Stack, FormControlLabel, Switch } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import React from "react";

export interface ToolbarProps {
  currentView: string;
  currentDate: Date;
  isReadOnly: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onNavigate?: (action: "prev" | "next" | "today") => void;
  onReadOnlyChange?: (value: boolean) => void;
  setView: (view: "day" | "week" | "month") => void;
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
          <Button
            key={label}
            variant={currentView === label ? "contained" : "outlined"}
            onClick={() => setView(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}

        <ButtonGroup>
          <Button onClick={() => onUndo?.()} disabled={canUndo === false}>
            <UndoIcon />
          </Button>
          <Button onClick={() => onRedo?.()} disabled={canRedo === false}>
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
        {new Date(currentDate).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </Typography>

      <ButtonGroup>
        <Button onClick={() => onNavigate?.("prev")}>&nbsp;&lt;&nbsp;</Button>
        <Button onClick={() => onNavigate?.("today")}>Today</Button>
        <Button onClick={() => onNavigate?.("next")}>&nbsp;&gt;&nbsp;</Button>
      </ButtonGroup>
    </Stack>
  );
});
~~~

## MobX 저장소 설정하기

이 단계에서는 Scheduler 상태를 소유하고 스냅샷 기반 Undo/Redo를 구현하는 MobX 저장소를 만듭니다.

수행할 작업:

- `src/store.ts` 생성
- `events`, 현재의 `view`, `currentDate`, 그리고 `config`를 관찰 가능한 상태로 저장
- `createEvent`, `updateEvent`, `deleteEvent` 메서드 구현
- 읽기 전용 토글을 위한 `updateConfig` 추가
- 과거/미래 히스토리 스택과 Undo/Redo 연산 추가

`src/store.ts` 생성:

~~~ts title="src/store.ts"
import { makeAutoObservable } from "mobx";
import type { SchedulerConfig } from "@dhtmlx/trial-react-scheduler";
import { seedEvents, seedView, seedDate, type SeedEvent, type SchedulerView } from "./seed/data";

export interface SchedulerEvent extends SeedEvent {
  /**
   * Extra Scheduler fields are allowed.
   * The demo only relies on id/start_date/end_date/text.
   */
  [key: string]: unknown;
}

interface Snapshot {
  events: SchedulerEvent[];
  config: SchedulerConfig;
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

class SchedulerStore {
  events: SchedulerEvent[] = seedEvents as SchedulerEvent[];
  view: SchedulerView = seedView;
  currentDate: number = seedDate;
  config: SchedulerConfig = {};

  past: Snapshot[] = [];
  future: Snapshot[] = [];
  maxHistory = 50;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  private generateId(): string {
    return `id_${Date.now().toString()}`;
  }

  private snapshot(): Snapshot {
    return {
      events: cloneJson(this.events),
      config: cloneJson(this.config),
    };
  }

  private saveToHistory(): void {
    this.past.push(this.snapshot());
    if (this.past.length > this.maxHistory) {
      this.past.shift();
    }
    this.future = [];
  }

  private restore(snapshot: Snapshot): void {
    this.events = snapshot.events;
    this.config = snapshot.config;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setCurrentDate(date: number): void {
    this.currentDate = date;
  }

  /**
   * Navigation is not part of history: undo/redo in this demo is focused on event mutations.
   */
  setView(view: SchedulerView): void {
    this.view = view;
  }

  updateConfig(partial: Partial<SchedulerConfig>): void {
    this.saveToHistory();
    this.config = { ...this.config, ...partial };
  }

  /**
   * Called by Scheduler's data processor (data.save) on event creation.
   *
   * Important: we return the created event with a final id (simulating a backend-generated id),
   * so Scheduler can replace its temporary id and keep subsequent updates working correctly.
   */
  createEvent(eventDraft: Partial<SchedulerEvent>): SchedulerEvent {
    this.saveToHistory();

    const id = this.generateId();
    const newEvent: SchedulerEvent = {
      ...eventDraft,
      id,
      start_date: String(eventDraft.start_date ?? new Date().toISOString()),
      end_date: String(eventDraft.end_date ?? new Date().toISOString()),
      text: String(eventDraft.text ?? "(no title)"),
    };

    this.events = [...this.events, newEvent];
    return newEvent;
  }

  updateEvent(updatedEvent: Partial<SchedulerEvent> & { id: string | number }): void {
    this.saveToHistory();
    this.events = this.events.map((event) => {
      if (String(event.id) === String(updatedEvent.id)) {
        return { ...event, ...updatedEvent };
      }
      return event;
    });
  }

  deleteEvent(id: string | number): void {
    this.saveToHistory();
    this.events = this.events.filter((event) => String(event.id) !== String(id));
  }

  undo(): void {
    if (this.past.length === 0) {
      return;
    }

    const previous = this.past.pop();
    if (!previous) {
      return;
    }

    this.future.unshift(this.snapshot());
    this.restore(previous);
  }

  redo(): void {
    if (this.future.length === 0) {
      return;
    }

    const next = this.future.shift();
    if (!next) {
      return;
    }

    this.past.push(this.snapshot());
    this.restore(next);
  }
}

const schedulerStore = new SchedulerStore();
export default schedulerStore;
~~~

## 메인 Scheduler 컴포넌트 생성

이 단계에서는 React Scheduler를 렌더링하고 MobX 저장소에 연결합니다.

수행할 작업:

- `src/components/Scheduler.tsx` 생성
- 저장소 변경 시 재렌더링 되도록 `observer`로 컴포넌트 래핑
- 저장소의 액션 호출로 create/update/delete를 수행하는 `data.save` 다리 생성
- 내부 Scheduler 뷰 변경을 상태와 동기화하는 `onViewChange` 핸들러 추가
- 읽기 전용 토글을 `updateConfig`를 통해 연결
- Scheduler의 내장 내비게이션 바를 숨기고 도구 모음을 사용하도록 구성

`src/components/Scheduler.tsx` 생성:

~~~tsx title="src/components/Scheduler.tsx"
import { observer } from "mobx-react-lite";
import ReactScheduler from "@dhtmlx/trial-react-scheduler";
import "@dhtmlx/trial-react-scheduler/dist/react-scheduler.css";
import Toolbar from "./Toolbar";
import schedulerStore, { type SchedulerEvent } from "../store";
import type { SchedulerView } from "../seed/data";
import { useCallback, useMemo } from "react";

const DemoMobxScheduler = observer(() => {
  const {
    events,
    view,
    currentDate,
    config,
    canUndo,
    canRedo,
    setView,
    setCurrentDate,
    updateConfig,
    createEvent,
    updateEvent,
    deleteEvent,
    undo,
    redo,
  } = schedulerStore;

  const activeDate = useMemo(() => new Date(currentDate), [currentDate]);

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
      const nextView: SchedulerView =
        mode === "day" || mode === "week" || mode === "month" ? mode : "month";
      setView(nextView);
      setCurrentDate(date.getTime());
    },
    [setView, setCurrentDate]
  );

  const isReadOnly = Boolean((config as { readonly?: unknown }).readonly);
  const handleReadOnlyChange = useCallback(
    (value: boolean) => updateConfig({ readonly: value }),
    [updateConfig]
  );

  type DataAction = "create" | "update" | "delete";

  const dataBridge = useMemo(
    () => ({
      save: (entity: string, action: string, payload: unknown, id: string | number) => {
        if (entity !== "event") {
          return;
        }

        const safeAction = action as DataAction;

        if (safeAction === "update") {
          return updateEvent(payload as Partial<SchedulerEvent> & { id: string | number });
        }

        if (safeAction === "create") {
          // Important: return the created event with the final id.
          // This simulates a backend-generated id and keeps subsequent updates working.
          return createEvent(payload as Partial<SchedulerEvent>);
        }

        if (safeAction === "delete") {
          return deleteEvent(id);
        }

        console.warn(`Unknown data.save action: ${action}`);
        return;
      },
    }),
    [updateEvent, createEvent, deleteEvent]
  );

  const handleUndo = useCallback(() => undo(), [undo]);
  const handleRedo = useCallback(() => redo(), [redo]);

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
});

export default DemoMobxScheduler;
~~~

마지막으로 `src/App.tsx`를 업데이트하여 Scheduler 컴포넌트를 렌더링하도록 합니다:

~~~tsx title="src/App.tsx"
import { useEffect } from "react";
import Scheduler from "./components/Scheduler";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "DHTMLX React Scheduler - MobX Demo";
  }, []);

  return <Scheduler />;
}

export default App;
~~~

이제 프로젝트는 커스텀 도구 모음이 위에 있는 Scheduler를 렌더링해야 합니다.

## 애플리케이션 실행

이 단계에서는 데모를 실행하고 편집 및 히스토리 기능이 작동하는지 확인합니다.

수행할 작업:

- 개발 서버를 시작합니다(이미 실행 중이 아니면)
- 이벤트 생성/수정/드래그를 수행하고 `data.save`를 통해 저장소가 업데이트되는지 확인
- Undo/Redo를 사용하여 이벤트 변경을 되돌리거나 적용
- 읽기 전용 모드를 토글하여 Scheduler를 편집에서 잠그기

실행 방법:

~~~bash
npm run dev
~~~

다음과 같이 시도해 보세요:

- 캘린더에서 더블클릭 또는 내장 편집 UI를 사용해 이벤트를 생성
- 이벤트의 텍스트/시간을 수정
- 이벤트를 새로운 시간대로 드래그
- 도구 모음의 **Undo** / **Redo**를 사용
- Scheduler를 편집 불가로 잠그려면 **Read-only** 토글을 켜기

## 요약

이 튜토리얼에서 배운 점:

- Vite + React 프로젝트를 생성했습니다
- React Scheduler를 추가하고 MobX 저장소에 연결했습니다
- `past`/`future` 히스토리 배열을 이용한 스냅샷 기반 Undo/Redo를 구현했습니다
- 이벤트, 뷰/날짜, 그리고 설정을 관찰 가능한 MobX 상태에서 제어했습니다
- Scheduler 변경이 저장소 액션으로 전환되도록 `data.save` 콜백을 사용했습니다
- 읽기 전용 구성 토글로 Scheduler를 편집에서 잠글 수 있습니다

이 구조는 Scheduler 컴포넌트를 완전히 선언적 상태로 유지하면서 모든 변이 로직과 히스토리 관리는 MobX 상태 내부에 캡슐화됩니다.

## 다음 단계

더 깊이 살펴보고 싶다면:

- [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md) 문서를 다시 확인해 데이터 바인딩의 개념과 이 튜토리얼이 기반으로 하는 `data.save` 흐름을 이해하기
- [React Scheduler 개요](integrations/react/overview.md)에서 Scheduler의 구성 및 템플레이팅 옵션을 탐색하기
- 다른 상태 관리 도구에서도 같은 패턴을 살펴보기:
  - [Redux Toolkit과 함께하는 React Scheduler](integrations/react/state/redux-toolkit.md)
  - [Zustand와 함께하는 React Scheduler](integrations/react/state/zustand.md)
  - [XState와 함께하는 React Scheduler](integrations/react/state/xstate.md)
  - [Jotai와 함께하는 React Scheduler](integrations/react/state/jotai.md)
  - [Valtio와 함께하는 React Scheduler](integrations/react/state/valtio.md)