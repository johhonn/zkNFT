import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract stakingToken is ERC721Enumerable {
    using Strings for string;
    string base;
    uint256 public totalTokensMinted;

    constructor(
        string memory name,
        string memory symbol,
        string memory uri
    ) ERC721(name, symbol) {
        base = uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return base;
    }

    function tokenURI(uint256 _id)
        public
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked(_baseURI(), Strings.toString(_id)));
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
        totalTokensMinted += 1;
    }

    function simpleMint(address to) public {
        totalTokensMinted += 1;
        _mint(to, totalTokensMinted);
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public {
        _safeMint(to, tokenId, _data);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }
}
