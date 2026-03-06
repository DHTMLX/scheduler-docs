---
sidebar_label: "use_select_menu_space"
title: "use_select_menu_space config"
description: "определяет, занимают ли события всю ширину ячейки"
---

# use_select_menu_space

### Description

@short: Определяет, занимают ли события всю ширину ячейки

@signature: use_select_menu_space: boolean

### Example

~~~jsx
scheduler.config.use_select_menu_space = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

По умолчанию события растягиваются на всю ширину ячейки. Установка этого параметра в *false* заставляет событие занимать только часть ширины ячейки, оставляя место для меню слева.

### Change log
- Это свойство доступно с версии 3.5.
