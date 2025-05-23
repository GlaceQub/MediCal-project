# Permanente evaluatie

**Vul hieronder verder aan zoals beschreven in
de [projectopgave](https://javascript.pit-graduaten.be/evaluatie/mobile/pe.html).**

## Scherm 1

### Logboek overzicht

_Screenshot en beschrijving van de functionaliteiten in het eerste scherm van je app._\
![image](./assets/images/Logboek.png)\

In het logboek scherm kan je een overzicht zien van alle toegevoegde logs/klachten van de ingelogde user. Een nieuwe log
kan aangemaakt worden met de plus knop. Het veld naast de plus knop dient om te filteren op een bepaalde datum.
Enkele gegevens van de log worden al in het overzicht weergegeven.

* Datum van log/klacht m.b.v. datetime picker.
* Lichaamsdeel waar men last heeft.
* De klacht zelf (tot aantal bepaald karakters).
* Het niveau van hoe ernstig de pijn/klacht is weergegeven met een cijfer en kleur code.

Als men swiped op een item kan men kiezen om het te bewerken of te verwijderen.

De gegevens worden opgehaald en weggeschreven naar de databank. Dit geld voor alle schermen. De applicatie zal enkel
online werken.

#### Extra

Indien er tijd over is kan ik nog een filter knop toevoegen voor het filteren op lichaamsdelen

## Scherm 2

### Medicatie overzicht

_Screenshot en beschrijving van de functionaliteiten in het tweede scherm van je app._\
![image](./assets/images/Medicatie.png)\
Op dit scherm kan je zien welke medicatie je moet nemen. Er staat aangeduid welke dagen je de medicatie moet nemen en
wanneer en hoelang. Je kan hier filteren op de namen van de medicatie. Ook het toevoegen is op dezelfde manier. Door het
swipen kan je net zoals bij het logboek een item aanpassen of verwijderen.

## Scherm 3

### Log detail pagina (CRUD operations)

_Beschrijving van de functionaliteiten in het derde scherm van je app._

Deze pagina krijg je te zien als je een logboek item toevoegd bekijkt of wilt aanpassen.

#### Edit of toevoegen

Je moet volgende items invullen:

* Datum en tijd van klacht m.b.v. datetime picker module.
* Lichaamsdeel waar de klacht zich voordoet.
* Beschrijving van de klacht.
* Een cijfer om het niveau van de pijn/ernstigheid in kaart te brengen (schaal 1/10).
* Eventuele opmerkingen: Hier kan je bijvoorbeeld invullen dat je de klacht hebt gekregen na het eten van iets. Of
  eender welke randinformatie je nog wenst bij te houden bij de klacht.

Alle onderdelen zijn verplicht behalve de opmerkingen.
Deze opmerkingen kan je dan opslaan met behulp van een opslaan knop.

#### Bekijken

Als je vanuit het logboek op een item klikt krijg je extra informatie te zien. Deze informatie is hierboven al vermeld.
Bovenaan zullen twee knoppen staan één om de gegevens aan te passen en een andere om de log te verwijderen.

## Scherm 4

### Medicatie details (CRUD operations + instellen notifications/timers)

_Beschrijving van de functionaliteiten in het vierde scherm van je app._

Dit scherm doet hetzelfde als het scherm voor de log info en is op een gelijkaardige manier opgebouwd.
Bij een medicatie kan je de volgende items invullen:

* Titel van medicijn item: Dit is zelf te kiezen door de persoon en dient enkel om op te filteren en weer te geven in
  het overzicht
* Medicijn: Dit is een dropdown veld. Hier moet men kiezen uit een lijst van medicijnen die worden opgehaald m.b.v. API
  Call.
* Eerste inname: Hier vul je de datum in van de eerste dosis.
* Moment van inname: Hier moet men het moment invullen dat het medicijn moet worden ingenomen. Aan de hand hiervan wordt
  het tijdstip van de reminders bepaald.
* Duratie: Hier moet je invullen hoeveel dagen je het medicijn moet innemen.
* Aandachtspunten: Dit wordt automatisch ingevuld door de opgehaalde informatie van de API call.
* Foto van medicijn: Je kan als je wilt een foto nemen van het verkregen doosje en/of pil en deze wordt mee bijgehouden.

De Title van het medicijn, eerste inname, duratie en het moment van inname zijn verplicht.

Aan de hand van de eerste iname, moment van inname en duratie worden er reminders ingepland in de kalender van je gsm.
Je gsm zal dan automatisch je notificaties sturen voor het innemen van je medicatie op de juiste momenten.

## Scherm 5

### Login Scherm (User based app)

_Beschrijving van de functionaliteiten in het vijfde scherm van je app._

Als deze pagina opstart wordt er eerst gekeken of er verbinding is met het internet.

Als je niet bent ingelogd of als je de Applicatie opstart moet je inloggen. Aan de hand van deze login gegevens worden
alle andere getoonde informatie bepaald. Hier krijg je feedback als je correct bent ingelogd met een animatie voordat de
applicatie naar zijn logboek pagina gaat (Homescherm)

Je moet inloggen met email en passwoord. Je kan indien dit is aangezet bij je profiel instellingen ook inloggen met
faceId of fingerprint.

## Scherm 6

### Profiel

_Beschrijving van de functionaliteiten in het zesde scherm van je app._

Als je op het profiel tabje klikt krijg je een simpele pagina te zien waar jouw gegevens staan opgelijst.

* Voornaam
* Achternaam
* Email
* Adres

Hier kan je jouw account gegevens aanpassen.

Op dit scherm heb je ook de mogelijkheid om het inloggen met vinger of gezicht te activeren of deactiveren.

Uitloggen doe je ook vanuit dit scherm. Daarna kom je terug op de login-pagina terecht om in te loggen met een andere
gebruiker.

## Native modules

_Bespreek hier minstens twee native modules die je verwerkt in je applicatie.
Lees de [projectopgave](https://javascript.pit-graduaten.be/evaluatie/mobile/project.html#native-modules) voor meer info
over wat een native module juist is._

### expo-camera

Link: https://docs.expo.dev/versions/latest/sdk/camera/

Deze zal gebruikt worden om een foto te kunnen maken van je medicatie.

### expo-calender

Link: https://github.com/expo/expo/tree/main/packages/expo-calendar

Deze module zal gebruikt worden om met de calender van het toestel te communiceren. Dit zal gebruikt worden om te
reminders in te stellen voor het nemen van de pillen.

### DateTimePicker

Link: https://github.com/react-native-datetimepicker/datetimepicker

Deze module communiceert met de system OS om de correcte datetimepicker te laten zien. Dit zal gebruikt worden om bij
het loggen de juiste date time in te vullen.

### react-native-swipeable-list

Link: https://github.com/esthor/react-native-swipeable-list

Deze module zorgt ervoor dat op de list items geswiped kan worden voor het kiezen van verschillende opties (
deleten/edit).

### expo-local-authentication

Link: https://github.com/expo/expo/tree/main/packages/expo-local-authentication

Deze module zal gebruikt kunnen worden om in te kunnen loggen met faceID of fingerprint.

## Online services

_Bespreek hier minstens één online service die je verwerkt in je applicatie.
Lees de [projectopgave](https://javascript.pit-graduaten.be/evaluatie/mobile/project.html#online-services) voor meer
info
over wat een native module juist is._

### Supabase / Supabase Auth / Supabase Storage

Ik zal Supabase gebruiken om alle gegevens die gelogd worden op te slaan in een database, de Auth zal ik gebruiken om
user based te kunnen inloggen en dus als gevolg dat elke user enkel zijn eigen opgeslagen logs kan bekijken. De Storage
zal ik gebruiken om de fotos die genomen zijn in de applicatie op te slaan. Dit zijn foto's die enkel relevant zijn voor
de gebruiker die is ingelogd als hij met de toepassing bezig is. Hierdoor zie ik het nut niet om deze ook in de media
galerie op te slaan van het toestel zelf.

### Rest API Drugbank

Link API Documention: https://docs.drugbank.com/v1/#selecting-your-region

Ik zou graag bij de medicatie de optie hebben om de medicatie te selecteren zodat je ook extra informatie over die
bepaalde pillen kan zien.

## Gestures & animaties

_Bespreek hier waar je minstens één gesture en één animatie verwerkt in je applicatie._

### Swipen op een item.

Als je een log swiped krijg je verschillende opties te zien wat je wilt doen met de log. (Delete/Edit)

### Animation on login

Nadat je succesvol bent ingelogd zal er een kleine animatie afspelen voor dat de app naar zijn andere paginas gaat.

### Edit log

Als je een log item swiped is dit geanimeerd.

# Feedback

Je beschrijft een uitdagend project, maar het is zeker haalbaar. Als je dit volledig implementeert voldoe je aan alle
vereisten en zal je een goed punt behalen. Hieronder vindt je enkele opmerkingen:

Je wilt de expo-calender gebruiken om notifications te tonen aan de gebruiken. Dit kan werken, afhankelijk van hoe de
kalender op het toestel ingesteld is. Maar ik zou aanraden om
de https://docs.expo.dev/versions/latest/sdk/notifications/ module te gebruiken. Zo kan je de notifications inplannen in
je eigen app in de plaats van de kalender vol te proppen met verschillende afspraken (waar mogelijks ook mails, ... voor
gestuurd worden).

* Als je de swipeable-list module wilt gebruiken telt dit niet mee als een animatie/gesture. De bedoeling is dat je dit
  zelf implementeert. We bouwen tijdens de les een gelijkaardige component. Als je daar een kleine aanpassing aan doet
  mag je die wel gebruiken. De animatie die je beschrijft is wel geldig, maar meestal gaan animaties en gestures
  gepaard, het is vrij moeilijk om een gesture zonder animatie te bouwen.
* Tenzij je ervaring hebt met Supabase zou ik je aanraden om hier voldoende vragen over te stellen tijdens de lessen.
  Supabase is niet moeilijk, maar de ervaring toont dat verschillende studenten daar wat moeite mee hebben.
* De API die je beschrijft is voor zover ik zie niet gratis en aangezien er geen prijs vermeld staat gaat dat
  waarschijnlijk onbetaalbaar zijn voor een studentenproject. Ik zou die gewoon laten vallen en de rest van de app eerst
  implementeren. Daarna kan je eventueel naar een alternatieve APi zoeken.

**19/20**

