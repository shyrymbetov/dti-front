import { useState } from "react";
import API from "../api";
import "./styles/CreateProduct.css";

const categories = ["CLOTHES", "SHOES", "BAGS", "ACCESSORIES"];

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [photos, setPhotos] = useState([]);

    // Загрузка фото
    const handleFileChange = async (e) => {
        const files = e.target.files;
        const fileUrls = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const fileUrl = await handleFileUpload(file); // Функция для загрузки файла в MinIO
                fileUrls.push(fileUrl); // Сохраняем URL для каждого файла
            } catch (error) {
                console.error("Ошибка при загрузке файла", error);
            }
        }

        setPhotos(fileUrls); // Обновляем состояние с URL-ами фото
    };

    // Remove photo from array
    const handleRemovePhoto = (urlToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((url) => url !== urlToRemove));
    };


    // Загрузка файла в MinIO
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await API.post('/upload-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.url; // Возвращаем URL файла
        } catch (error) {
            console.error("Ошибка загрузки фото:", error.response?.data?.message);
            throw new Error('Ошибка загрузки фото');
        }
    };

    // Оценка цены товара
    const handleEstimatePrice = async () => {
        try {
            const response = await API.post("/products/evaluate", {
                name,
                category,
                description,
            });
            setEstimatedPrice(response.data);
        } catch (error) {
            console.error("Ошибка оценки цены:", error.response?.data?.message);
        }
    };

    // Отправка данных о товаре
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/products", {
                name,
                category,
                price: Number(price),
                description,
                photoURLs: photos, // Отправляем ссылки на фото
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
                <input
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="input-field"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="input-field"
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="textarea-field"
                />

                {/* Загрузка фото */}
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    className="file-input"
                />

                {/* Кнопка оценки цены */}
                <button
                    type="button"
                    onClick={handleEstimatePrice}
                    className="estimate-button"
                >
                    Оценить цену
                </button>

                {/* Отображение предполагаемой цены */}
                {estimatedPrice !== null && (
                    <p className="estimated-price">
                        Предполагаемая цена: {estimatedPrice} тенге
                    </p>
                )}

                {/* Uploaded photo previews with remove button */}
                <div className="uploaded-photos">
                    {photos.map((url, index) => (
                        <div key={index} className="photo-preview">
                            <img src={url} alt={`uploaded-${index}`} className="photo-thumb" />
                            <button type="button" onClick={() => handleRemovePhoto(url)} className="remove-photo-btn">❌</button>
                        </div>
                    ))}
                </div>


                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
};

export default CreateProduct;
