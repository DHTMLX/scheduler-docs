---
title: "Multiple Users"
sidebar_label: "Multiple Users"
---

# Multiple Users

This guide shows a modern way to handle events owned by different users or resources. The core idea is to store an owner field in each event, enforce permissions on the server, and reflect ownership on the client.

## Data model

Add an owner field to event data, for example `ownerId`. It can represent a user, a team, or any resource you use for access control.

## Client-side setup

Use a single data endpoint and DataProcessor, then assign ownership when an event is created. This keeps ownership consistent for new records.

~~~js
const CURRENT_USER_ID = 1;

scheduler.init("scheduler_here", new Date(), "month");
scheduler.load("/api/events");

const dp = scheduler.createDataProcessor({
    url: "/api/events",
    mode: "REST"
});

scheduler.attachEvent("onEventCreated", function(id){
    const ev = scheduler.getEvent(id);
    ev.ownerId = CURRENT_USER_ID;
});
~~~

For a detailed DataProcessor setup, see [Server-Side Integration](guides/server-integration.md) and [createDataProcessor](api/method/createdataprocessor.md).

## Styling by owner

To visually differentiate ownership, use the [event_class](api/template/event_class.md) template and define CSS classes, as described in [Custom Event's Color](guides/custom-events-color.md).

~~~js
scheduler.templates.event_class = function(start, end, ev){
    if (ev.ownerId === CURRENT_USER_ID) return "event_owner_current";
    return "event_owner_other";
};
~~~

~~~css
.event_owner_current {
    --dhx-scheduler-event-background: #3f7cff;
    --dhx-scheduler-event-color: #ffffff;
}

.event_owner_other {
    --dhx-scheduler-event-background: #e6e9f2;
    --dhx-scheduler-event-color: #1b1f2a;
}
~~~

## Read-only enforcement

The server must enforce permissions by filtering data for the current user and rejecting updates for events they don't own. On the client, you can also block edits for non-owned events, for example by setting `event.readonly = true` and enabling the [readonly](guides/readonly.md) extension, or by using event handlers that return `false` when the user tries to edit a non-owned event.

For ownership assignment on create, see [onEventCreated](api/event/oneventcreated.md).
