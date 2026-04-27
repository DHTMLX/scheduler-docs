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
    scheduler.init('scheduler_here',new Date(2027,5,30),"day");
    ...
<script>
~~~

[Сенсорный планировщик](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)

После включения расширения планировщик автоматически заменяет стандартные кнопки кнопками большого размера:

![quick_info_extension.png](/img/quick_info_extension.png)

## Настройка и кастомизация планировщика с крупными кнопками

Существует несколько API, которые позволяют настроить или изменить работу планировщика с крупными кнопками:

- **3 шаблона**

- [quick_info_content](api/template/quick_info_content.md) - задает содержимое всплывающей формы редактирования
- [quick_info_date](api/template/quick_info_date.md) - задает дату всплывающей формы редактирования
- [quick_info_title](api/template/quick_info_title.md) - задает заголовок всплывающей формы редактирования


- **1 параметр конфигурации**

- [quick_info_detached](api/config/quick_info_detached.md) - определяет, будет ли форма события появляться слева/справа от экрана или рядом с выбранным событием

- **2 метода**

- [hideQuickInfo](api/method/hidequickinfo.md) - скрывает всплывающую форму редактирования события (если она в данный момент активна)
- [showQuickInfo](api/method/showquickinfo.md) - отображает всплывающую форму редактирования события для указанного события