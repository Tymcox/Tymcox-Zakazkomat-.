# ZAKÁZKOMAT – GLOBAL EXPANSION BLUEPRINT

Status: product and technical direction  
Goal: build an international marketplace for construction, trades and specialist services, designed for worldwide expansion rather than a Czech-only directory.

## 1. Product direction

ZAKÁZKOMAT is intended to become an international marketplace connecting:
- customers who need construction, installation, repair and specialist trade services;
- independent tradespeople;
- small and medium-sized contractors;
- larger verified service providers.

The platform must be country-aware from the beginning. The Czech Republic is the first launch market and operational test market, not the geographic limit of the product.

## 2. Global-ready foundations

Every new request and partner profile should be associated with:
- country and ISO 3166-1 alpha-2 country code;
- region/state/province where applicable;
- city/locality;
- postal code where applicable;
- address visibility and privacy settings;
- preferred language and locale;
- currency (ISO 4217);
- time zone (IANA time zone);
- phone number in international E.164 format where possible.

Do not assume all countries use postal codes, states, the same address format, the same tax system or the same consumer rules.

## 3. Language strategy

### Initial public languages
- Czech (cs-CZ): first operational market.
- English (en): international default/fallback.
- German (de): additional launch language for German-speaking markets.

### Expansion-ready language model
Add languages through translation dictionaries and locale-specific content, not by duplicating application logic. Plan for professional localization of:
- navigation and page content;
- forms, validation and success/error messages;
- admin interface and notifications;
- email templates;
- terms, privacy notices and country-specific legal disclosures.

Machine translation may be used for drafts, but legal and safety-critical text must be reviewed by qualified local professionals before publication.

## 4. Market and category model

Do not hard-code service categories to one country's terminology. Use stable internal category identifiers with localized display names.

Initial broad categories:
- Construction and renovation
- Electrical work
- Plumbing and heating
- Ventilation and air conditioning
- Steel structures and metalwork
- Roofing and façade work
- Carpentry and joinery
- Painting and finishing
- Flooring and tiling
- Landscaping and outdoor work
- Cleaning and facility services
- Industrial installation and maintenance
- Other specialist services

Each category should support country-specific qualifications, licensing requirements and restrictions. Do not label a provider as certified or verified unless the relevant evidence and review process exist.

## 5. Matching and marketplace rules

The matching engine should consider:
1. country and service area;
2. category and subcategory;
3. language compatibility;
4. availability and preferred schedule;
5. qualifications or licenses required in that country;
6. provider verification status;
7. customer-selected contact and data-sharing preferences.

Never automatically send personal contact data to providers until the customer has been clearly informed and the applicable legal basis and consent/permission flow have been reviewed for the relevant market.

## 6. Currency, pricing and cross-border work

- Store monetary amounts as integer minor units plus ISO currency code; never store a bare amount without currency.
- Do not silently convert currencies or imply a guaranteed exchange rate.
- Show the original quote currency and, where useful, a clearly labelled indicative conversion with timestamp and source.
- Keep tax, VAT, withholding, invoicing and consumer disclosures country-specific.
- Cross-border jobs require explicit country-of-work checks, applicable licensing and worker/employer obligations.

## 7. Trust, safety and compliance

Before opening each country:
- identify the legal operator and local obligations;
- review privacy, cookies, retention and data-subject request processes;
- determine lawful basis and disclosures for each data flow;
- review consumer protection, distance-selling and platform obligations;
- review contractor licensing, insurance and regulated trades;
- implement reporting, dispute and abuse handling;
- establish a documented provider verification process;
- provide localized terms and privacy information.

Do not promise guaranteed quality, guaranteed work, insurance coverage or verified status unless the platform can substantiate the claim.

## 8. Technical architecture principles

- Keep one canonical data model with country-aware fields.
- Keep translation strings separate from application logic.
- Use stable category IDs and localized labels.
- Keep all times in UTC in storage and display them in the user's selected IANA time zone.
- Store phone numbers in normalized international format when possible.
- Use role-based access control for customer, provider, reviewer and administrator.
- Keep secrets server-side only.
- Add audit logs for administrative actions.
- Use database migrations for schema changes and back up before production migrations.
- Design APIs so country, locale and currency are explicit inputs or derived from a verified user preference, never guessed from language alone.

## 9. Phased rollout

### Phase 0 – Czech pilot
- Fix and verify the existing Cloudflare D1 binding.
- Test current Czech request, partner registration and admin workflows.
- Complete operator identity, privacy and legal disclosures.
- Run a controlled pilot with manually reviewed providers.

### Phase 1 – International-ready core
- Add country, locale, currency, time-zone and international phone fields.
- Add locale-aware routes and a language selector.
- Add English and German translations to every customer-facing and admin flow.
- Add country-aware service areas and category localization.
- Add structured provider verification records.

### Phase 2 – First additional markets
Select target countries based on legal feasibility, provider supply, demand and support capacity. Do not launch everywhere at once.
For each market: local legal review, localized content, payment/tax decision, provider verification process, support plan and test cohort.

### Phase 3 – Multi-region scale
- Add more languages and countries based on validated demand.
- Add region-specific matching and operational teams.
- Add payment and invoicing integrations only after legal and cost review.
- Monitor abuse, service quality, conversion, repeat usage and unit economics by country.

## 10. Global launch acceptance checklist

- [ ] Country, locale, currency and time zone are explicit and validated.
- [ ] No page assumes the user is in the Czech Republic.
- [ ] Every form, error, success message and email has a translation.
- [ ] Admin workflows support country-specific records and filters.
- [ ] Data sharing with providers is transparent and controlled.
- [ ] Provider credentials and regulated services are reviewed per country.
- [ ] Privacy and legal pages are localized and reviewed for each market.
- [ ] Currency and tax display cannot be confused across countries.
- [ ] Cross-border jobs have a clear eligibility and compliance review.
- [ ] Backups, access control, rate limiting and incident handling are tested.
- [ ] No paid service is enabled without explicit approval.

## 11. Honest launch principle

“Worldwide-ready” architecture does not mean the service is legally or operationally launched worldwide. The platform should be built to support global expansion, then opened country by country after local readiness checks. Start with a reliable pilot, prove the workflow, and expand deliberately.

