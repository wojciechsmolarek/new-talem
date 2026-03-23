const cookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://policies.google.com/privacy" target="_blank">Google Analytics</a>',
          cookies: [{ name: '_ga' }, { name: '_gid' }, { name: '_gat' }],
        },
      },
    },
  },
  language: {
    default: 'pl',
    translations: {
      pl: {
        consentModal: {
          title: 'Używamy plików cookie',
          description:
            'Ta strona wykorzystuje pliki cookie w celu zapewnienia najlepszego doświadczenia użytkownika oraz analizy ruchu.',
          acceptAllBtn: 'Zaakceptuj wszystkie',
          acceptNecessaryBtn: 'Tylko niezbędne',
          showPreferencesBtn: 'Zarządzaj preferencjami',
        },
        preferencesModal: {
          title: 'Centrum preferencji zgody',
          acceptAllBtn: 'Zaakceptuj wszystkie',
          acceptNecessaryBtn: 'Tylko niezbędne',
          savePreferencesBtn: 'Zapisz preferencje',
          sections: [
            {
              title:
                'Niezbędne pliki cookie <span class="pm__badge">Zawsze włączone</span>',
              description:
                'Te pliki cookie są niezbędne do prawidłowego funkcjonowania strony.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Analityczne pliki cookie',
              description:
                'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony.',
              linkedCategory: 'analytics',
            },
          ],
        },
      },
    },
  },
};

export default cookieConsentConfig;

