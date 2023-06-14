import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"
import { ADDRESS_ZERO } from "../helper-hardhat-config"

const setupGovernanceContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre // getNamedAccounts is coming from our hardhat config
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()

  const timeLock = await ethers.getContract("TimeLock", deployer)
  const govenorContract = await ethers.getContract("GovernorContract", deployer)

  log("Setting up roles...")
  const proposerRole = await timeLock.PROPOSER_ROLE() // !!! these are functions, right? i cant find them in the code tho...
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const timeLockAdminRole = timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, govenorContract.address)
  await proposerTx.wait(1)

  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO) // this means everybody can execute !!! patrick sais that but i didnt find that in the code...
  await executorTx.wait(1)

  const revokeTx = await timeLock.revokeRole(timeLockAdminRole, deployer)
  await revokeTx.wait(1)
  log("Roles have been set up")
}

export default setupGovernanceContract
