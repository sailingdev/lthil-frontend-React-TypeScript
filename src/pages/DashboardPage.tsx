import 'twin.macro'

import { Button } from '../shared/Button'
import { ContentContainer } from '../shared/ContentContainer'
/** @jsxImportSource @emotion/react */
import { Cube } from 'phosphor-react'
import { Txt } from '../shared/Txt'
import { NavigationMenu } from '../shared/NavigationMenu'

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
          <Txt.MobileMedium>Sample text</Txt.MobileMedium>
          <Txt.CaptionMedium>Sample text</Txt.CaptionMedium>
          <Txt.Body2Regular>Sample text</Txt.Body2Regular>
          <Txt.Body2Bold>Sample text</Txt.Body2Bold>
          <Txt.Body1Regular>Sample text</Txt.Body1Regular>
          <Txt.ButtonMedium>Sample text</Txt.ButtonMedium>
          <Txt.Body1Bold>Sample text</Txt.Body1Bold>
          <Txt.Body1Bold>Sample text</Txt.Body1Bold>
          <Txt.InputText>Sample text</Txt.InputText>
          <Txt.Heading2>Sample text</Txt.Heading2>
          <Txt.Heading1>Sample text</Txt.Heading1>
        </div>
        <NavigationMenu />
      </div>
    </ContentContainer>
  )
}
