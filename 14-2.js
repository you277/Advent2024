const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let robots = []
let roomSize = { x: 101, y: 103 }
let initialPositions = []

for (let line of fileData.split("\r\n")) {
    let [_, x, y, xVel, yVel] = line.match(/p=(\d+),(\d+) v=(\-?\d+),(\-?\d+)/)
    x = parseInt(x)
    y = parseInt(y)
    robots.push({
        x: x, y: y,
        velocity: { x: parseInt(xVel), y: parseInt(yVel) }
    })
    initialPositions.push({ x: x, y: y })
}

function simulate() {
    for (let robot of robots) {
        let nextX = (robot.x + robot.velocity.x)%roomSize.x
        let nextY = (robot.y + robot.velocity.y)%roomSize.y
        robot.x = nextX >= 0 ? nextX : roomSize.x + nextX
        robot.y = nextY >= 0 ? nextY : roomSize.y + nextY
    }
}

function toGrid() {
    let grid = []
    for (let y = 0; y < roomSize.y; y++) {
        let row = []
        for (let x = 0; x < roomSize.x; x++) {
            let amt = 0
            for (let robot of robots) {
                if (robot.x == x && robot.y == y) {
                    amt++
                }
            }
            row.push(amt > 0 ? amt : ".")
        }
        grid.push(row)
    }
    return grid
}

function vis() {
    for (let row of toGrid()) {
        console.log(row.join(""))
    }
    console.log("######################################")
}

let loopAmt = 1
simulate()

function areRobotsAtInitPositions() {
    for (let i in robots) {
        let robot = robots[i]
        let pos = initialPositions[i]
        if (robot.x != pos.x || robot.y != pos.y) return false
    }
    return true
}

function maybeHasPicture() {
    let grid = toGrid()
    for (let robot of robots) {
        let ok = true
        for (let i = 1; i < 30; i++) {
            let x = robot.x + i
            if (x >= roomSize.x || !grid[x][robot.y] || grid[x][robot.y] == ".") {
                ok = false
                break
            }
        }
        if (ok) return true
    }
    return false
}

while (!areRobotsAtInitPositions()) {
    simulate()
    loopAmt++
}

console.log(loopAmt)

for (let i in robots) {
    let robot = robots[i]
    let pos = initialPositions[i]
    robot.x = pos.x
    robot.y = pos.y
}

for (let i = 1; i <= loopAmt; i++) {
    simulate()
    console.log(i)
    if (maybeHasPicture()) {
        vis()
        break
    }
}
