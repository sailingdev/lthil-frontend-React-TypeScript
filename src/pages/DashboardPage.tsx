/** @jsxImportSource @emotion/react */
import 'twin.macro'

import { ContentContainer } from '../shared/ContentContainer'

import { Button } from '../shared/Button'

import { Cube } from 'phosphor-react'

// document.documentElement.classList.toggle('dark')

export const DashboardPage = () => {
  return (
    <ContentContainer>
      <div tw='bg-primary'>
        <Button text='button' primary />
        <Button text='button' primary leftIcon={Cube} />
        <Button text='button' primary rightIcon={Cube} />
        <Button text='button' primary leftIcon={Cube} rightIcon={Cube} />
        <Button text='button' action />
        <Button text='button' action leftIcon={Cube} />
        <Button text='button' action rightIcon={Cube} />
        <Button text='button' action leftIcon={Cube} rightIcon={Cube} />
      </div>
    </ContentContainer>
  )
}
