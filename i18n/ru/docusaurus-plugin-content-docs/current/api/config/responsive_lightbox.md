---
sidebar_label: responsive_lightbox
title: "конфигурация responsive_lightbox"
description: "делает lightbox адаптивным на маленьких экранах"
---

# responsive_lightbox

### Description

@short: Делает lightbox адаптивным на маленьких экранах

@signature: responsive_lightbox: boolean

### Example

~~~jsx
scheduler.config.responsive_lightbox = true;
~~~

**Значение по умолчанию:** false

### Details

Когда эта конфигурация включена (по умолчанию она выключена), у lightbox появится дополнительный CSS-класс `.dhx_cal_light_responsive`.

Все встроенные скины планировщика имеют предопределенные медиа-запросы, которые делают lightbox адаптивным на меньших экранах, что означает, что:

- lightbox займет весь экран на мобильном устройстве
- все подписи и элементы управления должны быть подобраны по размеру к размеру экрана

![lightbox_responsive](/img/lightbox_responsive.png)

Если вы хотите включить такое поведение, можно включить конфигурацию следующим образом:

~~~js
scheduler.config.responsive_lightbox = true;
~~~

### Related Guides
- [- [Мобильный адаптивный планировщик](guides/touch-support.md)](guides/touch-support.md)