Skins 
==============

There are several predefined skins:

1. [Terrace (default)](skins.md#terraceskin)
1. [Dark](skins.md#darkskin)
2. [Material](skins.md#materialskin)
3. [Flat](skins.md#flatskin)
4. [Contrast Black](skins.md#contrastblackskin)
5. [Contrast White](skins.md#contrastwhiteskin)

Starting from v7.0, all skins are bundled in the main **dhtmlxscheduler.css** file. A skin can be activated by setting the **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

Or by calling the **scheduler.setSkin** method:

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

If necessary, you can remove the font directly from **.less** files in the **codebase/sources/less/skins/material** folder and then rebuild the skin as described in the custom_skins.md article.

'Terrace' skin 
-----------------------------

To apply the default skin, include the default CSS file:

- **dhtmlxscheduler.css**

<img alt="DHTMLX Scheduler - Light Theme" src="terrace_skin.png" style="border: 1px solid #E4E4E4"/>

{{sample 07_skins/01_default.html}}

'Dark' skin 
-----------------------------

To apply the 'Dark' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "dark";
~~~

<img alt="DHTMLX Scheduler - Dark Theme" src="dark_skin.png" style="border: 1px solid #E4E4E4"/>

{{sample 07_skins/06_dark.html}}

'Material' skin
----------------

To apply the 'Material' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "material";
~~~

![DHTMLX Scheduler - Material](material_skin.png)

{{sample 07_skins/02_material.html}}

The Material skin requires `Roboto` which is not imported by default. So you must add it manually as follows:

~~~js
@import url(
'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
);
~~~

'Flat' skin
-----------------------------

To apply the 'Flat' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "flat";
~~~

![DHTMLX Scheduler - Flat Theme](flat_skin.png)

{{sample 07_skins/03_flat.html}}


'Contrast Black' skin
----------------------

To apply the 'Contrast Black' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "contrast-black";
~~~

![DHTMLX Scheduler - Contrast Black Theme](contrast_black_skin.png)

{{sample 07_skins/04_contrast_black.html}}


'Contrast White' skin
----------------------

To apply the 'Contrast White' skin, include the default CSS file:

- **dhtmlxscheduler.css**

And set the skin via the **scheduler.skin** property:

~~~js
scheduler.skin = "contrast-white";
~~~

![DHTMLX Scheduler - Contrast White Theme](contrast_white_skin.png)

{{sample 07_skins/05_contrast_white.html}}

