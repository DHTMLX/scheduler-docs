---
sidebar_label: limit_view
title: "limit_view конфигурация"
description: "ограничивает диапазон дат, в течение которого пользователь может просматривать события"
---

# limit_view

### Description

@short: Ограничивает диапазон дат, в рамках которого пользователь может просматривать события

@signature: limit_view: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,5,17),"week");
...
scheduler.config.limit_view  = true;
~~~

**Значение по умолчанию:** false

### Details

Например, если мы установим ограничение на год 2027, перейти к году 2026 нельзя — доступен только 2027 год.

Если вы также укажите конфигурации **limit_start/limit_end**, чтобы ограничить диапазон, доступный для создания новых событий, **limit_view** не позволит вам просматривать события за пределами допустимого диапазона дат.

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

С учетом этой конфигурации вы сможете создавать события только в диапазоне между 15 июня и 15 июля, и перемещаться по календарю только в пределах этого диапазона дат.

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_end](api/config/limit_end.md)

### Related Guides
- [Blocking and Marking Dates](guides/limits.md)