---
title: "타입스크립트와 함께 Scheduler 사용하기"
sidebar_label: "타입스크립트와 함께 Scheduler 사용하기"
---

# 타입스크립트와 함께 Scheduler 사용하기

dhtmlxScheduler 라이브러리는 타입스크립트와 통합하여 사용할 수 있습니다. 모든 타입스크립트 타입 정의는 **dhtmlxscheduler.d.ts** 파일에서 확인할 수 있습니다.

타입스크립트와 함께 Scheduler를 사용하면 최신 IDE에서 유용한 코드 자동 완성 기능을 제공받을 수 있습니다. 또한 사용 중인 타입을 지속적으로 검사하여 코드의 안정성을 높일 수 있습니다.

## 글로벌 변수 선언하기

*dhtmlxscheduler.js* 라이브러리는 사용할 수 있는 두 개의 글로벌 변수를 정의합니다: *window.scheduler*와 *window.Scheduler*입니다.

- *scheduler* 변수는 기본 Scheduler 인스턴스를 저장합니다.
- *Scheduler*는 상업용(2021년 10월 6일 이후), 엔터프라이즈, 얼티밋 에디션에서만 사용할 수 있으며, 새로운 scheduler 인스턴스를 생성하는 팩토리 메서드를 제공합니다. 자세한 내용은 ["페이지에서 여러 개의 Scheduler 생성하기"](guides/multiple-per-page.md) 문서를 참고하세요.

*dhtmlxscheduler.js*는 표준 브라우저 JS 라이브러리이기 때문에 타입스크립트 모듈을 명시적으로 export하지 않습니다. 따라서 타입스크립트에서 "scheduler"(또는 "Scheduler")를 직접 선언해 주어야 컴파일러 오류를 방지할 수 있습니다. 이를 위한 방법은 두 가지가 있습니다:

- 두 변수 모두 *@types/dhtmlxscheduler*에 선언되어 있으며, import하면 바로 사용할 수 있습니다.
- 타입 정의 파일을 사용하지 않으려면, 코드 내에서 직접 변수를 선언할 수 있습니다:

~~~js
declare let scheduler: any;
~~~

이렇게 하면 컴파일 오류를 방지할 수 있으며, 런타임 시 코드가 글로벌 Scheduler 인스턴스를 올바르게 참조하여 정상적으로 동작합니다.
