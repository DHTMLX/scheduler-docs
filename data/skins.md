Skins 
==============

There are 3 predefined skins:


1. [Default](skins.md#defaultskin)
2. [Glossy](skins.md#glossyskin)
3. [Classic](skins.md#classicskin)
4. [Flat](skins.md#flatskin)

Each skin requires including its specific files. 

Default skin 
-----------------------------
To apply the default skin, include the default code files:



- **dhtmlxscheduler.js**
- **dhtmlxscheduler.css**


![white_skin.png](white_skin.png)

{{sample 07_skins/01_default.html}}



'Glossy' skin
----------------------------------
To apply the 'Glossy' skin, include the files as in:


- **dhtmlxscheduler.js**
- **dhtmlxscheduler_glossy.css**

![glossy_skin.png](glossy_skin.png)

{{sample 07_skins/02_glossy.html}}

'Classic' skin
-----------------------------
To apply the 'Classic' skin, include the files as in:

- **dhtmlxscheduler.js**
- **dhtmlxscheduler_classic.css**

![default_skin.png](default_skin.png)

{{sample 07_skins/03_classic.html}}



'Flat' skin
-----------------------------
To apply the 'Flat' skin, include the files as in:

- **dhtmlxscheduler.js**
- **dhtmlxscheduler_flat.css**

![default_skin.png](flat_skin.png)

{{sample 07_skins/13_flat.html}}

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