import { Strategy, ZkIdentity } from '@zk-kit/identity'
import { Semaphore } from '@zk-kit/protocols'
import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers, run } from 'hardhat'
import { SemaphoreWhistleblowing } from '../build/typechain'
import { createMerkleProof } from './utils'

describe('SemaphoreWhistleblowing', () => {
  let stakecontract: any
  let NFT: any
  let accounts: any[]
  let editor: string

  const entityIds = [BigInt(1), BigInt(2)]

  before(async () => {
    let { contract, nft } = await run('deploy:nft-staking', { logs: false })
    console.log(contract)
    stakecontract = contract
    NFT = nft
    accounts = await ethers.getSigners()
    editor = await accounts[1].getAddress()
    await nft.simpleMint(accounts[1].address)
    await nft
      .connect(accounts[1])
      .setApprovalForAll(stakecontract.address, true)
  })

  describe('# createEntity', () => {
    it('Should create an entity', async () => {
      const transaction = stakecontract.createEntity(
        entityIds[0],
        editor,
        NFT.address,
      )

      await expect(transaction)
        .to.emit(stakecontract, 'EntityCreated')
        .withArgs(entityIds[0], editor)
    })
  })

  describe('# addStaker', () => {
    it.only('Should add a whistleblower to an existing entity', async () => {
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
})
