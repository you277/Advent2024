// this took a whole minute or so to run.,,..,

const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let blocks = []

for (let i = 0; i < fileData.length; i++) {
    let n = parseInt(fileData.charAt(i))
    for (let v = 0; v < n; v++) {
        blocks.push(i % 2 === 0 ? i/2 : ".")
    }
}

function getLeftMostBlockOfLength(length) {
    for (let i in blocks) {
        i = parseInt(i)
        let no = false
        for (let v = 0; v < length; v++) {
            v = parseInt(v)
            if (blocks[i + v] != ".") {
                no = true
                break
            }
        }
        if (!no) return i
    }
    return -1
}

for (let i = Math.floor(fileData.length/2); i >= 0; i--) {
    let amount = parseInt(fileData.charAt(i*2))
    let index = getLeftMostBlockOfLength(amount)
    if (index != -1 && blocks.indexOf(i) > index) {
        let origIndex = blocks.indexOf(i)
        let dots = ".".repeat(amount).split("")
        let fileBlocks = blocks.splice(origIndex, amount, ...dots)
        blocks.splice(index, amount, ...fileBlocks)
    }
}

// while (blocks.indexOf(".") != -1) {
//     let n = blocks.pop()
//     if (n != ".") {
//         blocks.splice(blocks.indexOf("."), 1, n)
//     }
// }

let result = 0

for (let i in blocks) {
    if (typeof blocks[i] == "number") {
        result += i*blocks[i]
    }
}

console.log(result)
