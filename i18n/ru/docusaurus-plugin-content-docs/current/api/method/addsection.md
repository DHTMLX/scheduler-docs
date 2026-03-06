---
sidebar_label: "addSection"
title: "addSection method"
description: "добавляет новый section в текущий активный view"
---

# addSection
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Добавляет новый section в текущий активный view

@signature: addSection: (section: any, parent_id: string) =\> boolean

### Parameters

- `section` - (required) *object* - объект section, который нужно добавить
- `parent_id` - (required) *string* - id родительского section; используйте 'null' чтобы добавить section на корневом уровне

### Returns
- ` isSuccess` - (boolean) - возвращает 'true', если section успешно добавлен, иначе 'false' (например, если указан неверный parent_id)

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
 Метод требует включения плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если текущий view не является Timeline в режиме 'Tree', метод не окажет никакого эффекта.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [deleteAllSections](api/method/deleteallsections.md)
