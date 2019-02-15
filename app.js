var t = process.hrtime();
const input = require('./input.json')

checkRow = (data, row) => {
    // console.log('Row : ', row)
    let rowSet = new Set();
    for (let i = 0; i < 9; i++) {
        if (rowSet.has(data[row][i])) return false
        if (data[row][i] !== ".") rowSet.add(data[row][i])
    }
    // console.log("Row Set : ", rowSet);
    return true
}

checkColumn = (data, col) => {
    // console.log('Column : ', col)
    let columnSet = new Set();
    for (let i = 0; i < 9; i++) {
        if (columnSet.has(data[i][col])) return false
        if (data[i][col] !== ".") columnSet.add(data[i][col])
    }
    // console.log("Column Set : ", columnSet);
    return true
}

checkBox = (data, row, col) => {
    // console.log('Box : ', row, col)
    let boxSet = new Set();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let current = data[row + i][col + j]
            if (boxSet.has(current)) return false
            if (current !== ".") boxSet.add(current)
        }
    }
    // console.log("Box Set : ", boxSet)
    return true
}

isValidData = (data, row, col) => {
    let nextRow = row - (row % 3)
    let nextColumn = col - (col % 3)
    return checkRow(data, row) && checkColumn(data, col) && checkBox(data, nextRow, nextColumn)
}

isValidSolution = data => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // console.log("Main Loop : i : ", i," j :", j)
            let status = isValidData(data, i, j)
            // console.log("Status : ", status)
            if (!status) return false
        }
    }
    return true;
}

for (let sudokuPuzzle in input.data){
    console.log(isValidSolution(input.data[sudokuPuzzle]) ? "YES, It's a valid puzzle" : "NO, It's not a valid puzzle.")
}

t = process.hrtime(t);

console.log('Program took %d nanoseconds and Node Process Uptime was %d', t[1], process.uptime());