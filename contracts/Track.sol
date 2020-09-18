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
        uint sale_date;
        string state;
        string certstate;
    }

    // Store Products
    // Fetch Product
    mapping(uint => Product) public products;

    uint total_bundelId;
    uint increment_bundelId;

    event addedEvent ( uint indexed _bundleId);
    event boughtEvent ( uint indexed _singleId, address payable _new_owner);
    event submitTakeOverEvent ( uint indexed _singleId, address payable _delivery_key);
    event validateTakeOverEvent ( uint indexed _singleId, address payable _delivery_key);

    function Add_Bundle (uint _bundle_id, uint  _bundles_number, string  memory _product_name, uint _product_number ) public {
        total_bundelId ++;
        increment_bundelId ++;
        string memory state = "Available";
        string memory certstate = "Not Certified";
        address payable _none_delivery = address(0);
        address payable _supplier_key = msg.sender;
        products[total_bundelId] = Product(_supplier_key, _supplier_key, _none_delivery, increment_bundelId, _bundle_id, _bundles_number, _product_name, _product_number, 0, state, certstate);
        emit addedEvent (increment_bundelId);
    }

    function Del_Bundle (uint _singleId) public {
        // Attention en état Spend : rajouter le lot segmenté dans l'ancien lot
        require(_singleId > 0 && _singleId <= increment_bundelId);

        bool isFound = false;
        for(uint increment = 0; increment < total_bundelId; increment++){
            if(products[increment].id == _singleId){
                require(products[increment].supplier_key == msg.sender && products[increment].owner_key == msg.sender && keccak256(abi.encodePacked(products[increment].state)) != keccak256("Sent"));
                isFound = true;
            }
            if(isFound){
                products[increment] = products[increment+1];
            }
        }
        if(isFound){
            products[total_bundelId] = Product(address(0), address(0), address(0), 0, 0, 0, "", 0, 0, "", "");
            total_bundelId --;
        }

    }
 
    function Buy_Bundle (uint _singleId, uint _bundles_to_send) public {
        require(_singleId > 0 && _singleId <= increment_bundelId);

        //Change status
        for(uint increment = 0; increment < total_bundelId; increment++){
            if(products[increment].id == _singleId){
                require(_bundles_to_send <= products[increment].bundles_number && keccak256(abi.encodePacked(products[increment].certstate)) != keccak256("Unsalable"));
                if (_bundles_to_send == products[increment].bundles_number) {
                    products[increment].state = "In Process";
                    products[increment].owner_key = msg.sender;
                    products[increment].sale_date = block.timestamp;
                }
                else {
                    total_bundelId ++;
                    increment_bundelId ++;
                    string memory state = "In Process";
                    products[total_bundelId] = Product(products[increment].supplier_key, msg.sender, products[increment].delivery_key, increment_bundelId, products[increment].bundle_id, _bundles_to_send, products[increment].product_name, products[increment].product_number, block.timestamp, state, products[increment].certstate);
                    products[increment].bundles_number = products[increment].bundles_number - _bundles_to_send;
                }
            }
        }

        // trigger bought event
        emit boughtEvent (_singleId, products[_singleId].owner_key);
    }

    function Submit_takeOver_Bundle (uint _singleId, address payable _delivery_key) public {
        // require a valid Product
        require(_singleId > 0 && _singleId <= increment_bundelId);

        //Add a delivery purpose
        for(uint increment = 0; increment < total_bundelId; increment++){
            if(products[increment].id == _singleId){
                require(keccak256(abi.encodePacked(products[increment].state)) ==  keccak256("In Process"));
                products[increment].delivery_key = _delivery_key;
            }
        }
        
        // trigger purpose event
        emit submitTakeOverEvent(_singleId, _delivery_key);
    }

    function Accepted_takeOver_Bundle (uint _singleId) public {
        // require a valid Product
        require(_singleId > 0 && _singleId <= increment_bundelId);

        //Add a delivery purpose
        for(uint increment = 0; increment < total_bundelId; increment++){
            if(products[increment].id == _singleId){
                require(keccak256(abi.encodePacked(products[increment].state)) ==  keccak256("In Process") && msg.sender == products[increment].delivery_key);
                products[increment].state = "Sent";
            }
        }

        emit validateTakeOverEvent(_singleId, msg.sender);
    }

    function Change_BundleState (address payable _supplier, uint _bundleId, string memory _bundleState) public returns(bool) {
        //API : Ajout revois automatique à l'envoyeur
        require((keccak256(abi.encodePacked(_bundleState)) == keccak256("Unsalable") || keccak256(abi.encodePacked(_bundleState)) == keccak256("Certificed")), "Status Unknow");
        bool isFound = false;
        for(uint increment = 1; increment <= total_bundelId; increment++){
            if(products[increment].supplier_key == _supplier && products[increment].bundle_id == _bundleId){
                isFound = true;
                require(keccak256(abi.encodePacked(products[increment].certstate)) != keccak256("Unsalable"), "One product already unsalable for supplier selected");
                products[increment].certstate = _bundleState;
            }
        }
        require(isFound, "No match found for supplier and product found");
        return isFound;
    }

    //API: fonction get
}
