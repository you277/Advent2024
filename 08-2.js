const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let antinodes = 0

let grid = []

let lines = fileData.split("\n")
for (let y in lines) {
    grid[y] = lines[y].split("")
}

for (let y1 in grid) {
    let row = grid[y1]
    for (let x1 in row) {
        let letter = row[x1]
        if (letter == "." || letter == "#") continue
        for (let y2 in grid) {
            let row2 = grid[y2]
            for (let x2 in row2) {
                if (x1 == x2 && y1 == y2) continue
                let letter2 = row2[x2]
                if (letter != letter2) continue
                let offX = x2 - x1
                let offY = y2 - y1
                let x3 = parseInt(x2) + offX // x1 and y1 are strings WTF
                let y3 = parseInt(y2) + offY
                while (grid[y3] && grid[y3][x3]) {
                    if (grid[y3][x3] == ".") grid[y3][x3] = "#"
                    x3 += offX
                    y3 += offY
                }
            }
        }
    }
}

for (let y in grid) {
    let row = grid[y]
    for (let x in row) {
        if (row[x] != ".") antinodes++
    }
}

// for (let row of grid) {
//     console.log(row.join(""))
// }

console.log(antinodes)
