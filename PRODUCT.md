# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Brazilians relocating to or living in Argentina (primarily Buenos Aires/CABA) who need health insurance and want to navigate the Argentine healthcare system without a language barrier. They are going through a broader migration process (paperwork, new city, new language) and are looking for one less unfamiliar thing to figure out.

## Product Purpose

MediBra +Saúde helps Brazilian migrants get affiliated with Argentine health coverage (PMO-based plans and obra social networks) and access care in Portuguese, from first contact through ongoing treatment.

## Positioning

MediBra is a broker/intermediary: it sells and manages affiliation to existing Argentine health plans and obra social networks (e.g. PMO Low Cost, PMO Completo, OSOCNA/OSPAÑA) rather than underwriting insurance itself. Its differentiated mechanism is the layer a generic Argentine insurer or broker does not offer: Portuguese-language service across the whole journey (sign-up, provider network, support) plus onboarding built specifically for the realities of migrating to Argentina.

## Operating Context

- Three plan tiers: Básico (Seguro Mais Saúde), Plus (Mais Saúde Plus, PMO Low Cost, featured/most-popular), Premium (Mais Saúde Premium, PMO Completo).
- Provider network includes Sanatorio Colegiales and OSPAÑA, each with a photo gallery (facade photo + lightbox of interior/facility photos) on the Rede Médica section.
- A cartilla (provider directory) table lists in-network prestadores sourced from a real OSOCNA rubro 15 CABA document: name, address, and neighborhood (with "CABA" appended to the neighborhood since city/phone columns were intentionally dropped from the source PDF for the site).
- Contact flow: form (mailto fallback) + direct WhatsApp float button + email + address.
- Site is bilingual PT/ES via a client-side i18n system (`i18n/translations.js` + `js/i18n.js`), defaulting to PT, switchable via header buttons. Default language should stay PT (primary audience is Brazilian).

## Capabilities and Constraints

- Static site: plain HTML/CSS/JS, no build step or framework. Translation strings are embedded as a JS object (not fetched JSON) specifically so the site also works opened directly via `file://` without a server.
- No backend: the contact form submits via `mailto:`, not a server endpoint.

## Brand Commitments

- Name: MediBra +Saúde. Tagline: "a segurança que você conhece, na Argentina" (the security you know, in Argentina).
- Visual identity already established (navy/celeste/gold palette, Montserrat/Inter fonts) from a prior UX/conversion audit (see commits 91f641b, bca65ba, c84e9e8) — treat as confirmed incumbent identity, not open for casual restyling.

## Evidence on Hand

- Testimonials (Camila R., Rodrigo M., Fernanda A. in the Depoimentos section) are confirmed real customer quotes, not placeholder copy.
- Provider photos for Sanatorio Colegiales (`assets/img/colegiales/`) and OSPAÑA (`assets/img/ospana/`) are real facility photos.
- Cartilla table data is sourced from a real OSOCNA rubro 15 CABA provider-listing PDF (8 providers, name/address/neighborhood retained; city and phone columns deliberately omitted for the site).

## Product Principles

- Portuguese-first, always: language is the core differentiator, not a translation afterthought — PT is the default locale and the primary voice.
- Honest, health-focused framing over money-focused framing (per prior conversion audit): copy should read as caring about the visitor's health/security, not just closing a sale.
- Migrant empathy: content should acknowledge the friction of arriving in a new country (paperwork, unfamiliar systems) rather than assuming local fluency.
- Don't fabricate proof: testimonials, provider data, and network claims must trace to real sources; state gaps instead of inventing numbers or names.

## Accessibility & Inclusion

No project-specific accessibility requirement established beyond general good practice (contrast, keyboard access) already applied to the new gallery/lightbox and cartilla table components.
