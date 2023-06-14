import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import { HardhatUserConfig } from "hardhat/config"
// import "hardhat-deploy-ethers" // added this to try to solve the getContractAt error

require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.18",
// };

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // (Patrick said that this is used for tests)
      chainId: 31337,
      allowUnlimitedContractSize: true, // workaround bc "trying to deploy a contract whose code is too large" Error when deploying GovernorContracts
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
  },
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
}

export default config
