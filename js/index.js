const BODY = document.getElementsByTagName('body')[0];
const THEME_BUTTONS = document.getElementsByClassName('gif-theme-button')

let changeTheme = function(e) {
    let currentTheme = BODY.dataset.theme
    let newTheme = this.dataset.val
    let newLogo = this.dataset.logo

    let pageLogo = document.getElementById('gifOS_page-logo');

    if(currentTheme !== newTheme) {
        BODY.dataset.theme = newTheme
        pageLogo.setAttribute('src', newLogo)
    }
}

for (let i = 0; i < THEME_BUTTONS.length; i++) {
    THEME_BUTTONS[i].addEventListener('click', changeTheme, false)
}

document.getElementById('gifOS_dropdown').addEventListener('click', function(e) {
    document.getElementById('gifOS_theme-options').classList.toggle('show')
    this.classList.toggle('show')

    let buttons = document.querySelectorAll('.gif-button__main.dropd')

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('clicked')
    }
}, false)