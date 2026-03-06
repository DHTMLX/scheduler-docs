---
title: "Verwendung des Schedulers mit TypeScript"
sidebar_label: "Verwendung des Schedulers mit TypeScript"
---

# Verwendung des Schedulers mit TypeScript

Die dhtmlxScheduler-Bibliothek lässt sich mit TypeScript integrieren. Alle TypeScript-Typdefinitionen befinden sich in der Datei **dhtmlxscheduler.d.ts**.

Die Verwendung des Schedulers mit TypeScript bietet hilfreiche Code-Vervollständigungen in modernen IDEs. Außerdem trägt sie dazu bei, dass Ihr Code stabil bleibt, indem die verwendeten Typen kontinuierlich überprüft werden.

## Deklaration globaler Variablen

Die *dhtmlxscheduler.js*-Bibliothek definiert zwei globale Variablen, die Sie verwenden können: *window.scheduler* und *window.Scheduler*:

- Die Variable *scheduler* enthält die Standardinstanz des Schedulers.
- *Scheduler* ist nur in den Commercial-Versionen (seit dem 6. Oktober 2021), Enterprise- und Ultimate-Editionen verfügbar und bietet eine Factory-Methode zur Erstellung neuer Scheduler-Instanzen. Weitere Informationen finden Sie im Artikel [Mehrere Scheduler auf einer Seite erstellen](guides/multiple-per-page.md).

Da *dhtmlxscheduler.js* eine Standard-JavaScript-Bibliothek für den Browser ist, exportiert sie keine TypeScript-Module explizit. Deshalb müssen "scheduler" (oder "Scheduler") in TypeScript manuell deklariert werden, um Compiler-Fehler zu vermeiden. Es gibt zwei Möglichkeiten, dies zu tun:

- Beide Variablen sind in *@types/dhtmlxscheduler* deklariert und stehen nach dem Import zur Verfügung.
- Falls Sie die Typdefinitionen nicht verwenden möchten, können Sie die Variable direkt in Ihrem Code deklarieren:

~~~js
declare let scheduler: any;
~~~

Dadurch werden Kompilierungsfehler verhindert, und zur Laufzeit verweist Ihr Code korrekt auf die globale Scheduler-Instanz, sodass alles wie erwartet funktioniert.
