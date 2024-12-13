const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let grid = []
let lines = fileData.split("\n")
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
        amtTiles: 0,
        tiles: [],
    }
}

function finalizeRegion(region) {
    if (!regions.includes(region)) {
        regions.push(region)
    }
    return region
}

function hasTile(region, x, y) {
    return (region.tiles[y] && region.tiles[y][x]) != undefined
}

function pushTile(region, x, y) {
    let row = region.tiles[y]
    region.amtTiles++
    if (!row) {
        row = []
        region.tiles[y] = row
    }
    row[x] = { x: x, y: y }
}

function spread(x, y, letter, region) {
    let str = `${x},${y}`
    if (checked.includes(str)) return
    checked.push(str)
    region = region ?? nwRegion(letter)
    if (hasTile(region, x, y)) return finalizeRegion(region) 
    pushTile(region, x, y)
    for (let offset of offsets) {
        let x2 = x + offset.x
        let y2 = y + offset.y
        if (grid[y2] && grid[y2][x2]) {
            let tile = grid[y2][x2]
            if (tile.letter == letter) spread(x2, y2, letter, region)
        }
    }
    return finalizeRegion(region) 
}

for (let y in grid) {
    for (let x in grid[y]) {
        spread(parseInt(x), parseInt(y), grid[y][x].letter)
    }
}

function countSegments(nums) {
    nums.sort((a, b) => a - b)
    let segments = 1
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] > 1) segments++
    }
    return segments
}

function record(o, iden, v) {
    let list = o[iden]
    if (!list) {
        list = []
        o[iden] = list
    }
    list.push(v)
}

function countSideSeg(arr) {
    let segments = 0
    for (let iden in arr) {
        segments += countSegments(arr[iden])
    }
    return segments
}

let totalPrice = 0

// get borders for each tile, look for gaps
for (let region of regions) {
    let tiles = region.tiles
    let top = {}
    let bottom = {}
    let left = {}
    let right = {}

    for (let row of tiles) {
        if (!row) continue
        for (let tile of row) {
            if (!tile) continue
            let x = tile.x
            let y = tile.y
            // separate matches by their y position (if x) and x position (if y) to make it
            // aware of level changes
            if (!tiles[y - 1] || !tiles[y - 1][x]) record(top, y, x)
            if (!tiles[y + 1] || !tiles[y + 1][x]) record(bottom, y, x)
            if (!tiles[y][x - 1]) record(left, x, y)
            if (!tiles[y][x + 1]) record(right, x, y)
        }
    }

    let sides = countSideSeg(top) + countSideSeg(bottom) + countSideSeg(left) + countSideSeg(right)
    let price = region.amtTiles * sides
    totalPrice += price
}

console.log(totalPrice)
