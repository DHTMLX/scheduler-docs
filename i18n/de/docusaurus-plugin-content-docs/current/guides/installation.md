---
title: "Möglichkeiten zur Installation des Schedulers"
sidebar_label: "Möglichkeiten zur Installation des Schedulers"
---

# Möglichkeiten zur Installation des Schedulers 

Es gibt mehrere Möglichkeiten, das dhtmlxScheduler-Paket zu Ihrem Projekt hinzuzufügen, einschließlich der Verwendung von Paketmanagern wie [Bower](https://bower.io/) oder [npm](https://www.npmjs.com/).

Alternativ können Sie die benötigten JS- und CSS-Dateien direkt über ein CDN einbinden.

## npm - Evaluierungs- und PRO-Versionen {#npmevaluationandproversions}

**Professional Evaluierungs-Version**

Sie können das [Testpaket des Schedulers](https://dhtmlx.com/docs/products/dhtmlxScheduler/download.shtml) herunterladen und den Anweisungen in der README-Datei folgen. 
Beachten Sie, dass die Testversion des Schedulers nur für 30 Tage verfügbar ist.

**Professional-Version**

Der Zugriff auf das private npm von DHTMLX ist über den [Client-Bereich](https://dhtmlx.com/clients/) möglich, indem Sie Ihren npm-Benutzernamen und Ihr Passwort generieren. Dort finden Sie auch eine ausführliche Installationsanleitung. Beachten Sie, dass der Zugriff auf das private npm nur solange aktiv ist, wie Ihre proprietäre Scheduler-Lizenz gültig ist.

## npm - Standard Free Version {#npmstandardfreeversion}

Die Standardversion des Schedulers kann von [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) mit folgendem Befehl installiert werden:

~~~html
npm install dhtmlx-scheduler
~~~

:::note
Nur die Standardversion des Schedulers ist auf [npmjs.com](https://www.npmjs.com/package/dhtmlx-scheduler) verfügbar
:::

## Bower {#bower}

Um die Standardversion des Schedulers über [Bower](https://bower.io/) zu erhalten, führen Sie diesen Befehl aus:

~~~html
bower install scheduler
~~~

## CDN {#cdn}

Das Einbinden der JS- und CSS-Dateien über ein CDN erfolgt durch direktes Verlinken der Dateien **dhtmlxscheduler.js** und **dhtmlxscheduler.css**:

~~~html
<link rel="stylesheet" href="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css" 
    type="text/css"> 
<script src="http://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js" 
    type="text/javascript"></script>  
~~~

Eine vollständige Liste der CDN-Links für verschiedene dhtmlxScheduler-Versionen finden Sie in einem [separaten Artikel](guides/cdn-links-list.md).

## PRO Edition zum Projekt hinzufügen {#addingproeditionintoproject}

Die Standard-Edition der Komponente, die über öffentliche Quellen wie CDN, Bower und npm verfügbar ist, wird unter der GPL-Lizenz verteilt.

Für die Professional- und Evaluierungs-Versionen können Sie unser [privates npm-Registry](#npmevaluationandproversions) verwenden, um das Paket zu installieren.

Wenn diese Optionen nicht zugänglich sind, gibt es zwei Alternativen, um die Pro-Version zu Ihrem Projekt hinzuzufügen:
 
- Die Pro-Version manuell zu Ihrem Projekt hinzufügen
- Die Pro-Version per npm aus einem lokalen Verzeichnis installieren

### Installation des Pakets aus einem lokalen Ordner (#installfromlocalfolder)

Bei Verwendung von **npm** kann das Pro-Paket aus einem lokalen Ordner mit den Befehlen [`npm install ./local_path`](https://docs.npmjs.com/cli/install/) oder [`npm link`](https://docs.npmjs.com/cli/link/) installiert werden.
Hier sind die Schritt-für-Schritt-Anleitungen für beide Methoden:

### npm install

1. Kopieren Sie das Scheduler-Paket in ein lokales Verzeichnis
2. Wechseln Sie in Ihr Projektverzeichnis
3. Führen Sie `npm install ../scheduler-local-package-path` aus

### npm link

1. Kopieren Sie das Scheduler-Paket in ein lokales Verzeichnis
2. Führen Sie `npm link` im Paketordner aus
3. Wechseln Sie in Ihr Projektverzeichnis
4. Führen Sie `npm link dhtmlx-scheduler` aus

Einen detaillierten Vergleich zwischen der Standard- und der PRO-Version von dhtmlxScheduler finden Sie im zugehörigen Artikel [Standard vs PRO Library Versions](guides/editions-comparison.md).
