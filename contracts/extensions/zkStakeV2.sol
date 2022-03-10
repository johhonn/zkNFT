//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "../base/SemaphoreCore.sol";
import "../base/SemaphoreGroups.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract zkStakeV2 is
    SemaphoreCore,
    SemaphoreGroups,
    ERC721Holder,
    ERC1155Holder
{
    using SafeERC20 for IERC20;
    mapping(address => uint256) private entities;
    mapping(uint256 => uint256[]) public commitments;
    mapping(uint256 => mapping(uint256 => uint256)) public commitIndex;
    mapping(uint256 => address) public membershipTokens;
    mapping(uint256 => uint256) public commitmentNFTs;
    mapping(uint256 => STAKE_TYPE) public entityTokenInterface;
    mapping(uint256 => uint256) public stakeAmounts;
    enum STAKE_TYPE {
        ERC721,
        ERC1155,
        ERC20
    }

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
    function createEntity(
        uint256 entityId,
        address editor,
        address token,
        STAKE_TYPE option,
        uint256 value
    ) public {
        _createGroup(entityId, 20);
        entityTokenInterface[entityId] = option;
        if (option == STAKE_TYPE.ERC721) {
            stakeAmounts[entityId] = 1;
        } else {
            stakeAmounts[entityId] = value;
        }
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
        if (entityTokenInterface[entityId] == STAKE_TYPE.ERC721) {
            IERC721(membershipTokens[entityId]).safeTransferFrom(
                msg.sender,
                address(this),
                id
            );
        } else if (entityTokenInterface[entityId] == STAKE_TYPE.ERC1155) {
            IERC1155(membershipTokens[entityId]).safeTransferFrom(
                msg.sender,
                address(this),
                id,
                stakeAmounts[entityId],
                "0x00"
            );
        } else if (entityTokenInterface[entityId] == STAKE_TYPE.ERC20) {
            IERC20(membershipTokens[entityId]).safeTransferFrom(
                msg.sender,
                address(this),
                stakeAmounts[entityId]
            );
        }

        uint256 index = commitments[entityId].length;

        commitments[entityId].push(identityCommitment);
        //commitments[entityId][index] = identityCommitment;
        commitIndex[entityId][identityCommitment] = index;
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
        if (entityTokenInterface[entityId] == STAKE_TYPE.ERC721) {
            IERC721(membershipTokens[entityId]).safeTransferFrom(
                address(this),
                receiver,
                commitmentNFTs[entityId]
            );
        } else if (entityTokenInterface[entityId] == STAKE_TYPE.ERC1155) {
            IERC1155(membershipTokens[entityId]).safeTransferFrom(
                address(this),
                receiver,
                commitmentNFTs[entityId],
                stakeAmounts[entityId],
                "0x00"
            );
        } else if (entityTokenInterface[entityId] == STAKE_TYPE.ERC20) {
            IERC20(membershipTokens[entityId]).safeTransferFrom(
                receiver,
                address(this),
                stakeAmounts[entityId]
            );
        }
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
