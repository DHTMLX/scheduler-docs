---
sidebar_label: "ajax_error"
title: "ajax_error config"
description: "XML 데이터 로딩 실패 시 기본 에러 알림이 표시되는 방식을 정의합니다"
---

# ajax_error

### Description

@short: XML 데이터 로딩 실패 시 기본 에러 알림이 표시되는 방식을 정의합니다

@signature: ajax_error: string | boolean

### Example

~~~jsx
// 에러 메시지를 콘솔에 기록합니다
scheduler.config.ajax_error = "console";

// 또는
// 기본 에러 메시지를 비활성화합니다
// scheduler.config.ajax_error = false;

scheduler.init("scheduler_here");
~~~

**Default value:** "alert"

### Details

기본적으로 에러 알림(<code>scheduler.config.ajax_error = "alert"</code>일 때)은 다음과 같이 표시됩니다: 

![ajax_error_property](/img/ajax_error_property.png)
