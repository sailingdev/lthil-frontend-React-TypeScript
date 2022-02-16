import 'twin.macro'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
/** @jsxImportSource @emotion/react */
import { Cube } from 'phosphor-react'
import { Txt } from '../shared/Txt'

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
        <div tw='bg-primary'>
          <Txt.CaptionMedium>Sample text</Txt.CaptionMedium>
          <Txt.CaptionMedium>Sample text</Txt.CaptionMedium>
        </div>
      </div>
    </ContentContainer>
  )
}
