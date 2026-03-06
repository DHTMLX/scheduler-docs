---
title: "스킨(Skins)"
sidebar_label: "스킨(Skins)"
---

# 스킨(Skins) 

다음과 같은 여러 가지 기본 제공 스킨이 있습니다:

1. [Terrace (기본값)](guides/skins.md#terrace-skin)
1. [Dark](guides/skins.md#dark-skin)
2. [Material](guides/skins.md#material-skin)
3. [Flat](guides/skins.md#flat-skin)
4. [Contrast Black](guides/skins.md#contrastblackskin)
5. [Contrast White](guides/skins.md#contrast-white-skin)

버전 7.0부터 모든 스킨은 메인 **dhtmlxscheduler.css** 파일에 포함되어 있습니다. 스킨을 활성화하려면 **scheduler.skin** 속성을 설정하세요:

~~~js
scheduler.skin = "dark";
~~~

또는, [scheduler.setSkin()](api/method/setskin.md) 메서드를 사용할 수도 있습니다:

~~~js
scheduler.setSkin("dark");
~~~

Scheduler 버전 6.0 이하에서는 스킨이 별도의 CSS 파일로 제공되었습니다.

### 폰트 사용

기본적으로, 스킨은 `https://fonts.googleapis.com`에서 `Inter` 폰트를 불러옵니다. Google Fonts에 대한 자세한 내용은 [여기](https://developers.google.com/fonts)에서 확인할 수 있습니다.

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
);
~~~

필요하다면, **codebase/sources/less/skins/material** 폴더에 위치한 **.less** 파일에서 폰트 임포트를 직접 제거한 후, ["스킨 커스터마이제이션"](guides/custom-skins.md) 문서에 안내된 대로 스킨을 다시 빌드할 수 있습니다.

## 'Terrace' 스킨 {#terrace-skin}

기본 스킨을 사용하려면, 기본 CSS 파일을 포함하세요:

- **dhtmlxscheduler.css**

![terrace_skin](/img/terrace_skin.png)


[Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)


## 'Dark' 스킨 {#dark-skin}

'Dark' 스킨을 적용하려면, 기본 CSS 파일을 포함하세요:

- **dhtmlxscheduler.css**

그런 다음 **scheduler.skin** 속성을 사용하여 스킨을 설정하세요:

~~~js
scheduler.skin = "dark";
~~~

![dark_skin](/img/dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/06_dark.html)


## 'Material' 스킨 {#material-skin}

'Material' 스킨을 활성화하려면, 기본 CSS 파일을 포함하세요:

- **dhtmlxscheduler.css**

그런 다음 **scheduler.skin** 속성으로 스킨을 설정하세요:

~~~js
scheduler.skin = "material";
~~~

![DHTMLX Scheduler - Material](/img/material_skin.png)


[Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)


Material 스킨은 기본적으로 포함되지 않은 `Roboto` 폰트를 필요로 합니다. 아래와 같이 직접 추가해주어야 합니다:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

## 'Flat' 스킨 {#flat-skin}

'Flat' 스킨을 사용하려면, 기본 CSS 파일을 포함하세요:

- **dhtmlxscheduler.css**

그런 다음 **scheduler.skin** 속성을 통해 스킨을 설정하세요:

~~~js
scheduler.skin = "flat";
~~~

![DHTMLX Scheduler - Flat Theme](/img/flat_skin.png)


[Flat skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/03_flat.html)


## 'Contrast Black' 스킨 {#contrastblackskin}

'Contrast Black' 스킨을 적용하려면, 기본 CSS 파일을 포함하세요:

- **dhtmlxscheduler.css**

그런 다음 **scheduler.skin** 속성을 사용하여 스킨을 설정하세요:

~~~js
scheduler.skin = "contrast-black";
~~~

![DHTMLX Scheduler - Contrast Black Theme](/img/contrast_black_skin.png)


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


## 'Contrast White' 스킨 {#contrast-white-skin}

'Contrast White' 스킨을 적용하려면, 기본 CSS 파일을 포함하세요:

- **dhtmlxscheduler.css**

그런 다음 **scheduler.skin** 속성을 사용하여 스킨을 설정하세요:

~~~js
scheduler.skin = "contrast-white";
~~~

![DHTMLX Scheduler - Contrast White Theme](/img/contrast_white_skin.png)


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
