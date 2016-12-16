Skins 
==============

There are several predefined skins:

1. [Terrace (default)](skins.md#defaultskin)
2. [Glossy](skins.md#glossyskin)
3. [Classic](skins.md#classicskin)
4. [Flat](skins.md#flatskin)
5. [Contrast Black](skins.md#contrastblackskin)
6. [Contrast White](skins.md#contrastwhiteskin)

Each skin requires including its specific CSS file. 

'Terrace' skin 
-----------------------------
To apply the default skin, include the default CSS file:

- **dhtmlxscheduler.css**

![terrace_skin.png](white_skin.png)

{{sample 07_skins/01_default.html}}


'Glossy' skin
----------------------------------
To apply the 'Glossy' skin, include the CSS file as in:

- **dhtmlxscheduler_glossy.css**

![glossy_skin.png](glossy_skin.png)

{{sample 07_skins/02_glossy.html}}

'Classic' skin
-----------------------------
To apply the 'Classic' skin, include the CSS file as in:

- **dhtmlxscheduler_classic.css**

![classic_skin.png](default_skin.png)

{{sample 07_skins/03_classic.html}}


'Flat' skin
-----------------------------
To apply the 'Flat' skin, include the CSS file as in:

- **dhtmlxscheduler_flat.css**

![flat_skin.png](flat_skin.png)

{{sample 07_skins/13_flat.html}}


'Contrast Black' skin
----------------------
To apply the 'Contrast Black' skin, include the CSS file as in:

- **dhtmlxscheduler_contrast_black.css**

![contrast_black_skin](contrast_black_skin.png)

{{sample 07_skins/17_contrast_black.html}}

'Contrast White' skin
----------------------
To apply the 'Contrast White' skin, include the CSS file as in:

- **dhtmlxscheduler_contrast_white.css**

![contrast_white_skin](contrast_white_skin.png)

{{sample 07_skins/21_contrast_white.html}}

## Skin Detection

By default, the scheduler autodetects the skin by  the name of a css file in use.  
If you need to rename the css file, you can force correct skin usage by adding code like next:

~~~js
scheduler.skin = "classic"; //valid values are classic, glossy, terrace
~~~

If you are using a custom skin you can use:

~~~js
scheduler.skin = "custom";
~~~