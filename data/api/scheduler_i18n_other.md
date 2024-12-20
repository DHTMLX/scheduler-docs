i18n
=============


@short: a set of methods for Scheduler localization
	

@type: object

@example:

@template:	api_config
@descr:
The **i18n** object provides the following methods:

- **addLocale(languageCode, localeObject)** - adds a new custom locale to Scheduler 
	- **languageCode** - (*string*) a two-letter language code 
	- **localeObject** - (*object*) an object of the locale
- **setLocale(localeObject: string|object)** - activates a specified locale

The method can take as a parameter either a language code:
~~~js
scheduler.i18n.setLocale("fr");
~~~

or an object of the locale:

~~~js
scheduler.i18n.setLocale({
   	labels: {
    	day_tab: "Day",
   }
});
~~~

- **getLocale(languageCode : string)** - returns a locale object by the language code


@changelog: added in v6.0

@related: localization.md

