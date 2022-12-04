// Author: FN-FAL113
// (C) 2022 FN-FAL113, Copyright Protected

const { readFile } = require('fs').promises

const readFileData = async () => {
    const data = await readFile('input.txt')
    
    return data.toString()
}

readFileData().then(data =>{
    const obj = {}
    var i =  1;

    // split calories by new line, returns an array of values
    for (const calories of data.split("\n")) {
        if(Number.isNaN(parseInt(calories))){ 
            // new line reached, create new object where key is an incremented int value
            // initialized with empty array
            obj['elf-' + ++i] = []
            continue
        } else if(!obj['elf-' + i]) { 
            // object key not exist, create new object where key is the value of var i
            // initialize with empty array
            obj['elf-' + i] = []
        }
        
        // push each parsed calory value to object value array
        obj['elf-' + i].push(parseInt(calories))
    }
    
    // sum all the values from each object value array
    const summedValues = []
    for (let j = 1; j <= Object.keys(obj).length; j++) {
        obj['elf-' + j] = obj['elf-' + j].reduce((previous, current) => previous + current)
        summedValues.push(['elf-' + j, obj['elf-' + j]])
    }

    // sort the summed values array
    let max = summedValues.sort((a, b) => b[1] - a[1])

    // Part 1 answer
    console.log(max[0][0] + " with the highest calories summed: " + max[0][1])
    // Part 2 Answer
    console.log("top 3 highest calories summed: " + max.slice(0, 3)
                .reduce(([name, value1], [name2, value2]) => [name, value1+value2])[1]
    )
})