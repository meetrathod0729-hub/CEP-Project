const prisma = require("../config/db");
const createToken = async (req, res) => {
    try {
      const {
        patientName,
        patientAge,
        hospitalId,
        riskLevel,
      } = req.body;
      const lastToken = await prisma.token.findFirst({
        where: { hospitalId },
        orderBy: { tokenNumber: "desc" },
      });
  
      const newTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;
      const estimatedTime = newTokenNumber * 10; // 10 min per patient
      const token = await prisma.token.create({
        data: {
          patientName,
          patientAge,
          hospitalId,
          riskLevel,
          tokenNumber: newTokenNumber,
          estimatedTime,
        },
      });
      res.status(201).json({
        message: "Token generated",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  const getTokensByHospital = async (req, res) => {
    try {
      const { hospitalId } = req.params;
  
      const tokens = await prisma.token.findMany({
        where: { hospitalId: parseInt(hospitalId) },
        orderBy: { tokenNumber: "asc" },
      });
  
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  const updateTokenStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedToken = await prisma.token.update({
        where: { id: parseInt(id) },
        data: { status },
      });
  
      res.json(updatedToken);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
  module.exports = {
    createToken,
    getTokensByHospital,
    updateTokenStatus,
  };