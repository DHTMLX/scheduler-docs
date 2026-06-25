--- 
title: "React Scheduler"
sidebar_label: React Scheduler
description: "공식 래퍼를 사용하여 React에서 DHTMLX Scheduler를 설치, 구성 및 사용하는 방법."
image: /img/frameworks/react.png
---

React Scheduler는 DHTMLX Scheduler의 공식 React 래퍼입니다. 전체 구성 API를 계속 지원하는 한편 Scheduler 차트를 React 컴포넌트로 사용할 수 있습니다.

전체 설명이 필요하다면 [개요](integrations/react/overview.md)에서 시작하십시오.

## 시작하기

래퍼를 처음 사용하는 경우, 아래 순서를 따르십시오:

1. [설치](integrations/react/installation.md) - React Scheduler의 평가판(public npm) 또는 Professional(private npm) 버전을 선택하세요.
2. [빠른 시작](integrations/react/quick-start.md) - 첫 차트를 렌더링하고 설정을 확인합니다.
3. [구성](integrations/react/configuration-props.md) - 프롭스, 템플릿 및 이벤트 핸들러를 다루는 방법을 알아봅니다.

## 프레임워크 통합

앱이 메타 프레임워크로 구축된 경우, 프레임워크에 맞는 설정을 위한 아래 가이드를 사용하십시오:

- [Next.js](integrations/react/nextjs.md) - 클라이언트 컴포넌트 설정 및 일반적인 SSR 제약
- [Remix](integrations/react/remix.md) - 라우트 기반 설정 및 통합 노트

## 데이터 바인딩 모델 선택

React Scheduler는 두 가지 데이터 바인딩 방식을 지원합니다:

- **React가 관리하는 데이터**(대부분의 React 앱에 권장).
  이벤트를 React나 상태 관리 도구에 보관하고, 이를 프롭스로 전달하며, 업데이트를 `data.save`/`data.batchSave` 콜백을 통해 처리합니다.

- **Scheduler가 관리하는 데이터**(전문화된 경우 또는 성능에 민감한 경우에 유용).
  데이터를 한 번 초기화하고 Scheduler(및 백엔드)가 데이터 수명 주기를 소유하도록 합니다. React는 각 변경 후 업데이트된 props를 다시 적용하지 않습니다.

두 가지 접근 방식과 그 트레이드오프를 이해하려면 [데이터 바인딩 및 상태 관리 기초](integrations/react/state/state-management-basics.md)를 읽어보십시오.

## 데이터 및 상태 튜토리얼

상태 관리 라이브러리를 사용하는 경우, [데이터 및 상태 관리](/integrations/react/state/)의 가이드는 각 라이브러리(Redux Toolkit, Zustand, MobX 등)에 대해 동일한 통합 패턴을 구현하고 있으며 Firebase와의 실시간 동기화도 제공합니다.

## 예제 및 평가 리소스

React Scheduler를 평가 중인 경우, 평가 페이지에서 평가 기간 동안 기술 지원에 접근할 수 있습니다. [설치](integrations/react/installation.md)를 참조하십시오.