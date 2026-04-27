---
title: "RTL (Right-to-left) Modus"
sidebar_label: "RTL (Right-to-left) Modus"
---

# RTL (Right-to-left) Modus

Sie können den RTL-Modus für den Scheduler über die [rtl-Konfigurationsoption](api/config/rtl.md) aktivieren.

~~~js
scheduler.config.rtl = true;
~~~

Nach der Implementierung des RTL-Modus werden alle Elemente des Kalenders automatisch von rechts nach links dargestellt, mit Ausnahme der Elemente der Scheduler-Kopfzeile.

![rtl](/img/rtl.png)


[Grundlegende Initialisierung](https://docs.dhtmlx.com/scheduler/samples/14_rtl/01_basic_init.html)


Um die Anordnung der Elemente in der Scheduler-Kopfzeile zu ändern, müssen Sie die CSS-Klassen der Elemente neu definieren, wie gezeigt:

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

## RTL-Modus-Beispiele

<b>Monatsansicht im RTL-Modus</b>

Schauen wir uns an, wie die Monatsansicht im RTL-Modus aussieht. Die Titel und Details des Termins befinden sich nun auf der rechten Seite des Termin-Blocks.

![month_view_rtl](/img/month_view_rtl.png)

<b>Terminfenster im RTL-Modus</b>

Es gibt ein gutes Beispiel dafür, wie sich das Erscheinungsbild des Fensters mit Termin-Details nach der Anwendung des RTL-Modus im untenstehenden Bild ändert.

![window_with_details](/img/window_with_details.png)

<b>Timeline im RTL-Modus</b>

Der RTL-Modus ordnet Timelines im Scheduler automatisch von rechts nach links an.

![timeline_rtl](/img/timeline_rtl.png)

## Anpassung von Elementen im RTL-Modus

Sie können zusätzliche CSS-Klassen verwenden, um einzelnen Elementen im RTL-Modus individuelle Stile zuzuweisen.

Dies ist die Liste der CSS-Klassen, die Sie festlegen können:

- <b>dhx_cal_container_rtl</b> - wendet Stile auf den gesamten Container an
- <b>dhx_tooltip_rtl</b> - wendet Stile auf das Tooltip an
- <b>dhx_quick_info_rtl</b> - wendet Stile auf das 'Quick Info'-Popup an
- <b>dhx_cal_light_rtl</b> - wendet Stile auf das Lightbox-Element an

Zum Beispiel:

~~~css
.dhx_cal_container_rtl .dhx_cal_event{
    margin-right: -5px;
}
~~~

Alle Ereignisse des Scheduler-Containers werden um 5px nach rechts verschoben.