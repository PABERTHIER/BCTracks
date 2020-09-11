pragma solidity ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

import "./Ownable.sol";
import "./SafeMath.sol";

contract Track is Ownable {

using SafeMath for uint256;

    // Model a Bundle
    struct Product {
        address payable supplier_key;
        address payable owner_key;
        address payable delivery_key;
        uint256 id;
        uint bundle_id;
        uint bundles_number;
        string product_name;
        uint product_number;
        string state;
        string certstate;
    }

    // Store Products
    // Fetch Product
    mapping(uint => Product) public products;

    uint total_bundelId;

    event addedEvent ( uint indexed _bundleId);
    event boughtEvent ( uint indexed _bundleId, address payable _new_owner);
    event submitTakeOverEvent ( uint indexed _bundleId, address payable _delivery_key);
    event validateTakeOverEvent ( uint indexed _bundleId, address payable _delivery_key);

    function Add_Bundle (uint _bundle_id, uint  _bundles_nulber, string  memory _product_name, uint _product_number ) public onlyOwner {
        total_bundelId ++;
        string memory state = "Available";
        string memory certstate = "Not Certified";
        address payable _none_delivery = address(0);
        address payable _supplier_key = msg.sender;
        products[total_bundelId] = Product(_supplier_key, _supplier_key, _none_delivery, total_bundelId, _bundle_id, _bundles_nulber, _product_name, _product_number, state, certstate);
        emit addedEvent (total_bundelId);
    }
 
    function Buy_Bundle (uint Id, uint _bundles_to_send) public {
        // require a valid Product
        require(Id > 0 && Id <= total_bundelId && _bundles_to_send <= products[Id].bundles_number);

        //Change status
        if (_bundles_to_send == products[Id].bundles_number) {
            products[Id].state = "In Process";
            products[Id].owner_key = msg.sender;
        }
        else {
            total_bundelId ++;
            string memory state = "In Process";
            products[total_bundelId] = Product(products[Id].supplier_key, products[Id].owner_key, products[Id].delivery_key, total_bundelId, products[Id].bundle_id, _bundles_to_send, products[Id].product_name, products[Id].product_number, state, products[Id].certstate);
            products[Id].bundles_number = products[Id].bundles_number - _bundles_to_send;
            products[Id].owner_key = msg.sender;
        }

        // trigger bought event
        emit boughtEvent (Id, products[Id].owner_key);
    }
    function Submit_takeOver_Bundle (uint _bundle_id, address payable _delivery_key) public {
        // require a valid Product
        require(_bundle_id > 0 && _bundle_id <= total_bundelId && keccak256(abi.encodePacked(products[_bundle_id].state)) ==  keccak256("In Process"));

        //Add a delivery purpose
        products[_bundle_id].delivery_key = _delivery_key;
        
        // trigger purpose event
        emit submitTakeOverEvent(_bundle_id, _delivery_key);
    }

    function Accepted_takeOver_Bundle (uint _bundle_id) public {
        // require a valid Product
        require(_bundle_id > 0 && _bundle_id <= total_bundelId && keccak256(abi.encodePacked(products[_bundle_id].state)) ==  keccak256("In Process"));

        // require a valid Sender
        require(msg.sender == products[_bundle_id].delivery_key); 

        // update status
        products[_bundle_id].state = "Sent";
        
        // trigger purpose event
        emit validateTakeOverEvent(_bundle_id, products[_bundle_id].delivery_key);
    }
    function Certify_Lots (uint Id, string memory state0) public {
        // require a valid Product
        require(Id > 0 && Id <= total_bundelId && keccak256(abi.encodePacked(products[Id].certstate)) != keccak256("Unsalable" ));

        //Change status
        string memory certstate = state0;
        products[total_bundelId] = Product(products[Id].supplier_key, products[Id].owner_key, products[Id].delivery_key, products[Id].id, products[Id].bundle_id, products[Id].bundles_number, products[Id].product_name, products[Id].product_number, products[Id].state, certstate);
        
        // trigger voted event
        emit addedEvent (Id);
    }
}
