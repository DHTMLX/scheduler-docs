---
sidebar_label: "delay_render"
title: "delay_render config"
description: "устанавливает таймаут (в миллисекундах), который оборачивает вызовы [updateView](api/method/updateview.md) и [setCurrentView](api/method/setcurrentview.md) (которые запускают перерисовку scheduler)"
---

# delay_render

### Description

@short: Устанавливает таймаут (в миллисекундах), который оборачивает вызовы [updateView](api/method/updateview.md) и [setCurrentView](api/method/setcurrentview.md) (которые запускают перерисовку scheduler)

@signature: delay_render: number

### Example

~~~jsx
scheduler.config.delay_render = 30;

scheduler.init("scheduler_here");
~~~

### Details

:::note

Эта опция может помочь улучшить производительность.
 
:::

:::note

Чтобы гарантировать выполнение команды только после фактической перерисовки, помещайте её внутри callback-функции события [onViewChange](api/event/onviewchange.md).
 
:::

Значение по умолчанию - 0.

Многие конфигурации scheduler требуют перерисовки. При работе со сложной настройкой у вас может быть несколько функций, каждая из которых обновляет определённые параметры и вызывает обновление scheduler для применения изменений. Частые перерисовки могут замедлить работу вашего приложения.

Опция **delay_render** помогает уменьшить количество перерисовок.

<br>

Например, если вы установите <code>scheduler.config.delay_render = 30;</code>, при каждом запросе на перерисовку scheduler поставит вызов в очередь и будет ждать 30 миллисекунд.
Если в это время поступит ещё один запрос на перерисовку, таймер сбросится и будет ждать ещё 30 мс.
В итоге, если [updateView](api/method/updateview.md) и/или [setCurrentView](api/method/setcurrentview.md) вызываются несколько раз подряд
(что часто происходит, когда перерисовки запускаются из разных частей кастомного кода), выполнится только последний вызов.
