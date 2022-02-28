import 'twin.macro'

/** @jsxImportSource @emotion/react */
import { ArrowDown } from 'phosphor-react'
import { Button } from '../shared/Button'
import { CenteredModal } from '../shared/CenteredModal'
import { CollateralCard } from '../shared/CollateralCard'
import { ContentContainer } from '../shared/ContentContainer'
import { ReactComponent as CurrEth } from '../assets/currencyEthereum.svg'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { InputField } from '../shared/InputField'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { SliderBar } from '../shared/SliderBar'
import { TableCell } from '../shared/table/cells'
import { TabsSwitch } from '../shared/TabsSwitch'
import { Txt } from '../shared/Txt'
import tw from 'twin.macro'
import { useSearch } from '../shared/hooks/useSearch'
import { useState } from 'react'
//@ts-ignore
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { BasicChart } from '../shared/BasicChart'

const data = [
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24991, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcd99e0f',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: -13422.4,
      percentageValue: -68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 131.422, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'Last one',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: {
      currencyValue: 13422.4,
      percentageValue: 68.342,
      format: 'en-US',
    },
    trend: 'abcdef',
  },
]

const initialSearchParams: Partial<ISearchParams> = {
  orderField: 'name',
  order: 'ASC',
  term: '',
}
export const DashboardPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(1)
  // TODO REPLACE ANY WHEN THE REAL TYPE IS CREATED
  const [activeRow, setActiveRow] = useState<any>()

  const [inputValue, setInputValue] = useState('')

  const onModalChange = (value: boolean) => {
    setModalIsOpen(value)
  }

  const onSliderChange = (value: number) => {
    setSliderValue(value)
  }

  const [searchParams, { setSearchParams, setOrder, setOrderField, setPage }] =
    useSearch(initialSearchParams)
  //@ts-ignore

  return (
    <ContentContainer>
      <BasicChart />
      {/* <TradingViewWidget
        tw=''
        symbol='NASDAQ:AAPL'
        locale='us'
        allow_symbol_change={false}
        autosize={false}
        enable_publishing={false}
        height='610'
        hideideas={true}
        hide_legend={true}
        hide_side_toolbar={true}
        hide_top_toolbar={false}
        interval='D'
        save_image={true}
        show_popup_button={false}
        style={2}
        theme='Light'
        timezone='Etc/UTC'
        toolbar_bg='#FF7300'
        widgetType='MediumWidget'
        width='800'
        withdateranges={false}
        hotlist={false}
        details={false}
        range={['1d', '1m']}
      /> */}
      <InputField
        label='Principal'
        value={inputValue}
        onChange={(value) => setInputValue(() => value)}
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
              css={[tw`h-8 bg-primary-400 dark:bg-primary-300`]}
              text='USDC'
              leftIcon={CurrEth}
              rightIcon={ArrowDown}
            />
            <Txt.InputText tw='text-font-100'>%</Txt.InputText>
          </>
        }
      />
      <span id='chartid'></span>
      <CustomTable
        loading={false}
        maxPage={data.length / searchParams.size}
        currentPage={searchParams.page}
        setPage={setPage}
        pageSize={searchParams.size}
        data={data}
        renderExpanded={<PositionDetailsCard />}
        activeRow={activeRow}
        onActiveRowChange={(row) => {
          if (activeRow == row) {
            setActiveRow(undefined)
          } else {
            setActiveRow(row)
          }
        }}
        mobileColumns={[
          {
            Header: 'Trend',
            accessor: 'trend',
            cell: (l) => <TableCell.Text value={l.trend} />,
          },
          {
            Header: 'Percentage',
            accessor: 'position',
            cell: (l) => (
              <TableCell.Percentage
                value={l.position.value}
                format={l.position.format}
              />
            ),
          },
        ]}
        columns={[
          {
            Header: 'Trend',
            accessor: 'trend',

            cell: (l) => <TableCell.Text value={l.trend} />,
          },
          {
            Header: 'Percentage',
            accessor: 'position',

            cell: (l) => (
              <TableCell.Percentage
                value={l.position.value}
                format={l.position.format}
              />
            ),
          },
          {
            Header: 'Profit',
            accessor: 'profit',
            cell: (l) => (
              <TableCell.Profit
                currencyValue={l.profit.currencyValue}
                percentageValue={l.profit.percentageValue}
                format={l.profit.format}
              />
            ),
          },
          {
            Header: 'Currency',
            accessor: 'name',
            align: 'right',
            cell: (l) => (
              <TableCell.Currency value={l.name.value} format={l.name.format} />
            ),
          },
        ]}
      />
      {/* <SliderBar min={500} max={1500} /> */}
      <SliderBar
        value={sliderValue}
        onChange={onSliderChange}
        min={1}
        max={5}
        marks={{
          1: <Txt.CaptionMedium>1x</Txt.CaptionMedium>,
          2: <Txt.CaptionMedium>2x</Txt.CaptionMedium>,
          3: <Txt.CaptionMedium>3x</Txt.CaptionMedium>,
          4: <Txt.CaptionMedium>4x</Txt.CaptionMedium>,
          5: <Txt.CaptionMedium>5x</Txt.CaptionMedium>,
        }}
      />
      <PositionDetailsCard />
      <TabsSwitch
        items={[
          {
            title: 'tab 1',
            content: <Txt.Body2Regular>content from tab 1</Txt.Body2Regular>,
          },
          {
            title: 'tab 2',
            content: <Txt.Body2Regular>content from tab 2</Txt.Body2Regular>,
          },
        ]}
      />
      <Button
        text='Toggle modal'
        onClick={() => setModalIsOpen(!modalIsOpen)}
      />
      <CenteredModal isOpen={modalIsOpen} onChange={onModalChange}>
        <div tw='w-full'>
          <Txt.Body2Regular>I&apos;m text</Txt.Body2Regular>
          <Txt.Body2Regular>I&apos;m text</Txt.Body2Regular>
          <Txt.Body2Regular>I&apos;m text</Txt.Body2Regular>
          <Txt.Body2Regular>I&apos;m text</Txt.Body2Regular>
          <Txt.Body2Regular>I&apos;m text</Txt.Body2Regular>
          <Txt.Body2Regular>I&apos;m text</Txt.Body2Regular>
        </div>
      </CenteredModal>
      <CollateralCard />
    </ContentContainer>
  )
}
