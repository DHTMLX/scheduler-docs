---
title: "Content Security Policy-Konformität"
sidebar_label: "Content Security Policy-Konformität"
---

# Content Security Policy-Konformität

:::warning
Die beschriebene Funktionalität ist veraltet und wird nicht mehr gepflegt.
:::
Content Security Policy (CSP) ist ein Web-Standard, der dazu dient, das Ausführen von nicht autorisiertem JavaScript zu verhindern.

Die dhtmlxScheduler-Bibliothek enthält die **ext/dhtmlxscheduler_csp.js**-Erweiterung, die dafür sorgt, dass dhtmlxScheduler auch dann reibungslos funktioniert, wenn CSP in Ihrer Anwendung aktiviert ist. Diese Erweiterung erhöht die Sicherheit Ihrer Anwendungen.

Um CSP-Unterstützung in einer mit Scheduler erstellten App zu aktivieren, fügen Sie einfach *dhtmlxscheduler_csp.js* direkt nach *dhtmlxscheduler.js* hinzu:

~~~html
<script src="../codebase/ext/dhtmlxscheduler_csp.js"></script>
~~~

Die *dhtmlxscheduler_csp.js*-Erweiterung baut auf dem Basismodul von Scheduler auf und ersetzt unsicheren Code (hauptsächlich Datums-Formatter und -Parser). Beachten Sie, dass Inline-Styles erlaubt sein müssen, da sie in vielen Teilen der Komponente verwendet werden.

In manchen Situationen können die CSP-kompatiblen Methoden die Performance etwas beeinträchtigen. Sie sind daher nicht standardmäßig aktiviert und müssen explizit eingeschaltet werden.

:::warning
 Dieses Feature ist seit Version 6.0 veraltet. Stattdessen sollte der Modus für die interne Implementierung der Datumsformatierungsmethoden gesetzt werden. [Weitere Details](api/config/csp.md).
:::
