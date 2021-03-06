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

export interface ISemaphoreVotingInterface extends utils.Interface {
  contractName: "ISemaphoreVoting";
  functions: {
    "addVoter(uint256,uint256)": FunctionFragment;
    "castVote(string,uint256,uint256,uint256[8])": FunctionFragment;
    "createPoll(uint256,address)": FunctionFragment;
    "endPoll(uint256,uint256)": FunctionFragment;
    "startPoll(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addVoter",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "castVote",
    values: [string, BigNumberish, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "createPoll",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "endPoll",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "startPoll",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addVoter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "castVote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createPoll", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "endPoll", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "startPoll", data: BytesLike): Result;

  events: {
    "PollCreated(uint256,address)": EventFragment;
    "PollEnded(uint256,address,uint256)": EventFragment;
    "PollStarted(uint256,address,uint256)": EventFragment;
    "VoteAdded(uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PollCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PollEnded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PollStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteAdded"): EventFragment;
}

export type PollCreatedEvent = TypedEvent<
  [BigNumber, string],
  { pollId: BigNumber; coordinator: string }
>;

export type PollCreatedEventFilter = TypedEventFilter<PollCreatedEvent>;

export type PollEndedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  { pollId: BigNumber; coordinator: string; decryptionKey: BigNumber }
>;

export type PollEndedEventFilter = TypedEventFilter<PollEndedEvent>;

export type PollStartedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  { pollId: BigNumber; coordinator: string; encryptionKey: BigNumber }
>;

export type PollStartedEventFilter = TypedEventFilter<PollStartedEvent>;

export type VoteAddedEvent = TypedEvent<
  [BigNumber, string],
  { pollId: BigNumber; vote: string }
>;

export type VoteAddedEventFilter = TypedEventFilter<VoteAddedEvent>;

export interface ISemaphoreVoting extends BaseContract {
  contractName: "ISemaphoreVoting";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISemaphoreVotingInterface;

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
    addVoter(
      pollId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    castVote(
      vote: string,
      nullifierHash: BigNumberish,
      pollId: BigNumberish,
      proof: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createPoll(
      pollId: BigNumberish,
      coordinator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    endPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addVoter(
    pollId: BigNumberish,
    identityCommitment: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  castVote(
    vote: string,
    nullifierHash: BigNumberish,
    pollId: BigNumberish,
    proof: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createPoll(
    pollId: BigNumberish,
    coordinator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  endPoll(
    pollId: BigNumberish,
    decryptionKey: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startPoll(
    pollId: BigNumberish,
    decryptionKey: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addVoter(
      pollId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    castVote(
      vote: string,
      nullifierHash: BigNumberish,
      pollId: BigNumberish,
      proof: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    createPoll(
      pollId: BigNumberish,
      coordinator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    endPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    startPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PollCreated(uint256,address)"(
      pollId?: null,
      coordinator?: string | null
    ): PollCreatedEventFilter;
    PollCreated(
      pollId?: null,
      coordinator?: string | null
    ): PollCreatedEventFilter;

    "PollEnded(uint256,address,uint256)"(
      pollId?: null,
      coordinator?: string | null,
      decryptionKey?: null
    ): PollEndedEventFilter;
    PollEnded(
      pollId?: null,
      coordinator?: string | null,
      decryptionKey?: null
    ): PollEndedEventFilter;

    "PollStarted(uint256,address,uint256)"(
      pollId?: null,
      coordinator?: string | null,
      encryptionKey?: null
    ): PollStartedEventFilter;
    PollStarted(
      pollId?: null,
      coordinator?: string | null,
      encryptionKey?: null
    ): PollStartedEventFilter;

    "VoteAdded(uint256,string)"(
      pollId?: BigNumberish | null,
      vote?: null
    ): VoteAddedEventFilter;
    VoteAdded(pollId?: BigNumberish | null, vote?: null): VoteAddedEventFilter;
  };

  estimateGas: {
    addVoter(
      pollId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    castVote(
      vote: string,
      nullifierHash: BigNumberish,
      pollId: BigNumberish,
      proof: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createPoll(
      pollId: BigNumberish,
      coordinator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    endPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addVoter(
      pollId: BigNumberish,
      identityCommitment: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    castVote(
      vote: string,
      nullifierHash: BigNumberish,
      pollId: BigNumberish,
      proof: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createPoll(
      pollId: BigNumberish,
      coordinator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    endPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startPoll(
      pollId: BigNumberish,
      decryptionKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
