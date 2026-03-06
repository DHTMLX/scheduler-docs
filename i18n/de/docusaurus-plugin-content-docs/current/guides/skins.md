---
title: "Skins"
sidebar_label: "Skins"
---

# Skins 

Es sind mehrere integrierte Skins verfügbar:

1. [Terrace (Standard)](guides/skins.md#terrace-skin)
1. [Dark](guides/skins.md#dark-skin)
2. [Material](guides/skins.md#material-skin)
3. [Flat](guides/skins.md#flat-skin)
4. [Contrast Black](guides/skins.md#contrastblackskin)
5. [Contrast White](guides/skins.md#contrast-white-skin)

Ab Version 7.0 sind alle Skins in der Hauptdatei **dhtmlxscheduler.css** enthalten. Sie können einen Skin aktivieren, indem Sie die Eigenschaft **scheduler.skin** setzen:

~~~js
scheduler.skin = "dark";
~~~

Alternativ können Sie die Methode [scheduler.setSkin()](api/method/setskin.md) verwenden:

~~~js
scheduler.setSkin("dark");
~~~

In Scheduler Version 6.0 und älter wurden Skins als separate CSS-Dateien bereitgestellt.

### Verwendung von Schriftarten

Standardmäßig laden die Skins die Schriftart `Inter` von `https://fonts.googleapis.com`. Weitere Informationen zu Google Fonts finden Sie [hier](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
);
~~~

Falls erforderlich, können Sie den Schriftimport direkt aus den **.less**-Dateien im Ordner **codebase/sources/less/skins/material** entfernen und anschließend den Skin wie im Artikel [Skins-Anpassung](guides/custom-skins.md) beschrieben neu erstellen.

## 'Skin Terrace' {#terrace-skin}

Um den Standard-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxscheduler.css**

![terrace_skin](/img/terrace_skin.png)


[Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)


## 'Skin Dark' {#dark-skin}

Um den 'Dark'-Skin anzuwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxscheduler.css**

Setzen Sie dann den Skin über die Eigenschaft **scheduler.skin**:

~~~js
scheduler.skin = "dark";
~~~

![dark_skin](/img/dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/06_dark.html)


## 'Skin Material' {#material-skin}

Um den 'Material'-Skin zu aktivieren, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxscheduler.css**

Setzen Sie dann den Skin mit der Eigenschaft **scheduler.skin**:

~~~js
scheduler.skin = "material";
~~~

![DHTMLX Scheduler - Material](/img/material_skin.png)


[Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)


Der Material-Skin benötigt die Schriftart `Roboto`, die nicht standardmäßig enthalten ist. Sie müssen diese manuell wie folgt hinzufügen:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

## 'Skin Flat' {#flat-skin}

Um den 'Flat'-Skin zu verwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxscheduler.css**

Setzen Sie dann den Skin über die Eigenschaft **scheduler.skin**:

~~~js
scheduler.skin = "flat";
~~~

![DHTMLX Scheduler - Flat Theme](/img/flat_skin.png)


[Flat skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/03_flat.html)


## 'Skin Contrast Black' {#contrastblackskin}

Um den 'Contrast Black'-Skin anzuwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxscheduler.css**

Setzen Sie dann den Skin über die Eigenschaft **scheduler.skin**:

~~~js
scheduler.skin = "contrast-black";
~~~

![DHTMLX Scheduler - Contrast Black Theme](/img/contrast_black_skin.png)


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


## 'Skin Contrast White' {#contrast-white-skin}

Um den 'Contrast White'-Skin anzuwenden, binden Sie die Standard-CSS-Datei ein:

- **dhtmlxscheduler.css**

Setzen Sie dann den Skin über die Eigenschaft **scheduler.skin**:

~~~js
scheduler.skin = "contrast-white";
~~~

![DHTMLX Scheduler - Contrast White Theme](/img/contrast_white_skin.png)


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
