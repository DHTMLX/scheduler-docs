---
sidebar_label: "closeSection"
title: "closeSection method"
description: "현재 활성 뷰 내에서 특정 섹션을 닫습니다."
---

# closeSection
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 활성 뷰 내에서 특정 섹션을 닫습니다.

@signature: closeSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - 닫을 섹션의 식별자입니다.

### Example

~~~jsx
scheduler.createTimelineView({
    name:"timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"managers",     label:"Administration", children: [
            {key:1, label:"James Smith"},
            {key:2, label:"John Williams"}
        ]},
        {key:"accounts",     label:"Accounting Department", children: [
            {key:3, label:"David Miller"},
            {key:4, label:"Linda Brown"}           
        ]},
        {key:"sales",         label:"Sales and Marketing"},
        {key:"production",     label:"Production Department"}
    ]
});
...
scheduler.closeSection("managers");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드를 사용하려면 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

활성 뷰가 'Tree' 모드의 Timeline이 아니면, 이 메서드는 아무런 효과가 없습니다.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
