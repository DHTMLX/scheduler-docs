---
title: "Barrierefreiheit"
sidebar_label: "Barrierefreiheit"
---

# Barrierefreiheit

[Barrierefreiheit](https://www.w3.org/WAI/fundamentals/accessibility-intro/) spielt eine entscheidende Rolle in modernen Webanwendungen. 
Es gibt verschiedene Techniken, die darauf abzielen, eine Anwendung oder Website einfacher nutzbar und zugänglicher zu machen.

Um den Zugang und die Bedienbarkeit von DHTMLXScheduler für Menschen mit Behinderungen zu verbessern, enthält die Komponente mehrere Funktionen zur Barrierefreiheit:

- WAI-ARIA-Attribute
- Tastaturnavigation
- Hochkontrast-Themes

## WAI-ARIA-Attribute {#wai-aria-attributes}

DHTMLXScheduler unterstützt WAI-ARIA durch das Hinzufügen spezieller Attribute zum Markup der Komponente. 
Diese Attribute helfen Screenreadern, die Komponente besser zu erkennen und zu interpretieren.

Weitere Informationen finden Sie in der [offiziellen WAI-ARIA-Spezifikation](https://www.w3.org/WAI/standards-guidelines/aria/).

Standardmäßig sind WAI-ARIA-Attribute im Scheduler aktiviert. Bei Bedarf können sie deaktiviert werden, indem die Eigenschaft *wai_aria_attributes* auf *false* gesetzt wird:

~~~js
scheduler.config.wai_aria_attributes = false;
~~~

Zusätzlich ist es möglich, die Verwendung des [*role="application"* Attributs](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics#Enter_WAI-ARIA) am Hauptcontainer des Schedulers und an den Minikalender-Elementen zu aktivieren oder zu deaktivieren. Diese Einstellung wird über die Eigenschaft [wai_aria_application_role](api/config/wai_aria_application_role.md) gesteuert und ist standardmäßig auf *true* gesetzt.

~~~js
scheduler.config.wai_aria_application_role = false;
~~~


## Tastaturnavigation

Dieser Ansatz ermöglicht es Nutzern, alle Funktionen der Anwendung ausschließlich über Tastaturbefehle und Tastenkombinationen zu bedienen, anstatt auf eine Maus angewiesen zu sein.

Ausführlichere Informationen finden Sie im Artikel [Tastaturnavigation](guides/keyboard-navigation.md).

## Hochkontrast-Themes {#high-contrast-themes}

DHTMLXScheduler enthält Themes mit hochkontrastierenden Farben, um die Benutzeroberfläche deutlicher und leichter erkennbar zu machen. 
Diese Themes sind besonders hilfreich für Nutzer mit speziellen Sehbedürfnissen.

Es stehen zwei Hochkontrast-Themes zur Verfügung:

- Kontrast Black Skin

![contrast_black_skin](/img/contrast_black_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_black.css">
~~~


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


- Kontrast White Skin

![contrast_white_skin](/img/contrast_white_skin.png)

~~~html
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler_contrast_white.css">
~~~


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
