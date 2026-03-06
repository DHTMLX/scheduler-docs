---
title: "일반 설정 안내"
sidebar_label: "일반 설정 안내"
---

# 일반 설정 안내

스케줄러의 외관을 사용자 정의하려면, 라이브러리는 세 가지 주요 객체를 제공합니다:

- <a href="api/overview/properties_overview.md">scheduler.config</a> - 날짜, 스케일, 컨트롤 등 다양한 옵션을 설정할 수 있습니다.
- <a href="api/overview/templates_overview.md">scheduler.templates</a> - 날짜, 제목, 툴팁의 포맷 및 스타일링을 위한 템플릿을 제공합니다.
- [scheduler.xy](api/other/xy.md) - 다양한 스케줄러 요소의 크기를 정의하는 설정입니다.

또한, dhtmlxScheduler는 컴포넌트의 기능을 확장하는 [여러 확장 기능](#extensions)을 포함하고 있습니다.

## scheduler.config

라이브러리에는 **scheduler.config** 객체 내에 다양한 설정 옵션이 포함되어 있습니다.

옵션을 적용하려면, 이 문서에 제시된 대로 값을 할당하면 됩니다(또는 [여러 개의 스케줄러를 한 페이지에 사용하는 경우](guides/multiple-per-page.md) *scheduler* 대신 해당 *dhtmlxScheduler 인스턴스* 이름을 사용하세요).

설정은 반드시 스케줄러를 초기화하기 전에 적용해야 합니다.

~~~js
scheduler.config.first_hour = 8;/*!*/
scheduler.config.last_hour = 17;/*!*/
scheduler.config.start_on_monday = true;/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

**scheduler.config**의 전체 속성 목록은 [Scheduler API: Properties](api/overview/properties_overview.md)에서 확인할 수 있습니다.


[Multi-day events](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/06_multi_day_events.html)


## scheduler.templates

템플릿을 사용하면 스케줄러에서 날짜와 제목의 표시 방식을 사용자 정의할 수 있습니다.

템플릿을 정의하려면, 아래와 같이 값을 할당하세요(여러 개의 스케줄러를 사용하는 경우 [["페이지에서 여러 개의 Scheduler 생성하기"](guides/multiple-per-page.md)](guides/multiple-per-page.md)를 참고하여 *scheduler*를 해당 인스턴스 이름으로 교체하세요). 템플릿은 반드시 스케줄러를 초기화하기 전에 정의해야 합니다.

~~~js
scheduler.templates.event_text = function(start,end,ev){/*!*/
   return 'Subject: ' + ev.text + '';/*!*/
};/*!*/
scheduler.init('scheduler_here',null,"week");
~~~

:::note
기본 템플릿으로 덮어쓰여지는 것을 방지하려면, [onTemplatesReady](api/event/ontemplatesready.md) 이벤트의 핸들러 함수 내에서 템플릿을 재정의하는 것이 권장됩니다.
:::

![templates.png](/img/templates.png)

사용 가능한 모든 템플릿 목록은 [Scheduler API: Templates](api/overview/templates_overview.md)에서 확인할 수 있습니다.


[Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## scheduler.xy

[scheduler.xy](api/other/xy.md) 객체는 다양한 뷰에서 스케줄러 요소의 너비, 높이, 오프셋을 제어하는 속성을 포함합니다.

이 설정을 적용하려면 아래와 같이 값을 할당하세요(여러 개의 스케줄러를 사용하는 경우 *scheduler*를 해당 인스턴스 이름으로 교체하세요). 크기 설정은 반드시 스케줄러를 초기화하기 전에 적용해야 합니다.

~~~js
scheduler.xy.scale_height = 40; // X축의 높이를 설정합니다 /*!*/
scheduler.init('scheduler_here',new Date(),"month");
~~~

:::note
scheduler.xy의 모든 속성은 'number' 데이터 타입을 사용합니다.
:::


[Customizing the scheduler header](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/03_header_format.html)


## Extensions

여러 확장 기능을 활성화하여 Scheduler 컴포넌트에 특별한 기능을 추가할 수 있습니다. 예를 들어, **cookie** 확장 기능을 활성화하면, 스케줄러의 현재 상태(모드 및 날짜 등)를 쿠키에 저장할 수 있습니다.

~~~js
scheduler.plugins({
    cookie: true
});
~~~


[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


사용 가능한 Scheduler 확장 기능의 목록은 ["전체 확장 기능 목록"](guides/extensions-list.md) 문서에서 확인할 수 있습니다.
