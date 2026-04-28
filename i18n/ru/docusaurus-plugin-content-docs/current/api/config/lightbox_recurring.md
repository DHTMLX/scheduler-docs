---
sidebar_label: lightbox_recurring
title: "конфигурация lightbox_recurring"
description: "определяет поведение lightbox, когда пользователь открывает lightbox для редактирования повторяющегося события"
---

# lightbox_recurring

### Description

@short: Определяет поведение lightbox, когда пользователь открывает lightbox для редактирования повторяющегося события

@signature: lightbox_recurring: string

### Parameters

- `ask | instance | series` - (required) *string* <br> <b>ask:</b> перед открытием lightbox появляется окно сообщения, которое уведомляет пользователя и спрашивает, будет ли он редактировать конкретный экземпляр или всё повторяющееся событие. <br> <b>instance:</b> lightbox открывается сразу для редактирования конкретного экземпляра события. <br> <b>series:</b> lightbox открывается сразу для редактирования всего повторяющегося события.


### Example

~~~jsx
scheduler.config.lightbox_recurring = 'series';
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Значение по умолчанию:** 'ask'

### Details

:::note
 Свойство требует включённого расширения [recurring](guides/extensions-list.md#recurring). 
:::

Эта опция доступна с версии 3.5.
