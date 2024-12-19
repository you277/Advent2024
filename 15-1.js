const fs = require("fs")
const readline = require("node:readline")

const fileData = fs.readFileSync("input", "utf-8")

let data = fileData.split("\r\n\r\n")

let grid = []
let robot = { x: 0, y: 0 }
let xSize = 0

let rows = data[0].split("\r\n")
rows.splice(0, 1)
rows.splice(rows.length - 1, 1)
for (let y in rows) {
    let rowStr = rows[y]
    let elements = rowStr.substring(1, rowStr.length - 1).split("")
    xSize = elements.length
    let row = []
    for (let x in elements) {
        if (elements[x] == "@") {
            robot.x = parseInt(x)
            robot.y = parseInt(y)
        } else if (elements[x] != ".") {
            row[x] = elements[x]
        }
    }
    grid.push(row)
}

let instructions = data[1].replace("\r\n", "").split("")

let directions = {
    "<": {x: -1, y: 0},
    ">": {x: 1, y: 0},
    "^": {x: 0, y: -1},
    "v": {x: 0, y: 1},
}

function inBounds(x, y) {
    return y >= 0 && y < grid.length && x >= 0 && x < xSize
}

function iter(instruct) {
    let dir = directions[instruct]
    if (!dir) return
    let nextX = robot.x + dir.x
    let nextY = robot.y + dir.y
    if (!inBounds(nextX, nextY)) {
        console.log("hit a boundry")
        return
    }
    if (grid[nextY][nextX] == "#") {
        console.log("hit a wall")
        return
    }
    if (grid[nextY][nextX] != "O") {
        robot.x = nextX
        robot.y = nextY
        return
    }
    let exit = false
    let nextBoxX = nextX
    let nextBoxY = nextY
    while (!exit) {
        nextBoxX += dir.x
        nextBoxY += dir.y
        if (!inBounds(nextBoxX, nextBoxY)) {
            // hit an edge
            console.log("box hit a boundry")
            exit = true
        } else if (grid[nextBoxY][nextBoxX] == "#") {
            // hit a wall
            console.log("box hit a wall")
            exit = true
        } else if (!grid[nextBoxY][nextBoxX]) {
            // found an empty space, can move box
            console.log("moved some boxes")
            grid[nextBoxY][nextBoxX] = "O"
            grid[nextY][nextX] = undefined
            robot.x = nextX
            robot.y = nextY
            exit = true
        }
        console.log(nextBoxX, nextBoxY, grid[nextBoxY] && grid[nextBoxY][nextBoxX], dir)
    }
}

let instructIdx = 0

function vis() {
    console.log("#".repeat(xSize + 2))
    for (let y in grid) {
        let row = [...grid[y]]
        for (let x = 0; x < xSize; x++) {
            if (!row[x]) {
                if (x == robot.x && y == robot.y) {
                    row[x] = "@"
                } else {
                    row[x] = "."
                }
            }
        }
        console.log("#" + row.join("") + "#")
    }
    console.log("#".repeat(xSize + 2))
}

// had a jolly good time watching the robot roam arund the warehouse with this

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function question() {
    if (instructIdx == instructions.length) {
        rl.close()
        return
    }
    iter(instructions[instructIdx])
    console.log(instructIdx, instructions[instructIdx])
    vis()
    rl.question(">", () => {
        question()
    })
    instructIdx++
}

if (false) {
    question()
    return
}

for (let instruct of instructions) {
    iter(instruct)
}

let sum = 0

for (let y in grid) {
    for (let x in grid) {
        if (grid[y][x] == "O") {
            sum += parseInt(x) + 1 + (parseInt(y) + 1)*100
        }
    }
}

vis()

console.log(sum)

rl.close()