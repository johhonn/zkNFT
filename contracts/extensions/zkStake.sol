//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "../base/SemaphoreCore.sol";
import "../base/SemaphoreGroups.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/// @title Semaphore whistleblowing contract.
/// @dev The following code allows you to create entities for whistleblowers (e.g. non-profit
/// organization, newspaper) and to allow them to publish news leaks anonymously.
/// Leaks can be IPFS hashes, permanent links or other kinds of reference.
contract zkStake is SemaphoreCore, SemaphoreGroups {
    /// @dev Gets an editor address and return their entity.
    mapping(address => uint256) private entities;
    mapping(uint256 => address) public membershipTokens;
    event EntityCreated(uint256 entityId, address indexed editor);
    /// @dev Checks if the editor is the transaction sender.
    /// @param entityId: Id of the entity.
    modifier onlyEditor(uint256 entityId) {
        require(
            entityId == entities[_msgSender()],
            "SemaphoreWhistleblowing: caller is not the editor"
        );
        _;
    }

    /// @dev See {ISemaphoreWhistleblowing-createEntity}.
    function createEntity(
        uint256 entityId,
        address editor,
        address token
    ) public {
        _createGroup(entityId, 20);

        entities[editor] = entityId;
        membershipTokens[entityId] = token;
        emit EntityCreated(entityId, editor);
    }

    /// @dev See {ISemaphoreWhistleblowing-addWhistleblower}.
    function addDAOIdentity(
        uint256 entityId,
        uint256 identityCommitment,
        uint256 id
    ) public {
        IERC721(membershipTokens[entityId]).safeTransferFrom(
            msg.sender,
            address(this),
            id
        );
        _addMember(entityId, identityCommitment);
    }

    /// @dev See {ISemaphoreWhistleblowing-removeWhistleblower}.
    function removeDAOIdentity(
        uint256 entityId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices
    ) public onlyEditor(entityId) {
        _removeMember(
            entityId,
            identityCommitment,
            proofSiblings,
            proofPathIndices
        );
    }

    function verifyIdentityChallenge(
        string calldata challenge,
        uint256 nullifierHash,
        uint256 entityId,
        uint256[8] calldata proof
    ) public view returns (bool) {
        bool res = _isValidProof(
            challenge,
            groups[entityId].root,
            nullifierHash,
            entityId,
            proof
        );
        return res;
    }
}
