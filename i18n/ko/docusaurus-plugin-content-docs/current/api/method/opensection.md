---
sidebar_label: "openSection"
title: "openSection method"
description: "현재 활성화된 뷰 내에서 특정 섹션을 엽니다 (활성 뷰가 'Tree' 모드의 Timeline인 경우에만 작동하며, 그렇지 않으면 메서드는 무시됩니다)"
---

# openSection

### Description

@short: 현재 활성화된 뷰 내에서 특정 섹션을 엽니다 (활성 뷰가 'Tree' 모드의 Timeline인 경우에만 작동하며, 그렇지 않으면 메서드는 무시됩니다)

@signature: openSection: (section_id: string) =\> void

### Parameters

- `section_id` - (required) *string* - 열고자 하는 섹션의 ID

### Example

~~~jsx
scheduler.createTimelineView({
    name:    "timeline",
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
scheduler.openSection("managers");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드를 사용하려면 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)
