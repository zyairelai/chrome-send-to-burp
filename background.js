chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get('proxyEnabled', (data) => {
    const proxyEnabled = !data.proxyEnabled;
    chrome.storage.local.set({ proxyEnabled: proxyEnabled }, () => {
      if (proxyEnabled) {
        chrome.proxy.settings.set(
          {
            value: {
              mode: 'fixed_servers',
              rules: {
                singleProxy: {
                  scheme: 'http',
                  host: '127.0.0.1',
                  port: 8080
                },
                bypassList: [
                  'www.google.com',
                  'www.googleapis.com',
                  'www.gstatic.com',
                  'clients4.google.com',
                  'content-autofill.googleapis.com',
                  'optimizationguide-pa.googleapis.com',
                  'challenges.cloudflare.com',
                  'connect.facebook.net',
                  'safebrowsing.google.com',
                  'syndication.twitter.com'
                ]
              }
            },
            scope: 'regular'
          },
          () => {
            chrome.tabs.reload(tab.id);
          }
        );
      } else {
        chrome.proxy.settings.clear({ scope: 'regular' }, () => {
          chrome.tabs.reload(tab.id);
        });
      }
    });
  });
});
