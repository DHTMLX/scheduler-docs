---
title: "Application Security"
sidebar_label: "Application Security"
---

# Application Security

Scheduler doesn't provide any means of preventing an application from various threats, such as SQL injections or XSS and CSRF attacks. It is important that responsibility for keeping an application safe is on the developers 
implementing the application. The backend must properly validate/escape/cleanse incoming data, user access rules, etc.

Please note that the client-side validation can be easily compromised or bypassed completely, thus it can't be relied on as a security means. It is aimed to give a user an immediate feedback in case of an erroneous input, 
without having to wait a server response, while the final validation should be done on the server. 

Here we highlight the most common types of attack and show possible ways to avoid them. Usually, just implementing the backend CRUD according to the best practices of your platform will be good enough.


## XSS Attacks

Possible vectors for XSS attacks are unsafe CRUD implementation on the backend, [Scheduler template functions](api/overview/templates_overview.md) and [user input via UI](guides/lightbox-editors.md):

- the backend API that is used to save/load data into Scheduler (which lies within the responsibility of the developer) is expected to validate and sanitize user input and provide Scheduler with safe data. Use your framework's escaping/encoding tools and a trusted HTML sanitizer if you allow rich text. See [Server-Side Integration](guides/server-integration.md) for the data flow.

As for template functions and the lightbox listed below, they can only pose a threat, if you don't clean your data on the server. Note that securing the backend is usually enough to prevent possible XSS attacks, and vice versa, no client-side measures will be effective if the backend is not secure.

- a [template](api/overview/templates_overview.md) output is injected into the inner HTML of Scheduler as is, without any escaping or pre-processing. 

Templates allow inserting a custom markup (formatted text, icons, buttons, etc.) into Scheduler elements by design. However, it creates a possibility for injecting a remote code into the page. 
Any template can be redefined with the implementation you find suitable.

**Related sample** [Template XSS](https://snippet.dhtmlx.com/5/db4ac67b8)


- the lightbox doesn't have any default validation of a client input, which, if not handled, also creates a gateway for XSS attacks. Please [check the article on the client-side validation](guides/validation.md).

**Related sample** [Lightbox XSS](https://snippet.dhtmlx.com/5/f30760ae0)


## SQL Injections

Scheduler is a 100% client-side component, thus SQL injections have to be prevented on the backend by the developer.

There are two points to consider:

- The lightbox doesn't have any default validation, which, if not handled, allows the user to enter any values into editable inputs.
- your backend API can be called by a PUT/POST request containing dangerous values manually, bypassing the client-side UI.

Thus you'll need to prevent SQL injections on your backend. Use parameterized queries or an ORM, avoid string concatenation in SQL, and validate inputs according to the best practices of the platform you use.


## CSRF Attacks

Handle CSRF protection on the backend using your framework's CSRF middleware (tokens, same-site cookies, double submit, etc.). If you need to pass CSRF tokens in Scheduler requests, see [Server-Side Integration](guides/server-integration.md#custom-request-headers-and-parameters) for adding custom headers and parameters.

## Content Security Policy

The library provides a special config that allows you to adjust the code of your application created with dhtmlxScheduler to comply with the CSP (Content Security Policy) standard. 
It helps preventing various code injection attacks and improve the safety of applications. 

[Read more about applying the CSP standard to a dhtmlxScheduler application](api/config/csp.md).
