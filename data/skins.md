Skins 
==============

There are several predefined skins:

1. [Terrace (default)](skins.md#defaultskin)
1. [Dark](skins.md#dark)
2. [Material](skins.md#materialskin)
3. [Flat](skins.md#flatskin)
4. [Contrast Black](skins.md#contrastblackskin)
5. [Contrast White](skins.md#contrastwhiteskin)

Starting from v7.0 all skins are bundled in main **dhtmlxscheduler.css**. Skin can be activated by settings **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

Or by calling **scheduler.setSkin** method:

~~~js
scheduler.setSkin("dark");
~~~


In Scheduler v6.0 and earlier skins are defined in separate css files. 

'Terrace' skin 
-----------------------------
To apply the default skin, include the default CSS file:

- **dhtmlxscheduler.css**

![terrace_skin.png](terrace_skin.png)

{{sample 07_skins/01_default.html}}

By default, the skins imports `Inter` font from `https://fonts.googleapis.com`. Read more about Google Fonts [here](https://developers.google.com/fonts).
~~~js
@import (css) url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
~~~
You can remove the font, if necessary, directly from **.less** files in **codebase/sources/less/skins/material** folder and then rebuild the skin as described in the custom_skins.md article.

'Dark' skin 
-----------------------------
To apply the default skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set skin via **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

![terrace_skin.png](terrace_skin.png)

{{sample 07_skins/06_dark.html}}

'Material' skin
----------------
To apply the 'Material' skin, use **scheduler.skin** property:

~~~js
scheduler.skin = "material";
~~~

![](material_skin.png)

{{sample 07_skins/02_material.html}}

Material skin requires `Roboto` which is not imported by default. You must add it manually:
~~~js
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
~~~


'Flat' skin
-----------------------------
To apply the 'Flat' skin, use **scheduler.skin** property:

~~~js
scheduler.skin = "flat";
~~~

![flat_skin.png](flat_skin.png)

{{sample 07_skins/03_flat.html}}


'Contrast Black' skin
----------------------
To apply the 'Contrast Black' skin, use **scheduler.skin** property:

~~~js
scheduler.skin = "contrast-black";
~~~

![contrast_black_skin](contrast_black_skin.png)

{{sample 07_skins/04_contrast_black.html}}


'Contrast White' skin
----------------------
To apply the 'Contrast White' skin, use **scheduler.skin** property:

~~~js
scheduler.skin = "contrast-white";
~~~

![contrast_white_skin](contrast_white_skin.png)

{{sample 07_skins/05_contrast_white.html}}

