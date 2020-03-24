const BODY = document.body;
const THEME_BUTTONS = document.getElementsByClassName('gif-theme-button')
const THEME_DROPDOWN = document.getElementById('gifOS_dropdown')
const SEARCHBOX = document.getElementById('gifOS_search-box')

let changeTheme = function() {
    let currentTheme = BODY.dataset.theme
    let newTheme = this.dataset.val
    let newLogo = this.dataset.logo

    let pageLogo = document.getElementById('gifOS_page-logo');

    if(currentTheme !== newTheme) {
        BODY.dataset.theme = newTheme
        pageLogo.setAttribute('src', newLogo)
    }
}

let toggleThemeDropdown = function() {
    document.getElementById('gifOS_theme-options').classList.toggle('show')
    THEME_DROPDOWN.classList.toggle('show')

    let buttons = document.querySelectorAll('.gif-button__main.dropd')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('clicked')
        buttons[i].blur()
    }
}

for (let i = 0; i < THEME_BUTTONS.length; i++) {
    THEME_BUTTONS[i].addEventListener('click', changeTheme, false)
}

THEME_DROPDOWN.addEventListener('click', function(e) {
    toggleThemeDropdown()
}, false)

window.onscroll = function() {
    if (window.pageYOffset > 25) {
        document.getElementById('gifOS_header-cont').classList.add('bottom-line')
    }

    if (window.pageYOffset < 25) {
        document.getElementById('gifOS_header-cont').classList.remove('bottom-line')
    }
};

document.addEventListener('click', function(e){ 
    if (e.target.closest('#gifOS_dropdown')) 
        return
    else 
        if (THEME_DROPDOWN.classList.contains('show'))
            toggleThemeDropdown()
}, false)

SEARCHBOX.addEventListener('keyup', function(e) {
    let value = SEARCHBOX.value

    if(value) {
        document.getElementById('gifOS_search-submit').disabled = false
        document.getElementById('gifOS_search-submit').classList.remove('gif-button__inactive')
    } else {
        document.getElementById('gifOS_search-submit').disabled = true
        document.getElementById('gifOS_search-submit').classList.add('gif-button__inactive')
    }
}, false)