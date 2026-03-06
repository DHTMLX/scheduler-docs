---
title: "Skins"
sidebar_label: "Skins"
---

# Skins 

There are several predefined skins:

1. [Terrace (default)](guides/skins.md#terrace-skin)
1. [Dark](guides/skins.md#dark-skin)
2. [Material](guides/skins.md#material-skin)
3. [Flat](guides/skins.md#flat-skin)
4. [Contrast Black](guides/skins.md#contrast-black-skin)
5. [Contrast White](guides/skins.md#contrast-white-skin)

Starting from v7.0, all skins are bundled in the main **dhtmlxscheduler.css** file. A skin can be activated by setting the **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

Or by calling the [scheduler.setSkin()](api/method/setskin.md) method:

~~~js
scheduler.setSkin("dark");
~~~

In Scheduler v6.0 and earlier skins are defined in separate CSS files. 

### Using fonts

By default, skins import the `Inter` font from `https://fonts.googleapis.com`. Read more about Google Fonts [here](https://developers.google.com/fonts).

~~~js
@import (css) url(
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
);
~~~

If necessary, you can remove the font directly from **.less** files in the **codebase/sources/less/skins/material** folder and then rebuild the skin as described in the [Skins Customization](guides/custom-skins.md) article.

## 'Terrace' skin 

To apply the default skin, include the default CSS file:

- **dhtmlxscheduler.css**

![terrace_skin](/img/terrace_skin.png)


[Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)


## 'Dark' skin 

To apply the 'Dark' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

![dark_skin](/img/dark_skin.png)


[Dark skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/06_dark.html)


## 'Material' skin

To apply the 'Material' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "material";
~~~

![DHTMLX Scheduler - Material](/img/material_skin.png)


[Material skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/02_material.html)


The Material skin requires `Roboto` which is not imported by default. So you must add it manually as follows:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

## 'Flat' skin

To apply the 'Flat' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "flat";
~~~

![DHTMLX Scheduler - Flat Theme](/img/flat_skin.png)


[Flat skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/03_flat.html)


## 'Contrast Black' skin

To apply the 'Contrast Black' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "contrast-black";
~~~

![DHTMLX Scheduler - Contrast Black Theme](/img/contrast_black_skin.png)


[High contrast theme - Black](https://docs.dhtmlx.com/scheduler/samples/07_skins/04_contrast_black.html)


## 'Contrast White' skin

To apply the 'Contrast White' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "contrast-white";
~~~

![DHTMLX Scheduler - Contrast White Theme](/img/contrast_white_skin.png)


[High contrast theme - White](https://docs.dhtmlx.com/scheduler/samples/07_skins/05_contrast_white.html)
