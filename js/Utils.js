export default class Utils {

    constructor() {}

    getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
        return v ? v[2] : null
    }

    setCookie(name, value, days) {
        var d = new Date
        d.setTime(d.getTime() + 24*60*60*1000*days)
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString()
    }

    deleteCookie(name) { 
        setCookie(name, '', -1)
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, '\\$&')
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
}