Content Security Policy Compliance
====================================

Content Security Policy Compliance (CSP) is a web standard used to prevent unauthorized JavaScript execution. 

The dhtmlxScheduler library provides the **ext/dhtmlxscheduler_csp.js** extension that allows working with dhtmlxScheduler 
in case Content Security Policy (CSP) is enabled in the app. It enhances the security of created apps. 

In order to enable CSP support in your app built with Scheduler, you need to include the *dhtmlxscheduler_csp.js* after *dhtmlxscheduler.js*:

~~~html
<script src="../codebase/ext/dhtmlxscheduler_csp.js"></script>
~~~


The *dhtmlxscheduler_csp.js* extension is applied on top of the base Scheduler and redefines insecure code (date formatters and parsers, mostly).
However, inline styles should be allowed, as they are used in many places across the component. 

In some cases the CSP compatible methods may cause performance regression, thus they are not used by default and the extension has to be enabled explicitly.