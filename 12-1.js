const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let grid = []
let lines = fileData.split("\r\n")
let checked = []
let offsets = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 }
]

let regions = []

for (let y in lines) {
    let row = lines[y].split("")
    for (let x in row) {
        row[x] = { letter: row[x], x: parseInt(x), y: parseInt(y) }
    }
    grid[y] = row
}

function nwRegion(letter) {
    return {
        letter: letter,
        tiles: [],
        perimeter: 0
    }
}

function finalizeRegion(region) {
    if (!regions.includes(region)) {
        regions.push(region)
    }
    return region
}

function spread(x, y, letter, region) {
    let str = `${x},${y}`
    if (checked.includes(str)) return
    checked.push(str)
    region = region ?? nwRegion(letter)
    if (region.tiles.includes(str)) return finalizeRegion(region) 
    region.tiles.push(str)
    for (let offset of offsets) {
        let x2 = x + offset.x
        let y2 = y + offset.y
        if (grid[y2] && grid[y2][x2]) {
            let tile = grid[y2][x2]
            if (tile.letter == letter) spread(x2, y2, letter, region)
            else region.perimeter++
        } else {
            region.perimeter++
        }
    }
    return finalizeRegion(region) 
}

for (let y in grid) {
    for (let x in grid[y]) {
        spread(parseInt(x), parseInt(y), grid[y][x].letter)
    }
}

let price = 0

for (let region of regions) {
    price += region.tiles.length * region.perimeter
}

console.log(regions.length)
console.log(price)
