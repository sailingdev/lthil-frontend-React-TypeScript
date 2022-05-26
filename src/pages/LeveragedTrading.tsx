import 'twin.macro'

import {
  Approval,
  TokenDetails,
  TransactionType,
  YearnOpenPositionMeta,
} from '../types'
import { useAddTransaction, useTransaction } from '../state/hooks'
import { useEffect, useState } from 'react'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
import { FadersHorizontal } from 'phosphor-react'
/** @jsxImportSource @emotion/react */
import { FixedNumber } from 'ethers'
import { InfoItem } from '../shared/InfoItem'
import { InputField } from '../shared/InputField'
import { ReactComponent as LidoLogo } from '../assets/images/lido.svg'
import { SliderBar } from '../shared/SliderBar'
import { TabsSwitch } from '../shared/TabsSwitch'
import { TokenInputField } from './TokenInputField'
import { Txt } from '../shared/Txt'
import { ReactComponent as YearnLogo } from '../assets/images/yearn.svg'
import { addresses } from '@ithil-protocol/deployed/latest/addresses.json'
import { etherGlobal } from '../api/ether'
import { getCTALabelForApproval } from '../utils'
import { showErrorNotification } from '../shared/notification'
import { tokens } from '@ithil-protocol/deployed/latest/tokenlist.json'
import { useApprovalAction } from '../shared/hooks/useApprovalAction'
import { useAsync } from 'react-use'
import { useIsConnected } from '../shared/hooks/useIsConnected'

export const LeveragedTradingPage = () => {
  const addTx = useAddTransaction<YearnOpenPositionMeta>()
  const [positionProtocol, setPositionProtocol] = useState<'yearn' | 'lido'>(
    'yearn',
  )
  const [token, setToken] = useState<TokenDetails>(tokens[0])
  const [tokenInput, setTokenInput] = useState<string>('')
  const [availableTokens, setAvailableTokens] = useState(tokens)
  const [leverage, setLeverage] = useState<number>(1)
  const [slippage, setSlippage] = useState<any>(1)
  const [deadline, setDeadline] = useState<any>(20)
  const [maxSpent, setMaxSpent] = useState<FixedNumber>(FixedNumber.from('0'))

  const [showAdvancedOptions, setShowAdvancedOptions] = useState<any>(false)

  const [maxLeverage, setMaxLeverage] = useState<FixedNumber>(
    FixedNumber.from('5'),
  )

  const isConnected = useIsConnected()

  useEffect(() => {
    const newTokens =
      positionProtocol === 'lido'
        ? tokens.filter((f) => f.symbol === 'WETH')
        : tokens
    setAvailableTokens(newTokens)
    setToken(newTokens[0])
  }, [positionProtocol])
  useAsync(async () => {
    try {
      if (isConnected && slippage && tokenInput) {
        setMaxLeverage(
          await etherGlobal.position.getLeveragedStrategy().getMaxLeverage(),
        )
        const max = await etherGlobal.position
          .getLeveragedStrategy()
          .computeMaxSpent({
            margin: tokenInput,
            leverage,
            slippage,
            deadline,
            token: token.address,
          })
        debugger
        setMaxSpent(max)
      }
    } catch (error) {
      console.error(error)
      showErrorNotification(`Can't compute min obtained and max spent`)
    }
  }, [isConnected, tokenInput, leverage, slippage])

  const [openPositionHash, setOpenPositionHash] = useState<string | undefined>(
    undefined,
  )
  const openPositionTx = useTransaction(openPositionHash)

  const [positionApproval, openPosition] = useApprovalAction({
    approvalMeta: {
      // @ts-ignore
      token: token.address,
      destination: addresses.MarginTradingStrategy,
      amount: Number.MAX_SAFE_INTEGER,
    },
    onApproval: async () => {
      const positionData = {
        margin: tokenInput,
        slippage,
        leverage,
        token: token.address,
        deadline,
      }
      const position = await etherGlobal.position
        .getLeveragedStrategy()
        .openPosition(positionData)
      addTx(TransactionType.YEARN_OPEN_POSITION, position.hash, positionData)
      setOpenPositionHash(position.hash)
    },
  })
  const isLoading =
    positionApproval === Approval.PENDING
      ? true
      : !openPositionTx
      ? false
      : openPositionTx.status !== 'verified'
  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Leveraged staking </Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <link
              href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
              rel='stylesheet'
            />

            <div tw='flex flex-col gap-3 flex-grow w-full desktop:w-4/12'>
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100 gap-7'>
                <TabsSwitch
                  activeIndex={positionProtocol}
                  onChange={(value: any) => setPositionProtocol(value)}
                  items={[
                    {
                      title: 'YFI',
                      icon: YearnLogo,
                      value: 'yearn',
                    },
                    {
                      title: 'CRV',
                      icon: LidoLogo,
                      value: 'lido',
                    },
                  ]}
                />
                <div tw='flex w-full justify-between items-center'>
                  <TokenInputField
                    label='Margin'
                    availableTokens={availableTokens}
                    value={tokenInput}
                    setValue={setTokenInput}
                    token={token}
                    onTokenChange={(value) => setToken(value)}
                  />
                </div>
                <div tw='w-full'>
                  <InfoItem
                    tooltipText='Lorem Ipsum is simply dummy text of the printing and typesetting industry'
                    label='Max. spent'
                    value={maxSpent.round(4).toString()}
                  />
                </div>

                <SliderBar
                  label='Leverage'
                  tooltipText='Lorem Ipsum is simply dummy text of the printing and typesetting industry'
                  min={1}
                  max={Number(maxLeverage.toString())}
                  step={0.2}
                  value={leverage}
                  onChange={(value) => setLeverage(value)}
                  marks={{
                    1: '1x',
                    2: '2x',
                    3: '3x',
                    4: '4x',
                    5: '5x',
                  }}
                />
                <div tw='w-full'>
                  {showAdvancedOptions ? (
                    <>
                      <div tw='my-4 w-full flex flex-row justify-between items-center'>
                        <Txt.Heading2>Advanced options</Txt.Heading2>
                        <div>
                          <button
                            tw='my-4 w-full flex justify-center items-center gap-2'
                            onClick={() =>
                              setShowAdvancedOptions(!showAdvancedOptions)
                            }
                          >
                            <FadersHorizontal size={20} tw='text-font-100' />
                          </button>{' '}
                        </div>
                      </div>

                      <div tw='flex flex-col w-full gap-7'>
                        <InputField
                          tooltipText='Lorem Ipsum is simply dummy text of the printing and typesetting industry'
                          label='Slippage'
                          placeholder='0'
                          value={slippage}
                          onChange={(value) => setSlippage(value)}
                          renderRight={
                            <Txt.InputText tw='text-font-100'>%</Txt.InputText>
                          }
                        />
                        <InputField
                          tooltipText='Lorem Ipsum is simply dummy text of the printing and typesetting industry'
                          label='Deadline'
                          placeholder='30 mins'
                          value={deadline}
                          onChange={(value) => setDeadline(value)}
                          renderRight={
                            <Txt.InputText tw='text-font-100'>
                              min
                            </Txt.InputText>
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <button
                      tw='my-4 w-full flex justify-center items-center gap-2'
                      onClick={() =>
                        setShowAdvancedOptions(!showAdvancedOptions)
                      }
                    >
                      <FadersHorizontal size={20} tw='text-font-100' />
                      <Txt.Body2Regular tw='text-font-100'>
                        Advanced options
                      </Txt.Body2Regular>
                    </button>
                  )}
                </div>
                <Button
                  text={getCTALabelForApproval(
                    `${positionProtocol.toUpperCase()} TKN`,
                    positionApproval,
                  )}
                  full
                  action
                  bold
                  isLoading={isLoading}
                  onClick={() => openPosition()}
                />
                <Txt.CaptionMedium>
                  {!openPositionTx
                    ? ''
                    : openPositionTx.status == 'verified'
                    ? 'Transaction verified.'
                    : 'Transaction pending...'}
                </Txt.CaptionMedium>
              </div>
            </div>
            {/* <ChartCard
              firstToken={obtainedToken}
              secondToken={spentToken}
              disableTrading={false}
            /> */}
            <div tw='w-full height[500px] tablet:height[500px] desktop:height[700px] desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'></div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
