defined
=============


@short:
	returns false if the provided argument is undefined, otherwise true

@params:

- event			object			the object that should be checked 						

@returns:
- state			boolean			false if the provided argument is undefined, otherwise true



@example:
// check if the "custom_property" property is defined for the event object
if(scheduler.defined(event.custom_property)){
  // ..
};

@template:	api_method
@descr:
@changelog:
added in version 6.0