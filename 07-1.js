const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let result = 0

let operators = [
    (a, b) => a * b,
    (a, b) => a + b
]

// function loopThruOps(value, nums, prevNum, amtOps) {
//     if (amtOps === 0) return
//     for (let i = 0; i < 2; i++) {
//         let newNum = operators[i](prevNum,)
//         if (loopThruOps(value, nums, prevNum, amtOps - 1)) {

//         }
//     }
// }

for (let line of fileData.split("\r\n")) {
    let fields = line.split(": ")
    let value = parseInt(fields[0])
    let nums = fields[1].split(" ").map(n => parseInt(n))
    // let bin = nums.length.toString(2)
    let amtOfOperators = nums.length - 1
    console.log(amtOfOperators)
    for (let i in Array(1).fill(nums.length - 1)) {
        let bin = i.toString(2)
        bin = bin.padStart(amtOfOperators - bin.length, "0")
        console.log(amtOfOperators, amtOfOperators^2, i, bin)
    }
    // for (let i = 0; i < amtOfOperators^2; i++) {
    //     let bin = i.toString(2)
    //     bin = bin.padStart(amtOfOperators - bin.length, "0")
    //     console.log(amtOfOperators, amtOfOperators^2, i, bin)
    // }
    // for (let i = 0; i < 2^amtOfOperators; i++) {
    //     let bin = i.toString(2)
    //     console.log(bin)
    //     let opResult = nums[0]
    //     let wow = []
    //     for (let v = 0; v < bin.length; v++) {
    //         let char = bin.charAt(bin.length - amtOfOperators + v) || "0"
    //         wow.push(char === "0" ? "*" : "+")
    //         opResult = operators[parseInt(char)](opResult, nums[v + 1])
    //     }
    //     let r = nums[0].toString()
    //     for (let i2 = 1; i2 < nums.length; i2++) {
    //         r += ` ${wow[i2 - 1]} ${nums[i2]}`
    //     }
    //     // console.log(r)
    //     if (opResult === value) {
    //         console.log(value)
    //         continue
    //     }
    // }
    // for (let i = 0; i < nums.length - 1; i++) {
    //     let char = i.toString(2).charAt(bin.length - 1 - i) || "0"
    //     opResult = operators[parseInt(char)](opResult, nums[i + 1])
    // }
}
