# Zakázkomat – příprava spuštění

Tento dokument připravuje obsah a kontrolní postup pro spuštění. Neprovádí změny databáze ani Cloudflare nastavení.

## 1. Text pro registraci řemeslníka

### Přidejte se do Zakázkomatu
Získejte přístup k novým poptávkám od zákazníků, kteří hledají řemeslníky a stavební firmy ve vašem okolí.

Vyplňte registrační formulář. Žádost nejprve zkontroluje správce. Odesláním žádosti nevzniká automaticky smlouva ani nárok na zakázku.

**Doporučená pole**
- Název firmy nebo jméno podnikatele
- IČO (pokud je přiděleno)
- Kontaktní osoba
- E-mail
- Telefon
- Obory činnosti
- Oblast působnosti (kraje / okresy)
- Web nebo portfolio (nepovinné)
- Stručné představení (nepovinné)
- Potvrzení, že žadatel uvedl pravdivé údaje
- Potvrzení seznámení s informacemi o zpracování osobních údajů

**Text tlačítka:** Odeslat žádost o registraci

**Potvrzení po odeslání:** Děkujeme za zájem o Zakázkomat. Vaši žádost jsme přijali. Po kontrole údajů vás budeme kontaktovat na uvedeném e-mailu.

## 2. Text pro zákaznickou poptávku

### Popište, co potřebujete
Napište nám, jakou práci potřebujete zajistit. Čím přesnější popis a lokalitu uvedete, tím snáze najdeme vhodného dodavatele.

**Doporučená pole**
- Co potřebujete udělat
- Podrobný popis zakázky
- Místo realizace (obec a PSČ)
- Předpokládaný termín
- Orientační rozpočet (nepovinné)
- Jméno a příjmení
- E-mail
- Telefon
- Příloha / fotografie (jen pokud je bezpečně podporována)
- Souhlas nebo potvrzení podle finálně schválených informací o zpracování údajů

**Text tlačítka:** Odeslat poptávku

**Potvrzení po odeslání:** Děkujeme, poptávku jsme přijali. Ozveme se vám na uvedený kontakt. Odeslání poptávky samo o sobě nezaručuje uzavření smlouvy ani dostupnost dodavatele.

## 3. Texty administrace

- **Nová poptávka:** Čeká na kontrolu a další zpracování.
- **Nová registrace:** Ověřte kontaktní a firemní údaje před schválením.
- **Ve zpracování:** Poptávka se právě řeší.
- **Dokončeno:** Zakázka byla administrativně označena jako dokončená.
- **Zamítnuto / uzavřeno:** Případ byl uzavřen. Důvod zaznamenejte interně, pokud to aplikace umožňuje.

Administrace musí zůstat přístupná pouze oprávněnému správci. Tajný token nikdy nevkládejte do veřejného HTML, repozitáře ani zpráv.

## 4. Kontrola před veřejným spuštěním

- [ ] Ověřit, že Pages projekt používá správný repozitář a větev `main`.
- [ ] Ověřit D1 binding o názvu `DB` v Production i Preview.
- [ ] Ověřit, že databáze obsahuje správné schéma a případné migrace; před změnou vytvořit zálohu.
- [ ] Nastavit `ADMIN_TOKEN` jako Cloudflare secret, nikoli jako veřejnou proměnnou.
- [ ] Ověřit `/api/health` v produkci.
- [ ] Odeslat testovací poptávku a ověřit její uložení v administraci.
- [ ] Odeslat testovací registraci a ověřit její uložení.
- [ ] Otestovat chybné vstupy, spamovou ochranu a omezení četnosti.
- [ ] Ověřit mobilní zobrazení a českou diakritiku.
- [ ] Ověřit, že se osobní údaje nezobrazují veřejně ani nepředávají firmám bez odpovídajícího právního základu a jasného informování uživatele.
- [ ] Doplnit skutečné identifikační údaje provozovatele, kontaktní údaje, dobu uchování a finální informace o ochraně osobních údajů.
- [ ] Ověřit zálohování a postup obnovy.
- [ ] Rozhodnout, zda bude spuštění nejprve neveřejný pilot s omezeným počtem firem.

## 5. Co podle README ještě není hotové

- Transakční e-mailové notifikace nejsou aktivní, dokud nebude nakonfigurována e-mailová služba.
- Ověřování firem není aktivní.
- Právní informace o zpracování osobních údajů vyžadují doplnění skutečných údajů provozovatele a právní kontrolu.

## 6. Doporučené pořadí

1. Opravit a ověřit D1 binding a produkční health check.
2. Otestovat poptávku, registraci a administraci.
3. Doplnit provozní a právní údaje.
4. Spustit malý pilot.
5. Teprve poté zapnout e-mailové notifikace a rozšiřovat automatizaci.

**Rozpočtové pravidlo:** nepřidávat placenou službu ani tarif bez výslovného rozhodnutí provozovatele. Nejprve využít bezplatné možnosti a limity ověřit přímo v aktuálním účtu poskytovatele.
