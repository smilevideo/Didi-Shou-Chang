/*

Basic structure is a Map<String, Array> 
+ an Array copy of the keyset to iterate over.

*/
export default class PriorityQ {
  qMap = new Map()
  length = 0 // length of resultant song queue

  constructor() { }

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
      const [ username, userSongList ] = this.qMap.entries().next().value
      const nextSong = userSongList.shift()

      if (userSongList.length > 0) {
        // reorder map keys
        this.qMap.delete(username)
        this.qMap.set(username, userSongList)
      } else {
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
    // if removing 0, we still want to shift to reorder map
    // i.e. only skip person's turn if we remove current song
    if (i == 0) {
      this.shift()
    } else {
      const { username, depth } = this.traverse(i)
      this.qMap.get(username).splice(depth, 1)
      this.length--
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