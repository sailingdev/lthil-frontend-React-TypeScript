import { format } from 'date-fns'

export const mapErrorToCode = (e: any): number => {
  return e?.response?.status ?? 500
}

interface IFormatDateOptions {
  dateFormat?: string
  uppercase?: boolean
}

export const formatDate = (date: Date, options?: IFormatDateOptions): any => {
  const { dateFormat = 'yyyy-MM-dd', uppercase = false } = options || {}
  const startDate = format(date, dateFormat)

  return uppercase ? startDate.toUpperCase() : startDate
}

export const TABLET_BREAKPOINT = 480
export const DESKTOP_BREAKPOINT = 1024
export const isDesktop = window.screen.width >= DESKTOP_BREAKPOINT
export const isTablet = window.screen.width >= TABLET_BREAKPOINT
export const isMobile = !isDesktop && !isTablet

export interface IBaseProps {
  className?: string | undefined
}
