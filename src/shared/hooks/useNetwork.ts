/** @jsxImportSource @emotion/react */

import { Dispatch, SetStateAction } from 'react'

import { ISearchParams } from '../../types'
import { supportedNetworks } from '../test/connectors'
import { useWeb3React } from '@web3-react/core'

type DispatchSearchParams<K extends ISearchParams> = {
  setPage: Dispatch<SetStateAction<K['page']>>
  setOrderField: Dispatch<SetStateAction<K['orderField']>>
  setOrder: Dispatch<SetStateAction<K['order']>>
  setTerm: Dispatch<SetStateAction<K['term']>>
  setSearchParams: Dispatch<SetStateAction<Partial<K>>>
}
export const useNetwork = () => {
  const { chainId } = useWeb3React()

  return supportedNetworks.find((n) => n.chainId === chainId)
}
