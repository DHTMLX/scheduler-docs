---
title: "툴팁 (v6.0)"
sidebar_label: "툴팁 (v6.0)"
---

# 툴팁 (v6.0)

*이 문서는 dhtmlxScheduler 버전 6.0 및 이전 버전에 해당합니다. 7.0 이상 버전에 대한 자세한 내용은 [여기](guides/tooltips.md)를 참고하세요.*

이벤트에 대한 툴팁을 활성화하려면, **Tooltip** 확장 기능을 페이지에서 한 번 활성화해야 합니다.

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

활성화되면, 툴팁은 기본 설정으로 표시됩니다.

![tooltip](/img/tooltip.png)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


툴팁 기능은 아래 API를 통해 커스터마이즈할 수 있습니다.

## 메서드

- **hide()** - 툴팁을 숨깁니다
- **show(event,text)** - 브라우저 이벤트 위치에 지정한 내용을 가진 툴팁을 표시합니다. 이 메서드는 두 개의 파라미터를 받습니다:
    - *event* - 브라우저 이벤트 객체
    - *text* - 툴팁의 innerHTML에 삽입될 내용

~~~js
tooltip.hide();
tooltip.show(event, text);
~~~


## 설정 프로퍼티

- **className** - 툴팁에 적용할 CSS 클래스 이름을 지정합니다
- **timeout_to_display** - 툴팁이 나타나기 전까지의 지연 시간(밀리초, 기본값 50)
- **timeout_to_hide** - 툴팁이 사라지기 전까지의 지연 시간(밀리초, 기본값 50)
- **delta_x** - 커서 위치로부터의 수평 오프셋(양수는 오른쪽 이동, 기본값 15)
- **delta_y** - 커서 위치로부터의 수직 오프셋(양수는 아래쪽 이동, 기본값 -20)

~~~js
scheduler.config.className = 'dhtmlXTooltip tooltip'; 
scheduler.config.timeout_to_display = 50;
scheduler.config.timeout_to_hide = 50;
scheduler.config.delta_x = 15; 
scheduler.config.delta_y = -20; 
~~~

## 템플릿

- [tooltip_text](api/template/tooltip_text.md) - 툴팁에 표시될 내용을 정의합니다  
- [tooltip_date_format](api/template/tooltip_date_format.md) - 툴팁에 표시되는 시작 및 종료 날짜의 형식을 정의합니다

~~~js
var format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
scheduler.templates.tooltip_text = function(start,end,event) {
    return "<b>Event:</b> "+event.text+"

<b>Start date:</b> "+
    format(start)+"

<b>End date:</b> "+format(end);
};
~~~
