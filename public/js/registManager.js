document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const profileImage = document.getElementById("profileImage");
    const profileBox = document.getElementById("profileBox");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const nicknameInput = document.getElementById("nickname");
    const registButton = document.getElementById("registButton");

    let profileImageBase64 = ""; // Base64 형식의 프로필 이미지 저장
    
    // 프로필 사진 클릭 시 파일 선택 트리거
    profileBox.addEventListener("click", function () {
        fileInput.click();
    });

    // 파일 선택 시 Base64로 변환하여 미리보기 및 저장
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImageBase64 = e.target.result; // Base64로 이미지 저장
                profileImage.src = profileImageBase64; // 이미지 미리보기
                profileImage.style.display = "block";
                profileBox.style.background = "none";
            };
            reader.readAsDataURL(file);
        } else {
            resetProfileImage();
        }
    });

    function resetProfileImage() {
        profileImage.src = "";
        profileImage.style.display = "none";
        profileBox.style.background = "#BDBDBD";
        profileImageBase64 = "";
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

    // 유효성 검사 후 버튼 활성화
    function toggleSubmitButton() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isNicknameValid = validateNickname();

        // 모든 유효성 검사가 통과하면 버튼 활성화
        if (isEmailValid && isPasswordValid && isNicknameValid) {
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

        if (!validateEmail() || !validatePassword() || !validateNickname()) {
            return;
        }

        const userData = {
            email: emailInput.value,
            password: passwordInput.value,
            nickname: nicknameInput.value,
            profileImage: profileImageBase64 // Base64 인코딩된 이미지 저장
        };

        try {
            const response = await fetch('http://localhost:3000/user/regist', {
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
