chrome.action.onClicked.addListener((tab) => {
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
          bypassList: []
        }
      },
      scope: 'regular'
    },
    () => {
      chrome.tabs.reload(tab.id, { bypassCache: true }); // Reload the current tab
      setTimeout(() => {
        chrome.proxy.settings.clear({ scope: 'regular' }, () => {
          // Clear the proxy settings after a delay (adjust the delay as needed)
          console.log("Proxy settings cleared.");
        });
      }, 3000); // Adjust the delay as needed (in milliseconds)
    }
  );
});
