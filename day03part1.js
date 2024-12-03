const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

let result = 0

for (let params of data.matchAll(/mul\((\d+),(\d+)\)/g)) {
    result += parseInt(params[1])*parseInt(params[2])
}

console.log(result)
