// export default class GifRequests {

//     constructor() {
//         this.API_KEY = 'xkRLMi34NB01NmAjfZauXpHGiJQAwtIo'
//         this.GIPHY_AUTOCOMPLETE = 'https://api.giphy.com/v1/gifs/search/tags'
//         this.LOCALE = 'es'
//     }

//     getSuggestions(val) {
//         const found = fetch(this.GIPHY_AUTOCOMPLETE + '?api_key=' + this.API_KEY + '&q=' + val)
//         return found
//     }
// }

export default class GifRequests {

    constructor() {
        this.API_KEY = 'GKBDUF9UA85I'
        this.GIPHY_AUTOCOMPLETE = 'https://api.tenor.com/v1/autocomplete'
        this.LOCALE = 'es'
    }

    getSuggestions(val) {
        const found = fetch(this.GIPHY_AUTOCOMPLETE + '?key=' + this.API_KEY + '&locale=' 
            + this.LOCALE + '&q=' + val + '&limit=5')
        return found
    }
}