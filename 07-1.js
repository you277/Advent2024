const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let operators = [
    (a, b) => a * b,
    (a, b) => a + b
]

let result = 0

for (let line of fileData.split("\n")) {
    let fields = line.split(": ")
    let value = parseInt(fields[0])
    let nums = fields[1].split(" ").map(n => parseInt(n))
    let amtOfOperators = nums.length - 1

    for (let i = 0; i < 2**amtOfOperators; i++) {
        let bin = i.toString(2)
        let r = nums[0]
        for (let v = 0; v < amtOfOperators; v++) {
            let char = bin.charAt(bin.length - amtOfOperators + v) || "0"
            r = operators[parseInt(char)](r, nums[v + 1])
        }
        if (r == value) {
            result += value
            break
        }
    }
}

console.log(result)
