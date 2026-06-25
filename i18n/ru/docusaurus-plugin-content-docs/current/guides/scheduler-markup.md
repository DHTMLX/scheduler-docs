---
title: "Разметка Scheduler"
sidebar_label: "Разметка Scheduler"
---

# Разметка Scheduler

Стандартная разметка планировщика выглядит так:

~~~html
<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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

![разметка](/img/markup.png)

## Позиционирование вкладок

Начиная с версии v7.0, элемент **.dhx_cal_navline** является flex-контейнером, и вкладки размещаются согласно стилю **order**.

### Версии 6.0 и более старые

#### По умолчанию ('террасная') тема

Изначально тема по умолчанию ('террасная') игнорирует CSS-свойства, используемые для задания положения вкладки (например, `style="right:204px;"`) и размещает вкладку согласно своей логике: стандартные представления отображаются как сегментированная кнопка слева, а дополнительные представления размещаются как отдельные кнопки справа.

Чтобы задать положение вручную (например, в разметке), установите параметр [fix_tab_position](api/config/fix_tab_position.md) в *false*, чтобы отключить поведение по умолчанию, и задавайте координаты с помощью CSS-свойств:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

Обратите внимание, что можно использовать следующие CSS-классы для создания сегментированной кнопки:

- **dhx_cal_tab_last** - делает правую границу скругленной
- **dhx_cal_tab_first** - делает левую границу скругленной
- **dhx_cal_tab_standalone** - делает обе границы скругленными


Например, чтобы вручную установить сегментированную кнопку 'day'-'week'-'month' в теме по умолчанию, можно указать разметку как показано:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day" style="left:14px;"></div>
<div class="dhx_cal_tab" data-tab="week"  style="left: 75px;"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month" style="left:136px"></div>
~~~


## Добавление/удаление вкладок представлений

### Добавление вкладки

Чтобы добавить новую вкладку в заголовок, добавьте div с классом **"dhx_cal_tab"** в качестве дочернего узла элемента **"dhx_cal_navline"**:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

Определяемое вкладкой представление, которое откроется по клику, задается атрибутом **data-tab** и указывается как **(viewName)**.

:::note
Обратите внимание, у вкладки может быть несколько применяемых CSS-классов, но класс **"dhx_cal_tab"** должен идти первым.
:::

### Удаление вкладки

Чтобы удалить вкладку из заголовка, удалите соответствующий div из разметки:

Удаление вкладки 'month' из заголовка:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
Даже если вкладка удалена, связанное представление по-прежнему доступно программно с помощью методов [setCurrentView](api/method/setcurrentview.md) и [updateView](api/method/updateview.md).
:::


## Скрытие кнопок навигации

Чтобы скрыть кнопки навигации в заголовке планировщика, установите стиль *'display:none'* для соответствующих div, как показано:

Скрытие кнопок навигации в заголовке:
~~~html
<style>
    .dhx_cal_prev_button, .dhx_cal_next_button{
        display:none;
    }
</style>

<div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
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


## Скрытие заголовка планировщика

Чтобы скрыть весь заголовок планировщика, установите *'display:none'*: 

~~~html
<style>
    .dhx_cal_navline{
        display:none;
    }
</style>

~~~