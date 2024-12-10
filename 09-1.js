const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let blocks = []

for (let i = 0; i < fileData.length; i++) {
    let n = parseInt(fileData.charAt(i))
    for (let v = 0; v < n; v++) {
        blocks.push(i % 2 === 0 ? i/2 : ".")
    }
}

while (blocks.indexOf(".") != -1) {
    let n = blocks.pop()
    if (n != ".") {
        blocks.splice(blocks.indexOf("."), 1, n)
    }
}

let result = 0

for (let i in blocks) {
    result += i*blocks[i]
}

console.log(result)
