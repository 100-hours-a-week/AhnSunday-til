document.getElementById('loginButton').addEventListener('click', () => {
    console.log("로그인 클릭")
    // NOTE : 페이지 넘기기, 자세한 설정은 백엔드 연동하고
    window.location.href = "./posts.html"
    // 게시글 조회
});

document.getElementById('registButton').addEventListener('click', () => {
    console.log("회원가입 클릭")
    window.location.href = "./regist.html"
});
