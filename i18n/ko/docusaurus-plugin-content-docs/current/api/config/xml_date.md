---
sidebar_label: "xml_date"
title: "xml_date config"
description: "데이터 세트에서 데이터를 해석할 때 사용하는 날짜 형식을 정의합니다"
---

# xml_date
:::warning 
이 기능은 더 이상 지원되지 않습니다.
:::
### Description

@short: 데이터 세트에서 데이터를 해석할 때 사용하는 날짜 형식을 정의합니다

@signature: xml_date: string

### Details

xml_date 설정은 v5.2부터 더 이상 사용되지 않습니다. 대신 다음과 같이 date_format를 사용하세요:
~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2019,0,10),"week");
scheduler.load("/data/events");
~~~

**Default value:** %m/%d/%Y %H:%i

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Related Guides
- ["날짜 형식 지정"](guides/settings-format.md)

### Change log
- v5.2부터 deprecated
