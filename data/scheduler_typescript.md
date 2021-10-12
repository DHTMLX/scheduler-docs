Using Scheduler with TypeScript
===============================

You can use the dhtmlxScheduler library together with TypeScript. All the TypeScript definitions are stored in the **dhtmlxscheduler.d.ts** file.

By using Scheduler with TypeScript you will get useful suggestions while working in any modern IDE. Besides, it guarantees the stability of code, since the used types will be 
constantly checked.


Declaring global variables
-------------------------------

*dhtmlxscheduler.js* declares two global variables you may need: *window.scheduler* and *window.Scheduler*: 

- The *scheduler* variable contains the default instance of Scheduler. 
- *Scheduler* is declared in the Commercial (since October 6, 2021), Enterprise and Ultimates versions of the component only and provides the factory method for creating new scheduler instances. Check the multiple_per_page.md article for details. 

Since *dhtmlxscheduler.js* is a regular browser JS library, it can't export TypeScript modules explicitly. Thus, "scheduler" (or "Scheduler") has to be declared in TypeScript manually, so that you could refer to them without a compiler error. There are two possible ways for this:

- both of these variables are declared in *@types/dhtmlxscheduler*, and will be available once you import them.
- if you don't want to use the type definitions, you can simply declare a variable manually in your code:

~~~js
declare let scheduler: any;
~~~

Thus you won't have any error during compilation, and at the runtime your code will refer to the global Scheduler instance, making everything work as expected.