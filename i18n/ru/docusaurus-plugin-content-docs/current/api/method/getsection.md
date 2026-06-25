---
sidebar_label: getSection
title: "getSection method"
description: "возвращает объект указанного раздела в текущем активном представлении"
---

# getSection
:::info
 Эта функциональность доступна только в версии PRO. 
:::
### Description

@short: Возвращает объект указанного раздела в текущем активном представлении

@signature: getSection: (section_id: string) =\> any

### Parameters

- `section_id` - (required) *string* - идентификатор раздела

### Returns
- ` section` - (object) - объект секции

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

**Применимые представления:** [Timeline view](views/timeline.md)

### Details

:::note
 Этот метод требует активированного плагина [treetimeline](guides/extensions-list.md#treetimeline). 
:::

:::note

Если открытое представление не является Timeline в режиме 'Tree', метод будет проигнорирован.
 
:::

### Related API
- [openSection](api/method/opensection.md)
- [closeAllSections](api/method/closeallsections.md)
- [openAllSections](api/method/openallsections.md)