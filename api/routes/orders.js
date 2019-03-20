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
router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    if (id === "100") {
        res.status(200).json({
            message: "order with special id " + id
        })
    }
    else {
        res.status(200).json({
            message: "order with simple id " + id
        })
    }
});

router.patch('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: "Update order with particular id " + req.params.orderID
    })
});

router.delete('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: "Delete order with particular id " + req.params.orderID
    })
});

module.exports = router;