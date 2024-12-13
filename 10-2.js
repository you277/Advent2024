const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let grid = []
let trailHeads = []
let startPosition = { x: 0, y: 0 }

let lines = fileData.split("\n")
for (let y in lines) {
    grid[y] = lines[y].split("").map(n => parseInt(n))
    for (let x in grid[y]) {
        if (grid[y][x] == 0) {
            trailHeads.push({ x: parseInt(x), y: parseInt(y) })
        }
    }
}

function branch(x, y, reached) {
    let next = [
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x, y: y - 1 },
        { x: x, y: y + 1 }
    ]

    for (let nextPos of next) {
        if (!grid[nextPos.y] || !grid[nextPos.y][nextPos.x]) continue
        if (grid[nextPos.y][nextPos.x] - grid[y][x] != 1) continue
        if (grid[nextPos.y][nextPos.x] == 9) {
            reached.push("idk")
        } else {
            branch(nextPos.x, nextPos.y, reached)
        }
    }
}

let rating = 0

for (let trailHead of trailHeads) {
    let reached = []
    branch(trailHead.x, trailHead.y, reached)
    rating += reached.length
}

console.log(rating)
