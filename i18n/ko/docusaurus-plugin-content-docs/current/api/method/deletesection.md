---
sidebar_label: "deleteSection"
title: "deleteSection method"
description: "현재 활성화된 뷰에서 섹션을 제거합니다."
---

# deleteSection
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 활성화된 뷰에서 섹션을 제거합니다.

@signature: deleteSection: (section_id: string) =\> boolean

### Parameters

- `section_id` - (required) *string* - 제거할 섹션의 식별자입니다.

### Returns
- ` isSuccess` - (boolean) - 섹션이 성공적으로 제거되면 true를 반환하며, 그렇지 않으면 false를 반환합니다(예: 섹션 ID가 유효하지 않은 경우).

### Example

~~~jsx
scheduler.createTimelineView({
    name:   "timeline",
    render:"tree",
    ...
    y_unit:[
        {key:"production", label:"Production Department", children:[
            {key:"p1", label:"Managers", children:[
                {key:"pm1", label:"John Williams"},
                {key:"pm2", label:"David Miller"}
            ]}
        ]},
        {key:"sales", label:"Sales and Marketing", children:[
            {key:"s1", label:"Kate Moss"},
            {key:"s2", label:"Dian Fossey"}
        ]}
    ]
}); 
...
scheduler.deleteSection("sales");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드를 사용하려면 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

현재 뷰가 'Tree' 모드의 Timeline이 아니면 이 메서드는 아무 효과가 없습니다.
 
:::

### Related API
- [deleteAllSections](api/method/deleteallsections.md)
- [addSection](api/method/addsection.md)
