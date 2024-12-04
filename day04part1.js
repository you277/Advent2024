const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

let grid = []

for (let line of data.split("\n")) {
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

let amount = 0

function checkSeq(startX, startY, xStep, yStep) {
    const chars = []
    let x = parseInt(startX) // theyre strings idk why
    let y = parseInt(startY)
    for (let i = 0; i < 4; i++) {
        chars.push(get(x, y))
        x += xStep
        y += yStep
    }
    let result = chars.join("")
    if (result == "XMAS" || result == "SAMX") {
        amount++
    }
}

for (let x in grid) {
    for (let y in grid[x]) {
        if (grid[x][y] != "X") continue
        // console.log(x, y)
        checkSeq(x, y, 1, 0)     // horizontal
        checkSeq(x, y, -1, 0)
        checkSeq(x, y, 0, 1)     // vertical
        checkSeq(x, y, 0, -1)

        checkSeq(x, y, -1, -1)   // diagonals \
        checkSeq(x, y, 1, 1)
        checkSeq(x, y, 1, -1)    // diagonals /
        checkSeq(x, y, -1, 1)
    }
}

console.log(amount)
