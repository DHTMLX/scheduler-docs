---
sidebar_label: "event_attribute"
title: "event_attribute config"
description: "이벤트의 HTML 요소를 id로 식별하는 데 사용되는 속성 이름을 정의합니다."
---

# event_attribute

### Description

@short: 이벤트의 HTML 요소를 id로 식별하는 데 사용되는 속성 이름을 정의합니다.

@signature: event_attribute: string

### Example

~~~jsx
scheduler.config.event_attribute = "data-event-id"
~~~

**Default value:** "data-event-id"

### Change log
- v6.0에 추가됨
