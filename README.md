## Визуализация алгоритма сортировки пузырьком.

Запуск:
```
npm install && npm start
open http://localhost:8086
```
Запрос данных от сервера осуществляется по URL:
```
http://localhost:1234/array
```

1. Настроен Webpack с Dev-server на перекомпиляцию TypeScrtipt в JS. См. конфиг Webpack.
2. Включена Source Map. См. конфиг Webpack.
3. Настроен линтер ESlint c @typescript-eslint и plugin:@typescript-eslint/recommended
4. Конфигурация для компиляции TypeScript в tsconfig.json, он же транспилирует ES6 в ES5.
