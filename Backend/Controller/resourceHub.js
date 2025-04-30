const { db } = require('../Firebase/admin');

const addMachine = async (req, res) => {
  try {
    const { name, status, lastServiced } = req.body;
    const docRef = db.collection("machines").doc();
    await docRef.set({ name, status, lastServiced });
    res.status(201).json({ message: "Machine added successfully" });
  } catch (error) {
    console.error("Error adding machine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addStaff = async (req, res) => {
  try {
    const { name, role, shift, contact } = req.body;
    const docRef = db.collection("staff").doc();
    await docRef.set({ name, role, shift, contact });
    res.status(201).json({ message: "Staff added successfully" });
  } catch (error) {
    console.error("Error adding staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Schedule machine maintenance
const scheduleMaintenance = async (req, res) => {
  try {
    const { machineName, status, lastServiced } = req.body;
    const snapshot = await db.collection("machines").where("name", "==", machineName).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Machine not found" });
    }

    const machineDoc = snapshot.docs[0];
    await db.collection("machines").doc(machineDoc.id).update({
      status,
      lastServiced,
    });

    res.status(200).json({ message: "Maintenance scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling maintenance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all data (machines, staff)
const getAllResourceData = async (req, res) => {
  try {
    const [machinesSnapshot, staffSnapshot] = await Promise.all([
      db.collection("machines").get(),
      db.collection("staff").get(),
    ]);

    const machines = machinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const staff = staffSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ machines, staff });
  } catch (error) {
    console.error("Error fetching resource data:", error);
    res.status(500).json({ message: "Failed to fetch resource data" });
  }
};

module.exports = {
  addMachine,
  addStaff,
  scheduleMaintenance,
  getAllResourceData,
};
