---
sidebar_label: day_column_padding
title: "day_column_padding конфигурация"
description: "добавляет отступ к столбцу вида"
---

# day_column_padding

### Description

@short: Добавляет отступ к колонке представления

@signature: day_column_padding: number

### Example

~~~jsx
scheduler.config.day_column_padding = 20;
~~~

**Значение по умолчанию:** 8

### Details

События могут занимать всю ширину столбцов вида. Настройка `day_column_padding` ограничивает максимальную ширину, которую события могут занимать внутри ячеек. Это обеспечивает наличие свободного пространства по бокам столбца, позволяя пользователям создавать новые события двойным щелчком по этим пустым областям.

**Отключённый отступ**
~~~
scheduler.config.day_column_padding = 0;
~~~

![Scheduler - без отступа в дневных столбцах](/img/day_column_padding_none.png)


**Включённый отступ**
~~~
scheduler.config.day_column_padding = 8;
~~~
![Scheduler - отступ внутри дневных столбцов](/img/day_column_padding_set.png)

### Change log
- добавлен в версии 7.0