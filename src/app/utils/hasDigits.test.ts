import hasDigits from './hasDigits'

describe('app/utils/hasDigits', () => {
  it('should return true for a string that has digits', () => {
    expect(hasDigits('abc123')).toBe(true)
  })

  it('should return false for a string that has no digits', () => {
    expect(hasDigits('abc')).toBe(false)
  })
})
