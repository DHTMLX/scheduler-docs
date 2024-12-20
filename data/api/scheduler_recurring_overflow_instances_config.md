recurring_overflow_instances
=============

@deprecated:
The property works only in the [legacy extension for recurring events](recurring_events_legacy.md).

@short: defines the behavior of the recurrences that transfer to the next month
	
@default: undefined

@values: "skip"|"lastDay"|"none"

@type: string
@example:
scheduler.config.recurring_overflow_instances = "lastDay";

@template:	api_config


@descr:
{{note The property requires the [recurring](extensions_list.md#recurring) extension to be enabled.}}

Let's take an event that occurs every month on the 30th and consider its behavior in February for each option:

- **"skip"** - skips the event that happens on the date that does not exist. *The event will be skipped in February.* 
- **"lastDay"** - moves the event that happens on the date that does not exist to the last day of the month. *The event will occur on February 28th.*
- **"none"** - moves the event that happens on the date that does not exist to the first day of the next month. *The event will occur on March 1th.*

If the option is undefined, the "skip" behavior will be applied.

@changelog: added in v5.3.11

