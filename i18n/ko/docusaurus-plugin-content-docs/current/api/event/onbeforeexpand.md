---
sidebar_label: "onBeforeExpand"
title: "onBeforeExpand event"
description: "사용자가 확장 아이콘을 클릭하여 스케줄러를 원래 크기에서 '전체 화면'으로 전환할 때 트리거됩니다."
---

# onBeforeExpand

### Description

@short: 사용자가 확장 아이콘을 클릭하여 스케줄러를 원래 크기에서 '전체 화면'으로 전환할 때 트리거됩니다.

@signature: onBeforeExpand: () =\> boolean

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 중지될지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeExpand",function(){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

:::note
 이 이벤트는 [expand](guides/extensions-list.md#expand) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [onExpand](api/event/onexpand.md)
- [onCollapse](api/event/oncollapse.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
