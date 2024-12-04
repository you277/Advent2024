const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

let grid = []

for (let line of data.split("\r\n")) {
    let column = []
    for (let i = 0; i < line.length; i++) {
        column.push(line.charAt(i))
    }
    grid.push(column)
}

function get(x, y) {
    let row = grid[x]
    if (!row) return
    return grid[x][y]
}

function joinSeq(startX, startY, xStep, yStep, stepAmt) {
    const chars = []
    let x = startX
    let y = startY
    for (let i = 0; i < stepAmt; i++) {
        chars.push(get(x, y))
        x += xStep
        y += yStep
    }
    // for (let x = startX; x <= endX; x++) {
    //     for (let y = startY; y <= endY; y++) {
    //         chars.push(get(x, y))
    //     }
    // }
    return chars.join("")
}

let amount = 0

function pls(stepAmt, callback) {
    for (let i = 0; i < stepAmt; i++) {
        let wow = callback(i)
        if (wow == "XMAS" || wow == "SAMX") {
            amount++
        }
    }
}

for (let x in grid) {
    for (let y in grid[x]) {
        pls(4, i => joinSeq(x - 4 + i, y, 1, 0, 8))
        pls(4, i => joinSeq(x, y - 4 + i, 0, 1, 8))
        pls(4, i => joinSeq(x - 4 + i, y - 4 + i, 1, 1, 8))
        pls(4, i => joinSeq(x + 4 - i, y - 4 + i, -1, 1, 8))
    }
}

console.log(amount)

