const fs = require("fs")

let fileData = fs.readFileSync("input", "utf-8")
let stones = fileData.split(" ").map(n => parseInt(n))

function blink() {
    stones = stones.flatMap(n => {
        let strN = n.toString()
        if (n === 0) return [1]
        if (strN.length % 2 === 0) {
            let half = Math.floor(strN.length/2)
            return [parseInt(strN.substring(0, half)), parseInt(strN.substring(half))]
        }
        return [n * 2024]
    })
}

for (let i = 0; i < 25; i++) {
    blink()
}

console.log(stones.length)
