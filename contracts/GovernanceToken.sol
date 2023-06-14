// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// ERC20Votes also uses checkpoints / snapshots
contract GovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000; // patrick mentioned that this isn't best practice

    constructor()
        ERC20("GovernanceToken", "GT")
        ERC20Permit("GovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
    }

    // The functions below are overrides required by Solidity. cGPT: "when a contract inherits from multiple contracts that each define a function of the same name, and at least one of those functions is virtual, then the inheriting contract must override that function."

    // What these functions actually do is: Anytime we transfer a token we want to make sure to call this function to make sure that the snapshots are updated -> we want to know how many people have how many tokens at each block
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._burn(account, amount);
    }

    // The functions below are overrides required by solidity
}
