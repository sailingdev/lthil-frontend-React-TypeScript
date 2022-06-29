import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { ISearchParams } from '../../types'
import { isMobile } from '../../utils'

type DispatchSearchParams<K extends ISearchParams> = {
  setPage: Dispatch<SetStateAction<K['page']>>
  setOrderField: Dispatch<SetStateAction<K['orderField']>>
  setOrder: Dispatch<SetStateAction<K['order']>>
  setTerm: Dispatch<SetStateAction<K['term']>>
  setSearchParams: Dispatch<SetStateAction<Partial<K>>>
}
export const useSearch = (
  initial?: Partial<ISearchParams>,
): [ISearchParams, DispatchSearchParams<ISearchParams>] => {
  const [page, setPage] = useState(initial?.page ?? 1)
  const [orderField, setOrderField] = useState(
    // @ts-ignore
    initial?.orderField ?? 'createdAt',
  )
  const [order, setOrder] = useState<'ASC' | 'DESC'>(initial?.order ?? 'ASC')
  const [term, setTerm] = useState<string>(initial?.term ?? '')

  return [
    {
      order,
      orderField,
      page,
      size: initial?.size ?? isMobile ? 5 : 5,
      term,
    },
    {
      // @ts-ignore
      setSearchParams: ({ term, page, order, orderField }) => {
        setPage(page ?? 1)
        setOrder(order ?? 'ASC')
        setOrderField(orderField ?? 'createdAt')
        setTerm(term ?? '')
      },
      setPage,
      setOrderField: useCallback(
        (value) => {
          setOrderField(value)
          setOrder(
            value === orderField ? (order === 'DESC' ? 'ASC' : 'DESC') : order,
          )
          setPage(1)
        },
        [setOrder, setPage, setOrderField, order, orderField],
      ),
      setOrder: useCallback(
        (value) => {
          setOrder(value)
          setPage(1)
        },
        [setOrder, setPage],
      ),
      setTerm: useCallback(
        (value) => {
          setTerm(value)
          setPage(1)
        },
        [setTerm, setPage],
      ),
    },
  ]
}
