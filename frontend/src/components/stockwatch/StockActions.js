import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockActions = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    pricePerUnit: '',
    supplierName: '',
    expectedDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending data to backend
    fetch("http://localhost:5000/api/stock/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message); // Display success message
          setShowModal(false); // Close modal
        }
      })
      .catch(error => {
        console.error("Error placing stock order:", error);
        alert("Error placing stock order. Please try again.");
      });
  };

  return (
    <div className="section p-3">
      <h3 className="mb-3">Actions</h3>
      <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>
        Order Stock Item
      </button>
      <button className="btn btn-outline-secondary">Export Inventory CSV</button>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Order Stock Item</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Quantity with Unit (e.g. 5000 Kg)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price per Unit</label>
                    <input
                      type="number"
                      className="form-control"
                      name="pricePerUnit"
                      value={formData.pricePerUnit}
                      onChange={handleChange}
                      placeholder="e.g. 25 (per Kg or per Pcs)"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Supplier Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Expected Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expectedDate"
                      value={formData.expectedDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Submit</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockActions;
