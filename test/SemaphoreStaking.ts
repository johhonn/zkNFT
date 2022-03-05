import { Strategy, ZkIdentity } from '@zk-kit/identity'
import { Semaphore } from '@zk-kit/protocols'
import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers, run } from 'hardhat'
import { SemaphoreWhistleblowing } from '../build/typechain'
import { createMerkleProof, generateIdentityProof } from './utils'

describe('SemaphoreWhistleblowing', () => {
  let stakecontract: any
  let NFT: any
  let accounts: any[]
  let editor: string

  const entityIds = [BigInt(1), BigInt(2)]

  before(async () => {
    let { contract, nft } = await run('deploy:nft-staking', { logs: false })

    stakecontract = contract
    NFT = nft
    accounts = await ethers.getSigners()
    editor = await accounts[1].getAddress()
    await nft.simpleMint(accounts[1].address)
    await nft.simpleMint(accounts[1].address)
    await nft.simpleMint(accounts[1].address)
    await nft
      .connect(accounts[1])
      .setApprovalForAll(stakecontract.address, true)
  })

  describe('# addStaker', () => {
    it('Should add a staker to an existing entity', async () => {
      const identity = new ZkIdentity(Strategy.MESSAGE, 'test')
      const identityCommitment = identity.genIdentityCommitment()

      const transaction = stakecontract
        .connect(accounts[1])
        .addDAOIdentity(entityIds[0], identityCommitment, 1)

      await expect(transaction)
        .to.emit(stakecontract, 'MemberAdded')
        .withArgs(
          entityIds[0],
          identityCommitment,
          '21535114724992190095497080437889044838904308549109546660414808669273607403748',
        )
    })

    it('Should return the correct number of whistleblowers of an entity', async () => {
      const size = await stakecontract.getSize(entityIds[0])

      expect(size).to.be.eq(1)
    })
  })
  describe('# verifyChallenge', () => {
    const wasmFilePath = './build/snark/semaphore.wasm'
    const finalZkeyPath = './build/snark/semaphore_final.zkey'

    const identity = new ZkIdentity(Strategy.MESSAGE, 'test')
    const identityCommitment = identity.genIdentityCommitment()
    const identity2 = new ZkIdentity(Strategy.MESSAGE, 'test2')
    const identityCommitment2 = identity.genIdentityCommitment()
    const merkleProof = createMerkleProof(
      [identityCommitment, BigInt(1), identityCommitment2],
      identityCommitment,
    )
    const challenge = 'challenge'

    before(async () => {
      let { contract, nft } = await run('deploy:nft-staking', { logs: false })

      stakecontract = contract
      NFT = nft
      accounts = await ethers.getSigners()
      editor = await accounts[1].getAddress()
      await NFT.simpleMint(accounts[1].address)
      await NFT.simpleMint(accounts[1].address)
      await NFT.simpleMint(accounts[1].address)
      await NFT.connect(accounts[1]).setApprovalForAll(
        stakecontract.address,
        true,
      )
      console.log(await NFT.balanceOf(accounts[1].address))
      await stakecontract
        .connect(accounts[1])
        .addDAOIdentity(entityIds[0], identityCommitment, 1)

      console.log('first !!!')
      await stakecontract
        .connect(accounts[1])
        .addDAOIdentity(entityIds[0], 1, 2)
      console.log('first !!!')
      await stakecontract
        .connect(accounts[1])
        .addDAOIdentity(entityIds[0], identityCommitment2, 3)
      console.log('first !!!')
    })
    it.only('can verify challenge proofs', async () => {
      /**
       *  groupId: bigint,
  identity: ZkIdentity,
  treeLeaves: bigint[],
  challenge: string,
       */
      let { proof, nullifierHash } = await generateIdentityProof(
        entityIds[0],
        identity,
        [identityCommitment, BigInt(1), identityCommitment2],
        challenge,
      )
      console.log(proof)
      /**
       *  string calldata challenge,
        uint256 nullifierHash,
        uint256 entityId,
        uint256[8] calldata proof
       */
      let r = await stakecontract.verifyIdentityChallenge(
        challenge,
        nullifierHash,
        entityIds[0],
        proof,
      )
      console.log(r)
      let result = await generateIdentityProof(
        entityIds[0],
        identity,
        [identityCommitment, BigInt(1), identityCommitment2],
        'newChallenge',
      )
      r = await stakecontract.verifyIdentityChallenge(
        'newChallenge',
        nullifierHash,
        entityIds[0],
        result.proof,
      )
      console.log(r)
    })
  })
})
