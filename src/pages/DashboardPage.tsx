import 'twin.macro'

import { ContentContainer } from '../shared/ContentContainer'
import { CustomTable } from '../shared/table/CustomTable'
import { ISearchParams } from '../types'
import { TableCell } from '../shared/table/cells'
import { useSearch } from '../shared/hooks/useSearch'

const data = [
  {
    name: 'ETH',
    position: 'ABCDEF',
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: 'ETH2',
    position: 'ABCkjDEF1',
    profit: 29384239,
    trend: 'abcd99e0f',
  },
  {
    name: 'ETyyH',
    position: 'ABkjCDEF',
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: 'E99TH',
    position: 'ABkjCDEF',
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: 'ET0H',
    position: 'ABkjCDEF',
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: 'ET6H',
    position: 'ABCDkjEF',
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: 'ET8H',
    position: 'ABCDEF',
    profit: 293842398,
    trend: 'abcdef',
  },
  {
    name: 'ET0H',
    position: 'ABC87DEF',
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
            Header: 'Token pair',
            accessor: 'name',
            cell: (l) => <TableCell.Text value={l.name} />,
          },
          {
            Header: 'Position',
            accessor: 'position',
            cell: (l) => <TableCell.Text value={l.name} />,
          },
        ]}
        columns={[
          {
            Header: 'Token pair',
            accessor: 'name',
            cell: (l) => <TableCell.Text value={l.name} />,
          },
          {
            Header: 'Position',
            accessor: 'position',
            cell: (l) => <TableCell.Text value={l.name} />,
          },
          {
            Header: 'Profit',
            accessor: 'profit',
            cell: (l) => <TableCell.Text value={l.name} />,
          },
          {
            Header: 'Trend',
            accessor: 'trend',
            cell: (l) => <TableCell.Text value={l.name} />,
          },
        ]}
      />
    </ContentContainer>
  )
}
