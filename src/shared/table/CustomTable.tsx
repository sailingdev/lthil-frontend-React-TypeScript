import 'twin.macro'

import {
  Column,
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import React, { ReactNode, useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { CustomTablePagination } from './CustomTablePagination'
import { Txt } from '../Txt'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { isMobile } from '../../utils'
import tw from 'twin.macro'

const tableContainerStyle = css`
  .table {
    ${tw`mb-4`}
    tr {
      ${tw`desktop:py-3`}
    }
    tr:first-of-type {
      ${tw`pt-3 rounded-t-xl`}
    }
    tr:last-of-type {
      ${tw`pb-3`}
    }
    tr > th:first-of-type {
      ${tw` ml-6`}
    }
    tr > th:last-of-type {
      ${tw` mr-6 `}
    }

    tr:last-of-type {
      ${tw`bg-primary-100`}
    }

    /* tbody > tr:nth-last-child(2) {
      ${tw`rounded-b-xl`}
    } */
    tbody > tr:last-of-type {
      ${tw`rounded-b-xl`}
    }

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
  ${tw`py-3 text-left font-normal`}
`

const thStyle = [
  css`
    ${tw`bg-primary-100 font-sans font-semibold text-primary-400`}
    ${tw`py-4`}
  `,
]

export type ICustomColumnProps<T extends object> = Omit<Column<T>, 'Cell'> & {
  cell(data: T): ReactNode
  accessor: keyof T | 'action'
  align?: 'left' | 'right' | 'center'
}

interface ICustomTableProps<T extends object> {
  data: T[]
  maxPage: number
  currentPage: number
  setPage(value: number): void
  columns: ICustomColumnProps<T>[]
  mobileColumns?: ICustomColumnProps<T>[]
  pageSize: number
  loading: boolean
  renderExpanded(row: T): React.ReactNode
  onActiveRowChange?: (row: T) => void
  activeRow?: T | undefined
  hover?: boolean | undefined
}

const TableRow = (props: any) => {
  const [expanded, setExpanded] = useState(false)
  const { row } = props
  return (
    <React.Fragment key={row.id}>
      <tr>
        <td css={[tw`h-0.5 mx-10 bg-primary-300`]}></td>
      </tr>
      <tr
        {...row.getRowProps()}
        css={[
          tw`cursor-pointer bg-primary-100`,
          props.hover && tw`hover:bg-primary-200`,
        ]}
        onClick={() => {
          setExpanded(!expanded)
        }}
      >
        {/* @ts-ignore */}
        {row.cells.map((cell) => {
          const { style, ...rest } = cell.getCellProps()
          /* eslint-disable no-debugger */
          return (
            <td
              {...rest}
              style={{
                ...style,
                // @ts-ignore
                textAlign: cell.column.align ?? 'left',
              }}
              css={tw`py-4 cursor-pointer`}
            >
              {/* @ts-ignore */}
              {cell.column.cell(cell.row.original)}
            </td>
          )
        })}
      </tr>
      <tr style={{ display: !expanded ? 'none' : undefined }}>
        <td tw='bg-primary-100' colSpan={props.columns.length}>
          {props.renderExpanded(row)}
        </td>
      </tr>
    </React.Fragment>
  )
}

export const CustomTable = <T extends object>(props: ICustomTableProps<T>) => {
  const {
    columns,
    mobileColumns,
    data,
    currentPage,
    setPage,
    hover,
    pageSize,
    maxPage,
    loading,
    // onRowClick,
  } = props

  const table = useTable(
    {
      columns: (isMobile ? mobileColumns ?? columns : columns) as Column[],
      data,
      initialState: {
        pageIndex: currentPage - 1,
        pageSize,
      },
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
    <div tw='w-full'>
      <div css={tableContainerStyle}>
        <table {...getTableProps()} css={tw`w-full`} className='table'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  const { style, ...rest } = column.getHeaderProps(
                    column.getSortByToggleProps(),
                  )
                  return (
                    <th
                      {...rest}
                      css={thStyle}
                      style={{
                        ...style,
                        // @ts-ignore
                        textAlign: column.align ?? 'left',
                      }}
                    >
                      <Txt.Body2Regular tw='text-font-100'>
                        {column.render('Header')}
                      </Txt.Body2Regular>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          {data.length === 0 && !loading && (
            <tbody>
              <tr>
                <td colSpan={columns.length}>
                  <div tw='w-full rounded-lg  flex-col h-64 bg-primary-100 flex justify-center items-center'>
                    <Txt.Body1Regular>No tokens found.</Txt.Body1Regular>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
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
                  <TableRow
                    row={row}
                    columns={columns}
                    hover={hover}
                    renderExpanded={props.renderExpanded}
                  />
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      {maxPage > 1 && (
        <CustomTablePagination
          totalOnPage={data.length}
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
