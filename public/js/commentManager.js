// 모달 열기 함수
function isDeleteComment()  {
    document.getElementById("modalOverlay2").style.display = "flex";
}
// 모달 닫기 함수
function closeModal2() {
    document.getElementById("modalOverlay2").style.display = "none";
}
// 삭제 확인 함수
function confirmDelete2() {
    alert("댓글 삭제가 완료되었습니다.");
    closeModal2();
    // 실제 삭제 로직
}

// 현재 수정 중인 댓글을 기억하기 위한 변수
let currentEditingComment = null;

// '수정' 버튼 클릭 시 실행되는 함수
function editComment(commentElement) {
    // 수정 중인 댓글 요소를 설정
    currentEditingComment = commentElement;

    // 현재 댓글 텍스트를 가져와 inputComment 입력 필드에 표시
    const commentText = commentElement.querySelector('.commentContents p').innerText;
    document.getElementById('inputComment').value = commentText;

    // 댓글 등록 버튼을 '댓글 수정'으로 변경
    const submitButton = document.querySelector('.commentBtn');
    submitButton.value = '댓글 수정';
    submitButton.setAttribute('onclick', 'updateComment()'); // 버튼 클릭 시 updateComment 호출
}

// 수정 완료 버튼 클릭 시 실행되는 함수
function updateComment() {
    // inputComment 입력 필드에서 새로운 댓글 텍스트를 가져옴
    const updatedText = document.getElementById('inputComment').value;

    // 현재 수정 중인 댓글의 텍스트를 업데이트
    if (currentEditingComment) {
        currentEditingComment.querySelector('.commentContents p').innerText = updatedText;

        // NOTE : 백엔드로 요청 정보 보내기
    }

    // 입력 필드를 비우고 댓글 등록 버튼을 초기화
    document.getElementById('inputComment').value = '';
    const submitButton = document.querySelector('.commentBtn');
    submitButton.value = '댓글 등록';
    submitButton.setAttribute('onclick', 'addComment()'); // 버튼을 다시 댓글 등록용으로 변경

    // 수정 중인 댓글 변수 초기화
    currentEditingComment = null;
}

// 새로운 댓글 추가 함수 (기존 댓글 추가 로직 유지)
function addComment() {
    // 새로운 댓글 추가 로직
    const commentText = document.getElementById('inputComment').value;

    // 댓글 추가하는 코드 (구현된 함수에 맞게 추가)
    appendComment(commentText); // appendComment 함수는 새 댓글을 목록에 추가합니다.

    // 입력 필드를 초기화
    document.getElementById('inputComment').value = '';
}