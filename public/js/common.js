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
    });
    // 드롭다운 메뉴 클릭
    document.getElementById("editUserInfo").addEventListener("click", function () {
        window.location.href = "/editUserInfo";
    });

    document.getElementById("editPassword").addEventListener("click", function () {
        window.location.href = "/editPassword";
    });

    document.getElementById("logout").addEventListener("click", async function () {
        console.log("로그아웃 클릭")
        try {
            const response = await fetch('http://localhost:3000/users/logout', {
                method: 'POST',
                credentials: 'include' // 세션 쿠키 포함
            });
            if (response.ok) {
                // 클라이언트 세션 초기화
                sessionStorage.removeItem('user');
                // 로그인 페이지로 이동
                window.location.href = "/login";
            } else {
                const error = await response.json();
                alert("로그아웃 실패: " + error.message);
            }
        } catch (error) {
            alert("네트워크 오류 발생");
        }
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

// 로그인된 사용자 정보 불러오기
async function loadUserInfo() {
    try {
        const userInfoResponse = await fetch('http://localhost:3000/auth/userInfo', {
            method: 'GET',
            credentials: 'include' // 세션 쿠키 포함
        });

        if (!userInfoResponse.ok) {
            if (userInfoResponse.status === 401) {
                console.error("로그인 필요: 세션이 만료되었거나 로그인되지 않았습니다.");
                alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
                window.location.href = '/login';
            } else {
                console.error("서버 응답 실패: ", userInfoResponse.status);
                throw new Error('Failed to fetch user information.');
            }
        }

        const userInfoData = await userInfoResponse.json();

        if (userInfoData.data) {
            sessionStorage.setItem('user', JSON.stringify(userInfoData.data));
            const profileImageSrc = document.getElementById("profileImage");
            profileImageSrc.src = userInfoData.data.profileImage;
            return userInfoData.data;
        } else {
            throw new Error('사용자 정보가 없습니다.');
        }
    } catch (error) {
        console.error("loadUserInfo 에러 발생: ", error.message);
        alert(error.message);
        return null;
    }
}



// 날짜 포맷
function formatDateToCustomFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}