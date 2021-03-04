/*

Basic structure is a Map<String, Array> 
+ an Array copy of the keyset to iterate over.

*/
export default class PriorityQ {

    // JS map preserves insertion order of entries
    qMap = new Map()
    // array of qMap's keyset to iterate over by index
    users = []
    head = 0
    length = 0 // length of overall queue

    constructor() { }

    push(song) {
        let username = song.username
        if (this.qMap.has(username)) {
            // if username already exists in the map, 
            // just push to existing array
            this.qMap.get(username).push(song)
        } else {
            // otherwise, add new entry + update users
            this.users.push(username)
            this.qMap.set(username, [song])
        }
        this.length++
    }

    shift() {
        if (this.length > 0) {
            let username = this.users[this.head]
            let userSongList = this.qMap.get(username)
            let nextSong = userSongList.shift()
            if (userSongList.length > 0) {
                // if there are still elements, update head as usual
                this.updateHead()
            } else {
                let toDeleteIndex = this.users.indexOf(username)
                // if userSongList == 0 and user is last element of users
                // we can just set head to 0 directly
                // otherwise, don't update head, since we remove the user key
                // and next user is at current head
                if (toDeleteIndex == this.users.length - 1) {
                    this.head = 0
                }
                this.qMap.delete(username)
                this.users.splice(toDeleteIndex, 1)
            }
            this.length--
            return nextSong
        }
    }


    getSongAtIndex(i) {
        let counter = 0
    }

    removeSongAtIndex(i) {

    }

    // need to be careful with the timing of this method call to prevent
    // index out of bounds or skipping when a user's final song has played
    updateHead() {
        // want to reset head if it's >= index of last element
        if (this.head >= this.users.length - 1) {
            this.head = 0
        } else {
            this.head++
        }
    }

}