const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let robots = []
let roomSize = { x: 101, y: 103 }
// let roomSize = { x: 11, y: 7 }

for (let line of fileData.split("\r\n")) {
    let [_, x, y, xVel, yVel] = line.match(/p=(\d+),(\d+) v=(\-?\d+),(\-?\d+)/)
    robots.push({
        x: parseInt(x), y: parseInt(y),
        velocity: { x: parseInt(xVel), y: parseInt(yVel) }
    })
}

function simulate() {
    for (let robot of robots) {
        let nextX = (robot.x + robot.velocity.x)%roomSize.x
        let nextY = (robot.y + robot.velocity.y)%roomSize.y
        robot.x = nextX >= 0 ? nextX : roomSize.x + nextX
        robot.y = nextY >= 0 ? nextY : roomSize.y + nextY
    }
}

for (let i = 0; i < 100; i++) {
    simulate()
}

// debug and visualizations

// for (let robot of robots) {
//     if (robot.x < 0 || robot.x >= roomSize.x || robot.y < 0 || robot.y >= roomSize.y) {
//         console.log("out of bounds", robot.x, robot.y)
//     }
// }

// for (let y = 0; y < roomSize.y; y++) {
//     let chars = []
//     for (let x = 0; x < roomSize.x; x++) {
//         let amt = 0
//         for (let robot of robots) {
//             if (robot.x == x && robot.y == y) {
//                 amt++
//             }
//         }
//         chars.push(amt > 0 ? amt : ".")
//     }
//     console.log(chars.join(""))
// }

let quadrantsCount = [0, 0, 0, 0]

let halfX = (roomSize.x - 1)/2
let halfY = (roomSize.y - 1)/2

for (let robot of robots) {
    let isOnEdge = robot.x == halfX || robot.y == halfY
    if (isOnEdge) continue
    let quadId = 0
    if (robot.x > halfX) {
        quadId = robot.y > halfY ? 0 : 3
    } else {
        quadId = robot.y > halfY ? 2 : 1
    }
    quadrantsCount[quadId]++
}

// console.log(quadrantsCount)

console.log(quadrantsCount[0]*quadrantsCount[1]*quadrantsCount[2]*quadrantsCount[3])
