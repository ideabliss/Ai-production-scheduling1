const { db } = require("../Firebase/admin"); 

const placeStockOrder = async (req, res) => {
  try {
    const { itemName, category, quantity, pricePerUnit, supplierName, expectedDate } = req.body;

    if (!itemName || !category || !quantity || !pricePerUnit || !supplierName || !expectedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const orderRef = db.collection("stockOrders").doc();

    await orderRef.set({
      itemName,
      category,
      quantity,
      pricePerUnit,
      supplierName,
      expectedDate,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Stock order placed successfully!" });
  } catch (error) {
    console.error("Error placing stock order:", error);
    res.status(500).json({ message: "Failed to place stock order" });
  }
};

const getStockOrders = async (req, res) => {
  try {
    const snapshot = await db.collection("stockOrders").get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "No stock orders found" });
    }

    const stockOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(stockOrders);
  } catch (error) {
    console.error("Error fetching stock orders:", error);
    res.status(500).json({ message: "Failed to fetch stock orders" });
  }
};

module.exports = { placeStockOrder, getStockOrders };
