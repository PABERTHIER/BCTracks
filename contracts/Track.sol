pragma solidity ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

import "./Ownable.sol";
import "./SafeMath.sol";

contract Track is Ownable {

using SafeMath for uint256;

    // Model a Candidate
    struct Product {
        string supplier_key;
        uint256 id;
        uint lot_id;
        uint lots_number;
        string product_name;
        uint product_number;
    }

    // Store Products
    // Fetch Product
    mapping(uint => Product) public products;
    // Store Product Count
    uint public LotId;

    // voted event
    event addedEvent ( uint indexed _lotId);

    function addProduct (string  memory _supplier_key, uint _lot_id, uint  _lots_number, string  memory _product_name, uint _product_number ) public onlyOwner {
        LotId ++;
        products[LotId] = Product(_supplier_key,LotId, _lot_id, _lots_number, _product_name, _product_number);
    }

    function vote (uint _lotId) public {
        
        // require a valid Product
        require(_lotId > 0 && _lotId <= LotId);

        // trigger voted event
        emit addedEvent (_lotId);
    }
}
