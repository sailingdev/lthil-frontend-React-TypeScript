/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { ContentContainer } from '../shared/ContentContainer'

import { Button } from '../shared/Button'

// document.documentElement.classList.toggle('dark')

export const DashboardPage = () => {
  return (
    <ContentContainer>
      <div tw='bg-primary'>
        <Button text='button' action={true} />
      </div>
    </ContentContainer>
  )
}
