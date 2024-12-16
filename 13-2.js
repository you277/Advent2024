const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let entries = []

for (let entry of fileData.split("\r\n\r\n")) {
    let [a, b, prize] = entry.split("\r\n")
    let [_1, aX, aY] = a.match(/Button A: X\+(\d+), Y\+(\d+)/)
    let [_2, bX, bY] = b.match(/Button B: X\+(\d+), Y\+(\d+)/)
    let [_3, prizeX, prizeY] = prize.match(/Prize: X=(\d+), Y=(\d+)/)
    const me = {
        a: { x: parseInt(aX), y: parseInt(aY) },
        b: { x: parseInt(bX), y: parseInt(bY) },
        prize: { x: parseInt(prizeX) + 10000000000000, y: parseInt(prizeY) + 10000000000000}
    }
    entries.push(me)
}

let price = 0

for (let entry of entries) {
    let aX = entry.a.x
    let aY = entry.a.y
    let bX = entry.b.x
    let bY = entry.b.y
    let prizeX = entry.prize.x
    let prizeY = entry.prize.y
    
    let b = (prizeX*aY - prizeY*aX)/(-bY*aX + bX*aY)
    let a = (prizeX - bX*b)/aX
    if (a%1 === 0 && b%1 === 0) price += a*3 + b
}

console.log(price)
