document.addEventListener("DOMContentLoaded", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const normalProfile = document.querySelector(".normalProfile");

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

    // 드롭다운 메뉴 클릭 이벤트
    document.getElementById("editUserInfo").addEventListener("click", function () {
        window.location.href = "../public/editUserInfo.html";
    });

    document.getElementById("editPassword").addEventListener("click", function () {
        window.location.href = "../public/editPassword.html";
    });

    document.getElementById("logout").addEventListener("click", function () {
        console.log("로그아웃 클릭")
        window.location.href = "../public/login.html";
    });

    // 드롭다운 메뉴 토글 기능 연결
    normalProfile.addEventListener("click", function(event) {
        event.stopPropagation(); // 클릭 이벤트가 상위로 전파되지 않도록 함
        toggleDropdown();
    });
});
