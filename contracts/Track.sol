pragma solidity ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

import "./Ownable.sol";
import "./SafeMath.sol";

contract Track is Ownable {

using SafeMath for uint256;

    // Model a Bundle
    struct Bundle {
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

    // Store Bundles
    // Fetch Bundle
    mapping(uint => Bundle) public bundles;

    uint public total_bundleId;
    uint increment_bundleId;

    event addedEvent ( uint indexed _bundleId);
    event boughtEvent ( uint indexed _singleId, address payable _new_owner);
    event submitTakeOverEvent ( uint indexed _singleId, address payable _delivery_key);
    event validateTakeOverEvent ( uint indexed _singleId, address payable _delivery_key);

    function Add_Bundle (uint _bundle_id, uint  _bundles_number, string  memory _product_name, uint _product_number ) public {
        total_bundleId ++;
        increment_bundleId ++;
        string memory state = "Available";
        string memory certstate = "Not Certified";
        address payable _none_delivery = address(0);
        address payable _supplier_key = msg.sender;
        bundles[total_bundleId] = Bundle( _supplier_key,
                                            _supplier_key,
                                            _none_delivery,
                                            increment_bundleId,
                                            _bundle_id, _bundles_number,
                                            _product_name, _product_number,
                                            0, state,
                                            certstate);
        emit addedEvent (increment_bundleId);
    }

    function Del_Bundle (uint _singleId) public {
        require(_singleId > 0 && _singleId <= increment_bundleId);

        bool isFound = false;
        for(uint increment = 0; increment < total_bundleId; increment++){
            if(bundles[increment].id == _singleId){
                require(    bundles[increment].supplier_key == msg.sender &&
                            bundles[increment].owner_key == msg.sender &&
                            keccak256(abi.encodePacked(bundles[increment].state)) != keccak256("Sent"));
                isFound = true;
            }
            if(isFound){
                bundles[increment] = bundles[increment+1];
            }
        }
        if(isFound){
            bundles[total_bundleId] = Bundle( address(0),
                                                address(0),
                                                address(0),
                                                0,
                                                0,
                                                0,
                                                "",
                                                0, 
                                                0,
                                                "",
                                                "");
            total_bundleId --;
        }

    }
 
    function Buy_Bundle (uint _singleId, uint _bundles_to_send) public {
        require(_singleId > 0 && _singleId <= increment_bundleId);

        //Change status
        for(uint increment = 0; increment <= total_bundleId; increment++){
            if(bundles[increment].id == _singleId){
                require(    _bundles_to_send <= bundles[increment].bundles_number &&
                            keccak256(abi.encodePacked(bundles[increment].certstate)) != keccak256("Unsalable"));
                if (_bundles_to_send == bundles[increment].bundles_number) {
                    bundles[increment].state = "In Process";
                    bundles[increment].owner_key = msg.sender;
                    bundles[increment].sale_date = block.timestamp;
                }
                else {
                    total_bundleId ++;
                    increment_bundleId ++;
                    string memory state = "In Process";
                    bundles[total_bundleId] = Bundle( bundles[increment].supplier_key,
                                                        msg.sender,
                                                        bundles[increment].delivery_key,
                                                        increment_bundleId,
                                                        bundles[increment].bundle_id,
                                                        _bundles_to_send,
                                                        bundles[increment].product_name,
                                                        bundles[increment].product_number,
                                                        block.timestamp,
                                                        state,
                                                        bundles[increment].certstate);
                    bundles[increment].bundles_number = bundles[increment].bundles_number - _bundles_to_send;
                }
            }
        }

        // trigger bought event
        emit boughtEvent (_singleId, bundles[_singleId].owner_key);
    }

    function Submit_takeOver_Bundle (uint _singleId, address payable _delivery_key) public {
        // require a valid Bundle
        require(_singleId > 0 && _singleId <= increment_bundleId);

        //Add a delivery purpose
        for(uint increment = 0; increment <= total_bundleId; increment++){
            if(bundles[increment].id == _singleId){      
                require(keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("In Process") ||
                        keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("Issued") ||
                        keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("Bundle Recall"));
                if(keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("Issued")){
                    require(bundles[increment].owner_key == msg.sender);
                    bundles[increment].delivery_key = address(0);
                    bundles[increment].state = "Received";
                }else{
                    require(_delivery_key != address(0) && bundles[increment].supplier_key == msg.sender );
                    bundles[increment].delivery_key = _delivery_key;
                }
            }
        }
        
        // trigger purpose event
        emit submitTakeOverEvent(_singleId, _delivery_key);
    }

    function Delivery_takeOver_Bundle (uint _singleId) public {
        // require a valid Bundle
        require(_singleId > 0 && _singleId <= increment_bundleId);

        //Add a delivery purpose
        for(uint increment = 0; increment <= total_bundleId; increment++){
            if(bundles[increment].id == _singleId){
                require(msg.sender == bundles[increment].delivery_key &&
                            (keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("In Process") ||
                            keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("Sent")||
                            keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("Bundle Recall")));
                if(keccak256(abi.encodePacked(bundles[increment].state)) ==  keccak256("Sent")){
                    bundles[increment].state = "Issued";
                }else{
                    bundles[increment].state = "Sent";
                }
                
            }
        }
        emit validateTakeOverEvent(_singleId, msg.sender);
    }

    function Change_BundleState (address payable _supplier, uint _bundleId, string memory _bundleState) public returns(bool) {
        require((   keccak256(abi.encodePacked(_bundleState)) == keccak256("Unsalable") ||
                    keccak256(abi.encodePacked(_bundleState)) == keccak256("Certified")), "Status Unknown");
        bool isFound = false;
        for(uint increment = 1; increment <= total_bundleId; increment++){
            if(bundles[increment].supplier_key == _supplier && bundles[increment].bundle_id == _bundleId){
                isFound = true;
                require(keccak256(abi.encodePacked(bundles[increment].certstate)) != keccak256("Unsalable"), "One product already unsalable for supplier selected");
                bundles[increment].certstate = _bundleState;
                if(keccak256(abi.encodePacked(_bundleState)) == keccak256("Unsalable")){
                    bundles[increment].owner_key = bundles[increment].supplier_key;
                    bundles[increment].state = "Bundle Recall";
                }
            }
        }
        require(isFound, "No match found for supplier and product found");
        return isFound;
    }
}
