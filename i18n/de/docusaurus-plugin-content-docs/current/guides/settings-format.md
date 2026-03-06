---
title: "Datumsformat-Spezifikation"
sidebar_label: "Datumsformat-Spezifikation"
---

# Datumsformat-Spezifikation

Beim Einrichten von Datumsformaten können Sie die folgenden Zeichen verwenden:


- **%y** - stellt das Jahr als zweistellige Zahl dar ( _00 bis 99_ );
- **%Y** - stellt das Jahr als vierstellige Zahl dar ( _1900-9999_ );


- **%m** - der Monat als zweistellige Zahl mit führender Null ( _01 bis 12_ );
- **%n** - der Monat als Zahl ohne führende Null ( _1 bis 12_ );
- **%M** - der Monat abgekürzt ( _Jan bis Dec_ );
- **%F** - der vollständige Monatsname ( _January bis December_ );


- **%W** - die ISO-8601-Kalenderwoche des Jahres, wobei die Woche am Montag beginnt;


- **%d** - der Tag als zweistellige Zahl mit führender Null ( _01 bis 31_ );
- **%j** - der Tag als Zahl ohne führende Null ( _1 bis 31_ );
- **%D** - der Tag abgekürzt ( _Sun bis Sat_ );
- **%l** - der vollständige Tagesname ( _Sunday bis Saturday_ );


- **%h** - die Stunde im 12-Stunden-Format ( _00 bis 11_ );
- **%H** - die Stunde im 24-Stunden-Format ( _00 bis 23_ );
- **%g** - die Stunde im 12-Stunden-Format ohne führende Null ( _1 bis 12_ );
- **%G** - die Stunde im 24-Stunden-Format ohne führende Null ( _0 bis 23_ );


- **%i** - die Minute als zweistellige Zahl mit führender Null ( _00 bis 59_ );
- **%s** - die Sekunde als zweistellige Zahl mit führender Null ( _00 bis 59_ );
- **%a** - zeigt **am** (für Zeiten von Mitternacht bis Mittag) und **pm** (für Zeiten von Mittag bis Mitternacht) an;
- **%A** - zeigt **AM** (für Zeiten von Mitternacht bis Mittag) und **PM** (für Zeiten von Mittag bis Mitternacht) an.


Zum Beispiel: Um den 1. Juni 2013 als 01/06/2013 anzuzeigen, verwenden Sie das Format "%d/%m/%Y".
