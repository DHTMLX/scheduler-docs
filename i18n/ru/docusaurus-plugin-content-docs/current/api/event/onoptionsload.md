---
sidebar_label: onOptionsLoad
title: "событие onOptionsLoad"
description: "срабатывает после обновления секций вида Timeline/Units"
---

# onOptionsLoad

### Description

@short: Срабатывает после обновления секций вида Timeline/Units

@signature: onOptionsLoad: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoad", function (){
    //any custom logic here
});
~~~

### Details

Когда это событие срабатывает, происходят следующие действия:

- Timeline/Unit view пересчитывает видимые секции на основе текущего значения свойства [y_unit](views/timeline.md#initialization) или [list](views/units.md#initialization) соответственно;
- [scheduler.resetLightbox](api/method/resetlightbox.md) вызывается;
- [scheduler.setCurrentView](api/method/setcurrentview.md) вызывается.

Событие срабатывает в нескольких случаях:

- При инициализации вида Timeline/Units, когда секции разбираются впервые;
- Когда секции загружаются с данными через [data](guides/data-formats.md);
- При каждом вызове [scheduler.updateCollection](api/method/updatecollection.md).