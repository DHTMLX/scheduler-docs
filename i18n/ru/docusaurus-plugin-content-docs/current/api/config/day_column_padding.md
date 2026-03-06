---
sidebar_label: "day_column_padding"
title: "day_column_padding config"
description: "добавляет padding к колонке представления"
---

# day_column_padding

### Description

@short: Добавляет padding к колонке представления

@signature: day_column_padding: number

### Example

~~~jsx
scheduler.config.day_column_padding = 20;
~~~

**Default value:** 8

### Details

События могут растягиваться на всю ширину колонок представления. Настройка `day_column_padding` ограничивает максимальную ширину, которую события могут занимать внутри каждой ячейки. Таким образом, по бокам колонки всегда остаётся некоторое пустое пространство, что позволяет пользователям создавать новые события, двойным кликом по этим пустым зонам.

**Отключённый padding**
~~~
scheduler.config.day_column_padding = 0;
~~~

![Scheduler - no padding in day columns](/img/day_column_padding_none.png)


**Включённый padding**
~~~
scheduler.config.day_column_padding = 8;
~~~
![Scheduler - padding inside day columns](/img/day_column_padding_set.png)

### Change log
- added in v7.0
