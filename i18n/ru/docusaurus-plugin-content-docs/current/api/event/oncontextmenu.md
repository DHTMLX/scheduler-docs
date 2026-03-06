---
sidebar_label: "onContextMenu"
title: "onContextMenu event"
description: "срабатывает, когда пользователь открывает контекстное меню, кликая правой кнопкой мыши внутри scheduler"
---

# onContextMenu

### Description

@short: Срабатывает, когда пользователь открывает контекстное меню, кликая правой кнопкой мыши внутри scheduler

@signature: onContextMenu: (id: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - id события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onContextMenu", function (id, e){
    //здесь можно добавить кастомную логику
});
~~~

### Related samples
- 10_integration/01_dhtmlxMenu.html

### Details

когда пользователь кликает правой кнопкой мыши по событию, обработчик получает id этого события; если клик был не по событию, передается null.
