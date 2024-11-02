document.getElementById('goBack').addEventListener('click', () => {
    console.log("뒤로가기 클릭")
    window.history.back(); // 이전 페이지로 이동
});

document.getElementById('loginButton').addEventListener('click', () => {
    console.log("로그인하러가기 클릭")
    window.location.href = "./login.html"
});

document.getElementById('registButton').addEventListener('click', () => {
    console.log("회원가입 클릭")
    window.location.href = "./login.html"
});
