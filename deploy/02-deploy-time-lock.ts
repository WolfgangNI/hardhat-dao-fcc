import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { MIN_DELAY } from "../helper-hardhat-config"

const deployTimelock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre // getNamedAccounts is coming from our hardhat config
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("Deploying TimeLock ...")
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], [], deployer],
    log: true,
    // waitConfrimations:
  })
  log(`Deployed TimeLock to address ${timeLock.address}`)
  // verify
}

export default deployTimelock
