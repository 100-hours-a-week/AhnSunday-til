document.addEventListener("DOMContentLoaded", function() {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const submitButton = document.querySelector(".submitButton");
    const errorText = document.getElementById("errorMessage");

    // 초기 상태에서 오류 메시지 숨김
    errorText.style.display = "none";

    // 제목과 내용이 모두 입력될 때 버튼 색상 변경 및 활성화
    function toggleButtonState() {
        if (titleInput.value.trim() !== "" && contentInput.value.trim() !== "") {
            submitButton.disabled = false; // 버튼 활성화
            submitButton.style.backgroundColor = "#7F6AEE"; // 색상 변경
        } else {
            submitButton.disabled = true; // 버튼 비활성화
            submitButton.style.backgroundColor = "#ACA0EB"; // 기본 색상으로 복원
        }
    }

    // 입력 필드에 이벤트 리스너 추가
    titleInput.addEventListener("input", toggleButtonState);
    contentInput.addEventListener("input", toggleButtonState);

    // 버튼 클릭 시 입력 확인
    submitButton.addEventListener("click", function(event) {
        if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
            event.preventDefault(); // 기본 동작 방지
            errorText.innerText = "*제목, 내용을 모두 작성해주세요"; // 경고 메시지
            errorText.style.display = "block"; // 오류 메시지 보이기
        } else {
            errorText.style.display = "none"; // 오류 메시지 숨기기 (모든 조건 충족 시)
        }
    });
});
document.getElementById('goBack').addEventListener('click', () => {
    console.log("뒤로가기 클릭")
    window.history.back(); // 이전 페이지로 이동
});