---
sidebar_label: preserve_scroll
title: "конфигурация preserve_scroll"
description: "отменяет сохранение текущей позиции прокрутки при переходе между датами одного и того же представления"
---

# preserve_scroll

### Description

@short: Отменяет сохранение текущей позиции прокрутки при переходе между датами одного и того же представления

@signature: preserve_scroll: boolean

### Example

~~~jsx
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

- Свойство доступно начиная с версии 3.0.
- Свойство относится к случаям, когда пользователь переходит к датам отображения <br> через эту панель навигации -> ![navigation_panel](/img/navigation_panel.png).