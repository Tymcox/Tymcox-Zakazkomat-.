# ZAKÁZKOMAT
Cloudflare Pages + Pages Functions + D1.

## Nasazení (bez placených služeb na začátku)
1. V Cloudflare Pages připojte repozitář `Tymcox/Tymcox-Zakazkomat-.`, branch `main`, framework preset **None**, build command prázdný a output directory `/`.
2. V Cloudflare vytvořte D1 databázi s názvem `zakazkomat`.
3. Pages → Settings → Functions → D1 database bindings: binding name **DB**, vyberte databázi `zakazkomat`. Nastavte pro Production i Preview.
4. V D1 Console spusťte celý soubor `schema.sql`.
5. Pages → Settings → Variables and Secrets: přidejte secret `ADMIN_TOKEN` (dlouhý náhodný token, alespoň 32 znaků).
6. Po novém deployi ověřte `/api/health`, testovací poptávku a `/admin.html`.

## Hotové
- Responzivní český web a veřejný formulář poptávky.
- Poptávky ukládané do D1, serverová validace, honeypot, hash IP a omezení četnosti.
- Formulář registrace firem a ukládání žádostí do D1.
- Administrace chráněná tajným tokenem: přehled poptávek/registrací a změna stavu poptávky.
- Kontrolní endpoint `/api/health`.

## Před ostrým spuštěním
Doplňte úplné identifikační údaje správce, sídlo, dobu uchování a nechte právně zkontrolovat informace o zpracování osobních údajů. E-mailové notifikace a ověřování firem nejsou aktivní, dokud nebude nakonfigurována transakční e-mailová služba. Kontakty zákazníků se automaticky nepředávají třetím stranám.
