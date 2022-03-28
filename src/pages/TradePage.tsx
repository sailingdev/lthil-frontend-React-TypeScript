import 'twin.macro'

import {
  useAccountAddress,
  useAccountBalance,
  useFinalizeTransaction,
  useLatestBlock,
} from '../state/hooks'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
import { etherGlobal } from '../api/ether'
import { useApprovalAction } from '../shared/hooks/useApprovalAction'
import { useNetwork } from '../shared/hooks/useNetwork'

export const TradePage = () => {
  const block = useLatestBlock()
  const balance = useAccountBalance()
  const network = useNetwork()
  const address = useAccountAddress()

  const [positionApproval, openPosition] = useApprovalAction({
    approvalMeta: {
      token: '0x52C9CC325f372eF9891eBf8F317ec3b861feC817',
      destination: '0x13Ee8e4638C391D5460e2FAcC50a1ad3ee90E886',
      amount: 0.0025,
    },
    onApproval: async () => {
      const data = {
        spentToken: '0x52C9CC325f372eF9891eBf8F317ec3b861feC817',
        obtainedToken: '0x2eEb75C48f56dA757f626C09A95487639a46e517',
        collateral: '0xde0b6b3a7640000', // 1000000000000000000
        collateralIsSpentToken: false,
        minObtained: '0x00', // 0
        maxSpent: '0xff', // 255
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 min from now
      }
      console.log(data)
      //@ts-ignore
      const position = await etherGlobal.marginTradingOpenPosition(data)
      console.log(position)
    },
  })

  const finalizeTransaction = useFinalizeTransaction()

  return (
    <ContentContainer>
      <div>Block: {block}</div>
      <div>Address: {address}</div>
      <div>Balance: {balance}</div>
      <div>Network: {network?.name}</div>
      <div>Chain Id: {network?.chainId}</div>
      <Button
        text='Add dummy transaction'
        primary
        onClick={async () => {
          openPosition()
        }}
      />
      <Button
        text='Finalize transaction'
        primary
        onClick={() => {
          // @ts-ignore

          finalizeTransaction('abc', {})
        }}
      />

      {/* <button onClick={() => runCode()}>Stake 26 WETH</button>
      <button onClick={() => openposition()}>OpenPosition</button>
      <button onClick={() => getAllPositionEvents()}>
        Get all position events
      </button> */}
    </ContentContainer>
  )
}
