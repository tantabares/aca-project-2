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
gifOs.constants.THEME_BUTTONS = document.getElementsByClassName('gif-theme-button')
gifOs.constants.THEME_DROPDOWN = document.getElementById('gifOS_dropdown')
gifOs.constants.MYGIFS_MASONRY = document.getElementById('gifOS_mygifs-masonry')

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

gifOs.functions.toggleThemeDropdown = function () {
    document.getElementById('gifOS_theme-options').classList.toggle('show')
    gifOs.constants.THEME_DROPDOWN.classList.toggle('show')

    let buttons = document.querySelectorAll('.gif-button__main.dropd')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('clicked')
        buttons[i].blur()
    }
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

//
// Events
//

gifOs.constants.THEME_DROPDOWN.addEventListener('click', function (e) {
    gifOs.functions.toggleThemeDropdown()
}, false)

for (let i = 0; i < gifOs.constants.THEME_BUTTONS.length; i++) {
    gifOs.constants.THEME_BUTTONS[i].addEventListener('click', gifOs.functions.changeTheme, false)
}

window.onscroll = function () {
    if (window.pageYOffset > 25) {
        document.getElementById('gifOS_header-cont').classList.add('bottom-line')
    }

    if (window.pageYOffset < 25) {
        document.getElementById('gifOS_header-cont').classList.remove('bottom-line')
    }
}

document.addEventListener('click', function (e) {
    if (e.target.closest('#gifOS_dropdown'))
        return
    else
        if (gifOs.constants.THEME_DROPDOWN.classList.contains('show'))
            gifOs.functions.toggleThemeDropdown()
}, false)

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