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
gifOs.constants.SEARCHBOX = document.getElementById('gifOS_search-box')
gifOs.constants.SEARCH_SUBMIT = document.getElementById('gifOS_search-submit')
gifOs.constants.SEARCH_AUTOCOMPLETE = document.getElementById('gifOS_autocomplete')
gifOs.constants.SEARCH_AUTOCOMPLETE_ITEMS = document.getElementById('gifOS_autocomplete-items')
gifOs.constants.SEARCH_SUGGESTION_BUTTONS = document.getElementById('gifOS_sugg-buttons')
gifOs.constants.SUGGESTED_GRID = document.getElementById('gifOS_suggested-grid')
gifOs.constants.TRENDING_MASONRY = document.getElementById('gifOS_trending-masonry')
gifOs.constants.SUGGESTED_TOPICS = ['JonathanVanNess', 'DojaCat', 'DuaLipa', 'RossMatthews']

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

gifOs.functions.toggleAutocomplete = function () {
    document.getElementById('gifOS_autocomplete').classList.toggle('show')
}

gifOs.functions.populateAutocomplete = function (val) {
    let hashtag = val.includes('#') ? true : false
    let result = gifOs.gifs.getAutocomplete(val.replace('#', ''))
    let html = ''
    let max = 5

    result.then((response) => {
        return response.json()
    }).then(arr => {
        if(arr.data.length > 0) {
            max = arr.data.length < max ? arr.data.length : max
            for(let i = 0; i < max; i++)
                html += `<button onclick="window.location.href = '/?search=${hashtag ? '%23' + arr.data[i].name.replace(' ', '') : arr.data[i].name}';" 
                        class="gif-autocomplete-button">${hashtag ? '#' + arr.data[i].name.replace(' ', '') : arr.data[i].name}</button>`

            gifOs.constants.SEARCH_AUTOCOMPLETE_ITEMS.innerHTML = html
            if (!gifOs.constants.SEARCH_AUTOCOMPLETE.classList.contains('show'))
                gifOs.constants.SEARCH_AUTOCOMPLETE.classList.add('show')
        } else {
            gifOs.constants.SEARCH_AUTOCOMPLETE.classList.remove('show')
        }
    }).catch((error) => {
        return error
    })
}

gifOs.functions.populateSuggestions = function() {
    let random
    let html = ''
    let count = 0

    gifOs.constants.SUGGESTED_TOPICS.forEach(el => {
        random = gifOs.gifs.getRandom(el)
        random.then((response) => {
            return response.json()
        }).then(arr => {
            count++
            if(arr.data)
                html += `<div class="gif-suggestion">
                            <div class="gif-div__title section-title">#${el.replace(' ', '')}
                                <img src="../assets/button3.svg">
                            </div> 
                            <div class="gif-div__image-sug">
                                <img src=${arr.data.images.fixed_width.webp} alt=${arr.data.title}>
                            </div> 
                            <div class="gif-suggestion__button">
                                <button class="gif-button-blue" onclick="window.location.href = '/?search=%23${el.replace(' ', '')}'">Ver mas...</button>
                            </div>
                        </div>`

            if (count >= gifOs.constants.SUGGESTED_TOPICS.length)
                gifOs.constants.SUGGESTED_GRID.innerHTML = html
        }).catch((error) => {
            return error
        })
    });
}

gifOs.functions.populateMasonry = function(val) {
    let result = val ? gifOs.gifs.search(val.replace('#', '')) : gifOs.gifs.getTrending()
    let html = ''
    let max

    result.then((response) => {
        return response.json()
    }).then(arr => {
        if(arr.data.length > 0) {
            max = arr.data.length
            for(let i = 0; i < max; i++)
                if(arr.data[i].images.original.webp)
                    html += `<div class="gif-masonry__gif"> 
                                    <img src="${arr.data[i].images.fixed_width.webp}" alt="${arr.data[i].title}">
                                    ${gifOs.functions.getHashtags(arr.data[i].title) ? '<div class="gif-div__title gif-masonry__gif-tags">' + gifOs.functions.getHashtags(arr.data[i].title) + '</div>' : ''}
                                </div>`

            gifOs.constants.TRENDING_MASONRY.innerHTML = html
        }
    }).catch((error) => {
        return error
    })
}

gifOs.functions.toggleButton = function() {
    if (gifOs.constants.SEARCH_SUBMIT.disabled) {
        gifOs.constants.SEARCH_SUBMIT.disabled = false
        gifOs.constants.SEARCH_SUBMIT.classList.remove('gif-button__inactive')
    } else 
        if(!gifOs.constants.SEARCHBOX.value){
            gifOs.constants.SEARCH_SUBMIT.disabled = true
            gifOs.constants.SEARCH_SUBMIT.classList.add('gif-button__inactive')
        }
}

gifOs.functions.getHashtags = function(val) {
    if(val) {
        let htString = val.split(' GIF')[0].toLowerCase()
        return '#' + htString.replace(/ /g, ' #')
    } else
        return ''
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

gifOs.constants.SEARCHBOX.addEventListener('keyup', function (e) {
    let value = gifOs.constants.SEARCHBOX.value

    if (value) {
        gifOs.functions.toggleButton()

        if (value.length > 2)
            gifOs.functions.populateAutocomplete(value)

        if (value.length < 3 && gifOs.constants.SEARCH_AUTOCOMPLETE.classList.contains('show'))
            gifOs.constants.SEARCH_AUTOCOMPLETE.classList.remove('show')

    } else {
        gifOs.functions.toggleButton()
        if (gifOs.constants.SEARCH_AUTOCOMPLETE.classList.contains('show'))
            gifOs.constants.SEARCH_AUTOCOMPLETE.classList.remove('show')
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

document.addEventListener('click', function (e) {
    if (e.target.closest('#gifOS_dropdown'))
        return
    else
        if (gifOs.constants.THEME_DROPDOWN.classList.contains('show'))
            gifOs.functions.toggleThemeDropdown()

    if (e.target.closest('#gifOS_search-box')) {
        let val = gifOs.constants.SEARCHBOX.value
        if (val.length > 2 && !gifOs.constants.SEARCH_AUTOCOMPLETE.classList.contains('show')) {
            if(gifOs.constants.SEARCH_AUTOCOMPLETE_ITEMS.childElementCount == 0)
                gifOs.functions.populateAutocomplete(val)
                if(gifOs.constants.SEARCH_AUTOCOMPLETE_ITEMS.childElementCount > 0)
                    gifOs.functions.toggleAutocomplete()
        } else
            return
    } else
        if (gifOs.constants.SEARCH_AUTOCOMPLETE.classList.contains('show'))
            gifOs.functions.toggleAutocomplete()
}, false)

//
// ContentLoaded - Ready !!!
//

document.addEventListener('DOMContentLoaded', function () {
    let searchString = gifOs.utils.getParameterByName('search', null)
    let cookieTheme = gifOs.utils.getCookie('gifOs_theme')
    let cookieLogo = gifOs.utils.getCookie('gifOs_logo')
    let html = ''

    if (cookieLogo && cookieTheme)
        gifOs.functions.changeTheme(cookieTheme, cookieLogo)

    if(searchString) {
        document.getElementById('gifOS_suggested-section').style.display = 'none'
        document.getElementById('gifOS_masonry-title').innerHTML = `<b>${searchString}</b> (resultados)`
        gifOs.constants.SEARCHBOX.value = searchString
        gifOs.functions.populateMasonry(searchString)
        gifOs.functions.toggleButton()

        gifOs.constants.SUGGESTED_TOPICS.forEach(el => {
            html += `<button class="gif-button-blue" onclick='window.location.href = "/?search=%23${el}"'>#${el}</button>`
        });

        gifOs.constants.SEARCH_SUGGESTION_BUTTONS.innerHTML = html
        
    } else {
        gifOs.functions.populateSuggestions()
        gifOs.functions.populateMasonry()
    }
})