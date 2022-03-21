/** @jsxImportSource @emotion/react */
import 'twin.macro'
import tw from 'twin.macro'

import { ArrowDown, FadersHorizontal } from 'phosphor-react'

import { BasicChart } from '../shared/charts/BasicChart'
import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
import { ReactComponent as CurrEth } from '../assets/images/currencyEthereum.svg'
import { InputField } from '../shared/InputField'
import { RadioGroup } from '../shared/RadioGroup'
import { SliderBar } from '../shared/SliderBar'
import { TabButton } from '../shared/TabButton'
import { TabsSwitch } from '../shared/TabsSwitch'
import { TradingChart } from '../shared/charts/TradingChart'
import { Txt } from '../shared/Txt'
import { useState } from 'react'

import { useTransaction, useAddTransaction } from '../state/hooks'
import { useApprovalAction } from '../shared/hooks/useApprovalAction'
import { IBaseProps, TransactionType } from '../types'
import { etherGlobal } from '../api/ether'

import { addresses } from '../assets/addresses.json'

export const MarginTradingPage = () => {
  const addTx = useAddTransaction()

  const [activeChart, setActiveChart] = useState<'basic' | 'trading'>('basic')
  const [positionType, setPositionType] = useState<'short' | 'long'>('long')
  const [spentToken, setSpentToken] = useState<any>(
    '0x52C9CC325f372eF9891eBf8F317ec3b861feC817',
  )
  const [obtainedToken, setObtainedToken] = useState<any>(
    '0x2eEb75C48f56dA757f626C09A95487639a46e517',
  )
  const [sliderValue, setSliderValue] = useState<number>(1)
  const [margin, setMargin] = useState<any>(2)
  const [slippage, setSlippage] = useState<any>('')
  const [deadline, setDeadline] = useState<any>(20)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<any>(false)
  const [activeTab, setActiveTab] = useState(0)

  const [openPositionHash, setOpenPositionHash] = useState<string | undefined>(
    undefined,
  )
  const openPositionTx = useTransaction(openPositionHash)

  const [positionApproval, openPosition] = useApprovalAction({
    approvalMeta: {
      token: spentToken,
      destination: addresses.MarginTradingStrategy,
      amount: 5, // TODO: What about this?
    },
    onApproval: async () => {
      const timestampSeconds = Math.floor(Date.now() / 1000)
      const positionData = {
        spentToken: spentToken, // 0x52C9CC325f372eF9891eBf8F317ec3b861feC817
        obtainedToken: obtainedToken, // 0x2eEb75C48f56dA757f626C09A95487639a46e517
        collateral: margin, // 2
        collateralIsSpentToken: positionType === 'long' ? true : false, // long
        minObtained: '0x00',
        maxSpent: '0xff',
        deadline: (timestampSeconds + 60 * deadline).toString(), // 20min from now
      }
      //@ts-ignore
      const position = await etherGlobal.marginTradingOpenPosition({})
      addTx(TransactionType.DEPOSIT, position.hash, positionData)
      setOpenPositionHash(position.hash)
    },
  })

  return (
    <ContentContainer>
      <div tw='flex flex-col w-full items-center'>
        <div tw='w-full tablet:w-9/12 desktop:w-10/12 flex flex-col items-center'>
          <Txt.Heading1 tw='mb-12'>ETH/ETH</Txt.Heading1>
          <div tw='w-full flex flex-col desktop:flex-row gap-6'>
            <div tw='flex flex-col gap-3 flex-grow'>
              <div tw='flex flex-col justify-between items-center rounded-xl p-5 bg-primary-100 gap-7'>
                <TabsSwitch
                  activeIndex={activeTab}
                  onChange={(value) => setActiveTab(value)}
                  items={[
                    {
                      title: 'Long',
                      content: '',
                    },
                    {
                      title: 'Short',
                      content: '',
                    },
                  ]}
                />
                <InputField
                  label='Token 1'
                  value={spentToken}
                  onChange={(value) => setSpentToken(value)}
                  placeholder='0'
                  renderRight={
                    <>
                      <button
                        css={[
                          tw`border-primary-400 dark:border-primary-300 rounded-md border-2 h-8 px-2`,
                        ]}
                      >
                        <Txt.Body2Regular>Max</Txt.Body2Regular>
                      </button>
                      <Button
                        css={[
                          tw`h-8 bg-primary-400 dark:bg-primary-300 h-6 tablet:h-7 desktop:h-8`,
                        ]}
                        text='USDC'
                        leftIcon={CurrEth}
                        rightIcon={ArrowDown}
                      />
                    </>
                  }
                />
                <ArrowDown size={28} tw='self-center text-font-200' />
                <InputField
                  label='Token 2'
                  placeholder='0'
                  value={obtainedToken}
                  onChange={(value) => setObtainedToken(value)}
                  renderRight={
                    <>
                      <button
                        css={[
                          tw`border-primary-400 dark:border-primary-300 rounded-md border-2 h-8 px-2`,
                        ]}
                      >
                        <Txt.Body2Regular>Max</Txt.Body2Regular>
                      </button>
                      <Button
                        css={[
                          tw`h-8 bg-primary-400 dark:bg-primary-300 h-6 tablet:h-7 desktop:h-8`,
                        ]}
                        text='USDC'
                        leftIcon={CurrEth}
                        rightIcon={ArrowDown}
                      />
                    </>
                  }
                />
                <SliderBar
                  label='Leverage'
                  tooltip
                  min={1}
                  max={5}
                  value={sliderValue}
                  onChange={(value) => setSliderValue(value)}
                  marks={{
                    1: '1x',
                    2: '2x',
                    3: '3x',
                    4: '4x',
                    5: '5x',
                  }}
                />
                <InputField
                  label='Margin'
                  placeholder='0'
                  value={margin}
                  onChange={(value) => setMargin(value)}
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
                              value: 'BUY',
                            },
                            {
                              label: 'Sell',
                              value: 'Sell',
                            },
                          ]}
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
                <Button text='Open position' full action bold />
              </div>
            </div>
            <div tw='w-full desktop:w-8/12 flex flex-col justify-between items-center rounded-xl p-5 desktop:p-10 bg-primary-100'>
              <div tw='w-full flex flex-row justify-between pb-5 '>
                <Txt.Heading2>ETH/USDC</Txt.Heading2>
                <div tw='hidden desktop:flex flex-row items-center gap-1'>
                  <Txt.Body2Regular tw='mr-4'>View:</Txt.Body2Regular>
                  <TabButton
                    text='Basic'
                    active={activeChart === 'basic'}
                    onClick={() => setActiveChart('basic')}
                  />
                  <TabButton
                    text='Trading'
                    active={activeChart === 'trading'}
                    onClick={() => setActiveChart('trading')}
                  />
                </div>
              </div>
              <div tw='w-full h-full  flex flex-col'>
                {activeChart === 'basic' ? <BasicChart /> : <TradingChart />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  )
}
