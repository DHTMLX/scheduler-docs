---
title: "Разметка Scheduler"
sidebar_label: "Разметка Scheduler"
---

# Разметка Scheduler

Вот как выглядит стандартная разметка для планировщика:

~~~html
<div id="scheduler_here" class="dhx_cal_container">
    <div class="dhx_cal_navline">
        <div class="dhx_cal_prev_button">&nbsp;</div>
        <div class="dhx_cal_next_button">&nbsp;</div>
        <div class="dhx_cal_today_button"></div>
        <div class="dhx_cal_date"></div>
        <div class="dhx_cal_tab" data-tab="day"></div>
        <div class="dhx_cal_tab" data-tab="week"></div>
        <div class="dhx_cal_tab" data-tab="month"></div>
       </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>       
</div>
~~~

![markup](/img/markup.png)

## Расположение вкладок {#tabs-positioning}

Начиная с версии 7.0, элемент **.dhx_cal_navline** использует flex-верстку, а порядок вкладок определяется с помощью CSS-свойства **order**.

### Версии 6.0 и ниже

#### Стандартная ('terrace') тема

В стандартной ('terrace') теме CSS-свойства типа игнорируются при позиционировании вкладок. Вместо этого вкладки размещаются согласно внутренним правилам планировщика: стандартные представления отображаются как сегментированная группа кнопок слева, а дополнительные представления - как отдельные кнопки справа.

Чтобы вручную управлять расположением вкладок (например, прямо в разметке), установите параметр [fix_tab_position](api/config/fix_tab_position.md) в *false*, чтобы отключить стандартное поведение позиционирования, а затем задайте координаты вкладок с помощью CSS:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

Для создания эффекта сегментированных кнопок можно использовать следующие CSS-классы:

- **dhx_cal_tab_last** - скругляет правую границу
- **dhx_cal_tab_first** - скругляет левую границу
- **dhx_cal_tab_standalone** - скругляет обе границы

Например, чтобы вручную создать сегментированную группу 'day'-'week'-'month' в стандартной теме, используйте такую разметку:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day"></div>
<div class="dhx_cal_tab" data-tab="week"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month"></div>
~~~


## Добавление и удаление вкладок представлений {#addingdeletingviewstabs}

### Добавление вкладки

Чтобы добавить новую вкладку в заголовок, просто добавьте div с классом **"dhx_cal_tab"** внутрь элемента **"dhx_cal_navline"**:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

Атрибут **data-tab** указывает представление, которое откроется при клике по вкладке, используя формат **(viewName)**.

:::note
Обратите внимание, что к вкладке можно добавить несколько CSS-классов, однако класс **"dhx_cal_tab"** всегда должен быть первым.
:::

### Удаление вкладки

Чтобы удалить вкладку из заголовка, просто удалите соответствующий div из разметки:

~~~js title="Удаление вкладки 'month' из заголовка"
~~~html
<div class="dhx_cal_navline">
  ...
  <div class="dhx_cal_tab" data-tab="day"></div>
  <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
Удаление вкладки из разметки не отключает само представление; к нему по-прежнему можно получить доступ программно с помощью методов [setCurrentView](api/method/setcurrentview.md) и [updateView](api/method/updateview.md).
:::


## Скрытие навигационных кнопок {#hidingthenavigationbuttons}

Чтобы скрыть навигационные кнопки в заголовке планировщика, примените *'display:none'* к соответствующим div следующим образом:

~~~js title="Скрытие навигационных кнопок в заголовке"
<style>
  .dhx_cal_prev_button, .dhx_cal_next_button{
  display:none;
  }
</style>

<div id="scheduler_here" class="dhx_cal_container">
  <div class="dhx_cal_navline">
  <div class="dhx_cal_prev_button">&nbsp;</div>
  <div class="dhx_cal_next_button">&nbsp;</div>
  <div class="dhx_cal_today_button"></div>
  ...
  </div>
  <div class="dhx_cal_header"></div>
  <div class="dhx_cal_data"></div> 
</div>
~~~


## Скрытие заголовка планировщика {#hidingtheheaderofscheduler}

Чтобы скрыть весь заголовок планировщика, задайте *'display:none'* для navline:

~~~html
<style>
  .dhx_cal_navline{
  display:none;
  }
</style>

~~~
