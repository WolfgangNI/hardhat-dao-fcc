import { VOTING_PERIOD, developmentChains, proposalsFile } from "../helper-hardhat-config"
import { ethers, network } from "hardhat";
import * as fs from "fs"
import { moveBlocks } from "../utils/move-blocks";


const index = 0

async function main(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    const proposalId = proposals[network.config.chainId!][proposalIndex]
    // 0 = Against, 1 = For, 2 = Abstain
    const voteWay = 1
    const governor = await ethers.getContract("GovernorContract")
    const reason = "I think the issuer is a handsome fella"
    const voteTxResponse = await governor.castVoteWithReason(
        proposalId,
        voteWay,
        reason
    )
    await voteTxResponse.wait(1)
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Voted! Ready to go!")
    // in the governor contract there is a state function which we can check for the ProposalState. Succeeded would be 4 since in the IGovernor.sol that is the number in the enum

}

main(index) 
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })