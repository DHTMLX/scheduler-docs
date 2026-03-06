---
sidebar_label: "edit_on_create"
title: "edit_on_create config"
description: "새 이벤트 생성 시 라이트박스를 열 수 있도록 설정합니다."
---

# edit_on_create

### Description

@short: 새 이벤트 생성 시 라이트박스를 열 수 있도록 설정합니다.

@signature: edit_on_create: boolean

### Example

~~~jsx
scheduler.config.edit_on_create = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true
