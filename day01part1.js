const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")
let nums1 = []
let nums2 = []

for (let line of data.split("\r\n")) {
    let nums = line.split(" ")
    nums1.push(nums[0])
    nums2.push(nums[3])
}

nums1.sort((a, b) => a - b)
nums2.sort((a, b) => a - b)

let res = 0

for (let i in nums1) {
    res += Math.abs(nums1[i] - nums2[i])
}

console.log(res)
