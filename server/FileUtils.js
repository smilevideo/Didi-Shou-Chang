import fs from 'fs'

export default class FileUtils {
    constructor() {}

    static readJSONFromPath(filepath) {
        return fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading from ${filepath}}: ${err}`)
            } else {
                let parsedData = JSON.parse(data)
                console.log(`Successfully parsed: ${parsedData}`)
                return parsedData
            }
        })
    }

    static readJSONFromCSV(filepath) {
        return fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading from ${filepath}}: ${err}`)
            } else {
                let datArr = data.split("\n")
                // convert from string arr to obj arr
                for (i = 0; i < datArr.length; i++) {
                    datArr[i] = JSON.parse(datArr[i])
                    console.log(`Item index ${i} of ${filepath}: ${datArr[i]}`)
                }
                console.log(`Finished reading ${filepath}`)
                return datArr
            }
        })
    }

    static arrayOfJSONToString(arr) {
        let retString = ""
        for (const element of arr) {
            retString += `${JSON.stringify(element)}\n`
        }
        return retString.trimEnd()
    }

    static writeToPath(filepath, data) {
        fs.writeFile(filepath, data, { flag: 'w' }, (err) => {
            console.log(`Error writing ${data} to ${filepath}: ${err}`)
        })
    }
}