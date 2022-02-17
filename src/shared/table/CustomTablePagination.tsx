import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'

/** @jsxImportSource @emotion/react */
import React from 'react'
import { isMobile } from '../../utils'
import tw from 'twin.macro'

interface ICustomTablePaginationProps {
  currentPage: number
  maxPage: number
  setPage(value: number): void
  canPreviousPage: boolean
  canNextPage: boolean
  pageSize: number
  totalOnPage: number
  totalCount: number
}

const createPaginationItems = (p: number, pageCount: number) => {
  const items = [
    p - 4,
    p - 3,
    p - 2,
    p - 1,
    p,
    p + 1,
    p + 2,
    Math.max(pageCount - 1, p + 3),
    Math.max(pageCount, p + 4),
  ].filter((i) => i > 0 && i <= pageCount)

  if (pageCount <= 5) {
    return items
  }

  const currentPageIndex = items.indexOf(p)
  const endIndex = items.length
  const inLastTwo = currentPageIndex + 2 >= endIndex
  if (inLastTwo) {
    return items.slice(endIndex - 5, endIndex)
  } else {
    const lastPart = items.slice(endIndex - 2, endIndex)
    const isLastOnFirstPart = p + 1 === lastPart[0]
    const index = isLastOnFirstPart
      ? currentPageIndex - 2
      : Math.max(0, currentPageIndex - 1)

    const firstPart = items.slice(index, index + 3)
    return [...firstPart, ...lastPart]
  }
}

export const CustomTablePagination = (props: ICustomTablePaginationProps) => {
  const { setPage, currentPage, maxPage } = props

  const paginationItems = createPaginationItems(currentPage, maxPage)

  const showDivider =
    maxPage > 3 && paginationItems[2] + 1 != paginationItems[3]

  return (
    <div css={tw`text-secondary  flex justify-between items-center`}>
      <button onClick={() => setPage(Math.max(1, currentPage - 1))}>
        <span tw='text-warning py-4'>
          <ArrowNarrowLeftIcon
            color='#6B7280'
            css={tw`h-5 w-5 mr-3.5 inline`}
          />
          Previous
        </span>
      </button>
      {!isMobile && (
        <div tw='flex flex-row items-center'>
          {paginationItems.map((page, i) => {
            return (
              <React.Fragment key={`${i}-${page}`}>
                <div>
                  <div onClick={() => setPage(page)}>
                    <span
                      tw='text-warning'
                      css={[
                        tw`px-4 py-4 text-left -mt-0 font-normal cursor-pointer hover:text-primary border-t-2 border-action`,
                        page === currentPage &&
                          tw`border-primary-200 text-primary-200 cursor-default`,
                      ]}
                    >
                      {page}
                    </span>
                  </div>
                </div>
                {showDivider && i == 2 && (
                  <span tw='text-action px-4 py-4'>...</span>
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}
      <button onClick={() => setPage(Math.min(maxPage, currentPage + 1))}>
        <span tw='text-action py-4'>
          Next
          <ArrowNarrowRightIcon
            color='#6B7280'
            css={tw`h-5 w-5 ml-3.5 inline`}
          />
        </span>
      </button>
    </div>
  )
}
