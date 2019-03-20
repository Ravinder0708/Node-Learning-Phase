const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handing GET request"
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handing POST request"
    })
});

//Get with particular ID
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === "100") {
        res.status(200).json({
            message: "Product with special id " + id
        })
    }
    else {
        res.status(200).json({
            message: "Product with simple id " + id
        })
    }
});

router.patch('/:productID', (req, res, next) => {
    res.status(200).json({
        message: "Update product with particular id " + req.params.productID
    })
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({
        message: "Delete product with particular id " + req.params.productID
    })
});

module.exports = router;