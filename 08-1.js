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
                let letter2 = row2[x2]
                if (letter == letter2) {
                    // js was saying that x2 + x2 - x1 is the same as x2^2 - x1 (wtf???)
                    let x3 = x2*2 - x1
                    let y3 = y2*2 - y1
                    if (!grid[y3] || !grid[y3][x3]) continue
                    if (grid[y3][x3] != ".") {
                        let c1 = grid[y1][x1]
                        let c3 = grid[y3][x3]
                        if (c3 != "#" && c3 != c1) antinodes++
                        continue
                    }
                    grid[y3][x3] = "#"
                    antinodes++
                }
            }
        }
    }
}

for (let row of grid) {
    console.log(row.join(""))
}

console.log(antinodes)
