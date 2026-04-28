---
title: "Kartenansicht"
sidebar_label: "Kartenansicht"
---

# Kartenansicht 

Die Kartenansicht zeigt eine Liste bevorstehender Ereignisse neben Karten an. So können Nutzer den Standort eines Ereignisses anzeigen oder bearbeiten oder den Standort für neue Ereignisse festlegen.

![map_view](/img/map_view.png)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


:::note
Standardmäßig zeigt die Ereignisliste auf der linken Seite Termine ab dem aktuellen Datum an. Um dieses Verhalten anzupassen, verwenden Sie die Eigenschaften [map_start](api/config/map_start.md) und [map_end](api/config/map_end.md).
:::


## Initialisierung {#initialization}

:::note
Um Google Maps zu verwenden, stellen Sie sicher, dass Sie [Ihren eigenen Google API-Schlüssel hinzufügen](https://developers.google.com/maps/documentation/javascript/get-api-key) auf Ihrer Seite.
:::

Fügen Sie die Kartenansicht wie folgt zum Scheduler hinzu:

1. Binden Sie die Code-Datei des Kartenanbieters wie unten gezeigt auf Ihrer Seite ein:

~~~html
<!-- Verwenden Sie Ihren eigenen Google API-Schlüssel, um Google Maps einzubinden -->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

Sie können [den Kartenanbieter wechseln und die Einstellungen anpassen](views/map.md#setting-the-map-provider), falls nötig. Änderungen werden beim nächsten Rendern der Karte übernommen.

2. Aktivieren Sie das **Map view**-Plugin:

~~~js
scheduler.plugins({
    map_view: true
});
~~~

3. Fügen Sie den Tab der Ansicht in das Markup des Schedulers ein:

~~~html
<div id="scheduler_here" class="dhx_cal_container" ...>
    <div class="dhx_cal_navline">
       ...
       <div class="dhx_cal_tab" data-tab="map"></div>
    </div>
    ...    
</div>
~~~

4. Legen Sie die Bezeichnung für den Tab fest:

~~~js
//'map_tab' entspricht dem Namen unseres div
scheduler.locale.labels.map_tab = "Map";
~~~

5. Fügen Sie einen Abschnitt im Lightbox-Formular hinzu, um den Standort des Ereignisses zu verwalten:

~~~js
scheduler.config.lightbox.sections = [
    {name:"description", height:50,map_to:"text", type:"textarea", focus:true},
    {name:"location", height:43, map_to:"event_location", type:"textarea"},
    {name:"time", height:72, type:"time", map_to:"auto"}    
]
~~~
  
6. Definieren Sie ein Label für den neuen Abschnitt:

~~~js
scheduler.locale.labels.section_location = "Location";
~~~

7. Initialisieren Sie den Scheduler:

~~~js
//'map' ist der Standardname für die Kartenansicht
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~
  

[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Einstellen des Kartenanbieters {#setting-the-map-provider}

dhtmlxScheduler unterstützt Google Maps, OpenStreetMaps und Mapbox als Kartenanbieter.

Um einen Kartenanbieter einzurichten, gehen Sie wie folgt vor:

1. Binden Sie die Kartenbibliothek auf Ihrer Seite ein, zum Beispiel Google Maps:

~~~html
<!-- Verwenden Sie Ihren eigenen Google API-Schlüssel, um Google Maps einzubinden -->
<script src="//maps.google.com/maps/api/js?key="[your" Google API key]&sensor="false"" 
    type="text/javascript"></script>
~~~

2. Konfigurieren Sie bei Bedarf Einstellungen über die Option [map_settings](api/config/map_settings.md), zum Beispiel:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    }
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~
 
[Weitere Details](views/map.md#map-related-configuration-options)

3. Geben Sie den Namen des Kartenanbieters auf eine der folgenden Arten an:

- Über die Option [map_view_provider](api/config/map_view_provider.md):

~~~js
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

Verfügbare Werte sind: *"googleMap", "openStreetMaps", "mapbox"*.

- Oder über die **view_provider**-Eigenschaft in [map_settings](api/config/map_settings.md):

~~~js
scheduler.config.map_settings = {
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

## Kartenbezogene Konfigurationsoptionen {#map-related-configuration-options}

### scheduler.config Objekt

- [map_end](api/config/map_end.md) - setzt das Enddatum für die Anzeige von Ereignissen
- [map_start](api/config/map_start.md) - setzt das Startdatum für die Anzeige von Ereignissen


Ab Version 7.1 werden die meisten Karteneinstellungen über die Eigenschaft [map_settings](api/config/map_settings.md) gesetzt. Die Standardeinstellungen sind:

~~~js
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    initial_zoom: 1,
    zoom_after_resolve: 15,
    info_window_max_width: 300,
    resolve_user_location: true,
    resolve_event_location: true,
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,5,11),"map");
~~~

Diese Eigenschaften umfassen:

- **initial_position** - Startposition der Karte
- **error_position** - Position, die angezeigt wird, wenn der Standort eines Ereignisses nicht bestimmt werden kann
- **initial_zoom** - anfänglicher Zoomlevel in der Kartenansicht
- **zoom_after_resolve** - Zoomlevel, das verwendet wird, wenn der Benutzerstandort angezeigt wird (sofern Berechtigung erteilt)
- **info_window_max_width** - maximale Breite für Karten-Popups in der Kartenansicht
- **resolve_user_location** - aktiviert Abfragen, ob der Nutzer seinen Standort teilen möchte
- **resolve_event_location** - ermöglicht Versuche, den Veranstaltungsort zu bestimmen, wenn keine Koordinaten gespeichert sind
- **view_provider** - Auswahl des Kartenanbieters

Eigene Einstellungen wie Tokens können innerhalb von **map_settings** hinzugefügt werden, zum Beispiel:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### scheduler.xy Objekt

- [scheduler.xy.map_date_width](api/other/xy.md) - Breite der Datumsspalte
- [scheduler.xy.map_description_width](api/other/xy.md) - Breite der Beschreibungsspalte

## Erstellen eines eigenen Map Adapters {#creatingacustommapadapter}

Falls die eingebauten Kartenanbieter nicht Ihren Anforderungen entsprechen, können Sie einen eigenen Map Adapter erstellen, indem Sie eine Klasse implementieren, die das Map Adapter-Interface erfüllt. Sie sollte folgende Methoden enthalten:

~~~js
interface IMapAdapter {
    // initialisiert eine Karteninstanz mit den angegebenen Optionen
    initialize(container: HTMLElement, options: IMapSettings): void;
    
    // entfernt die Karteninstanz beim Wechsel von der Kartenansicht und gibt Ressourcen frei
    destroy(container: HTMLElement): void;
    
    // fügt einen Marker für das Ereignis auf der Karte hinzu
    addEventMarker(event: ICalendarEvent): void;
    
    // entfernt den Marker für eine bestimmte eventId
    removeEventMarker(eventId: string): void;
    
    // aktualisiert den Marker für das Ereignis
    updateEventMarker(event: ICalendarEvent): void;
    
    // entfernt alle Marker von der Karte
    clearEventMarkers(): void;
    
    // zentriert die Karte auf die angegebene Position
    setView(latitude: number, longitude: number, zoom: number): void;
    
    // verarbeitet Klicks auf Ereignisse im Scheduler
    onEventClick(event: ICalendarEvent): void;
    
    // löst eine Adress-String in Koordinaten auf, gibt ein Promise mit {lat, lng} zurück
    resolveAddress(address: string): Promise<IMapPosition>;
}
~~~

## Anforderungen an Datenobjekte {#requirementstodataitems}

Für die korrekte Anzeige in der Kartenansicht benötigen Datenobjekte einige zusätzliche Eigenschaften. Die folgenden Eigenschaften sind erforderlich:

- **start_date** (*Date* oder *string*) - Startzeitpunkt des Ereignisses, Standardformat '%Y-%m-%d %H:%i'.
- **end_date** (*Date* oder *string*) - Endzeitpunkt des Ereignisses, Standardformat '%Y-%m-%d %H:%i'.
- **text** (*string*) - Beschreibung des Ereignisses.
- **location** (*string*) - Standort des Ereignisses.
- **lat** (*number*) - Breitengrad des Veranstaltungsortes.
- **lng** (*number*) - Längengrad des Veranstaltungsortes.
  
:::note
Stellen Sie sicher, dass Ihre .php-Datei mit den Daten Ihrer Datenbank übereinstimmt.
:::

## Tipps zur Lokalisierung {#localizationtips}

Die Kartenansicht verwendet vier Labels in der Locale:

- **scheduler.locale.labels.(mapName)_tab** - Name des Tabs für die Karte
- **scheduler.locale.labels.section_(sectionName)** - Bezeichnung für den Abschnitt im Lightbox-Formular
- **scheduler.locale.labels.marker_geo_success** - Tooltip-Text, wenn die Geolokalisierung erfolgreich ist
- **scheduler.locale.labels.marker_geo_fail** - Tooltip-Text, wenn die Geolokalisierung fehlschlägt

In der Regel werden die ersten beiden Labels beim Hinzufügen des Ansicht-Tabs gesetzt, während die letzten beiden nur angepasst werden sollten, wenn in eine andere Sprache als Englisch lokalisiert wird.

## Anpassen von Markern {#customizingmarkers}

Ab Version 7.0 können Sie die Markerformen anpassen, indem Sie die Methode **`createMarker()`** der Kartenansicht überschreiben:

~~~js
const { AdvancedMarkerElement, 
    PinElement } = await google.maps.importLibrary("marker");
scheduler.ext.mapView.createMarker = function(config){
    const pinViewGlyph = new PinElement({
        glyphColor: "white",
    });
    return new AdvancedMarkerElement({
        ...config,
        content: pinViewGlyph.element,
    });
};
~~~

Weitere Details finden Sie in der [Google Maps Dokumentation](
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization).

## GUI-Details {#guidetails}

- Ausgewählte Ereignisse werden hervorgehoben. Wenn ein Ereignis mehrere Tage umfasst, werden alle zugehörigen Einträge hervorgehoben.
- Um ein neues Ereignis zu erstellen, doppelklicken Sie auf eine freie Zelle in der Liste oder auf eine Stelle auf der Karte.
- Um ein Ereignis zu bearbeiten oder zu löschen, doppelklicken Sie auf das 'Details'-Symbol links neben der Ereignisbeschreibung.
- Um ein Ereignis anzuzeigen, klicken Sie auf dessen Marker auf der Karte.

## Verwandte Anleitungen

- [Allgemeine Konfigurationsanweisungen](guides/configuration.md)
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
- [Daten laden](guides/loading-data.md)
- [Skins](guides/skins.md)
- [Lokalisierung](guides/localization.md)
