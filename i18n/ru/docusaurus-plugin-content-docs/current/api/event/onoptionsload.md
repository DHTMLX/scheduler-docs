---
sidebar_label: "onOptionsLoad"
title: "onOptionsLoad event"
description: "срабатывает после обновления частей представления Timeline/Units"
---

# onOptionsLoad

### Description

@short: Срабатывает после обновления частей представления Timeline/Units

@signature: onOptionsLoad: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoad", function (){
    //любая пользовательская логика здесь
});
~~~

### Details

Это событие вызывается в следующих случаях:

- Представление Timeline/Unit пересчитывает, какие секции видимы, основываясь на текущих настройках свойства [y_unit](views/timeline.md#initialization) или [list](views/units.md#initialization);
- Выполняется вызов [scheduler.resetLightbox](api/method/resetlightbox.md);
- Выполняется вызов [scheduler.setCurrentView](api/method/setcurrentview.md).

Вы увидите срабатывание этого события в нескольких сценариях:

- При инициализации представления Timeline/Units и первом разборе секций;
- При загрузке секций с использованием [data](guides/data-formats.md#json-with-collections);
- Каждый раз при вызове [scheduler.updateCollection](api/method/updatecollection.md).
