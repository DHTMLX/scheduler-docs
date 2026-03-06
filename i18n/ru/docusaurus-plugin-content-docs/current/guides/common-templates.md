---
title: "Общие шаблоны"
sidebar_label: "Общие шаблоны"
---

# Общие шаблоны

В этой статье описаны шаблоны, которые используются во всех представлениях.
Для получения подробной информации о каждом шаблоне перейдите по указанным ссылкам.

## События

Шаблоны позволяют настраивать текст и цвет событий. Подробнее см. в:

- [Пользовательское содержимое события](guides/custom-events-content.md)
- [Пользовательский цвет события](guides/custom-events-color.md#attachingadditionalcssclassestoanevent)

## Lightbox

![lightbox_templates](/img/lightbox_templates.png)

- [time_picker](api/template/time_picker.md) - выпадающий выбор времени внутри lightbox

  ~~~js
  scheduler.templates.time_picker = 
  scheduler.date.date_to_str(scheduler.config.hour_date);
  ~~~

- [lightbox_header](api/template/lightbox_header.md) - определяет заголовок lightbox

  ~~~js
  scheduler.templates.lightbox_header = function(start,end,ev){
  return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
        + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
  };
  ~~~

  где:

    **start** - (Date) начало события


    **end** - (Date) окончание события


    **event** - (object) данные события

- [event_date](api/template/event_date.md) - форматирует часть времени для даты начала и окончания события. Обычно используется другими шаблонами для отображения диапазонов времени

  ~~~js
  scheduler.templates.event_date = function(date){
  const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
  return formatFunc(date);
  }
  ~~~

  где:

    **date** - (Date) дата для форматирования

## Поддержка touch-устройств {#touch-support}

В планировщике есть расширение 'quick info' для [поддержки touch-устройств](guides/touch-support.md).

 Это расширение предоставляет три шаблона:

![touch_templates](/img/touch_templates.png)

- [quick_info_content](api/template/quick_info_content.md) - содержимое, отображаемое во всплывающей форме редактирования

  ~~~js
  scheduler.templates.quick_info_content = function(start, end, ev){ 
  return ev.details || ev.text;
  };
  ~~~

- [quick_info_date](api/template/quick_info_date.md) - дата, отображаемая во всплывающей форме редактирования

  ~~~js
  scheduler.templates.quick_info_date = function(start, end, ev){
  if (scheduler.isOneDayEvent(ev)){
  return scheduler.templates.day_date(start, end, ev) + " " +
  scheduler.templates.event_header(start, end, ev);
  }else{
  return scheduler.templates.week_date(start, end, ev);
  }
  };
  ~~~

- [quick_info_title](api/template/quick_info_title.md) - заголовок всплывающей формы редактирования

  ~~~js
  scheduler.templates.quick_info_title = function(start, end, ev){ 
  return ev.text.substr(0,50); 
  };
  ~~~

  Параметры для шаблонов поддержки touch-устройств:

    **start** - (Date) начало события 


    **end** - (Date) окончание события 


    **event** - (object) данные события

## Тултипы {#tooltips}

Тултипы могут быть добавлены к событиям в любом представлении для отображения дополнительной информации без открытия события.

Чтобы включить эту функцию, подключите расширение Tooltip на вашей странице.

~~~js
scheduler.plugins({
  tooltip: true
});
~~~

![tooltip_templates](/img/tooltip_templates.png)

- [tooltip_date_format](api/template/tooltip_date_format.md) - определяет формат даты, используемый в шаблоне текста тултипа

  ~~~js
  scheduler.templates.tooltip_date_format="function" (date){
  const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
  return formatFunc(date);
  }
  ~~~

  где:

    **date** - (Date) дата для форматирования

- [tooltip_text](api/template/tooltip_text.md) - содержимое тултипов

  ~~~js
  scheduler.templates.tooltip_text = function(start,end,ev){
  return "<b>Event:</b> "+ev.text+"
  <b>Start date:</b> " + scheduler.templates.tooltip_date_format(start)+ "
  <b>End date:</b> "+scheduler.templates.tooltip_date_format(end)"
  };
  ~~~

  где:

    **start** - (Date) начало события 


    **end** - (Date) окончание события 


    **event** - (object) данные события

## API-шаблоны {#api-templates}

- [api_date](api/template/api_date.md) - определяет формат даты, используемый методами API для разбора входящих дат

  ~~~js
  scheduler.templates.api_date = function(date){
  return scheduler.date.str_to_date(scheduler.config.api_date);
  };
  ~~~

- [load_format](api/template/load_format.md) - определяет формат даты для запросов динамической загрузки

  ~~~js
  scheduler.templates.load_format = function(date){
  const dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
  return dateToStr_func(date);
  }
  ~~~

- [parse_date](api/template/parse_date.md) - преобразует строку даты из XML-файлов в объекты даты с помощью этого шаблона

  ~~~js
  const cfg = scheduler.config;
  const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
  scheduler.templates.parse_date = function(date){
  return strToDate (date);
  };
  ~~~

- [format_date](api/template/format_date.md) - преобразует объекты даты в строки для отправки данных на сервер

  ~~~js
  const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
  scheduler.templates.format_date = function(date){
  return dateToStr (date);
  };
  ~~~

  Параметр для указанных выше API-шаблонов:

    **date** - (Date) дата для форматирования

- **scheduler.templates.(viewName)_date** - определяет дату, отображаемую в заголовке представления


  В зависимости от представления функция-шаблон получает либо: 


    **date** - (Date) дата для форматирования (используется в Day, Month, Year, Units представлениях и Mini Calendar):

  ~~~js
  scheduler.templates.day_date = function(date){
  const formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
  return formatFunc(date);
  };
  ~~~

  или:

    **start** - (Date) начальная дата представления

**end** - (Date) конечная дата представления


  (для Week, Agenda, Grid, Map и Timeline представлений):

  ~~~js
  scheduler.templates.week_date = function(start, end){
  return scheduler.templates.day_date(start)+" &ndash; "+
  scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
  };
  ~~~

- **scheduler.templates.(viewName)_scale_date** - определяет дату для ячеек дней в представлении
  (используется для элементов оси X в Timeline или названий дней в подзаголовке недели Mini Calendar)

  Применяется в Day, Week, Year, Timeline представлениях и Mini Calendar

  ~~~js
  scheduler.templates.day_scale_date = function(date){
  return scheduler.date.date_to_str(scheduler.config.default_date);
  };
  ~~~

  где:

    **date** - (Date) дата для форматирования
