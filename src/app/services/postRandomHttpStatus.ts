import type AnyObject from 'app/types/AnyObject'

export interface PostRandomHttpStatusResponse {
  code: number
  description: string
}

const postRandomHttpStatus = async <Data = AnyObject>(
  data: Data,
  statuses: number[] = [201, 500],
): Promise<PostRandomHttpStatusResponse> => {
  const response = await fetch(
    `https://httpstat.us/random/${statuses.join(',')}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    },
  )
  const result = await response.json()

  return result as PostRandomHttpStatusResponse
}

export default postRandomHttpStatus
