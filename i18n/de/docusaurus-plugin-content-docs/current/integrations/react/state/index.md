---
title: "Daten- und Zustandsverwaltung"
description: "Wie man den React Scheduler an den React-Zustand oder eine Zustandsverwaltung bindet, Benutzereingaben behandelt und zwischen vom React verwalteten und vom Scheduler verwalteten Datenmodellen wählt."
---

Dieser Abschnitt erläutert, wie Scheduler-Daten mit Ihrem Anwendungszustand synchron gehalten werden. Er behandelt das empfohlene React-gesteuerte Modell (React oder ein Store als Quelle der Wahrheit), das leistungsorientierte Scheduler-gemanagte Modell und praxisnahe Implementierungen für beliebte State-Bibliotheken.

## Erste Schritte

Lesen Sie dies zuerst, um die zwei unterstützten Datenmodelle und die gängigen Integrationsmuster zu verstehen:

- [Datenbindung und State-Management-Grundlagen](integrations/react/state/state-management-basics.md)

Es erläutert, wie Sie `data.save`- und `data.batchSave`-Callbacks verwenden, wie das Laden in jedes Modell integriert wird und welche Änderungen auftreten, wenn Scheduler die Daten intern verwaltet.

## Wählen Sie Ihre Zustandsbibliothek

Jede der untenstehenden Tutorials folgt demselben Kernmuster (Zustand -> Props -> Scheduler, Änderungen -> Callbacks -> Zustand), verwendet jedoch die Idiome der jeweiligen Bibliothek:

- [Redux Toolkit](integrations/react/state/redux-toolkit.md)
- [Zustand](integrations/react/state/zustand.md)
- [MobX](integrations/react/state/mobx.md)
- [XState](integrations/react/state/xstate.md)
- [Jotai](integrations/react/state/jotai.md)
- [Valtio](integrations/react/state/valtio.md)

## Echtzeit-Synchronisation

Wenn Sie Live-Updates benötigen, beginnen Sie hier:

- [Firebase-Integration](integrations/react/firebase-integration.md)

## Leistungs-Hinweise

Wenn Ihre App umfangreiche Operationen ausführt (Bulk-Bearbeitungen, häufige Aktualisierungen, große Datensätze), beachten Sie Folgendes:

- die Verwendung von `data.batchSave`, um den Aktualisierungsaufwand zu reduzieren,
- das Scheduler-gemanagte Datenmodell, wenn React nicht jede Änderung sofort widerspiegeln muss.

Beide Themen finden Sie in [Datenbindung und State-Management-Grundlagen](integrations/react/state/state-management-basics.md).