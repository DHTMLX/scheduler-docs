---
title: "접근성"
sidebar_label: "접근성"
---

# 접근성

[접근성](https://www.w3.org/WAI/fundamentals/accessibility-intro/)은 현대 웹 애플리케이션에서 중요한 역할을 합니다. 
애플리케이션이나 웹사이트를 더 쉽게 사용하고 상호작용할 수 있도록 다양한 기술이 개발되어 있습니다.

장애가 있는 사용자의 DHTMLXScheduler 접근성과 사용성을 향상시키기 위해, 이 컴포넌트는 다음과 같은 접근성 기능을 포함하고 있습니다:

- WAI-ARIA 속성
- 키보드 내비게이션
- 고대비 테마

## WAI-ARIA 속성 {#wai-aria-attributes}

DHTMLXScheduler는 컴포넌트의 마크업에 특수 속성을 추가하여 WAI-ARIA를 지원합니다. 
이러한 속성은 스크린 리더가 컴포넌트를 더 효과적으로 인식하고 해석하는 데 도움을 줍니다.

자세한 내용은 [공식 WAI-ARIA 명세](https://www.w3.org/WAI/standards-guidelines/aria/)에서 확인할 수 있습니다.

기본적으로, Scheduler에서는 WAI-ARIA 속성이 활성화되어 있습니다. 필요에 따라 *wai_aria_attributes* 속성을 *false*로 설정하여 비활성화할 수 있습니다:

~~~js
scheduler.config.wai_aria_attributes = false;
~~~

또한, 메인 스케줄러 컨테이너와 minicalendar 요소에 [*role="application"* 속성](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#Enter_WAI-ARIA)의 사용 여부를 설정할 수 있습니다. 이 설정은 [wai_aria_application_role](api/config/wai_aria_application_role.md) 속성을 통해 제어되며 기본값은 *true*입니다.

~~~js
scheduler.config.wai_aria_application_role = false;
~~~

## 키보드 내비게이션

이 방법을 통해 사용자는 마우스 포인터 대신 키보드 키와 키 조합만으로 모든 애플리케이션 기능에 접근할 수 있습니다.

자세한 정보는 ["키보드 내비게이션"](guides/keyboard-navigation.md) 문서에서 확인할 수 있습니다.

## 고대비 테마 {#high-contrast-themes}

DHTMLXScheduler는 인터페이스를 더 뚜렷하고 쉽게 볼 수 있도록 고대비 색상의 테마를 제공합니다. 
이러한 테마는 특정 시각적 요구가 있는 사용자에게 특히 유용합니다.

두 가지 고대비 테마 옵션이 제공됩니다:

- contrast black skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_black.css">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


- contrast white skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_white.css">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
