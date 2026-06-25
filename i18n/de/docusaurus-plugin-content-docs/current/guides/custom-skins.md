---
title: "Skins-Anpassung"
sidebar_label: "Skins-Anpassung"
---

# Skins-Anpassung

Ab Version 7.0 verwenden Scheduler-Skins CSS-Variablen, die Sie zur Anpassung und Stilgestaltung verwenden können.

### Verwandte Beispiele
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Key CSS Variables:

~~~css
:root {
    --dhx-scheduler-font-family: Inter, Helvetica, Arial, sans-serif;
    --dhx-scheduler-font-size: 14px;

    --dhx-scheduler-base-colors-primary: #537CFA;
    --dhx-scheduler-base-colors-warning: #FAB936;
    --dhx-scheduler-base-colors-error: #E3334E;
    --dhx-scheduler-base-colors-error-text: #FFFFFF;
    --dhx-scheduler-base-colors-success: #1BC297;
    --dhx-scheduler-base-colors-secondary: rgba(0, 0, 0, 0.04);

    --dhx-scheduler-base-colors-select: #EFF3FF;
    --dhx-scheduler-base-colors-border: #D0DBE3;
    --dhx-scheduler-base-colors-icons: #A1A4A6;

    --dhx-scheduler-base-colors-disabled: #E9E9E9;
    --dhx-scheduler-base-colors-readonly: var(--dhx-scheduler-base-colors-icons);
    --dhx-scheduler-base-colors-text-light: #44494E;
    --dhx-scheduler-base-colors-text-base: #23272A;
    --dhx-scheduler-base-colors-background: #FFFFFF;

    --dhx-scheduler-container-background: var(--dhx-scheduler-base-colors-background);
    --dhx-scheduler-container-color: var(--dhx-scheduler-base-colors-text-base);
    --dhx-scheduler-scale-color: var(--dhx-scheduler-container-color);

    --dhx-scheduler-base-padding: 4px;
    --dhx-scheduler-border-radius: var(--dhx-scheduler-base-module);

    --dhx-scheduler-event-colors-primary: #537CFA;
    --dhx-scheduler-event-text-primary: rgba(255, 255, 255, 0.90);

    --dhx-scheduler-toolbar-height: 40px;

    --dhx-scheduler-header-border: var(--dhx-scheduler-default-border);
    --dhx-scheduler-halfhour-border: 1px dotted var(--dhx-scheduler-base-colors-border);

    /* events */

    --dhx-scheduler-event-background-primary: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-blue: linear-gradient(180deg, #527CFF 0%, #9751FC 100%);
    --dhx-scheduler-event-green: linear-gradient(180deg, #12D979 0%, #1ECDEB 100%);
    --dhx-scheduler-event-violet: linear-gradient(180deg, #D071EF 0%, #EE71D5 100%);
    --dhx-scheduler-event-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, 
      #FAEA27 100%);

    --dhx-scheduler-event-menu-background: var(--dhx-scheduler-popup-background);
    --dhx-scheduler-event-menu-color: var(--dhx-scheduler-base-colors-primary);

    --dhx-scheduler-event-background: var(--dhx-scheduler-event-blue);
    --dhx-scheduler-event-border: none;
    --dhx-scheduler-event-color: var(--dhx-scheduler-event-text-primary);
    --dhx-scheduler-event-line-text: var(--dhx-scheduler-container-color);

    --dhx-scheduler-event-marker-color: var(--dhx-scheduler-event-background);

    --dhx-scheduler-popup-background: var(--dhx-scheduler-container-background);
    --dhx-scheduler-popup-color: var(--dhx-scheduler-container-color);
    --dhx-scheduler-popup-border: none;
    --dhx-scheduler-popup-border-radius: var(--dhx-scheduler-border-radius);

}

~~~

Alle Variablen finden Sie in der Datei **codebase/sources/less/src/themes/variables.less** des Pakets.

## Wie man Skins anpasst

Die einfachste Methode, das Erscheinungsbild des Scheduler anzupassen, besteht darin, die relevanten CSS-Variablen in Ihrem Stylesheet zu überschreiben. Hier ist ein Beispiel:

~~~html
<style>
:root {
    --dhx-scheduler-base-colors-primary: #01579B;
    --dhx-scheduler-event-background: #33B579;
    --dhx-scheduler-event-color: #FFFFFF;
    --dhx-scheduler-base-colors-border: #B0B8CD;
    --dhx-scheduler-border-radius: 2px;
}
</style>
~~~

### Verwandte Beispiele
- [Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Durch das Definieren von Variablen auf diese Weise können Sie die Standardstile neu definieren und sicherstellen, dass Ihre benutzerdefinierten Stile auf den Scheduler angewendet werden.

:::note
Für eine korrekte Vererbung von Werten über das gesamte Theme hinweg definieren Sie Variablen im `:root`-Element.
:::

Es ist wichtig, diese Stile im `:root`-Element zu definieren, um eine ordnungsgemäße Vererbung und Anwendung im gesamten Baustein sicherzustellen. Dieser Ansatz gewährleistet, dass, wenn eine von anderen Variablen verwendete Variable neu definiert wird, sie die verwandten Stile im gesamten Baustein entsprechend beeinflusst.

Zum Beispiel erbt die Variable `--dhx-scheduler-scale-color` von der Primär-Textfarb-Variablen `--dhx-scheduler-container-color`.

- Wenn Sie `--dhx-scheduler-container-color` auf `:root`-Ebene neu definieren, stellen Sie sicher, dass `--dhx-scheduler-scale-color` diese Änderung widerspiegelt.

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color und andere
        Variablen, die von `--dhx-scheduler-container-color` erben,
        werden beeinflusst
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~

- Wenn Sie `--dhx-scheduler-container-color` auf einer niedrigeren Ebene im DOM-Baum neu definieren, z.B. innerhalb von **.dhx_cal_container**, wirkt sich dies nicht auf die Variable `--dhx-scheduler-scale-color` aus.

~~~html
<style>
.dhx_cal_container {
    /* nur Elemente, die direkt
       `--dhx-scheduler-container-color` verwenden, sind betroffen
    */
    --dhx-scheduler-container-color: #222;
}
</style>
~~~


## Wie man Quellcodes verwendet

dhtmlxScheduler wird mit Stil-Dateien in folgenden Formen geliefert:

- **codebase/dhtmlxscheduler.css** - eine vorgefertigte komprimierte CSS-Datei für Skins, einsatzbereit für die Produktion;
- **codebase/sources/dhtmlxscheduler.css** - vorgefertigte lesbare CSS-Dateien;
- **codebase/sources/less/** - Quell-Less-Dateien der Scheduler-Skins.

Letztere können für eine tiefe Anpassung vorhandener Skins oder zur Erstellung eines neuen Skins verwendet werden.

## Wie man startet

Sie können `codebase/sources/less` als NPM-Paket initialisieren. Die Quellen enthalten zwei Arten von Dateien:

- Stylesheets;
- Dateien mit Mikrovariablen-Deklarationen, die Sie zur Feinabstimmung der Scheduler-Ansicht oder zur Erstellung eines neuen Skins verwenden können.

## Wie man Skins baut

In `codebase/sources/less/` führen Sie Folgendes aus:

~~~sh
> npm install
~~~

Nachdem die Installation abgeschlossen ist, können Sie CSS-Dateien mit den folgenden Befehlen neu erstellen:

~~~sh
> npm run build
~~~

Oder

~~~sh
> npm run watch
~~~

Das Skript baut CSS-Dateien aus den Quellen neu und legt sie in den *codebase*-Ordner des Scheduler-Pakets ab und ersetzt die bestehenden Dateien.

## Struktur

Die Struktur des `less`-Ordners für Version 7.0 (kann sich in zukünftigen Versionen ändern) ist unten angegeben:

### Bilder

- **./src/imgs** - SVG-Symbole, die von allen Skins verwendet werden
- **./src/iconfont** - Icons vorkonfiguriert in der Webschrift

### Skin-Definitionen

Die Standardmenge an Variablen ist im `terrace`-Skin definiert; andere Skins definieren die entsprechenden Variablen neu und fügen Stile hinzu.

- **./src/themes**
  - *./src/themes/variables.less* - gemeinsame Variablen, die von allen Skins verwendet werden; Terrace-Skin
  - *./src/themes/contrast_black* - Kontrast-Schwarz-Skin-Variablen
  - *./src/themes/contrast_white* - Kontrast-Weiß-Skin-Variablen
  - *./src/themes/material* - Material-Skin-Variablen
  - *./src/themes/dark* - Dunkel-Skin-Variablen
  - *./src/themes/flat* - Flach-Skin-Variablen

### Einstiegspunkte zum Erstellen von Skins

- theme.less
- package.json


## Erstellen eines benutzerdefinierten Skins

Um einen neuen Skin zu erstellen, können Sie eine der vorhandenen Skins aus dem Ordner `sources/less/src/themes` kopieren und umbennenen. Folgen Sie den untenstehenden Schritten:

1. Eine der vorhandenen Dateien aus dem Ordner `sources/less/src/themes` kopieren und umbennen, zum Beispiel:

~~~text
-> kopieren:
codebase/sources/less/src/themes/material.less

-> umbennenen zu:
codebase/sources/less/src/themes/custom.less
~~~

2. Importieren Sie die neue Datei in `sources/less/src/themes/index.less`, so:

~~~less
@import "./custom";
~~~

Und fügen Sie den Inhalt wie folgt hinzu:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

Hinweis: Die Skin-Variablen sollten unter dem `:root`-Element definiert werden, wobei der Selektor `data-scheduler-there` verwendet wird.

Eine neue Theme muss die Variable `--dhx-scheduler-theme` mit dem Theme-Namen enthalten.

3. Skins neu erstellen, indem Sie Folgendes ausführen:

~~~sh
npm run build
~~~


:::note
Beachten Sie, dass der Scheduler basierend auf dem angewendeten Skin einige vordefinierte Einstellungen für den Kalender anwenden kann.
Wenn Sie einen neuen Skin kopieren, müssen Sie möglicherweise die entsprechenden Einstellungen dem Scheduler manuell anwenden.
:::


## JS-Styling-Einstellungen

Beachten Sie, dass nicht alle Aspekte der Scheduler-Styling-Steuerung über CSS laufen; einige Parameter werden aus der JavaScript-Konfiguration definiert. Diese sind:

- [hour_size_px](api/config/hour_size_px.md)
- und alle Einstellungen des Objekts [scheduler.xy](api/other/xy.md)