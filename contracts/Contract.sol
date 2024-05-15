// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HashStorage {
    // Struct to represent your object
    struct MyObject {
        string name;
        string imageUrl;
        string symbol;
        address owner;
    }

    // Array to store objects
    MyObject[] private objects;

    // Event to log ownership change
    event OwnershipChanged(
        uint256 indexed objectId,
        address indexed oldOwner,
        address indexed newOwner
    );

    // Function to store an object in the array
    function storeObject(
        string memory _name,
        string memory _imageUrl,
        string memory _symbol,
        address _owner
    ) external {
        MyObject memory newObject = MyObject(_name, _imageUrl, _symbol, _owner);
        objects.push(newObject);
    }

    // Function to return all objects stored in the array
    function getAllObjects() external view returns (MyObject[] memory) {
        return objects;
    }

    // Function to change the owner of an object
    function changeOwner(uint256 objectId, address newOwner) external {
        require(objectId < objects.length, "Object ID is out of range");
        require(
            objects[objectId].owner == msg.sender,
            "Only the current owner can change the ownership"
        );

        address oldOwner = objects[objectId].owner;
        objects[objectId].owner = newOwner;

        emit OwnershipChanged(objectId, oldOwner, newOwner);
    }
}
