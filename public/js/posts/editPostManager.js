const submitButton = document.querySelector(".submitButton");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const errorText = document.getElementById("errorMessage");

// 게시글 수정 처리
submitButton.addEventListener("click", async function (event) {
    event.preventDefault(); // 기본 제출 이벤트 방지

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // 입력 유효성 검사
    if (title === "" || content === "") {
        errorText.innerText = "*제목, 내용을 모두 작성해주세요"; // 경고 메시지
        errorText.style.visibility = "visible"; // 오류 메시지 보이기
    } else {
        errorText.style.visibility = "hidden"; // 오류 메시지 숨기기
        console.log("수정버튼 클릭");
        // 수정된 정보를 서버로 보낼 수 있도록 추가 로직 작성
        // 예: 서버에 수정 요청을 보내고 성공 시 게시글 상세보기 페이지로 이동
        window.location.href = "../public/viewPost.html"; // 이 부분은 실제 로직에 맞게 수정 필요
    }
});