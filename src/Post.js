import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

     const navigate = useNavigate(); 
    const view = () => { navigate("/details"); 
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      price: price
    };

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

 

    try {
      const response = await fetch('http://127.0.0.1:5000/addpro', request);
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const result = await response.json();
      console.log("Product added successfully:", result);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br />
        <button type="submit">Submit</button><br/>
      </form>
      <div>
        <button onClick={view}>view details</button>
      </div>
    </div>
  );
}

export default Post;