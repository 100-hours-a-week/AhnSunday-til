document.addEventListener("DOMContentLoaded", function () {
    const postBtn = document.getElementById("postBtn");
    const viewPost = document.querySelectorAll(".post");
    
    // 게시물 작성 버튼 클릭 시 writePost.html로 이동
    postBtn.addEventListener("click", function () {
        window.location.href = "/writePost";
    });
    
    // 각 게시물 클릭 시 writePost.html로 이동
    viewPost.forEach(function (viewPost) {
        viewPost.addEventListener("click", function () {
            window.location.href = "/viewPost";
        });
    });
});