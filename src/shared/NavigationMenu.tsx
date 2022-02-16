/** @jsxImportSource @emotion/react */

import tw from 'twin.macro'
import { Link, useLocation } from 'react-router-dom'

const items = [
  { url: '/trade', label: 'Trade' },
  {
    url: '/stake',
    label: 'Stake',
  },
  {
    url: '/dashboard',
    label: 'Dashboard',
  },
  {
    url: '/charts',
    label: 'Charts',
  },
]

export const NavigationMenu = (props: { onItemClick?(): void }) => {
  const { pathname } = useLocation()
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`

  const selectedRoute =
    items.find((i) => new RegExp(`${i.url}/.*`).test(path)) ?? items[0]

  return (
    <div tw='flex flex-row min-width[256px] bg-primary'>
      <div tw='flex px-3'>
        {items.map((i) => {
          const isSelected = i.url === selectedRoute?.url
          return (
            <Link
              to={i.url}
              key={i.url}
              css={[
                tw`text-secondary flex flex-col align-items[center] py-4 cursor-pointer px-2 rounded-md w-auto`,
                isSelected && tw`font-bold`,
              ]}
              onClick={() => props.onItemClick && props.onItemClick()}
            >
              <span>{i.label}</span>
              {isSelected && <span>&#8226;</span>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
