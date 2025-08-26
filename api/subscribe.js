export default async function handler(req, res) {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestisci richieste OPTIONS per CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Accetta solo richieste POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, listType } = req.body;

    // Validazione input
    if (!email || !listType) {
      return res.status(400).json({ 
        error: 'Email e listType sono richiesti' 
      });
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato email non valido' 
      });
    }

    // API key Brevo dalle variabili d'ambiente
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY non configurata');
      return res.status(500).json({ 
        error: 'Configurazione server non valida' 
      });
    }

    // Determina la lista ID basata sul tipo
    let listId;
    switch (listType) {
      case 'discount':
        listId = 2; // Lista per codici sconto
        break;
      case 'vip':
        listId = 3; // Lista VIP
        break;
      default:
        return res.status(400).json({ 
          error: 'Tipo lista non valido' 
        });
    }

    // Chiamata API Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: 'Cliente'
        },
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Errore Brevo API:', errorData);
      
      // Gestisci errori specifici
      if (brevoResponse.status === 400 && errorData.code === 'duplicate_parameter') {
        return res.status(200).json({ 
          success: true, 
          message: 'Email già registrata nella lista' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Errore durante l\'iscrizione' 
      });
    }

    const result = await brevoResponse.json();
    
    // Invia email transazionale basata sul tipo di lista
    let emailTemplateId;
    let emailSubject;
    let emailParams = {};
    
    if (listType === 'discount') {
      emailTemplateId = 1; // Template per codice sconto
      emailSubject = 'Il tuo codice sconto del 10%!';
      emailParams = {
        DISCOUNT_CODE: 'REPLX09',
        DISCOUNT_PERCENT: '10%'
      };
    } else if (listType === 'vip') {
      emailTemplateId = 2; // Template per benvenuto VIP
      emailSubject = 'Benvenuto nella VIP Drop List!';
      emailParams = {
        VIP_BENEFITS: 'Accesso esclusivo alle nuove collezioni'
      };
    }
    
    // Invia email transazionale
    if (emailTemplateId) {
      const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify({
          to: [{ email: email }],
          templateId: emailTemplateId,
          params: emailParams
        })
      });
      
      if (!emailResponse.ok) {
        console.error('Errore invio email:', await emailResponse.json());
        // Non bloccare la risposta se l'email fallisce
      }
    }
    
    return res.status(200).json({ 
      success: true, 
      message: listType === 'discount' ? 'Codice sconto inviato via email!' : 'Benvenuto nella VIP Drop List! Controlla la tua email.',
      contactId: result.id,
      discountCode: listType === 'discount' ? 'REPLX09' : undefined
    });

  } catch (error) {
    console.error('Errore nella funzione subscribe:', error);
    return res.status(500).json({ 
      error: 'Errore interno del server' 
    });
  }
}