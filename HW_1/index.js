const http = require("http");

let counter = {
    "/": 0,
    "/about": 0,
};

const server = http.createServer((req, res) => {
    console.log("Запрос получен");

    if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        counter[req.url]++;
        res.end(`
        <h1>Первая страница</h1>
        <h3>Количество просмотров: ${counter[req.url]}</h3>
        <a href = "/about">Вторая страница</a>
        `);
    } else if (req.url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        counter[req.url]++;
        res.end(`
        <h1>About</h1>
        <h3>Количество просмотров: ${counter[req.url]}</h3>
        <a href="/">Первая страница</a>
        `);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end(`
        <h1>Что-то пошло не так... Страница не найдена</h1>
        <a href="/">Первая страница</a>
        <a href = "/about">Вторая страница</a>
        `);
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на прорту ${port}`);
});