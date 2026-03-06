---
sidebar_label: "onCollapse"
title: "onCollapse event"
description: "사용자가 확장 아이콘을 클릭하여 스케줄러를 '전체 화면'에서 원래 크기로 전환할 때 트리거됩니다."
---

# onCollapse

### Description

@short: 사용자가 확장 아이콘을 클릭하여 스케줄러를 '전체 화면'에서 원래 크기로 전환할 때 트리거됩니다.

@signature: onCollapse: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onCollapse",function(){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

:::note
 이 이벤트를 사용하려면 [expand](guides/extensions-list.md#expand) 확장 기능이 활성화되어 있어야 합니다. 
:::

### Related API
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
