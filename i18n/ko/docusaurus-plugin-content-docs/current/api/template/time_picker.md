---
sidebar_label: "time_picker"
title: "time_picker template"
description: "라이트박스 내에서 드롭다운 형태의 시간 선택기를 제공합니다."
---

# time_picker

### Description

@short: 라이트박스 내에서 드롭다운 형태의 시간 선택기를 제공합니다.

@signature: time_picker: () =\> string

### Returns
- ` text` - (string) - 스케줄러 내부 렌더링에 사용되는 HTML 텍스트

### Example

~~~jsx
scheduler.templates.time_picker = 
scheduler.date.date_to_str(scheduler.config.hour_date);
~~~

### Related API
- [hour_date](api/config/hour_date.md)

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#lightbox)
