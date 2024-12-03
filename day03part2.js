const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

let canMul = true
let result = 0

for (let params of data.matchAll(/([\w']+)\(((\d+),(\d+))?\)/g)) {
    let instruction = params[1]
    if (/do$/g.test(instruction)) canMul = true
    else if (/don't$/g.test(instruction)) canMul = false
    else if (/mul$/g.test(instruction) && canMul) {
        result += parseInt(params[3])*parseInt(params[4])
    }
}

console.log(result)
