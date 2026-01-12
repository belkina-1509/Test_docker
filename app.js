// Базовый URL для API (через nginx proxy)
const API_URL = '/api';

// Функция для форматирования JSON
function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

// Функция для обработки ошибок
function handleError(error, elementId) {
    const element = document.getElementById(elementId);
    element.textContent = `Ошибка: ${error.message}`;
    element.className = 'info-box error';
}

// Загрузка главной информации
async function loadMainInfo() {
    const element = document.getElementById('main-info');
    element.textContent = 'Загрузка...';
    element.className = 'info-box loading';
    
    try {
        const response = await fetch(`${API_URL}/`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        element.textContent = formatJSON(data);
        element.className = 'info-box success';
    } catch (error) {
        handleError(error, 'main-info');
    }
}

// Проверка здоровья
async function checkHealth() {
    const element = document.getElementById('health-info');
    element.textContent = 'Проверка...';
    element.className = 'info-box loading';
    
    try {
        const response = await fetch(`${API_URL}/health`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        element.textContent = formatJSON(data);
        element.className = 'info-box success';
    } catch (error) {
        handleError(error, 'health-info');
    }
}

// Загрузка системной информации
async function loadSystemInfo() {
    const element = document.getElementById('system-info');
    element.textContent = 'Загрузка...';
    element.className = 'info-box loading';
    
    try {
        const response = await fetch(`${API_URL}/info`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        element.textContent = formatJSON(data);
        element.className = 'info-box success';
    } catch (error) {
        handleError(error, 'system-info');
    }
}

// Вычисление
async function calculate() {
    const numA = document.getElementById('num-a').value;
    const numB = document.getElementById('num-b').value;
    const element = document.getElementById('calc-result');
    
    if (!numA || !numB) {
        element.textContent = 'Пожалуйста, введите оба числа';
        element.className = 'info-box error';
        return;
    }
    
    element.textContent = 'Вычисление...';
    element.className = 'info-box loading';
    
    try {
        const response = await fetch(`${API_URL}/calc/${numA}/${numB}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        const data = await response.json();
        element.textContent = formatJSON(data);
        element.className = 'info-box success';
    } catch (error) {
        handleError(error, 'calc-result');
    }
}

// Автоматическое обновление каждые 30 секунд
setInterval(() => {
    loadMainInfo();
    checkHealth();
    loadSystemInfo();
}, 30000);

// Загрузка данных при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    loadMainInfo();
    checkHealth();
    loadSystemInfo();
});
