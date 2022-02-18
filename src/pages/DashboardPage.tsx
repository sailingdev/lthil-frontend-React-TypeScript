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
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: { value: 24991, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 29384239,
    trend: 'abcd99e0f',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: { value: 24, format: 'en-US' },
    position: { value: 13.1, format: 'en-US' },
    profit: 293842398,
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
        maxPage={8}
        currentPage={searchParams.page}
        setPage={setPage}
        pageSize={searchParams.size}
        data={data}
        totalCount={8}
        mobileColumns={[
          {
            Header: 'Currency',
            accessor: 'name',
            cell: (l) => (
              <TableCell.Currency value={l.name.value} format={l.name.format} />
            ),
          },
          {
            Header: 'Percentage',
            accessor: 'position',
            cell: (l) => <TableCell.Percentage value={l.position} />,
          },
        ]}
        columns={[
          {
            Header: 'Currency',
            accessor: 'name',
            cell: (l) => (
              <TableCell.Currency value={l.name.value} format={l.name.format} />
            ),
          },
          {
            Header: 'Percentage',
            accessor: 'position',
            cell: (l) => <TableCell.Percentage value={l.position} />,
          },
          {
            Header: 'Profit',
            accessor: 'profit',
            cell: (l) => <TableCell.Text value={l.trend} />,
          },
          {
            Header: 'Trend',
            accessor: 'trend',
            cell: (l) => <TableCell.Text value={l.trend} />,
          },
        ]}
      />
    </ContentContainer>
  )
}
