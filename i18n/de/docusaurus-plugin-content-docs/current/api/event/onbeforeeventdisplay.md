---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay event"
description: "filters events before rendering"
---

# onBeforeEventDisplay

@short: Wird vor dem Rendern eines Events ausgelöst. `false` blendet das Event aus; alle Handler müssen `true` zurückgeben.

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

Wird vor dem Rendern eines Events ausgelöst. `false` blendet das Event aus; alle Handler müssen `true` zurückgeben.

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){ return true; });
~~~