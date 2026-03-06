---
sidebar_label: "openAllSections"
title: "openAllSections method"
description: "현재 활성화된 뷰에서 모든 섹션을 엽니다 (이 메서드는 뷰가 'Tree' 모드인 Timeline일 때만 작동하며, 그렇지 않으면 무시됩니다)"
---

# openAllSections

### Description

@short: 현재 활성화된 뷰에서 모든 섹션을 엽니다 (이 메서드는 뷰가 'Tree' 모드인 Timeline일 때만 작동하며, 그렇지 않으면 무시됩니다)

@signature: openAllSections: () =\> void

### Example

~~~jsx
scheduler.openAllSections();
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 메서드를 사용하려면 [treetimeline](guides/extensions-list.md#treetimeline) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

이 메서드는 오직 Tree 모드에서만 적용됩니다.
 
:::

### Related API
- [closeAllSections](api/method/closeallsections.md)
- [closeSection](api/method/closesection.md)
- [openSection](api/method/opensection.md)
