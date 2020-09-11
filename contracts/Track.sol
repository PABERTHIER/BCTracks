pragma solidity ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

import "./Ownable.sol";
import "./SafeMath.sol";

contract Track is Ownable {

using SafeMath for uint256;

    // Model a Candidate
    struct Product {
        address payable supplier_key;
        address payable owner_key;
        address payable [] delivery_key;
        uint256 id;
        uint lot_id;
        uint lots_number;
        string product_name;
        uint product_number;
        string state;
    }

    // Store Products
    // Fetch Product
    mapping(uint => Product) public products;

    uint LotId;
    string state;

    // voted event
    event addedEvent ( uint indexed _lotId);
    event purposeEvent ( uint indexed _lotId, address payable _delivery_key);
    event acceptedEvent ( uint indexed _lotId, address payable _delivery_key);

    function addProduct (address payable _supplier_key, uint _lot_id, uint  _lots_number, string  memory _product_name, uint _product_number ) public onlyOwner {
        LotId ++;
        state = "Available";
        address payable [] memory delivery_keys;
        products[LotId] = Product(_supplier_key, _supplier_key, delivery_keys, LotId, _lot_id, _lots_number, _product_name, _product_number, state);
    }

    function Sent (uint Id, uint lots_to_send) public {
        // require a valid Product
        require(Id > 0 && Id <= LotId && lots_to_send <= products[Id].lots_number);

        //Change status
        
        if (lots_to_send == products[Id].lots_number) {
             products[Id].state = "On Preparation";
        }
        else {
            LotId ++;
            state = "On Preparation";
            products[LotId] = Product(products[Id].supplier_key, products[Id].owner_key, products[Id].delivery_key, LotId, products[Id].lot_id, lots_to_send, products[Id].product_name, products[Id].product_number, state);
        
            products[Id].lots_number = products[Id].lots_number - lots_to_send;
        }
        
        // trigger voted event
        emit addedEvent (Id);
    }

    function Purpose_takeOver_Lot (uint _lot_Id) public {
        // require a valid Product
        require(_lot_Id > 0 && _lot_Id <= LotId && keccak256(abi.encodePacked(products[_lot_Id].state)) ==  keccak256("On Preparation"));

        //Add a delivery purpose
        products[_lot_Id].delivery_key.push(msg.sender);
        
        // trigger purpose event
        emit purposeEvent(_lot_Id, msg.sender);
    }

    function Accepted_takeOver_Lot (uint _lot_Id, address payable _delivery_key) public {
        // require a valid Product
        require(_lot_Id > 0 && _lot_Id <= LotId && keccak256(abi.encodePacked(products[_lot_Id].state)) ==  keccak256("On Preparation"));

        // require a valid delivery key
        bool is_implemented = false;
        for(uint increment = 0; increment < products[_lot_Id].delivery_key.length; increment++){
            if(products[_lot_Id].delivery_key[increment] == _delivery_key){
                is_implemented = true;
            }
        }
        require(is_implemented);

        // update status
        products[_lot_Id].delivery_key = [_delivery_key];
        products[_lot_Id].state = "Sent";
        
        // trigger purpose event
        emit purposeEvent(_lot_Id, products[_lot_Id].delivery_key[0]);
    }

}