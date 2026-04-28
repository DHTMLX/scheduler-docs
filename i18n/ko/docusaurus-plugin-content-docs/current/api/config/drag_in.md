---
sidebar_label: "drag_in"
title: "drag_in config"
description: "드래깅 이벤트가 드래그를 시작한 스케줄러 내에서만 이동할 수 있도록 제한하여, 서로 다른 스케줄러 간의 이벤트 이동을 방지합니다."
---

# drag_in

### Description

@short: 드래깅 이벤트가 드래그를 시작한 스케줄러 내에서만 이동할 수 있도록 제한하여, 서로 다른 스케줄러 간의 이벤트 이동을 방지합니다.

@signature: drag_in: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,05,30),"week");
scheduler.load("./data/units.xml");

scheduler2.config.drag_in = false; // 이 스케줄러로 이벤트 드래깅을 비활성화합니다
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027,05,30),"week");
~~~

**Default value:** true

### Details

:::note

이 기능은 Scheduler PRO(2021년 10월 6일부터 상업용), Enterprise, Ultimate 라이선스에서만 사용할 수 있습니다.
 
:::

:::note
 [outerdrag](guides/extensions-list.md#outerdrag) 플러그인이 활성화되어 있어야 이 속성이 작동합니다. 
:::

### Related API
- [drag_out](api/config/drag_out.md)

### Related Guides
- ["드래그 앤 드롭(Drag-and-Drop) 작업"](guides/drag-between.md)
- ["페이지에서 여러 개의 Scheduler 생성하기"](guides/multiple-per-page.md)
