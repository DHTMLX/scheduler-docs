---
sidebar_label: DHTMLX Scheduler 개요
title: DHTMLX Scheduler 개요
slug: /
description: "DHTMLX Scheduler 자바스크립트 컴포넌트의 개요입니다. 빠른 시작 가이드를 통해 시작하고, 자세한 가이드와 API 참조를 살펴보며, 라이브 데모를 체험해 보세요."
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';

**DHTMLX Scheduler**는 TypeScript 정의를 포함한高度한 구성 가능한 JavaScript 이벤트 캘린더 컴포넌트입니다. 브라우저에서 일정 표시, 편집 및 관리를 직접 수행하도록 설계되었습니다. 이 컴포넌트는 React, Angular, Vue 및 기타 프런트엔드 프레임워크와의 통합을 지원합니다. DHTMLX Scheduler는 또한 DHTMLX MCP Server, Agent Skills를 통한 AI 보조 개발과 구조화된 API를 지원합니다.

다음과 같은 프로젝트 관리, CRM, 예약 시스템, 헬스케어, 교육, 현장 서비스, SaaS 및 상호 작용 캘린더, 이벤트 플래너 또는 자원 스케줄링 타임라인이 필요한 비즈니스 애플리케이션에서 사용할 수 있습니다.

## 프레임워크별 빠른 시작

DHTMLX Scheduler를 바닐라 JavaScript 위젯으로 사용하거나 현대 프레임워크에 통합할 수 있습니다. 스택에 맞는 단계별 가이드로 시작해 보세요:

<div className="framework-grid">

  <a className="framework-card" href="guides/initialization/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">자바스크립트</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">리액트</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">앵귤러</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">뷰</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">스벨트</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">세일즈포스</div>
  </a>

</div>

React, Angular 및 Vue는 두 가지 통합 방식으로 지원됩니다:

- Ready-made [React Scheduler](integrations/react/quick-start.md), [Angular Scheduler](integrations/angular/quick-start.md), 및 [Vue Scheduler](integrations/vue/quick-start.md) 래퍼( PRO 및 평가 프로젝트에 권장 )
- [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md), [Vue](integrations/vue/js-scheduler-vue.md)와의 핵심 JavaScript Scheduler 컴포넌트의 직접 통합(Standard 에디션)

## 라이브 데모

실행 중인 DHTMLX Scheduler를 확인하려면 가장 인기 있는 데모 중 일부를 살펴보세요:

- [기본 초기화(주간 뷰)](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27)
- [반복 이벤트](https://docs.dhtmlx.com/scheduler/samples/?sample=%2703_extensions/01_recurring_events.html%27&filter=%27%27) 및 [타임라인 뷰 성능](https://docs.dhtmlx.com/scheduler/samples/?sample=%2706_timeline/16_lines_performance.html%27&filter=%27%27) 예제
- [템플릿 예제](https://docs.dhtmlx.com/scheduler/samples/index.html?sample=%2702_customization/06_templates.html%27&filter=%27%27)

![scheduler_overview](/img/scheduler_overview.png)

전체 Scheduler 기능 범위를 확인하려면 [All Samples](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27)을 보세요.

프레임워크 지향 시작 포인트의 경우, [React](integrations/react/js-scheduler-react.md), [Angular](integrations/angular/js-scheduler-angular.md), 및 [Vue](integrations/vue/js-scheduler-vue.md)의 예제 저장소를 참조하십시오.

:::note
일部 샘플은 PRO 기능을 보여주므로 Standard 에디션 프로젝트에 재사용하기 전에 [Standard vs PRO 비교](guides/editions-comparison.md)를 확인하십시오.
:::

## 개발자 리소스

- [설치 가이드](guides/installation.md) Standard, 체험판 및 PRO 설정 흐름
- [표준 vs PRO 비교](guides/editions-comparison.md) 에디션 간 기능 차이
- Standard 에디션 하의 JavaScript Scheduler의 공개 [npm 패키지](https://www.npmjs.com/package/dhtmlx-scheduler)
- [GitHub 저장소](https://github.com/DHTMLX/scheduler) Standard 에디션의 소스 코드 및 이슈 트래킹
- [API 참조](api/api_overview.md) 및 [샘플](https://docs.dhtmlx.com/scheduler/samples/?sample=%2701_initialization_loading/01_basic_init.html%27&filter=%27%27) 구현 세부 정보
- [What's New](whats-new.md) 릴리스 및 마이그레이션 노트

## Scheduler 기능 하이라이트

DHTMLX Scheduler에는 다중 달력 보기, 풍부한 이벤트 편집 및 자원 계획 도구가 포함되어 있습니다.

### 달력 뷰 및 내비게이션

기본적으로 Scheduler는 클래식 달력 뷰를 렌더링하고 사용자가 시간을 통해 이동할 수 있도록 합니다. 포함되는 기능은 다음과 같습니다:

- [Day](views/day.md), [Week](views/week.md), [Month](views/month.md), [Year](views/year.md) 및 [Agenda](views/agenda.md) 뷰로 어떤 규모의 일정도 시각화할 수 있습니다.
- [Configurable header](api/config/header.md) 및 내비게이션 옵션과 뷰 탭.

### 이벤트 생성 및 편집

이 컴포넌트는 "캘린더 우선(Calendar-first)" 편집을 제공하므로 사용자는 달력에서 바로 이벤트를 빠르게 생성하거나 업데이트할 수 있습니다:

- [Drag-create](api/config/drag_create.md), [drag-resize](api/config/drag_resize.md) 및 [drag-move](api/config/drag_move.md) 인터랙션으로 스케줄러 내의 이벤트를 드래그하여 생성, 크기 조정, 이동할 수 있습니다.
- 전체 이벤트 세부 정보를 위한 [Flexible lightbox editor](guides/configuring-the-lightbox.md)와 빠른 편집용 선택적 [Quick Info](guides/quick-info.md) 팝업.
- [Cross-scheduler drag-and-drop](guides/drag-between.md)로 서로 다른 스케줄러 간 이벤트 이동
- [Drag-and-drop integration with external sources](https://dhtmlx.com/blog/creating-task-backlog-drag-drop-support-dhtmlx-scheduler/)로 외부 소스에서 새로운 이벤트로 기록을 스케줄러로 끌어오기

- [Multi-user live updates](guides/multiuser-live-updates.md)로 협업 스케줄링 시나리오를 지원합니다.

### 반복 시퀀스 및 예외

반복 이벤트는 전용 확장 및 iCalendar 호환 RFC 5545 재발생 형식을 통해 지원됩니다:

- [Recurring events](guides/recurring-events.md) 발생별 예외 처리 가능
- [Validation](guides/validation.md) 및 [collision prevention](guides/collisions.md)으로 일정의 일관성 유지

### 자원 계획 뷰 (PRO)

단순 달력 이상이 필요한 팀을 위해 DHTMLX Scheduler의 PRO 에디션은 고급 계획 모드를 제공합니다:

- [Timeline](views/timeline.md) 및 [Units](views/units.md) 뷰로 자원 스케줄링
- [Week Agenda](views/weekagenda.md) 및 [Grid](views/grid.md) 뷰로 컴팩트한 목록 스타일의 계획
- [Multi-section events](guides/extensions-list.md#multisection)로 하나의 이벤트를 여러 자원에 배정

### 내보내기 및 생태계

팀은 종종 일정을 공유하거나 로컬 백업을 보관하거나 외부 달력과 동기화해야 합니다. DHTMLX Scheduler는 외부 도구 및 출력 형식을 지원하여 다음과 같이 통합합니다:

- [PDF](export/pdf.md), [PNG](export/png.md), [Excel and iCal](export/excel.md)로 내보내기
- [Google Calendar](integrations/google-calendar/google-calendar-sync.md)와의 양방향 동기화

### 커스터마이제이션 및 스타일링

달력의 외관은 전체 테마에서 단일 이벤트 상자에 이르기까지 모든 수준에서 조정할 수 있습니다:

- 내장 [스킨](guides/skins.md) 세트와 [깊은 커스터마이즈](guides/custom-skins.md) 및 새 테마 생성 지원
- [이벤트 콘텐츠, 헤더](guides/custom-events-content.md), [툴팁](guides/tooltips.md) 및 기타 UI 조각에 대한 템플릿
- [Localization](guides/localization.md) 지원(인터페이스 언어 및 날짜/시간 형식)과 [RTL 모드](guides/rtl-mode.md)

## 에디션 및 라이선스

DHTMLX Scheduler는 두 가지 에디션: **Standard** 및 **PRO**로 제공됩니다. 무료 Standard 에디션으로 시작하고 필요에 따라 나중에 PRO 에디션으로 업그레이드할 수 있으며, 더 많은 기능과 공식 지원, 완전한 Scheduler 기반을 이용할 수 있습니다. 또한 공식 체험을 통해 또는 유료 라이선스와 함께 PRO 에디션을 바로 시작할 수도 있습니다. 아래의 옵션 중 하나를 선택하여 DHTMLX Scheduler를 시작하세요:

- **Standard edition.** 공개 패키지 소스(npm, CDN)를 통해 배포되며 핵심 대화형 달력 기능을 포함합니다.
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml).** 전체 PRO 기능 세트를 평가하고 체험 기간 동안 기술 지원을 받을 수 있습니다.
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing).** 운영 환경에 맞춰 설계되었으며 고급 일정 기능, 공식 지원 및 상용 라이선스가 포함됩니다. 개인 npm 레지스트리에서 설치되거나 수동으로 추가됩니다.

에디션 간 기능 차이점을 정확히 확인하려면 [Standard vs PRO 비교](guides/editions-comparison.md)를 확인하세요. 각 옵션의 설치 흐름은 [설치 가이드](guides/installation.md)를 참조하십시오.

:::note
Standard 에디션은 GNU GPL v2 라이선스에 한해 제공됩니다. 비-GPL 프로젝트에서 DHTMLX Scheduler를 사용하거나 PRO 버전을 얻으려면 당사 사이트에서 Individual, Commercial, Enterprise, Ultimate 또는 Startup 라이선스를 구입하시거나 sales@dhtmlx.com으로 문의해 주세요.
:::

## AI 코딩 도구

AI 보조 개발을 위해, 코딩 도우미를 위해 특별히 작성된 DHTMLX Scheduler 가이드를 시작점으로 삼으세요:

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md)

## 백엔드 통합

DHTMLX Scheduler는 서버에서 RESTful API를 구현하여 어떤 백엔드와도 연결할 수 있습니다:

- 데이터는 일반적으로 [events](guides/loading-data.md) 및 해당 [recurrence rules](guides/recurring-events.md)를 JSON 형식으로 로드하고 저장합니다.
- 내장 [DataProcessor](guides/server-integration.md)가 생성, 업데이트 및 삭제 작업을 서버로 라우팅하는 데 도움을 줍니다.
- CRUD 작업 및 Scheduler를 데이터베이스와 동기화하는 모범 사례를 다루는 인기 있는 백엔드 플랫폼 및 프레임워크에 대한 튜토리얼이 있습니다([Node.js](integrations/node/howtostart-nodejs.md), [ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md), [Laravel](integrations/php/howtostart-php-laravel.md), [Ruby on Rails](integrations/other/howtostart-ruby.md) 등).

## What's next

시작이 막 되었다면 다음과 같이 진행하세요:

1. 선호하는 프런트엔드 프레임워크나 일반 자바스크립트를 위한 [시작 가이드](integrations/howtostart-guides.md)를 참조하세요.
2. [헤더](api/config/header.md), [뷰](views.md), [템플릿](guides/templates.md) 및 편집 동작을 [Lightbox](guides/configuring-the-lightbox.md)를 통해 구성하세요.
3. 필요한 확장을 활성화하세요. 예: [Recurring events](guides/recurring-events.md), PRO의 [Timeline/Units](views/timeline.md), [Quick Info](guides/quick-info.md), [Tooltips](guides/tooltips.md).
4. 백엔드에 연결하고 [Server-Side Integration](guides/server-integration.md) 및 이벤트용 애플리케이션 엔드포인트를 설정하세요.
5. [Guides](guides.md) 및 [API reference](api/api_overview.md)를 탐색하여 템플릿, 이벤트 및 확장 기능과 같은 더 깊은 맞춤화를 찾으세요.

이미 DHTMLX Scheduler를 사용 중이고 이전 버전에서 업그레이드 중이라면, 릴리스 노트와 최신 기능 요약 및 마이그레이션 가이드에 대한 내용을 확인하려면 [What's New](whats-new.md)를 보세요.