// incorrect rn

const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

function isIncreasing(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            return false
        }
    }
    return true
}

function isDecreasing(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
            return false
        }
    }
    return true
}

function isSafe(nums) {
    let removedSafe = false
    for (let i = 1; i < nums.length; i++) {
        let diff = Math.abs(nums[i] - nums[i - 1])
        if (diff < 1 || diff > 3) {
            if (removedSafe) {
                console.log(nums, "still no")
                return false
            }
            console.log(nums, "removed", nums[i])
            removedSafe = true
            nums.splice(i, 1)
            console.log(nums)
            i--
        }
    }
    console.log(nums, "ok")
    return true
}

let safe = 0

for (let line of data.split("\r\n")) {
    let nums = line.split(" ").map(n => parseInt(n))
    if (isSafe(nums) && (isIncreasing(nums) || isDecreasing(nums))) {
        safe++
    }
}

console.log(safe)
