// Analytics consent gate: Google Analytics (gtag.js) is only ever requested
// after the visitor explicitly accepts. Declining or ignoring the banner
// means no request to Google is made at all.
(function () {
  var KEY = 'analytics-consent'; // stored value: 'granted' | 'denied'
  var GA_ID = 'G-HF5VPWQ9FW';

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function refreshUI() {
    var banner = document.getElementById('cookie-consent');
    var status = document.getElementById('cookie-status');
    if (!banner) return;
    var consent = getConsent();
    if (status) {
      status.textContent = consent === 'granted'
        ? 'Analytiikkaevästeet: hyväksytty'
        : consent === 'denied'
          ? 'Analytiikkaevästeet: hylätty'
          : '';
    }
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent');
    if (banner) banner.hidden = false;
    refreshUI();
  }
  function hideBanner() {
    var banner = document.getElementById('cookie-consent');
    if (banner) banner.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();
    if (consent === 'granted') {
      loadAnalytics();
    } else if (consent !== 'denied') {
      showBanner();
    }
    refreshUI();

    var accept = document.getElementById('cookie-accept');
    var decline = document.getElementById('cookie-decline');
    var manageLinks = document.querySelectorAll('.cookie-manage-link');

    if (accept) accept.addEventListener('click', function () {
      setConsent('granted');
      loadAnalytics();
      hideBanner();
      refreshUI();
    });
    if (decline) decline.addEventListener('click', function () {
      setConsent('denied');
      hideBanner();
      refreshUI();
    });
    manageLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        showBanner();
      });
    });
  });
})();
