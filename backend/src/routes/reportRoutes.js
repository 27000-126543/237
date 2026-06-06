const express = require('express');
const router = express.Router();
const {
  exportMonthlyReportExcel,
  exportMonthlyReportPDF,
  exportDesignerPerformanceExcel,
  exportDesignerPerformancePDF,
  exportConstructorRatingExcel,
  exportConstructorRatingPDF,
  exportMaterialSalesExcel,
  exportMaterialSalesPDF
} = require('../controllers/reportController');

router.get('/monthly/excel', exportMonthlyReportExcel);
router.get('/monthly/pdf', exportMonthlyReportPDF);

router.get('/designer/excel', exportDesignerPerformanceExcel);
router.get('/designer/pdf', exportDesignerPerformancePDF);

router.get('/constructor/excel', exportConstructorRatingExcel);
router.get('/constructor/pdf', exportConstructorRatingPDF);

router.get('/material/excel', exportMaterialSalesExcel);
router.get('/material/pdf', exportMaterialSalesPDF);

module.exports = router;
