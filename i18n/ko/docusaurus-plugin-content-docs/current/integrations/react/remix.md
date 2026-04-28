---
title: Remix와 함께하는 React Scheduler
sidebar_label: Remix
description: Remix (React Router v7)와 함께 DHTMLX React Scheduler를 통합하는 방법, 클라이언트 컴포넌트 설정 및 데모 데이터 포함.
---

# Remix와 함께하는 React Scheduler

이 튜토리얼은 간단한 **Remix** 애플리케이션을 생성하고 페이지에 **DHTMLX React Scheduler**를 렌더링하는 방법을 보여줍니다.

:::note
전체 소스 코드는 [GitHub에서 확인할 수 있습니다](https://github.com/dhtmlx/react-scheduler-remix-starter).
:::

## 사전 요구사항

- Node.js (LTS 권장)
- React + TypeScript 기초
- Remix / React Router 기본 지식. 필요하면 Remix 문서를 참조하세요: https://remix.run/docs

## 빠른 설정 - 프로젝트 생성

Remix가 이제 **React Router v7**의 일부로 제공되므로, 프로젝트를 구성하는 권장 방법은 다음과 같습니다:

~~~bash
npx create-react-router@latest
~~~

프롬프트가 표시되면 다음을 선택하세요:

- 프로젝트 이름: **react-scheduler-remix-quick-start**
- 기본 템플릿 사용(React, TypeScript, TailwindCSS, SSR)
- **설치 의존성**: 예

설치가 끝나면 프로젝트 디렉터리로 이동합니다:

```bash
cd react-scheduler-remix-quick-start
```

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

Professional 패키지를 이미 사용 중이라면 명령과 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 바꾸세요.

## 데모 데이터 준비

프로젝트 루트에 `data/` 폴더를 생성합니다. 그 안에 Scheduler의 초기 데이터를 담은 `demoData.ts` 파일을 추가합니다:

~~~ts title="data/demoData.ts"
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
  {
    id: 4,
    classname: 'green',
    start_date: new Date('2025-12-09T11:30:00Z'),
    end_date: new Date('2025-12-09T19:00:00Z'),
    text: 'Sprint Review and Retreat',
  },
  {
    id: 5,
    classname: 'yellow',
    start_date: new Date('2025-12-10T06:00:00Z'),
    end_date: new Date('2025-12-10T08:00:00Z'),
    text: 'Stakeholder Sunset Yoga Session',
  },
];
~~~

:::note
동반 데모에는 더 풍성한 시각 효과를 위한 추가 이벤트가 포함되어 있습니다.
:::

## Scheduler 컴포넌트 생성

Remix는 표준 React 아키텍처를 통해 클라이언트 측 컴포넌트를 사용할 수 있습니다. 실무에서는 대부분의 경우 Client Component 안에 React Scheduler를 렌더링해야 합니다.

다음과 같은 경우에 필요합니다:

- Scheduler 인스턴스에 접근하기 위해 `ref`를 사용할 때
- 콜백(이벤트, 템플릿, 데이터 핸들러)을 전달할 때
- ReactScheduler의 `hooks`를 사용할 때
- 동적 구성이나 React 요소를 제공할 때

따라서 우리의 Scheduler 컴포넌트는 `"use client"`로 시작합니다.

프로젝트 내 새 파일을 `components/Scheduler/Scheduler.tsx` 경로에 생성합니다:

~~~tsx title="components/Scheduler/Scheduler.tsx"
'use client';

import { useMemo, useRef } from 'react';
import ReactScheduler, {
  type ReactSchedulerRef,
  type Event,
  type SchedulerTemplates,
  type SchedulerConfig,
} from '@dhtmlx/trial-react-scheduler';
import '@dhtmlx/trial-react-scheduler/dist/react-scheduler.css';

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

이 컴포넌트는 Scheduler를 초기화하고 구성, 초기 데이터를 제공하며 향후 API 호출을 위한 `ref`를 제공합니다. `config` 객체는 타임라인의 레이아웃을 제어하고, `events` props는 Scheduler에 데이터 세트를 제공합니다. 또한 부모 컴포넌트가 Scheduler가 표시할 내용을 제어할 수 있도록 `activeView`와 `activeDate`를 props로 전달합니다.

`data` prop 안의 `save` 함수는 Scheduler 내부에서 이벤트에 대한 업데이트를 추적하는 데 사용됩니다. 이 튜토리얼에서는 변경 추적용 간단한 플레이스홀더 핸들러를 추가합니다. 백엔드로 업데이트를 전송하거나 React 상태에 바인딩하려면 공식 데이터 바인딩 가이드에 따라 구현할 수 있습니다: [가이드](integrations/react/overview.md#bindingdata).

## 이벤트 색상 스타일 추가

CSS 클래스(`.blue`, `.violet`, `.green`, `.yellow`)는 이벤트의 시각적 모양을 커스터마이즈하기 위해 `event_class` 템플릿을 통해 적용됩니다. 아래 내용을 `app/app.css`에 추가하세요:

~~~css title="app/app.css"
.blue {
  --dhx-scheduler-event-background: linear-gradient(180deg, #0e8af0 0%, #0ec1f0 100%);
}
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

:::note
Scheduler가 페이지 전체를 깔끔하게 차지하도록 바디 여백을 제거하세요:
~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## 루트 경로에서 Scheduler 렌더링

메인 페이지 경로 — `app/routes/home.tsx`를 열고 내용을 아래로 바꿉니다:

~~~tsx title="app/routes/home.tsx"
import { events } from '../../data/demoData';
import type { Route } from './+types/home';
import Scheduler from 'components/Scheduler/Scheduler';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'DHTMLX React Scheduler | Remix (React Router) Quick Start' },
    { name: 'description', content: 'DHTMLX React Scheduler | Remix (React Router) Quick Start' },
  ];
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scheduler events={events} />
    </div>
  );
}
~~~

이제 Scheduler가 `/` 경로에 표시됩니다.

## 애플리케이션 시작

개발 서버를 시작합니다:

~~~bash
npm run dev
~~~

그런 다음 브라우저에서 http://localhost:5173 를 열어보세요. Remix 애플리케이션 안에서 초기 데이터와 함께 작동하는 Scheduler가 표시되는 것을 확인할 수 있습니다.

## 요약

다음과 같은 최소한의 Remix 프로젝트가 준비되어 있습니다. DHTMLX React Scheduler:

- Scheduler는 Remix / React Router v7 내부의 Client Component(`"use client"`)로 렌더링됩니다
- 데모 데이터는 별도 파일에서 로드되어 prop으로 전달됩니다
- `event_class` 템플릿은 이벤트에 커스텀 컬러 그라데이션을 적용합니다
- `data.save` 콜백은 콘솔에 수정 내역을 로그합니다(백엔드에 연결하거나 React 상태에 바인딩할 준비가 되어 있음)

## 다음 단계

- [React-driven data flow](integrations/react/overview.md#bindingdata)
- [React Scheduler Templates Documentation](integrations/react/configuration-props.md)
- 상태 관리 통합 탐색:
  - [Using React Scheduler with Redux Toolkit](integrations/react/state/redux-toolkit.md)
  - [Using React Scheduler with MobX](integrations/react/state/mobx.md)
  - [Using React Scheduler with Zustand](integrations/react/state/zustand.md)