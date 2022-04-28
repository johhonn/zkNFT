import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import { config as dotenvConfig } from 'dotenv'
import 'hardhat-gas-reporter'
import { HardhatUserConfig } from 'hardhat/config'
import { resolve } from 'path'
import 'solidity-coverage'
import { config } from './package.json'
import './tasks/deploy-semaphore-voting'
import './tasks/deploy-semaphore-whistleblowing'
import './tasks/deploy-nft-staking'
import './tasks/deploy-test-staking'
import './tasks/register-Identity'
import './tasks/register-nft-identity'
import './tasks/generate-proof'
dotenvConfig({ path: resolve(__dirname, './.env') })
let PRIVATEKEY =
  process.env.PRIVATEKEY ||
  '0x0000000000000000000000000000000000000000000000000000000000000001'

const hardhatConfig: HardhatUserConfig = {
  solidity: config.solidity,
  paths: {
    sources: config.paths.contracts,
    tests: config.paths.tests,
    cache: config.paths.cache,
    artifacts: config.paths.build.contracts,
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: 'http://localhost:8545',
      allowUnlimitedContractSize: true,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [PRIVATEKEY],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [PRIVATEKEY],
    },
    harmony_testnet: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [PRIVATEKEY],
    },
    harmony_mainnet: { url: `https://api.harmony.one`, accounts: [PRIVATEKEY] },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS === 'true',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  typechain: {
    outDir: config.paths.build.typechain,
    target: 'ethers-v5',
  },
}

export default hardhatConfig
