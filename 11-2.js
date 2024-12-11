// not complete, has a complete slow down past iteration 36

const fs = require("fs")

let fileData = fs.readFileSync("input", "utf-8")
let stones = fileData.split(" ").map(n => parseInt(n))

let one = [1]
let cache = new Map()
let floor = Math.floor

function calc(n) {
    if (!n) return one
    let strN = n.toString()
    if (strN.length % 2 === 0) {
        let pow = 10**floor(strN.length/2)
        return [
            floor(n / pow),
            n % pow
        ]
    }
    return [n * 2024]
}

function go(n) {
    let v = calc(n)
    cache.set(n, v)
    return v
}
let aaa = performance.now()

for (let i = 0; i < 75; i++) {
    // console.log(i, stones.length)
    stones = stones.flatMap(n => cache.get(n) ?? go(n))
}

console.log(`time elapsed: ${performance.now() - aaa}`)
console.log(stones.length)
