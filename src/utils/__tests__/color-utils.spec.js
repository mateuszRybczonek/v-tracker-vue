import { convertToRgba } from '@/utils/color-utils'

test('convertToRgba returns properly converted rgba value for alpha = 0', () => {
  const expectedResult = "rgba('123,345,567',0)"
  expect(convertToRgba("rgb('123,345,567')", 0)).toEqual(expectedResult)
})

test('convertToRgba returns properly converted rgba value for alpha = 0.5', () => {
  const expectedResult = "rgba('123,345,567',0.5)"
  expect(convertToRgba("rgb('123,345,567')", 0.5)).toEqual(expectedResult)
})

test('convertToRgba returns properly converted rgba value for alpha = 1', () => {
  const expectedResult = "rgba('123,345,567',1)"
  expect(convertToRgba("rgb('123,345,567')", 1)).toEqual(expectedResult)
})

test('convertToRgba returns false for alpha = -0.1', () => {
  const expectedResult = false
  expect(convertToRgba("rgb('123,345,567')", -0.1)).toEqual(expectedResult)
})

test('convertToRgba returns false for alpha = 1.1', () => {
  const expectedResult = false
  expect(convertToRgba("rgb('123,345,567')", 1.1)).toEqual(expectedResult)
})
