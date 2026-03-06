---
sidebar_label: "positive_closing"
title: "positive_closing config"
description: "управляет поведением сохранения при прямом редактировании текста события внутри его блока"
---

# positive_closing

### Description

@short: Управляет поведением сохранения при прямом редактировании текста события внутри его блока

@signature: positive_closing: boolean

### Example

~~~jsx
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here', new Date(2013,05,11), "week");
~~~

**Default value:** false

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Нажатие кнопки редактирования в select bar открывает форму для редактирования текста события. Обычно, клик вне формы закрывает её и отменяет все изменения. Установка этой опции в *true* гарантирует, что изменения сохранятся вместо отмены при клике вне формы.

![positiveClosing_property](/img/positiveClosing_property.png)
