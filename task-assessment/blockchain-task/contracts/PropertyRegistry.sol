// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PropertyRegistry {
    struct Property {
        uint256 id;
        string title;
        string location;
        uint256 priceUSD;
        address owner;
        bool isActive;
    }

    uint256 private _nextId = 1;
    mapping(uint256 => Property) private _properties;
    uint256[] private _ids;

    event PropertyListed(uint256 indexed id, string title, address indexed owner);
    event PropertyUpdated(uint256 indexed id, uint256 newPrice);
    event PropertyRemoved(uint256 indexed id);

    function listProperty(string calldata title, string calldata location, uint256 priceUSD) external returns (uint256) {
        uint256 id = _nextId++;
        _properties[id] = Property(id, title, location, priceUSD, msg.sender, true);
        _ids.push(id);
        emit PropertyListed(id, title, msg.sender);
        return id;
    }

    function getProperty(uint256 id) external view returns (Property memory) {
        require(_properties[id].id != 0, "Property not found");
        return _properties[id];
    }

    function getAllProperties() external view returns (Property[] memory) {
        Property[] memory result = new Property[](_ids.length);
        for (uint256 i = 0; i < _ids.length; i++) {
            result[i] = _properties[_ids[i]];
        }
        return result;
    }

    function updatePrice(uint256 id, uint256 newPrice) external {
        require(_properties[id].owner == msg.sender, "Not the owner");
        _properties[id].priceUSD = newPrice;
        emit PropertyUpdated(id, newPrice);
    }

    function removeProperty(uint256 id) external {
        require(_properties[id].owner == msg.sender, "Not the owner");
        _properties[id].isActive = false;
        emit PropertyRemoved(id);
    }

    function totalProperties() external view returns (uint256) {
        return _ids.length;
    }
}
