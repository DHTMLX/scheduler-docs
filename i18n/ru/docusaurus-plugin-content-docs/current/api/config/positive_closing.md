---
sidebar_label: positive_closing
title: "positive_closing config"
description: "определяет поведение 'saving' в случае, когда пользователь редактирует текст события напрямую в окне события"
---

# positive_closing

### Description

@short: Определяет поведение 'saving' в случае, когда пользователь редактирует текст события непосредственно в окне события

@signature: positive_closing: boolean

### Example

~~~jsx
scheduler.config.positive_closing = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** false

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

Щелчок по кнопке редактирования на панели выбора открывает форму редактирования текста события.
Любой клик за пределами формы закрывает её и отменяет изменения. Чтобы предотвратить это и сохранить изменения, внесённые в форму, установите опцию в *true*.

![positiveClosing_property](/img/positiveClosing_property.png)