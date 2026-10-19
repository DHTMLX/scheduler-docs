---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay событие"
description: "фильтрует события перед отрисовкой"
---

# onBeforeEventDisplay

@short: Событие вызывается перед отрисовкой. Верните `false`, чтобы скрыть событие; все обработчики должны вернуть `true`.

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

Событие вызывается перед отрисовкой. Верните `false`, чтобы скрыть событие; все обработчики должны вернуть `true`.

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){ return true; });
~~~