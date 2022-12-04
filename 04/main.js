#!/usr/bin/env node

const puzzleStr = process.argv[2] || '';
const PART = process.env['PART'];

const puzzle = puzzleStr.split('\n').map(pairs => {
   const pairStr = pairs.split(',')
   const convertedPairs = pairStr.map(p => {
      const [start, end] = p.split('-')
      return [+start, +end]
   })

   return convertedPairs
});

if (PART === 'one') {
   const containedPairsCount = puzzle.reduce((count, pairs) => {
      if (isContained(pairs[0], pairs[1]) || isContained(pairs[1], pairs[0])) return count + 1
      return count
   }, 0)
   console.log(containedPairsCount)
}

if (PART === 'two') {
   const overlappedPairsCount = puzzle.reduce((count, pairs) => {
      if (hasOverlap(pairs[0], pairs[1]) || hasOverlap(pairs[1], pairs[0])) return count + 1
      return count
   }, 0)
   console.log(overlappedPairsCount)
}

function isContained(pair1, pair2) {
   return pair1[0] >= pair2[0] && pair1[1] <= pair2[1]
}

function hasOverlap(pair1, pair2) {
   return (pair2[0] <= pair1[0] && pair1[0] <= pair2[1]) || (pair2[0] <= pair1[1] && pair1[1] <= pair2[1])
}