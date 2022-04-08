/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { ArrowRight, FadersHorizontal } from 'phosphor-react'
import { Ether, etherGlobal } from '../api/ether'
import { FixedNumber, ethers } from 'ethers'
import { Priority, TokenDetails, TransactionType } from '../types'
import { useAddTransaction, useTransaction } from '../state/hooks'

import AdvancedPlaceholderImg from '../assets/images/advancedSectionPlaceholderImg.png'
import { BasicChart } from '../shared/charts/BasicChart'
import { Button } from '../shared/Button'
import { ChartCard } from '../shared/charts/ChartCard'
import { ContentContainer } from '../shared/ContentContainer'
import { FixedFormat } from '@ethersproject/bignumber'
import { InfoItem } from '../shared/InfoItem'
import { InputField } from '../shared/InputField'
import { RadioGroup } from '../shared/RadioGroup'
import { SliderBar } from '../shared/SliderBar'
import { TabButton } from '../shared/TabButton'
import { TabsSwitch } from '../shared/TabsSwitch'
import { TokenInputField } from './TokenInputField'
import { TradingChart } from '../shared/charts/TradingChart'
import { Txt } from '../shared/Txt'
import { addresses } from '../assets/addresses.json'
import { getCTALabelForApproval } from '../utils'
import { showErrorNotification } from '../shared/notification'
import { tokens } from '../assets/tokenlist.json'
import { useApprovalAction } from '../shared/hooks/useApprovalAction'
import { useAsync } from 'react-use'
import { useIsConnected } from '../shared/hooks/useIsConnected'
import { useState } from 'react'

export const MarginTradingPage = () => {
  const addTx = useAddTransaction()
  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')
  const [positionType, setPositionType] = useState<'short' | 'long'>('long')
  const [spentToken, setSpentToken] = useState<TokenDetails>(tokens[0])
  const [obtainedToken, setObtainedToken] = useState<TokenDetails>(tokens[1])
  const [leverage, setLeverage] = useState<number>(1)
  const [margin, setMargin] = useState<string>('2')
  const [slippage, setSlippage] = useState<any>(1)
  const [deadline, setDeadline] = useState<any>(20)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<any>(false)
  const [priority, setPriority] = useState<Priority>('buy')
  const [minObtained, setMinObtained] = useState<FixedNumber>(
    FixedNumber.from('0'),
  )
  const [maxSpent, setMaxSpent] = useState<FixedNumber>(FixedNumber.from('0'))

  const isConnected = useIsConnected()
  useAsync(async () => {
    try {
      if (isConnected && slippage && margin) {
        const [max, min] = await etherGlobal.marginTrading.computeMaxAndMin({
          margin,
          leverage,
          priority,
          positionType,
          slippage,
          deadline,
          obtainedToken: obtainedToken.address,
          spentToken: spentToken.address,
        })
        setMinObtained(min)
        setMaxSpent(max)
      }
    } catch (error) {
      console.error(error)
      showErrorNotification(`Can't compute min obtained and max spent`)
    }
  }, [
    isConnected,
    spentToken.address,
    obtainedToken.address,
    margin,
    leverage,
    priority,
    positionType,
    slippage,
  ])

  const [openPositionHash, setOpenPositionHash] = useState<string | undefined>(
    undefined,
  )
  const openPositionTx = useTransaction(openPositionHash)

  const [positionApproval, openPosition] = useApprovalAction({
    approvalMeta: {
      token: spentToken.address,
      destination: addresses.MarginTradingStrategy,
      amount: Number.MAX_SAFE_INTEGER,
    },
    onApproval: async () => {
      const positionData = {
        positionType,
        spentToken: spentToken.address,
        obtainedToken: obtainedToken.address,
        margin,
        slippage,
        leverage,
        priority,
        deadline,
      }
      const position = await etherGlobal.marginTrading.openPosition(
        positionData,
      )
      addTx(TransactionType.MTS_OPEN_POSITION, position.hash, positionData)
      setOpenPositionHash(position.hash)
    },
  })

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>Margin Trading Strategy </Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow w-full desktop:w-4/12'>
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100 gap-7'>
                <TabsSwitch
                  activeIndex={positionType}
                  onChange={(value) => setPositionType(value)}
                  items={[
                    {
                      title: 'Long',
                      value: 'long',
                    },
                    {
                      title: 'Short',
                      value: 'short',
                    },
                  ]}
                />
                <div tw='flex w-full justify-between items-center'>
                  <TokenInputField
                    token={spentToken}
                    onTokenChange={(value) => setSpentToken(value)}
                  />
                  <ArrowRight size={28} tw='text-font-200 mx-6' />
                  <TokenInputField
                    token={obtainedToken}
                    onTokenChange={(value) => setObtainedToken(value)}
                  />
                </div>
                <div tw='w-full'>
                  <InfoItem
                    label='Min. obtained'
                    value={minObtained.round(4).toString()}
                  />
                  <InfoItem
                    label='Max. spent'
                    value={maxSpent.round(4).toString()}
                  />
                </div>
                <InputField
                  label='Margin'
                  placeholder='0'
                  value={margin}
                  onChange={(value) => setMargin(value)}
                />
                <SliderBar
                  label='Leverage'
                  tooltip
                  min={1}
                  max={5}
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
                        <button
                          onClick={() =>
                            setShowAdvancedOptions(!showAdvancedOptions)
                          }
                        >
                          <Txt.Body2Regular>Close</Txt.Body2Regular>
                        </button>
                      </div>
                      {/* TODO: Placeholder */}
                      <img
                        tw='w-full my-5'
                        src={AdvancedPlaceholderImg}
                        alt='advancedSectionPlaceholder'
                      />
                      <div tw='flex flex-col w-full gap-7'>
                        <InputField
                          label='Slippage'
                          placeholder='0'
                          value={slippage}
                          onChange={(value) => setSlippage(value)}
                          renderRight={
                            <Txt.InputText tw='text-font-100'>%</Txt.InputText>
                          }
                        />
                        <RadioGroup
                          label='Priority'
                          items={[
                            {
                              label: 'Buy',
                              value: 'buy',
                            },
                            {
                              label: 'Sell',
                              value: 'sell',
                            },
                          ]}
                          activeRadio={priority}
                          onChange={(value) => setPriority(value as Priority)}
                        />
                        <InputField
                          label='Deadline'
                          placeholder='30 mins'
                          value={deadline}
                          onChange={(value) => setDeadline(value)}
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
                    `${priority.toUpperCase()} / ${positionType.toUpperCase()} TKN`,
                    positionApproval,
                  )}
                  full
                  action
                  bold
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
            <ChartCard
              firstToken={obtainedToken}
              secondToken={spentToken}
              disableTrading={false}
            />
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
