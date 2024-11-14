// 토스트 메시지 표시 함수
function showToast() {
    const toast = document.querySelector(".finish");
    if (toast) {
        toast.style.visibility = "visible";
        toast.style.opacity = 0.9;
        setTimeout(function () {
            toast.style.opacity = 0;
            setTimeout(function () {
                toast.style.visibility = "hidden";
            }, 300);
        }, 1000);
    }
}

// 모달 열기 함수
function openModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    if (modalOverlay) {
        modalOverlay.style.display = "flex";
    }
}

// 모달 닫기 함수
function closeModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    if (modalOverlay) {
        modalOverlay.style.display = "none";
    }
}

// 회원 탈퇴 확인 함수
async function confirmDelete() {
    const userId = '4'; // 실제 사용자 ID로 대체
    try {
        const response = await fetch(`http://localhost:3000/users/withdraw/${userId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            closeModal();
            window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        } else {
            const error = await response.json();
            alert('회원 탈퇴 실패: ' + error.message);
        }
    } catch (error) {
        alert('서버 오류 발생');
    }
}

// 초기 DOM 로드 후 이벤트 설정
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const profileImagePreview = document.getElementById("profileImagePreview");
    const editProfileButton = document.getElementById("editProfile");
    const nicknameInput = document.getElementById("nickname");
    const submitButton = document.querySelector(".submitButton");
    const userId = '4'; 

    if (editProfileButton && fileInput) {
        editProfileButton.addEventListener("click", function () {
            fileInput.click();
        });

        // 프로필 이미지 변경 기능
        fileInput.addEventListener("change", async function (event) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("image", file);
                try {
                    const uploadResponse = await fetch(`http://localhost:2000/users/profileImg/${userId}`, {
                        method: 'PUT',
                        body: JSON.stringify({ newProfileImg: `http://localhost:2000/images/${file.name}` }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (uploadResponse.ok) {
                        profileImagePreview.src = `http://localhost:2000/images/${file.name}`;
                        profileImagePreview.style.display = "block";
                        showToast();
                    } else {
                        const error = await uploadResponse.json();
                        alert('프로필 이미지 변경 실패: ' + error.message);
                    }
                } catch (error) {
                    alert('네트워크 오류 발생');
                }
            }
        });
    }

    submitButton.addEventListener("click", async function (event) {
        event.preventDefault();
        const errorElement = document.getElementById("nicknameError");
        errorElement.textContent = "";  // 에러 메시지 초기화
        errorElement.style.visibility = "hidden"; 
    
        const nickname = nicknameInput.value;
    
        // 닉네임을 입력하지 않은 경우
        if (!nickname) {
            errorElement.textContent = "*닉네임을 입력해주세요.";
            errorElement.style.visibility = "visible"; 
            return;
        }
    
        // 닉네임이 11자 이상인 경우
        if (nickname.length > 10) {
            errorElement.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";
            errorElement.style.visibility = "visible";
            return;
        }
    
        // 서버에서 닉네임 중복 체크
        const userData = { newNickname: nickname };
        try {
            const nicknameResponse = await fetch(`http://localhost:3000/users/nickname/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
    
            if (nicknameResponse.ok) {
                showToast();
            } else {
                const error = await nicknameResponse.json();
                errorElement.textContent = error.message;
                errorElement.style.visibility = "visible"; 
            }
        } catch (error) {
            alert('네트워크 오류 발생');
        }
    });
});
