Multi-User Live Updates
========================

This article describes how to implement server-side support for the real-time updates module of DHTMLX Scheduler.

{{note This article refers to implementation of the Live Updates mode for DHTMLX Scheduler v7.2. See the details on the previous versions [here](live_update.md). }}

## Principle

DHTMLX Scheduler provides the `RemoteEvents` helper to synchronize changes among multiple users in real time.

### Key Workflow

- The `RemoteEvents` client opens a WebSocket connection when the Scheduler is initialized.
- The User changes (the "create", "edit", or "delete" events) are sent to the server via `DataProcessor` using the REST API.
- The server broadcasts updates to all connected clients via WebSocket after processing them.
- The `RemoteEvents` client receives the updates and applies them to the Scheduler, ensuring synchronization across users.

The design allows this backend module to support multiple DHTMLX widgets (e.g., Kanban, Gantt, Scheduler) within the same application. The shared format streamlines data synchronization without needing separate backends for each widget.

## Front-End Integration

Initialize `RemoteEvents` and set up `DataProcessor` in the same section of code where Scheduler data is loaded.

~~~js
const AUTH_TOKEN = "token";
scheduler.init('scheduler_here', new Date(2025, 3, 20), "week");
scheduler.load("/events");

const dp = scheduler.createDataProcessor({
    url: "/events",
    mode: "REST-JSON",
    headers: {
        "Remote-Token": AUTH_TOKEN
    }
});

const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~

### Key Details

- The `RemoteEvents` constructor requires an authorization token, which is sent in the **"Remote-Token"** header for server validation.
- The first argument specifies the `WebSocket` endpoint (e.g., **/api/v1**).
- The `remoteUpdates` helper handles incoming `WebSocket` messages and synchronizes Scheduler data.

## Backend Implementation

This section describes how to build a backend supporting live updates.

### Simplified Example

- [Check the example on GitHub](https://github.com/DHTMLX/scheduler-multiuser-backend-demo)

To test the implementation:

- Extract and run the backend project using `npm install` and `npm run start` commands.
- Open the frontend example in two separate browser tabs.
- Modify an event in one tab; the changes should appear in the second tab.


### Server-Side Workflow

#### 1. Handshake Request

When instantiated, `RemoteEvents` sends a **GET** request to the server to initialize the connection.

Example:
~~~
GET /api/v1
Remote-Token: AUTH_TOKEN
~~~

Response:

~~~
{"api":{},"data":{},"websocket":true}
~~~

#### 2. WebSocket Connection

After receiving a response, `RemoteEvents` establishes the websocket connection with the provided endpoint.

Example:

~~~
ws://${URL}?token=${token}&ws=1
~~~

The server verifies the token and responds with a message:

~~~
{"action":"start","body":"connectionId"}
~~~

Example implementation:

~~~js
app.get('/api/v1', (req, res) => {
    const token = req.headers['remote-token'];
    if (!token || !verifyAuthHeader(token)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    res.json({ api: {}, data: {}, websocket: true });
});

wss.on('connection', (ws, req) => {
    const token = new URLSearchParams(req.url.split('?')[1]).get('token');
    if (!token || !verifyAuthToken(token)) {
        ws.close(1008, 'Unauthorized');
        return;
    }
    const connectionId = generateConnectionId();
    ws.send(JSON.stringify({ action: 'start', body: connectionId }));
});
~~~

#### 3. Subscription

After the connection is established, the `RemoteEvents` subscribes to updates for specific entities, `events` in case of Scheduler:

~~~json
{"action":"subscribe","name":"events"}
~~~

To unsubscribe:

~~~json
{"action":"unsubscribe","name":"events"}
~~~

{{note This format supports scenarios where an application uses multiple DHTMLX widgets simultaneously. Each widget subscribes only to the updates relevant to its data.}}

Example:

~~~js
ws.on('message', function(message) {
	try {
		const msg = JSON.parse(message);
		const client = clients.get(connectionId);

		if (!client) return;

		if (msg.action === 'subscribe') {
			client.subscriptions.add(msg.name);
		} else if (msg.action === 'unsubscribe') {
			client.subscriptions.delete(msg.name);
		}
	} catch (err) {
		console.error('Error parsing WebSocket message:', err);
	}
});
~~~

#### 4. Broadcasting Updates

The server sends updates via WebSocket for changes like creating, updating, or deleting events in the format described below.

Upon receiving these messages, Scheduler automatically synchronizes its data using the `remoteUpdates` helper.


**Event Created**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"add-event","event":EVENT_OBJECT}}}
~~~

Example:

~~~js
app.post('/events', (req, res) => {
	const newEvent = req.body.event;
	const insertedEvent = crud.events.insert(newEvent);

	// Broadcast changes to connected clients
	const message = { 
		name: 'events', 
		value: {
			type: 'add-event', event: insertedEvent
		}
	};
	broadcast('event', message);

	res.status(200).json({ id: insertedEvent.id });
});

function broadcast(action, body) {
	const entity = body.name;

	for (const [connectionId, client] of clients.entries()) {
		const { ws, subscriptions } = client;

		if (subscriptions.has(entity) && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify({ action, body }));
		}
	}
}
~~~

**Event Updated**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"update-event","event":EVENT_OBJECT}}}
~~~

Example:

~~~js
app.put('/events/:id', (req, res) => {
	const id = req.params.id;
	const updatedEvent = req.body.event;

	crud.events.update(id, updatedEvent);

	// Broadcast changes to connected clients
	const message = {
		name: 'events',
		value: {
			type: 'update-event', event: updatedEvent
		}
	};
	broadcast('event', message);

	res.status(200).send();
});
~~~

**Event Deleted**

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"delete-event","event":{"id":ID}}}}
~~~

Example:


~~~js
app.delete('/events/:id', (req, res) => {
	const id = req.params.id;

	crud.events.delete(id);

	// Broadcast deletion to connected clients
	const message = {
		name: 'events',
		value: {
			type: 'delete-event',
			event: { id }
		}
	};
	broadcast('event', message);

	res.status(200).send();
});
~~~

## Advanced Customization

### Custom Handlers


In the described format, `RemoteEvents` helper is responsible for initial handshake of establishing a websocket connection with the server and receiving messages.
The second part of this module is `remoteUpdates` helper that is responsible for parsing messages received via a websocket and applying appropriate changes to Scheduler.

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
~~~


Normally, you can use these helpers without any extra configuration. But it is possible to extend the existing protocol by adding a custom helper or to implement a custom handler for remote updates.

The `RemoteEvents.on` method expects the object argument which can specify handlers for one or multiple entities:

~~~js
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on({ 
	events: function(message) {
		const { type, event } = message;
		switch (type) {
			case "add-event":
				// handle the add event
				break;
			case "update-event":
				// handle the update event
				break;
			case "delete-event":
				// handle the delete event
				break;
		}
	}
});
~~~

If you need to add a custom action, you can do it by adding an additional handler for `remoteEvents`:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);
remoteEvents.on({ 
	events: function(message) {
		const { type, event } = message;
		switch (type) {
			case "custom-action":
				// handle custom action
				break;
		}
	}
});
~~~

The handler will be invoked by the following message:

~~~json
{"action":"event","body":{"name":"events",
   "value":{"type":"custom-action","event":value}}}
~~~

If you want to use `RemoteEvents` to receive updates for custom entities, you can achieve it by adding a handler:

~~~js
const { RemoteEvents, remoteUpdates } = scheduler.ext.liveUpdates;
const remoteEvents = new RemoteEvents("/api/v1", AUTH_TOKEN);
remoteEvents.on(remoteUpdates);

// subscribing to custom entities
remoteEvents.on({ 
	calendars: function(message) {
		const { type, value } = message;
		switch (type) {
			case "custom-action":
				// handle custom action
				break;
		}
	}
});

~~~

When initialized that way, the `remoteEvents` object will send the websocket a subscription message formatted in the following way:

~~~json
{"action":"subscribe","name":"calendars"}
~~~

And the handler will be called whenever a message directed to the specified entity is received:

~~~json
{"action":"event","body":{"name":"calendars",
   "value":{"type":"custom-action","value":value}}}
~~~

This guide provides the foundation for implementing and customizing live updates in DHTMLX Scheduler. For a complete example, refer to the GitHub repository.

@index:
- live_update.md