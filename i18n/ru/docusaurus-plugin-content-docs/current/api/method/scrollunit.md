--- 
sidebar_label: scrollUnit
title: "scrollUnit метод"
description: "Прокручивает указанное количество единиц в представлении Units"
---

# scrollUnit
:::info
 Эта функциональность доступна только в PRO-издании.
:::
### Description

@short: Прокручивает указанное количество единиц в представлении Units

@signature: scrollUnit: (step: number) =\> void

### Parameters

- `step` - (required) *number* - количество единиц, на которые нужно прокрутить (<i>установите положительное значение, чтобы прокрутить единицы вправо, а отрицательное — чтобы прокрутить их влево</i>).

### Example

~~~jsx
scheduler.scrollUnit(5);  //прокручивает 5 единиц вправо
...
scheduler.scrollUnit(-5); // прокручивает 5 единиц влево
~~~

**Подходящие представления:** [Units view](views/units.md)

### Details

:::note
 Методу требуется активировать плагин [units](guides/extensions-list.md#units). 
:::