---
title: "스킨 커스터마이제이션"
sidebar_label: "스킨 커스터마이제이션"
---

# 스킨 커스터마이제이션

버전 7.0부터 Scheduler 스킨은 CSS 변수로 구성되어 있어 손쉽게 커스터마이즈 및 스타일링이 가능합니다.


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


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

모든 변수는 패키지 내 **codebase/sources/less/src/themes/variables.less** 파일에 위치해 있습니다.

## 스킨 커스터마이즈 방법

Scheduler의 외형을 변경하는 가장 간단한 방법은 본인 스타일시트에서 CSS 변수를 재정의하는 것입니다. 예시:

~~~html
<style>
:root {
  --dhx-scheduler-base-colors-primary: #01579B;
  --dhx-scheduler-event-background: #33B579;
  --dhx-scheduler-event-color: #FFFFFF;
  --dhx-scheduler-base-colors-border: #B0B8CD;
  --dhx-scheduler-border-radius:2px;
}
</style>
~~~


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


이렇게 변수를 지정하면 기본 스타일이 사용자가 정의한 스타일로 대체되며, 이 변경 사항은 Scheduler 전체에 적용됩니다.

:::note
전체 테마에서 값의 일관된 상속을 위해서는 변수를 :root 요소에 정의하는 것이 가장 좋습니다.
:::

**:root** 수준에서 스타일을 정의하면 컴포넌트 전체에 올바르게 상속됩니다. 한 변수가 다른 변수에 의존할 때, 변경 사항이 올바르게 연쇄적으로 적용됩니다.

예를 들어, 변수 `--dhx-scheduler-scale-color`는 `--dhx-scheduler-container-color`의 값을 상속받습니다.

- **:root**에서 `--dhx-scheduler-container-color`를 재정의하면 `--dhx-scheduler-scale-color`도 함께 업데이트됩니다.

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color 와
       --dhx-scheduler-container-color를 상속받는
       다른 변수들이 영향을 받음 */
  --dhx-scheduler-container-color: #222;

}
</style>
~~~

- 하지만 **.dhx_cal_container** 등 DOM 내부에서 `--dhx-scheduler-container-color`를 재정의하면 `--dhx-scheduler-scale-color`는 변경되지 않습니다.

~~~html
<style>
.dhx_cal_container {
    /* --dhx-scheduler-container-color를 직접 사용하는
       요소만 영향을 받음 */
  --dhx-scheduler-container-color: #222;
}
</style>
~~~


## 소스 코드 사용 방법

dhtmlxScheduler는 다음과 같은 형식의 스타일 파일을 제공합니다:

- **codebase/dhtmlxscheduler.css** - 프로덕션용으로 압축된 CSS 파일
- **codebase/sources/dhtmlxscheduler.css** - 읽기 쉬운 prebuilt CSS 파일
- **codebase/sources/less/** - Scheduler 스킨의 소스 LESS 파일

소스 LESS 파일은 기존 스킨을 깊이 커스터마이즈하거나 새로운 스킨을 만들고자 할 때 유용합니다.

## 시작 방법

**codebase/sources/less**를 NPM 패키지로 설정할 수 있습니다. 이 소스 폴더에는 두 가지 유형의 파일이 포함되어 있습니다:

- 스타일 시트
- 세밀한 조정이나 새로운 스킨 제작을 위한 마이크로 변수 선언 파일

## 스킨 빌드 방법

**codebase/sources/less/** 내부에서 다음을 실행하세요:

~~~
> npm install
~~~

설치가 완료되면 다음 명령어로 CSS 파일을 다시 빌드할 수 있습니다:

~~~
> npm run build
~~~

또는 변경 사항을 감지해 자동으로 빌드하려면:

~~~
> npm run watch
~~~

이 스크립트들은 소스에서 CSS를 컴파일하여 Scheduler 패키지의 *codebase* 폴더에 결과물을 저장하며, 기존 CSS 파일을 대체합니다.

## 구조

버전 7.0 기준(향후 릴리즈에서 변경될 수 있음) **less** 폴더 구조는 다음과 같습니다:

### 이미지

- **./src/imgs** - 모든 스킨에서 사용하는 SVG 아이콘
- **./src/iconfont** - 웹폰트로 포함된 아이콘

### 스킨 정의

기본 변수는 `terrace` 스킨에 정의되어 있으며, 다른 스킨들은 이 변수를 오버라이드하고 자체 스타일을 추가합니다.

- **./src/themes**
  - *./src/themes/variables.less* - 모든 스킨(terrace 포함)에 공통적인 변수
  - *./src/themes/contrast_black* - contrast black 스킨 변수
  - *./src/themes/contrast_white* - contrast white 스킨 변수
  - *./src/themes/material* - material 스킨 변수
  - *./src/themes/dark* - dark 스킨 변수
  - *./src/themes/flat* - flat 스킨 변수

### 스킨 빌드 엔트리 포인트

- theme.less
- package.json


## 커스텀 스킨 만들기

새로운 스킨을 만들려면 **sources/less/src/themes**에서 기존 스킨을 복사해 이름을 바꾸는 것부터 시작하세요. 다음 단계를 따르세요:

1) 기존 스킨 파일 중 하나를 복사해 이름을 변경합니다. 예시:

~~~
-> 복사:
codebase/sources/less/src/themes/material.less

-> 이름 변경:
codebase/sources/less/src/themes/custom.less
~~~

2) **sources/less/src/themes/index.less**에서 새 파일을 다음과 같이 import 합니다:

~~~
@import "./custom";
~~~

그런 다음 아래와 같이 커스텀 변수를 정의하세요:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

스킨 변수는 반드시 `:root` 셀렉터에서 `data-scheduler-theme` 속성을 사용하여 정의해야 합니다.

모든 새로운 테마는 테마 이름을 지정하는 **--dhx-scheduler-theme** 변수를 포함해야 합니다.

3) 다음 명령어로 스킨을 다시 빌드하세요:

~~~
npm run build
~~~


:::note
Scheduler는 사용 중인 스킨에 따라 일부 미리 정의된 설정을 적용할 수 있습니다. 기존 스킨을 복사해 새 스킨을 만들 경우, 해당 Scheduler 설정을 수동으로 조정해야 할 수도 있습니다.
:::


## JS 스타일링 설정

Scheduler의 일부 스타일 옵션은 CSS만으로 제어되지 않고 JavaScript 설정을 통해 지정됩니다. 여기에는 다음이 포함됩니다:

- [hour_size_px](api/config/hour_size_px.md)
- 그리고 [scheduler.xy](api/other/xy.md) 오브젝트의 모든 설정
