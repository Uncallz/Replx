# Integrazione Serverless Brevo API

Questa implementazione utilizza funzioni serverless Vercel per nascondere l'API key di Brevo e gestire le iscrizioni in modo sicuro.

## Struttura dei File

### `/api/subscribe.js`
Funzione serverless che gestisce le iscrizioni a Brevo:
- Nasconde l'API key di Brevo lato server
- Gestisce la validazione dei dati
- Supporta due tipi di lista: 'discount' e 'vip'
- Include gestione errori e CORS

### `/scripts/main.js`
JavaScript client aggiornato:
- Rimossa l'API key esposta
- Chiama la funzione serverless locale `/api/subscribe`
- Mantiene la stessa UX per gli utenti

### `/vercel.json`
Configurazione Vercel:
- Definisce le funzioni serverless
- Configura le variabili d'ambiente
- Gestisce CORS e routing

## Setup per il Deployment

### 1. Variabili d'Ambiente
Configura la variabile d'ambiente su Vercel:
```
BREVO_API_KEY=your_actual_brevo_api_key
```

### 2. Deploy su Vercel
```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel

# Aggiungi la variabile d'ambiente
vercel env add BREVO_API_KEY
```

### 3. Configurazione Liste Brevo
La funzione serverless utilizza:
- Lista ID 2: per codici sconto (listType: 'discount')
- Lista ID 3: per VIP list (listType: 'vip')

Modifica questi ID nel file `/api/subscribe.js` se necessario.

## Sicurezza

✅ **Vantaggi:**
- API key nascosta lato server
- Validazione input server-side
- Gestione errori centralizzata
- CORS configurato correttamente

❌ **Prima (non sicuro):**
- API key esposta nel JavaScript client
- Vulnerabile a abusi e rate limiting
- Chiavi visibili nel codice sorgente

## Test Locale

Per testare localmente con Vercel Dev:
```bash
# Installa Vercel CLI
npm i -g vercel

# Crea file .env.local
echo "BREVO_API_KEY=your_api_key" > .env.local

# Avvia server di sviluppo Vercel
vercel dev
```

## API Endpoint

### POST `/api/subscribe`

**Body:**
```json
{
  "email": "user@example.com",
  "firstName": "Nome",
  "listType": "discount" // o "vip"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Iscrizione completata con successo",
  "contactId": 123
}
```

**Response Error:**
```json
{
  "error": "Messaggio di errore"
}
```
