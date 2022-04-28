import {
  generateMerkleProof,

} from '@zk-kit/protocols'
import { ethers } from 'ethers'
import { ZkIdentity } from '@zk-kit/identity'
import { Semaphore } from '@zk-kit/protocols'
const wasmFilePath = './build/snark/semaphore.wasm'
const finalZkeyPath = './build/snark/semaphore_final.zkey'
export const SnarkScalarField = BigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617',
)
export const TreeZeroNode =
  BigInt(ethers.utils.solidityKeccak256(['string'], ['Semaphore'])) %
  SnarkScalarField

export function createMerkleProof(leaves: bigint[], leaf: bigint) {
  return generateMerkleProof(20, TreeZeroNode, leaves, leaf)
}
//const encoded1 = new Buffer.from(s).toString('hex');

export async function generateIdentityProof(
  groupId: bigint,
  identity: ZkIdentity,
  treeLeaves: bigint[],
  challenge: string,
) {
  const identityCommit = identity.genIdentityCommitment()
  const merkleProof = createMerkleProof(treeLeaves, identityCommit)
  const nullifierHash = Semaphore.genNullifierHash(
    groupId,
    identity.getNullifier(),
  )
  const witness = Semaphore.genWitness(
    identity.getTrapdoor(),
    identity.getNullifier(),
    merkleProof,
    groupId,
    challenge,
  )
  const fullProof = await Semaphore.genProof(
    witness,
    wasmFilePath,
    finalZkeyPath,
  )
  const solidityProof = Semaphore.packToSolidityProof(fullProof.proof)
  return { proof: solidityProof, nullifierHash: nullifierHash }
}

export async function generateIdentityProofasHex(
  groupId: bigint,
  identity: ZkIdentity,
  treeLeaves: bigint[],
  challenge: string,
) {
  const identityCommit = identity.genIdentityCommitment()
  console.log(identityCommit)
  console.log(treeLeaves)
  const merkleProof = createMerkleProof(treeLeaves, identityCommit)
  const nullifierHash = Semaphore.genNullifierHash(
    groupId,
    identity.getNullifier(),
  )
  const witness = Semaphore.genWitness(
    identity.getTrapdoor(),
    identity.getNullifier(),
    merkleProof,
    groupId,
    challenge,
  )
  const fullProof = await Semaphore.genProof(
    witness,
    wasmFilePath,
    finalZkeyPath,
  )
  const solidityProof = Semaphore.packToSolidityProof(fullProof.proof)
  const params = {
    proof: solidityProof,
    nullifierHash: nullifierHash.toString(),
    entityId: groupId,
    challenge: challenge,
  }

  console.log(params)
  const hexified = new (Buffer as any).from(JSON.stringify(params)).toString(
    'hex',
  )
  return `0x${hexified}`
}

