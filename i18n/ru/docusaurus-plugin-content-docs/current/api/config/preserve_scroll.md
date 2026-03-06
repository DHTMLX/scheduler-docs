---
sidebar_label: "preserve_scroll"
title: "preserve_scroll config"
description: "отключает сохранение текущей позиции скролла при переключении между датами в одном и том же вью"
---

# preserve_scroll

### Description

@short: Отключает сохранение текущей позиции скролла при переключении между датами в одном и том же вью

@signature: preserve_scroll: boolean

### Example

~~~jsx
scheduler.config.preserve_scroll = false;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

- Эта опция доступна начиная с версии 3.0.
- Применяется, когда пользователь изменяет даты внутри вью <br> используя navigation panel -> ![navigation_panel](/img/navigation_panel.png).
