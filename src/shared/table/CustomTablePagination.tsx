/** @jsxImportSource @emotion/react */
import React from 'react'
import { MouseEventHandler } from 'react'
import tw from 'twin.macro'

import { ArrowLeft, ArrowRight } from 'phosphor-react'
import { isMobile } from '../../utils'
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

const PaginationButton = (props: {
  icon?: any
  text?: string
  active: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}) => {
  const Icon = props.icon
  const text = props.text
  const active = props.active

  return (
    <button
      css={[
        tw`border-0 rounded-md cursor-pointer flex flex-row items-center px-2.5 py-2.5 bg-primary-200 width[36px] height[36px] flex justify-center items-center mx-1`,
        active && tw`bg-action text-primary-100`,
      ]}
      onClick={props.onClick}
    >
      {Icon && (
        <Icon css={[tw`text-secondary`, active && tw`text-primary-100`]} />
      )}
      {text && text}
    </button>
  )
}

export const CustomTablePagination = (props: ICustomTablePaginationProps) => {
  const { setPage, currentPage, maxPage } = props

  const paginationItems = createPaginationItems(currentPage, maxPage)

  const showDivider =
    maxPage > 3 && paginationItems[2] + 1 != paginationItems[3]

  return (
    <div css={tw`text-secondary  flex justify-center items-center`}>
      <button onClick={() => setPage(Math.max(1, currentPage - 1))}>
        {/* TODO: Button is inside another button! Refactor this. */}
        <span tw='text-warning py-4'>
          <PaginationButton active={false} icon={ArrowLeft} />
        </span>
      </button>
      {!isMobile && (
        <div tw='flex flex-row items-center'>
          {paginationItems.map((page, i) => {
            return (
              <React.Fragment key={`${i}-${page}`}>
                <div>
                  <div onClick={() => setPage(page)}>
                    <PaginationButton
                      active={page === currentPage}
                      text={page.toString()}
                    />
                  </div>
                </div>
                {showDivider && i == 2 && (
                  <span tw='text-action px-4 py-4 text-secondary'>...</span>
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}
      <button onClick={() => setPage(Math.min(maxPage, currentPage + 1))}>
        <span tw='text-action py-4'>
          <PaginationButton active={false} icon={ArrowRight} />
        </span>
      </button>
    </div>
  )
}
