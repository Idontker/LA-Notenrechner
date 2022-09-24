# Konfiguration

Vorab zwei Sätze: Diese Anleitung wirkt sehr lang. Davon soll man sich bitte nicht abschrecken lassen, da die Länge primär aufgrund der vielen Beispiele zur Stande kommt.

In dieser Datei soll kurz erklärt werden, wie eine Konfiguration für eine Schulart (z.B. Realschule) oder ein Schulfach (z.B. Englisch Gymnasium) erstellt werden kann. Der Notenrechner selbst so entwickelt, dass er mit der richtigen Konfiguration die Studiengänge adäquat beschreibt. Diese Konfigurationen werden in einem .json Format hinterlegt. Hierzu wurden Vorlagedatein unter /vorlagen/ hinterlegt (TODO: Verlinkung).
Diese müssen dann in den Code entsprechend eingepflegt werden.

# JSON Format Erklärt

In .json Datein werden JSON Objekte gespeichert. JSON Objekte werden immer innerhalb von zwei {} definiert. Darin werden einzelne Einträge hinter sogenannten Schlüsseln hinterlegt. Zwischen zwei Einträgen wird je ein Komma gesetzt:

```json
{
  "Beispielschlüssel 1": 5,
  "Beispielschlüssel 2": "Beispieltext",
  "Beispielschlüssel 3": [
    { "name": "Object 1" },
    { "name": "Object 2" },
    { "name": "Object 3" }
  ]
}
```

Die Schlüsselwerte und generell Text wird in Anführungszeichen geschrieben. Zwischen Schlüssel und dem Eintrag steht ein Doppelpunkt. Ein Wert kann auch eine Liste

# Konfiguration einer Schulart

Man beginne indem man die Vorlage Datei schulart-vorlage.json aus dem /vorlagen/ Ordner kopiert. Öffnet man das json mit einem beliebigen Texteditor (Word ist kein klassischer Texteditor), so sieht man nun

# Konfiguration eines Fachs

Man beginne indem man die Vorlage Datei vorlage-fach.json aus dem /vorlagen/ Ordner kopiert. Öffnet man das json mit einem beliebigen Texteditor (Word ist kein klassischer Texteditor), so sieht man nun ein großes JSON Objekt.

## 1. Fachname eintragen

Ändere nun den Namen der kopierten Datei zu `la-schulart-fachname.json`. Nutze hierbei bitte die gänigen Abkürzungen für die Schularten (gs, ms, rs, gym). Achte darauf, dass alles kleingeschrieben ist :)
Beispiel

```
    la-gym-informatk.json
```

Trage im Feld Name nun den Namen des Fachs ein, welcher später angezeigt werden soll. Soll neben dem Namen auch die Prüfungsordnung zu sehen sein, so muss dies auch eingetragen werden.

### Beispiele:

```json
{
  "name": "Informatik"
  // ...
}
```

beziehungsweie

```json
{
  "name": "Informatik PO 2011"
  // ...
}
```

## 2. Stexprüfungen eintragen

Betrachte nun das Feld `"stex": [ ... ]`. Hier werden die Einzelprüfungen für das Staatsexamen in einer Liste definiert. Jede Prüfung ist selbst ein (kleineres) JSON Objekt und bestizt die Felder:

- `name`: Der Name der Prüfung, der später angezeigt werden soll.
- `grade`: Die Note der Prüfung.
- `didaktik`: Dieses Feld beschreibt, ob es sich um eine Didaktik Prüfung handelt. Diese werden im Vergleich mit den Prüfungen der Fachwissenschaft anders verrechnet.

Einzutragen sind

- `name` (selbsterklärend) und
- `didaktik`: Handelt es sich hier um eine Didaktikprüfung, so trage `true` ein, andernfalls `false`.

Nicht einzutragen ist das Feld `grade`. Dies wird später genutzt.

### Beispiel:

```json
{
  // ...
  "stex": [
    {
      "name": "Analysis",
      "grade": "",
      "didaktik": false
    },
    {
      "name": "Algebra",
      "grade": "",
      "didaktik": false
    },
    {
      "name": "Didaktik der Mathematik",
      "grade": "",
      "didaktik": true
    }
  ]
  // ...
}
```

## 3. Wahlpflichtbereich (WPF) eintragen

Der Wahlpflichtbereich (WPF) wird in zwei Feldern definiert. Zunächst muss festgelegt werden, wie viele ECTS im WPF eingebracht werden müssen. Sollte es keinen Wahlbereich geben, so trägt man eine 0 ein. Dies wird hinter dem Schlüssel `wpf_ects` hinterlegt. Kommazahlen müssen hier, wie im Englischen, mit Punkt angegeben werden. Also beispielsweise `7.5`.

Das andere Feld ist `wpfs`, welches eine Liste an möglichen Wahlpflichtmodulen beschreibt. Dieses Feld soll leer bleiben, da es später vom Nutzer individuell gefüllt wird.

### Beispiele:

```json
{
  // ...
  "wpf_ects": 0,
  "wpfs": []
  // ...
}
```

beziehungsweie

```json
{
  // ...
  "wpf_ects": 27.5,
  "wpfs": []
  // ...
}
```

## 4. Module eintragen (Didaktik und Fachwissenschaft)

Nun sollen die einzelnen Module eingetragen werden. Jedes Module ist, wie auch bei den Examensprüfungen, ein JSON Objekt mit den Feldern:

- `name`: der angezeigte Name des Moduls
- `ects`: die ECTS des Moduls
- `grade`: die Note des Moduls
- `weight`: die Gewichtung des Moduls bei der Berechnung der Gesamtnote. Diese ist zumeist in der FPO für das jeweilige Fach definiert. Sollte es keine Note auf das Modul geben (also nur zwischen bestanden und nicht bestanden unterschieden werden), so ist hier eine 0 einzutragen.
- `ba`: beschreibt, ob es für den Bachelor eingetragen werden kann oder sogar muss. Dieser Wert ist

  - `pflicht`, falls dieses Modul eingebracht werden **muss**.
  - `tauglich`, falls dieses Modul eingebracht werden **kann**.
  - `nein`, falls dieses Modul **nicht** eingebracht werden darf.

  Für welche Module was gilt, ist aus der LAPO zu entnehmen: ist ebenfalls der FPO in Kombination mit der LAPO der FAU zu entnehmen (LAPO 3. Erwerb des Bachelorgrades §31):
  Falls nicht anders in der jeweiligen FPO des Fach spezifiziert, so gilt folgendes:

  - Verpflichtend sind Module einzubringen, die bis einschließlich dem 6. Semester laut der FPO belegt werden sollen.
  - Es ist möglich Module einzubringen, die bis einschließlich dem 6. Semester laut der FPO belegt werden können. Dies ist meist durch eine Klammerung kenntlich gemacht
  - Es ist nicht möglich Module einzubringen, die nach dem 6. Semester laut der FPO belegt werden sollen.

- `options`: beschreibt ein Feld, für bedingte Module. Diese Funktion ist nocht nicht (!) implementiert. Ein Beispiel für solche Module sind die Mathematik Module in der Informatik, welche belegt werden sollen, falls Mathematik nicht das jeweilge Nebenfach ist.

Auszufüllen sind demnach nur die folgenden Felder:

- `name`: der angezeigte Name des Moduls
- `ects`: die ECTS des Moduls (Kommawerte mit Punkt trennen)
- `weight`: die Gewichtung (Kommawerte mit Punkt trennen)
- `ba`: die Bachelor-Tauglichkeit: Entweder `pflicht`, `tauglich` oder `nein`

Nicht (!) auszufüllen sind nur die folgenden Felder:

- `grade`: die Note des Moduls
- `options`

### Beispiele

```json
{
  "name": "Didaktik Beispiel",
  "ects": 5,
  "grade": "",
  "weight": 1,
  "ba": "pflicht",
  "options": ""
},
```

oder

```json
{
  "name": "Beispielmodul",
  "ects": 7.5,
  "grade": "",
  "weight": 0,
  "ba": "nein",
  "options": ""
}
```

## 5. Module für Didaktik eintragen

Hierfür gibt es das Feld `didaktik`, welches eine Liste an Modulen (je ein JSON Objekt) enthält. Die einzelnen Module sollen, wie in
[4. Module eintragen](https://github.com/Idontker/LA-Notenrechner/blob/main/Konfiguration.md#4-module-eintragen-didaktik-und-fachwissenschaft) erklärt, eingetragen werden.

### Beispiel:

```json
{
  // ...
  "didaktik": [
    {
      "name": "Didaktik Beispiel",
      "ects": 5,
      "grade": "",
      "weight": 1,
      "ba": "pflicht",
      "options": ""
    },
    {
      "name": "Didaktik Beispiel 2",
      "ects": 10,
      "grade": "",
      "weight": 1,
      "ba": "nein",
      "options": ""
    }
  ]
  // ...
}
```

## 6. Module für das Fach eintragen

Hierfür gibt es das Feld `modules`, welches eine Liste an Modulen (je ein JSON Objekt) enthält. Die einzelnen Module sollen, wie in
[4. Module eintragen](https://github.com/Idontker/LA-Notenrechner/blob/main/Konfiguration.md#4-module-eintragen-didaktik-und-fachwissenschaft) erklärt, eingetragen werden.

### Beispiel:

```json
{
  // ...
  "modules": [
    {
      "name": "Beispielmodul",
      "ects": 5,
      "grade": "",
      "weight": 0,
      "ba": "nein",
      "options": ""
    },
    {
      "name": "Beispielmodul 2",
      "ects": 10,
      "grade": "",
      "weight": 0,
      "ba": "pflicht",
      "options": ""
    }
  ]
  // ...
}
```
