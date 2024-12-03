// still not correct

const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

function iter(data, callback) {
    for (let i = 1; i < data.nums.length; i++) {
        if (!callback(data.nums[i - 1], data.nums[i])) {
            // return false
            if (data.ignored) return false
            data.ignored = true
            data.nums.splice(i, 1)
            i--
        }
    }
    return true
}

function isIncreasing(data) {
    return iter(data, (a, b) => a < b)
    for (let i = 1; i < data.nums.length; i++) {
        if (data.nums[i] > data.nums[i - 1]) {
            if (data.ignored) {
                return false
            }
            data.ignored = true
            data.nums.splice(i, 1)
            i--
        }
    }
    return true
}

function isDecreasing(data) {
    return iter(data, (a, b) => a > b)
    for (let i = 1; i < data.nums.length; i++) {
        if (data.nums[i] < data.nums[i - 1]) {
            if (data.ignored) {
                return false
            }
            data.ignored = true
            data.nums.splice(i, 1)
            i--
        }
    }
    return true
}

function isSafe(data) {
    return iter(data, (a, b) => {
        let diff = Math.abs(a - b)
        return diff >= 1 && diff <= 3
    })
    for (let i = 1; i < data.nums.length; i++) {
        let diff = Math.abs(data.nums[i] - data.nums[i - 1])
        if (diff < 1 || diff > 3) {
            if (data.ignored) {
                return false
            }
            data.nums.ignored = true
            data.nums.splice(i, 1)
            i--
        }
    }
    return true
}

let safe = 0

for (let line of data.split("\n")) {
    let lines = line.split(" ")
    if (lines[0] === "") continue
    let data = {nums: lines.map(n => parseInt(n)), ignored: false}
    if (isSafe(data) && ((isIncreasing(data) || isDecreasing(data)))) {
        safe++
    }
}

console.log(safe)
