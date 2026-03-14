// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EduverseIdentity {
    struct UserProfile {
        string name;
        string email;
        bool isActive;
    }

    mapping(address => UserProfile) public profiles;

    function registerIdentity(address user, string memory name, string memory email) external {
        profiles[user] = UserProfile({name: name, email: email, isActive: true});
    }
}
