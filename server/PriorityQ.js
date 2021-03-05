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

    // lock to make all of our operations atomic
    inUse = false
    // 
    pollingRate = 500

    constructor() { }

    push(song) {
        if (!this.inUse) {
            this.inUse = true
            this._push(song)
            this.inUse = false
        } else {
            setTimeout(() => {
                this.push(song)
            }, this.pollingRate)
        }
    }

    _push(song) {
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
        if (!this.inUse) {
            this.inUse = true
            let retVal = this._shift()
            this.inUse = false
            return retVal
        } else {
            setTimeout(() => {
                return this.shift()
            }, this.pollingRate)
        }
    }

    _shift() {
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
        if (!this.inUse) {
            let values = this.traverse(i)
            return this.qMap.get(values[0])[values[1]]
        } else {
            setTimeout(() => {
                return this.getSongAtIndex(i)
            }, this.pollingRate)
        }

    }

    removeSongAtIndex(i) {
        let values = this.traverse(i)
    }

    // returns [username, index] of the element at index n
    traverse(n) {
        if (n < this.length && n > -1) {
            let index = 0
            let depth = 0
            // logically, this while loop is for (depth < maxDepth), but that requires us to find maxDepth first
            // instead we can just break if index !< n since that's what we really care about anyways
            while (index <= n) {
                // go through each song at user[depth] and check if it exists
                // if it does, increment. if it doesn't, skip
                for (const user of this.users) {
                    if (this.qMap.get(user)[depth]) {
                        if (index == n) {
                            return [user, depth]
                        }
                        index++
                    }
                }
                // once we go through everyone, we increment depth and look through next "row"
                depth++
            }
        }
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