/*

Basic structure is a Map<String, Array> 
+ an Array copy of the keyset to iterate over.

*/
export default class PriorityQ {
  qMap = new Map()
  head = 0
  length = 0 // length of resultant song queue

  constructor() { }

  updateHead() {
    if (this.head >= this.qMap.size - 1) {
      this.head = 0
    } else {
      this.head++
    }
  }

  push(song) {
    const username = song.username

    if (this.qMap.has(username)) {
      this.qMap.get(username).push(song)
    } else {
      this.qMap.set(username, [song])
    }

    this.length++
  }

  shift() {
    if (this.length > 0) {
      const keysArray = Array.from(this.qMap.keys());
      const username = keysArray[this.head];
      const userSongList = this.qMap.get(username)
      const nextSong = userSongList.shift()
      
      if (userSongList.length > 0) {
        this.updateHead()
      } else {
        const toDeleteIndex =  keysArray.indexOf(username);
        // if userSongList == 0 and user is last element of users
        // we can just set head to 0 directly
        // otherwise, don't update head, since we remove the user key
        // and next user is at current head
        if (toDeleteIndex == this.qMap.size - 1) {
          this.head = 0
        }
        this.qMap.delete(username)
      }
      this.length--
      return nextSong
    }
  }

  // returns username and index of the element at index n
  traverse(n) {
    if (n >= 0 && n < this.length) {
      let index = 0
      let depth = 0
      // logically, this while loop is for (depth < maxDepth), but that requires us to find maxDepth first
      // instead we can just break if index !< n since that's what we really care about anyways
      while (index <= n) {
        // go through each song at user[depth] and check if it exists
        // if it does, increment. if it doesn't, skip
        for (const username of this.qMap.keys()) {
          if (this.qMap.get(username)[depth]) {
            if (index == n) {
              return ({
                username, 
                depth 
              });
            }
            index++
          }
        }
        // once we go through everyone, we increment depth and look through next "row"
        depth++
      }
    }
  }

  getSongAtIndex(i) {
    const { username, depth } = this.traverse(i)
    
    return this.qMap.get(username)[depth];
  }

  removeSongAtIndex(i) {
    const { username, depth } = this.traverse(i)
    this.qMap.get(username).splice(depth, 1)
    this.length--
    // if we're removing the current song, then don't repeat turn
    // go to next guy
    if (i == 0) {
      this.updateHead()
    }
  }

  // literally just traverse, but we add elements into retArr
  flatten() {
    const retArr = []
    let index = 0
    let depth = 0
    while (index < this.length) {
      for (const username of this.qMap.keys()) {
        let song = this.qMap.get(username)[depth]
        if (song) {
          retArr.push(song)
          index++
        }
      }
      depth++
    }
    return retArr
  }
}