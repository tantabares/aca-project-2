import CookieUtils from './CookieUtils.js'
import GifRequests from './GifRequests.js'

var gifOs = gifOs || {}
gifOs.constants = gifOs.constants || {}
gifOs.utils = gifOs.constants || {}
gifOs.cookies = new CookieUtils()
gifOs.gifs = new GifRequests()

//
// Variables
//

gifOs.constants.BODY = document.body
gifOs.constants.THEME_BUTTONS = document.getElementsByClassName('gif-theme-button')
gifOs.constants.THEME_DROPDOWN = document.getElementById('gifOS_dropdown')
gifOs.constants.SEARCHBOX = document.getElementById('gifOS_search-box')
gifOs.constants.SEARCH_SUBMIT = document.getElementById('gifOS_search-submit')
gifOs.constants.SEARCH_SUGGESTIONS = document.getElementById('gifOS_suggestions')
gifOs.constants.SEARCH_SUGGESTIONS_ITEMS = document.getElementById('gifOS_suggestions-items')

//
// Functions
//

gifOs.utils.changeTheme = function (cooTheme, cooLogo) {
    let currentTheme = gifOs.constants.BODY.dataset.theme
    let newTheme = this.dataset ? this.dataset.val : cooTheme
    let newLogo = this.dataset ? this.dataset.logo : cooLogo

    let pageLogo = document.getElementById('gifOS_page-logo')

    if (currentTheme !== newTheme) {
        gifOs.constants.BODY.dataset.theme = newTheme
        pageLogo.setAttribute('src', newLogo)
    }

    gifOs.cookies.setCookie('gifOs_theme', newTheme, 30)
    gifOs.cookies.setCookie('gifOs_logo', newLogo, 30)
}

gifOs.utils.toggleThemeDropdown = function () {
    document.getElementById('gifOS_theme-options').classList.toggle('show')
    gifOs.constants.THEME_DROPDOWN.classList.toggle('show')

    let buttons = document.querySelectorAll('.gif-button__main.dropd')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('clicked')
        buttons[i].blur()
    }
}

gifOs.utils.populateSuggestions = function (query) {
    let result = gifOs.gifs.getSuggestions(query)
    let html = ''
    let max = 5

    result.then((response) => {
        return response.json()
    }).then(data => {
            if(data.results.length > 0) {
                max = data.results.length < max ? data.results.length : max
                for(let i = 0; i < max; i++)
                    html += '<button class="gif-suggestion-button">' + data.results[i] + '</button>'

                gifOs.constants.SEARCH_SUGGESTIONS_ITEMS.innerHTML = html
                if (!gifOs.constants.SEARCH_SUGGESTIONS.classList.contains('show'))
                    gifOs.constants.SEARCH_SUGGESTIONS.classList.add('show')
            }
    }).catch((error) => {
        return error
    })
}

//
// Events
//

gifOs.constants.THEME_DROPDOWN.addEventListener('click', function (e) {
    gifOs.utils.toggleThemeDropdown()
}, false)

for (let i = 0; i < gifOs.constants.THEME_BUTTONS.length; i++) {
    gifOs.constants.THEME_BUTTONS[i].addEventListener('click', gifOs.utils.changeTheme, false)
}

gifOs.constants.SEARCHBOX.addEventListener('keyup', function (e) {
    let value = gifOs.constants.SEARCHBOX.value

    if (value) {
        if (gifOs.constants.SEARCH_SUBMIT.disabled) {
            gifOs.constants.SEARCH_SUBMIT.disabled = false
            gifOs.constants.SEARCH_SUBMIT.classList.remove('gif-button__inactive')
        }

        if (value.length > 2)
            gifOs.utils.populateSuggestions(value)

        if (value.length < 3 && gifOs.constants.SEARCH_SUGGESTIONS.classList.contains('show'))
            gifOs.constants.SEARCH_SUGGESTIONS.classList.remove('show')

    } else {
        if (!gifOs.constants.SEARCH_SUBMIT.disabled) {
            gifOs.constants.SEARCH_SUBMIT.disabled = true
            gifOs.constants.SEARCH_SUBMIT.classList.add('gif-button__inactive')
        }

        if (gifOs.constants.SEARCH_SUGGESTIONS.classList.contains('show'))
            gifOs.constants.SEARCH_SUGGESTIONS.classList.remove('show')
    }

}, false)

window.onscroll = function () {
    if (window.pageYOffset > 25) {
        document.getElementById('gifOS_header-cont').classList.add('bottom-line')
    }

    if (window.pageYOffset < 25) {
        document.getElementById('gifOS_header-cont').classList.remove('bottom-line')
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let cookieTheme = gifOs.cookies.getCookie('gifOs_theme')
    let cookieLogo = gifOs.cookies.getCookie('gifOs_logo')

    if (cookieLogo && cookieTheme)
        gifOs.utils.changeTheme(cookieTheme, cookieLogo)
})

document.addEventListener('click', function (e) {
    if (e.target.closest('#gifOS_dropdown'))
        return
    else
        if (gifOs.constants.THEME_DROPDOWN.classList.contains('show'))
            gifOs.utils.toggleThemeDropdown()
}, false)