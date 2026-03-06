---
sidebar_label: "closeAllSections"
title: "closeAllSections method"
description: "현재 활성화된 뷰에서 모든 섹션을 닫습니다."
---

# closeAllSections
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 활성화된 뷰에서 모든 섹션을 닫습니다.

@signature: closeAllSections: () =\> void

### Example

~~~jsx
scheduler.closeAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드는 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화된 경우에만 작동합니다. 
:::

:::note

활성 뷰가 '트리' 모드의 Timeline이 아닌 경우, 이 메서드는 아무런 효과가 없습니다.
 
:::

### Related API
- [closeSection](api/method/closesection.md)
- [openAllSections](api/method/openallsections.md)
- [openSection](api/method/opensection.md)
