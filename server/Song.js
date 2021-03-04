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

    equals(other) {
        if (other instanceof Song) {
            return (
                this.username == other.username &&
                this.url == other.url &&
                this.label == other.label && // this might be a problem if label is also an object
                this.duration == other.duration
            )
        }
        return false
    }
}