---
sidebar_label: "addSection"
title: "addSection method"
description: "현재 활성화된 뷰에 새 섹션을 추가합니다."
---

# addSection
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 활성화된 뷰에 새 섹션을 추가합니다.

@signature: addSection: (section: any, parent_id: string) =\> boolean

### Parameters

- `section` - (required) *object* - 추가할 섹션 객체입니다.
- `parent_id` - (required) *string* - 부모 섹션의 ID입니다; 루트 레벨에 섹션을 추가하려면 'null'을 사용하세요.

### Returns
- ` isSuccess` - (boolean) - 섹션이 성공적으로 추가되면 'true'를 반환하며, 그렇지 않으면(예: 유효하지 않은 parent_id가 제공된 경우) 'false'를 반환합니다.

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

scheduler.addSection( {key:1, label:"James Smith"}, "p1");
scheduler.addSection( {key:2, label:"Alex White"}, "sales");
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드를 사용하려면 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

현재 뷰가 'Tree' 모드의 Timeline이 아니면, 이 메서드는 아무 효과가 없습니다.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [deleteAllSections](api/method/deleteallsections.md)
