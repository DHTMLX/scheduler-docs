Application Security
========================

Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers 
implementing the application. The backend must properly validate/escape/cleanse incoming data, user access rules, etc.

Please note that the client-side validation can be easily compromised or bypassed completely, thus it can't be relied on as a security means. It is aimed to give a user an immediate feedback in case of an erroneous input, 
without having to wait a server response, while the final validation should be done on the server. 

Here we highlight the most common types of attack and show possible ways to avoid them. Usually, just implementing the backend CRUD according to the best practices of your platform will be good enough.


##XSS Attacks

Possible vectors for XSS attacks are unsafe CRUD implementation on the backend, [Scheduler template functions](api/refs/scheduler_templates.md) and [user input via UI](lightbox_editors.md):

- the backend API that is used to save/load data into Scheduler (which lies within the responsibility of the developer) is expected to escape the input/output and provide Scheduler with safe data. 
If you use [dhtmlxConnector](howtostart_connector.md#step7loadingdatafromtheserver), it will [escape and sanitize the client input automatically](https://docs.dhtmlx.com/connector__php__app_security.html#protectionfromcrosssitescringxss). 
If you implement the backend on your own, you should consider escaping data you save to the database and load into Scheduler by yourself.

As for template functions and the lightbox listed below, they can only pose a threat, if you don't clean your data on the server. Note that securing the backend is usually enough to prevent possible XSS attacks, and vice versa, no client-side measures will be effective if the backend is not secure.

- a [template](api/refs/scheduler_templates.md) output is injected into the inner HTML of Scheduler as is, without any escaping or pre-processing. 

Templates allow inserting a custom markup (formatted text, icons, buttons, etc.) into Scheduler elements by design. However, it creates a possibility for injecting a remote code into the page. 
Any template can be redefined with the implementation you find suitable.

{{editor		http://snippet.dhtmlx.com/db4ac67b8			Template XSS}}


- the lightbox doesn't have any default validation of a client input, which, if not handled, also creates a gateway for XSS attacks. Please [check the article on the client-side validation](validation.md).

{{editor		http://snippet.dhtmlx.com/f30760ae0			Lightbox XSS}}


##SQL Injections

{{todo add a sentence about safety of how to start tutorials to the SQL Injections section}}

Scheduler is a 100% client-side component, thus SQL injections have to be prevented on the backend by the developer.

There are two points to consider:

- The lightbox doesn't have any default validation, which, if not handled, allows the user to enter any values into editable inputs.
- your backend API can be called by a PUT/POST request containing dangerous values manually, bypassing the client-side UI.

Thus you'll need to have some kind of SQL injections escaping on your backend. If you use [dhtmlxConnector](howtostart_connector.md#step7loadingdatafromtheserver) and specify a table configuration as shown in the related 
[documentation](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase), all values will be escaped automatically. Otherwise, you'll have to use a safe CRUD implementation, 
according to the good practices of the platform you use. 


##CSRF Attacks

If you use [dhtmlxConnector](howtostart_connector.md#step7loadingdatafromtheserver) on the backend, CSRF security can be enabled in the connector configuration. See the details
[in the related article](https://docs.dhtmlx.com/connector__php__app_security.html#preventingcsrfandxsrfattacks).

Otherwise, you'll have to handle it manually. Please check [this article](server_integration.md#customrequestheadersandparameters) for adding custom tokens of headers to a request sent by Scheduler to the backend. 

##Content Security Policy

The library provides a special extension that allows you to adjust the code of your application created with dhtmlxScheduler to comply with the CSP (Content Security Policy) standard. 
It helps preventing various code injection attacks and improve the safety of applications. 

[Read more about applying the CSP standard to a dhtmlxScheduler application](content_security_policy.md).


@linkclass:hidden