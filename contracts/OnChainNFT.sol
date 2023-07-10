// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract onChainNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    bool public paused = false;
    mapping(uint256 => Word) public wordsToTokenId;
    uint256 public stringLimit = 45;

    struct Word {
        string name;
        string description;
        string bgHue;
        string textHue;
        string blobHue;
        string value;
    }

    //string[] public wordValues = ["accomplish", "accepted", "absolutely", "admire", "achievment", "active"];

    constructor() ERC721("onChainNFT", "OCN") {}

    // public
    function mint(string memory _userText) public payable {
        uint256 supply = totalSupply();
        bytes memory strBytes = bytes(_userText);
        require(strBytes.length <= stringLimit, "String input exceeds limit.");
        require(exists(_userText) != true, "String already exists!");

        Word memory newWord = Word(
            string(abi.encodePacked("NFT", uint256(supply + 1).toString())),
            "This is our on-chain NFT",
            randomNum(360, block.difficulty, supply).toString(),
            randomNum(360, block.timestamp, supply).toString(),
            randomNum(360, block.number, supply).toString(),
            _userText
        );

        if (msg.sender != owner()) {
            require(msg.value >= 0.005 ether);
        }

        wordsToTokenId[supply + 1] = newWord; //Add word to mapping @tokenId
        _safeMint(msg.sender, supply + 1);
    }

    function exists(string memory _text) public view returns (bool) {
        bool result = false;
        //totalSupply function starts at 1, as does out wordToTokenId mapping
        for (uint256 i = 1; i <= totalSupply(); i++) {
            string memory text = wordsToTokenId[i].value;
            if (
                keccak256(abi.encodePacked(text)) ==
                keccak256(abi.encodePacked(_text))
            ) {
                result = true;
            }
        }
        return result;
    }

    function randomNum(
        uint256 _mod,
        uint256 _seed,
        uint256 _salt
    ) public view returns (uint256) {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, _seed, _salt)
            )
        ) % _mod;
        return num;
    }

    function buildImage(uint256 _tokenId) private view returns (string memory) {
        Word memory currentWord = wordsToTokenId[_tokenId];
        string memory random = randomNum(360, 3, 3).toString();
        uint256 _supply = totalSupply();
    
        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
                        '<defs><pattern id="a" patternUnits="userSpaceOnUse" width="70" height="8" >',
                        '<rect x="0" y="0" width="100%" height="100%" fill="hsl(',
                        currentWord.bgHue,
                        ',50%,25%,0.5)"/>',
                        '<path d="M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2c9.272 0 14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6 44.272-6 49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14c-9.272 0-14.215 5.258-18.7 10.339C11.918 1.306 8.353 6-.02 6.002" stroke-width="1" stroke="hsla(60, 75%, 75%, 1)" fill="none"/>',
                        '</pattern></defs>',
                        '<rect width="100%" height="100%" fill="url(#a)"/>',
                        '<rect width="100%" height="20%" opacity="0.4" fill="hsl(',
                        currentWord.textHue,
                        ',100%,80%)"/>',
                        '<rect width="100%" height="30%" x="0%" y="70%" opacity="0.4" fill="hsl(',
                        currentWord.blobHue,
                        ',100%,80%)"/>',
                        '<text x="5%" y="13.5%" font-size="52" fill="black" opacity="0.8">#',
                        _tokenId.toString(),
                        "</text>",
                        '<text x="15%" y="13.5%" font-size="26" fill="black" opacity="0.8">',
                        '/',
                        _supply.toString(),
                        "</text>",
                        '<text x="2%" y="74%" font-size="18" fill="black" font-family="Courier New" opacity="0.7">',
                         currentWord.value,
                        '</text>',
                        '<text x="2%" y="97%" font-size="18" fill="black" opacity="0.8" font-family="Courier New">',
                        'Series  ', currentWord.bgHue,
                        '    Collection  ', currentWord.textHue,
                        '    Edition  ', currentWord.blobHue,
                        '</text>'
                        "</svg>"
                    )
                )
            );
    }

    function buildMetadata(uint256 _tokenId)
        private
        view
        returns (string memory)
    {
        Word memory currentWord = wordsToTokenId[_tokenId];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                currentWord.name,
                                '", "description":"',
                                currentWord.description,
                                '", "image": "',
                                "data:image/svg+xml;base64,",
                                buildImage(_tokenId),
                                '", "attributes": ',
                                "[",
                                '{"trait_type": "Strength",',
                                '"value":"',
                                currentWord.textHue,
                                '"}',
                                "]",
                                 "[",
                                '{"trait_type": "Health",',
                                '"value":"',
                                currentWord.bgHue,
                                '"}',
                                "]",
                                "[",
                                '{"trait_type": "Wealth",',
                                '"value":"',
                                currentWord.blobHue,
                                '"}',
                                "]",
                                "}"
                            )
                        )
                    )
                )
            );
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return buildMetadata(_tokenId);
    }

    //only owner
    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }
}