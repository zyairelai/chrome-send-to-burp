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
                bypassList: ['clients4.google.com', 'www.google.com', 'safebrowsing.google.com', 'syndication.twitter.com', 'connect.facebook.net']
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
