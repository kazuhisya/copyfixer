// 不工作，请求没过来
chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        debugger
        // if (request.command != "copyfixerCopy") return;
        // var e = document.getElementById('clipboardArea');
        // e.value = request.data;
        // e.select();
        // document.execCommand("copy");
        copyToClipboard(request.data);
    }
);


function copyToClipboard(textToCopy, fallbackString) {
    fallbackString = fallbackString || 'Copy URL and title'

    return new Promise((resolve) => {
        // const textArea = document.getElementById('clipboardArea')
        const textArea = document.createElement('textarea')
        // textArea.setAttribute('style', {
        //     position: 'fixed',
        //     top: 0,
        //     left: 0,
        //     width: '2em',
        //     height: '2em',
        //     padding: 0,
        //     border: 'none',
        //     outline: 'none',
        //     boxShadow: 'none',
        //     background: 'transparent'
        // })

        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()

        const magicCopyFailed = () => {
            document.body.removeChild(textArea)
            window.prompt(fallbackString, textToCopy)
            resolve()
        }

        try {
            const successful = document.execCommand('copy')
            if (!successful) {
                return magicCopyFailed('copy command unavailable')
            }
            document.body.removeChild(textArea)
            return resolve()
        } catch (err) {
            document.body.removeChild(textArea)
            return magicCopyFailed(err)
        }
    })
}