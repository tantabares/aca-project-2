export default class GifRequests {

    constructor() {
        this.API_KEY = 'xkRLMi34NB01NmAjfZauXpHGiJQAwtIo'
        this.GIPHY_SEARCH = 'http://api.giphy.com/v1/gifs/search'
        this.GIPHY_AUTOCOMPLETE = 'https://api.giphy.com/v1/gifs/search/tags'
        this.GIPHY_RANDOM = 'https://api.giphy.com/v1/gifs/random'
        this.GIPHY_TRENDING = 'https://api.giphy.com/v1/gifs/trending'
    }

    getAutocomplete(val) {
        const found = fetch(`${this.GIPHY_AUTOCOMPLETE}?api_key=${this.API_KEY}&q=${val}`)
        return found
    }

    getRandom(tag) {
        const found = fetch(`${this.GIPHY_RANDOM}?api_key=${this.API_KEY}&tag=${tag}`)
        return found
    }

    getTrending() {
        const found = fetch(`${this.GIPHY_TRENDING}?api_key=${this.API_KEY}&limit=50`)
        return found
    }

    search(val) {
        const found = fetch(`${this.GIPHY_SEARCH}?api_key=${this.API_KEY}&q=${val}&limit=50`)
        return found
    }
}

// export default class GifRequests {

//     constructor() {
//         this.API_KEY = 'GKBDUF9UA85I'
//         this.GIPHY_AUTOCOMPLETE = 'https://api.tenor.com/v1/autocomplete'
//         this.LOCALE = 'es'
//     }

//     getAutocomplete(val) {
//         const found = fetch(this.GIPHY_AUTOCOMPLETE?key=this.API_KEY&locale=' 
//             + this.LOCALE&q=val&limit=5')
//         return found
//     }
// }