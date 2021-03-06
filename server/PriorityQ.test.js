import PriorityQ from './PriorityQ.js'
import Song from './Song.js'

// aaa: song1, song3
// bbb: song2, song4
var prioQ = new PriorityQ()
const songA1 = new Song('aaa', '111', null, 10)
const song1Copy = new Song('aaa', '111', null, 10)
const songB1 = new Song('bbb', "222", null, 20)
const songA2 = new Song('aaa', "333", null, 30)
const songB2 = new Song('bbb', "444", null, 40)
const songs = [songA1, songB1, songA2, songB2]

// ghetto manual tests with no testing framework xd
// run using node PriorityQ.test.js and check all cases return true

console.log(songA1.equals(song1Copy))

setup()
pushTest()

setup()
shiftTest()

setup()
getSongAtIndexTest()

setup()
removeSongAtIndexTest()

setup()
removeFirstSongTest()

// methods
function setup() {
    prioQ = new PriorityQ()
    prioQ.push(songA1)
    prioQ.push(songB1)
    prioQ.push(songA2)
    prioQ.push(songB2)
}

function pushTest() {
    let newPrioQ = new PriorityQ()
    console.log("Push Test...")
    newPrioQ.push(songA1)
    console.log(`pushTest case 1a: ${newPrioQ.length == 1}`)
    console.log(`pushTest case 1b: ${newPrioQ.qMap.get(songA1.username)[0] == songA1}`)
}

function shiftTest() {
    console.log("Shift Test...")


    console.log("Checking sequential shift() against song constants")
    console.log(`shiftTest case 1a: ${songA1 == prioQ.shift()}`)
    console.log(`shiftTest case 1c: ${prioQ.length == 3}`)

    console.log(`shiftTest case 2a: ${songB1 == prioQ.shift()}`)
    console.log(`shiftTest case 2c: ${prioQ.length == 2}`)

    console.log(`shiftTest case 3a: ${songA2 == prioQ.shift()}`)
    console.log(`shiftTest case 3d: ${prioQ.length == 1}`)

    console.log(`shiftTest case 4a: ${songB2 == prioQ.shift()}`)
    console.log(`shiftTest case 4c: ${prioQ.length == 0}`)

    // check if fields of prioQ are reset even after an empty shfit
    prioQ.shift()
    console.log(`shiftTest case 5a: ${prioQ.length == 0}`)
    console.log(`shiftTest case 5d: ${prioQ.qMap.size == 0}`)
}

function getSongAtIndexTest() {
    var i
    for (i=0; i < songs.length; i++) {
        let retSong = prioQ.getSongAtIndex(i)
        console.log(`getItemAtIndexTest case ${i+1}: ${retSong.equals(songs[i])}`)
    }
    console.log(`getItemAtIndexTest length assertion: ${prioQ.length == songs.length}`)
}

function removeSongAtIndexTest() {
    prioQ.removeSongAtIndex(0)
    console.log(`removeItemAtIndexTest case 1: ${prioQ.shift() == songB1}`)
    setup()
    prioQ.removeSongAtIndex(1)
    prioQ.shift()
    console.log(`removeItemAtIndexTest case 2: ${prioQ.shift() == songB2}`)

}

function removeFirstSongTest() {
    const songC1 = new Song('ccc', '111', null, 10)
    const songC2 = new Song('ccc', '222', null, 20)
    prioQ.push(songC1)
    prioQ.push(songC2)

    prioQ.removeSongAtIndex(0)
    console.log(`removeFirstSongTest case 1a: ${prioQ.length == 5}`)
    console.log(`removeFirstSongTest case 1b: ${prioQ.shift() == songB1}`)
    console.log(`removeFirstSongTest case 1c: ${prioQ.getSongAtIndex(prioQ.length-1) == songC2}`)

    prioQ.removeSongAtIndex(0)
    console.log(`removeFirstSongTest case 2a: ${prioQ.length == 3}`)
    console.log(`removeFirstSongTest case 2b: ${prioQ.shift() == songA2}`)
    console.log(`removeFirstSongTest case 2c: ${prioQ.getSongAtIndex(prioQ.length-1) == songC2}`)

    prioQ.removeSongAtIndex(0)
    console.log(`removeFirstSongTest case 3a: ${prioQ.length == 1}`)
    console.log(`removeFirstSongTest case 3b: ${prioQ.shift() == songC2}`)
}