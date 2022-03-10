import { poseidon_gencontract as poseidonContract } from 'circomlibjs'
import { Contract } from 'ethers'
import { task, types } from 'hardhat/config'
import { TaskArguments, HardhatRuntimeEnvironment } from 'hardhat/types'
import { Strategy, ZkIdentity } from '@zk-kit/identity'

task('register:identity', 'register identities ')
  .addParam('stake', 'address of staking contract')
  .addParam('identity', 'identity to register')
  .addParam('entity', 'entity group to add')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const [signer] = await hre.ethers.getSigners()
    const testStake = await hre.ethers.getContractAt(
      'testStake',
      taskArgs.stake,
    )
    //const instance = await testStake.attach(taskArgs.stake)
    const ZKID = new ZkIdentity(Strategy.MESSAGE, taskArgs.identity)
    const commitment = ZKID.genIdentityCommitment()
    const r = await testStake.addDAOIdentity(
      parseInt(taskArgs.entity),
      commitment,
    )
    await r.wait()
    console.log(r)
  })
