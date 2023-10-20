import pick from './pick'

describe('app/utils/pick', () => {
  it('should cherry pick properties from an object', () => {
    const object = {
      foo: 'foo',
      bar: 'bar',
      buzz: 'buzz',
    }

    const expected = {
      foo: 'foo',
      bar: 'bar',
    }

    const result = pick(object, ['foo', 'bar'])

    expect(result).toEqual(expected)
    expect(result.buzz).toBe(undefined)
  })
})
