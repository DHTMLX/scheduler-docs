---
sidebar_label: "markCalendar"
title: "markCalendar method"
description: "добавляет CSS класс к конкретной дате"
---

# markCalendar

### Description

@short: Добавляет CSS класс к конкретной дате

@signature: markCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - экземпляр календаря
- `date` - (required) *Date* - дата для выделения
- `css` - (required) *string* - имя CSS класса для применения

### Example

~~~jsx
<style>
my_style{
    color:red !important;//используйте ключевое слово 'important', чтобы гарантировать применение стиля к дате
}                        // 
</style>
<script>
    // Существует два способа получить объект календаря:

    // создав мини-календарь
    var calendar = scheduler.renderCalendar({...});

    // или выбрав элемент контейнера мини-календаря
    var calendar = document.querySelector(".dhx_mini_calendar");
    
    ...
    scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
</script>
~~~

### Details

:::note
 Метод требует включения плагина [minical](guides/extensions-list.md#minicalendardatepicker). 
:::

:::note

Учтите, что этот метод работает только с мини-календарём, а не с самим scheduler.
 
:::

### Related API
- [unmarkCalendar](api/method/unmarkcalendar.md)

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
