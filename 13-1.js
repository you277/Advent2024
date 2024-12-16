// currently not correct on real input

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
        prize: { x: parseInt(prizeX), y: parseInt(prizeY)}
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

    /*
        initial solution: this worked for the example but not the real input

        prizeX = aX*a + bX*b
        prizeY = aY*a + bY*b

        prizeX - prizeY = (aX - aY)*a + (bX - bY)*b

        (prizeX - prizeY - (bX - bY)*b)/(aX - aY) = a

        prizeX = aX*(prizeX - prizeY - (bX - bY)*b)/(aX - aY) + bX*b

        prizeX = aX*(prizeX - prizeY)/(aX - aY) - aX*(bX - bY)*b/(aX - aY) + bX*b

        prizeX - aX*(prizeX - prizeY)/(aX - aY) = - aX*(bX - bY)*b/(aX - aY) + bX*b

        prizeX - aX*(prizeX - prizeY)/(aX - aY) = b*(-aX*(bX - bY)/(aX - aY) + bX)

        b = (prizeX - aX*(prizeX - prizeY)/(aX - aY))/(-aX*(bX - bY)/(aX - aY) + bX)

        a: plug into equation above
    */

    /*
        alternative: this one worked for both the example and the real input yay

        prizeX = aX*a + bX*b
        prizeY = aY*a + bY*b

        a = (prizeX - bX*b)/aX
        a = (prizeY - bY*b)/aY

        (prizeX - bX*b)/aX = (prizeY - bY*b)/aY

        (prizeX - bX*b)*aY = (prizeY - bY*b)*aX
        prizeX*aY - bX*b*aY = prizeY*aX - bY*b*aX

        prizeX*aY - prizeY*aX = -bY*b*aX + bX*b*aY
        prizeX*aY - prizeY*aX = b*(-bY*aX + bX*aY)

        (prizeX*aY - prizeY*aX)/(-bY*aX + bX*aY) = b
    */

    // let b = (prizeX - aX*(prizeX - prizeY)/(aX - aY))/(-aX*(bX - bY)/(aX - aY) + bX)
    // let a = (prizeX - prizeY - (bX - bY)*b)/(aX - aY)
    let b = (prizeX*aY - prizeY*aX)/(-bY*aX + bX*aY)
    let a = (prizeX - bX*b)/aX
    if (a%1 === 0 && b%1 === 0) price += a*3 + b
}

console.log(price)
