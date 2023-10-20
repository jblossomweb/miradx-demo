import postRandomHttpStatus from './postRandomHttpStatus'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock

describe('app/services/postRandomHttpStatus', () => {
  beforeEach((fetch as jest.Mock).mockClear)

  it('should make a fetch', async () => {
    expect(fetch).not.toHaveBeenCalled()
    await postRandomHttpStatus({ foo: 'foo' })
    expect(fetch).toHaveBeenCalled()
  })

  it('should fetch correct url based on requested statuses', () => {
    expect(fetch).not.toHaveBeenCalled()
    postRandomHttpStatus({ foo: 'foo' }, [201, 418, 500])
    expect(fetch).toHaveBeenCalled()
    const { lastCall } = (fetch as jest.Mock).mock
    const fetchedUrl = lastCall && lastCall[0]
    expect(fetchedUrl).toEqual(`https://httpstat.us/random/201,418,500`)
  })

  it('should fetch correct url with 201 or 500 status by default', () => {
    expect(fetch).not.toHaveBeenCalled()
    postRandomHttpStatus({ foo: 'foo' })
    expect(fetch).toHaveBeenCalled()
    const { lastCall } = (fetch as jest.Mock).mock
    const fetchedUrl = lastCall && lastCall[0]
    expect(fetchedUrl).toEqual(`https://httpstat.us/random/201,500`)
  })

  it('should make a POST request', () => {
    expect(fetch).not.toHaveBeenCalled()
    postRandomHttpStatus({ foo: 'foo' })
    expect(fetch).toHaveBeenCalled()
    const { lastCall } = (fetch as jest.Mock).mock
    const options = lastCall && lastCall[1]
    expect(options?.method).toEqual('POST')
  })

  it('should send the "Accept: application/json" request header', () => {
    expect(fetch).not.toHaveBeenCalled()
    postRandomHttpStatus({ foo: 'foo' })
    expect(fetch).toHaveBeenCalled()
    const { lastCall } = (fetch as jest.Mock).mock
    const options = lastCall && lastCall[1]
    const reqHeaders = new Headers(options?.headers)
    expect(reqHeaders?.get('Accept')).toEqual('application/json')
  })

  it('should send data as JSON in the request body', () => {
    expect(fetch).not.toHaveBeenCalled()
    postRandomHttpStatus({ foo: 'foo' })
    expect(fetch).toHaveBeenCalled()
    const { lastCall } = (fetch as jest.Mock).mock
    const options = lastCall && lastCall[1]
    expect(options?.body).toEqual('{"foo":"foo"}')
  })
})
