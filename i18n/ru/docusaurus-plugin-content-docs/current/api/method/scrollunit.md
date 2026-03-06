---
sidebar_label: "scrollUnit"
title: "scrollUnit method"
description: "прокручивает указанное количество единиц в представлении Units"
---

# scrollUnit
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Прокручивает указанное количество единиц в представлении Units

@signature: scrollUnit: (step: number) =\> void

### Parameters

- `step` - (required) *number* - количество единиц для прокрутки (<i>используйте положительное значение для прокрутки единиц вправо <br> и отрицательное значение для прокрутки влево</i>).

### Example

~~~jsx
scheduler.scrollUnit(5);  //прокручивает 5 единиц вправо
...
scheduler.scrollUnit(-5); // прокручивает 5 единиц влево
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 Для работы метода требуется активировать плагин [units](guides/extensions-list.md#units). 
:::
