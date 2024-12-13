// not complete, has a complete slow down past iteration 36

const fs = require("fs")

let fileData = fs.readFileSync("input", "utf-8")
let stones = fileData.split(" ").map(n => parseInt(n))

let cache = new Map()
let powCache = new Map()
let floor = Math.floor
let log = Math.log
let LOG10E = Math.LOG10E

function calcPow(l) {
    let pow = 10**floor(l/2)
    powCache.set(l, pow)
    return pow
}

let one = [1]

function calc(n) {
    if (!n) return one
    let strL = log(n) * LOG10E + 1 | 0
    if (!(strL % 2)) {
        let pow = powCache.get(strL) ?? calcPow(strL)
        return [ floor(n / pow), n % pow]
    }
    return [n * 2024]
}

function go(n) {
    let v = calc(n)
    cache.set(n, v)
    return v
}

function gogogo(nums, amt, depth, maxDepth) {
    if (depth == maxDepth) return amt + nums.length
    let d2 = depth + 1
    let n1 = nums[0]
    amt = gogogo(cache.get(n1) ?? go(n1), amt, d2, maxDepth)
    if (nums.length != 1) {
        let n2 = nums[1]
        amt = gogogo(cache.get(n2) ?? go(n2), amt, d2, maxDepth)
    }
    return amt
}

let aaa = performance.now()

let totalStones = 0
for (let n of stones) {
    totalStones += gogogo([n], 0, 0, 75)
}

console.log(`time elapsed: ${performance.now() - aaa}`)
console.log(totalStones)
