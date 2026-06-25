---
sidebar_label: deleteSection
title: "deleteSection method"
description: "удаляет раздел из текущего активного вида"
---

# deleteSection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Удаляет раздел из текущего активного вида

@signature: deleteSection: (section_id: string) =\> boolean

### Parameters

- `section_id` - (обязательно) *string* - идентификатор раздела

### Returns
- ` isSuccess` - (boolean) - возвращает true, если раздел был удалён успешно и false в других случаях (например, если указан неверный раздел).

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

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Метод требует активированного плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если открытое представление не Timeline в режиме 'Tree', метод будет проигнорирован.
 
:::

### Related API
- [deleteAllSections](api/method/deleteallsections.md)
- [addSection](api/method/addsection.md)