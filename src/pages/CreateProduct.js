import { useState } from "react";
import API from "../api";
import "./styles/CreateProduct.css";

const categories = ["CLOTHES", "SHOES", "BAGS", "ACCESSORIES"];

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/products", {
                name,
                category,
                price: Number(price),
                description,
            });
            alert("Товар успешно создан!");
            console.log(response.data);
        } catch (error) {
            console.error("Ошибка создания товара:", error.response?.data?.message);
        }
    };

    return (
        <div className="create-product-container">
            <h1>Создание товара</h1>
            <form onSubmit={handleSubmit} className="create-product-form">
                <input type="text" placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} required className="input-field" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} required className="input-field">
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} required className="input-field" />
                <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required className="textarea-field" />
                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
};

export default CreateProduct;
