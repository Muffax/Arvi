# arvimattikuusniemi.fi

Arvi-Matti Kuusniemen (silmätautien erikoislääkäri, silmäkirurgi) markkinointisivusto. Staattinen HTML/CSS/vanilla-JS-sivusto, isännöitynä GitHub Pagesissa omalla verkkotunnuksella.

## Hosting ja verkkotunnus

- **Hosting:** GitHub Pages, repo `Muffax/Arvi`, julkaistaan `main`-haarasta.
- **Verkkotunnus:** `arvimattikuusniemi.fi`, rekisteröity domainhotelli.fi:n kautta.
- **CNAME-tiedosto** repon juuressa sisältää `arvimattikuusniemi.fi` — **älä poista/luo tätä uudelleen** ilman syytä: GitHub Pagesin asetuksista domainin poistaminen ja uudelleenlisäys luo automaattisesti `Delete CNAME` / `Create CNAME` -commitit, jotka voivat aiheuttaa merge-konflikteja.

### DNS: siirto Cloudflareen (marraskuu 2026)

Verkkotunnuksen DNS-hallinta on siirretty domainhotellin nimipalvelimilta **Cloudflareen** (ilmainen taso), koska GitHub Pagesin automaattinen HTTPS-varmenteen myöntäminen jumiutui pysyvästi (`NotServedByPagesError`, varmenne jäi tilaan "Certificate Requested"). Juurisyyksi epäiltiin — muttei koskaan varmistettu 100%:sti — domainhotellin omien nimipalvelimien (`ns1`/`ns2.domainhotelli.fi`) jäämistä .fi-rekisterin (Traficom) puolella tilaan `[Technical check not done]`. CAA- ja DNSSEC-esteet suljettiin pois ennen Cloudflareen siirtymistä.

**Nykyinen DNS-rakenne (Cloudflaren hallinnoimana):**
- Nimipalvelimet: `dolly.ns.cloudflare.com`, `tom.ns.cloudflare.com` (asetettu domainhotellin asiakashallinnassa, "omat nimipalvelimet")
- `@` → 4 kpl A-tietueita GitHub Pagesin IP-osoitteisiin: `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
- `www` → CNAME `muffax.github.io`
- SSL/TLS-tila Cloudflaressa: **"Full"** (ei "Full strict" — GitHubin oma origin-varmenne on `*.github.io`-wildcard eikä täsmää hostnimeen, joten "strict" epäonnistuisi)

**Tärkeitä rajauksia jatkoa varten:**
- Älä ota Cloudflaren proxya (oranssi pilvi) käyttöön GitHub Pagesin A-/www-tietueille ennen kuin domain on varmistetusti `Active` Cloudflaressa ja HTTPS on testattu DNS-only-tilassa.
- Arvin sähköposti **ei** käytä tätä verkkotunnusta (varmistettu) — mutta domainhotellilta tuotiin silti vanhat MX/SPF/DKIM-tietueet Cloudflareen talteen siltä varalta että sähköposti otetaan joskus käyttöön.
- Jos Cloudflare-siirto jostain syystä pitää perua, nimipalvelimet voi palauttaa domainhotellissa takaisin arvoihin `ns1.domainhotelli.fi` / `ns2.domainhotelli.fi` / `ns3.domainhotelli.fi`.

## Analytiikka ja tietosuoja

- **Google Analytics 4** (mittaustunnus `G-HF5VPWQ9FW`), ladataan **vasta kävijän suostumuksen jälkeen** (`consent.js`, `localStorage`-pohjainen suostumustila, `anonymize_ip: true`).
- Evästebanneri ja `tietosuoja.html` on pidetty tarkoituksella lakisääteisessä minimissään (layered notice -periaate): banneri kertoo vain että evästeitä käytetään tilastointiin + linkin lisätietoihin, tarkemmat tiedot (mitä kerätään, kuka käsittelee) ovat vain tietosuojasivulla.
- `tietosuoja.html`:ssä on kaksi kohtaa jotka odottavat Arvi-Matin/Silmäaseman vahvistusta: tarkka tietosuoja-yhteyshenkilö/-osoite, ja Google Analytics -datan tarkka säilytysaika.

## Sisällön tila

- Etusivu (`index.html`) on valmis ja julkaistu.
- Neljä tietopankki-artikkelia (`tietopankki/kaihi.html`, `linssileikkaus.html`, `naonkorjaus.html`, `glaukooma.html`) ovat luonnosvaiheessa: otsikko, johdanto ja sivurakenne ovat valmiit, mutta kuusi lääketieteellistä sisältölohkoa per artikkeli (oireet, tutkiminen, hoitovaihtoehdot, riskit, toipuminen, UKK) odottavat Arvi-Matin kirjoittamaa/hyväksymää sisältöä. Sivut ovat `noindex`-tilassa kunnes sisältö on valmis.
- Kaikkien sivujen tekstit on koottu ja käyty läpi Arvi-Matin kanssa erillisessä Excel-tiedostossa (ei tässä repossa) — pyydä ajantasainen versio jos tarvitset.

## SEO / tekninen

- Favicon-paketti (SVG + PNG-koot + `.ico` + `apple-touch-icon` + `site.webmanifest`) vastaa sivuston brändi-ilmettä (optiikka-aiheinen linssimerkki).
- JSON-LD: `Physician` + `WebSite` (schema.org), ei `SearchAction`-tyyppiä koska sivustolla ei ole hakutoimintoa.
- Open Graph / Twitter Card -tagit kaikilla sivuilla.
- Google Search Console -vahvistustiedosto: `google2136c08e2637ada8.html` (juuressa, älä muokkaa sisältöä).

## Kehitys

Sivusto on puhdasta staattista HTML/CSS/JS:ää, ei build-vaihetta. Paikallinen testaus: `python3 -m http.server` sivuston juuressa.
