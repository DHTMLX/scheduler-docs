---
title: "Ausblenden von Zeiteinheiten auf der X-Achse einer Ansicht"
sidebar_label: "Ausblenden von Zeiteinheiten auf der X-Achse einer Ansicht"
---

# Ausblenden von Zeiteinheiten auf der X-Achse einer Ansicht

Die Bibliothek ermöglicht es, unnötige Zeiteinheiten auf der horizontalen Skala einer Ansicht auszublenden. Diese Funktion ist beispielsweise nützlich, um nur Arbeitstage anzuzeigen und Wochenenden auszublenden.

## Technik {#technique}

Um eine Zeiteinheit auf der Skala einer Ansicht (wie z.B. eine Stunde in der Timeline-Ansicht oder einen Tag in der Wochenansicht) auszublenden, können Sie die Methode **ignore_(viewName)** verwenden. 
Diese Methode ist eine Funktion, die das Datum der jeweiligen Einheit als Parameter erhält. Wenn Sie *true* für eine Einheit zurückgeben, wird diese ausgeblendet.

Um beispielsweise Wochenenden in der Monatsansicht auszublenden, könnte die Methode wie folgt aussehen:

~~~js
// 0 steht für Sonntag, 6 für Samstag
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) //blendet Samstage und Sonntage aus
        return true;
};
~~~

![hiding_time_units](/img/hiding_time_units.png)


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## Anzeigen eines Markers an der Stelle ausgeblendeter Skalen-Einheiten

Um anzuzeigen, wo Skalen-Einheiten ausgeblendet wurden, können Sie die Methode [addMarkedTimespan](api/method/addmarkedtimespan.md) verwenden. Zum Beispiel werden in der Timeline-Ansicht die Stunden von 10:00 bis 18:00 sichtbar gehalten, während die restlichen ausgeblendet werden. 
Ein Marker mit einer Dauer von 40 Minuten hebt die ausgeblendeten Stunden hervor: 20 Minuten auf jeder Seite der angrenzenden Zellen.

~~~html
.yellow_section {
    background-color: #ffa749;
    opacity: 0.25;
}
~~~

~~~js
scheduler.addMarkedTimespan({
    days: "fullweek",
    zones:[9.5*60, 20.5*60],
    invert_zones:true,
    css: "yellow_section"
});
~~~


![highlighting_hidden_hours](/img/highlighting_hidden_hours.png)


[Displaying a marker at the place of hidden scale units](https://docs.dhtmlx.com/scheduler/samples/11_scales/07_timeline_hours_marker.html)
