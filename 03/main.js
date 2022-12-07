#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

const LowFirst = 'a'.charCodeAt(0) - 1
const HightFirst = 'A'.charCodeAt(0)

const puzzle = puzzleStr.split('\n').map(sack => {
    const midPoint = sack.length / 2
    return [sack.slice(0, midPoint), sack.slice(midPoint)]
})


if (PART == 'one') {
    const vals = puzzle.map(([first, second]) => {
        const left = new Set(first)
        for (const char of second) {
            if (left.has(char)) return char
        }
    })

    const total = vals.reduce((tot, curr) => {
        return tot + getCharNumValue(curr)
    }, 0)
    console.log(total)
}

if (PART === 'two') {
    const groups = puzzleStr.split('\n').reduce((acc, _, idx, arr) => {
        if ((idx + 1) % 3 === 0) {
            const group =  arr.slice(idx - 2, idx + 1)
            acc.push(group)
        }
        return acc
    }, [])

    const sharedVals = groups.map((group) => {
        const [first, second, third] = group
        const fUnique = new Set(first)
        const sUnique = new Set(second)
        const tUnique = new Set(third)

        for (const val of fUnique) {
            if (sUnique.has(val) && tUnique.has(val)) return getCharNumValue(val)
        }
    })
    const tot = sharedVals.reduce((tot, num) => tot + num)
    console.log(tot)
}

function getCharNumValue(char) {
    const charCode = char.charCodeAt(0)
    if (charCode > LowFirst) return charCode - LowFirst
    return charCode - HightFirst + 27
}