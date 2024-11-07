document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const loginButton = document.getElementById("loginButton");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // 로그인 버튼을 처음부터 비활성화
    loginButton.disabled = true;
    loginButton.style.backgroundColor = "#ACA0EB";

    // 이메일 유효성 검사
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailError.textContent = ""; // 에러 메시지 초기화

        if (!emailValue) {
            emailError.textContent = "*이메일을 입력해주세요.";
            emailError.style.visibility = "visible";
            return false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)";
            emailError.style.visibility = "visible";
            return false;
        } else {
            emailError.style.visibility = "hidden";
            return true;
        }
    }

    // 비밀번호 유효성 검사
    function validatePassword() {
        const passwordValue = passwordInput.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
        passwordError.textContent = ""; // 에러 메시지 초기화

        if (!passwordValue) {
            passwordError.textContent = "*비밀번호를 입력해주세요.";
            passwordError.style.visibility = "visible";
            return false;
        } else if (!passwordPattern.test(passwordValue)) {
            passwordError.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 포함해야 합니다.";
            passwordError.style.visibility = "visible";
            return false;
        } else {
            passwordError.style.visibility = "hidden";
            return true;
        }
    }

    // 버튼 활성화/비활성화 제어
    function toggleLoginButton() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            loginButton.disabled = false;
            loginButton.style.backgroundColor = "#7F6AEE";
        } else {
            loginButton.disabled = true;
            loginButton.style.backgroundColor = "#ACA0EB";
        }
    }

    // 입력 이벤트 발생 시 유효성 검사 실행
    emailInput.addEventListener("input", toggleLoginButton);
    passwordInput.addEventListener("input", toggleLoginButton);

    // 로그인 버튼 클릭 시 API 호출 및 처리
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault(); // 폼 제출 방지

        // 유효성 검사 통과 여부 확인
        if (validateEmail() && validatePassword()) {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    // 로그인 성공
                    console.log(result.message); // "로그인 성공"
                    passwordError.textContent = ""; // 에러 메시지 초기화
                    passwordError.style.visibility = "hidden"; // 에러 메시지 숨김

                    // 응답받은 사용자 정보 처리
                    const userData = result.data;
                    localStorage.setItem('user', JSON.stringify(userData)); // 사용자 데이터 저장

                    // 페이지 이동
                    window.location.href = "./posts.html"; // 원하는 페이지로 이동
                } else if (response.status === 401) {
                    // 이메일 또는 비밀번호가 올바르지 않은 경우
                    passwordError.textContent = "*이메일 또는 비밀번호가 올바르지 않습니다.";
                    passwordError.style.visibility = "visible";
                } else if (response.status === 500) {
                    // 서버 오류
                    passwordError.textContent = "*서버에 오류가 발생했습니다. 다시 시도해주세요.";
                    passwordError.style.visibility = "visible";
                }
            } catch (error) {
                console.error('네트워크 오류:', error);
                alert("*서버에 연결할 수 없습니다.");
            }
        }
    });
});


document.getElementById('registButton').addEventListener('click', () => {
    console.log("회원가입 클릭")
    window.location.href = "./regist.html"
});
