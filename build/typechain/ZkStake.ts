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

export interface ZkStakeInterface extends utils.Interface {
  contractName: "ZkStake";
  functions: {
    "addDAOIdentity(uint256,uint256,uint256)": FunctionFragment;
    "commitmentNFTs(uint256)": FunctionFragment;
    "createEntity(uint256,address,address)": FunctionFragment;
    "getDepth(uint256)": FunctionFragment;
    "getRoot(uint256)": FunctionFragment;
    "getSize(uint256)": FunctionFragment;
    "membershipTokens(uint256)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "removeDAOIdentity(uint256,uint256,uint256[],uint8[],address)": FunctionFragment;
    "verifyIdentityChallenge(string,uint256,uint256,uint256[8])": FunctionFragment;
    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[4])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addDAOIdentity",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commitmentNFTs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createEntity",
    values: [BigNumberish, string, string]
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
    functionFragment: "membershipTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeDAOIdentity",
    values: [BigNumberish, BigNumberish, BigNumberish[], BigNumberish[], string]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyIdentityChallenge",
    values: [string, BigNumberish, BigNumberish, BigNumberish[]]
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
    functionFragment: "addDAOIdentity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "commitmentNFTs",
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
    functionFragment: "membershipTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeDAOIdentity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyIdentityChallenge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyProof",
    data: BytesLike
  ): Result;

  events: {
    "EntityCreated(uint256,address)": EventFragment;
    "GroupAdded(uint256,uint8)": EventFragment;
    "MemberAdded(uint256,uint256,uint256)": EventFragment;
    "MemberRemoved(uint256,uint256,uint256)": EventFragment;
    "NullifierHashAdded(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EntityCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GroupAdded"): EventFragment;
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

export interface ZkStake extends BaseContract {
  contractName: "ZkStake";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZkStakeInterface;

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
    addDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commitmentNFTs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      token: string,
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

    membershipTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    verifyIdentityChallenge(
      challenge: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<[boolean] & { r: boolean }>;
  };

  addDAOIdentity(
    entityId: BigNumberish,
    identityCommitment: BigNumberish,
    id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commitmentNFTs(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  createEntity(
    entityId: BigNumberish,
    editor: string,
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getDepth(
    groupId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRoot(groupId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  getSize(groupId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  membershipTokens(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeDAOIdentity(
    entityId: BigNumberish,
    identityCommitment: BigNumberish,
    proofSiblings: BigNumberish[],
    proofPathIndices: BigNumberish[],
    receiver: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  verifyIdentityChallenge(
    challenge: string,
    nullifierHash: BigNumberish,
    entityId: BigNumberish,
    proof: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<boolean>;

  verifyProof(
    a: [BigNumberish, BigNumberish],
    b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    c: [BigNumberish, BigNumberish],
    input: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    addDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    commitmentNFTs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      token: string,
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

    membershipTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    removeDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      receiver: string,
      overrides?: CallOverrides
    ): Promise<void>;

    verifyIdentityChallenge(
      challenge: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<boolean>;

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
    addDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commitmentNFTs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      token: string,
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

    membershipTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    verifyIdentityChallenge(
      challenge: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
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
    addDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commitmentNFTs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createEntity(
      entityId: BigNumberish,
      editor: string,
      token: string,
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

    membershipTokens(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeDAOIdentity(
      entityId: BigNumberish,
      identityCommitment: BigNumberish,
      proofSiblings: BigNumberish[],
      proofPathIndices: BigNumberish[],
      receiver: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    verifyIdentityChallenge(
      challenge: string,
      nullifierHash: BigNumberish,
      entityId: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
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
