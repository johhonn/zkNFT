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
dotenvConfig({ path: resolve(__dirname, './.env') })
let PRIVATEKEY =
  process.env.PRIVATEKEY ||
  '0x0000000000000000000000000000000000000000000000000000000000000000'
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
      chainId: 588,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: 'http://localhost:8545',
      allowUnlimitedContractSize: true,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [PRIVATEKEY],
      gasPrice: 30000000,
      gas: 3000000,
    },
    metis: {
      url: `https://stardust.metis.io/?owner=588`,
      accounts: [PRIVATEKEY]
      // gasPrice: 30000000,
      // gas: 3000000,
    },
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
