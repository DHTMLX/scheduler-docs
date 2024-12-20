setSkin
=============

@short:
	sets the active skin

@params:

- skin	string	the name of the skin. The allowed values are: "terrace", "dark", "material", "flat", "contrast-white", "contrast-black"


@example:

scheduler.setSkin("flat");

@template:	api_method
@descr:

If the method is called after a scheduler is initialized, it will trigger the [render](api/scheduler_render.md) method. 

If called before initialization, the method will have the same effect as the assignment of the `scheduler.skin` property:

~~~js
scheduler.skin = "flat";
~~~

@related:
	skins.md
@relatedsample:
	07_skins/07_themes.html

