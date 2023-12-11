document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');

    toggleSwitch.addEventListener('change', function () {
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            browser.tabs.sendMessage(activeTab.id, { action: 'toggle', value: toggleSwitch.checked });
        });
    });
});
