import hasSymbols, { SYMBOLS } from './hasSymbols'

describe('app/utils/hasSymbols', () => {
  it('should return true for a string that has symbols', () => {
    expect(hasSymbols('abc%')).toBe(true)
  })

  SYMBOLS.split('').forEach((symbol) => {
    it(`should return true for a string that has a '${symbol}' symbol`, () => {
      expect(hasSymbols(`abc${symbol}`)).toBe(true)
    })
  })

  it('should return false for a string that has no symbols', () => {
    expect(hasSymbols('abc')).toBe(false)
  })
})
