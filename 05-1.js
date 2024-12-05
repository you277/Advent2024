const fs = require("fs")

const data = fs.readFileSync("input", "utf-8")

const sections = data.split("\r\n\r\n")

const orderRules = sections[0]
const updatePages = sections[1].split("\r\n").map(strList => strList.split(",").map(n => parseInt(n)))

function arrEq(a, b) {
    for (let i in a) {
        if (a[i] !== b[i]) return false
    }
    return true
}

let result = 0

for (let pageList of updatePages) {
    let origList = [...pageList]
    pageList.sort((a, b) => {
        if (orderRules.includes(`${a}|${b}`)) return -1
        return 1
    })
    if (arrEq(origList, pageList)) {
        result += pageList[Math.floor(pageList.length/2)]
    }
}

console.log(result)
