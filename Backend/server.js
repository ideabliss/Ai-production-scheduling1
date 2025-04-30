const express = require("express");
const cors = require("cors");
const salesRoutes = require("./Routes/salesdata");  // Your sales routes
const stockRoutes = require("./Routes/stockRoutes");  // New route for stock orders
const resourceHubRoutes = require("./Routes/resourceHub");  // Resource Hub routes
const forecastRoutes = require('./Routes/forecastRoutes');  // Import routes
const productionRoutes = require('./Routes/generateProductionSchedule'); 
const dashboardRoutes = require("./Routes/dashboardsummary");  // Add this line




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());  // Parse incoming JSON requests

// Routes
app.use("/api/sales", salesRoutes);  // Sales data routes
app.use("/api/stock", stockRoutes);  // Stock order routes
app.use("/api/resources", resourceHubRoutes);  
app.use('/api/forecast', forecastRoutes); 
app.use('/api/productionPlan', productionRoutes);
app.use("/api/dashboard", dashboardRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
