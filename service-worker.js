chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);
    if (url.origin.endsWith('ddev.site')) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'panel.html',
            enabled: true
        });
    } else {
        // Disables the sidebar when at other sites
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
});
