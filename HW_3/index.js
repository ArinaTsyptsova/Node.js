const express = require('express');
const app = express();
const fs = require("fs");
const dirFile = "counter.json";

let counter = {};

try {
    counter = JSON.parse(fs.readFileSync('counter.json', 'utf8'));
} catch(err) {
    console.error('Ошибка загрузки данных из файла');
}

function saveToFile(counterObj) {
    fs.writeFileSync(dirFile, JSON.stringify(counterObj));
}

app.get('/', (req, res) => {
    counter['/'] = (counter['/'] || 0) + 1;
    saveToFile(counter);
    res.send(`
        <h1>Первая страница</h1>
        <h3>Количество просмотров: ${counter[req.url]}</h3>
        <a href = "/about">Вторая страница</a>`);
});

app.get('/about', (req, res) => {
    counter['/about'] = (counter['/about'] || 0) + 1;
    saveToFile(counter);
    res.send(`
        <h1>Вторая страница</h1>
        <h3>Количество просмотров: ${counter[req.url]}</h3>
        <a href="/">Первая страница</a>`);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});