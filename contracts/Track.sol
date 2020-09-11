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
        string state;
        string certstate;
    }

    // Store Products
    // Fetch Product
    mapping(uint => Product) public products;

    uint LotId;
    string state;
    string certstate;

    event addedEvent ( uint indexed _lotId);

    //Add_lot
    function addLots (string  memory _supplier_key, uint _lot_id, uint  _lots_number, string  memory _product_name, uint _product_number ) public onlyOwner {
        LotId ++;
        state = "Available";
        certstate = "Not certified yet";
        products[LotId] = Product(_supplier_key,LotId, _lot_id, _lots_number, _product_name, _product_number, state, certstate);
    }
    //command_lot
    function Sent (uint Id, uint lots_to_send) public {
        // require a valid Product
        require(Id > 0 && Id <= LotId && lots_to_send <= products[Id].lots_number);

        //Change status
        
        if (lots_to_send == products[Id].lots_number) {
             products[Id].state = "Sent";
        }
        else {
            LotId ++;
            state = "Sent";
            products[LotId] = Product(products[Id].supplier_key,LotId, products[Id].lot_id, lots_to_send, products[Id].product_name, products[Id].product_number, state, );
        
            products[Id].lots_number = products[Id].lots_number - lots_to_send;
        }
        
        // trigger voted event
        emit addedEvent (Id);
    }
    //Certify lot
    function Certify_lot (uint Id, string memory state) public {
        // require a valid Product
        require(Id > 0 && Id <= LotId && products[Id].certstate =! "Not Certified" );

        //Change status
        certstate = state;
        products[LotId] = Product(products[Id].supplier_key,LotId, products[Id].lot_id, products[Id].lots_number, products[Id].product_name, products[Id].product_number, state);
        
        // trigger voted event
        emit addedEvent (Id);
    }
}
