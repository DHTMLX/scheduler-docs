---
title: "Anwendungssicherheit"
sidebar_label: "Anwendungssicherheit"
---

# Anwendungssicherheit

Der Scheduler selbst enthält keine integrierten Funktionen zum Schutz von Anwendungen vor Bedrohungen wie SQL-Injektionen, XSS- oder CSRF-Angriffen. Die Sicherstellung der Anwendungs­sicherheit liegt in erster Linie in der Verantwortung der Entwickler, die die Anwendung erstellen. Das Backend sollte alle eingehenden Daten gründlich validieren, escapen oder bereinigen und die Benutzerzugriffsregeln entsprechend durchsetzen.

Beachten Sie, dass clientseitige Validierung leicht umgangen oder manipuliert werden kann und daher nicht für Sicherheitszwecke verwendet werden sollte. Ihre Hauptfunktion besteht darin, Benutzern sofortiges Feedback zu fehlerhaften Eingaben zu geben, ohne auf eine Serverantwort warten zu müssen. Die endgültige Validierung muss immer serverseitig erfolgen.

Im Folgenden werden einige gängige Angriffsarten beschrieben und Möglichkeiten zu deren Vermeidung vorgeschlagen. Im Allgemeinen reicht es aus, die Best Practices für Backend-CRUD-Operationen auf Ihrer Plattform zu befolgen.


## XSS-Angriffe {#xssattacks}

XSS-Angriffe können durch unsichere Backend-CRUD-Implementierungen, [Scheduler-Template-Funktionen](api/overview/templates_overview.md) und [Benutzereingaben über die Benutzeroberfläche](guides/lightbox-editors.md) entstehen:

- Die Backend-API, die für das Speichern und Laden von Scheduler-Daten verantwortlich ist (die von Entwicklern implementiert werden muss), sollte Eingaben und Ausgaben ordnungsgemäß escapen, um die Datensicherheit zu gewährleisten. Bei Verwendung von [dhtmlxConnector](integrations/other/howtostart-connector.md#step7loadingdatafromtheserver) werden [Client-Eingaben automatisch escaped und bereinigt](https://docs.dhtmlx.com/connector__php__app_security.html#protectionfromcrosssitescringxss). Wenn Sie Ihr eigenes Backend entwickeln, ist es wichtig, das Escapen der im Backend gespeicherten und in den Scheduler geladenen Daten selbst zu übernehmen.

Bezüglich der Template-Funktionen und der Lightbox werden diese nur dann riskant, wenn auf Serverseite keine Datenbereinigung erfolgt. Die Absicherung des Backends reicht im Allgemeinen aus, um XSS-Angriffe zu verhindern, da clientseitige Schutzmechanismen ohne ein sicheres Backend nicht wirksam sind.

- Ein [Template](api/overview/templates_overview.md) gibt Inhalte direkt ohne Escaping oder Vorverarbeitung in das innere HTML des Schedulers aus.

Templates sind so konzipiert, dass sie benutzerdefiniertes Markup - wie formatierten Text, Icons oder Buttons - in Scheduler-Elementen ermöglichen. Dies eröffnet jedoch auch die Möglichkeit für potenzielle Code-Injektionen. Sie können jedes Template neu definieren, um Ihren Sicherheitsanforderungen zu entsprechen.

**Related sample** [Template XSS](https://snippet.dhtmlx.com/5/db4ac67b8)


- Die Lightbox führt keine standardmäßige Validierung der Benutzereingaben durch, was eine Schwachstelle für XSS darstellen kann, wenn dies nicht berücksichtigt wird. Weitere Informationen finden Sie im [Artikel zur clientseitigen Validierung](guides/validation.md).

**Related sample** [Lightbox XSS](https://snippet.dhtmlx.com/5/f30760ae0)


## SQL-Injektionen {#sqlinjections}

Da der Scheduler vollständig clientseitig arbeitet, liegt die Verhinderung von SQL-Injektionen in der Verantwortung des Backends.

Zwei wichtige Punkte:

- Die Lightbox enthält keine integrierte Validierung, sodass Benutzer beliebige Werte in editierbare Felder eingeben können, sofern keine Validierung implementiert ist.
- Backend-APIs können direkt über PUT/POST-Anfragen mit schädlichen Daten angesprochen werden, wodurch die Benutzeroberfläche umgangen wird.

Ihr Backend muss daher Maßnahmen zur Verhinderung von SQL-Injektionen implementieren. Wenn Sie [dhtmlxConnector](integrations/other/howtostart-connector.md#step7loadingdatafromtheserver) verwenden und Ihre Tabellen wie in der [Dokumentation](https://docs.dhtmlx.com/connector__php__basis.html#loadingfromdatabase) beschrieben konfigurieren, werden alle Eingaben automatisch escaped. Andernfalls stellen Sie sicher, dass Ihre CRUD-Implementierung die besten Sicherheitspraktiken Ihrer gewählten Plattform befolgt ([siehe hier](integrations/howtostart-guides.md)).


## CSRF-Angriffe {#csrfattacks}

Wenn Sie [dhtmlxConnector](integrations/other/howtostart-connector.md#step7loadingdatafromtheserver) im Backend verwenden, können Sie den CSRF-Schutz über die Konfiguration des Connectors aktivieren. Details finden Sie im entsprechenden Artikel zum [Schutz vor CSRF- und XSRF-Angriffen](https://docs.dhtmlx.com/connector__php__app_security.html#preventingcsrfandxsrfattacks).

Falls Sie dhtmlxConnector nicht verwenden, müssen Sie den CSRF-Schutz selbst umsetzen. Hinweise zum Hinzufügen eigener Tokens oder Header zu den vom Scheduler an Ihr Backend gesendeten Anfragen finden Sie in [diesem Artikel](guides/server-integration.md#custom-request-headers-and-parameters).


## Content Security Policy {#contentsecuritypolicy}

Die Bibliothek bietet eine Konfigurationsoption, mit der Sie Ihre dhtmlxScheduler-Anwendung an den Content Security Policy (CSP)-Standard anpassen können. Dies erhöht den Schutz vor verschiedenen Code-Injektionsangriffen und stärkt die allgemeine Sicherheit Ihrer Anwendung.

[Erfahren Sie mehr über die Anwendung von CSP in einer dhtmlxScheduler-Anwendung](api/config/csp.md).
