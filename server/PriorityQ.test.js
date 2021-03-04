import PriorityQ from './PriorityQ.js'
import Song from './Song.js'

// aaa: song1, song3
// bbb: song2, song4
var prioQ = new PriorityQ()
const song1 = new Song('aaa', '111', null, 10)
const song1Copy = new Song('aaa', '111', null, 10)
const song2 = new Song('bbb', "222", null, 20)
const song3 = new Song('aaa', "333", null, 30)
const song4 = new Song('bbb', "444", null, 40)
const songs = [song1, song2, song3, song4]

// ghetto manual tests with no testing framework xd
// run using node PriorityQ.test.js and check all cases return true

console.log(song1.equals(song1Copy))

setup()
pushTest()

setup()
shiftTest()

setup()
getSongAtIndexTest()

// methods
function setup() {
    prioQ = new PriorityQ()
    prioQ.push(song1)
    prioQ.push(song2)
    prioQ.push(song3)
    prioQ.push(song4)
}

function pushTest() {
    let newPrioQ = new PriorityQ()
    console.log("Push Test...")
    newPrioQ.push(song1)
    console.log(`pushTest case 1a: ${newPrioQ.length == 1}`)
    console.log(`pushTest case 1b: ${newPrioQ.qMap.get(song1.username)[0] == song1}`)
}

function shiftTest() {
    console.log("Shift Test...")


    console.log("Checking sequential shift() against song constants")
    console.log(`shiftTest case 1a: ${song1 == prioQ.shift()}`)
    console.log(`shiftTest case 1b: ${prioQ.users.length == 2}`)
    console.log(`shiftTest case 1c: ${prioQ.length == 3}`)

    console.log(`shiftTest case 2a: ${song2 == prioQ.shift()}`)
    console.log(`shiftTest case 2b: ${prioQ.users.length == 2}`)
    console.log(`shiftTest case 2c: ${prioQ.length == 2}`)

    console.log(`shiftTest case 3a: ${song3 == prioQ.shift()}`)
    console.log(`shiftTest case 3b: ${prioQ.users.length == 1}`)
    console.log(`shiftTest case 3c: ${prioQ.users[0] == song4.username}`)
    console.log(`shiftTest case 3d: ${prioQ.length == 1}`)

    console.log(`shiftTest case 4a: ${song4 == prioQ.shift()}`)
    console.log(`shiftTest case 4b: ${prioQ.users.length == 0}`)
    console.log(`shiftTest case 4c: ${prioQ.length == 0}`)

    // check if fields of prioQ are reset even after an empty shfit
    prioQ.shift()
    console.log(`shiftTest case 5a: ${prioQ.length == 0}`)
    console.log(`shiftTest case 5b: ${prioQ.users.length == 0}`)
    console.log(`shiftTest case 5c: ${prioQ.head == 0}`)
    console.log(`shiftTest case 5d: ${prioQ.qMap.size == 0}`)
}

function getSongAtIndexTest() {
    var i
    for (i=0; i < songs.length; i++) {
        let retSong = prioQ.getSongAtIndex(i)
        console.log(`getItemAtIndexTest case ${i+1}: ${retSong.equals(songs[i])}`)
    }

}