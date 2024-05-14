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
}
