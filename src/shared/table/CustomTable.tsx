import {
  Column,
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import { ReactNode, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { CustomTablePagination } from './CustomTablePagination'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isMobile } from '../../utils'
import tw from 'twin.macro'
import { Txt } from '../Txt'
import { isDesktop } from '../../utils'

const tableContainerStyle = css`
  .table {
    ${tw``}
    tr {
      ${tw`bg-primary-100 border-b-2 border-primary-300`}
    }

    /* tr:hover > td {
      ${tw`bg-primary-100`}
    } */
    tr:first-of-type {
      ${tw`pt-3`}
    }
    tr:last-of-type {
      ${tw`pb-3`}
    }
    tr > th:first-of-type {
      ${tw`rounded-tl-xl ml-6`}
    }
    tr > th:last-of-type {
      ${tw`rounded-tr-xl mr-6`}
    }
    tr:not(:last-child) > td:first-of-type {
      ${tw``}
    }
    tr:not(:last-child) > td:last-of-type {
      ${tw``}
    }
    thead {
      ${tw``}
    }

    tr:last-of-type {
      ${tw`border-b-0`}
    }

    tbody > tr:last-of-type {
      ${tw`rounded-bl-xl rounded-br-xl`}/*This is last row */
    }
    th {
      ${tw``}/* This is where the top row border is */
    }
    /* TODO THIS IS CAUSING WEIRD BORDER BEHAVIOUR BUT WE NEED IT */
    td {
      ${tw`self-center`}
    }
    td:first-of-type {
      ${tw`ml-6`}
    }
    td:last-of-type {
      ${tw`mr-6`}
    }
  }
`

const tdSkeletonStyle = css`
  ${tw`px-4 py-3 text-left font-normal`}
`

const thStyle = [
  css`
    ${tw`bg-primary-100 font-sans font-semibold text-primary-400`}
    ${tw`px-6 py-4`}
  `,
]

export type ICustomColumnProps<T extends object> = Omit<Column<T>, 'Cell'> & {
  cell(data: T): ReactNode
  accessor: keyof T
}

interface ICustomTableProps<T extends object> {
  data: T[]
  maxPage: number
  currentPage: number
  setPage(value: number): void
  columns: ICustomColumnProps<T>[]
  mobileColumns?: ICustomColumnProps<T>[]
  pageSize: number
  totalCount: number
  onRowClick?: (data: T, index?: number) => void
  loading: boolean
}
// TODO TABLE EMPTY STATE

export const CustomTable = <T extends object>(props: ICustomTableProps<T>) => {
  const {
    columns,
    mobileColumns,
    data,
    currentPage,
    setPage,

    pageSize,
    maxPage,
    totalCount,
    loading,
    onRowClick,
  } = props

  const table = useTable(
    {
      columns: (isMobile ? mobileColumns ?? columns : columns) as Column[],
      data,
      initialState: {
        pageIndex: currentPage - 1,
        pageSize,
      },
      manualPagination: true,
      pageCount: maxPage,
      manualSortBy: true,
      disableMultiSort: true,
    },
    useSortBy,
    useFlexLayout,
    usePagination,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
  } = table
  useEffect(() => {
    gotoPage(currentPage - 1)
  }, [currentPage])

  return (
    <div>
      <div tw='overflow-x-auto' css={tableContainerStyle}>
        <table {...getTableProps()} css={tw`w-full`} className='table'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} tw='rounded-t-xl'>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className='group'
                      css={thStyle}
                    >
                      <div tw='flex items-center justify-between'>
                        {isDesktop ? (
                          <Txt.Body2Regular>
                            {column.render('Header')}
                          </Txt.Body2Regular>
                        ) : (
                          <Txt.Body1Regular>
                            {column.render('Header')}
                          </Txt.Body1Regular>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {loading ? (
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    css={css`
                      ${tw`cursor-pointer`}
                    `}
                  >
                    {row.cells.map((cell) => {
                      /* eslint-disable no-debugger */
                      return (
                        <td {...cell.getCellProps()} css={tdSkeletonStyle}>
                          <SkeletonTheme
                            baseColor='#f2f4f7'
                            highlightColor='#E5E9EE'
                          >
                            <Skeleton
                              count={1}
                              height={33}
                              inline={true}
                              borderRadius={0}
                              duration={1}
                              style={{}}
                            />
                          </SkeletonTheme>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          ) : (
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row)
                return (
                  <tr
                    {...row.getRowProps()}
                    css={css`
                      ${tw`cursor-pointer`}
                    `}
                    onClick={() => {
                      onRowClick && onRowClick(row.original as any, row.index)
                    }}
                    // @ts-ignore
                  >
                    {row.cells.map((cell) => {
                      /* eslint-disable no-debugger */
                      return (
                        <td {...cell.getCellProps()} css={tw`px-6 py-4`}>
                          {/* @ts-ignore */}
                          {cell.column.cell(cell.row.original)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      {maxPage > 1 && (
        <CustomTablePagination
          totalOnPage={data.length}
          totalCount={totalCount}
          pageSize={pageSize}
          maxPage={table.pageCount}
          currentPage={currentPage}
          setPage={setPage}
          canPreviousPage={table.canPreviousPage}
          canNextPage={table.canNextPage}
        />
      )}
    </div>
  )
}
