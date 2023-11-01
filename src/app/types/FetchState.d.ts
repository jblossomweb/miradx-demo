import type AnyObject from './AnyObject'

interface FetchState<ResponsePayload = AnyObject> {
  loading: boolean
  error?: Error
  success: boolean
  result?: ResponsePayload
}

export default FetchState
