import Utils from './Utils.js'
import GifRequests from './GifRequests.js'

var gifOs = gifOs || {}
gifOs.constants = gifOs.constants || {}
gifOs.functions = gifOs.functions || {}
gifOs.utils = new Utils()
gifOs.gifs = new GifRequests()

//
// Variables
//

gifOs.constants.BODY = document.body
gifOs.constants.UPLOAD = document.getElementById('gifOS_upload')
gifOs.constants.UPLOAD_BODY = document.getElementById('gifOS_upload-body')
gifOs.constants.UPLOAD_TITLE = document.getElementById('guifOS_upload-title')
gifOs.constants.STEP0_BUTTON = document.getElementById('gifOS_step0')
gifOs.constants.STEP1_BUTTON = document.getElementById('gifOS_step1')
gifOs.constants.STEP2_BUTTON = document.getElementById('gifOS_step2')
gifOs.constants.STEP3_BUTTON = document.getElementById('gifOS_step3')
gifOs.constants.STEP4_BUTTON = document.getElementById('gifOS_step4')
gifOs.constants.STEP5_BUTTON = document.getElementById('gifOS_step5')
gifOs.constants.MYGIFS_MASONRY = document.getElementById('gifOS_mygifs-masonry')
let vid, stream, recorder, blob, gifUrl, gifId
let myGifs = []

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

gifOs.functions.getHashtags = function(val) {
    if(val) {
        let htString = val.split(' GIF')[0].toLowerCase()
        return '#' + htString.replace(/ /g, ' #')
    } else
        return ''
}

gifOs.functions.populateMisGuifos = function() {
    let ids = localStorage.getItem('misguifos')
    let html = ''
    let max

    if(ids) {
        gifOs.gifs.myGifs(ids)
            .then((response) => {
                return response.json()
            }).then(arr => {
                if(arr.data.length > 0) {
                    max = arr.data.length
                    for(let i = 0; i < max; i++)
                        html += `<div class="gif-masonry__gif"> 
                                        <img src="${arr.data[i].images.fixed_width.webp}" alt="${arr.data[i].title}">
                                    </div>`
        
                    gifOs.constants.MYGIFS_MASONRY.innerHTML = html
                } else {
                    //no gifs
                }
            }).catch((error) => {
                return error
            })
    } else {
        //no gifs
    }
}

gifOs.functions.recordStep1 = function() {
    let video = ''
    video = document.createRange().createContextualFragment('<div class="gif-upload-video__container full-width"><video id="gifOS_video-tag"></video></div>')

    gifOs.constants.UPLOAD.style.width = '71.66%'
    gifOs.constants.UPLOAD.style.maxWidth = '53.75rem'
    gifOs.constants.UPLOAD_BODY.getElementsByTagName('img')[0].classList.add('hidden')
    gifOs.constants.UPLOAD_BODY.getElementsByClassName('gif-upload__text')[0].classList.add('hidden')
    gifOs.constants.STEP0_BUTTON.classList.add('hidden')
    gifOs.constants.STEP3_BUTTON.classList.add('hidden')
    gifOs.constants.STEP1_BUTTON.classList.remove('hidden')
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Un Chequeo Antes de Empezar<a><img src="assets/button3.svg"></a>`

    if(!(gifOs.constants.UPLOAD_BODY.getElementsByClassName('gif-upload-video__container').length > 0))
        gifOs.constants.UPLOAD_BODY.prepend(video)
    else {
        gifOs.constants.UPLOAD_BODY.removeChild(gifOs.constants.UPLOAD_BODY.firstChild)
        gifOs.constants.UPLOAD_BODY.prepend(video)
    }

    vid = gifOs.functions.getStreamAndRecord()
    vid.then(function(str) {
        let v = document.getElementById('gifOS_video-tag')
        v.srcObject = str
        v.play()
    })
}

gifOs.functions.recordStep2 = async function() {
    gifOs.constants.STEP1_BUTTON.classList.add('hidden')
    gifOs.constants.STEP2_BUTTON.classList.remove('hidden')
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Capturando Tu Guifo<a><img src="assets/button3.svg"></a>`

    stream = await vid
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 820,
        height: 430
    })

    gifOs.constants.VIDEO_CONTAINER = document.getElementsByClassName('gif-upload-video__container')[0]
    gifOs.constants.VIDEO_CONTAINER.classList.add('record')
    recorder.startRecording()
}

gifOs.functions.recordStep3 = function() {
    gifOs.constants.STEP2_BUTTON.classList.add('hidden')
    gifOs.constants.STEP3_BUTTON.classList.remove('hidden')
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Vista Previa<a><img src="assets/button3.svg"></a>`

    recorder.stopRecording(function() {
        blob = recorder.getBlob()
        gifUrl = URL.createObjectURL(blob)
        gifOs.constants.VIDEO_CONTAINER.classList.remove('record')
        gifOs.constants.VIDEO_CONTAINER.innerHTML = `<img class="full-width" src="${gifUrl}" alt="Tu guifo">`
        stream.getTracks()[0].stop()
    })
}

gifOs.functions.recordStep4 = function() {
    gifOs.constants.STEP3_BUTTON.classList.add('hidden')
    gifOs.constants.STEP4_BUTTON.classList.remove('hidden')
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Subiendo Guifo<a><img src="assets/button3.svg"></a>`

    gifOs.constants.VIDEO_CONTAINER.innerHTML = 
        `<div class="gif-upload__confirm">
            <img class="icon" src="assets/globe_img.png" alt="Icono de globo">
            <h4>Estamos subiendo tu guifo…</h4>
            <p>Tiempo restante: <span style="text-decoration: line-through;">38 años</span> algunos minutos</p>
        </div>`

    gifOs.gifs.upload(blob)
        .then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            gifId = data.data.id
            if(data.meta.status == 200)
                gifOs.functions.recordStep5()
        }).catch((error) => {
            return error
        })
}

gifOs.functions.recordStep5 = function() {
    gifOs.constants.UPLOAD.style.width = '60%'
    gifOs.constants.UPLOAD.style.maxWidth = '45.06rem'
    gifOs.constants.STEP4_BUTTON.classList.add('hidden')
    gifOs.constants.STEP5_BUTTON.classList.remove('hidden')
    gifOs.constants.UPLOAD_TITLE.innerHTML = `Guifo Subido Con Éxito<a><img src="assets/button3.svg"></a>`
    document.getElementsByClassName('gif-upload__confirm')[0].classList.add('hidden')
    gifOs.constants.VIDEO_CONTAINER.style.width = '51.5%'
    gifOs.constants.VIDEO_CONTAINER.style.height = '12rem'
    gifOs.constants.VIDEO_CONTAINER.style.marginTop = '2rem';
    gifOs.constants.VIDEO_CONTAINER.style.marginLeft = '2rem';
    gifOs.constants.VIDEO_CONTAINER.innerHTML = `<img style="width: 97%; border: 1px solid #979797;" src="${gifUrl}" alt="Tu guifo">`
    let body = document.createRange().createContextualFragment('<div class="gif-flex-div"></div>')
    body.firstChild.appendChild(gifOs.constants.VIDEO_CONTAINER)
    let gifOptions =
        `<div class="gif-final-upload">
            <h4>Guifo creado con éxito</h4>
            <button class="gif-button__main clear">Copiar Enlace Guifo</button>
            <button class="gif-button__main clear">Descargar Guifo</button>
        </div>`
    body.firstChild.insertAdjacentHTML('beforeend', gifOptions)
    gifOs.constants.UPLOAD_BODY.removeChild(gifOs.constants.UPLOAD_BODY.firstChild)
    gifOs.constants.UPLOAD_BODY.prepend(body.firstChild)

    if(localStorage.getItem('misguifos')) {
        myGifs = JSON.parse(localStorage.getItem('misguifos'))
    }

    myGifs.push(gifId)
    localStorage.setItem('misguifos', JSON.stringify(myGifs))

    setTimeout(gifOs.functions.populateMisGuifos(), 1000)
}

//
// Events
//

document.getElementById('gifOS_start').addEventListener('click', function(e) {
    gifOs.functions.recordStep1()
})

document.getElementById('gifOS_restart').addEventListener('click', function(e) {
    gifOs.functions.recordStep1()
})

document.getElementById('gifOS_record').addEventListener('click', function(e) {
    gifOs.functions.recordStep2()
})

document.getElementById('gifOS_done').addEventListener('click', function(e) {
    gifOs.functions.recordStep3()
})

document.getElementById('gifOS_uploadgif').addEventListener('click', function(e) {
    gifOs.functions.recordStep4()
})

window.onscroll = function () {
    if (window.pageYOffset > 25) {
        document.getElementById('gifOS_header-cont').classList.add('bottom-line')
    }

    if (window.pageYOffset < 25) {
        document.getElementById('gifOS_header-cont').classList.remove('bottom-line')
    }
}

//
// ContentLoaded - Ready !!!
//

document.addEventListener('DOMContentLoaded', function () {
    let cookieTheme = gifOs.utils.getCookie('gifOs_theme')
    let cookieLogo = gifOs.utils.getCookie('gifOs_logo')

    if (cookieLogo && cookieTheme)
        gifOs.functions.changeTheme(cookieTheme, cookieLogo)

    gifOs.functions.populateMisGuifos()
})