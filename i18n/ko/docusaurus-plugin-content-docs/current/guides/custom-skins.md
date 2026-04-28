---
title: "스킨 커스터마이징"
sidebar_label: "스킨 커스터마이징"
---

# 스킨 커스터마이징

버전 7.0부터 Scheduler의 스킨은 커스터마이징 및 스타일링에 사용할 수 있는 CSS 변수들을 사용합니다.

### 관련 샘플
- [테마를 커스터마이즈하고 전환하기](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


주요 CSS 변수:

~~~css
:root {
    --dhx-scheduler-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-scheduler-font-size: 14px;

    --dhx-scheduler-base-colors-primary: #537CFA;
    --dhx-scheduler-base-colors-warning: #FAB936;
    --dhx-scheduler-base-colors-error: #E3334E;
    --dhx-scheduler-base-colors-error-text: #FFFFFF;
    --dhx-scheduler-base-colors-success: #1BC297;
    --dhx-scheduler-base-colors-secondary: rgba(0, 0, 0, 0.04);

    --dhx-scheduler-base-colors-select: #EFF3FF;
    --dhx-scheduler-base-colors-border: #D0DBE3;
    --dhx-scheduler-base-colors-icons: #A1A4A6;

    --dhx-scheduler-base-colors-disabled: #E9E9E9;
    --dhx-scheduler-base-colors-readonly: var(--dhx-scheduler-base-colors-icons);
    --dhx-scheduler-base-colors-text-light: #44494E;
    --dhx-scheduler-base-colors-text-base: #23272A;
    --dhx-scheduler-base-colors-background: #FFFFFF;

    --dhx-scheduler-container-background: var(--dhx-scheduler-base-colors-background);
    --dhx-scheduler-container-color: var(--dhx-scheduler-base-colors-text-base);
    --dhx-scheduler-scale-color: var(--dhx-scheduler-container-color);

    --dhx-scheduler-base-padding: 4px;
    --dhx-scheduler-border-radius: var(--dhx-scheduler-base-module);

    --dhx-scheduler-event-colors-primary: #537CFA;
    --dhx-scheduler-event-text-primary: rgba(255, 255, 255, 0.90);

    --dhx-scheduler-toolbar-height: 40px;

    --dhx-scheduler-header-border: var(--dhx-scheduler-default-border);
    --dhx-scheduler-halfhour-border: 1px dotted var(--dhx-scheduler-base-colors-border);

    /* events */

    --dhx-scheduler-event-background-primary: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-scheduler-event-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-scheduler-event-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-scheduler-event-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, 
      #FAEA27 100%);

    --dhx-scheduler-event-menu-background: var(--dhx-scheduler-popup-background);
    --dhx-scheduler-event-menu-color: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-background: var(--dhx-scheduler-event-blue);
    --dhx-scheduler-event-border: none;
    --dhx-scheduler-event-color: var(--dhx-scheduler-event-text-primary);
    --dhx-scheduler-event-line-text: var(--dhx-scheduler-container-color);

    --dhx-scheduler-event-marker-color: var(--dhx-scheduler-event-background);

    --dhx-scheduler-popup-background: var(--dhx-scheduler-container-background);
    --dhx-scheduler-popup-color: var(--dhx-scheduler-container-color);
    --dhx-scheduler-popup-border: none;
    --dhx-scheduler-popup-border-radius: var(--dhx-scheduler-border-radius);

}
~~~

모든 변수는 패키지의 **codebase/sources/less/src/themes/variables.less** 파일에서 확인할 수 있습니다.

## 스킨 커스터마이즈 방법

Scheduler의 외관을 가장 쉽게 커스터마이즈하는 방법은 stylesheet에서 관련 CSS 변수들을 재정의하는 것입니다. 아래는 예시입니다:

~~~html
<style>
:root {
    --dhx-scheduler-base-colors-primary: #01579B;
    --dhx-scheduler-event-background: #33B579;
    --dhx-scheduler-event-color: #FFFFFF;
    --dhx-scheduler-base-colors-border: #B0B8CD;
    --dhx-scheduler-border-radius: 2px;
}
</style>
~~~

### 관련 샘플
- [테마를 커스터마이즈하고 전환하기](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


변수를 이와 같이 정의하면 기본 스타일을 재정의할 수 있으며, 맞춤 스타일이 Scheduler에 반영되도록 보장됩니다.

:::note
전체 테마에 걸친 값의 올바른 상속을 보장하려면 변수 정의를 `:root` 요소에서 하십시오.
:::

컴포넌트 전반에 걸친 상속 및 적용이 올바르게 이루어지도록 하려면 `:root` 요소에서 이 스타일을 정의하는 것이 중요합니다. 예를 들어, 다른 변수에서 상속받는 값인 `--dhx-scheduler-scale-color`가 이 변화를 반영하게 됩니다.

- `:root` 레벨에서 `--dhx-scheduler-container-color` 를 재정의하면 `--dhx-scheduler-scale-color`가 이를 반영합니다.

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color 및
       `--dhx-scheduler-container-color`를 상속하는 기타 변수들이
       영향 받을 것
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

- DOM 트리의 하위 수준(예: **.dhx_cal_container**)에서 `--dhx-scheduler-container-color`를 재정의하면, `--dhx-scheduler-scale-color` 변수에 영향을 주지 않습니다.

~~~html
<style>
.dhx_cal_container {
    /* 직접적으로
       --dhx-scheduler-container-color를 사용하는 요소에만 영향
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

## 소스 코드를 사용하는 방법

dhtmlxScheduler는 다음 형태의 스타일 파일로 배포됩니다:

- **codebase/dhtmlxscheduler.css** - 스킨용으로 미리 압축된 CSS 파일로, 프로덕션 사용에 적합합니다;
- **codebase/sources/dhtmlxscheduler.css** - 미리 구성된 읽기 쉬운 CSS 파일;
- **codebase/sources/less/** - Scheduler 스킨의 소스 LESS 파일들.

후자는 기존 스킨의 깊은 커스터마이징이나 새로운 스킨을 만드는 데 사용할 수 있습니다.

## 시작하는 방법

`codebase/sources/less`를 NPM 패키지로 초기화할 수 있습니다.
소스에는 두 가지 유형의 파일이 포함됩니다:

- 스타일 시트들;
- 스케줄러 뷰를 미세 조정하거나 새 스킨을 만드는 데 사용할 수 있는 마이크로 변수 선언 파일들.

## 스킨 빌드 방법

`codebase/sources/less/`에서 실행하십시오:

~~~sh
> npm install
~~~

설치가 완료되면 다음 명령으로 CSS 파일을 다시 빌드할 수 있습니다:

~~~sh
> npm run build
~~~

또는

~~~sh
> npm run watch
~~~

이 스크립트는 소스에서 CSS 파일을 다시 빌드하여 Scheduler 패키지의 codebase 폴더에 기존 파일을 대체합니다.

## 구조

버전 7.0용 `less` 폴더의 구조(향후 버전에서 변경될 수 있음)는 아래와 같습니다:

### Images

- **./src/imgs** - 모든 스킨에서 사용되는 SVG 아이콘
- **./src/iconfont** - 웹 폰트에 미리 빌드된 아이콘

### Skin 정의

기본 변수 세트는 `terrace` 스킨에 정의되어 있으며, 다른 스킨은 해당 변수를 재정의하고 스타일을 추가합니다.

- **./src/themes**
  - *./src/themes/variables.less* - 모든 스킨에서 사용하는 공통 변수, `terrace` 스킨
  - *./src/themes/contrast_black* - 대비 블랙 스킨 변수
  - *./src/themes/contrast_white* - 대비 화이트 스킨 변수
  - *./src/themes/material* - 머티리얼 스킨 변수
  - *./src/themes/dark* - 다크 스킨 변수
  - *./src/themes/flat* - 플랫 스킨 변수

### 스킨 빌드의 진입점

- theme.less
- package.json


## 커스텀 스킨 만들기

새로운 스킨을 만들려면 `sources/less/src/themes` 폴더의 기존 스킨 중 하나를 복사하고 이름을 바꿀 수 있습니다. 아래 절차를 따르십시오:

1. `sources/less/src/themes` 폴더의 기존 파일 중 하나를 복사하고 이름을 바꿉니다. 예를 들면:

~~~text
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2. 새 파일을 `sources/less/src/themes/index.less`에 가져오도록 추가합니다. 예:

~~~less
@import "./custom";
~~~

그리고 아래처럼 내용을 추가합니다:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

스킨 변수는 `:root` 요소 아래에서 정의해야 하며 `data-scheduler-theme` 선택자를 사용합니다.

새로운 테마에는 테마 이름과 함께 `--dhx-scheduler-theme` 변수가 포함되어야 합니다.

3. 다음 명령을 실행하여 스킨을 다시 빌드합니다:

~~~sh
npm run build
~~~

:::note
스케줄러는 적용된 스킨에 따라 달력에 미리 정의된 설정을 적용할 수 있습니다.
기존 스킨을 복사하여 새 스킨을 만들 경우 Scheduler에 해당 설정을 수동으로 적용해야 할 수도 있습니다.
:::

## JS 스타일링 설정

Scheduler 스타일링의 모든 측면이 CSS에서 제어되는 것은 아니며, 일부 매개변수는 JavaScript 구성에서 정의됩니다. 이들은 다음과 같습니다:

- [hour_size_px](api/config/hour_size_px.md)
- 및 `[scheduler.xy](api/other/xy.md)` 객체의 모든 설정