---
title: "Scheduler-Markup"
sidebar_label: "Scheduler-Markup"
---

# Scheduler-Markup

Die Markup des Standard-Schedulers sieht so aus:

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

![markup](/img/markup.png)

## Tabs-Positionierung

Ab Version 7.0 ist das Element **.dhx_cal_navline** ein Flex-Container und Tabs befinden sich entsprechend der **order**-Eigenschaft.

### Versionen 6.0 und älter

#### Standard‑Skin ('terrace')

Anfangs ignoriert der Standard-Skin ('terrace') die CSS-Eigenschaften, die verwendet werden, um die Position der Tabs festzulegen (z. B. `style="right:204px;"`) und bestimmt das Tab-Verhalten nach eigener Logik: Die Standardansichten werden links als segmentierte Schaltfläche angezeigt, während zusätzliche Ansichten rechts als einzelne Schaltflächen platziert werden.

Um die Position manuell festzulegen (z. B. im Markup), setzen Sie den Parameter [fix_tab_position](api/config/fix_tab_position.md) auf *false*, um das Standardverhalten zu deaktivieren, und legen Sie die Koordinaten mit CSS-Eigenschaften fest:

~~~js
scheduler.config.fix_tab_position = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

Beachten Sie, dass Sie die folgenden CSS-Klassen verwenden können, um eine segmentierte Schaltfläche zu erstellen:

- **dhx_cal_tab_last** - rundet den rechten Rand ab
- **dhx_cal_tab_first** - rundet den linken Rand ab
- **dhx_cal_tab_standalone** - rundet beide Ränder ab


Zum Beispiel, um die im Standard-Skin manuell festgelegte 'day'-'week'-'month'-Segmentierung zu setzen, können Sie das Markup wie folgt angeben:
~~~html
<div class="dhx_cal_tab dhx_cal_tab_first" data-tab="day" style="left:14px;"></div>
<div class="dhx_cal_tab" data-tab="week"  style="left: 75px;"></div>
<div class="dhx_cal_tab dhx_cal_tab_last" data-tab="month" style="left:136px"></div>
~~~


## Hinzufügen/Löschen von Tabs der Ansichten

### Einen Tab hinzufügen

Um einen neuen Tab in der Kopfzeile hinzuzufügen, fügen Sie ein Div-Element mit der Klasse **"dhx_cal_tab"** als Kindknoten des Elements **"dhx_cal_navline"** hinzu:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
    <div class="dhx_cal_tab" data-tab="timeline"></div>
    <div class="dhx_cal_tab" data-tab="month"></div>
</div>
~~~

:::note
Hinweis, dem Tab können mehrere CSS-Klassen zugewiesen werden, aber die **"dhx_cal_tab"**-Klasse muss zuerst stehen.
:::

### Einen Tab löschen

Um einen Tab aus der Kopfzeile zu entfernen, entfernen Sie das zugehörige Div aus dem Markup:

Entfernen des Tabs 'month' aus der Kopfzeile:

~~~html
<div class="dhx_cal_navline">
    ...
    <div class="dhx_cal_tab" data-tab="day"></div>
    <div class="dhx_cal_tab" data-tab="week"></div>
</div>
~~~

:::note
Auch wenn der Tab entfernt wird, ist die zugehörige Ansicht weiterhin programmatisch über die Methoden [setCurrentView](api/method/setcurrentview.md) und [updateView](api/method/updateview.md) zugänglich.
:::

## Ausblenden der Navigations-Schaltflächen

Um die Navigations-Schaltflächen in der Kopfzeile des Schedulers auszublenden, setzen Sie den Stil *'display:none'* für die entsprechenden Div-Elemente wie folgt:

Ausblenden der Navigations-Schaltflächen in der Kopfzeile:
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


## Verbergen des Scheduler-Headers

Um den gesamten Scheduler-Header zu verbergen, setzen Sie *'display:none'*: 

~~~html
<style>
    .dhx_cal_navline{
        display:none;
    }
</style>

~~~