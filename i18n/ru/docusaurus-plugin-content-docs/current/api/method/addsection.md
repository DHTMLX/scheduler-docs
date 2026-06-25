---
sidebar_label: addSection
title: "метод addSection"
description: "добавляет секцию в текущее активное представление"
---

# addSection

:::info
 Эта функциональность доступна только в PRO-версии.
 :::

### Description

@short: Добавляет секцию в текущее активное представление

@signature: addSection: (section: any, parent_id: string) =\> boolean

### Parameters

- `section` - (required) *object* - объект секции, которую нужно добавить
- `parent_id` - (required) *string* - id родительской секции. Укажите 'null', если добавляете секцию в корень

### Returns
- `isSuccess` - (boolean) - возвращает 'true', если секция была успешно добавлена, и 'false' в других случаях (например, указан неверный parent_id).

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

**Доступные представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Методу требуется активированный плагин [treetimeline](guides/extensions-list.md#treetimeline).
 :::

:::note

Если открытое представление не является Timeline в режиме 'Tree', метод будет проигнорирован.
 
:::

### Related API
- [deleteSection](api/method/deletesection.md)
- [deleteAllSections](api/method/deleteallsections.md)