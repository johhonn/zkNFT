import { poseidon_gencontract as poseidonContract } from 'circomlibjs'
import { Contract } from 'ethers'
import { task, types } from 'hardhat/config'
import { TaskArguments, HardhatRuntimeEnvironment } from 'hardhat/types'
import { Strategy, ZkIdentity } from '@zk-kit/identity'
import { createMerkleProof, generateIdentityProofasHex } from '../test/utils'
task('generate:proof', 'register identities ')
  .addParam('stake', 'address of staking contract')
  .addParam('identity', 'identity secret')
  .addParam('entity', 'entity group to add')
  .addParam('challenge', 'the challenge string')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const [signer] = await hre.ethers.getSigners()
    const testStake = await hre.ethers.getContractAt(
      'testStake',
      taskArgs.stake,
    )
    const ZKID = new ZkIdentity(Strategy.MESSAGE, taskArgs.identity)

    const leaves = await testStake.getGroupCommitments(taskArgs.entity)
    const proof = await generateIdentityProofasHex(
      taskArgs.entity,
      ZKID,
      leaves,
      taskArgs.challenge,
    )
    console.log(proof)
  })
