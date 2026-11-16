---
sidebar_label: getLayoutSize
title: "Метод getLayoutSize"
description: Возвращает размер видимого макета Scheduler
---

# getLayoutSize

### Описание

@short: Возвращает размер видимой оболочки макета

@signature: getLayoutSize(): LayoutSize | null

### Возвращаемое значение

- `size` - (LayoutSize | null) - размер видимой оболочки `{ width, height }` или `null`, если видимой оболочки макета нет

### Пример

~~~js
const size = scheduler.getLayoutSize();
if (size && size.width < 600) {
  scheduler.config.header = compactHeader;
}
~~~

### Детали

Возвращает `{ width, height }`, измеренные по целочисленным `clientWidth` и `clientHeight` оболочки. Метод доступен, когда Toolbar или Sidebar создает видимую оболочку, и возвращает `null`, если плагин макета не активен либо оболочка отсоединена или скрыта.

См. [Toolbar](guides/toolbar.md) и [Sidebar](guides/sidebar.md).
