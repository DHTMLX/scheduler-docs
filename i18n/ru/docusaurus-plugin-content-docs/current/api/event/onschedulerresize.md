---
sidebar_label: onSchedulerResize
title: "onSchedulerResize событие"
description: "срабатывает до изменения размера планировщика"
---

# onSchedulerResize

### Description

@short: Срабатывает до изменения размера планировщика

@signature: onSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerResize", function(){
    // любая ваша логика здесь
});
~~~

### Details

Событие информирует о том, что размер планировщика был изменён, и область данных нуждается в перерисовке. Обычно вам не нужно обращать внимание на это событие: оно может быть полезно только если вы создаёте пользовательский вид.