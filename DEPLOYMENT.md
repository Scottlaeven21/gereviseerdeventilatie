# 🚀 Deployment Handleiding - Gereviseerde Ventilatie

Complete stap-voor-stap instructies om je Next.js webshop live te zetten.

---

## 📋 Voorbereiding Checklist

- [ ] Git geïnstalleerd
- [ ] GitHub account gemaakt
- [ ] WooCommerce producten geëxporteerd (CSV)
- [ ] Domein bij Strato (gereviseerdeventilatie.nl)

---

## STAP 1: Git & GitHub Setup (15 min)

### 1.1 Git Installeren

1. Download: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Installeer met standaard instellingen
3. Herstart PowerShell/Terminal

### 1.2 Git Configureren

Open PowerShell in je project folder en run:

```bash
git config --global user.name "Je Naam"
git config --global user.email "je@email.com"
```

### 1.3 Project Initialiseren

```bash
git init
git add .
git commit -m "Initial commit - Gereviseerde Ventilatie webshop"
```

### 1.4 GitHub Repository Maken

1. Ga naar [github.com](https://github.com)
2. Klik "New repository"
3. Naam: `gereviseerdeventilatie`
4. Privacy: Private (of Public)
5. **NIET** initialiseren met README
6. Create repository

### 1.5 Pushen naar GitHub

```bash
git remote add origin https://github.com/JouwUsername/gereviseerdeventilatie.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint:** Je code staat nu op GitHub!

---

## STAP 2: Database Setup (Supabase) (20 min)

### 2.1 Supabase Account

1. Ga naar [supabase.com](https://supabase.com)
2. Sign up (gratis met GitHub)
3. "New project"
   - Organization: Maak nieuwe
   - Name: `gereviseerdeventilatie`
   - Database Password: **BEWAAR DIT GOED!**
   - Region: `Europe West (Ireland)`
4. Klik "Create new project"
5. Wacht 1-2 minuten tot ready

### 2.2 Database Schema Aanmaken

1. Open Supabase dashboard
2. Klik **SQL Editor** (links)
3. "New query"
4. Open `database-schema.sql` uit je project
5. Kopieer HELE inhoud
6. Plak in SQL Editor
7. Klik **Run** (of Ctrl+Enter)
8. Wacht tot "Success" ✅

### 2.3 API Keys Ophalen

1. Klik **Settings** (⚙️ icoon)
2. Klik **API**
3. Kopieer:
   - `URL` (onder Project URL)
   - `anon public` key (onder Project API keys)
4. Bewaar deze ergens veilig!

**✅ Checkpoint:** Database is klaar!

---

## STAP 3: WooCommerce Data Importeren (30 min)

### 3.1 Producten Exporteren

1. Log in op WordPress admin
2. **WooCommerce → Producten**
3. Klik **Exporteren** bovenaan
4. Vink ALLE velden aan
5. Klik "CSV genereren"
6. Download bestand

### 3.2 CSV Plaatsen

Plaats bestand als:
```
/data/woocommerce-export.csv
```

### 3.3 Import Script Runnen

```bash
node scripts/import-woocommerce.js
```

Dit genereert: `/data/import.sql`

### 3.4 SQL Importeren in Supabase

1. Terug naar Supabase SQL Editor
2. "New query"
3. Open `/data/import.sql`
4. Kopieer HELE inhoud
5. Plak in editor
6. Klik **Run**
7. Check **Table Editor** → `products` tabel
8. Zie al je producten! 🎉

**✅ Checkpoint:** Producten staan in database!

---

## STAP 4: Environment Variables (5 min)

### 4.1 Maak .env.local

1. Kopieer `ENV-EXAMPLE.txt`
2. Hernoem naar `.env.local`
3. Vul in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://jouwproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key-hier

# Rest komen later (Mollie, etc.)
```

### 4.2 Test Lokaal

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Producten zichtbaar?** → Dan werkt de database connectie! ✅

---

## STAP 5: Vercel Deployment (10 min)

### 5.1 Vercel Account

1. Ga naar [vercel.com](https://vercel.com)
2. "Sign up" met je GitHub account
3. Autoriseer Vercel voor GitHub

### 5.2 Project Importeren

1. Klik "Add New" → "Project"
2. "Import Git Repository"
3. Selecteer je `gereviseerdeventilatie` repo
4. Klik "Import"

### 5.3 Environment Variables Toevoegen

**In Vercel dashboard:**
1. Expand "Environment Variables"
2. Voeg toe:
   - `NEXT_PUBLIC_SUPABASE_URL` = (jouw URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (jouw key)
3. Klik "Deploy"

### 5.4 Wacht op Deployment

- Duurt 2-5 minuten
- Status: Building → Deploying → Ready ✅
- Je krijgt een URL: `https://gereviseerdeventilatie.vercel.app`

### 5.5 Test Live Site

Bezoek je Vercel URL - site is nu LIVE! 🎉

**✅ Checkpoint:** Site staat online (nog wel op vercel.app domein)

---

## STAP 6: Custom Domein Koppelen (15 min)

### 6.1 Vercel Domein Toevoegen

1. In Vercel project dashboard
2. Klik "Settings" → "Domains"
3. Voeg toe: `gereviseerdeventilatie.nl`
4. En ook: `www.gereviseerdeventilatie.nl`
5. Klik "Add"

### 6.2 DNS Instructies van Vercel

Vercel geeft je DNS records:

**Voor apex domain (@):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Voor www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.3 DNS Aanpassen bij Strato

1. Log in op Strato account
2. Ga naar "Domeinbeheer"
3. Selecteer `gereviseerdeventilatie.nl`
4. Klik "DNS instellingen" of "Nameserver"

**Voeg toe:**
- A record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`

5. Opslaan
6. **Wacht 5-60 minuten** (DNS propagatie)

### 6.4 SSL Certificaat (Automatisch)

- Vercel installeert automatisch gratis SSL
- HTTPS werkt binnen paar minuten
- Check: 🔒 in browser

**✅ Checkpoint:** Site is LIVE op eigen domein! 🎊

---

## STAP 7: Mollie Betaalintegratie (30 min)

### 7.1 Mollie Account

1. Ga naar [mollie.com](https://mollie.com/nl)
2. "Gratis aanmelden"
3. Vul bedrijfsgegevens in
4. Verifieer email
5. Complete onboarding

### 7.2 Mollie API Keys

1. Dashboard → "Developers" → "API keys"
2. Kopieer **Test API key** (begint met `test_`)
3. Later: Kopieer **Live API key** (na verificatie)

### 7.3 Mollie Toevoegen aan Project

**Installeer Mollie SDK:**

```bash
npm install @mollie/api-client
```

**Update .env.local:**

```env
MOLLIE_API_KEY=test_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Update Vercel Environment Variables:**

1. Vercel dashboard → Settings → Environment Variables
2. Add: `MOLLIE_API_KEY` = (test key)
3. Redeploy project

### 7.4 Mollie Webhook Setup

In je Mollie dashboard:
1. Settings → "Website profiles"
2. Website URL: `https://gereviseerdeventilatie.nl`
3. Webhook URL: `https://gereviseerdeventilatie.nl/api/webhooks/mollie`
4. Redirect URL: `https://gereviseerdeventilatie.nl/checkout/success`

### 7.5 Test Betaling

1. Ga naar checkout op je site
2. Gebruik Mollie test creditcard: `5555 5555 5555 4444`
3. Complete betaling
4. Check in Mollie dashboard of payment doorkomt

**✅ Checkpoint:** Betalingen werken! 💳

---

## STAP 8: Email Notificaties (20 min)

### 8.1 Resend Account

1. Ga naar [resend.com](https://resend.com)
2. Sign up (gratis 100 emails/dag)
3. "Add domain" → `gereviseerdeventilatie.nl`
4. Voeg DNS records toe bij Strato:
   - TXT record voor verificatie
   - DKIM records voor authenticatie

### 8.2 Resend API Key

1. Resend dashboard → "API Keys"
2. "Create API Key"
3. Naam: "Production"
4. Permission: "Sending access"
5. Kopieer key

### 8.3 Update Environment

**.env.local:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@gereviseerdeventilatie.nl
```

**Vercel Environment Variables:** Ook toevoegen

### 8.4 Test Email

```bash
npm install resend
```

Test via checkout - orderbevestiging moet aankomen! 📧

**✅ Checkpoint:** Emails werken!

---

## STAP 9: Analytics & Monitoring (15 min)

### 9.1 Google Analytics

1. [analytics.google.com](https://analytics.google.com)
2. "Create Property" → Website
3. Kopieer Measurement ID: `G-XXXXXXXXXX`
4. Voeg toe aan Vercel ENV vars

### 9.2 Vercel Analytics

1. Vercel dashboard → "Analytics" tab
2. Enable (gratis tier)
3. Real-time bezoekersdata! 📊

**✅ Checkpoint:** Je ziet traffic!

---

## STAP 10: Juridisch & Compliance (30 min)

### 10.1 Cookie Banner

Installeer cookie consent:

```bash
npm install vanilla-cookieconsent
```

### 10.2 Verplichte Pagina's

Maak pagina's:
- `/algemene-voorwaarden`
- `/privacy-policy`
- `/retourbeleid`
- `/verzending-en-levering`

### 10.3 KVK & Contactgegevens

Update footer met:
- KVK nummer
- BTW nummer
- Adresgegevens
- Telefoon/email

**✅ Checkpoint:** Compliant met Nederlandse wetgeving!

---

## STAP 11: Go LIVE! (5 min)

### 11.1 Final Checklist

- [ ] Alle producten geïmporteerd
- [ ] Test bestelling geplaatst en betaald
- [ ] Orderbevestiging ontvangen
- [ ] SSL certificaat actief (🔒)
- [ ] Alle pagina's werken op mobile
- [ ] Contact formulier werkt
- [ ] Mollie LIVE key geactiveerd
- [ ] Test op verschillende browsers

### 11.2 Mollie Test → Live

1. Complete Mollie verificatie
2. Ontvang Live API key
3. Update in Vercel ENV vars:
   ```
   MOLLIE_API_KEY=live_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Redeploy

### 11.3 Launch! 🚀

Je webshop is nu LIVE en klaar voor echte bestellingen!

---

## 📊 Post-Launch

### Dagelijkse Check (eerste week)

- Check orders in Mollie
- Check emails worden verstuurd
- Monitor Vercel Analytics
- Check voor errors in Vercel logs

### Wekelijks Onderhoud

- Backup database (Supabase heeft auto-backup)
- Check voorraad
- Update product prijzen indien nodig
- Review klantenfeedback

### Maandelijks

- Check Vercel bandwidth usage
- Review Mollie transactiekosten
- Analytics rapporten bekijken
- SEO optimalisaties

---

## 🆘 Troubleshooting

### Site laadt niet

1. Check Vercel deployment logs
2. Check DNS propagatie: [whatsmydns.net](https://www.whatsmydns.net)
3. Clear browser cache

### Database errors

1. Check Supabase connection string
2. Check ENV variables in Vercel
3. Check Row Level Security policies

### Payments falen

1. Check Mollie API key (test vs live)
2. Check webhook URL is bereikbaar
3. Check Mollie dashboard voor error messages

### Emails komen niet aan

1. Check Resend domain verificatie
2. Check DKIM/SPF records
3. Check spam folder

---

## 📞 Ondersteuning

**Vercel:** [vercel.com/support](https://vercel.com/support)
**Supabase:** [supabase.com/docs](https://supabase.com/docs)
**Mollie:** [help.mollie.com](https://help.mollie.com)
**Resend:** [resend.com/docs](https://resend.com/docs)

---

## 🎉 Gefeliciteerd!

Je hebt succesvol een moderne Next.js webshop gelanceerd!

**Volgende Stappen:**
- Marketing campagne starten
- SEO optimalisatie
- Product reviews systeem toevoegen
- Blog/Content marketing
- Social media integratie

**Veel succes met je webshop! 🚀**
