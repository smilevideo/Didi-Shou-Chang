import fs from 'fs'

export default class FileUtils {
    constructor() {}

    static readJSONFromPath(filepath) {
        let retObj
        try {
            console.log(`Reading from ${filepath}...`)
            let file = fs.readFileSync(filepath, 'utf8')
            retObj = JSON.parse(file)
            console.log(`Successfully parsed: ${JSON.stringify(retObj)}`)
        } catch (e) {
            console.log(`Error reading from ${filepath}}: ${e}`)
        }
        return retObj
    }

    static readJSONArray(filepath) {
        let retArr = []
        try {
            console.log(`Reading from ${filepath}...`)
            let data = fs.readFileSync(filepath, 'utf8')
            let datArr = data.split("\n")
            for (let i = 0; i < datArr.length; i++) {
                try {
                    retArr[i] = JSON.parse(datArr[i])
                    console.log(`Item index ${i} of ${filepath}: ${datArr[i]}`)
                } catch (e) {
                    console.log(`Error parsing item ${i}: ${datArr[i]}`)
                }
            }
            console.log(`Finished reading ${filepath}`)
        } catch (e) {
            console.log(`Error reading from ${filepath}}: ${e}`)
        }
        return retArr
    }

    static arrayOfJSONToString(arr) {
        let retString = ""
        for (const element of arr) {
            retString += JSON.stringify(element) + "\n"
        }
        return retString.trimEnd()
    }

    static writeToPath(filepath, data) {
        console.log(`Writing to ${filepath}`)
        fs.writeFileSync(filepath, data, { flag: 'w' }, (err) => {
            if (err) {
                console.log(`Error writing ${data} to ${filepath}: ${err}`)
            }
        })
    }
}