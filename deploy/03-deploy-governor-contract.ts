import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } from "../helper-hardhat-config"

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre // getNamedAccounts is coming from our hardhat config
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const governanceToken = await get("GovernanceToken")
  const timeLock = await get("TimeLock")
  log("Deploying GovernorContract ...")
  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
    log: true,
    // waitConfrimations:
  })
  log(`Deployed GovernorContract to address ${governorContract.address}`)
  // verify
}

export default deployGovernorContract
