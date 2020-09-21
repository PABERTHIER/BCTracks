pragma solidity ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

import "./Ownable.sol";

contract Whitelist is Ownable {
    event SupplierAdded(address supplier);
    event DeliveryAdded(address delivery);
    event CertifierAdded(address certifier);
    
    event SupplierRemoved(address supplier);
    event DeliveryRemoved(address delivery);
    event CertifierRemoved(address certifier);
    
    mapping (address => bool) public isSupplier;
    mapping (address => bool) public isDelivery;
    mapping (address => bool) public isCertifier;

    modifier onlySupplier() {
        require(isSupplier[msg.sender], "Not authorized operation");
        _;
    }
    
    modifier onlyDelivery() {
        require(isDelivery[msg.sender], "Not authorized operation");
        _;
    }
    
    modifier onlyCertifier() {
        require(isCertifier[msg.sender], "Not authorized operation");
        _;
    }

    function addSupplier(address _supplier)
        public
        onlyOwner
    {
        require(
            !isSupplier[_supplier],
            "Address is supplier already."
        );

        isSupplier[_supplier] = true;
        emit SupplierAdded(_supplier);
    }
    function addDelivery(address _delivery)
        public
        onlyOwner
    {
        require(
            !isDelivery[_delivery],
            "Address is delivery already."
        );

        isDelivery[_delivery] = true;
        emit DeliveryAdded(_delivery);
    }
    function addCertifier(address _certifier)
        public
        onlyOwner
    {
        require(
            !isCertifier[_certifier],
            "Address is certifier already."
        );

        isCertifier[_certifier] = true;
        emit CertifierAdded(_certifier);
    }

    function removeSupplier(address _supplier)
        public
        onlyOwner
    {
        require(
            isSupplier[_supplier],
            "Not supplier of whitelist."
        );

        delete isSupplier[_supplier];
        emit SupplierRemoved(_supplier);
    }
    function removeDelivery(address _delivery)
        public
        onlyOwner
    {
        require(
            isDelivery[_delivery],
            "Not delivery of whitelist."
        );

        delete isDelivery[_delivery];
        emit DeliveryRemoved(_delivery);
    }
    function removeCertifier(address _certifier)
        public
        onlyOwner
    {
        require(
            isCertifier[_certifier],
            "Not certifier of whitelist."
        );

        delete isCertifier[_certifier];
        emit CertifierRemoved(_certifier);
    }
}