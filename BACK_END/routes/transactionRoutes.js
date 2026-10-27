const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionControllers');  // Đảm bảo đường dẫn đúng

router.post('/', transactionsController.createTransaction);
router.get('/', transactionsController.getAllTransaction);
module.exports = router;
