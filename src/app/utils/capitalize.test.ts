import capitalize from './capitalize'

describe('app/utils/capitalize', () => {
  it('should capitalize a word', () => {
    const result = capitalize('foo')
    expect(result).toEqual('Foo')
  })
})
