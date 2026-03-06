---
sidebar_label: DHTMLX Scheduler 개요
title: DHTMLX Scheduler 개요
slug: /
description: "DHTMLX Scheduler JavaScript 컴포넌트 개요입니다. 프레임워크별 빠른 시작 가이드부터 상세 가이드와 API 레퍼런스, 라이브 데모까지 한 번에 확인할 수 있습니다."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Scheduler**는 브라우저에서 일정을 표시하고 편집할 수 있는 JavaScript 이벤트 캘린더 컴포넌트입니다.
기본 캘린더 뷰([Day](views/day.md)/[Week](views/week.md)/[Month](views/month.md)/[Year](views/year.md)), 풍부한 이벤트 편집(드래그 생성/리사이즈/이동 + Lightbox), [반복 일정](guides/recurring-events.md), 고급 리소스 계획 뷰([Timeline](views/timeline.md)/[Units](views/units.md), PRO)를 지원합니다.

DHTMLX Scheduler는 Standard와 PRO 에디션으로 제공됩니다. Standard 에디션은 공개 패키지 저장소로 배포되며, PRO/Evaluation은 비공개 npm 레지스트리에서 설치하거나 수동으로 추가할 수 있습니다.


## 프레임워크별 빠른 시작

DHTMLX Scheduler는 바닐라 JavaScript 위젯으로 사용할 수도 있고, 최신 프레임워크에 통합할 수도 있습니다. 사용 중인 스택에 맞는 단계별 "How to start" 가이드를 선택하세요.

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
    <div className="framework-desc">
      script 태그 또는 번들러로 최소 구성으로 시작합니다.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      props와 이벤트를 지원하는 <code>ReactScheduler</code> 컴포넌트를 바로 사용할 수 있습니다.
    </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
    <div className="framework-desc">
      경량 래퍼를 사용해 Angular 프로젝트에 Scheduler를 통합합니다.
    </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
    <div className="framework-desc">
      작은 래퍼와 반응형 설정으로 Vue 앱에서 Scheduler를 사용합니다.
    </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
    <div className="framework-desc">
      설정과 이벤트를 바인딩하는 간단한 컴포넌트로 Svelte에 Scheduler를 임베드합니다.
    </div>
  </a>

  <a className="framework-card" href="integrations/react/js-scheduler-react/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
    <div className="framework-desc">
      자체 컴포넌트에 Scheduler 코어 위젯을 임베드해 생명주기와 데이터 흐름을 완전히 제어합니다.
    </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
    <div className="framework-desc">
      Salesforce Lightning Web Components에서 Scheduler를 사용하고 org 데이터와 연결합니다.
    </div>
  </a>

</div>


## 라이브 데모

DHTMLX Scheduler 동작을 바로 확인하려면 온라인 데모를 살펴보세요.

- [기본 초기화(Week 뷰)](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html).
- [반복 일정](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html).
- [Timeline 뷰 성능(가로 스크롤)](https://docs.dhtmlx.com/scheduler/samples/06_timeline/16_lines_performance.html).
- [템플릿 예제](https://docs.dhtmlx.com/scheduler/samples/index.html?filter=%27%27&sample=%2702_customization%2F06_templates.html%27).
- [전체 샘플 보기](https://docs.dhtmlx.com/scheduler/samples/).


## 핵심 기능

DHTMLX Scheduler는 인터랙티브한 캘린더 UX와 확장성에 초점을 둡니다. 아래 섹션에서는 주요 영역을 요약하고 더 자세한 문서로 연결합니다.

### 캘린더 뷰 및 내비게이션

Scheduler는 시간과 이벤트를 다양한 방식으로 시각화할 수 있습니다.

- 내장 캘린더 뷰([Day](views/day.md)/[Week](views/week.md)/[Month](views/month.md)/[Year](views/year.md)/[Agenda](views/agenda.md) 변형). 전체 개요는 [Views](views.md)에서 확인할 수 있습니다.
- [scheduler.config.header](api/config/header.md)를 통한 내비게이션/헤더 설정과 반응형 초기화.

### 이벤트 생성 및 편집

Scheduler는 "캘린더 중심" 편집 흐름을 제공합니다.

- 드래그로 이벤트 생성, 리사이즈, 이동(설정 가능).
- 내장 편집기([Lightbox](guides/configuring-the-lightbox.md))와 확장으로 제공되는 [Quick Info](guides/quick-info.md) 팝업.
- [이벤트 텍스트](guides/custom-events-content.md), [툴팁](guides/tooltips.md), 헤더, UI 조각을 위한 템플릿(렌더링 완전 제어).

### 반복 시리즈 및 예외

반복 이벤트는 전용 확장과 최신 반복 포맷으로 지원됩니다. [Recurring Events](guides/recurring-events.md)를 참고하세요.

### 리소스 계획 뷰(PRO)

PRO에서는 리소스 스케줄링에 자주 사용하는 고급 계획 모드를 제공합니다.

- [Timeline](views/timeline.md) 뷰, [Units](views/units.md) 뷰, [Week Agenda](views/weekagenda.md), [Grid](views/grid.md) 뷰 및 기타 PRO 전용 확장.
- [Multisection](guides/extensions-list.md#multisection) 확장으로 하나의 이벤트를 여러 리소스/섹션에 배정.

### 데이터 로딩, 포맷, 동기화

Scheduler는 여러 방식으로 데이터 계층과 연결할 수 있습니다.

- 백엔드에서 데이터를 로드하고 동기화 유지(일반적으로 [REST 스타일 API + DataProcessor](guides/server-integration.md) 패턴 사용).
- 여러 스택(Node, ASP.NET Core, PHP/Laravel, Ruby 등)에 대한 서버 측 [How to start](integrations/howtostart-guides.md) 가이드 제공.


## 프레임워크 및 백엔드 통합

### 프런트엔드 통합

Scheduler는 다음과 같이 사용할 수 있습니다.

- 어떤 페이지에서든 독립 JS 위젯으로 사용 - [순수 HTML/JS 초기화](guides/initialization.md).
- [React](integrations/react/)/[Angular](integrations/angular/howtostart-angular.md)/[Vue](integrations/vue/howtostart-vue.md)/[Svelte](integrations/svelte/howtostart-svelte.md)를 위한 [How to start](integrations/howtostart-guides.md) 가이드 기반 래퍼 컴포넌트 사용.


## 설치 참고

- Standard 에디션:
  - <code>npm install dhtmlx-scheduler</code>
  - 또는 CDN에서 포함.
- PRO/Evaluation:
  - 비공개 npm 레지스트리에서 설치하거나 로컬 폴더/수동으로 패키지 추가. 자세한 내용은 [설치 가이드](guides/installation.md)를 참고하세요.


## 다음 단계

처음 시작한다면:

1. 프레임워크별 빠른 시작 가이드 중 하나를 선택하거나 [순수 HTML/JS 초기화](guides/initialization.md)부터 시작하세요.
2. UI를 구성하세요: [header](api/config/header.md), [views](/views/), [templates](guides/templates.md), 편집 규칙.
3. 필요한 [확장](guides/extensions-list.md)을 활성화하세요 - [Recurring](guides/recurring-events.md), PRO의 [Timeline](views/timeline.md)/[Units](views/units.md), [Quick Info](guides/quick-info.md), [Tooltip](guides/tooltips.md) 등.
4. [Server-Side Integration](guides/server-integration.md) 가이드를 따라 백엔드와 연결하세요.
5. 더 깊은 커스터마이징을 위해 [Guides](guides/)와 [API reference](api/api_overview.md)를 확인하세요.

업그레이드 중이라면 문서의 [What's new](whats-new.md)와 [migration guides](migration.md)를 확인하세요.
