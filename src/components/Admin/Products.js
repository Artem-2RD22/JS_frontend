import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ title: '', price: '', discont_price: '', description: '', categoryId: '', image: null });
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3333/products/all');
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3333/categories/all');
            setCategories(response.data);
        } catch (error) {
            setError('Error fetching categories');
        }
    };

    const handleFileChange = (e) => {
        setNewProduct({ ...newProduct, image: e.target.files[0] });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newProduct.title);
        formData.append('price', newProduct.price);
        formData.append('discont_price', newProduct.discont_price);
        formData.append('description', newProduct.description);
        formData.append('categoryId', newProduct.categoryId);
        formData.append('image', newProduct.image);

        try {
            await axios.post('http://localhost:3333/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchProducts();
            setNewProduct({ title: '', price: '', discont_price: '', description: '', categoryId: '', image: null });
        } catch (error) {
            setError('Error adding product');
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', editingProduct.title);
        formData.append('price', editingProduct.price);
        formData.append('discont_price', editingProduct.discont_price);
        formData.append('description', editingProduct.description);
        formData.append('categoryId', editingProduct.categoryId);
        if (editingProduct.image) {
            formData.append('image', editingProduct.image);
        }

        try {
            await axios.put(`http://localhost:3333/products/${editingProduct.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchProducts();
            setEditingProduct(null);
        } catch (error) {
            setError('Error updating product');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/products/${id}`);
            fetchProducts();
        } catch (error) {
            setError('Error deleting product');
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h2>Products</h2>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                <input
                    type="text"
                    name="title"
                    value={editingProduct ? editingProduct.title : newProduct.title}
                    onChange={editingProduct ? (e) => setEditingProduct({ ...editingProduct, title: e.target.value }) : handleInputChange}
                    placeholder="Product Title"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={editingProduct ? (e) => setEditingProduct({ ...editingProduct, price: e.target.value }) : handleInputChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="discont_price"
                    value={editingProduct ? editingProduct.discont_price : newProduct.discont_price}
                    onChange={editingProduct ? (e) => setEditingProduct({ ...editingProduct, discont_price: e.target.value }) : handleInputChange}
                    placeholder="Discount Price"
                />
                <textarea
                    name="description"
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={editingProduct ? (e) => setEditingProduct({ ...editingProduct, description: e.target.value }) : handleInputChange}
                    placeholder="Description"
                    required
                />
                <select
                    name="categoryId"
                    value={editingProduct ? editingProduct.categoryId : newProduct.categoryId}
                    onChange={editingProduct ? (e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value }) : handleInputChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                </select>
                <input
                    type="file"
                    name="image"
                    onChange={editingProduct ? (e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] }) : handleFileChange}
                />
                <button type="submit">{editingProduct ? 'Update' : 'Add'}</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={`http://localhost:3333/public${product.image}`} alt={product.title} className={styles.adminImg} />
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                        <button onClick={() => handleEditProduct(product)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
