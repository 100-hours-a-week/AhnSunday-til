// 토스트 메시지 표시 함수
function showToast() {
    const toast = document.querySelector(".finish");
    
    // toast 요소가 존재하는지 확인
    if (toast) {
        toast.style.visibility = "visible";
        toast.style.opacity = 0.9;

        // 1초 후 토스트 숨기기
        setTimeout(function () {
            toast.style.opacity = 0; // 페이드 아웃
            setTimeout(function () {
                toast.style.visibility = "hidden"; // 페이드 아웃 후 숨김
            }, 500); // 페이드 아웃 소요 시간
        }, 1000); // 표시 시간
    }
}

// 수정하기 버튼 클릭 이벤트
document.querySelector(".submitButton").addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 방지
    const nicknameInput = document.getElementById("nickname").value;
    const errorElement = document.getElementById("nicknameError");
    errorElement.style.visibility = "visible"; // 헬퍼 텍스트 보이기

    // 닉네임이 비어있는지 체크
    if (!nicknameInput) {
        errorElement.textContent = "*닉네임을 입력해주세요.";
        return;
    }

    // 닉네임 길이 체크
    if (nicknameInput.length > 10) {
        errorElement.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
        return;
    }

    // NOTE : 임시
    showToast()
    
    // // 서버에 닉네임 검사 요청
    // fetch('/users/nicknameCheck', { // TODO : 여기에 실제 백엔드 URL로 변경
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ nickname: nicknameInput }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.error) { // 서버에서 에러가 있는 경우
    //         errorElement.textContent = data.error; // 에러 메시지 표시
    //     } else {
    //         // 닉네임이 유효하면 토스트 메시지 표시
    //         showToast();
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     errorElement.textContent = "*서버 오류가 발생했습니다."; // 서버 오류 처리
    // });
});
// 모달 열기 함수
function openModal() {
    document.getElementById("modalOverlay").style.display = "flex";
}

// 모달 닫기 함수
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}

// 회원 탈퇴 확인 함수
function confirmDelete() {
    alert("회원 탈퇴가 완료되었습니다.");// NOTE : 쓸까 말까
    // 실제 탈퇴 로직
    closeModal();
    
}

//회원정보 변경
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const profileImagePreview = document.getElementById("profileImagePreview");
    const editProfileButton = document.getElementById("editProfile");
    const submitButton = document.querySelector(".submitButton");

    // 현재 사용자 ID (예시, 실제 사용자 ID는 로그인 세션 등에서 가져와야 함)
    const userId = '12345'; // NOTE : 실제 사용자 ID로 대체

    // 프로필 사진 클릭 시 파일 선택 트리거
    editProfileButton.addEventListener("click", function () {
        fileInput.click();
    });

    // 파일 선택 시 이미지 URL 설정 및 미리보기
    fileInput.addEventListener("change", async function (event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const uploadResponse = await fetch(`http://localhost:2000/users/editProfileImg/${userId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ newProfile_url: `http://localhost:2000/images/${file.name}` }), // 파일 경로를 미리 설정
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (uploadResponse.ok) {
                    const result = await uploadResponse.json();
                    if (result.message === "프로필 이미지 변경 성공") {
                        // 이미지 미리보기 업데이트
                        profileImagePreview.src = `http://localhost:2000/images/${file.name}`;
                        profileImagePreview.style.display = "block";
                        alert('프로필 이미지가 변경되었습니다.');
                    } else {
                        alert('프로필 이미지 변경 실패: ' + result.message);
                    }
                } else {
                    const error = await uploadResponse.json();
                    alert('프로필 이미지 변경 실패: ' + error.message);
                }
            } catch (error) {
                console.error('네트워크 오류:', error);
                alert('서버에 연결할 수 없습니다.');
            }
        }
    });

    // 회원 정보 수정 버튼 클릭 시 데이터 전송 (닉네임 수정 포함)
    submitButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const nickname = document.getElementById("nickname").value;

        // 닉네임 유효성 검사
        if (!nickname) {
            alert('닉네임을 입력해주세요.');
            return;
        }

        const userData = {
            newNickname: nickname
        };

        try {
            const nicknameResponse = await fetch(`http://localhost:3000/users/nicknameCheck/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (nicknameResponse.ok) {
                const result = await nicknameResponse.json();
                alert('닉네임이 변경되었습니다.');
            } else {
                const error = await nicknameResponse.json();
                if (nicknameResponse.status === 401) {
                    alert('*중복된 닉네임입니다.');
                } else {
                    alert('닉네임 변경 실패: ' + error.message);
                }
            }
        } catch (error) {
            console.error('네트워크 오류:', error);
            alert('서버에 연결할 수 없습니다.');
        }
    });
});
