/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
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
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface SemaphoreWhistleblowingInterface extends utils.Interface {
  contractName: "SemaphoreWhistleblowing";
  functions: {
    "addWhistleblower(uint256,uint256)": FunctionFragment;
    "createEntity(uint256,address)": FunctionFragment;
    "getDepth(uint256)": FunctionFragment;
    "getRoot(uint256)": FunctionFragment;
    "getSize(uint256)": FunctionFragment;
    "publishLeak(string,uint256,uint256,uint256[8])": FunctionFragment;
    "removeWhistleblower(uint256,uint256,uint256[],uint8[])": FunctionFragment;
    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[4])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addWhistleblower",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createEntity",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getDepth",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoot",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSize",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "publishLeak",
    values: [string, BigNumberish, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "removeWhistleblower",
    values: [BigNumberish, BigNumberish, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyProof",
    values: [
      [BigNumberish, BigNumberish],
      [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      [BigNumberish, BigNumberish],
      [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "addWhistleblower",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEntity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getDepth", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getSize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publishLeak",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeWhistleblower",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyProof",
    data: BytesLike
  ): Result;

  events: {
    "EntityCreated(uint256,address)": EventFragment;
    "GroupAdded(uint256,uint8)": EventFragment;
    "LeakPublished(uint256,string)": EventFragment;
    "MemberAdded(uint256,uint256,uint256)": EventFragment;
    "MemberRemoved(uint256,uint256,uint256)": EventFragment;
    "NullifierHashAdded(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EntityCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LeakPublished"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MemberAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MemberRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NullifierHashAdded"): EventFragment;
}

export type EntityCreatedEvent = TypedEvent<
  [BigNumber, string],
  { entityId: BigNumber; editor: string }
>;

export type EntityCreatedEventFilter = TypedEventFilter<EntityCreatedEvent>;

export type GroupAddedEvent = TypedEvent<
  [BigNumber, number],
  { groupId: BigNumber; depth: number }
>;

export type GroupAddedEventFilter = TypedEventFilter<GroupAddedEvent>;

export type LeakPublishedEvent = TypedEvent<
  [BigNumber, string],
  { entityId: BigNumber; leak: string }
>;

export type LeakPublishedEventFilter = TypedEventFilter<LeakPublishedEvent>;

export type MemberAddedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { groupId: BigNumber; identityCommitment: BigNumber; root: BigNumber }
>;

export type MemberAddedEventFilter = TypedEventFilter<MemberAddedEvent>;

export type MemberRemovedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  { groupId: BigNumber; identityCommitment: BigNumber; root: BigNumber }
>;

export type MemberRemovedEventFilter = TypedEventFilter<MemberRemovedEvent>;

export type NullifierHashAddedEvent = TypedEvent<
  [BigNumber],
  { nullifierHash: BigNumber }
>;

export type NullifierHashAddedEventFilter =
  TypedEventFilter<NullifierHashAddedEvent>;

export interface SemaphoreWhistleblowing extends BaseContract {
  contractName: "SemaphoreWhistleblowing";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SemaphoreWhistleblowingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getDepth(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRoot(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getSize(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    publishLeak(
      leak: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<[boolean] & { r: boolean }>;
  };

  addWhistleblower(
    entityId: BigNumberish,
    identityCommitment: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createEntity(
    entityId: BigNumberish,
    editor: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getDepth(
    groupId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRoot(groupId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getSize(groupId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  publishLeak(
    leak: string,
    nullifierHash: BigNumberish,
    entityId: BigNumberish,
    proof: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeWhistleblower(
    entityId: BigNumberish,
    identityCommitment: BigNumberish,
    proofSiblings: BigNumberish[],
    proofPathIndices: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  verifyProof(
    a: [BigNumberish, BigNumberish],
    b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    c: [BigNumberish, BigNumberish],
    input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    addWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getDepth(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoot(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSize(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    publishLeak(
      leak: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    removeWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "EntityCreated(uint256,address)"(
      entityId?: null,
      editor?: string | null
    ): EntityCreatedEventFilter;
    EntityCreated(
      entityId?: null,
      editor?: string | null
    ): EntityCreatedEventFilter;

    "GroupAdded(uint256,uint8)"(
      groupId?: BigNumberish | null,
      depth?: null
    ): GroupAddedEventFilter;
    GroupAdded(
      groupId?: BigNumberish | null,
      depth?: null
    ): GroupAddedEventFilter;

    "LeakPublished(uint256,string)"(
      entityId?: BigNumberish | null,
      leak?: null
    ): LeakPublishedEventFilter;
    LeakPublished(
      entityId?: BigNumberish | null,
      leak?: null
    ): LeakPublishedEventFilter;

    "MemberAdded(uint256,uint256,uint256)"(
      groupId?: BigNumberish | null,
      identityCommitment?: null,
      root?: null
    ): MemberAddedEventFilter;
    MemberAdded(
      groupId?: BigNumberish | null,
      identityCommitment?: null,
      root?: null
    ): MemberAddedEventFilter;

    "MemberRemoved(uint256,uint256,uint256)"(
      groupId?: BigNumberish | null,
      identityCommitment?: null,
      root?: null
    ): MemberRemovedEventFilter;
    MemberRemoved(
      groupId?: BigNumberish | null,
      identityCommitment?: null,
      root?: null
    ): MemberRemovedEventFilter;

    "NullifierHashAdded(uint256)"(
      nullifierHash?: null
    ): NullifierHashAddedEventFilter;
    NullifierHashAdded(nullifierHash?: null): NullifierHashAddedEventFilter;
  };

  estimateGas: {
    addWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getDepth(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoot(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSize(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    publishLeak(
      leak: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getDepth(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoot(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSize(
      groupId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    publishLeak(
      leak: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeWhistleblower(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
