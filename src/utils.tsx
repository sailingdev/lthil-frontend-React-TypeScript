import { UseQueryResult } from 'react-query'

export const mapErrorToCode = (e: any): number => {
  return e?.response?.status ?? 500
}

type UseQuerySearchResult<T> = Omit<UseQueryResult<T>, 'data'> & { data: T }
export type Maybe<T> = T | null

export const transformQueryResponseData = <T,>({
  data,
  ...rest
}: any): UseQuerySearchResult<T> => {
  //@ts-ignore
  const d = data ?? {}
  return {
    ...rest,
    data: {
      ...d,
      items: d.items ?? [],
      totalPages: d.totalPages ?? 0,
      count: d.count ?? 0,
      hasMore: d.hasMore ?? false,
    } as T,
  }
}

export const formatFraction = (first: number, second: number) => {
  return (
    <span>
      <sup>{first}</sup>
      <span className='fraction-divider'>&frasl;</span>
      <sub>{second}</sub>
    </span>
  )
}

export const MOBILE_BREAKPOINT = 800
export const isMobile = window.screen.width < MOBILE_BREAKPOINT

export const areObjectEqualShallow = (a: any, b: any) => {
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false
    }
  }
  for (const key in b) {
    if (!(key in a)) {
      return false
    }
  }
  return true
}

export const countDifferentValuesShallow = (a: any, b: any) => {
  let count = 0
  for (const key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      count++
    }
  }
  for (const key in b) {
    if (!(key in a)) {
      count++
    }
  }
  return count
}
