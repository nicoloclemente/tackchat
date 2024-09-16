# TackChat

## Descrizione dello Scenario Applicativo

TackChat è un'applicazione di messaggistica in tempo reale che consente agli utenti di comunicare tra loro senza barriere linguistiche. Utilizza WebSocket per la comunicazione in tempo reale e MongoDB per la gestione dei dati. L'integrazione con Google Cloud Translate permette la traduzione dei messaggi.

- **Obiettivo**: Facilitare la comunicazione in tempo reale tra utenti, con supporto per la traduzione.
- **Pubblico target**: Utenti che desiderano mettersi in contatto con altri utenti che parlano in un'altra lingua.

## Architettura dell'Applicazione

L'applicazione utilizza lo stack MERN (MongoDB, Express, React, Node.js). Ecco una descrizione dell'architettura:

- **Frontend**: Sviluppato con React.
- **Backend**: Costruito con Express.js, gestisce le richieste HTTP e comunica con MongoDB. Le API RESTful forniscono servizi per l'autenticazione, la gestione del profilo utente, dei messaggi e delle conversazioni.
- **WebSocket**: Utilizza Socket.io per la comunicazione in tempo reale tra client e server.
- **Database**: MongoDB è utilizzato per archiviare i dati degli utenti, delle conversazioni e dei messaggi, con Mongoose per interagire con il database.
- **Sicurezza**: Gestita tramite bcryptjs per la cifratura delle password e jsonwebtoken per l'autenticazione.
- **Traduzione**: Google Cloud Translate è integrato per la traduzione automatica dei messaggi.

## Dipendenze Principali

- **Express.js**: Framework di backend per creare le API e gestire le richieste HTTP.
- **Socket.io**: Libreria per la comunicazione in tempo reale.
- **Mongoose**: ORM per MongoDB, utilizzato per definire e interagire con i modelli di dati.
- **JWT**: Per la gestione dei token di autenticazione.
- **Bcryptjs**: Per cifrare le password.
- **Google Cloud Translate**: Per la traduzione automatica dei messaggi.

## Modello dei Dati

1. **Modello Utente (`user.model.js`)**

  - **fullName**: Stringa che rappresenta il nome completo dell'utente.
  - **username**: Stringa unica che rappresenta il nome utente.
  - **password**: Stringa criptata tramite bcryptjs.
  - **gender**: Stringa che indica il genere dell'utente.
  - **country**: Stringa che rappresenta il paese dell'utente.
  - **language**: Stringa che rappresenta la lingua dell'utente, predefinita a 'en-US'.
  - **profilePic**: Stringa che rappresenta l'URL per l'immagine del profilo.

2. **Modello Conversazione (`conversation.model.js`)**

  - **participants**: Array di ID di utenti che partecipano alla conversazione.
  - **messages**: Array di ID dei messaggi inviati all'interno della conversazione.

3. **Modello Messaggio (`message.model.js`)**

  - **senderId**: ID dell'utente che ha inviato il messaggio.
  - **receiverId**: ID dell'utente che ha ricevuto il messaggio.
  - **message**: Stringa che rappresenta il contenuto del messaggio.

## Documentazione delle API Backend

1. **API di Autenticazione (`auth.routes.js`)**

  - **POST /api/auth/signup**
    - Descrizione: Registra un nuovo utente.
    - Parametri richiesti: `fullName`, `username`, `password`, `gender`.
    - Risposta: Dettagli dell'utente creato o messaggio di errore.

  - **POST /api/auth/login**
    - Descrizione: Effettua il login di un utente esistente.
    - Parametri richiesti: `username`, `password`.
    - Risposta: Token JWT e dettagli dell'utente.

  - **POST /api/auth/logout**
    - Descrizione: Effettua il logout di un utente.
    - Risposta: Messaggio di successo o errore.

2. **API Utente (`user.routes.js`)**

  - **GET /api/users/**
    - Descrizione: Ottiene gli utenti per la sidebar.
    - Risposta: Array di utenti o messaggio di errore.

  - **GET /api/users/:id**
    - Descrizione: Ottiene i dettagli di un utente specifico tramite ID.
    - Parametri richiesti: `id`.
    - Risposta: Dettagli dell'utente o messaggio di errore.

3. **API Profilo (`profile.routes.js`)**

  - **PUT /api/profile/updateProfile**
    - Descrizione: Aggiorna il profilo dell'utente loggato.
    - Parametri richiesti: Corpo della richiesta con campi come `fullName`, `username`, `profilePic`, ecc.
    - Risposta: Nuovi dettagli del profilo aggiornato.

4. **API Messaggi (`message.routes.js`)**

  - **GET /api/messages/:id**
    - Descrizione: Ottiene tutti i messaggi di una conversazione specifica.
    - Parametri richiesti: `id` (ID della conversazione).
    - Risposta: Array di messaggi.

  - **POST /api/messages/send/:id**
    - Descrizione: Invia un nuovo messaggio in una conversazione.
    - Parametri richiesti: `id` (ID della conversazione), corpo della richiesta con `senderId`, `receiverId`, `message`.
    - Risposta: Dettagli del messaggio inviato.

## Descrizione dei Componenti React Frontend

1. **App Component (`App.jsx`)**
  - Componente principale dell'applicazione, gestisce la navigazione e l'integrazione dei componenti.

2. **Messages**

  - **Message (`components/messages/Message.jsx`)**
    - Rappresenta un singolo messaggio all'interno di una conversazione.

  - **MessageContainer (`components/messages/MessageContainer.jsx`)**
    - Gestisce la visualizzazione dei messaggi all'interno di una conversazione.

  - **MessageInput (`components/messages/MessageInput.jsx`)**
    - Fornisce un'interfaccia per l'invio di nuovi messaggi.

  - **Messages (`components/messages/Messages.jsx`)**
    - Componente principale che mostra la lista dei messaggi in una conversazione.

3. **Sidebar**

  - **Conversation (`components/sidebar/Conversation.jsx`)**
    - Rappresenta una singola conversazione nella lista delle conversazioni.

  - **Conversations (`components/sidebar/Conversations.jsx`)**
    - Mostra la lista delle conversazioni dell'utente.

  - **ConversationsPopup (`components/sidebar/ConversationsPopup.jsx`)**
    - Fornisce un'interfaccia per visualizzare e gestire le conversazioni iniziabili in un popup.

  - **Profile**

    - **Profile (`components/sidebar/Profile/Profile.jsx`)**
      - Mostra le informazioni del profilo dell'utente e fornisce opzioni per l'aggiornamento del profilo.

    - **UpdateProfile (`components/sidebar/Profile/UpdateProfile.jsx`)**
      - Permette all'utente di aggiornare le informazioni del proprio profilo.

    - **LogoutButton (`components/sidebar/Profile/LogoutButton.jsx`)**
      - Fornisce un pulsante per il logout dell'utente.

  - **SearchInput (`components/sidebar/SearchInput.jsx`)**
    - Permette la ricerca di utenti.

  - **ShareButton (`components/sidebar/ShareButton.jsx`)**
    - Fornisce un'opzione per condividere l'app.

  - **Sidebar (`components/sidebar/Sidebar.jsx`)**
    - Mostra la barra laterale con accesso alle conversazioni, al profilo e alle opzioni di ricerca.

  - **StartedConversations (`components/sidebar/StartedConversations.jsx`)**
    - Mostra le conversazioni avviate.

  - **Tack**

    - **CountryPopup (`components/sidebar/Tack/CountryPopup.jsx`)**
      - Fornisce un'interfaccia popup per la selezione del paese.

    - **CountrySelector (`components/sidebar/Tack/CountrySelector.jsx`)**
      - Permette la selezione di un paese dall'elenco.

    - **Globe (`components/sidebar/Tack/Globe.jsx`)**
      - Mostra un globo per la selezione del paese.

4. **Skeletons**

  - **MessageSkeleton (`components/skeletons/MessageSkeleton.jsx`)**
    - Fornisce uno scheletro di caricamento per i messaggi mentre sono in fase di caricamento.

5. **Context**

  - **AuthContext (`context/AuthContext.jsx`)**
    - Gestisce lo stato di autenticazione dell'utente e le informazioni relative.

  - **LanguageContext (`context/LanguageContext.jsx`)**
    - Fornisce il contesto della lingua attualmente selezionata e gestisce le modifiche della lingua.

  - **SocketContext (`context/SocketContext.jsx`)**
    - Gestisce la connessione WebSocket per la comunicazione in tempo reale.

6. **Hooks**

  - **useGetConversations (`hooks/useGetConversations.js`)**
    - Hook per ottenere la lista delle conversazioni dell'utente.

  - **useGetConversationsByCountry (`hooks/useGetConversationsByCountry.js`)**
    - Hook per ottenere le conversazioni filtrate per paese.

  - **useGetConversationsWithMessages (`hooks/useGetConversationsWithMessages.js`)**
    - Hook per ottenere le conversazioni con i relativi messaggi.

  - **useGetMessages (`hooks/useGetMessages.js`)**
    - Hook per ottenere i messaggi di una conversazione specifica.

  - **useListenMessages (`hooks/useListenMessages.js`)**
    - Hook per ascoltare i nuovi messaggi in arrivo tramite WebSocket.

  - **useLogin (`hooks/useLogin.js`)**
    - Hook per gestire il login dell'utente.

  - **useLogout (`hooks/useLogout.js`)**
    - Hook per gestire il logout dell'utente.

  - **useSendMessage (`hooks/useSendMessage.js`)**
    - Hook per inviare nuovi messaggi.

  - **useSignup (`hooks/useSignup.js`)**
    - Hook per gestire la registrazione di un nuovo utente.

7. **Pages**

  - **Home**

    - **Home (`pages/home/Home.jsx`)**
      - Pagina principale dell'app che visualizza la home dell'utente.

    - **HomeDesktop (`pages/home/HomeDesktop.jsx`)**
      - Versione desktop della pagina home.

    - **HomeMobile (`pages/home/HomeMobile.jsx`)**
      - Versione mobile della pagina home.

  - **Login (`pages/login/Login.jsx`)**
    - Pagina di login dell'utente.

  - **Signup**

    - **GenderCheckbox (`pages/signup/GenderCheckbox.jsx`)**
      - Componente per selezionare il genere durante la registrazione.

    - **RegulationPopup (`pages/signup/RegulationPopup.jsx`)**
      - Popup per accettare le normative e regolamenti durante la registrazione.

    - **SignUp (`pages/signup/SignUp.jsx`)**
      - Pagina di registrazione dell'utente.

8. **Utils**

  - **InstallPopup (`utils/InstallPopup.jsx`)**
    - Popup per ottenere una guida all'installazione dell'app.

  - **TypingEffect (`utils/TypingEffect.jsx`)**
    - Effetto di digitazione per le animazioni del testo.

  - **countries (`utils/countries.js`)**
    - File di utilità con dati sui paesi.

  - **extractTime (`utils/extractTime.js`)**
    - Funzione per estrarre il tempo da una data.

  - **formatFullDate (`utils/formatFullDate.js`)**
    - Funzione per formattare una data completa.

  - **languages (`utils/languages.js`)**
    - File di utilità con dati sulle lingue supportate.

9. **Zustand**

  - **useConversation (`zustand/useConversation.js`)**
    - Hook per gestire lo stato delle conversazioni utilizzando Zustand.

## Diagramma UML dei Casi d'Uso

```
                 +---------------------+
                 |    Utente Non       |
                 |    Registrato       |
                 +---------------------+
                            |
                            | [Registrazione]
                            | [Login]
                            |
                            V
                 +---------------------+
                 |  Utente Registrato  |
                 +---------------------+
                            |
          +-----------------+----------------+--------------------------+--------------------+
          |                 |                |                          |                    |           
 [Invia Messaggio]   [Ricevi Messaggio]   [Visualizza Conversazioni]  [Aggiorna Profilo]  [Logout]
                            A
                            |
                            |
                          extend
                            |
                            |
                     [Traduci Messaggio]
```
## Diagramma UML delle Sequenze

```
Utente Registrato          Frontend                 Backend                 Database               Destinatario        Servizio Traduzione
      |                        |                       |                        |                       |                        |
      | Scrive messaggio       |                       |                        |                       |                        |
      |----------------------->|                       |                        |                       |                        |
      |                        | Invio messaggio       |                        |                       |                        |
      |                        |---------------------->| Salva Messaggio        |                       |                        |
      |                        |                       |----------------------->|                       |                        |
      |                        |                       | Salvataggio riuscito   |                       |                        |
      |                        |                       |<-----------------------|                       |                        |
      |                        |                       | Invio messaggio        |                       |                        |
      |                        |                       |----------------------->|                       |                        |
      |                        |                       |                        | Invio messaggio       |                        |
      |                        |                       | Messaggio inviato      |---------------------->| Richiesta traduzione   |
      |                        | Messaggio inviato     |<-----------------------|                       |----------------------->|
      |                        |<----------------------|                        |                       | Messaggio Tradotto     |
      |                        |                       |                        |                       |<-----------------------|
      |                        |                       |                        |                       |                        |
      |                        |                       |                        |                       |                        |
```
