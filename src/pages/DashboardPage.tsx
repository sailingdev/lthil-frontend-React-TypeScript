import 'twin.macro'
import { useRef } from 'react'

import { Button } from '../shared/Button'
import { CenteredModal } from '../shared/CenteredModal'
import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { InputField } from '../shared/InputField'
import { PositionDetailsCard } from '../shared/PositionDetailsCard'
import { SliderBar } from '../shared/Slider'
import { TableCell } from '../shared/table/cells'
import { TabsSwitch } from '../shared/TabsSwitch'
import { Txt } from '../shared/Txt'
import { useSearch } from '../shared/hooks/useSearch'
import { useState } from 'react'

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
  const [inputValue, setInputValue] = useState('')

  const onModalChange = (value: boolean) => {
    setModalIsOpen(value)
  }

  const onSliderChange = (value: number) => {
    setSliderValue(value)
  }

  const [searchParams, { setSearchParams, setOrder, setOrderField, setPage }] =
    useSearch(initialSearchParams)

  return (
    <ContentContainer>
      <InputField
        label='Principal'
        value={inputValue}
        onChange={(value) => setInputValue(() => value)}
        symbol='%'
        button
        secondaryButton
      />
      <CustomTable
        loading={false}
        maxPage={data.length / searchParams.size}
        currentPage={searchParams.page}
        setPage={setPage}
        pageSize={searchParams.size}
        data={data}
        mobileColumns={[
          {
            Header: 'Trend',
            accessor: 'trend',
            cell: (l) => <TableCell.Text value={l.trend} />,
          },
          {
            Header: 'Percentagkaskahsakhse',
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
    </ContentContainer>
  )
}
