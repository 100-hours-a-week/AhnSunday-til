document.addEventListener("DOMContentLoaded", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const normalProfile = document.querySelector(".normalProfile");
    const goBackButton = document.getElementById('goBack');
    // 초기 상태: 드롭다운 메뉴 숨기기
    dropdownMenu.style.display = "none";

    // 드롭다운 메뉴 토글 함수
    function toggleDropdown() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    }

    // 드롭다운 외부 클릭 시 닫기
    window.addEventListener("click", function(event) {
        // 드롭다운 외부 클릭 확인
        if (!event.target.closest(".normalProfile") && !event.target.closest("#dropdownMenu")) {
            dropdownMenu.style.display = "none";
        }
    });
    // header 클릭
    document.getElementById("headerBox").addEventListener("click", function () {
        window.location.href = "/posts";
        console.log("posts로");
    });
    // 드롭다운 메뉴 클릭
    document.getElementById("editUserInfo").addEventListener("click", function () {
        window.location.href = "/editUserInfo";
    });

    document.getElementById("editPassword").addEventListener("click", function () {
        window.location.href = "/editPassword";
    });

    document.getElementById("logout").addEventListener("click", function () {
        console.log("로그아웃 클릭")
        window.location.href = "/login";
    });

    // 드롭다운 메뉴 토글 기능 연결
    normalProfile.addEventListener("click", function(event) {
        event.stopPropagation(); // 클릭 이벤트가 상위로 전파되지 않도록 함
        toggleDropdown();
    });

    // 뒤로가기
    if (goBackButton) {
        goBackButton.addEventListener('click', () => {
            console.log("뒤로가기 클릭");
            window.history.back(); // 이전 페이지로 이동
        });
    }

    
});

// common.js
function formatDateToCustomFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
module.exports = { formatDateToCustomFormat };