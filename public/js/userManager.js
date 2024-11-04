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
            }, 10); // 페이드 아웃 소요 시간
        }, 1000); // 표시 시간
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
function confirmDelete() {
    alert("회원 탈퇴가 완료되었습니다."); // NOTE : 쓸까 말까
    closeModal();
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const profileImagePreview = document.getElementById("profileImagePreview");
    const editProfileButton = document.getElementById("editProfile");
    const submitButton = document.querySelector(".submitButton");

    // 현재 사용자 ID (예시, 실제 사용자 ID는 로그인 세션 등에서 가져와야 함)
    const userId = '12345'; // NOTE : 실제 사용자 ID로 대체

    if (editProfileButton && fileInput) {
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
                        if (result.message === "프로필 이미지 변경 성공" && profileImagePreview) {
                            // 이미지 미리보기 업데이트
                            profileImagePreview.src = `http://localhost:2000/images/${file.name}`;
                            profileImagePreview.style.display = "block";
                            console.log('프로필 이미지가 변경되었습니다.');
                        } else {
                            console.log('프로필 이미지 변경 실패: ' + result.message);
                        }
                    } else {
                        const error = await uploadResponse.json();
                        console.log('프로필 이미지 변경 실패: ' + error.message);
                    }
                } catch (error) {
                    console.error('네트워크 오류:', error);
                    alert('서버에 연결할 수 없습니다.');
                }
            }
        });
    }

    if (submitButton) {
        // 회원 정보 수정 버튼 클릭 시 데이터 전송 (닉네임 수정 포함)
        submitButton.addEventListener("click", async function (event) {
            event.preventDefault();

            const nicknameInput = document.getElementById("nickname");
            const errorElement = document.getElementById("nicknameError");

            if (!nicknameInput || !errorElement) {
                console.log("닉네임 입력 또는 오류 표시 요소를 찾을 수 없습니다.");
                return;
            }

            errorElement.style.visibility = "visible"; // 헬퍼 텍스트 보이기

            // 닉네임이 비어있는지 체크
            if (!nicknameInput.value) {
                errorElement.textContent = "*닉네임을 입력해주세요.";
                return;
            }

            // 닉네임 길이 체크
            if (nicknameInput.value.length > 10) {
                errorElement.textContent = "*닉네임은 최대 10자까지 작성 가능합니다.";
                return;
            }

            const userData = { newNickname: nicknameInput.value };

            try {
                const nicknameResponse = await fetch(`http://localhost:3000/users/nicknameCheck/${userId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                if (nicknameResponse.ok) {
                    const result = await nicknameResponse.json();
                    console.log('회원정보가 변경되었습니다.');
                    showToast();
                } else {
                    const error = await nicknameResponse.json();
                    if (nicknameResponse.status === 401) {
                        console.log('*중복된 닉네임입니다.');
                    } else {
                        console.log('회원정보 변경 실패: ' + error.message);
                    }
                }
            } catch (error) {
                console.error('네트워크 오류:', error);
                alert('서버에 연결할 수 없습니다.');
            }
        });
    }
});

// 비밀번호 수정
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const submitButton = document.querySelector(".submitButton");

    // 비밀번호 유효성 검사 함수
    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // 에러 메시지 초기화
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";

        // 비밀번호 유효성 검사 정규식 (8~20자, 대문자, 소문자, 숫자, 특수문자 포함)
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

        // 비밀번호 입력 확인
        if (!password) {
            passwordError.textContent = "*비밀번호를 입력해주세요.";
            passwordError.style.visibility = "visible"; // 헬퍼 메시지 보이기
            return false;
        } else if (!passwordPattern.test(password)) {
            passwordError.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 포함해야 합니다.";
            passwordError.style.visibility = "visible"; // 헬퍼 메시지 보이기
            return false;
        } else {
            passwordError.style.visibility = "hidden"; // 유효성 통과 시 숨기기
        }

        // 비밀번호 확인 입력 확인
        if (!confirmPassword) {
            confirmPasswordError.textContent = "*비밀번호를 한번 더 입력해주세요.";
            confirmPasswordError.style.visibility = "visible"; // 헬퍼 메시지 보이기
            return false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "*비밀번호가 일치하지 않습니다.";
            confirmPasswordError.style.visibility = "visible"; // 헬퍼 메시지 보이기
            return false;
        } else {
            confirmPasswordError.style.visibility = "hidden"; // 유효성 통과 시 숨기기
        }

        return true;
    }

    // 입력 변경 시 유효성 검사 및 버튼 활성화 상태 갱신
    function updateButtonState() {
        if (validatePassword()) {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "#7F6AEE"; // 활성화 색상
        } else {
            submitButton.disabled = true;
            submitButton.style.backgroundColor = "#ACA0EB"; // 비활성화 색상
        }
    }

    // 비밀번호와 비밀번호 확인 필드 변경 시마다 유효성 검사
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener("input", updateButtonState);
        confirmPasswordInput.addEventListener("input", updateButtonState);
    }

    // 비밀번호 수정 버튼 클릭 시 유효성 검사 및 데이터 전송
    if (submitButton) {
        submitButton.addEventListener("click", async function (event) {
            event.preventDefault();

            // 비밀번호 유효성 검사
            if (!validatePassword()) {
                return;
            }

            // 서버에 전송할 데이터 (테스트용으로 주석 처리)
            /*
            const passwordData = { newPassword: passwordInput.value };
            const userId = '12345'; // 실제 사용자 ID로 대체

            try {
                const response = await fetch(`http://localhost:3000/users/updatePassword/${userId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(passwordData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('비밀번호가 성공적으로 변경되었습니다.');
                    showToast(); // 수정 완료 토스트 메시지 표시
                } else {
                    const error = await response.json();
                    console.log('비밀번호 변경 실패: ' + error.message);
                }
            } catch (error) {
                console.error('네트워크 오류:', error);
                alert('서버에 연결할 수 없습니다.');
            }
            */

            // 서버와 연결 없이 '수정 완료' 토스트 메시지 표시
            console.log('비밀번호가 성공적으로 변경되었습니다. (테스트용)');
            showToast();
        });
    }
});
