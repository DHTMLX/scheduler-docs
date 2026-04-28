---
sidebar_label: use_select_menu_space
title: "конфигурация use_select_menu_space"
description: "определяет, что события занимают всю ширину ячейки"
---

# use_select_menu_space

### Description

@short: Определяет, что события занимают всю ширину ячейки

@signature: use_select_menu_space: boolean

### Example

~~~jsx
scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

По умолчанию события занимают всю ширину ячейки. Установите значение *false* опции, чтобы событие занимало лишь часть ширины ячейки и оставляло место для левого меню.

### Change log
- Свойство доступно начиная с версии 3.5.