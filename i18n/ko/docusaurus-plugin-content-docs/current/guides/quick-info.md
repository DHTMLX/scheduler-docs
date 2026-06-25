---
title: "더 쉬운 내비게이션을 위한 대형 버튼"
sidebar_label: "더 쉬운 내비게이션을 위한 대형 버튼"
---

# 더 쉬운 내비게이션을 위한 대형 버튼 

버전 3.7부터 dhtmlxScheduler는 새로운 ["Quick Info" 확장 기능](guides/extensions-list.md#quick-info)을 제공합니다. 이 확장은 표준 사이드바 버튼과 간소화된 편집 양식을 새롭고(더 크고 편리한) 버튼으로 교체할 수 있게 해줍니다.

## 큰 버튼 스케줄러 활성화

큰 버튼 스케줄러를 활성화하려면 페이지에서 ["Quick Info"](guides/extensions-list.md#quick-info) 확장을 활성화하십시오:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2027,5,30),"day");
    ...
<script>
~~~

[터치 지향 스케줄러](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


확장이 활성화되면, 스케줄러는 표준 버튼을 자동으로 대형 크기의 버튼으로 교체합니다:

![quick_info_extension.png](/img/quick_info_extension.png)

## 큰 버튼 스케줄러의 구성 및 커스터마이징

큰 버튼 스케줄러를 구성하거나 커스터마이즈하려면 아래 API를 사용할 수 있습니다:

- **3개의 템플릿**

- [quick_info_content](api/template/quick_info_content.md) - 팝업 편집 양식의 내용을 지정합니다
- [quick_info_date](api/template/quick_info_date.md) - 팝업 편집 양식의 날짜를 지정합니다
- [quick_info_title](api/template/quick_info_title.md) - 팝업 편집 양식의 제목을 지정합니다


- **1개의 설정 옵션**

- [quick_info_detached](api/config/quick_info_detached.md) - 이벤트 양식이 화면의 왼쪽/오른쪽에서 나타날지 또는 선택한 이벤트 근처에서 나타날지 여부를 정의합니다

- **2개의 메서드**

- [hideQuickInfo](api/method/hidequickinfo.md) - 팝업 이벤트 양식을 숨깁니다(현재 활성화되어 있을 경우)
- [showQuickInfo](api/method/showquickinfo.md) - 지정된 이벤트에 대해 팝업 이벤트 양식을 표시합니다