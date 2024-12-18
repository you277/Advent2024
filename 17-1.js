// doesnt work

const fs = require("fs")

const fileData = fs.readFileSync("input", "utf-8")

let lines = fileData.split("\r\n")

let registers = {
    A: parseInt(lines[0].split(": ")[1]),
    B: parseInt(lines[1].split(": ")[1]),
    C: parseInt(lines[2].split(": ")[1]),
}

const operandRegisterMap = {
    4: "A",
    5: "B",
    6: "C"
}

let program = lines[4].split(": ")[1].split(",").map(n => parseInt(n))
let output = []

for (let i = 0; i < program.length; i += 2) {
    const opcode = program[i]
    const operand = program[i + 1]
    let combo
    if (operand <= 3) {
        combo = operand
    } else {
        if (operand == 7) {
            throw new Error("die")
        }
        combo = registers[operandRegisterMap[operand]]
    }
    console.log(opcode, operand, combo, registers)
    switch (opcode) {
        case 0: {
            registers.A = Math.floor(registers.A/(combo**2))
            break
        }
        case 1: {
            registers.B = registers.B^operand
            break
        }
        case 2: {
            registers.B = combo % 8
            break
        }
        case 3: {
            if (registers.A != 0) {
                i = operand - 2
            }
            break
        }
        case 4: {
            registers.B = registers.B^registers.C
            break
        }
        case 5: {
            output.push(combo % 8)
            break
        }
        case 6: {
            registers.B = Math.floor(registers.A/(combo**2))
            break
        }
        case 7: {
            registers.C = Math.floor(registers.A/(combo**2))
            break
        }
    }
}

console.log(output.join(","))
