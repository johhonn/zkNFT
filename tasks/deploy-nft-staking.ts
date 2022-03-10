import { poseidon_gencontract as poseidonContract } from 'circomlibjs'
import { Contract } from 'ethers'
import { task, types } from 'hardhat/config'

task('deploy:nft-staking', 'Deploy a SemaphoreStaking contract')
  .addOptionalParam<boolean>('logs', 'Print the logs', true, types.boolean)
  .setAction(
    async ({ logs }, { ethers }): Promise<Object> => {
      const poseidonABI = poseidonContract.generateABI(2)
      const poseidonBytecode = poseidonContract.createCode(2)

      const [signer] = await ethers.getSigners()

      const PoseidonLibFactory = new ethers.ContractFactory(
        poseidonABI,
        poseidonBytecode,
        signer,
      )
      const poseidonLib = await PoseidonLibFactory.deploy()

      await poseidonLib.deployed()

      logs &&
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

      logs &&
        console.log(
          `IncrementalBinaryTree library has been deployed to: ${incrementalBinaryTreeLib.address}`,
        )

      const ContractFactory = await ethers.getContractFactory('zkStake', {
        libraries: {
          IncrementalBinaryTree: incrementalBinaryTreeLib.address,
        },
      })
      const NFTFactory = await ethers.getContractFactory('stakingToken')
      const contract = await ContractFactory.deploy()
      const nft = await NFTFactory.deploy('accessToken', 'AT', 'testuri')
      await nft.deployed()
      await contract.deployed()

      logs &&
        console.log(
          `SemaphoreStaking contract has been deployed to: ${contract.address}`,
        )
      console.log(`the nft staking address is ${nft.address}`)
      let call = await contract.createEntity(1, signer.address, nft.address)
      await call.wait()
      console.log('entity has been created via nft')
      return { contract: contract, nft: nft }
    },
  )
