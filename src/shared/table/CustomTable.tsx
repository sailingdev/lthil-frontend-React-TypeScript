import {
  Column,
  useFlexLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import React, { ReactNode, useEffect } from 'react'
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
      ${tw`bg-primary-100 desktop:py-3`}
    }

    /* tr:hover > td {
      ${tw`bg-primary-300`}
    } */
    tr:first-of-type {
      ${tw`pt-3`}
    }
    tr:last-of-type {
      ${tw`pb-3`}
    }
    tr > th:first-of-type {
      ${tw` ml-6`}
    }
    tr > th:last-of-type {
      ${tw` mr-6 rounded-tr-xl`}/* rounded-tr-xl */
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
      ${tw`bg-primary-100`}
    }

    tbody > tr:last-of-type {
      ${tw`rounded-b-xl rounded-bl-xl rounded-br-xl`}/*This is last row rounded-bl-xl rounded-br-md */
    }
    /* tbody > tr:nth-last-child(2) {
      ${tw`rounded-b-xl`}
    }
    tbody > tr:nth-last-child(1) {
      ${tw``}
    } */
    th {
      ${tw``}/* This is where the top row border is */
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
  accessor: keyof T
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
  renderExpanded?: React.ReactNode
  onActiveRowChange?: (row: T) => void
  activeRow?: T | undefined
}
// TODO TABLE EMPTY STATE
// TODO: Make the row toggle button be the cells, now the entire row

export const CustomTable = <T extends object>(props: ICustomTableProps<T>) => {
  const {
    columns,
    mobileColumns,
    data,
    currentPage,
    setPage,

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
      <div tw='overflow-x-auto rounded-xl' css={tableContainerStyle}>
        <table {...getTableProps()} css={tw`w-full`} className='table'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} tw='rounded-t-xl'>
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
          {/* TODO: Do we need this skeleton code here? */}
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
                  <React.Fragment>
                    <tr tw='h-0.5 bg-primary-100'>
                      <div
                        css={[
                          tw`h-0.5 mx-10 bg-primary-300`,
                          // index === page.length - 1 && tw`bg-primary-100`,
                        ]}
                      ></div>
                    </tr>
                    <tr
                      {...row.getRowProps()}
                      css={[
                        tw`cursor-pointer flex flex-col justify-between items-center`,
                      ]}
                      onClick={() => {
                        // props.onActiveRowChange &&
                        //   props.onActiveRowChange(row.original as T)
                      }}
                      // @ts-ignore
                    >
                      <div tw='w-full flex flex-row justify-between'>
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
                              css={tw`py-4`}
                              onClick={() => {
                                props.onActiveRowChange &&
                                  props.onActiveRowChange(row.original as T)
                              }}
                            >
                              {/* @ts-ignore */}
                              {cell.column.cell(cell.row.original)}
                            </td>
                          )
                        })}
                      </div>
                      {props.activeRow == row.original && props.renderExpanded}
                    </tr>
                  </React.Fragment>
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
