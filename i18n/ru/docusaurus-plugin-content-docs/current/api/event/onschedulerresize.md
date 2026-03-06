---
sidebar_label: "onSchedulerResize"
title: "onSchedulerResize event"
description: "Срабатывает непосредственно перед изменением размера scheduler-а"
---

# onSchedulerResize

### Description

@short: Срабатывает непосредственно перед изменением размера scheduler-а

@signature: onSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerResize", function(){
      //любая ваша логика здесь
});
~~~

### Details

Это событие уведомляет, что размер scheduler-а был изменён, и область с данными требует перерисовки. Обычно нет необходимости обрабатывать это событие, если вы не работаете с кастомным видом.
