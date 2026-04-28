---
sidebar_label: DHTMLX MCP Server
title: DHTMLX MCP Server
description: "Verbinden Sie KI-Codierungsassistenten mit der DHTMLX-Dokumentation über den MCP-Server"
---

# DHTMLX MCP Server

KI-Codierungsassistenten wie Claude, Cursor oder ChatGPT können veralteten oder inkorrekten Code erzeugen, wenn sie mit libraries-spezifischen APIs arbeiten. Der DHTMLX MCP-Server adressiert dieses Problem, indem er direkten Zugriff auf die aktuelle Dokumentation und API-Referenz bietet.

## Was ist MCP

Model Context Protocol (MCP) ist ein Standard zur Bereitstellung externen Kontexts über bestimmte Tools und Bibliotheken für KI-Assistenten.

Große Sprachmodelle werden mit Daten trainiert, die bis zu einem bestimmten Datum reichen, und berücksichtigen nicht automatisch jüngste API-Änderungen oder neue Funktionen. Der DHTMLX MCP-Server überbrückt diese Lücke, indem er die vollständige und aktuelle Dokumentation über ein RAG-System (Retrieval-Augmented Generation) zugänglich macht.

**Server-URL:** `https://docs.dhtmlx.com/mcp`

:::note
Der DHTMLX MCP-Server ist ein gemeinsamer Dienst, der alle großen DHTMLX-Produkte abdeckt, nicht nur Scheduler. Die Konfigurationsanweisungen in diesem Abschnitt gelten unabhängig davon, mit welcher DHTMLX-Komponente Sie arbeiten.
:::

## Unterstützte Produkte

Bei Verbindung kann das KI-Tool Dokumentation abrufen, Code-Snippets basierend auf aktuellen APIs generieren und Konfigurationsfragen zu den folgenden Produkten beantworten:

- Gantt
- Scheduler
- Suite (Grid, Form, TreeGrid, und mehr)
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## Privacy

Der MCP-Server ist ein gehosteter Dienst. Er läuft nicht lokal und hat keinen Zugriff auf Ihre Dateien. Es werden keine persönlichen Daten der Nutzer gespeichert. Abfragen können zu Debugging- und Serviceverbesserungszwecken protokolliert werden. Für kommerzielle Optionen mit strikten No-Logging-Richtlinien kontaktieren Sie `info@dhtmlx.com`.

## Setting Up

Wählen Sie unten Ihr KI-Tool aus und folgen Sie den entsprechenden Anweisungen.

### Claude Code

Der empfohlene Weg erfolgt über die CLI:

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

Alternativ fügen Sie Folgendes manuell zu Ihrer `mcp.json` hinzu:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

### Cursor

1. Öffnen Sie die Einstellungen (Mac: Cmd+Shift+J, Windows/Linux: Ctrl+Shift+J)
2. Gehen Sie zu **Tools & MCP**
3. Klicken Sie auf **Add Custom MCP** (Benutzerdefiniertes MCP hinzufügen)
4. Fügen Sie die folgende Konfiguration ein:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

Nach dem Verbinden können Sie Aufforderungen wie "Check DHTMLX docs for how to configure recurring events in Scheduler" direkt im Chat verwenden.

### Gemini CLI

Öffnen Sie die Konfigurationsdatei unter `~/.gemini/settings.json` und fügen Sie Folgendes hinzu:

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

Starten Sie Gemini CLI neu, um die Änderungen anzuwenden.

### Antigravity (Google)

1. Öffnen Sie die Befehlspalette
2. Geben Sie "mcp add" ein
3. Wählen Sie "HTTP"
4. URL eingeben: `https://docs.dhtmlx.com/mcp`
5. Name eingeben: `dhtmlx-mcp`

### Andere Tools

Die meisten modernen KI-Codierungswerkzeuge unterstützen MCP über ihre Einstellungen. Suchen Sie nach "Model Context Protocol", "Context Sources" oder einer ähnlichen Option und fügen Sie `https://docs.dhtmlx.com/mcp` als benutzerdefinierte Quelle hinzu.

### ChatGPT

Beachten Sie, dass die MCP-Integration mit ChatGPT zu längeren Reaktionszeiten führen kann (ca. 20 Sekunden pro Abfrage). Für eine schnellere Erfahrung ziehen Sie in Erwägung, eines der oben genannten Tools zu verwenden.

Um ChatGPT zu konfigurieren:

1. Gehen Sie zu **Settings** → **Apps & Connectors**
2. Klicken Sie auf **Advanced settings**
3. Aktivieren Sie **Developer mode**
4. Kehren Sie zum Connectors-Bildschirm zurück und klicken Sie auf die **Create**-Schaltfläche
5. Füllen Sie Folgendes aus:
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. Klicken Sie auf **Create**

Nach der Einrichtung können Sie ChatGPT bitten, den DHTMLX MCP-Server zu konsultieren, wenn Sie mit einer beliebigen DHTMLX-Komponente arbeiten.

## Tipps für bestmögliche Ergebnisse

Beim Prompting beziehen Sie sich explizit auf die DHTMLX-Dokumentation, um genauere Ergebnisse zu erhalten. Zum Beispiel:

- "Unter Verwendung der DHTMLX-Dokumentation, wie ändere ich die Zeitachse in Scheduler?"
- "Überprüfen Sie DHTMLX MCP auf die Konfiguration wiederkehrender Ereignisse in Scheduler"

Je spezifischer der Prompt, desto genauer wird die Ausgabe.

