import { poseidon_gencontract as poseidonContract } from 'circomlibjs'
import { Contract } from 'ethers'
import { task, types } from 'hardhat/config'

task('deploy:test-staking', 'Deploy a SemaphoreStaking contract')
  .addOptionalParam<boolean>('logs', 'Print the logs', true, types.boolean)
  .setAction(
    async ({ logs }, { ethers }): Promise<Object> => {
      const poseidonABI = poseidonContract.generateABI(2)
      const poseidonBytecode = poseidonContract.createCode(2)

      const [signer] = await ethers.getSigners()
      const NFTFactory = await ethers.getContractFactory('stakingToken')
      const nft = await NFTFactory.deploy('test token', 'test', 'testuri')
      await nft.deployed()
      console.log(`the nft staking address is ${nft.address}`)
      const PoseidonLibFactory = new ethers.ContractFactory(
        poseidonABI,
        poseidonBytecode,
        signer,
      )
      console.log('first deploy')
      const poseidonLib = await PoseidonLibFactory.deploy()
      console.log('deployed')
      await poseidonLib.deployed()

      console.log(
        `Poseidon library has been deployed to: ${poseidonLib.address}`,
      )

      const IncrementalBinaryTreeLibFactory = await ethers.getContractFactory(
        'IncrementalBinaryTree',
        {
          libraries: {
            PoseidonT3: poseidonLib.address,
          },
        },
      )
      const incrementalBinaryTreeLib = await IncrementalBinaryTreeLibFactory.deploy()

      await incrementalBinaryTreeLib.deployed()

      console.log(
        `IncrementalBinaryTree library has been deployed to: ${incrementalBinaryTreeLib.address}`,
      )

      const ContractFactory = await ethers.getContractFactory('testStake', {
        libraries: {
          IncrementalBinaryTree: incrementalBinaryTreeLib.address,
        },
      })

      const contract = await ContractFactory.deploy()

      await contract.deployed()

      console.log(
        `SemaphoreStaking contract has been deployed to: ${contract.address}`,
      )

      let call = await contract.createEntity(1, signer.address)
      await call.wait()
      console.log('entity has been created via nft')
      return { contract: contract, nft: nft }
    },
  )
