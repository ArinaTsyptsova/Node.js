const express = require('express');
const app = express();

const path = require("path");
const fs = require('fs');

const {checkUsers} = require('./validator');

const usersDB = path.join(__dirname, 'users.json');
const userID = path.join(__dirname, 'id.json');

app.use(express.json()); // преобразует входящие запросы в JSON

// Отдаем список всех пользователей
app.get('/users', (req, res) => {
    res.send(fs.readFileSync(usersDB));
});

// Отдаем одного пользователя по ID
app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send(user);
    } else {
        res.status(404);
        res.send({user: null});
    }
});

// Добавляем пользователя, проверяем данные
app.post('/users', (req, res) => {
    checkUsers(req.body, res);
    const uniqueID = getIDUser(userID);
    const users = JSON.parse(fs.readFileSync(usersDB));

    users.push({
        id: uniqueID.id,
        ...req.body
    });

    fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));
    fs.writeFileSync(userID, JSON.stringify(uniqueID));

    res.send({
        id: uniqueID,
    });
});

// Обновляем данные пользователя, проверяем данные
app.put('/users/:id', (req, res) => {
    checkUsers(req.body, res);
    const users = JSON.parse(fs.readFileSync(usersDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user.name = req.body.name;
        user.city = req.body.city;

        fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));
        res.send(user);
    } else {
        res.status(404);
        res.send({user: null});
        }
});

// Удаляем пользователя
app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersDB));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);

        fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));
        res.send(user);
    } else {
        res.status(404);
        res.send({user: null});
    }
});

app.listen(3000);

function getIDUser(userID) {
    let uniqueID = JSON.parse(fs.readFileSync(userID));
    uniqueID.id += 1;
    return uniqueID;
}