import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre // getNamedAccounts is coming from our hardhat config
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("Deploying Governance Token...")
  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // waitConfrimations:
  })
  log(`Deployed governance token to address ${governanceToken.address}`)
  // verify

  await delegate(governanceToken.address, deployer)
  log("Delegated!")
}

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
  const tx = await governanceToken.delegate(delegatedAccount)
  await tx.wait(1)
  console.log(`checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

export default deployGovernanceToken
