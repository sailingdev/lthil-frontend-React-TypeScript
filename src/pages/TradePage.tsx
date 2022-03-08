/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { useAccountBalance, useLatestBlock } from '../state/hooks'

import { ContentContainer } from '../shared/ContentContainer'
import { useNetwork } from '../shared/hooks/useNetwork'

export const TradePage = () => {
  const block = useLatestBlock()
  const balance = useAccountBalance()
  const network = useNetwork()
  console.log('Block', block)
  console.log('Balance', balance)
  console.log('Network', network)

  return (
    <ContentContainer>
      <div>Block: {block}</div>
      <div>Balance: {balance}</div>
      <div>Network: {network?.name}</div>
      <div>Chain Id: {network?.chainId}</div>

      {balance}
    </ContentContainer>
  )
}
