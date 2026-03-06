---
sidebar_label: "getSection"
title: "getSection method"
description: "현재 활성화된 뷰 내 특정 섹션의 객체를 가져옵니다."
---

# getSection
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 활성화된 뷰 내 특정 섹션의 객체를 가져옵니다.

@signature: getSection: (section_id: string) =\> any

### Parameters

- `section_id` - (required) *string* - 섹션의 식별자

### Returns
- ` section` - (object) - 섹션 객체

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",     label:"Administration"},
        {key:"accounts",     label:"Accounting Department"},
        {key:"sales",         label:"Sales and Marketing"},
        {key:"production",     label:"Production Department"}
    ]
});
...
scheduler.getSection("sales");//->{key:"sales",label:"Sales and Marketing"}
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드는 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화된 경우에만 작동합니다. 
:::

:::note
  
현재 뷰가 'Tree' 모드의 Timeline이 아닐 경우, 이 메서드는 아무 효과가 없습니다. 
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
