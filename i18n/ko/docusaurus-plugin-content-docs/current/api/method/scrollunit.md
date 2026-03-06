---
sidebar_label: "scrollUnit"
title: "scrollUnit method"
description: "Units 뷰에서 지정된 단위 수만큼 스크롤합니다."
---

# scrollUnit
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Units 뷰에서 지정된 단위 수만큼 스크롤합니다.

@signature: scrollUnit: (step: number) =\> void

### Parameters

- `step` - (required) *number* - 스크롤할 단위 수 (<i>양수 값을 사용하면 오른쪽으로, 음수 값을 사용하면 왼쪽으로 스크롤합니다</i>).

### Example

~~~jsx
scheduler.scrollUnit(5);  // 오른쪽으로 5 단위 스크롤
...
scheduler.scrollUnit(-5); // 왼쪽으로 5 단위 스크롤
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 이 메서드는 [units](guides/extensions-list.md#units) 플러그인이 활성화되어 있어야 합니다. 
:::
