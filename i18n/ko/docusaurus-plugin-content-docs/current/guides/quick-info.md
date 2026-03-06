---
title: "더 쉬운 내비게이션을 위한 대형 버튼"
sidebar_label: "더 쉬운 내비게이션을 위한 대형 버튼"
---

# 더 쉬운 내비게이션을 위한 대형 버튼 

버전 3.7부터 dhtmlxScheduler는 ["Quick Info" 확장](guides/extensions-list.md#quick-info)을 도입했습니다. 이 기능을 사용하면 기존의 사이드바 버튼과 간소화된 편집 폼을 더 크고 사용자 친화적인 버튼으로 대체할 수 있습니다.

## 대형 버튼 스케줄러 활성화하기 

대형 버튼 스케줄러를 활성화하려면, 페이지에서 ["Quick Info"](guides/extensions-list.md#quick-info) 확장을 활성화하세요:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2009,5,30),"day");
    ...
<script>
~~~

[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


확장이 활성화되면, 스케줄러는 기본 버튼을 자동으로 더 큰 버전으로 교체합니다:

![quick_info_extension.png](/img/quick_info_extension.png)

## 대형 버튼 스케줄러 설정 및 커스터마이즈 

대형 버튼 스케줄러를 설정하거나 커스터마이즈할 수 있는 여러 API가 제공됩니다:

- **3가지 템플릿**  

- [quick_info_content](api/template/quick_info_content.md) - 팝업 편집 폼에 표시되는 내용을 제어합니다
- [quick_info_date](api/template/quick_info_date.md) - 팝업 편집 폼에 표시되는 날짜를 제어합니다
- [quick_info_title](api/template/quick_info_title.md) - 팝업 편집 폼의 제목을 제어합니다

- **1가지 설정 옵션**

- [quick_info_detached](api/config/quick_info_detached.md) - 이벤트 폼이 화면의 왼쪽/오른쪽에서 나타날지, 선택된 이벤트 옆에서 나타날지를 설정합니다


- **2가지 메서드**  

- [hideQuickInfo](api/method/hidequickinfo.md) - 팝업 이벤트 폼이 열려 있을 때 이를 숨깁니다
- [showQuickInfo](api/method/showquickinfo.md) - 지정된 이벤트에 대한 팝업 이벤트 폼을 엽니다
