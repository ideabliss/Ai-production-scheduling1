try {
    const path = require("path");
    const fs = require("fs");
    const { uploadPdfAndExtractData } = require("./Controller/salespdf");
  
    // Mock req and res
    const mockReq = {
      file: {
        path: path.join(__dirname, "mockpdfs", "sample.pdf"), // 🔁 Replace with path to an actual PDF in your project
      },
    };
  
    const mockRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        console.log("📦 Response:", data);
      },
      send(msg) {
        console.log("❌ Error Response:", msg);
      },
    };
  
    // Call the function
    uploadPdfAndExtractData(mockReq, mockRes);
  } catch (err) {
    console.error("❌ Error testing uploadPdfAndExtractData:", err);
  }
  