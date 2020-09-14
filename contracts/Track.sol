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

    function Add_Bundle (uint _bundle_id, uint  _bundles_number, string  memory _product_name, uint _product_number ) public onlyOwner {
        total_bundelId ++;
        string memory state = "Available";
        string memory certstate = "Not Certified";
        address payable _none_delivery = address(0);
        address payable _supplier_key = msg.sender;
        products[total_bundelId] = Product(_supplier_key, _supplier_key, _none_delivery, total_bundelId, _bundle_id, _bundles_number, _product_name, _product_number, state, certstate);
        emit addedEvent (total_bundelId);
    }
 
    function Buy_Bundle (uint Id, uint _bundles_to_send) public {
        // require a valid Product
        require(Id > 0 && Id <= total_bundelId && _bundles_to_send <= products[Id].bundles_number && keccak256(abi.encodePacked(products[Id].certstate)) != keccak256("Unsalable"));

        //Change status
        if (_bundles_to_send == products[Id].bundles_number) {
            products[Id].state = "In Process";
            products[Id].owner_key = msg.sender;
        }
        else {
            total_bundelId ++;
            string memory state = "In Process";
            products[total_bundelId] = Product(products[Id].supplier_key, msg.sender, products[Id].delivery_key, total_bundelId, products[Id].bundle_id, _bundles_to_send, products[Id].product_name, products[Id].product_number, state, products[Id].certstate);
            products[Id].bundles_number = products[Id].bundles_number - _bundles_to_send;
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
    
    // function Certify_Bundles (address payable[] memory _suppliers, uint[] memory _suppliers_bundleIds, string[] memory  _suppliers_bundleStatus) public {
        //USE BOOL FOR STATUS
    //     // require a valid Product
    //     for(uint increment; increment < _suppliers.length; increment++){
    //         require(_suppliers[increment].bundle_id > 0 && (keccak256(abi.encodePacked(_suppliers[increment].state)) == keccak256("Unsalable") || keccak256(abi.encodePacked(_suppliers[increment].state)) == keccak256("Certificed")));


            
    //     }
    // }

    function Change_BundleState (address payable _supplier, uint _bundleId, string memory _bundleState) public returns(bool) {
        require((keccak256(abi.encodePacked(_bundleState)) == keccak256("Unsalable") || keccak256(abi.encodePacked(_bundleState)) == keccak256("Certificed")), "Status Unknow");
        bool isFound = false;
        for(uint increment = 1; increment < total_bundelId; increment++){
            if(products[increment].supplier_key == _supplier && products[increment].bundle_id == _bundleId){
                isFound = true;
                require(keccak256(abi.encodePacked(products[increment].certstate)) != keccak256("Unsalable"), "One product already unsalable for supplier selected");
                products[increment].certstate = _bundleState;
            }
        }
        require(isFound, "No match found for supplier and product found");
        return isFound;
    }
}
