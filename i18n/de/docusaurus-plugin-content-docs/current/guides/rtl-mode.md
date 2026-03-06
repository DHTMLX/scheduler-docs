---
title: "RTL (Rechts-nach-links) Modus"
sidebar_label: "RTL (Rechts-nach-links) Modus"
---

# RTL (Rechts-nach-links) Modus

Der Scheduler unterstützt den RTL-Modus (Rechts-nach-links), den Sie mithilfe der [rtl Konfigurationsoption](api/config/rtl.md) aktivieren können.

~~~js
scheduler.config.rtl = true;
~~~

Sobald der RTL-Modus aktiviert ist, werden die Kalenderelemente standardmäßig von rechts nach links angezeigt, mit Ausnahme der Header-Elemente des Schedulers.

![rtl](/img/rtl.png)


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)


Um die Reihenfolge der Header-Elemente des Schedulers anzupassen, müssen Sie deren CSS-Klassen wie folgt anpassen:

~~~js
<style type="text/css" >
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }    
    
      .dhx_cal_prev_button{right: auto !important; left: 16px !important;}
      .dhx_cal_next_button{right: auto !important; left: 148px !important;}
      .dhx_cal_today_button{right: auto !important; left: 57px !important;}
      .dhx_cal_tab[name="day_tab"]{left: auto !important; right: 16px !important;}
      .dhx_cal_tab[name="week_tab"]{left: auto !important; right: 103px !important;}
      .dhx_cal_tab[name="month_tab"]{left: auto !important; right: 192px !important;}
      .dhx_cal_container_rtl  .dhx_cal_tab {
        border-right-style: solid;
        border-right-width: 1px;
       }
</style>
~~~

![reorder_header_rtl](/img/reorder_header_rtl.png)

## Beispiele für den RTL-Modus

<b>Monatsansicht im RTL-Modus</b>

So sieht die Monatsansicht im RTL-Modus aus. Die Ereignistitel und -details sind jetzt am rechten Rand jedes Ereignisfeldes ausgerichtet.

![month_view_rtl](/img/month_view_rtl.png)

<b>Ereignisfenster im RTL-Modus</b>

Das folgende Bild zeigt, wie sich das Detailfenster eines Ereignisses optisch anpasst, wenn der RTL-Modus aktiviert ist.

![window_with_details](/img/window_with_details.png)

<b>Zeitleiste im RTL-Modus</b>

Im RTL-Modus werden Zeitleisten automatisch von rechts nach links innerhalb des Schedulers angeordnet.

![timeline_rtl](/img/timeline_rtl.png)

## Anpassung von Elementen im RTL-Modus

Zusätzliche CSS-Klassen stehen zur Verfügung, um bestimmte Elemente im RTL-Modus individuell zu gestalten.

Folgende Klassen können Sie verwenden:

- <b>dhx_cal_container_rtl</b> - richtet sich an den gesamten Scheduler-Container
- <b>dhx_tooltip_rtl</b> - richtet sich an das Tooltip-Element
- <b>dhx_quick_info_rtl</b> - richtet sich an das 'Quick Info' Popup
- <b>dhx_cal_light_rtl</b> - richtet sich an die Lightbox

Beispiel:

~~~js
.dhx_cal_container_rtl .dhx_cal_event{
    margin-right: -5px;
}
~~~

Damit werden alle Scheduler-Ereignisse innerhalb des Containers um 5px nach rechts verschoben.
