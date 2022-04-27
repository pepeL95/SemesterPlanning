const dm = require('fast-csv')

const fileSystem = require('fs')

module.exports = class DataManager {

    readData(fileName) {
        const stream = fileSystem.createReadStream(fileName)

        const data = dm.parseStream(stream, { headers: true })
            // .on('error', error => console.log(console.error()))
            // .on('data', row => {
            //     console.log(`ROW=${JSON.stringify(row)}`)
            // })
            // .on('end', rowCount => console.log(`Parsed ${rowCount} rows`))
        return data
    }

}





