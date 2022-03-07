import { poseidon_gencontract as poseidonContract } from 'circomlibjs'
import { Contract } from 'ethers'
import { task, types } from 'hardhat/config'
import { TaskArguments } from 'hardhat/types'
import { Strategy, ZkIdentity } from '@zk-kit/identity'

task('register:identities', 'register identities ')
  .addParam('stake', 'address of staking contract')
  .addParam('identity', 'identity to register')
  .addParam('entity', 'entity group to add')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const [signer] = await hre.ethers.getSigners()
    const testStake = await hre.ethers.getContractFactory('testStake')
    const instance = await testStake.attach(taskArgs.stake)
    const r = await instance.addDAOIdentity(taskArgs.entity, taskArgs.identity)
    await r.wait()
  })
