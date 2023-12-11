let isEnabled = false;

function getRandomAnagram(text) {
    function shuffleString(str) {
        return str.split('').sort(function () { return 0.5 - Math.random() }).join('');
    }

    const words = text.split(/\s+/);
    const shuffledWords = words.map(word => shuffleString(word));
    return shuffledWords.join(' ');
}

function replacePageText() {
    const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

    let currentNode;
    while (currentNode = allTextNodes.nextNode()) {
        const originalText = currentNode.nodeValue.trim();
        const newText = isEnabled ? getRandomAnagram(originalText) : originalText;
        currentNode.nodeValue = newText;
    }
}

function startInterval() {
    setInterval(function () {
        replacePageText();
    }, 1000);
}

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggle') {
        isEnabled = request.value;
        replacePageText();
    }
});

startInterval();
