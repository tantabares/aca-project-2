import Utils from './Utils.js'

var gifOs = gifOs || {}
gifOs.constants = gifOs.constants || {}
gifOs.functions = gifOs.functions || {}
gifOs.utils = new Utils()

//
// Variables
//

gifOs.constants.BODY = document.body
gifOs.constants.START_BUTTON = document.getElementById('gifOS_start')
gifOs.constants.UPLOAD = document.getElementById('gifOS_upload')
gifOs.constants.UPLOAD_BODY = document.getElementById('gifOS_upload-body')
gifOs.constants.UPLOAD_TITLE = document.getElementById('guifOS_upload-title')

//
// Functions
//

gifOs.functions.changeTheme = function (cooTheme, cooLogo) {
    let currentTheme = gifOs.constants.BODY.dataset.theme
    let newTheme = this.dataset ? this.dataset.val : cooTheme
    let newLogo = this.dataset ? this.dataset.logo : cooLogo

    let pageLogo = document.getElementById('gifOS_page-logo')

    if (currentTheme !== newTheme) {
        gifOs.constants.BODY.dataset.theme = newTheme
        pageLogo.setAttribute('src', newLogo)
    }

    gifOs.utils.setCookie('gifOs_theme', newTheme, 30)
    gifOs.utils.setCookie('gifOs_logo', newLogo, 30)
}

gifOs.functions.getStreamAndRecord = function() {
    return navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 820,
            height: 430
        }
    })
}

gifOs.functions.recordStep1 = function() {
    let video = ''
    video = `<div class="gif-upload-video__container"><video id="gifOS_video-tag"></video></div>`
    video += `<div id="gifOS_button-record" class="gif-upload__buttons" style="padding: 0 1rem 1rem 0;">
                <div id="gifOS_record" class="gif-dropdown">
                    <div class="gif-header-button" style="display: flex;">
                        <button class="gif-button__main dropd droparrow">
                            <svg style="padding-top: 9px;" width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="gifOS_arrow-b" id="gifOS_captura_3_precaptura" transform="translate(-937.000000, -713.000000)" fill="#110038" fill-rule="nonzero">
                                        <g id="item" transform="translate(265.000000, 208.000000)">
                                            <g id="boton_crear" transform="translate(663.000000, 496.000000)">
                                                <path d="M22.4999417,11.9999611 L21.0000778,11.9999611 L21.0000778,10.4998639 L22.500175,10.4998639 L22.500175,11.9999611 L24.0000389,11.9999611 L25.5001361,11.9999611 L25.5001361,13.499825 L24.0000389,13.499825 L22.4999417,13.499825 L22.4999417,11.9999611 Z M22.4999417,24.0000389 L24.0000389,24.0000389 L25.5001361,24.0000389 L25.5001361,25.4996694 L24.0000389,25.4996694 L22.4999417,25.4996694 L21.0000778,25.4996694 L19.4999806,25.4996694 L18.0001167,25.4996694 L16.5000194,25.4996694 L14.9999222,25.4996694 L13.5000583,25.4996694 L12.0001945,25.4996694 L10.5000972,25.4996694 L10.5000972,24.0000389 L12.0001945,24.0000389 L13.5000583,24.0000389 L14.9999222,24.0000389 L16.5000194,24.0000389 L18.0001167,24.0000389 L19.4999806,24.0000389 L21.0000778,24.0000389 L22.4999417,24.0000389 Z M10.5000972,20.9998444 L10.5000972,22.4999417 L10.5000972,24.0000389 L9,24.0000389 L9,22.4999417 L9,20.9998444 L9,19.4997472 L9,17.9998833 L9,16.4997861 L9,14.9999222 L9,13.499825 L10.5000972,13.499825 L10.5000972,14.9999222 L10.5000972,16.4997861 L10.5000972,17.9998833 L10.5000972,19.4997472 L10.5000972,20.9998444 Z M25.5001361,13.499825 L27,13.499825 L27,14.9999222 L27,16.4997861 L27,17.9998833 L27,19.4997472 L27,20.9998444 L27,22.4999417 L27,24.0000389 L25.5001361,24.0000389 L25.5001361,22.4999417 L25.5001361,20.9998444 L25.5001361,19.4997472 L25.5001361,17.9998833 L25.5001361,16.4997861 L25.5001361,14.9999222 L25.5001361,13.499825 Z M13.5000583,13.499825 L12.0001945,13.499825 L10.5000972,13.499825 L10.5000972,11.9999611 L12.0001945,11.9999611 L13.5000583,11.9999611 L13.5000583,13.499825 Z M13.5000583,10.4998639 L14.9999222,10.4998639 L14.9999222,11.9999611 L13.5000583,11.9999611 L13.5000583,10.4998639 Z M18.0001167,10.4998639 L16.5000194,10.4998639 L14.9999222,10.4998639 L14.9999222,9 L16.5000194,9 L18.0001167,9 L19.4999806,9 L21.0000778,9 L21.0000778,10.4998639 L19.4999806,10.4998639 L18.0001167,10.4998639 Z M14.9999222,17.9998833 L14.9999222,19.4997472 L14.9999222,20.9998444 L13.5000583,20.9998444 L13.5000583,19.4997472 L13.5000583,17.9998833 L13.5000583,16.4997861 L13.5000583,14.9999222 L14.9999222,14.9999222 L14.9999222,16.4997861 L14.9999222,17.9998833 Z M18.0001167,20.9998444 L19.4999806,20.9998444 L21.0000778,20.9998444 L21.0000778,22.4999417 L19.4999806,22.4999417 L18.0001167,22.4999417 L16.5000194,22.4999417 L14.9999222,22.4999417 L14.9999222,20.9998444 L16.5000194,20.9998444 L18.0001167,20.9998444 Z M18.0001167,14.9999222 L16.5000194,14.9999222 L14.9999222,14.9999222 L14.9999222,13.499825 L16.5000194,13.499825 L18.0001167,13.499825 L19.4999806,13.499825 L21.0000778,13.499825 L21.0000778,14.9999222 L19.4999806,14.9999222 L18.0001167,14.9999222 Z M21.0000778,16.4997861 L21.0000778,14.9999222 L22.4999417,14.9999222 L22.4999417,16.4997861 L22.4999417,17.9998833 L22.4999417,19.4997472 L22.4999417,20.9998444 L21.0000778,20.9998444 L21.0000778,19.4997472 L21.0000778,17.9998833 L21.0000778,16.4997861 Z" id="camera"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button class="gif-button__main dropd" style="width: 9rem;">Capturar</button>
                    </div>
                </div>
            </div>`

    gifOs.constants.UPLOAD.style.width = '71.66%'
    gifOs.constants.UPLOAD.style.maxWidth = '53.75rem'
    gifOs.constants.UPLOAD_BODY.innerHTML = video
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Un Chequeo Antes de Empezar<a><img src="assets/button3.svg"></a>`

    let vid = gifOs.functions.getStreamAndRecord()
    vid.then(function(stream) {
        let v = document.getElementById('gifOS_video-tag')
        v.srcObject = stream
        v.play()
    })

    document.getElementById('gifOS_record').addEventListener('click', function(e) {
        gifOs.functions.recordStep2(vid)
    })
}

gifOs.functions.recordStep2 = async function(vid) {
    document.getElementById('gifOS_record').id = 'gifOS_done'
    let button = document.getElementById('gifOS_button-record')
    let inButton1 = button.getElementsByTagName('button')[0]
    let inButton2 = button.getElementsByTagName('button')[1]

    gifOs.constants.UPLOAD_TITLE.innerHTML = `Capturando Tu Guifo<a><img src="assets/button3.svg"></a>`

    let stream = await vid
    let recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 820,
        height: 430
    })

    document.getElementsByClassName('gif-upload-video__container')[0].classList.add('record')
    inButton1.classList.add('listo')
    inButton2.classList.add('listo')
    inButton1.innerHTML = 
        `<svg style="padding-top: 7px;" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="gifOS_captura_4_captutando" transform="translate(-936.000000, -712.000000)" fill="#FFFFFF" fill-rule="nonzero">
                    <g id="item" transform="translate(265.000000, 208.000000)">
                        <g id="boton_stop" transform="translate(663.000000, 496.000000)">
                            <path d="M19,10 L17,10 L15,10 L15,8 L17,8 L19,8 L21,8 L21,10 L19,10 Z M17,17 L19,17 L19,19 L17,19 L17,17 Z M12.5,12.5 L12.5,15 L10,15 L10,12.5 L10,10 L12.5,10 L15,10 L15,12.5 L12.5,12.5 Z M10,17 L10,19 L10,21 L8,21 L8,19 L8,17 L8,15 L10,15 L10,17 Z M12.5,23.5 L15,23.5 L15,26 L12.5,26 L10,26 L10,23.5 L10,21 L12.5,21 L12.5,23.5 Z M17,26 L19,26 L21,26 L21,28 L19,28 L17,28 L15,28 L15,26 L17,26 Z M23.5,23.5 L23.5,21 L26,21 L26,23.5 L26,26 L23.5,26 L21,26 L21,23.5 L23.5,23.5 Z M26,17 L26,15 L28,15 L28,17 L28,19 L28,21 L26,21 L26,19 L26,17 Z M23.5,12.5 L21,12.5 L21,10 L23.5,10 L26,10 L26,12.5 L26,15 L23.5,15 L23.5,12.5 Z" id="recording"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>`
    inButton2.innerHTML = 'Listo'
    recorder.startRecording()

    document.getElementById('gifOS_done').addEventListener('click', function(e) {
        gifOs.functions.recordStep3(recorder)
    })
}

gifOs.functions.recordStep3 = function(recorder) {
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Vista Previa<a><img src="assets/button3.svg"></a>`

    recorder.stopRecording(function() {
        let blob = recorder.getBlob()
        let url = URL.createObjectURL(blob)
        document.getElementsByClassName('gif-upload-video__container')[0].innerHTML = 
            `<img src="${url}" alt="Tu guifo">`
    })
}

//
// Events
//

gifOs.constants.START_BUTTON.addEventListener('click', function(e) {
    gifOs.functions.recordStep1()
})

//
// ContentLoaded - Ready !!!
//

document.addEventListener('DOMContentLoaded', function () {
    let cookieTheme = gifOs.utils.getCookie('gifOs_theme')
    let cookieLogo = gifOs.utils.getCookie('gifOs_logo')

    if (cookieLogo && cookieTheme)
        gifOs.functions.changeTheme(cookieTheme, cookieLogo)
})