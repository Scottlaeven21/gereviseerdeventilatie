# 📦 WooCommerce naar Next.js Import Handleiding

## Stap 1: WooCommerce Data Exporteren

### Methode A: Via WooCommerce (Simpel)
1. Log in op WordPress admin
2. Ga naar **WooCommerce → Producten**
3. Klik bovenaan op **Exporteren**
4. Vink alle kolommen aan
5. Klik **CSV genereren**
6. Download het bestand

### Methode B: Via Plugin (Aanbevolen)
1. Installeer: **"Product Import Export for WooCommerce"** (gratis)
2. Ga naar **WooCommerce → Product Im/Ex**
3. Selecteer **Export**
4. Kies opties:
   - ✅ Alle product types
   - ✅ Include images
   - ✅ Include categories
   - ✅ Include attributes
5. Download CSV

## Stap 2: CSV Plaatsen

Plaats je gedownloade CSV bestand hier:
```
/data/woocommerce-export.csv
```

## Stap 3: Import Script Draaien

Open terminal in project folder en run:

```bash
node scripts/import-woocommerce.js
```

Dit genereert een `import.sql` bestand met alle producten.

## Stap 4: Supabase Database Setup

1. Ga naar [supabase.com](https://supabase.com)
2. Maak account (gratis)
3. Create New Project
   - Naam: `gereviseerdeventilatie`
   - Database password: **bewaar dit goed!**
   - Region: `Europe West (Ireland)`

4. Wacht tot database klaar is (1-2 min)

## Stap 5: Database Schema Aanmaken

1. Open Supabase dashboard
2. Klik op **SQL Editor** (links in menu)
3. Klik **New query**
4. Open het bestand `database-schema.sql`
5. Kopieer hele inhoud
6. Plak in SQL Editor
7. Klik **Run** (of Ctrl+Enter)
8. ✅ Tabellen aangemaakt!

## Stap 6: Producten Importeren

1. Blijf in **SQL Editor**
2. New query
3. Open het gegenereerde bestand `data/import.sql`
4. Kopieer hele inhoud
5. Plak in SQL Editor
6. Klik **Run**
7. ✅ Producten geïmporteerd!

## Stap 7: Controleren

In Supabase:
1. Klik op **Table Editor**
2. Selecteer `products` tabel
3. Zie al je producten!

## Stap 8: API Keys Ophalen

1. Klik op **Settings** (tandwiel icoon)
2. Klik **API**
3. Kopieer:
   - `Project URL`
   - `anon public` key
4. Deze komen in je `.env.local` bestand

## Volgende Stap: Environment Variables

Maak een `.env.local` bestand in de root met:

```env
NEXT_PUBLIC_SUPABASE_URL=jouw-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
```

---

## Troubleshooting

### "CSV bestand niet gevonden"
- Check of bestand heet: `woocommerce-export.csv`
- Check of het in de `/data/` folder staat

### "SQL error bij import"
- Run eerst `database-schema.sql`
- Check of alle kolommen aanwezig zijn in CSV

### "Sommige producten ontbreken"
- Check CSV voor lege regels
- Check of alle verplichte velden ingevuld zijn

### "Images worden niet geladen"
- Check of image URLs absoluut zijn (https://...)
- Upload images eventueel naar Supabase Storage

---

## Extra: Images Migreren

Als je images ook wilt hosten op Supabase:

1. Download alle product images uit WordPress
2. Upload naar Supabase Storage (bucket: `products`)
3. Update image URLs in database

Script voor image migratie volgt later!

---

## Hulp Nodig?

Check de volledige documentatie of vraag om hulp! 🚀
