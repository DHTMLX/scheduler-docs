---
title: Next.js와 함께하는 React Scheduler
sidebar_label: Next.js
description: App Router를 사용하여 Next.js에 DHTMLX React Scheduler를 통합하는 방법을 배우고, 클라이언트 컴포넌트 설정 및 데모 데이터를 포함합니다.
---

# Next.js와 함께하는 React Scheduler

이 튜토리얼은 간단한 **Next.js** 애플리케이션을 만들고 페이지에 **DHTMLX React Scheduler**를 렌더링하는 방법을 보여줍니다.

:::note
전체 소스 코드는 [GitHub에서 확인 가능](https://github.com/dhtmlx/react-scheduler-nextjs-starter)합니다.
:::

## 준비물

- Node.js (권장 버전 LTS)
- React + TypeScript 기본 지식
- Next.js 기본 지식(앱 라우터, 서버/클라이언트 컴포넌트). 복습이 필요하면 Next.js 문서를 참고하세요: https://nextjs.org/docs

## 빠른 설정 - 프로젝트 생성하기

다음 명령으로 Next.js 애플리케이션의 골격을 구성합니다:

~~~bash
npx create-next-app@latest
~~~

프롬프트가 나타나면 다음을 선택합니다:

- 프로젝트 이름: **react-scheduler-nextjs-quick-start**
- 기본 템플릿 사용(TyepeScript, ESLint, Tailwind CSS, App Router, Turbopack)

Next.js가 프로젝트 구조를 생성하고 기본 의존성을 설치합니다.

설치가 끝나면 프로젝트 디렉토리로 이동합니다:

```bash
cd react-scheduler-nextjs-quick-start
```

### React Scheduler 설치

React Scheduler 설치는 [React Scheduler installation guide](integrations/react/installation.md)를 따라 진행합니다.

본 튜토리얼에서는 평가 패키지를 사용합니다:

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

또는

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Professional 패키지를 이미 사용 중인 경우 명령과 임포트에서 `@dhtmlx/trial-react-scheduler`를 `@dhx/react-scheduler`로 바꿉니다. 이름과 API를 그대로 유지합니다.

## 데모 데이터 준비하기

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
동반 데모에는 시각적 표현을 풍부하게 해 주는 추가 이벤트가 포함되어 있습니다.
:::

## Scheduler 컴포넌트 만들기

Next.js는 기본적으로 서버 컴포넌트를 사용하지만, 대부분의 실용적인 경우에는 React Scheduler를 클라이언트 컴포넌트 안에서 렌더링해야 합니다.

다음 상황에서 필요합니다:

- Scheduler 인스턴스에 접근하기 위해 `ref`를 사용할 때
- 콜백(이벤트, 템플릿, 데이터 핸들러)을 전달할 때
- React Scheduler `hooks`를 사용할 때
- 동적 구성이나 React 요소를 제공할 때

따라서 우리의 Scheduler 컴포넌트는 `"use client"`로 시작합니다.

`components/Scheduler/Scheduler.tsx` 파일을 새로 만듭니다:

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

이 컴포넌트는 Scheduler를 초기화하고 구성, 초기 데이터 및 향후 API 호출용 `ref`를 제공합니다. `config` 객체는 타임라인의 레이아웃을 제어하고, `events` prop은 Scheduler에 데이터 세트를 제공합니다. 또한 상위 컴포넌트가 Scheduler가 표시하는 내용을 제어할 수 있도록 `activeView` 및 `activeDate`를 prop로 전달합니다.

`data` prop 내부의 `save` 함수는 Scheduler 안의 이벤트에 대한 업데이트를 추적하는 데 사용됩니다. 이 튜토리얼에서는 변경 추적을 위한 간단한 자리 표시자 핸들러를 추가합니다. 백엔드로 업데이트를 전송하거나 React 상태에 바인딩하려면 공식 데이터 바인딩 가이드([bindingdata](integrations/react/overview.md#bindingdata))를 따라 하세요.

## 이벤트 색상 스타일 추가

CSS 클래스(`.blue`, `.violet`, `.green`, `.yellow`)는 이벤트의 시각적 표현을 커스터마이즈하기 위해 `event_class` 템플릿을 통해 적용됩니다. 다음 내용을 `app/globals.css`에 추가합니다:

~~~css title="app/globals.css"
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
Scheduler가 페이지 전체를 깔끔하게 차지하도록, `app/globals.css`에서 기본 다크 모드 테마 변수들을 제거하고 본문 여백이 없는지 확인합니다:

~~~css
body {
  margin: 0;
  padding: 0;
}
~~~
:::

## 페이지에 Scheduler 추가하기

`app/page.tsx`를 열고 메인 페이지에 Scheduler를 렌더링합니다:

~~~tsx title="app/page.tsx"
import Scheduler from '../components/Scheduler/Scheduler';
import { events } from '../data/demoData';

export default function HomePage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Scheduler events={events} />
    </div>
  );
}
~~~

이제 페이지가 전체 화면 Scheduler를 표시합니다.

## 애플리케이션 시작하기

개발 서버를 실행합니다:

~~~bash
npm run dev
~~~

그런 다음 브라우저에서 http://localhost:3000 를 열어보면 Next.js 애플리케이션 안에서 초기 데이터와 함께 작동하는 Scheduler를 볼 수 있습니다.

## 요약

다음과 같은 최소한의 Next.js 프로젝트와 DHTMLX React Scheduler를 구성했습니다:

- Scheduler가 Next.js App Router 내부의 Client Component(`"use client"`)로 렌더링됩니다
- 데모 데이터가 별도 파일에서 로드되어 props로 전달됩니다
- `event_class` 템플릿이 이벤트에 커스텀 색상 그라데이션을 적용합니다
- `data.save` 콜백이 콘솔에 편집 내용을 로깅합니다(백엔드와 연결하기 쉽게 준비되어 있습니다)

## 다음 단계

- [React 기반 데이터 흐름](integrations/react/overview.md#bindingdata)
- [React Scheduler 템플릿 문서](integrations/react/configuration-props.md)
- 상태 관리와의 통합 탐색:
  - [Redux Toolkit와 함께 React Scheduler 사용](integrations/react/state/redux-toolkit.md)
  - [MobX와 함께 React Scheduler 사용](integrations/react/state/mobx.md)
  - [Zustand와 함께 React Scheduler 사용](integrations/react/state/zustand.md)