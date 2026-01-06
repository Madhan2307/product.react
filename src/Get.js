import React, { useEffect, useState } from 'react';

function Get() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch('http://127.0.0.1:5000/getpro')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(answer => {
        console.log(answer, "datasss");
        setData(answer);
      })
      .catch(error => {
        console.error("error", error);
      });
  }, []);

  // Update product
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/putpro/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          price: editPrice
        })
      });
      const result = await response.json();
      alert(result.message);

      setData(prev =>
        prev.map(item =>
          item._id === editId ? { ...item, productname: editName, price: editPrice } : item
        )
      );
      setShowUpdate(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/pro/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      alert(result.message);

      setData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {data.map((datas) => (
        <ul key={datas._id}>
          <li>{datas.name}</li>
          <li>{datas.price}</li>
          <button onClick={() => {
            setEditId(datas._id);
            setEditName(datas.name);
            setEditPrice(datas.price);
            setShowUpdate(true);
          }}>
            Update
          </button>
          <button onClick={() => handleDelete(datas._id)}>Delete</button>
        </ul>
      ))}

      {showUpdate && (
        <div>
          <h2>Update Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Get;
