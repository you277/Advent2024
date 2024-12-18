// doesnt work

const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let grid = []

let lines = fileData.split("\r\n")
lines.splice(0, 1)
lines.splice(lines.length - 1, 1)

let size = { x: 0, y: 0 }
let startPosition = { x: 0, y: 0 }

let canTraverseMap = new Map()

let dirs = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}
]

function canGoNext(x, y, dirValues) {
    let nextX = x + dirValues.x
    let nextY = y + dirValues.y
    if (nextX < 0 || nextX >= size.x || nextY < 0 || nextY >= size.y) return [false]
    if (grid[nextY][nextX] == "#") return [false]
    if (grid[nextY][nextX] == "E") return [true, { x: nextX, y: nextY }, true]
    return [true, { x: nextX, y: nextY }]
}

for (let y in lines) {
    let row = lines[y].substring(1, lines[y].length - 1)
    let tiles = row.split("")
    size.x = tiles.length
    for (let x in tiles) {
        if (tiles[x] == "#") {
            // tiles[x] = "#"
        } else if (tiles[x] == "S") {
            startPosition = { x: parseInt(x), y: parseInt(y) }
            tiles[x] = undefined
        } else if (tiles[x] != "E") {
            tiles[x] = undefined
        }
    }
    grid.push(tiles)
}
size.y = grid.length

for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
        
        r.push((x == startPosition.x && y == startPosition.y) ? "S" : grid2[y][x] ?? " ")
    }
}

function visGrid(grid2) {
    for (let y = 0; y < size.y; y++) {
        let r = []
        for (let x = 0; x < size.x; x++) {
            r.push((x == startPosition.x && y == startPosition.y) ? "S" : grid2[y][x] ?? " ")
        }
        console.log(r.join(""))
    }
}

let scores = []

let dirChars = [">", "v", "<", "^"]

function visPath(tileStrs) {
    let newGrid = [...grid].map(row => [...row])
    for (let str in tileStrs) {
        let dirIdx = tileStrs[str]
        let [xStr, yStr] = str.split(",")
        newGrid[parseInt(yStr)][parseInt(xStr)] = dirChars[dirIdx]
    }
    visGrid(newGrid)
}

function traverse(x, y, dirIdx, alrTraversed = {}, rotations = 0, moves = 0) {
    alrTraversed = {...alrTraversed}
    let str = `${x},${y}`
    if (alrTraversed[str] !== undefined) return
    alrTraversed[str] = dirIdx
    for (let i in dirs) {
        if (i == dirIdx) continue
        let [canNext, nextPos] = canGoNext(x, y, dirs[i])
        if (canNext) {
            traverse(nextPos.x, nextPos.y, i, alrTraversed, rotations + 1, moves + 1)
        }
    }
    let [canNext, nextPos, isNextEnd] = canGoNext(x, y, dirs[dirIdx])
    if (canNext) {
        if (isNextEnd) {
            // console.log(rotations, moves)
            // visPath(alrTraversed)
            scores.push(rotations*1000 + moves)
        } else {
            traverse(nextPos.x, nextPos.y, dirIdx, alrTraversed, rotations, moves + 1)
        }
    }
}

traverse(startPosition.x, startPosition.y, 0)

let a = Math.min(...scores)
console.log(a + 1)

// console.log(scores)
