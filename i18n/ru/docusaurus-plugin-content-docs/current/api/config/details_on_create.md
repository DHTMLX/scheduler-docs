---
sidebar_label: details_on_create
title: "details_on_create config"
description: "Позволяет использовать расширенную форму при создании новых событий путем перетаскивания или двойного клика."
---

# details_on_create

### Description

@short: 'использовать расширенную форму при создании новых событий перетаскиванием или двойным щелчком'

@signature: details_on_create: boolean

### Example

~~~jsx
scheduler.config.details_on_create=true;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Значение по умолчанию:** true

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Пользовательский редактор в lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/05_custom_editor.html)
- [События на весь день](https://docs.dhtmlx.com/scheduler/samples/02_customization/12_full_day_event.html)

### Change log
- Значение по умолчанию изменено на `true` в версии v7.0