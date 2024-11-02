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
