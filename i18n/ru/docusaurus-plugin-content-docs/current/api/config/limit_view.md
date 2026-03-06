---
sidebar_label: "limit_view"
title: "limit_view config"
description: "ограничивает диапазон дат, в пределах которого пользователи могут просматривать события"
---

# limit_view

### Description

@short: Ограничивает диапазон дат, в пределах которого пользователи могут просматривать события

@signature: limit_view: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2022,5,17),"week");
...
scheduler.config.limit_view  = true;
~~~

**Default value:** false

### Details

Например, установка ограничения на 2023 год означает, что пользователи не смогут перейти к 2022 году - будут доступны только даты в пределах 2023 года.

Если также заданы настройки **limit_start/limit_end** для ограничения периода создания новых событий, то **limit_view** предотвратит просмотр событий за пределами этого разрешённого диапазона дат.

~~~js
scheduler.config.limit_start = new Date(2022,5,15);
scheduler.config.limit_end = new Date(2022,6,15);
scheduler.config.limit_view  = true;
~~~

С такой конфигурацией события можно создавать только с 15 июня по 15 июля, и навигация по календарю также ограничена этими датами.

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_end](api/config/limit_end.md)

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
