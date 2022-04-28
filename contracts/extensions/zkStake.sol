//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "../base/SemaphoreCore.sol";
import "../base/SemaphoreGroups.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract zkStake is SemaphoreCore, SemaphoreGroups, ERC721Holder {
    /// @dev Gets an editor address and return their entity.
    mapping(address => uint256) private entities;
    mapping(uint256 => address) public membershipTokens;
    mapping(uint256 => uint256) public commitmentNFTs;
    mapping(uint256 => uint256[]) public commitments;
    event EntityCreated(uint256 entityId, address indexed editor);
    address public verifier;
    /// @dev Checks if the editor is the transaction sender.
    /// @param entityId: Id of the entity.
    modifier onlyEditor(uint256 entityId) {
        require(
            entityId == entities[_msgSender()],
            "SemaphoreWhistleblowing: caller is not the editor"
        );
        _;
    }

    constructor(address v) {
        verifier = v;
    }

    /// @dev See {ISemaphoreWhistleblowing-createEntity}.
    function createEntity(
        uint256 entityId,
        address editor,
        address token
    ) public {
        _createGroup(entityId, 0, 20);

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
        commitments[entityId].push(identityCommitment);
        commitmentNFTs[entityId] = id;
        _addMember(entityId, identityCommitment);
    }

    /// @dev See {ISemaphoreWhistleblowing-removeWhistleblower}.
    function removeDAOIdentity(
        uint256 entityId,
        uint256 identityCommitment,
        uint256[] calldata proofSiblings,
        uint8[] calldata proofPathIndices,
        address receiver
    ) public onlyEditor(entityId) {
        _removeMember(
            entityId,
            identityCommitment,
            proofSiblings,
            proofPathIndices
        );
        IERC721(membershipTokens[entityId]).safeTransferFrom(
            address(this),
            receiver,
            commitmentNFTs[entityId]
        );
    }

    function verifyIdentityChallenge(
        bytes32 challenge,
        uint256 nullifierHash,
        uint256 entityId,
        uint256[8] calldata proof
    ) public view returns (bool) {
        bool res = _isValidProof(
            challenge,
            groups[entityId].root,
            nullifierHash,
            entityId,
            proof,
            IVerifier(verifier)
        );
        return res;
    }
}
