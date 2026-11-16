---
sidebar_label: onLayoutSizeChange
title: "Событие onLayoutSizeChange"
description: Срабатывает при изменении размера видимого макета Scheduler
---

# onLayoutSizeChange

### Описание

@short: Срабатывает при изменении размера видимой оболочки макета

@signature: onLayoutSizeChange: (size: LayoutSize) => void

### Параметры

- `size` - (обязательный) *LayoutSize* - размер оболочки `{ width, height }` в целых пикселях

### Пример

~~~js
scheduler.attachEvent("onLayoutSizeChange", size => {
  scheduler.config.header = size.width < 600 ? compactHeader : wideHeader;
});
~~~

### Детали

Срабатывает в режиме видимой оболочки Toolbar или Sidebar при изменении `clientWidth` или `clientHeight`. Значение `{ width, height }` передается до согласования заголовка Toolbar, поэтому обработчик может выбрать адаптивный заголовок в той же отрисовке.

См. [Мобильный адаптивный Scheduler](guides/touch-support.md).
