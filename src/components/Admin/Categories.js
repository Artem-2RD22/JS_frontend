import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ title: '', image: null });
    const [editingCategory, setEditingCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3333/categories/all');
            setCategories(response.data);
        } catch (error) {
            setError('Error fetching categories');
        }
    };

    const handleFileChange = (e) => {
        setNewCategory({ ...newCategory, image: e.target.files[0] });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newCategory.title);
        formData.append('image', newCategory.image);

        try {
            await axios.post('http://localhost:3333/categories', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchCategories();
            setNewCategory({ title: '', image: null });
        } catch (error) {
            setError('Error adding category');
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', editingCategory.title);
        if (editingCategory.image) {
            formData.append('image', editingCategory.image);
        }

        try {
            await axios.put(`http://localhost:3333/categories/${editingCategory.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            fetchCategories();
            setEditingCategory(null);
        } catch (error) {
            setError('Error updating category');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:3333/categories/${id}`);
            fetchCategories();
        } catch (error) {
            setError('Error deleting category');
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h2>Categories</h2>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}>
                <input
                    type="text"
                    name="title"
                    value={editingCategory ? editingCategory.title : newCategory.title}
                    onChange={editingCategory ? (e) => setEditingCategory({ ...editingCategory, title: e.target.value }) : handleInputChange}
                    placeholder="Category Title"
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={editingCategory ? (e) => setEditingCategory({ ...editingCategory, image: e.target.files[0] }) : handleFileChange}
                />
                <button type="submit">{editingCategory ? 'Update' : 'Add'}</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <img src={`http://localhost:3333/public${category.image}`} alt={category.title} className={styles.adminImg}/>
                        <p>{category.title}</p>
                        <button onClick={() => handleEditCategory(category)}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
