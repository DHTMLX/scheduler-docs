Skins Customization
========================

Starting from v7.0 Scheduler skins use css variables that can be used for customization of build in skins.

{{sample
	07_skins/07_themes.html
}}

Here is a list of primary variables you might need for customizing the skin:

~~~
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
	--dhx-scheduler-event-yellow: linear-gradient(180deg, #FFB725 0%, #FFBB25 31.25%, #FAEA27 100%);

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


All variables can be found in **codebase/sources/less/src/themes/variables.less** file of the package.


dhtmlxScheduler is shipped with style files in the following forms:

- **codebase/dhtmlxscheduler.css** - prebuilt compressed CSS file for skins, ready for production use;
- **codebase/sources/skins/dhtmlxscheduler.css** - prebuilt readable CSS files;
- **codebase/sources/less/dhtmlxscheduler*.less** - source less files of Scheduler skins.

The latter can be used for deep customization of existing skins or for creating a new skin.

How to start
------------

You can initialize **codebase/sources/less** as an NPM package. 
The sources will contain two types of files: 

- style sheets; 
- files with micro variables declaration which you can use for fine-tuning the scheduler view or for creating a new skin.

How to build skins
--------------------

In **codebase/sources/less/** run:

~~~
> npm install
~~~

After install is completed, you can rebuild CSS files using the following commands:

~~~
> npm run build
~~~

Or 

~~~
> npm run watch
~~~

The script will rebuild CSS files from sources and put them into the *codebase* folder of the scheduler package, replacing the existing ones.

You can find declarations of colors/fonts/sizes and other aspects of the Scheduler design in <br> **less/skins/&#60;skin name&#62;/skin.less** files.


Structure
------------

The structure of the **less** folder for version 5.0 (may be changed in future versions) is given below:

###Images

- **./imgs** - common/fallback images for all skins
- **./imgs_contrast_black** - images used by the contrast black skin
- **./imgs_contrast_white** - images used by the contrast white skin
- **./imgs_dhx_material** - images used by the material skin
- **./imgs_dhx_terrace** - images used by the terrace skin
- **./imgs_flat** - images used by the flat skin

###Skin definitions

- **./skins**
  - *./basic* - common styles and variables used by all skins
  - *./contrast_black* - contrast black skin definition
  - *./contrast_white* - contrast white skin definition
  - *./material* - material skin definition
  - *./terrace* - terrace skin definition
  - *./flat* - flat skin definition

###Entry points for building skins

- dhtmlxscheduler_contrast_black.less 
- dhtmlxscheduler_contrast_white.less
- dhtmlxscheduler_flat.less
- dhtmlxscheduler_material.less
- dhtmlxscheduler_terrace.less
- dhtmlxscheduler.less
- package.json

###Structure of a skin folder

- **less/skins/material/**
  - **./index.less** - main imports
  - **./skin.less** - micro variables
  - **./add_styles.less** - additional styles

###Import

Currently, for most skins **index.less** includes the following imports:

~~~
/* import default variables*/
@import "./../basic/skin"; 
/* import own variables */
@import "./skin"; 
/* import common stylesheet */
@import "./../basic/suite"; 
/* apply additional styles on the top of the common stylesheet*/
@import "./add_styles";
~~~

Creating custom skin
-------------------

In order to create a new skin, you can copy and rename one of the existing skins from the **sources/less/skins** folder. Follow the steps below:

1) Copy and rename one of the existing folders from the **sources/less/skins** folder, e.g.:

~~~
-> copy:
codebase/sources/less/skins/material

-> rename to:
codebase/sources/less/skins/custom
~~~

2) Create an entry point in the **codebase/sources/less** folder, like this:

~~~
codebase/sources/less/dhtmlxscheduler_custom.less
~~~

And add the content as in:

~~~
@import "./skins/custom/index";
~~~

It is not required for the file name to match the folder name, since the paths are specified explicitly.

3) Modify **codebase/sources/less/package.json** to add a build command for your new skin: 

- build a skin using the following command, e.g.:

~~~
node scripts.js --file=dhtmlxscheduler_custom
~~~

where *dhtmlxscheduler_custom* is the name of your custom skin file without the extension

- find the "scripts" section and add a new script in one of the following ways:

~~~
"scripts": {
    "build": "...",
    ...
    "build-custom": "node scripts.js --file=dhtmlxscheduler_custom"
    " watch": "npm-watch build"
}
~~~

or

~~~
"scripts": {
    "build": "... && npm run build-custom",
    ...
    "build-custom": "node scripts.js –file=dhtmlxscheduler_custom"
    "watch": "npm-watch build"
}
~~~

<br>
**Note**, that scheduler may apply some predefined settings to the calendar based on the applied skin.
When you create a new skin by copying an existing one, you may need to specify the name of the original skin in order for these predefined settings to remain applied.

For this, use the **scheduler.skin** property as in:

~~~js
// if you create a custom skin by copying the 'material' skin:
scheduler.skin = "material";
...
scheduler.init("scheduler_here", new Date(), "week");
~~~

or

~~~js
// if you create a custom skin by copying the 'flat' skin:
scheduler.skin = "flat";
...
scheduler.init("scheduler_here", new Date(), "week");
~~~

JS styling settings
---------------------

Note, that not all aspects of Scheduler styling are controlled from CSS, some parameters are defined from the JavaScript configuration. They are:

- api/scheduler_hour_size_px_config.md
- and all settings of the [scheduler.xy](api/scheduler_xy_other.md) object 

Currently, Scheduler uses two subsets of default settings, depending on skin applied: one for material skin and another for all other skins. The applied subset is 
[defined by the name of the applied CSS file automatically](skins.md#skindetection). In case of a custom skin such a detection may fail and you'll need to specify the skinset manually. 
It can be done using the **scheduler.skin** property:

~~~js
scheduler.skin = "material"; // for skins based on material
~~~

Values that include the "material" string will be interpreted as a material skin set. All other values will produce terrace/flat skin defaults.
