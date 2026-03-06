---
sidebar_label: "deleteAllSections"
title: "deleteAllSections method"
description: "활성 뷰에서 모든 섹션을 제거합니다."
---

# deleteAllSections
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 활성 뷰에서 모든 섹션을 제거합니다.

@signature: deleteAllSections: () =\> void

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",    label:"Administration"},
        {key:"accounts",    label:"Accounting Department"},
        {key:"sales",       label:"Sales and Marketing"},
        {key:"production",  label:"Production Department"}
    ]
});
...
scheduler.deleteAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드는 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

현재 뷰가 'Tree' 렌더링이 적용된 Timeline 뷰가 아닐 경우, 이 메서드는 아무런 효과가 없습니다.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [addSection](api/method/addsection.md)
