const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")
let nums1 = []
let nums2 = []

for (let line of data.split("\r\n")) {
    let nums = line.split(" ")
    nums1.push(nums[0])
    nums2.push(nums[3])
}

function countAppearances(n) {
    let i = 0
    i = nums2.indexOf(n, i)
    let count = 0
    while (i != -1) {
        count++
        i = nums2.indexOf(n, i + 1)
    }
    return count
}

let res = 0

for (let n of nums1) {
    res += n*countAppearances(n)
}

console.log(res)
