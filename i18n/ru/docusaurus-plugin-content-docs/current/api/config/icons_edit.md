---
sidebar_label: icons_edit
title: "конфигурация icons_edit"
description: "хранит коллекцию иконок, видимых в боковом меню редактирования блока события"
---

# icons_edit

### Description

@short: Хранит коллекцию иконок, видимых в боковом меню редактирования блока события

@signature: icons_edit: any[]

### Example

~~~jsx
scheduler.config.icons_edit = ['icon_custom', 'icon_save', 'icon_cancel'];
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Значение по умолчанию:** ['icon_save', 'icon_cancel']

**Доступные представления:** [День](views/day.md), [Неделя](views/week.md), [Единицы](views/units.md)

### Details

![iconsSelect_property](/img/iconsSelect_property.png)

### Related API
- [icons_select](api/config/icons_select.md)

### Related Guides
- [Настройка панелей 'Select' и 'Edit'](guides/customizing-edit-select-bars.md)