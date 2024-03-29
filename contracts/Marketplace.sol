// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Marketplace {
  
    struct NFT_Item {
        uint256 itemId;
        address itemContract;
        uint256 tokenId;
        address payable minter;
        address payable owner;
        uint256 price;
        bool listed;
    }

  
    uint256 public itemID;
    address payable private owner;
    uint256 private commission;

   
    mapping(uint256 => NFT_Item) private idToItem;

  
    constructor() {
        owner = payable(msg.sender);
        commission = 0.5 ether;
        itemID = 1;
    }

   
    function getCommission() public view returns (uint256) {
        return commission;
    }


    function createItem(address itemContract, uint256 tokenId)
        public
        payable
        TokenOwnerOnly(itemContract, tokenId)
    {
        require(
            msg.value == commission,
            "The sent price must be equal to commision"
        );

        idToItem[itemID] = NFT_Item(
            itemID,
            itemContract,
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            0,
            false
        );
        itemID++;
    }

    function listItem(uint256 _itemId, uint256 price)
        public
        ItemExist(_itemId)
    {
        NFT_Item storage item = idToItem[_itemId];
        require(item.owner == msg.sender, "Only item owner can list");
        require(item.listed == false, "Item already listed");
        require(price > 0, "Price must be greater than 0");

        item.price = price;
        item.listed = true;
    }

    /*
        - this function is used to sell listed items on the marketplace
        - first check : if Item with given _itemId exist or not
        - second check : whether the item is listed on the marketplace or not
        - third check : if the buyer has sent enough money
        - if all conditions are true then transfer 99.5% amount to the owner of the item and 0.5% to the minter of the item
        - transfer the nft from the previous owner to the new onwer
        - change the owner and listing status of the item
     */
    function sellItem(address itemContract, uint256 _itemId)
        public
        payable
        ItemExist(_itemId)
    {
        NFT_Item storage item = idToItem[_itemId];

        require(item.listed == true, "Item is not listed on the market");

        uint256 price = item.price;
        require(msg.value == price, "Not enough value sent");

        uint256 ownerAmt = (995 * msg.value) / 1000;
        uint256 minterAmt = (5 * msg.value) / 1000;

        item.owner.transfer(ownerAmt);
        item.minter.transfer(minterAmt);

        uint256 tokenId = item.tokenId;

        ERC721(itemContract).transferFrom(item.owner, msg.sender, tokenId);

        item.owner = payable(msg.sender);
        item.listed = false;

        owner.transfer(commission);
    }

    /*
        - this function is used to get the items that are listed for sale in the marketplace
        - first find the number of such items
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if their listing status is true
        - return the struct array
    */
    function getMarketItems()
        public
        view
        returns (
            uint256[] memory,
            address[] memory,
            uint256[] memory,
            address payable[] memory,
            address payable[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        uint256 availiable = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].listed == true) {
                availiable++;
            }
        }

        uint256[] memory itemId = new uint256[](availiable);
        address[] memory itemContract = new address[](availiable);
        uint256[] memory tokenId = new uint256[](availiable);
        address payable[] memory minters = new address payable[](availiable);
        address payable[] memory owners = new address payable[](availiable);
        uint256[] memory price = new uint256[](availiable);
        bool[] memory listed = new bool[](availiable);
        uint256 curr = 0;
        for (uint256 i = 0; i < itemID; i++) {
            NFT_Item memory item = idToItem[i];
            if (item.listed == true) {
                itemId[curr] = item.itemId;
                itemContract[curr] = item.itemContract;
                tokenId[curr] = item.tokenId;
                minters[curr] = item.minter;
                owners[curr] = item.owner;
                price[curr] = item.price;
                listed[curr] = item.listed;
                curr++;
            }
        }
        return (itemId, itemContract, tokenId, minters, owners, price, listed);
    }

    /*
        - this function returns all the items bought by the current user that are not listed
        - iterater over all the NFT_Items and count the number of items which the user is the owner of but not the minter
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if given condition is true
        - return the struct array
     */
    function getBoughtItems()
        public
        view
        returns (
            uint256[] memory,
            address[] memory,
            uint256[] memory,
            address payable[] memory,
            address payable[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].owner == msg.sender && idToItem[i].listed == false) {
                count++;
            }
        }
        uint256[] memory itemId = new uint256[](count);
        address[] memory itemContract = new address[](count);
        uint256[] memory tokenId = new uint256[](count);
        address payable[] memory minters = new address payable[](count);
        address payable[] memory owners = new address payable[](count);
        uint256[] memory price = new uint256[](count);
        bool[] memory listed = new bool[](count);

        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            NFT_Item memory item = idToItem[i];
            if ((item.owner == msg.sender && item.listed == false)) {
                itemId[curr] = item.itemId;
                itemContract[curr] = item.itemContract;
                tokenId[curr] = item.tokenId;
                minters[curr] = item.minter;
                owners[curr] = item.owner;
                price[curr] = item.price;
                listed[curr] = item.listed;
                curr++;
            }
        }
        return (itemId, itemContract, tokenId, minters, owners, price, listed);
    }

    /*
        - this function returns all the items bought by the current user which are listed
        - iterater over all the NFT_Items and count the number of items which the user is the owner of but not the minter
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if given condition is true
        - return the struct array
     */
    function getListedItems()
        public
        view
        returns (
            uint256[] memory,
            address[] memory,
            uint256[] memory,
            address payable[] memory,
            address payable[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].owner == msg.sender && idToItem[i].listed == true) {
                count++;
            }
        }
        uint256[] memory itemId = new uint256[](count);
        address[] memory itemContract = new address[](count);
        uint256[] memory tokenId = new uint256[](count);
        address payable[] memory minters = new address payable[](count);
        address payable[] memory owners = new address payable[](count);
        uint256[] memory price = new uint256[](count);
        bool[] memory listed = new bool[](count);

        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            NFT_Item memory item = idToItem[i];
            if ((item.owner == msg.sender && item.listed == true)) {
                itemId[curr] = item.itemId;
                itemContract[curr] = item.itemContract;
                tokenId[curr] = item.tokenId;
                minters[curr] = item.minter;
                owners[curr] = item.owner;
                price[curr] = item.price;
                listed[curr] = item.listed;
                curr++;
            }
        }
        return (itemId, itemContract, tokenId, minters, owners, price, listed);
    }

    /*
        - this function returns all the items that are created by the current user
        - iterater over all the NFT_Items and count the number of items which the user is the minter
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if given condition is true
        - return the struct array
    */
    function getCreatedItems()
        public
        view
        returns (
            uint256[] memory,
            address[] memory,
            uint256[] memory,
            address payable[] memory,
            address payable[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].minter == msg.sender) {
                count++;
            }
        }
        uint256[] memory itemId = new uint256[](count);
        address[] memory itemContract = new address[](count);
        uint256[] memory tokenId = new uint256[](count);
        address payable[] memory minters = new address payable[](count);
        address payable[] memory owners = new address payable[](count);
        uint256[] memory price = new uint256[](count);
        bool[] memory listed = new bool[](count);

        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            NFT_Item memory item = idToItem[i];
            if (item.minter == msg.sender) {
                itemId[curr] = item.itemId;
                itemContract[curr] = item.itemContract;
                tokenId[curr] = item.tokenId;
                minters[curr] = item.minter;
                owners[curr] = item.owner;
                price[curr] = item.price;
                listed[curr] = item.listed;
                curr++;
            }
        }
        return (itemId, itemContract, tokenId, minters, owners, price, listed);
    }

    /*
        Modifiers
     */
    modifier ItemExist(uint256 _itemId) {
        require(idToItem[_itemId].itemId != 0, "No such item exist");
        _;
    }

    modifier TokenOwnerOnly(address itemContract, uint256 tokenId) {
        require(
            ERC721(itemContract).ownerOf(tokenId) == msg.sender,
            "Can only add your own token"
        );
        _;
    }
}
