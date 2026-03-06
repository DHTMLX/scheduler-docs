---
title: "Allgemeine Vorlagen"
sidebar_label: "Allgemeine Vorlagen"
---

# Allgemeine Vorlagen 

Dieser Artikel behandelt Vorlagen, die in allen Ansichten gemeinsam genutzt werden. 
Für detaillierte Informationen zu jeder Vorlage lesen Sie bitte die verlinkten Artikel.

## Events

Vorlagen ermöglichen es, den Text und die Farbe von Events anzupassen. Weitere Details finden Sie in:

- [Individuelle Inhalte für Events](guides/custom-events-content.md)
- [Farbe für benutzerdefinierte Events](guides/custom-events-color.md#attachingadditionalcssclassestoanevent)

## Lightbox

![lightbox_templates](/img/lightbox_templates.png)

- [time_picker](api/template/time_picker.md) - der Dropdown-Zeitwähler innerhalb der Lightbox

  ~~~js
  scheduler.templates.time_picker = 
  scheduler.date.date_to_str(scheduler.config.hour_date);
  ~~~

- [lightbox_header](api/template/lightbox_header.md) - definiert die Kopfzeile der Lightbox

  ~~~js
  scheduler.templates.lightbox_header = function(start,end,ev){
  return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
        + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
  };
  ~~~

  wobei:

    **start**    - (Date) Startzeitpunkt des Events


    **end** - (Date) Endzeitpunkt des Events


    **event** - (object) die Eventdaten

- [event_date](api/template/event_date.md) - formatiert den Zeitanteil des Start- und Enddatums eines Events. Wird häufig von anderen Vorlagen zur Anzeige von Zeitbereichen verwendet

  ~~~js
  scheduler.templates.event_date = function(date){
  const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
  return formatFunc(date);
  }
  ~~~

  wobei:

    **date** - (Date) das zu formatierende Datum

## Touch-Unterstützung {#touch-support}

Der Scheduler enthält eine 'quick info'-Erweiterung zur Aktivierung der [Touch-Unterstützung](guides/touch-support.md).

 Diese Erweiterung stellt drei Vorlagen bereit:

![touch_templates](/img/touch_templates.png)

- [quick_info_content](api/template/quick_info_content.md) - Inhalt, der im Pop-up-Bearbeitungsformular angezeigt wird

  ~~~js
  scheduler.templates.quick_info_content = function(start, end, ev){ 
  return ev.details || ev.text;
  };
  ~~~

- [quick_info_date](api/template/quick_info_date.md) - Datum, das im Pop-up-Bearbeitungsformular angezeigt wird

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

- [quick_info_title](api/template/quick_info_title.md) - Titel des Pop-up-Bearbeitungsformulars

  ~~~js
  scheduler.templates.quick_info_title = function(start, end, ev){ 
  return ev.text.substr(0,50); 
  };
  ~~~

  Parameter für Touch-Unterstützungsvorlagen:

    **start** - (Date) Startzeitpunkt des Events 


    **end**    - (Date) Endzeitpunkt des Events 


    **event** - (object) die Eventdaten

## Tooltips 

Tooltips können zu Events in jeder Ansicht hinzugefügt werden, um zusätzliche Informationen anzuzeigen, ohne das Event zu öffnen.

Um dieses Feature zu aktivieren, binden Sie die Tooltip-Erweiterung auf Ihrer Seite ein.

~~~js
scheduler.plugins({
  tooltip: true
});
~~~

![tooltip_templates](/img/tooltip_templates.png)

- [tooltip_date_format](api/template/tooltip_date_format.md) - definiert das Datumsformat, das von der Tooltip-Textvorlage verwendet wird

  ~~~js
  scheduler.templates.tooltip_date_format="function" (date){
  const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
  return formatFunc(date);
  }
  ~~~

  wobei:

    **date** - (Date) das zu formatierende Datum

- [tooltip_text](api/template/tooltip_text.md) - Inhalt der Tooltips

  ~~~js
  scheduler.templates.tooltip_text = function(start,end,ev){
  return "<b>Event:</b> "+ev.text+"
  <b>Start date:</b> " + scheduler.templates.tooltip_date_format(start)+ "
  <b>End date:</b> "+scheduler.templates.tooltip_date_format(end)"
  };
  ~~~

  wobei:

    **start** - (Date) Startzeitpunkt des Events 


    **end**    - (Date) Endzeitpunkt des Events 


    **event** - (object) die Eventdaten

## API-Vorlagen {#api-templates}

- [api_date](api/template/api_date.md) - definiert das Datumsformat, das von API-Methoden zum Parsen eingehender Daten verwendet wird

  ~~~js
  scheduler.templates.api_date = function(date){
  return scheduler.date.str_to_date(scheduler.config.api_date);
  };
  ~~~

- [load_format](api/template/load_format.md) - definiert das Datumsformat für Anfragen beim dynamischen Laden

  ~~~js
  scheduler.templates.load_format = function(date){
  const dateToStr_func = scheduler.date.date_to_str(scheduler.config.load_date);
  return dateToStr_func(date);
  }
  ~~~

- [parse_date](api/template/parse_date.md) - wandelt Datums-Strings aus XML-Dateien mit dieser Vorlage in Datumsobjekte um

  ~~~js
  const cfg = scheduler.config;
  const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
  scheduler.templates.parse_date = function(date){
  return strToDate (date);
  };
  ~~~

- [format_date](api/template/format_date.md) - wandelt Datumsobjekte in Strings um, um Daten an den Server zurückzusenden

  ~~~js
  const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
  scheduler.templates.format_date = function(date){
  return dateToStr (date);
  };
  ~~~

  Parameter für die oben genannten API-Vorlagen:

    **date** - (Date) das zu formatierende Datum

- **scheduler.templates.(viewName)_date** - definiert das Datum, das im Kopfbereich einer Ansicht angezeigt wird


  Abhängig von der Ansicht erhält die Vorlagenfunktion entweder: 


    **date** - (Date) das zu formatierende Datum (verwendet in Day, Month, Year, Units Views und Mini Calendar):

  ~~~js
  scheduler.templates.day_date = function(date){
  const formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
  return formatFunc(date);
  };
  ~~~

  oder:

    **start** - (Date) Startdatum der Ansicht

**end** - (Date) Enddatum der Ansicht


  (verwendet in Week, Agenda, Grid, Map und Timeline Views):

  ~~~js
  scheduler.templates.week_date = function(start, end){
  return scheduler.templates.day_date(start)+" &ndash; "+
  scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
  };
  ~~~

- **scheduler.templates.(viewName)_scale_date** - definiert das Datum für Tageszellen in der Ansicht  
  (wird für X-Achsen-Elemente in der Timeline-Ansicht oder Tagesnamen in der Wochen-Unterüberschrift des Mini Calendar verwendet)

  Anwendbar in Day, Week, Year, Timeline Views und Mini Calendar

  ~~~js
  scheduler.templates.day_scale_date = function(date){
  return scheduler.date.date_to_str(scheduler.config.default_date);
  };
  ~~~

  wobei:

    **date** - (Date) das zu formatierende Datum
