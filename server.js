const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 2000;

app.use(express.static(path.join(__dirname, 'public')));

app.get(['/login', '/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/regist', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/regist.html'));
});
app.get('/editPassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/editPassword.html'));
});
app.get('/editUserInfo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/editUserInfo.html'));
});
app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/posts.html'));
});
app.get('/viewPost', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/viewPost.html'));
});
app.get('/editPost', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/editPost.html'));
});
app.get('/writePost', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/writePost.html'));
});
app.post('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});