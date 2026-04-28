---
title: React Scheduler installieren
sidebar_label: Installation
description: "Wie man die Evaluierungs- oder kommerzielle Version von React Scheduler über npm installiert."
---

# React Scheduler installieren

React Scheduler ist in zwei Distributionen erhältlich:

1. **Evaluierungsversion** öffentlich verfügbar auf npm, enthält ein Evaluierungs-Wasserzeichen und kann optional mit einer kostenlosen Evaluierungsphase kombiniert werden, die Zugriff auf technischen Support gewährt.
2. **Professionelle (kommerziell) Version** verfügbar aus dem privaten DHTMLX npm-Repository und für die Produktion gedacht.

Beide Pakete enthalten dieselbe API.

## Installation der Evaluierungsversion (öffentliches npm)

Die Evaluierungsversion ist auf npm verfügbar unter [@dhtmlx/trial-react-scheduler](https://www.npmjs.com/package/@dhtmlx/trial-react-scheduler):

~~~bash
npm install @dhtmlx/trial-react-scheduler
~~~

Oder mit Yarn:

~~~bash
yarn add @dhtmlx/trial-react-scheduler
~~~

Dieses Build ist vollständig funktionsfähig, zeigt jedoch eine Meldung an, dass die Bibliothek im Evaluierungsmodus läuft.

### Optional: Eine vollständige Evaluierungsperiode starten (empfohlen)

Obwohl das Trial-Paket ohne Einschränkungen installiert wird, können Sie auch eine offizielle Evaluierung über die Website starten unter
[https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml](https://dhtmlx.com/docs/products/dhtmlxScheduler-for-React/download.shtml).

Die Durchführung einer formellen Evaluierung bietet Ihnen während der Testphase kostenlosen technischen Support.

**Offline-Beispiele herunterladen (ZIP)**

Das Evaluierungsformular enthält außerdem eine herunterladbare ZIP-Datei mit offline einsatzbereiten Beispielen.

Sie können auch weitere Beispiele und Demo-Projekte auf dem offiziellen GitHub ansehen, indem Sie [React Scheduler-Demos auf GitHub](https://github.com/DHTMLX/?q=react-scheduler&type=all&language=&sort=) aufrufen.

## Professionelle Version (privates npm)

Die professionelle Version wird für produktive Anwendungen verwendet und umfasst kommerzielle Lizenzen sowie vollen Zugriff auf den technischen Support.

Nachdem Sie eine kommerzielle Lizenz erhalten haben, können Sie Ihre privaten npm-Anmeldedaten im [Kundenbereich](https://dhtmlx.com/clients/) generieren.

Nachdem Sie Ihren Login/Passwort generiert haben, konfigurieren Sie npm:

~~~bash
npm config set @dhx:registry=https://npm.dhtmlx.com
npm login --registry=https://npm.dhtmlx.com --scope=@dhx
~~~

Dann installieren Sie das Professional-Paket:

~~~bash
npm install @dhx/react-scheduler
~~~

Oder, mit Yarn:

~~~bash
yarn add @dhx/react-scheduler
~~~

## Nächste Schritte

Nach der Installation fortfahren mit:

- [Schnellstart](integrations/react/quick-start.md)
- [Übersicht](integrations/react/overview.md)
- [Datenbindung & Grundlagen der Zustandsverwaltung](integrations/react/state/state-management-basics.md)
- [Framework-Anleitungen](/category/framework-integrations/)