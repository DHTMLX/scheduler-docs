---
title: "Mehrseitiger Export als PDF"
sidebar_label: "Mehrseitiger Export als PDF"
---

# Mehrseitiger Export als PDF

Die Bibliothek enthält eine praktische Methode, um mehrere Ansichtsseiten in ein einziges PDF-Dokument zu exportieren.

~~~js
scheduler.toPDFRange(from, to, view, path, scheme);
~~~

+ _**from**_ - (_Date object_) das Startdatum für den Export der Ereignisse
+ _**to**_ - (_Date object_) das Enddatum für den Export der Ereignisse
+ _**view**_ - (_string_) der Ansichtsmodus, der für den Export verwendet wird
+ _**path**_ - (_url_) die URL zur PHP-Datei, die für die Generierung des PDFs verantwortlich ist. Weitere Informationen finden Sie im Kapitel ['Export to PDF. Configuring service'](export/pdf.md#using-export-services)
+ _**color**_ - (_'color', 'gray', 'bw', 'custom', 'fullcolor'_) definiert das beim Export verwendete Farbschema

1. '_color_' - Standardoption für den vollfarbigen Druck
2. '_gray_' - Exportiert in Graustufen
3. '_bw_' - Exportiert ausschließlich in Schwarz-Weiß
4. '_custom_' - Erlaubt eine benutzerdefinierte Farbzuordnung (erfordert PHP-Anpassungen, siehe Kapitel ['Export to PDF. Configuring service'](export/pdf.md#using-export-services) für Details)
5. '_fullcolor_' - Exportiert mit den exakten Hintergrund- und Textfarben wie in der Ansicht dargestellt

Beispiel: Um die Seiten der 'week'-Ansicht vom 1. Januar 2012 bis zum 1. Februar 2012 zu exportieren, kann die Methode wie folgt aufgerufen werden:

~~~js
scheduler.toPDFRange(
    new Date(2012,0,1), 
    new Date(2012, 1,1),
    'week', 
    'generate.php', 
    'fullcolor'
);
~~~
