#!/usr/bin/env python3
"""
Простое Flask приложение для тестирования Docker контейнера
"""

from flask import Flask, jsonify
import os
import socket
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    """Главная страница с информацией о контейнере"""
    hostname = socket.gethostname()
    return jsonify({
        'message': 'Приложение успешно работает в Docker контейнере!',
        'hostname': hostname,
        'timestamp': datetime.now().isoformat(),
        'status': 'OK'
    })

@app.route('/health')
def health():
    """Эндпоинт для проверки здоровья приложения"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/info')
def info():
    """Информация о системе"""
    return jsonify({
        'hostname': socket.gethostname(),
        'python_version': os.sys.version,
        'environment': os.environ.get('ENV', 'development'),
        'timestamp': datetime.now().isoformat()
    })

@app.route('/calc/<a>/<b>')
def calc(a, b):
    """Вычисление математических операций с двумя числами"""
    try:
        num_a = float(a)
        num_b = float(b)
        
        result = {
            'a': num_a,
            'b': num_b,
            'operations': {
                'addition': num_a + num_b,
                'subtraction': num_a - num_b,
                'multiplication': num_a * num_b,
            }
        }
        
        # Деление с проверкой на ноль
        if num_b != 0:
            result['operations']['division'] = num_a / num_b
        else:
            result['operations']['division'] = 'Error: Division by zero'
        
        result['timestamp'] = datetime.now().isoformat()
        
        return jsonify(result)
    except ValueError:
        return jsonify({
            'error': 'Invalid input: both parameters must be numbers',
            'a': a,
            'b': b
        }), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f'Starting Flask application on port {port}...')
    print(f'Environment: {os.environ.get("ENV", "development")}')
    app.run(host='0.0.0.0', port=port, debug=False)
