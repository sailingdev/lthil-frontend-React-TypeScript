import { LocationStatus, PedestalStatus } from '../api-types'

import { IDropdownOption } from '../types'
import { format } from 'date-fns'

interface IFormatDateOptions {
  dateFormat?: string
  uppercase?: boolean
}

export const formatDate = (date: Date, options?: IFormatDateOptions): any => {
  const { dateFormat = 'yyyy-MM-dd', uppercase = false } = options || {}
  const startDate = format(date, dateFormat)

  return uppercase ? startDate.toUpperCase() : startDate
}

export const yesNoOptions: IDropdownOption[] = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
]

export const errors = {
  required: 'This field is required',
  email: 'This field is email',
}

export const locationStatusMeta = {
  [LocationStatus.ACTIVE]: {
    colorProps: { green: true },
    value: 'Active',
  },
  [LocationStatus.TEST]: {
    colorProps: { purple: true },
    value: 'Test',
  },
  [LocationStatus.INACTIVE]: {
    colorProps: { gray: true },
    value: 'Inactive',
  },
}

export const pedestalStatusMeta = {
  [PedestalStatus.ACTIVE]: {
    colorProps: { green: true },
    value: 'Active',
  },
  [PedestalStatus.INACTIVE]: {
    colorProps: { gray: true },
    value: 'Inactive',
  },
  [PedestalStatus.OUT_OF_SERVICE]: {
    colorProps: { red: true },
    value: 'Out of service',
  },
  [PedestalStatus.READY_TO_CONFIGURE]: {
    colorProps: { purple: true },
    value: 'Ready to configure',
  },
  [PedestalStatus.READY_TO_INSTALL]: {
    colorProps: { yellow: true },
    value: 'Ready to install',
  },
  [PedestalStatus.READY_TO_TEST]: {
    colorProps: { blue: true },
    value: 'Ready to test',
  },
}
