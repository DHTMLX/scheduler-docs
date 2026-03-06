---
sidebar_label: "deleteSection"
title: "deleteSection method"
description: "удаляет секцию из текущего активного вида"
---

# deleteSection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Удаляет секцию из текущего активного вида

@signature: deleteSection: (section_id: string) =\> boolean

### Parameters

- `section_id` - (required) *string* - идентификатор секции

### Returns
- ` isSuccess` - (boolean) - возвращает true, если секция была успешно удалена, false в противном случае (например, если ID секции некорректен).

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
 Для работы метода необходимо включить плагин [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если текущий вид не является Timeline в режиме 'Tree', метод не окажет никакого эффекта.
 
:::

### Related API
- [deleteAllSections](api/method/deleteallsections.md)
- [addSection](api/method/addsection.md)
