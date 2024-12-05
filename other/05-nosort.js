// not work

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

function isInOrder(arr) {
    for (let i in arr) {
        for (let v in arr) {
            let n1 = arr[i]
            let n2 = arr[v]
            if (orderRules.includes(`${n1}|${n2}`) && i >= v) {
                return false
            }
        }
    }
    return true
}

function part1() {
    for (let pageList of updatePages) {
        if (isInOrder(pageList)) {
            result += pageList[Math.floor(pageList.length/2)]
        }
    }
}

// if the amount of times theres a rule where the number is on the left side
// is half of the length of the update, then it is the middle number
function getMiddleNum(arr) {
    for (let n1 of arr) {
        let matches = 0
        for (let n2 of arr) {
            if (orderRules.includes(`${n1}|${n2}`)) matches++
        }
        if (matches == Math.floor(arr.length/2)) return n1
    }
    return 0
}

function part2() {
    for (let pageList of updatePages) {
        // console.log(pageList, isInOrder(pageList))
        if (!isInOrder(pageList)) {
            // console.log(getMiddleNum(pageList))
            result += getMiddleNum(pageList)
        }
    }
}

part1()

console.log(result)
