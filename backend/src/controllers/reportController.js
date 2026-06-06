const dayjs = require('dayjs');
const {
  generateMonthlyReportExcel,
  generateMonthlyReportPDF,
  generateDesignerPerformanceExcel,
  generateDesignerPerformancePDF,
  generateConstructorRatingExcel,
  generateConstructorRatingPDF,
  generateMaterialSalesExcel,
  generateMaterialSalesPDF
} = require('../services/reportService');

const exportMonthlyReportExcel = async (req, res) => {
  try {
    const { year, month } = req.query;
    const currentYear = parseInt(year) || dayjs().year();
    const currentMonth = parseInt(month) || dayjs().month() + 1;

    const workbook = await generateMonthlyReportExcel(currentYear, currentMonth);
    const filename = `月度运营报表_${currentYear}年${currentMonth}月_${dayjs().format('YYYYMMDDHHmmss')}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: '导出月度运营报表失败', error: error.message });
  }
};

const exportMonthlyReportPDF = async (req, res) => {
  try {
    const { year, month } = req.query;
    const currentYear = parseInt(year) || dayjs().year();
    const currentMonth = parseInt(month) || dayjs().month() + 1;

    const pdfBuffer = await generateMonthlyReportPDF(currentYear, currentMonth);
    const filename = `月度运营报表_${currentYear}年${currentMonth}月_${dayjs().format('YYYYMMDDHHmmss')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: '导出月度运营报表PDF失败', error: error.message });
  }
};

const exportDesignerPerformanceExcel = async (req, res) => {
  try {
    const workbook = await generateDesignerPerformanceExcel();
    const filename = `设计师绩效报表_${dayjs().format('YYYYMMDDHHmmss')}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: '导出设计师绩效报表失败', error: error.message });
  }
};

const exportDesignerPerformancePDF = async (req, res) => {
  try {
    const pdfBuffer = await generateDesignerPerformancePDF();
    const filename = `设计师绩效报表_${dayjs().format('YYYYMMDDHHmmss')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: '导出设计师绩效报表PDF失败', error: error.message });
  }
};

const exportConstructorRatingExcel = async (req, res) => {
  try {
    const workbook = await generateConstructorRatingExcel();
    const filename = `施工队评分报表_${dayjs().format('YYYYMMDDHHmmss')}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: '导出施工队评分报表失败', error: error.message });
  }
};

const exportConstructorRatingPDF = async (req, res) => {
  try {
    const pdfBuffer = await generateConstructorRatingPDF();
    const filename = `施工队评分报表_${dayjs().format('YYYYMMDDHHmmss')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: '导出施工队评分报表PDF失败', error: error.message });
  }
};

const exportMaterialSalesExcel = async (req, res) => {
  try {
    const workbook = await generateMaterialSalesExcel();
    const filename = `材料销售排行报表_${dayjs().format('YYYYMMDDHHmmss')}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: '导出材料销售排行报表失败', error: error.message });
  }
};

const exportMaterialSalesPDF = async (req, res) => {
  try {
    const pdfBuffer = await generateMaterialSalesPDF();
    const filename = `材料销售排行报表_${dayjs().format('YYYYMMDDHHmmss')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: '导出材料销售排行报表PDF失败', error: error.message });
  }
};

module.exports = {
  exportMonthlyReportExcel,
  exportMonthlyReportPDF,
  exportDesignerPerformanceExcel,
  exportDesignerPerformancePDF,
  exportConstructorRatingExcel,
  exportConstructorRatingPDF,
  exportMaterialSalesExcel,
  exportMaterialSalesPDF
};
