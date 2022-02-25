import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { Event, EventFilter } from 'ethers'
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { EventFragment, FunctionFragment, Result } from '@ethersproject/abi'
import { Listener, Provider } from '@ethersproject/providers'

export interface TypedEvent<
  TArgsArray extends Array<any> = any,
  TArgsObject = any,
> extends Event {
  args: TArgsArray & TArgsObject
}

export interface TypedEventFilter<_TEvent extends TypedEvent>
  extends EventFilter {}

export interface TypedListener<TEvent extends TypedEvent> {
  (...listenerArg: [...__TypechainArgsArray<TEvent>, TEvent]): void
}

type __TypechainArgsArray<T> = T extends TypedEvent<infer U> ? U : never

export interface OnEvent<TRes> {
  <TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
    listener: TypedListener<TEvent>,
  ): TRes
  (eventName: string, listener: Listener): TRes
}

export type MinEthersFactory<C, ARGS> = {
  deploy(...a: ARGS[]): Promise<C>
}

export type GetContractTypeFromFactory<F> = F extends MinEthersFactory<
  infer C,
  any
>
  ? C
  : never

export type GetARGsTypeFromFactory<F> = F extends MinEthersFactory<any, any>
  ? Parameters<F['deploy']>
  : never

export declare namespace IStrategy {
  export type PositionStruct = {
    owner: string
    owedToken: string
    heldToken: string
    collateralToken: string
    collateral: BigNumberish
    principal: BigNumberish
    allowance: BigNumberish
    interestRate: BigNumberish
    fees: BigNumberish
    createdAt: BigNumberish
  }

  export type PositionStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
  ] & {
    owner: string
    owedToken: string
    heldToken: string
    collateralToken: string
    collateral: BigNumber
    principal: BigNumber
    allowance: BigNumber
    interestRate: BigNumber
    fees: BigNumber
    createdAt: BigNumber
  }

  export type OrderStruct = {
    spentToken: string
    obtainedToken: string
    collateral: BigNumberish
    collateralIsSpentToken: boolean
    minObtained: BigNumberish
    maxSpent: BigNumberish
    deadline: BigNumberish
  }

  export type OrderStructOutput = [
    string,
    string,
    BigNumber,
    boolean,
    BigNumber,
    BigNumber,
    BigNumber,
  ] & {
    spentToken: string
    obtainedToken: string
    collateral: BigNumber
    collateralIsSpentToken: boolean
    minObtained: BigNumber
    maxSpent: BigNumber
    deadline: BigNumber
  }
}

export interface BaseStrategyInterface extends utils.Interface {
  contractName: 'BaseStrategy'
  functions: {
    'closePosition(uint256)': FunctionFragment
    'computeLiquidationScore((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256))': FunctionFragment
    'computePairRiskFactor(address,address)': FunctionFragment
    'editPosition(uint256,uint256)': FunctionFragment
    'id()': FunctionFragment
    'liquidate(uint256[])': FunctionFragment
    'openPosition((address,address,uint256,bool,uint256,uint256,uint256))': FunctionFragment
    'owner()': FunctionFragment
    'positions(uint256)': FunctionFragment
    'renounceOwnership()': FunctionFragment
    'riskFactors(address)': FunctionFragment
    'setRiskFactor(address,uint256)': FunctionFragment
    'totalAllowances(address)': FunctionFragment
    'transferOwnership(address)': FunctionFragment
    'vault()': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'closePosition',
    values: [BigNumberish],
  ): string
  encodeFunctionData(
    functionFragment: 'computeLiquidationScore',
    values: [IStrategy.PositionStruct],
  ): string
  encodeFunctionData(
    functionFragment: 'computePairRiskFactor',
    values: [string, string],
  ): string
  encodeFunctionData(
    functionFragment: 'editPosition',
    values: [BigNumberish, BigNumberish],
  ): string
  encodeFunctionData(functionFragment: 'id', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'liquidate',
    values: [BigNumberish[]],
  ): string
  encodeFunctionData(
    functionFragment: 'openPosition',
    values: [IStrategy.OrderStruct],
  ): string
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'positions',
    values: [BigNumberish],
  ): string
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined,
  ): string
  encodeFunctionData(functionFragment: 'riskFactors', values: [string]): string
  encodeFunctionData(
    functionFragment: 'setRiskFactor',
    values: [string, BigNumberish],
  ): string
  encodeFunctionData(
    functionFragment: 'totalAllowances',
    values: [string],
  ): string
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [string],
  ): string
  encodeFunctionData(functionFragment: 'vault', values?: undefined): string

  decodeFunctionResult(
    functionFragment: 'closePosition',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'computeLiquidationScore',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'computePairRiskFactor',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'editPosition',
    data: BytesLike,
  ): Result
  decodeFunctionResult(functionFragment: 'id', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'liquidate', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'openPosition',
    data: BytesLike,
  ): Result
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'positions', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike,
  ): Result
  decodeFunctionResult(functionFragment: 'riskFactors', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'setRiskFactor',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'totalAllowances',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike,
  ): Result
  decodeFunctionResult(functionFragment: 'vault', data: BytesLike): Result

  events: {
    'OwnershipTransferred(address,address)': EventFragment
    'PositionWasClosed(uint256)': EventFragment
    'PositionWasLiquidated(uint256)': EventFragment
    'PositionWasOpened(uint256,address,address,address,address,uint256,uint256,uint256,uint256,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'PositionWasClosed'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'PositionWasLiquidated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'PositionWasOpened'): EventFragment
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>

export type PositionWasClosedEvent = TypedEvent<[BigNumber], { id: BigNumber }>

export type PositionWasClosedEventFilter =
  TypedEventFilter<PositionWasClosedEvent>

export type PositionWasLiquidatedEvent = TypedEvent<
  [BigNumber],
  { id: BigNumber }
>

export type PositionWasLiquidatedEventFilter =
  TypedEventFilter<PositionWasLiquidatedEvent>

export type PositionWasOpenedEvent = TypedEvent<
  [
    BigNumber,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
  ],
  {
    id: BigNumber
    owner: string
    owedToken: string
    heldToken: string
    collateralToken: string
    collateral: BigNumber
    principal: BigNumber
    allowance: BigNumber
    fees: BigNumber
    createdAt: BigNumber
  }
>

export type PositionWasOpenedEventFilter =
  TypedEventFilter<PositionWasOpenedEvent>

export interface BaseStrategy extends BaseContract {
  contractName: 'BaseStrategy'
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: BaseStrategyInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    closePosition(
      positionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    computeLiquidationScore(
      position: IStrategy.PositionStruct,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber] & { score: BigNumber; dueFees: BigNumber }
    >

    computePairRiskFactor(
      token0: string,
      token1: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>

    editPosition(
      positionId: BigNumberish,
      newCollateral: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    id(overrides?: CallOverrides): Promise<[BigNumber]>

    liquidate(
      positionIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    openPosition(
      order: IStrategy.OrderStruct,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    owner(overrides?: CallOverrides): Promise<[string]>

    positions(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ] & {
        owner: string
        owedToken: string
        heldToken: string
        collateralToken: string
        collateral: BigNumber
        principal: BigNumber
        allowance: BigNumber
        interestRate: BigNumber
        fees: BigNumber
        createdAt: BigNumber
      }
    >

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    riskFactors(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>

    setRiskFactor(
      token: string,
      riskFactor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    totalAllowances(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<[BigNumber]>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    vault(overrides?: CallOverrides): Promise<[string]>
  }

  closePosition(
    positionId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  computeLiquidationScore(
    position: IStrategy.PositionStruct,
    overrides?: CallOverrides,
  ): Promise<[BigNumber, BigNumber] & { score: BigNumber; dueFees: BigNumber }>

  computePairRiskFactor(
    token0: string,
    token1: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  editPosition(
    positionId: BigNumberish,
    newCollateral: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  id(overrides?: CallOverrides): Promise<BigNumber>

  liquidate(
    positionIds: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  openPosition(
    order: IStrategy.OrderStruct,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  owner(overrides?: CallOverrides): Promise<string>

  positions(
    arg0: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<
    [
      string,
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
    ] & {
      owner: string
      owedToken: string
      heldToken: string
      collateralToken: string
      collateral: BigNumber
      principal: BigNumber
      allowance: BigNumber
      interestRate: BigNumber
      fees: BigNumber
      createdAt: BigNumber
    }
  >

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  riskFactors(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

  setRiskFactor(
    token: string,
    riskFactor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  totalAllowances(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  vault(overrides?: CallOverrides): Promise<string>

  callStatic: {
    closePosition(
      positionId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    computeLiquidationScore(
      position: IStrategy.PositionStruct,
      overrides?: CallOverrides,
    ): Promise<
      [BigNumber, BigNumber] & { score: BigNumber; dueFees: BigNumber }
    >

    computePairRiskFactor(
      token0: string,
      token1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    editPosition(
      positionId: BigNumberish,
      newCollateral: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    id(overrides?: CallOverrides): Promise<BigNumber>

    liquidate(
      positionIds: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<void>

    openPosition(
      order: IStrategy.OrderStruct,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<string>

    positions(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<
      [
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
      ] & {
        owner: string
        owedToken: string
        heldToken: string
        collateralToken: string
        collateral: BigNumber
        principal: BigNumber
        allowance: BigNumber
        interestRate: BigNumber
        fees: BigNumber
        createdAt: BigNumber
      }
    >

    renounceOwnership(overrides?: CallOverrides): Promise<void>

    riskFactors(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    setRiskFactor(
      token: string,
      riskFactor: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<void>

    totalAllowances(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides,
    ): Promise<void>

    vault(overrides?: CallOverrides): Promise<string>
  }

  filters: {
    'OwnershipTransferred(address,address)'(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter

    'PositionWasClosed(uint256)'(
      id?: BigNumberish | null,
    ): PositionWasClosedEventFilter
    PositionWasClosed(id?: BigNumberish | null): PositionWasClosedEventFilter

    'PositionWasLiquidated(uint256)'(
      id?: BigNumberish | null,
    ): PositionWasLiquidatedEventFilter
    PositionWasLiquidated(
      id?: BigNumberish | null,
    ): PositionWasLiquidatedEventFilter

    'PositionWasOpened(uint256,address,address,address,address,uint256,uint256,uint256,uint256,uint256)'(
      id?: BigNumberish | null,
      owner?: string | null,
      owedToken?: null,
      heldToken?: null,
      collateralToken?: null,
      collateral?: null,
      principal?: null,
      allowance?: null,
      fees?: null,
      createdAt?: null,
    ): PositionWasOpenedEventFilter
    PositionWasOpened(
      id?: BigNumberish | null,
      owner?: string | null,
      owedToken?: null,
      heldToken?: null,
      collateralToken?: null,
      collateral?: null,
      principal?: null,
      allowance?: null,
      fees?: null,
      createdAt?: null,
    ): PositionWasOpenedEventFilter
  }

  estimateGas: {
    closePosition(
      positionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    computeLiquidationScore(
      position: IStrategy.PositionStruct,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    computePairRiskFactor(
      token0: string,
      token1: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    editPosition(
      positionId: BigNumberish,
      newCollateral: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    id(overrides?: CallOverrides): Promise<BigNumber>

    liquidate(
      positionIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    openPosition(
      order: IStrategy.OrderStruct,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<BigNumber>

    positions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    riskFactors(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    setRiskFactor(
      token: string,
      riskFactor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    totalAllowances(arg0: string, overrides?: CallOverrides): Promise<BigNumber>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    vault(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    closePosition(
      positionId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    computeLiquidationScore(
      position: IStrategy.PositionStruct,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    computePairRiskFactor(
      token0: string,
      token1: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    editPosition(
      positionId: BigNumberish,
      newCollateral: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>

    liquidate(
      positionIds: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    openPosition(
      order: IStrategy.OrderStruct,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    positions(
      arg0: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    riskFactors(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    setRiskFactor(
      token: string,
      riskFactor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    totalAllowances(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
