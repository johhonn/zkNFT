//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "../base/SemaphoreCore.sol";
import "../base/SemaphoreGroups.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract testStake is SemaphoreCore, SemaphoreGroups, ERC721Holder {
    /// @dev Gets an editor address and return their entity.
    mapping(address => uint256) private entities;
    mapping(uint256 => uint256[]) public commitments;
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

    function getGroupCommitments(uint256 g)
        public
        view
        returns (uint256[] memory)
    {
        return commitments[g];
    }

    /// @dev See {ISemaphoreWhistleblowing-createEntity}.
    function createEntity(uint256 entityId, address editor) public {
        _createGroup(entityId, 20);

        entities[editor] = entityId;

        emit EntityCreated(entityId, editor);
    }

    function addDAOIdentity(uint256 entityId, uint256 identityCommitment)
        public
    {
        _addMember(entityId, identityCommitment);
        commitments[entityId].push(identityCommitment);
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
