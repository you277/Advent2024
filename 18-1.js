// doesnt work, in the process of chaning algo to Dijkstra's algorithm

const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let grid = []

let size = { x: 0, y: 0 }
let startPosition = { x: 0, y: 0 }
let maxBytes = 12

let canTraverseMap = new Map()
let distanceMap = new Map()

let dirs = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}
]
let i = 0
for (let line of fileData.split("\n")) {
    let [x, y] = line.split(",")
    x = parseInt(x)
    y = parseInt(y)
    let row = grid[y]
    if (!row) {
        row = []
        grid[y] = row
    }
    if (i < maxBytes) {
        row[x] = "#"
        i++
    }
    size.x = Math.max(size.x, x + 1)
    size.y = Math.max(size.y, y + 1)
    distanceMap.set(`${x},${y}`, Infinity)
}
distanceMap.set("0,0", 0)
for (let y = 0; y < size.y; y++) {
    if (grid[y] === undefined) {
        grid[y] = []
    }
}

let traversableAmt = size.x*size.y - maxBytes

function visGrid(grid2) {
    for (let y = 0; y < size.y; y++) {
        let r = []
        for (let x = 0; x < size.x; x++) {
            r.push((x == startPosition.x && y == startPosition.y) ? "S" : grid2[y][x] ?? ".")
        }
        console.log(r.join(""))
    }
}

visGrid(grid)

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

function calcCanGoNext(x, y, dirValues) {
    let nextX = x + dirValues.x
    let nextY = y + dirValues.y
    if (nextX < 0 || nextX >= size.x || nextY < 0 || nextY >= size.y) return [false]
    if (grid[nextY][nextX] == "#") return [false]
    if (nextX == size.x - 1 && nextY == size.y - 1) return [true, { x: nextX, y: nextY }, true]
    return [true, { x: nextX, y: nextY }]
}

function canGoNext(x, y, dirValues) {
    let str = `${x},${y},${dirValues.x},${dirValues.y}`
    if (canTraverseMap.has(str)) return canTraverseMap.get(str)
    let res = calcCanGoNext(x, y, dirValues)
    canTraverseMap.set(str, res)
    return res
}

let visited = []

function go(x, y, prevDir, dist = 0) {
    let str = `${x},${y}`
    if (visited.includes(str)) return
    if (distanceMap.get(str) > dist) {
        distanceMap.set(str, dist)
    }
    visited.push(str)
    let nextDist = dist + 1
    for (let dir of dirs) {
        if (prevDir == dir) continue
        let [canNext, nextPos] = canGoNext(x, y, dir)
        if (canNext) {
            go(nextPos.x, nextPos.y, nextDist)
        }
    }
}

while (visited.length < traversableAmt) {
    
}

go(0, 0, dirs[0])
console.log(distanceMap.get(`${size.x - 1},${size.y - 1}`))

// function traverse(x, y, dirIdx, alrTraversed = {}, rotations = 0, moves = 0) {
//     alrTraversed = {...alrTraversed}
//     let str = `${x},${y}`
//     if (alrTraversed[str] === dirIdx) {
//         return
//     }
//     alrTraversed[str] = dirIdx
//     for (let i in dirs) {
//         if (i == dirIdx) continue
//         let [canNext, nextPos] = canGoNext(x, y, dirs[i])
//         if (canNext) {
//             traverse(nextPos.x, nextPos.y, i, alrTraversed, rotations + 1, moves + 1)
//         }
//     }
//     let [canNext, nextPos, isNextEnd] = canGoNext(x, y, dirs[dirIdx])
//     if (canNext) {
//         if (isNextEnd) {
//             // console.log(rotations, moves)
//             // visPath(alrTraversed)
//             // console.log("------------------------")
//             scores.push(moves)
//         } else {
//             traverse(nextPos.x, nextPos.y, dirIdx, alrTraversed, rotations, moves + 1)
//         }
//     }
// }

// traverse(startPosition.x, startPosition.y, 0)

let a = Math.min(...scores)
console.log(a + 1)

// console.log(scores)
