---
sidebar_label: "show_loading"
title: "show_loading config"
description: "데이터 로딩 중에 진행 표시기나 스피너를 표시합니다. 이는 동적 로딩 시나리오에 유용합니다."
---

# show_loading

### Description

@short: 데이터 로딩 중에 진행 표시기나 스피너를 표시합니다. 이는 동적 로딩 시나리오에 유용합니다.

@signature: show_loading: boolean

### Example

~~~jsx
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** false

### Related Guides
- ["데이터 불러오기"](guides/loading-data.md#dynamic-loading)
