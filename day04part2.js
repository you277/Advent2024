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

function checkX(centerX, centerY) {
    centerX = parseInt(centerX)
    centerY = parseInt(centerY)
    let mas1 = [get(centerX - 1, centerY - 1), get(centerX, centerY), get(centerX + 1, centerY + 1)].join("")
    let mas2 = [get(centerX - 1, centerY + 1), get(centerX, centerY), get(centerX + 1, centerY - 1)].join("")
    return (mas1 == "MAS" || mas1 == "SAM") && (mas2 == "MAS" || mas2 == "SAM")
}

for (let x in grid) {
    for (let y in grid[x]) {
        if (grid[x][y] != "A") continue
        if (checkX(x, y)) {
            amount++
        }
    }
}

console.log(amount)
