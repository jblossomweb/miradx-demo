import { useState } from 'react'
import postRandomHttpStatus, {
  type PostRandomHttpStatusResponse,
} from 'app/services/postRandomHttpStatus'
import type FetchState from 'app/types/FetchState'
import type { Values } from '../types/CreateNewAccountState'

const DEFAULT_ERROR = 'Something went wrong'

export type PostState = FetchState<PostRandomHttpStatusResponse>

const usePostNewAccount = (submitDelay = 0) => {
  const [loading, setLoading] = useState<PostState['loading']>(false)
  const [error, setError] = useState<PostState['error']>()
  const [success, setSuccess] = useState<PostState['success']>(false)
  const [result, setResult] = useState<PostState['result']>()

  const postState: PostState = { loading, error, success, result }

  const postNewAccount = (values: Values): void => {
    setLoading(true)
    setError(undefined)
    setSuccess(false)
    setResult(undefined)

    setTimeout(() => {
      /*
       * NOTE: this is a sample dummy API
       * in real life, we'd want to encrypt the password
       */
      postRandomHttpStatus(values)
        .then((result) => {
          setLoading(false)

          if (result.code < 300) {
            setSuccess(true)
            setResult(result)
          } else {
            setSuccess(false)
            setError(new Error(result.description || DEFAULT_ERROR))
          }
        })
        .catch((reason) => {
          setLoading(false)
          setError(reason || new Error(DEFAULT_ERROR))
          setSuccess(false)
          setResult(undefined)
        })
    }, submitDelay)
  }

  return [postState, postNewAccount] as [PostState, typeof postNewAccount]
}

export default usePostNewAccount
