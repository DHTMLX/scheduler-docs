---
sidebar_label: "responsive_lightbox"
title: "responsive_lightbox config"
description: "позволяет lightbox плавно адаптироваться под меньшие экраны"
---

# responsive_lightbox

### Description

@short: Позволяет lightbox плавно адаптироваться под меньшие экраны

@signature: responsive_lightbox: boolean

### Example

~~~jsx
scheduler.config.responsive_lightbox = true;
~~~

**Default value:** false

### Details

Включение этой опции (по умолчанию выключена) добавляет CSS класс `.dhx_cal_light_responsive` к lightbox.

Все встроенные скины scheduler содержат media queries, которые помогают lightbox корректно адаптироваться под меньшие экраны. Это означает:

- на мобильных устройствах lightbox растягивается на весь экран
- метки и элементы управления изменяют размер, чтобы правильно вписаться в экран

![lightbox_responsive](/img/lightbox_responsive.png)

Чтобы активировать эту функцию, просто установите конфигурацию так:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
