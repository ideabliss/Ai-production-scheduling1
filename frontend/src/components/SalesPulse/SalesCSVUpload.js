import React, { useState, useEffect } from "react";
import "../../pages/SalesPulse.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const SalesCSVUpload = () => {
  const [products, setProducts] = useState(
    Array.from({ length: 5 }, () => ({
      name: "",
      totalStock: "",
      units: "",
      revenue: "",
    }))
  );

  const [regionSales, setRegionSales] = useState({
    North: 0,
    East: 0,
    West: 0,
    South: 0,
  });

  const [totals, setTotals] = useState({
    unitsSold: 0,
    revenue: 0,
    remainingStock: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const totalUnits = products.reduce((sum, p) => sum + Number(p.units || 0), 0);
    const totalRevenue = products.reduce((sum, p) => sum + Number(p.revenue || 0), 0);
    const totalRemaining = products.reduce(
      (sum, p) => sum + (Number(p.totalStock || 0) - Number(p.units || 0)),
      0
    );
    setTotals({ unitsSold: totalUnits, revenue: totalRevenue, remainingStock: totalRemaining });
  }, [products]);

  const handleProductChange = (idx, field, value) => {
    const updated = [...products];
    updated[idx] = {...updated[idx], [field]: field === "name" ? value : Number(value)};
    setProducts(updated);
  };

  const handleRegionChange = (regionCode, rawValue) => {
    setRegionSales({
      ...regionSales,
      [regionCode]: Number(rawValue) || 0,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedMonth) return alert("Please select a month.");

    const payload = {
      monthYear: selectedMonth,
      products: products.map(p => ({
        productName: p.name,
        quantitySold: p.units,
        revenue: p.revenue,
        totalStock: p.totalStock,
        remainingStock: p.totalStock - p.units,
      })),
      regionSales,
      totals,
    };

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/sales/upload", payload);
      alert(res.data.message || "Uploaded!");
      // Reset…
      setProducts(Array.from({ length: 5 }, () => ({ name: "", totalStock: "", units: "", revenue: "" })));
      setRegionSales({ North:0, East:0, West:0, South:0 });
      setSelectedMonth("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const regionLabels = [
    { code: "North", label: "Mumbai" },
    { code: "East",  label: "Delhi" },
    { code: "West",  label: "Bangalore" },
    { code: "South", label: "Chennai" },
  ];

  return (
    <div className="container mt-5 text-center">
      <h3 className="mb-4">Upload Sales Data</h3>
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#salesUploadModal">
        Upload
      </button>

      <div className="modal fade" id="salesUploadModal" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Sales Data Entry</h5>
                <button className="btn-close" data-bs-dismiss="modal" id="closeModalBtn"></button>
              </div>
              <div className="modal-body">
                {/* Month picker */}
                <div className="row mb-4">
                  <div className="col-md-4 offset-md-4">
                    <label className="form-label fw-bold">Select Month:</label>
                    <input
                      type="month"
                      className="form-control"
                      value={selectedMonth}
                      onChange={e => setSelectedMonth(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Products */}
                <h5>📦 Product-wise Sales</h5>
                {products.map((prod, i) => (
                  <div className="row mb-2" key={i}>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={prod.name}
                        onChange={e => handleProductChange(i, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Total Stock"
                        value={prod.totalStock}
                        onChange={e => handleProductChange(i, "totalStock", e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Units Sold"
                        value={prod.units}
                        onChange={e => handleProductChange(i, "units", e.target.value)}
                      />
                    </div>
                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control bg-light"
                        placeholder="Remaining"
                        value={prod.totalStock - prod.units}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Revenue"
                        value={prod.revenue}
                        onChange={e => handleProductChange(i, "revenue", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="row mb-4 bg-secondary text-white p-2">
                  <div className="col-md-3 fw-bold">Totals:</div>
                  <div className="col-md-3">Units Sold: {totals.unitsSold}</div>
                  <div className="col-md-3">Remaining: {totals.remainingStock}</div>
                  <div className="col-md-3">₹{totals.revenue}</div>
                </div>

                {/* Regions */}
                <h5>🌍 Region-wise Sales</h5>
                <div className="row mb-3">
                  {regionLabels.map(({ code, label }) => (
                    <div className="col-md-3" key={code}>
                      <label className="form-label">{label}</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder={`Sales in ${label}`}
                        value={regionSales[code]}
                        onChange={e => handleRegionChange(code, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Uploading…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCSVUpload;
