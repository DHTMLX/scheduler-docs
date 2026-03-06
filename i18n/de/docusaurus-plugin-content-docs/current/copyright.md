---
title: "Lizenzen Dritter"
sidebar_label: "Lizenzen Dritter"
---

# Lizenzen Dritter

Dieser Artikel listet Hinweise und zusätzliche Bedingungen für Softwarekomponenten von Drittanbietern auf, die in der DHTMLX Scheduler-Bibliothek enthalten sind.

Die **Roboto Google-Schriftart** ist standardmäßig nicht im Lieferumfang der Bibliothek enthalten. Ab Scheduler v5.0 lädt das Material-Design-Theme die Roboto-Schriftart dynamisch von `https://fonts.googleapis.com`. Diese Schriftart steht unter der Apache Software License.

Die DHTMLX Scheduler-Bibliothek stellt Quell-LESS-Dateien für das Scheduler-Design bereit. Sie können das NPM-Paket installieren und das npm-watch-Skript aus der Datei *codebase/sources/less/package.json* verwenden, um die Designs anzupassen und neu zu erstellen. Die hierfür verwendeten Bibliotheken **npm-watch** und **less** stehen unter den Lizenzen MIT bzw. Apache und sind standardmäßig nicht im Scheduler-Paket enthalten.

Zusätzlich werden einige Open-Source-Bibliotheken in den Beispielanwendungen verwendet, wie **DHTMLX Suite 5.x** und **DHTMLX Suite 6.x**. Die Beispiele enthalten außerdem die Node.js-Module **Underscore** und **Backbone**. Die **jQuery**-Bibliothek wird von einem CDN geladen. Backend-Beispiele nutzen Node.js-Module wie **Express, body-parser, helmet** und andere.

## Komponenten, die in der Kernbibliothek von Scheduler verwendet werden

### Roboto Google Font

Copyright 2020 DHTMLX

Lizenziert unter der Apache License, Version 2.0 (die "Lizenz");
die Nutzung dieser Datei unterliegt den Bedingungen der Lizenz.
Die Lizenz kann eingesehen werden unter


<p>http://www.apache.org/licenses/LICENSE-2.0</p>

Sofern nicht gesetzlich vorgeschrieben oder schriftlich vereinbart, wird die unter der Lizenz bereitgestellte Software "WIE BESEHEN" bereitgestellt,
ohne jegliche Gewährleistungen oder Bedingungen.
Weitere Informationen zu den spezifischen Rechten und Einschränkungen finden Sie in der Lizenz.


## Komponenten, die in der Beispielanwendung verwendet werden

### Underscore.js 1.5.1

~~~js title="http://underscorejs.org"

(c) 2009-2013 Jeremy Ashkenas, DocumentCloud und Investigative Reporters & Editors


Underscore steht unter der MIT-Lizenz.

### Backbone.js 1.0.0

(c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.


Backbone wird unter der MIT-Lizenz vertrieben.


Für vollständige Details und Dokumentation:


~~~js title="https://backbonejs.org/"
### body-parser 1.19.0

Die MIT-Lizenz

Copyright (c) 2014 Jonathan Ong &lt;me@jongleberry.com&gt;


Copyright (c) 2014-2015 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

Die Erlaubnis wird hiermit kostenlos erteilt, jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Software uneingeschränkt zu nutzen, einschließlich und ohne Einschränkung des Rechts, sie zu verwenden, zu kopieren, zu modifizieren, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software bereitgestellt wird, dies ebenfalls zu gestatten, unter den folgenden Bedingungen:

Der Urheberrechtshinweis und dieser Erlaubnishinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG.
IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNGEN VERANTWORTLICH, OB AUS EINEM VERTRAG, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE AUS DER SOFTWARE ODER DER VERWENDUNG ODER ANDEREN GESCHÄFTEN MIT DER SOFTWARE ENTSTEHEN.

### date-format-lite 17.7.0

DIE MIT-LIZENZ

Copyright (c) 2012-2016 Lauri Rooden &lt;lauri@rooden.ee&gt;

Die Erlaubnis wird hiermit kostenlos erteilt, jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Software uneingeschränkt zu nutzen, einschließlich und ohne Einschränkung des Rechts, sie zu verwenden, zu kopieren, zu modifizieren, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software bereitgestellt wird, dies ebenfalls zu gestatten, unter den folgenden Bedingungen:

Der Urheberrechtshinweis und dieser Erlaubnishinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG. IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNGEN VERANTWORTLICH, OB AUS EINEM VERTRAG, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE AUS DER SOFTWARE ODER DER VERWENDUNG DER SOFTWARE ENTSTEHEN.

### express 4.17.0

Die MIT-Lizenz

Copyright (c) 2009-2014 TJ Holowaychuk &lt;tj@vision-media.ca&gt;


Copyright (c) 2013-2014 Roman Shtylman &lt;shtylman+expressjs@gmail.com&gt;


Copyright (c) 2014-2015 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

Die Erlaubnis wird hiermit kostenlos erteilt, jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Software uneingeschränkt zu nutzen, einschließlich und ohne Einschränkung des Rechts, sie zu verwenden, zu kopieren, zu modifizieren, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software bereitgestellt wird, dies ebenfalls zu gestatten, unter den folgenden Bedingungen:

Der Urheberrechtshinweis und dieser Erlaubnishinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG.
IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNGEN VERANTWORTLICH, OB AUS EINEM VERTRAG, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE AUS DER SOFTWARE ODER DER VERWENDUNG DER SOFTWARE ENTSTEHEN.

### helmet 3.18.0

Die MIT-Lizenz

Copyright (c) 2012-2019 Evan Hahn, Adam Baldwin

Die Erlaubnis wird hiermit kostenlos erteilt, jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Software uneingeschränkt zu nutzen, einschließlich und ohne Einschränkung des Rechts, sie zu verwenden, zu kopieren, zu modifizieren, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software bereitgestellt wird, dies ebenfalls zu gestatten, unter den folgenden Bedingungen:

Der Urheberrechtshinweis und dieser Erlaubnishinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG.
IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNGEN VERANTWORTLICH, OB AUS EINEM VERTRAG, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE AUS DER SOFTWARE ODER DER VERWENDUNG DER SOFTWARE ENTSTEHEN.

### morgan 1.9.1

Die MIT-Lizenz

Copyright (c) 2014 Jonathan Ong &lt;me@jongleberry.com&gt; 


Copyright (c) 2014-2017 Douglas Christopher Wilson &lt;doug@somethingdoug.com&gt;

Die Erlaubnis wird hiermit kostenlos erteilt, jeder Person, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die "Software") erhält, die Software uneingeschränkt zu nutzen, einschließlich und ohne Einschränkung des Rechts, sie zu verwenden, zu kopieren, zu modifizieren, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software bereitgestellt wird, dies ebenfalls zu gestatten, unter den folgenden Bedingungen:

Der Urheberrechtshinweis und dieser Erlaubnishinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG.
IN KEINEM FALL SIND DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR JEGLICHE ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNGEN VERANTWORTLICH, OB AUS EINEM VERTRAG, EINER UNERLAUBTEN HANDLUNG ODER ANDERWEITIG, DIE AUS DER SOFTWARE ODER DER VERWENDUNG DER SOFTWARE ENTSTEHEN.

### xss-filters 1.2.7

Copyright (c) 2015, Yahoo! Inc. Alle Rechte vorbehalten.

Die Weiterverbreitung und Nutzung dieser Software in Quell- und Binärform, mit oder ohne Modifikation, ist unter den folgenden Bedingungen gestattet:

* Weiterverteilungen des Quellcodes müssen den obigen
  Urheberrechtshinweis, diese Liste der Bedingungen und den
  folgenden Haftungsausschluss enthalten.

* Weiterverteilungen in Binärform müssen den obigen
  Urheberrechtshinweis, diese Liste der Bedingungen und den
  folgenden Haftungsausschluss in der Dokumentation und/oder anderen
  Materialien, die mit der Verteilung bereitgestellt werden, reproduzieren.

* Weder der Name Yahoo! Inc. noch die Namen seiner
  Mitwirkenden dürfen verwendet werden, um Produkte, die von dieser Software abgeleitet wurden, zu unterstützen oder zu bewerben, ohne vorherige schriftliche Genehmigung.

DIESE SOFTWARE WIRD VON DEN URHEBERRECHTSINHABERN UND MITWIRKENDEN "WIE BESEHEN" BEREITGESTELLT,
UND JEGLICHE AUSDRÜCKLICHEN ODER STILLSCHWEIGENDEN GEWÄHRLEISTUNGEN, EINSCHLIESSLICH ABER NICHT BESCHRÄNKT AUF DIE STILLSCHWEIGENDEN GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT UND DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK, WERDEN AUSGESCHLOSSEN.
IN KEINEM FALL SIND DIE URHEBERRECHTSINHABER ODER MITWIRKENDEN FÜR JEGLICHE DIREKTE, INDIREKTE, ZUFÄLLIGE, BESONDERE, EXEMPLARISCHE ODER FOLGESCHÄDEN (EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE BESCHAFFUNG VON ERSATZGÜTERN ODER DIENSTLEISTUNGEN; NUTZUNGSAUSFALL, DATENVERLUST ODER ENTGANGENEN GEWINN; ODER GESCHÄFTSUNTERBRECHUNG) VERANTWORTLICH, UNABHÄNGIG VON DER URSACHE UND DER HAFTUNGSTHEORIE, OB AUS VERTRAG, VERSCHULDEN (EINSCHLIESSLICH FAHRLÄSSIGKEIT ODER ANDERWEITIG), DIE AUS DER NUTZUNG DER SOFTWARE ENTSTEHEN, SELBST WENN AUF DIE MÖGLICHKEIT SOLCHER SCHÄDEN HINGEWIESEN WURDE.

Autoren:

Adonis Fung &lt;adon@yahoo-inc.com&gt;


Nera Liu &lt;neraliu@gmail.com&gt;


Albert Yu &lt;yukinying@gmail.com&gt;
