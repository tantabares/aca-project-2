export default class GifRequests {

    constructor() {
        this.API_KEY = 'xkRLMi34NB01NmAjfZauXpHGiJQAwtIo'
        this.GIPHY_SEARCH = 'http://api.giphy.com/v1/gifs/search'
        this.GIPHY_AUTOCOMPLETE = 'https://api.giphy.com/v1/gifs/search/tags'
        this.GIPHY_RANDOM = 'https://api.giphy.com/v1/gifs/random'
        this.GIPHY_TRENDING = 'https://api.giphy.com/v1/gifs/trending'
        this.GIPHY_UPLOAD = 'https://upload.giphy.com/v1/gifs'
        this.GIPHY_LIST = 'https://api.giphy.com/v1/gifs'
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

    myGifs(arr) {
        let ids = arr.replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '')
        const found = fetch(`${this.GIPHY_LIST}?api_key=${this.API_KEY}&ids=${ids}`)
        return found
    }

    upload(blob) {
        let form = new FormData();
        form.append('api_key', this.API_KEY)
        form.append('file', blob, 'myGif.gif')
        form.append('tags', 'custom, gif, reaction')
        form.append('source_post_url', URL.createObjectURL(blob))

        const response = fetch(this.GIPHY_UPLOAD, {
            method: 'POST',
            body: form
        })

        return response
    }
}