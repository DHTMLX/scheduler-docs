---
title: React Scheduler 빠른 시작
sidebar_label: 빠른 시작
description: 'React Scheduler 컴포넌트 사용에 대한 단계별 가이드'
---

# React Scheduler 빠른 시작

:::note
본 튜토리얼은 DHTMLX Scheduler의 Commercial, Enterprise, Ultimate 에디션에 포함된 React 래퍼를 다룹니다.
만약 **Individual** 또는 **GPL** 에디션을 사용 중이라면 대체 가이드를 따라가세요:
[React로 시작하기](integrations/react/js-scheduler-react.md).
:::

**React Scheduler** 컴포넌트는 **DHTMLX Scheduler**의 공식 래퍼입니다.
이 가이드는trial 패키지를 사용하여 간단한 React 애플리케이션을 만들고 기본 Scheduler를 렌더링하는 과정을 안내합니다.

React가 처음이라면 공식 [React 문서](https://react.dev/learn)부터 시작하세요. 이 튜토리얼을 따라 작동하는 완전한 프로젝트를 GitHub에서 확인하려면 [GitHub의 전체 작동 예제](https://github.com/dhtmlx/react-scheduler-quick-start)를 확인하세요.

## 버전 요구사항

- React **18 이상**

## 새로운 React 프로젝트 생성

React 프로젝트를 생성하고 프로젝트 디렉터리로 이동하려면 아래 명령어를 실행합니다:

~~~bash
npm create vite@latest react-scheduler-quick-start -- --template react-ts
cd react-scheduler-quick-start
~~~

### React Scheduler 설치

React Scheduler 설치는 [React Scheduler 설치 가이드](integrations/react/installation.md)에 따라 진행합니다.

이 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Professional 패키지를 이미 사용 중인 경우, 명령어와 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 바꾸어 사용합니다.

## Demo 데이터 추가

이 예제에는 정적 데이터를 사용합니다. `src/demoData.ts` 파일을 생성합니다:

~~~ts
import type { Event } from '@dhtmlx/trial-react-scheduler';

export const events: Event[] = [
  {
    id: 1,
    classname: 'blue',
    start_date: new Date('2025-12-08T02:00:00Z'),
    end_date: new Date('2025-12-08T10:20:00Z'),
    text: 'Product Strategy Hike',
  },
  {
    id: 2,
    classname: 'blue',
    start_date: new Date('2025-12-08T12:00:00Z'),
    end_date: new Date('2025-12-08T16:00:00Z'),
    text: 'Agile Meditation and Release',
  },
  {
    id: 3,
    classname: 'violet',
    start_date: new Date('2025-12-09T06:00:00Z'),
    end_date: new Date('2025-12-09T11:00:00Z'),
    text: 'Tranquil Tea Time',
  },
  // ....
];
~~~

## Scheduler 컴포넌트 추가

Scheduler 컴포넌트를 추가하려면 `src/components/Scheduler/Scheduler.tsx` 파일을 아래 내용으로 생성합니다:

~~~tsx
import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';
import './styles.css';

export interface ReactSchedulerProps {
  events: Event[];
  activeView?: string;
  activeDate?: Date;
}

export default function Scheduler({
  events,
  activeView = 'week',
  activeDate = new Date('2025-12-08T00:00:00Z'),
}: ReactSchedulerProps) {
  const schedulerRef = useRef<ReactSchedulerRef>(null);

  const templates: SchedulerTemplates = useMemo(
    () => ({
      event_class: (start: Date, end: Date, event: Event) => {
        return event.classname || '';
      },
    }),
    []
  );

  const config: SchedulerConfig = useMemo(() => {
    return {
      first_hour: 6,
      last_hour: 22,
      hour_size_px: 60,
    };
  }, []);

  return (
    <ReactScheduler
      ref={schedulerRef}
      events={events}
      view={activeView}
      date={activeDate}
      templates={templates}
      config={config}
      data={{
        save: (entity: string, action: string, data: Event, id: string | number) => {
          console.log(`${entity} - ${action} - ${id}`, data);
        },
      }}
    />
  );
}
~~~

마지막으로, CSS 클래스(`.violet`, `.green`, `.yellow`)는 이벤트의 시각적 외관을 커스터마이즈하기 위해 `event_class` 템플릿을 통해 적용됩니다:

~~~css
.violet {
  --dhx-scheduler-event-background: linear-gradient(180deg, #d071ef 0%, #ee71d5 100%);
}
.green {
  --dhx-scheduler-event-background: linear-gradient(180deg, #12d979 0%, #1ecdeb 100%);
}
.yellow {
  --dhx-scheduler-event-background: linear-gradient(180deg, #ffb725 0%, #ffbb25 31.25%, #faea27 100%);
}
~~~


## 앱에서 Scheduler 렌더링

App에 Scheduler를 표시하려면 `src/App.tsx`의 코드를 아래 코드로 교체합니다:

~~~tsx
import './App.css';
import Scheduler from './components/Scheduler/Scheduler';
import { events } from './demoData';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scheduler events={events} />
    </div>
  );
}

export default App;
~~~

그런 다음 아래 명령어로 앱을 실행합니다:

~~~bash
npm run dev
~~~

이 시점에서 **완전히 작동하는 React + DHTMLX Scheduler 애플리케이션**을 얻을 수 있습니다.

이 설정은 다음을 수행하는 데 필요한 최소 구성(minimum configuration)을 나타냅니다:

- Scheduler를 렌더링
- 이벤트를 표시
- 기본 스케일 구성을 적용
- React ref를 통해 Scheduler 인스턴스 연결
- `data.save` 콜백을 통해 이벤트 수신

GitHub 데모 프로젝트에 동일한 최소 예제가 있습니다: [GitHub 데모 프로젝트](https://github.com/dhtmlx/react-scheduler-quick-start).

다음 단계

- 사용 가능한 모든 [React Scheduler props](integrations/react/configuration-props.md)을 공부하기
- [Guides](/guides/)에서 고급 Scheduler 기능 탐색하기