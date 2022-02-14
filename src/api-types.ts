export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export interface User {
  email: string
  newEmail: string
  name: string
  role: UserRole
  phoneNumber: string
  country: string
}
export enum AccountTypeEnum {
  PREPAID = 'PREPAID',
  POSTPAID = 'POSPAID',
  POSTPAID_PERIODICALLY = 'POSTPAID_PERIODICALLY',
  CHARTER = 'CHARTER',
}

export enum LocationTypeEnum {
  MARINA = 'MARINA',
  HARBOR = 'HARBOR',
  CAMP = 'CAMP',
  OTHER = 'OTHER',
}

export enum SourceTypeEnum {
  SOCKET = 'SOCKET',
  VALVE = 'VALVE',
}
export enum PhaseTypeEnum {
  MONO_PHASE = 'MONO_PHASE',
  THREE_PHASE = 'THREE_PHASE',
}

export enum LocationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEST = 'TEST',
}

export enum PedestalStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  READY_TO_CONFIGURE = 'READY_TO_CONFIGURE',
  READY_TO_TEST = 'READY_TO_TEST',
  READY_TO_INSTALL = 'READY_TO_INSTALL',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}

export interface Pedestal {
  id: number
  identifier: string
  status: PedestalStatus
  location: Location
  sources: Source[]
}

export interface Source {
  type: SourceTypeEnum
  available: boolean
  plugged?: boolean
  phase?: PhaseTypeEnum
  current?: number
  pedestal: Pedestal
}

export interface Location {
  id: number
  type: LocationTypeEnum
  status: LocationStatus
  name: string
  country: string
  city: string
  address: string
  postcode: string
  description: string
  logoUrl: string
  imageUrl: string
  thumbnailUrl: string
  websiteUrl: string
  phone: string
  email: string
  berthCount: number
  maxVehicleLength: number
  maxVehicleBeamLength: number
  maxSocketSize: string
  portDepthRange: string
  latitude: number
  longitude: number
  waterTariff?: number
  powerTariff?: number
  defaultAccountType: AccountTypeEnum
  pedestals: Pedestal[]
}

export interface CurrentConfiguration {
  modbus?: string
  impulses?: string
  phases: PhaseTypeEnum
  power: string
}
export interface WaterConfiguration {
  impulses: string
  size: string
}
export interface PedestalType {
  name: string
  configuration: {
    currents: CurrentConfiguration[]
    waters: WaterConfiguration[]
  }
}
