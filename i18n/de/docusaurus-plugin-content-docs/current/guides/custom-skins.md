---
title: "Skins-Anpassung"
sidebar_label: "Skins-Anpassung"
---

# Skins-Anpassung

Ab Version 7.0 werden die Skins des Schedulers mithilfe von CSS-Variablen erstellt, was eine einfache Anpassung und Gestaltung ermöglicht.


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Wichtige CSS-Variablen:

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

Alle diese Variablen befinden sich in der Datei **codebase/sources/less/src/themes/variables.less** innerhalb des Pakets.

## Wie man Skins anpasst

Die einfachste Möglichkeit, das Erscheinungsbild des Schedulers zu ändern, besteht darin, die CSS-Variablen in Ihrem eigenen Stylesheet zu überschreiben. Zum Beispiel:

~~~html
<style>
:root {
  --dhx-scheduler-base-colors-primary: #01579B;
  --dhx-scheduler-event-background: #33B579;
  --dhx-scheduler-event-color: #FFFFFF;
  --dhx-scheduler-base-colors-border: #B0B8CD;
  --dhx-scheduler-border-radius:2px;
}
</style>
~~~


[Customize and switch between themes](https://docs.dhtmlx.com/scheduler/samples/07_skins/07_themes.html)


Wenn Sie Variablen auf diese Weise setzen, ersetzen Sie die Standardstile durch Ihre eigenen, und diese Änderungen werden im gesamten Scheduler angewendet.

:::note
Für eine konsistente Vererbung der Werte im gesamten Theme ist es am besten, Variablen auf dem :root-Element zu definieren.
:::

Wenn Sie diese Styles auf der **:root**-Ebene definieren, wird sichergestellt, dass sie im gesamten Component korrekt vererbt werden. So werden Änderungen richtig weitergegeben, wenn eine Variable von einer anderen abhängt.

Zum Beispiel erbt die Variable `--dhx-scheduler-scale-color` ihren Wert von `--dhx-scheduler-container-color`.

- Wenn Sie `--dhx-scheduler-container-color` auf der **:root**-Ebene neu definieren, wird auch `--dhx-scheduler-scale-color` entsprechend aktualisiert.

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

- Wenn Sie jedoch `--dhx-scheduler-container-color` tiefer im DOM, z.B. innerhalb von **.dhx_cal_container**, neu definieren, wird `--dhx-scheduler-scale-color` nicht geändert.

~~~html
<style>
.dhx_cal_container {
    /* Nur Elemente, die direkt
  --dhx-scheduler-container-color verwenden, werden beeinflusst
  */
  --dhx-scheduler-container-color: #222;
}
</style>
~~~


## Verwendung der Quellcodes

dhtmlxScheduler stellt Styles in folgenden Formaten bereit:

- **codebase/dhtmlxscheduler.css** - eine komprimierte CSS-Datei, bereit für den Produktionseinsatz;
- **codebase/sources/dhtmlxscheduler.css** - lesbare, vorgefertigte CSS-Dateien;
- **codebase/sources/less/** - LESS-Quelldateien für Scheduler-Skins.

Die LESS-Quelldateien sind nützlich, wenn Sie bestehende Skins umfassend anpassen oder einen neuen Skin erstellen möchten.

## Erste Schritte

Sie können **codebase/sources/less** als NPM-Paket einrichten. Dieser Quellordner enthält zwei Arten von Dateien:

- Stylesheets;
- Dateien, die Mikrovariablen für detaillierte Anpassungen oder zum Erstellen neuer Skins deklarieren.

## Skins erstellen

Führen Sie im Verzeichnis **codebase/sources/less/** folgenden Befehl aus:

~~~
> npm install
~~~

Nach Abschluss der Installation können Sie die CSS-Dateien mit diesen Befehlen neu erstellen:

~~~
> npm run build
~~~

Oder um Änderungen zu überwachen und automatisch neu zu bauen:

~~~
> npm run watch
~~~

Diese Skripte kompilieren CSS aus den Quellen und legen das Ergebnis im *codebase*-Ordner des Scheduler-Pakets ab, wobei die bestehenden CSS-Dateien ersetzt werden.

## Struktur

Die Ordnerstruktur von **less** für Version 7.0 (kann sich in zukünftigen Versionen ändern) sieht wie folgt aus:

### Bilder

- **./src/imgs** - SVG-Icons, die von allen Skins verwendet werden
- **./src/iconfont** - Icons, die in der Web-Schriftart enthalten sind

### Skin-Definitionen

Die Standardvariablen sind im `terrace`-Skin definiert, während andere Skins diese Variablen überschreiben und eigene Styles hinzufügen.

- **./src/themes**
  - *./src/themes/variables.less* - gemeinsame Variablen für alle Skins, einschließlich `terrace`
  - *./src/themes/contrast_black* - Variablen für den Kontrast-Schwarz-Skin
  - *./src/themes/contrast_white* - Variablen für den Kontrast-Weiß-Skin
  - *./src/themes/material* - Variablen für den Material-Skin
  - *./src/themes/dark* - Variablen für den Dark-Skin
  - *./src/themes/flat* - Variablen für den Flat-Skin

### Einstiegspunkte für das Bauen von Skins

- theme.less
- package.json


## Eigenen Skin erstellen

Um einen neuen Skin zu erstellen, kopieren und benennen Sie zunächst einen bestehenden Skin aus **sources/less/src/themes** um. Gehen Sie wie folgt vor:

1) Kopieren und benennen Sie eine der vorhandenen Skin-Dateien um. Zum Beispiel:

~~~
-> kopieren:
codebase/sources/less/src/themes/material.less

-> umbenennen in:
codebase/sources/less/src/themes/custom.less
~~~

2) Importieren Sie Ihre neue Datei in **sources/less/src/themes/index.less** wie folgt:

~~~
@import "./custom";
~~~

Definieren Sie dann Ihre eigenen Variablen wie folgt:

~~~css
:root[data-scheduler-theme='custom'] {
    --dhx-scheduler-theme: custom;
    --dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

    --dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

Denken Sie daran, Skin-Variablen unter dem `:root`-Selektor mit dem Attribut `data-scheduler-theme` zu definieren.

Jedes neue Theme sollte die Variable **--dhx-scheduler-theme** enthalten, die auf den Namen des Themes gesetzt ist.

3) Erstellen Sie die Skins neu mit:

~~~
npm run build
~~~


:::note
Beachten Sie, dass der Scheduler je nach verwendetem Skin einige vordefinierte Einstellungen anwenden kann. Wenn Sie einen neuen Skin durch Kopieren eines bestehenden erstellen, müssen Sie ggf. die entsprechenden Scheduler-Einstellungen manuell anpassen.
:::


## JS-Styling-Einstellungen

Einige Styling-Optionen im Scheduler werden nicht ausschließlich über CSS gesteuert, sondern über JavaScript-Konfigurationen gesetzt. Dazu gehören:

- [hour_size_px](api/config/hour_size_px.md)
- und alle Einstellungen des [scheduler.xy](api/other/xy.md) Objekts
