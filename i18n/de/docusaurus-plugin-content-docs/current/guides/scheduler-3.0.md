---
title: "Migration zur Scheduler 3.0"
sidebar_label: "Migration zur Scheduler 3.0"
---

# Migration zur Scheduler 3.0 

:::note
Es sind keine Änderungen erforderlich, um die aktuelle Scheduler-Version weiterhin zu verwenden. Der unten gezeigte Code funktioniert auch mit Scheduler 2.3, wird jedoch in Scheduler 3.0 nicht mehr unterstützt.
:::

Einige interne Methoden, die zuvor zugänglich waren, stehen in Scheduler 3.0 nicht mehr zur Verfügung.


### Lightbox zurücksetzen

~~~js 
    scheduler._lightbox = null;

~~~

->

~~~js 
    //2.3+
    scheduler.resetLightbox();

~~~


### Aktueller Zustand

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
