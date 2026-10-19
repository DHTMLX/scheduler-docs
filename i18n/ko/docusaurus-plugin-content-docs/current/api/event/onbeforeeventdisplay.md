---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay event"
description: "filters events before rendering"
---

# onBeforeEventDisplay

@short: 이벤트 렌더링 전에 호출됩니다. 이벤트를 숨기려면 `false`를 반환하세요. 모든 핸들러가 `true`를 반환해야 합니다.

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

이벤트 렌더링 전에 호출됩니다. 이벤트를 숨기려면 `false`를 반환하세요. 모든 핸들러가 `true`를 반환해야 합니다.

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){ return true; });
~~~