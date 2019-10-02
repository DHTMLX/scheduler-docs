responsive_lightbox
=============


@short: makes lightbox responsive on small screens
	
@default: true
@type: boolean
@example:

scheduler.config.responsive_lightbox = false;


@template:	api_config

@descr:

When this config is enabled (by default it is), the lightbox will have an additional `.dhx_cal_light_responsive` CSS class.

All built-in skins of the scheduler have predefined media queries that make the lightbox adaptive on smaller screens, which means that: 

- the lightbox will occupy the whole screen on a mobile device
- all labels and controls should be sized appropriately to the screen size

<img src="lightbox_responsive.png"/>

If you want to disable this behavior, you can switch the config off like this:

~~~js
scheduler.config.responsive_lightbox = false;
~~~


@related: 
touch_support.md