import fs from 'fs'

export default class FileUtils {
    constructor() { }

    static readJSONFromPath(filepath) {
        return fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading from ${filepath}}: ${err}`)
            } else {
                let parsedData = JSON.parse(data)
                console.log(`Successfully parsed: ${JSON.stringify(parsedData)}`)
                return parsedData
            }
        })
    }

    static readJSONFromCSV(filepath) {
        return fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading from ${filepath}}: ${err}`)
            } else {
                let retArr = []
                let datArr = data.split("\n")
                if (datArr.length > 0) {
                    // convert from string arr to obj arr
                    for (let i = 0; i < datArr.length; i++) {
                        retArr[i] = JSON.parse(datArr[i])
                        console.log(`Item index ${i} of ${filepath}: ${JSON.stringify(datArr[i])}`)
                    }
                }

                console.log(`Finished reading ${filepath}`)
                return retArr
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
            if (err) {
                console.log(`Error writing ${data} to ${filepath}: ${err}`)
            }
        })
    }
}