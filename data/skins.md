Skins 
==============

There are several predefined skins:

1. [Terrace (default)](skins.md#defaultskin)
2. [Material](skins.md#materialskin)
3. [Flat](skins.md#flatskin)
4. [Contrast Black](skins.md#contrastblackskin)
5. [Contrast White](skins.md#contrastwhiteskin)

Each skin requires including its specific CSS file. 

'Terrace' skin 
-----------------------------
To apply the default skin, include the default CSS file:

- **dhtmlxscheduler.css**

![terrace_skin.png](terrace_skin.png)

{{sample 07_skins/01_default.html}}


'Material' skin
----------------
To apply the 'Material' skin, include the CSS file as in:

- **dhtmlxscheduler_material.css**

![](material_skin.png)

{{sample 07_skins/02_material.html}}


'Flat' skin
-----------------------------
To apply the 'Flat' skin, include the CSS file as in:

- **dhtmlxscheduler_flat.css**

![flat_skin.png](flat_skin.png)

{{sample 07_skins/03_flat.html}}


'Contrast Black' skin
----------------------
To apply the 'Contrast Black' skin, include the CSS file as in:

- **dhtmlxscheduler_contrast_black.css**

![contrast_black_skin](contrast_black_skin.png)

{{sample 07_skins/04_contrast_black.html}}


'Contrast White' skin
----------------------
To apply the 'Contrast White' skin, include the CSS file as in:

- **dhtmlxscheduler_contrast_white.css**

![contrast_white_skin](contrast_white_skin.png)

{{sample 07_skins/05_contrast_white.html}}

## Skin Detection

By default, the scheduler autodetects the skin by  the name of a CSS file in use.  
If you need to rename the CSS file, you can force correct skin usage by adding the following code line:

~~~js
scheduler.skin = "flat";  
// supported values are terrace, flat, material, contrast_white, contrast_black
~~~

If you are using a custom skin you can use:

~~~js
scheduler.skin = "custom";
~~~