import 'twin.macro'

import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { TableCell } from '../shared/table/cells'
import { useSearch } from '../shared/hooks/useSearch'

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
  const [searchParams, { setSearchParams, setOrder, setOrderField, setPage }] =
    useSearch(initialSearchParams)
  return (
    <ContentContainer>
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
    </ContentContainer>
  )
}
