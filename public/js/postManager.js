document.addEventListener("DOMContentLoaded", function () {
    const postBtn = document.getElementById("postBtn");
    const viewPosts = document.querySelectorAll(".post");
    const editPost = document.querySelector(".commentEditBtn");

    
    // 게시물 작성 버튼이 존재할 경우 클릭 이벤트 추가
    if (postBtn) {
        postBtn.addEventListener("click", function () {
            window.location.href = "./writePost.html";
        });
    }

    // 각 게시물이 존재할 경우 클릭 이벤트 추가
    if (viewPosts.length > 0) {
        viewPosts.forEach(function (viewPost) {
            viewPost.addEventListener("click", function () {
                window.location.href = "./viewPost.html";
            });
        });
    }

    // 게시물 수정 버튼이 존재할 경우 클릭 이벤트 추가
    if (editPost) {
        editPost.addEventListener("click", function () {
            window.location.href = "./editPost.html";

            // 수정할 게시물 정보 땡겨오기
        });
    }
});
function isDeletePost() {
    document.getElementById("modalOverlay").style.display = "flex";
}
// 모달 닫기 함수
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}
// 삭제 확인 함수
function confirmDelete() {
    alert("게시글 삭제가 완료되었습니다.");
    closeModal();
    // 실제 삭제 로직
}