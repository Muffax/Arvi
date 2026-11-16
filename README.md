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
- **Cloudflaren proxy (oranssi pilvi) PITÄÄ olla päällä pysyvästi** `@`-A-tietueilla ja `www`-CNAME:lla — ei koskaan "DNS only" (harmaa pilvi). Katso alla oleva välikohtaus (16.11.2026): GitHub Pages ei ole koskaan onnistunut myöntämään omaa HTTPS-varmennetta tälle verkkotunnukselle, joten ilman Cloudflaren proxya HTTPS hajoaa heti kokonaan kävijöiltä (selain näyttää varmenne-virheen, koska palvelin tarjoaa vain geneeristä `*.github.io`-varmennetta). Tämä ei ole väliaikainen/testattava rajoitus, vaan pysyvä riippuvuus.
- Arvin sähköposti **ei** käytä tätä verkkotunnusta (varmistettu) — mutta domainhotellilta tuotiin silti vanhat MX/SPF/DKIM-tietueet Cloudflareen talteen siltä varalta että sähköposti otetaan joskus käyttöön.
- Jos Cloudflare-siirto jostain syystä pitää perua, nimipalvelimet voi palauttaa domainhotellissa takaisin arvoihin `ns1.domainhotelli.fi` / `ns2.domainhotelli.fi` / `ns3.domainhotelli.fi`.

**Välikohtaus 16.11.2026 — proxy oli hetken pois päältä, HTTPS hajosi:**
Google Search Console ilmoitti 2 sivun saavan `403`-virheen indeksoinnissa. Tutkittaessa selvisi, että Cloudflaren proxy oli jostain syystä pois päältä (`DNS only`) kyseisillä tietueilla — DNS osoitti suoraan GitHub Pagesin IP-osoitteisiin Cloudflaren anycast-IP:iden sijaan. Tämä paljasti alkuperäisen, koskaan oikeasti korjaamattoman ongelman uudelleen: suoraan yhdistettäessä palvelin tarjosi `*.github.io`-wildcard-varmenteen, joka ei täsmää `arvimattikuusniemi.fi`:hin (`curl`: "SSL: no alternative certificate subject name matches target host name"), joten HTTPS epäonnistui täysin tavallisille kävijöille ajan, jonka proxy oli pois päältä. Korjaus: pilvet takaisin oranssiksi samoille viidelle tietueelle → HTTPS palautui heti (vahvistettu `curl --resolve` + `openssl s_client`). **Opetus:** GitHub Pagesin oma varmenne tälle domainille on edelleen rikki/myöntämättä — Cloudflaren proxy ei ole vaihtoehtoinen parannus vaan pakollinen kiertotapa, jota ilman sivusto ei toimi HTTPS:llä lainkaan.

## Analytiikka ja tietosuoja

- **Google Analytics 4** (mittaustunnus `G-HF5VPWQ9FW`), ladataan **vasta kävijän suostumuksen jälkeen** (`consent.js`, `localStorage`-pohjainen suostumustila, `anonymize_ip: true`).
- Evästebanneri ja `tietosuoja.html` on pidetty tarkoituksella lakisääteisessä minimissään (layered notice -periaate): banneri kertoo vain että evästeitä käytetään tilastointiin + linkin lisätietoihin, tarkemmat tiedot (mitä kerätään, kuka käsittelee) ovat vain tietosuojasivulla.
- `tietosuoja.html`:ssä on kaksi kohtaa jotka odottavat Arvi-Matin/Silmäaseman vahvistusta: tarkka tietosuoja-yhteyshenkilö/-osoite, ja Google Analytics -datan tarkka säilytysaika.

## Sisällön tila

- Etusivu (`index.html`) on valmis ja julkaistu.
- Neljä tietopankki-artikkelia (`tietopankki/kaihi.html`, `linssileikkaus.html`, `naonkorjaus.html`, `glaukooma.html`) ovat luonnosvaiheessa: otsikko, johdanto ja sivurakenne ovat valmiit, mutta kuusi lääketieteellistä sisältölohkoa per artikkeli (oireet, tutkiminen, hoitovaihtoehdot, riskit, toipuminen, UKK) odottavat Arvi-Matin kirjoittamaa/hyväksymää sisältöä. Sivut ovat `noindex`-tilassa kunnes sisältö on valmis.
- Kaikkien sivujen tekstit on koottu ja käyty läpi Arvi-Matin kanssa erillisessä Excel-tiedostossa (ei tässä repossa) — pyydä ajantasainen versio jos tarvitset.

## Silmäaseman ohjeistus (lääkärin oma sivu)

Arvi-Matti on saanut Silmäaseman markkinoinnilta (Kati Taivaloja, 13.11.2026) virallisen ohjeistuksen siitä, mitä Silmäaseman sisällöstä saa/ei saa käyttää omalla sivulla. Lähde on PowerPoint-tiedosto, **ei tässä repossa** — pyydä ajantasainen versio käyttäjältä jos tarvitset yksityiskohtia. Neljä keskeistä sääntöä, jotka vaikuttavat tähän sivustoon:

1. **Ajanvaraus:** lääkärikohtaiseen Silmäaseman ajanvaraukseen saa linkittää (nykyinen `Person=1872&ServiceId=4` on tällainen henkilökohtainen linkki).
2. **Markkinointikuvat:** Silmäaseman ottamia markkinointikuvia Arvista **ei saa** käyttää omalla sivulla (käyttöoikeudet eivät salli kolmannelle luovutusta). Sivuston kuvat eivät ole Silmäaseman kuvia.
3. **Asiakaspalautteet:** palautetekstejä **ei saa** kopioida/toistaa omalle sivulle — Silmäasemalla on lupa niiden käyttöön vain omalla sivullaan. Linkitä sen sijaan Silmäaseman asiantuntijaprofiiliin. **Älä lisää uusia suoria palautesitaatteja tälle sivustolle** — `testimonials`-osio linkittää nyt vain ulos.
4. **Artikkelit/videot:** Silmäaseman julkaisemiin asiantuntija-artikkeleihin ja videoihin, joissa Arvi esiintyy asiantuntijana, saa linkittää — mutta tekstejä **ei saa** kopioida.
5. **Ei takalinkkiä:** Silmäaseman lääkäriprofiilista ei koskaan linkitetä takaisin lääkärin omalle sivulle (heidän oma käytäntönsä) — älä oleta/suunnittele SEO:ta tämän varaan.

## SEO / tekninen

- Favicon-paketti (SVG + PNG-koot + `.ico` + `apple-touch-icon` + `site.webmanifest`) vastaa sivuston brändi-ilmettä (optiikka-aiheinen linssimerkki).
- JSON-LD: `Physician` (`@id: .../#arvi`) + `WebSite` + neljä `MedicalClinic`-lohkoa (Helsinki, Espoo Sello, Lohja, Nummela) etusivulla. Klinikkalohkot sisältävät tarkat katuosoitteet (`PostalAddress`) ja linkittyvät lääkäriin `"employee": {"@id": ".../#arvi"}`. **Osoitteet ovat vain JSON-LD:ssä, eivät näy sivulla visuaalisesti** (käyttäjän tietoinen valinta) — ei aukioloaikoja (ei tiedossa). Paikallishaku-SEO:ta varten (esim. "silmälääkäri Lohja").
- Tietopankki-sivuilla (`tietopankki/*.html`) on `BreadcrumbList`-skeema (Etusivu → artikkelin nimi), mutta **ei vielä** `MedicalWebPage`/muuta sisältöskeemaa eikä sitemap-merkintää — tietoisesti lykätty kunnes sivut poistuvat `noindex`-tilasta (ks. "Sisällön tila"), jottei skeemaan kirjata hyväksymätöntä sisältöä.
- Open Graph / Twitter Card -tagit kaikilla sivuilla.
- Google Search Console -vahvistustiedosto: `google2136c08e2637ada8.html` (juuressa, älä muokkaa sisältöä).

## Kehitys

Sivusto on puhdasta staattista HTML/CSS/JS:ää, ei build-vaihetta. Paikallinen testaus: `python3 -m http.server` sivuston juuressa.
