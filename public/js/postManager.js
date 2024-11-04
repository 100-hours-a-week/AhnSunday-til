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

// 게시물 수정
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".submitButton");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const errorText = document.getElementById("errorMessage");
    
    // 수정하기 버튼 클릭 시
    if (submitButton) {
        submitButton.addEventListener("click", async function (event) {
            event.preventDefault(); // 기본 제출 이벤트 방지

            const title = titleInput.value.trim();
            const content = contentInput.value.trim();

            // 입력 유효성 검사
            if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
                event.preventDefault(); // 기본 동작 방지
                errorText.innerText = "*제목, 내용을 모두 작성해주세요"; // 경고 메시지
                errorText.style.visibility = "visible"; // 오류 메시지 보이기
            } else {
                errorText.style.visibility = "hidden"; // 오류 메시지 숨기기 (모든 조건 충족 시)
                console.log("수정버튼 클릭");
                window.location.href = "../public/viewPost.html";
            }
            // 백엔드에 요청을 보내는 부분 주석 처리
            // 게시글 ID를 URL에서 가져오는 예시 (실제 상황에 맞게 수정)
            /*
            const postId = "1"; // 수정할 포스트 ID (예시)

            // 수정할 데이터
            const postData = {
                title: title,
                content: content
            };

            
            
            try {
                const response = await fetch(`http://localhost:3000/posts/edit/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });

                if (response.ok) {
                    // 수정 성공 시 상세보기 페이지로 이동
                    window.location.href = `/viewPost/${postId}`; // 수정된 포스트의 상세보기로 이동
                } else {
                    const error = await response.json();
                    console.log('수정 실패:', error.message);
                    alert("게시글 수정에 실패했습니다.");
                }
            } catch (error) {
                console.error('네트워크 오류:', error);
                alert('서버에 연결할 수 없습니다.');
            }
            */
        });
    }
});
