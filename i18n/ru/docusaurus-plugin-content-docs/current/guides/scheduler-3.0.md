---
title: "Миграция на Scheduler 3.0"
sidebar_label: "Миграция на Scheduler 3.0"
---

# Миграция на Scheduler 3.0 

:::note
Нет необходимости вносить какие-либо изменения, чтобы продолжать использовать текущую версию scheduler. Весь код, приведённый ниже, работает в scheduler 2.3, но будет постепенно удалён в scheduler 3.0.
:::

Некоторые внутренние методы, которые ранее были доступны, не будут доступны в scheduler 3.0.

### сброс lightbox

~~~js 
    scheduler._lightbox = null;

~~~

->

~~~js 
    //2.3+
    scheduler.resetLightbox();

~~~

### текущее состояние

~~~js 
    scheduler._date
    scheduler._mode
    scheduler._min_date
    scheduler._max_date
    scheduler._editor_id
    scheduler._lightbox_id

~~~

->

~~~js 
    //2.3+
    scheduler.getState().date
    scheduler.getState().mode
    scheduler.getState().min_date
    scheduler.getState().max_date
    scheduler.getState().editor_id
    scheduler.getState().lightbox_id

~~~
