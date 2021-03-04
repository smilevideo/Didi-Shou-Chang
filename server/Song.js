export default class Song {
    username
    url
    label
    duration

    constructor(username, url, label, duration) {
        this.username = username
        this.url = url
        this.label = label
        this.duration = duration
    }
}