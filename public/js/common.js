document.addEventListener("DOMContentLoaded", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    
    // 드롭다운 메뉴 토글 함수
    function toggleDropdown() {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    }

    // 드롭다운 외부 클릭 시 닫기
    window.onclick = function(event) {
        if (!event.target.closest(".normalProfile")) {
            dropdownMenu.style.display = "none";
        }
    };

    // 드롭다운 메뉴 클릭 이벤트
    document.getElementById("editUserInfo").addEventListener("click", function () {
        window.location.href = "http://localhost:2000/editUserInfo";
    });

    document.getElementById("editPassword").addEventListener("click", function () {
        window.location.href = "http://localhost:2000/editPassword";
    });

    document.getElementById("logout").addEventListener("click", function () {
        fetch("http://localhost:3000/user/logout", { method: "POST" })
            .then(response => {
                if (response.ok) {
                    window.location.href = "http://localhost:2000"; // 로그아웃 후 메인 페이지로 이동
                } else {
                    alert("로그아웃 실패. 다시 시도해주세요.");
                }
            })
            .catch(error => console.error("Error:", error));
    });

    // 드롭다운 메뉴 토글 기능 연결
    const normalProfile = document.querySelector(".normalProfile");
    normalProfile.onclick = toggleDropdown;
});
