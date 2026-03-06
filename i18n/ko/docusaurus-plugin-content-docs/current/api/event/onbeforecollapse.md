---
sidebar_label: "onBeforeCollapse"
title: "onBeforeCollapse event"
description: "사용자가 스케줄러의 크기를 '전체 화면'에서 원래 크기로 전환하기 위해 확장 아이콘을 클릭할 때 발생합니다."
---

# onBeforeCollapse

### Description

@short: 사용자가 스케줄러의 크기를 '전체 화면'에서 원래 크기로 전환하기 위해 확장 아이콘을 클릭할 때 발생합니다.

@signature: onBeforeCollapse: () =\> void

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeCollapse",function(){
    //여기에 사용자 정의 로직을 작성하세요
    return true;
});
~~~

### Details

:::note
 이 이벤트를 사용하려면 [expand](guides/extensions-list.md#expand) 확장 기능이 활성화되어 있어야 합니다. 
:::

### Related API
- [onCollapse](api/event/oncollapse.md)
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onExpand](api/event/onexpand.md)
