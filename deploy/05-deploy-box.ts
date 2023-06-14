import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre // getNamedAccounts is coming from our hardhat config
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  log("Deploying GovernorContract ...")
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // waitConfrimations:
  })
  log(`Deployed Box to address ${box.address}`)
  // verify

  

  const timeLock = await ethers.getContract("TimeLock")
  const boxContract = await ethers.getContract("Box")
  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
  await transferOwnerTx.wait(1)
  log(`Ownership transfered from ${deployer} to ${timeLock.address}!`)
}

export default deployBox
