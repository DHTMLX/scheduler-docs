---
sidebar_label: "onExpand"
title: "onExpand event"
description: "사용자가 확장 아이콘을 클릭하여 스케줄러의 크기를 원래 상태에서 '전체 화면'으로 전환할 때 트리거됩니다."
---

# onExpand

### Description

@short: 사용자가 확장 아이콘을 클릭하여 스케줄러의 크기를 원래 상태에서 '전체 화면'으로 전환할 때 트리거됩니다.

@signature: onExpand: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onExpand",function(){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

:::note
 이 이벤트는 [expand](guides/extensions-list.md#expand) 확장 기능이 활성화되어 있어야 합니다. 
:::

### Related API
- [onBeforeExpand](api/event/onbeforeexpand.md)
- [onBeforeCollapse](api/event/onbeforecollapse.md)
- [onCollapse](api/event/oncollapse.md)
