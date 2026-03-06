---
sidebar_label: "drag_out"
title: "drag_out config"
description: "이 스케줄러에서 다른 스케줄러로 이벤트가 드래그되는 것을 방지합니다."
---

# drag_out

### Description

@short: 이 스케줄러에서 다른 스케줄러로 이벤트가 드래그되는 것을 방지합니다.

@signature: drag_out: boolean

### Example

~~~jsx
scheduler.config.drag_out = false; // 이 스케줄러에서 다른 스케줄러로 이벤트 드래그를 비활성화합니다.
scheduler.init('scheduler_here', new Date(2009,05,30), "week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2', new Date(2009,05,30), "week");
~~~

**Default value:** true

### Details

:::note

이 기능은 Scheduler PRO(2021년 10월 6일부터 상업용), Enterprise, Ultimate 라이선스에서만 사용할 수 있습니다.
 
:::

:::note
 이 기능을 사용하려면 [outerdrag](guides/extensions-list.md#outerdrag) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [drag_in](api/config/drag_in.md)

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md)
- ["페이지에서 여러 개의 Scheduler 생성하기"](guides/multiple-per-page.md)
