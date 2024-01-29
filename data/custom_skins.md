Skins Customization
========================

Starting from v7.0 Scheduler skins use CSS variables that you can use for customization and styling.

{{sample
	07_skins/07_themes.html
}}

Key CSS Variables:

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

All variables can be found in the **codebase/sources/less/src/themes/variables.less** file of the package.

How to customize skins
-----------------

The easiest method to customize the Scheduler's appearance is by overriding the relevant CSS variables in your stylesheet. Here's an example:

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

{{sample
	07_skins/07_themes.html
}}

By defining variables in this manner, you can redefine the default styles, ensuring that your custom styles are applied to the Scheduler.

{{note For correct inheritance of values across the entire theme, define variables at the :root element.}}

It's important to define these styles at the **:root** element to ensure proper inheritance and application throughout the component. This approach guarantees that when a variable utilized by other variables is redefined, it correctly influences related styles across the component.

For instance, the variable `--dhx-scheduler-scale-color` inherits from the primary text color variable `--dhx-scheduler-container-color`.

- If you redefine `--dhx-scheduler-container-color` at the **:root** level, you ensure that `--dhx-scheduler-scale-color` reflects this change. 

~~~html
<style>
:root {
    /* --dhx-scheduler-scale-color and other
  variables that inherit `--dhx-scheduler-container-color`
  will be affected
  */
  --dhx-scheduler-container-color: #222;

}
</style>
~~~

- If you redefine `--dhx-scheduler-container-color` at a lower level in the DOM tree, such as within **.dhx_cal_container**, it won't affect the `--dhx-scheduler-scale-color` variable.

~~~html
<style>
.dhx_cal_container {
    /* only elements that directly 
  use --dhx-scheduler-container-color will be affected
  */
  --dhx-scheduler-container-color: #222;
}
</style>
~~~


How to use source codes
------------

dhtmlxScheduler is shipped with style files in the following forms:

- **codebase/dhtmlxscheduler.css** - a prebuilt compressed CSS file for skins, ready for production use;
- **codebase/sources/dhtmlxscheduler.css** - prebuilt readable CSS files;
- **codebase/sources/less/** - source less files of the Scheduler skins.

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

The structure of the **less** folder for version 7.0 (may be changed in future versions) is given below:

### Images

- **./src/imgs** - svg icons used by all skins
- **./src/iconfont** - icons are prebuilt into web font

### Skin definitions

The default set of variables is defined in the `terrace` skin, other skins redefine the corresponding variables and add styles.

- **./src/themes**
  - *./src/themes/variables.less* - common variables used by all skins, `terrace` skin
  - *./src/themes/contrast_black* - contrast black skin variables
  - *./src/themes/contrast_white* - contrast white skin variables
  - *./src/themes/material* - material skin variables
  - *./src/themes/dark* - dark skin variables
  - *./src/themes/flat* - flat skin variables

### Entry points for building skins

- theme.less
- package.json


Creating custom skin
-------------------

In order to create a new skin, you can copy and rename one of the existing skins from the **sources/less/src/themes** folder. Follow the steps below:

1) Copy and rename one of the existing files from the **sources/less/src/themes** folder, e.g.:

~~~
-> copy:
codebase/sources/less/src/themes/material.less

-> rename to:
codebase/sources/less/src/themes/custom.less
~~~

2) Import the new file in **sources/less/src/themes/index.less**, like this:

~~~
@import "./custom";
~~~

And add the content as in:

~~~css
:root[data-scheduler-theme='custom'] {
	--dhx-scheduler-theme: custom;
	--dhx-scheduler-font-family: Roboto, Helvetica, Arial, sans-serif;

	--dhx-scheduler-base-colors-primary: #0288D1;

}
~~~

Note that the skin variables should be defined under the `:root` elements, using the `data-scheduler-there` selector.

A new theme must include the **--dhx-scheduler-theme** variable with the theme name.

3) Rebuild skins

**Note** that scheduler may apply some predefined settings to the calendar based on the applied skin.
When you create a new skin by copying an existing one, you may need to apply the appropriate settings to the scheduler manually.


JS styling settings
---------------------

Note that not all aspects of Scheduler styling are controlled from CSS, some parameters are defined from the JavaScript configuration. They are:

- api/scheduler_hour_size_px_config.md
- and all settings of the [scheduler.xy](api/scheduler_xy_other.md) object 
