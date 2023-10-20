import isEmail from './isEmail'

describe('app/utils/isEmail', () => {
  it('should return true for a valid email', () => {
    expect(isEmail('foo@bar.com')).toBe(true)
  })

  it('should return false for an invalid email', () => {
    expect(isEmail('foobar')).toBe(false)
  })
})
