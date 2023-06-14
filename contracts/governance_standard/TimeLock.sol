// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// We want to wait for a new vote to be "executed"
// bc the proposol might be something like: Everyone who holds the governenance token has to pay 5 tokens - which some users might not like.
// Give time to users to "get out" if they don't like a governance update

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
  // minDelay: How long you have to wait before executing
  //proposers: is the list of addresses that can propose -> everyone
  //executors: Who can execute when a proposal passes -> everyone
  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors,
    address admin
  ) TimelockController(minDelay, proposers, executors, admin) {} // had to change the zero address for admin back to a constructor variable, since when deploying it is needed to use the admin role to delegate the proposer and executor role
}
