// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BTECCertificate is ERC721 {
    uint256 private _tokenId;

    constructor() ERC721("BTEC Certificate", "BTEC") {}

    function issueCertificate(address recipient) external returns (uint256) {
        _tokenId += 1;
        _mint(recipient, _tokenId);
        return _tokenId;
    }
}
