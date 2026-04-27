---
sidebar_label: markCalendar
title: "метод markCalendar"
description: "применяет CSS-класс к указанной дате"
---

# markCalendar

### Description

@short: Применяет CSS-класс к указанной дате

@signature: markCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - объект календаря
- `date` - (required) *Date* - дату, которую нужно отметить
- `css` - (required) *string* - имя CSS-класса

### Пример

~~~jsx
<style>
my_style{
    color:red !important;//используйте ключевое слово 'important', чтобы гарантировать применение стиля к дате
}
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
Метод требует включения плагина [minical](guides/extensions-list.md#mini-calendar-date-picker).
:::

:::note

Примечание: метод применяется только к мини-календарю, а не к scheduler!

:::

### Related API
- [unmarkCalendar](api/method/unmarkcalendar.md)

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)