---
sidebar_label: "event_duration"
title: "event_duration config"
description: "이벤트의 초기 지속 시간을 분 단위로 설정합니다."
---

# event_duration

### Description

@short: 이벤트의 초기 지속 시간을 분 단위로 설정합니다.

@signature: event_duration: number

### Example

~~~jsx
scheduler.config.event_duration = 60; 
scheduler.config.auto_end_date = true;
...
scheduler.init('scheduler_here', new Date(2027, 05, 11), "week");
~~~

**Default value:** 5

### Related samples
- [Automatic end date](https://docs.dhtmlx.com/scheduler/samples/02_customization/11_auto_end_date.html)
- [Checkbox in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/13_single_checkbox_section.html)

### Details

- 이 파라미터는 버전 2.3부터 사용할 수 있습니다.
- [auto_end_date](api/config/auto_end_date.md) 옵션과 함께 사용할 때만 동작합니다.
- [auto_end_date](api/config/auto_end_date.md) 옵션이 활성화되어 있을 때(값이 *true*로 설정된 경우), 라이트박스에서 이벤트의 시작 시간이나 날짜를 조정하면 'event_duration' 설정에 지정된 지속 시간을 유지하기 위해 종료 시간과 날짜가 자동으로 업데이트됩니다.

### Related API
- [auto_end_date](api/config/auto_end_date.md)
