document.getElementById('goBack').addEventListener('click', () => {
    console.log("뒤로가기 클릭");
    window.history.back(); // 이전 페이지로 이동
});

document.getElementById('loginButton').addEventListener('click', () => {
    console.log("로그인하러가기 클릭");
    window.location.href = "./login.html";
});

// 프로필 설정
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const profileImage = document.getElementById("profileImage");
    const profileBox = document.getElementById("profileBox");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const nicknameInput = document.getElementById("nickname");
    const registButton = document.getElementById("registButton");

    let profileImageFile = null; // 선택한 이미지 파일을 저장
    const profileError = document.getElementById("profileError");

    // 프로필 사진 클릭 시 파일 선택 트리거
    profileBox.addEventListener("click", function () {
        fileInput.click();
    });

    // 파일 선택 시 이미지 미리보기
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            profileImageFile = file; // 선택한 파일을 저장
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result; // 이미지 미리보기
                profileImage.style.display = "block";
                profileBox.style.background = "none";
                profileError.textContent = ""; // 에러 메시지 초기화
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 변환하여 미리보기
        } else {
            resetProfileImage();
        }
    });

    function resetProfileImage() {
        profileImage.src = "";
        profileImage.style.display = "none";
        profileBox.style.background = "#BDBDBD";
        profileImageFile = null; // 파일 리셋
    }

    // 유효성 검사
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailError.textContent = ""; // 이전 에러 메시지 초기화

        if (!email) {
            emailError.textContent = "*이메일을 입력해주세요.";
            return false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "*올바른 이메일 주소 형식을 입력해주세요.";
            return false;
        }
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        passwordError.textContent = ""; // 이전 에러 메시지 초기화
        confirmPasswordError.textContent = ""; // 이전 에러 메시지 초기화

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

        if (!password) {
            passwordError.textContent = "*비밀번호를 입력해주세요.";
            return false;
        } else if (!passwordPattern.test(password)) {
            passwordError.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 포함해야 합니다.";
            return false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "*비밀번호가 일치하지 않습니다.";
            return false;
        }
        return true;
    }

    function validateNickname() {
        const nickname = nicknameInput.value.trim();
        const nicknameError = document.getElementById("nicknameError");
        nicknameError.textContent = ""; // 이전 에러 메시지 초기화

        if (!nickname) {
            nicknameError.textContent = "*닉네임을 입력해주세요.";
            return false;
        } else if (nickname.length > 10) {
            nicknameError.textContent = "*닉네임은 최대 10자까지 입력 가능합니다.";
            return false;
        } else if (/\s/.test(nickname)) {
            nicknameError.textContent = "*띄어쓰기를 제거해주세요.";
            return false;
        }
        return true;
    }

    function validateProfileImage() {
        if (!profileImageFile) {
            profileError.textContent = "*프로필 사진을 추가해주세요.";
            return false;
        } else {
            profileError.textContent = ""; // 에러 메시지 초기화
        }
        return true;
    }

    // 유효성 검사 후 버튼 활성화
    function toggleSubmitButton() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isNicknameValid = validateNickname();
        const isProfileImageValid = validateProfileImage(); // 프로필 이미지 유효성 검사 추가

        // 모든 유효성 검사가 통과하면 버튼 활성화
        if (isEmailValid && isPasswordValid && isNicknameValid && isProfileImageValid) {
            registButton.disabled = false;
            registButton.style.backgroundColor = "#7F6AEE";
        } else {
            registButton.disabled = true;
            registButton.style.backgroundColor = "#ACA0EB";
        }
    }

    // 포커스 아웃 시 유효성 검사
    emailInput.addEventListener("focusout", toggleSubmitButton);
    passwordInput.addEventListener("focusout", toggleSubmitButton);
    confirmPasswordInput.addEventListener("focusout", toggleSubmitButton);
    nicknameInput.addEventListener("focusout", toggleSubmitButton);

    // 회원가입 버튼 클릭 시 데이터 JSON으로 저장
    registButton.addEventListener("click", async function (event) {
        event.preventDefault();

        if (!validateEmail() || !validatePassword() || !validateNickname() || !validateProfileImage()) {
            return; // 모든 유효성 검사가 통과하지 않으면 종료
        }

        // 프로필 이미지 업로드
        const formData = new FormData();
        formData.append("image", profileImageFile); // 선택한 이미지 파일 추가
        try {
            const uploadResponse = await fetch('http://localhost:2000/upLoadProfile', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                const error = await uploadResponse.json();
                console.error('프로필 이미지 업로드 실패:', error);
                alert('프로필 이미지 업로드에 실패했습니다.');
                return; // 업로드 실패 시 종료
            }

            const result = await uploadResponse.json();
            const profileImageUrl = result.imageUrl; // 서버에서 반환된 이미지 URL

            const userData = {
                email: emailInput.value,
                password: passwordInput.value,
                nickname: nicknameInput.value,
                profileImage: profileImageUrl // 이미지 URL 저장
            };

            const response = await fetch('http://localhost:3000/auth/regist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('회원가입 데이터 저장 완료:', result);
                alert('회원가입이 완료되었습니다.');
                window.location.href = "/login";
            } else {
                const error = await response.json();
                console.error('회원가입 데이터 저장 실패:', error);
                alert('회원가입 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('네트워크 오류:', error);
            alert('서버에 연결할 수 없습니다.');
        }
    });
});
