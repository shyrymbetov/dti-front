import { useEffect, useState } from "react";
import API from "../api";
import "./styles/MyProducts.css"; // Подключаем стили

const MyProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const { data } = await API.get("/products/my");
                setProducts(data);
            } catch (error) {
                console.error("Ошибка загрузки товаров:", error.response?.data?.message);
            }
        };

        fetchUserProducts();
    }, []);

    return (
        <div className="my-products-container">
            <h1>Мои товары</h1>
            {products.length === 0 ? (
                <p>У вас пока нет товаров.</p>
            ) : (
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id} className="product-item">
                            <h3>{product.name}</h3>
                            <p><strong>Категория:</strong> {product.category}</p>
                            <p><strong>Цена:</strong> {product.price} ₸</p>
                            <p><strong>Описание:</strong> {product.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyProducts;
