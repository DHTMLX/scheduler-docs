---
title: "Крупные кнопки для удобной навигации"
sidebar_label: "Крупные кнопки для удобной навигации"
---

# Крупные кнопки для удобной навигации

Начиная с версии 3.7, dhtmlxScheduler представляет расширение ["Quick Info"](guides/extensions-list.md#quickinfo). Эта функция позволяет заменить стандартные боковые кнопки и упрощённую форму редактирования на более крупные и удобные для пользователя элементы управления.

## Активация планировщика с крупными кнопками

Чтобы включить планировщик с крупными кнопками, просто активируйте расширение ["Quick Info"](guides/extensions-list.md#quickinfo) на вашей странице:

~~~js

<script>
    scheduler.plugins({
        quick_info: true
    });
    scheduler.init('scheduler_here',new Date(2009,5,30),"day");
    ...
<script>
~~~

[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


После активации планировщик автоматически заменит стандартные кнопки на их увеличенные версии:

![quick_info_extension.png](/img/quick_info_extension.png)

## Настройка и кастомизация планировщика с крупными кнопками

Существует несколько API, которые позволяют настроить или изменить работу планировщика с крупными кнопками:

- **3 шаблона** 

- [quick_info_content](api/template/quick_info_content.md) - управляет содержимым, отображаемым во всплывающей форме редактирования
- [quick_info_date](api/template/quick_info_date.md) - управляет датой, отображаемой во всплывающей форме редактирования
- [quick_info_title](api/template/quick_info_title.md) - управляет заголовком всплывающей формы редактирования

- **1 параметр конфигурации**


- [quick_info_detached](api/config/quick_info_detached.md) - задаёт, будет ли форма события появляться с левой/правой стороны экрана или рядом с выбранным событием


- **2 метода** 

- [hideQuickInfo](api/method/hidequickinfo.md) - скрывает всплывающую форму события, если она открыта
- [showQuickInfo](api/method/showquickinfo.md) - открывает всплывающую форму события для указанного события
