document.addEventListener("DOMContentLoaded", function () {
    // 회원가입 버튼 클릭 시 /regist로 이동
    const registButton = document.getElementById("registButton");
        registButton.addEventListener("click", function () {
            window.location.href = "/regist" // /regist로 이동
    });

    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const loginButton = document.getElementById("loginButton");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // 이메일 검사 함수
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // 비밀번호 검사 함수
    function isValidPassword(password) {
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordPattern.test(password);
    }

    // 유효성 검사 후 오류 메시지 표시 및 로그인 요청
    async function validateForm(event) {
        let formIsValid = true;

        // 이메일 유효성 검사
        if (!isValidEmail(emailInput.value)) {
            emailError.style.display = "block";
            formIsValid = false;
        } else {
            emailError.style.display = "none";
        }

        // 비밀번호 유효성 검사
        if (!passwordInput.value) {
            passwordError.textContent = "*비밀번호를 입력해주세요.";
            passwordError.style.display = "block";
            formIsValid = false;
        } else if (!isValidPassword(passwordInput.value)) {
            passwordError.textContent =
                "*비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.";
            passwordError.style.display = "block";
            formIsValid = false;
        } else {
            passwordError.style.display = "none";
        }

        // 검사를 통과하지 못하면 기본 동작을 방지
        if (!formIsValid) {
            event.preventDefault();
            return; // 더 이상 진행하지 않음
        }

        // 유효성 검사를 통과한 경우, 백엔드에 로그인 요청
        const credentials = {
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                // 로그인 성공
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/posts'; // 로그인 후 posts로 이동
            } else {
                // 로그인 실패
                if (data.error) {
                    passwordError.textContent = data.error; // 백엔드에서 받은 에러 메시지 표시
                    passwordError.style.display = "block";
                }
            }
        } catch (error) {
            console.error('Error:', error);
            passwordError.textContent = "*서버 오류가 발생했습니다.";
            passwordError.style.display = "block";
        }
    }

    // 유효성 검사 및 로그인 요청
    loginButton.addEventListener("click", validateForm);

});