---
sidebar_label: "auto_end_date"
title: "auto_end_date config"
description: "시작 날짜가 조정될 때 이벤트의 종료 날짜를 자동으로 업데이트합니다."
---

# auto_end_date

### Description

@short: 시작 날짜가 조정될 때 이벤트의 종료 날짜를 자동으로 업데이트합니다.

@signature: auto_end_date: boolean

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- 이 설정은 버전 2.3부터 사용 가능합니다.
- [event_duration](api/config/event_duration.md) 옵션과 함께 사용하도록 설계되었습니다.
- *true*로 설정하면 라이트박스에서 이벤트의 시작 시간이나 날짜를 조정할 때, [event_duration](api/config/event_duration.md) 옵션에 지정된 이벤트 지속 시간을 유지하기 위해 종료 시간과 날짜가 자동으로 업데이트됩니다.

### Related API
- [event_duration](api/config/event_duration.md)
