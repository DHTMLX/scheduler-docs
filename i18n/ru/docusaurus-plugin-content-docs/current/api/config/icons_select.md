---
sidebar_label: icons_select
title: "icons_select конфигурация"
description: "хранит коллекцию иконок, отображаемых в боковом меню выбора в окне события"
---

# icons_select

### Description

@short: Хранит коллекцию иконок, видимых в боковом меню выбора в окне события

@signature: icons_select: any[]

### Example

~~~jsx
scheduler.config.icons_select = ['icon_details', 'icon_delete'];
...
scheduler.init('scheduler_here', new Date(2027, 0, 10), "week");
~~~

**Значение по умолчанию:** ['icon_details', 'icon_edit', 'icon_delete']

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Пользовательская коробка события](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

![iconsSelect_property](/img/iconsSelect_property.png)

### Related API
- [icons_edit](api/config/icons_edit.md)

### Related Guides
- [Настройка панелей 'Select' и 'Edit'](guides/customizing-edit-select-bars.md)