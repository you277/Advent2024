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

        let b = (prizeX - aX*(prizeX - prizeY)/(aX - aY))/(-aX*(bX - bY)/(aX - aY) + bX)
        let a = (prizeX - prizeY - (bX - bY)*b)/(aX - aY)
        if (a%1 === 0) {
            // found the answer for this one!!
            price += a*3 + b
        } else {
            // this doesnt have a match
        }
        // console.log(a, b, aX*a + bX*b, aY*a + bY*b)
}

console.log(price)
