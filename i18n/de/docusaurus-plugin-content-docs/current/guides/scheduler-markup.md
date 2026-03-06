---
title: "Scheduler-Markup"
sidebar_label: "Scheduler-Markup"
---

# Scheduler-Markup

So sieht das Standard-Markup des Schedulers aus:

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

## Positionierung der Tabs {#tabs-positioning}

Ab Version 7.0 verwendet das Element **.dhx_cal_navline** ein Flex-Layout, und die Tabs werden anhand der CSS-Eigenschaft **order** angeordnet.

### Versionen 6.0 und älter

#### Standard-Skin ('terrace')

Im Standard-Skin ('terrace') werden CSS-Eigenschaften wie beim Positionieren der Tabs ignoriert. Stattdessen werden die Tabs nach den internen Regeln des Schedulers platziert: Die Standardansichten erscheinen als segmentierte Button-Gruppe links, während zusätzliche Ansichten als separate Buttons rechts angezeigt werden.

Um die Tab-Positionierung manuell zu steuern (z. B. direkt im Markup), setzen Sie den Parameter [fix_tab_position](api/config/fix_tab_position.md) auf *false*, um das Standardverhalten zu deaktivieren, und geben Sie dann die Tab-Koordinaten per CSS an:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

Sie können diese CSS-Klassen verwenden, um einen segmentierten Button-Effekt zu erzeugen:

- **dhx_cal_tab_last** - rundet den rechten Rand ab
- **dhx_cal_tab_first** - rundet den linken Rand ab
- **dhx_cal_tab_standalone** - rundet beide Ränder ab

Um beispielsweise einen segmentierten 'day'-'week'-'month'-Button im Standard-Skin manuell zu setzen, verwenden Sie folgendes Markup:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day"></div>
<div class="dhx_cal_tab" data-tab="week"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month"></div>
~~~


## Hinzufügen/Löschen von Ansichts-Tabs {#addingdeletingviewstabs}

### Hinzufügen eines Tabs

Um einen neuen Tab zur Kopfzeile hinzuzufügen, fügen Sie einfach ein div mit der Klasse **"dhx_cal_tab"** innerhalb des Elements **"dhx_cal_navline"** ein:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

Das **data-tab**-Attribut gibt die Ansicht an, die beim Klick auf den Tab geöffnet wird, im Format **(viewName)**.

:::note
Beachten Sie, dass mehrere CSS-Klassen auf einen Tab angewendet werden können, aber die Klasse **"dhx_cal_tab"** sollte immer zuerst stehen.
:::

### Löschen eines Tabs

Um einen Tab aus der Kopfzeile zu entfernen, löschen Sie einfach das entsprechende div im Markup:

~~~js title="Entfernen des 'month'-Tabs aus der Kopfzeile"
~~~html
<div class="dhx_cal_navline">
  ...
  <div class="dhx_cal_tab" data-tab="day"></div>
  <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
Das Entfernen des Tabs aus dem Markup deaktiviert die Ansicht selbst nicht; sie kann weiterhin programmatisch über die Methoden [setCurrentView](api/method/setcurrentview.md) und [updateView](api/method/updateview.md) aufgerufen werden.
:::


## Navigationselemente ausblenden {#hidingthenavigationbuttons}

Um die Navigationselemente in der Kopfzeile des Schedulers auszublenden, setzen Sie *'display:none'* für die jeweiligen divs wie folgt:

~~~js title="Navigationselemente in der Kopfzeile ausblenden"
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


## Kopfzeile des Schedulers ausblenden {#hidingtheheaderofscheduler}

Um die gesamte Kopfzeile des Schedulers auszublenden, setzen Sie *'display:none'* auf die navline:

~~~html
<style>
  .dhx_cal_navline{
  display:none;
  }
</style>

~~~
