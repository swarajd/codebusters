const util = require('util');
const fs = require('fs');

// create a promise-based read file function
fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

// split the contents of a file based on empty lines
let readFileLines = (contents) => {
    return contents
        // each newline is '\r\n', so we're simplifying this to just a '\n'
        .replace(/\r\n/g, "\n")
        // any stray '\r' we'll just substitute with '\n'
        .replace(/\r/g, "\n")
        // whenever there is more than two '\n' (an empty line), we split
        .split(/\n{2,}/);
}

// convert each quote into an easily accessibly JSON object and wrap it 
let jsonifyQuotes = (quotes) => {
    return {
        'quotes': quotes.map(q => ({
            'text': q,
            'length': q.length
        }))
    }
}

// write the JSON to a file
let writeQuotes = (quoteJSON) => {
    return fs.writeFileAsync('quotes.json', JSON.stringify(quoteJSON, null, 2), 'utf-8');
}


// run the full workflow
fs.readFileAsync('quotes.txt', 'utf-8')
    .then(readFileLines)
    .then(jsonifyQuotes)
    .then(writeQuotes)
    .then((err) => {
        if (err) throw err;
        console.log('converted quotes.txt to quotes.json');
    })