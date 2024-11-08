document.addEventListener("DOMContentLoaded", function() {
    // 게시글 정보 표시 요소
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");
    const postLikes = document.getElementById("likesCount");
    const postViews = document.getElementById("viewsCount");
    const postComments = document.getElementById("commentsCount");
    const postDate = document.getElementById("postDate");
    const postAuthor = document.getElementById("userNickname");
    const postImage = document.getElementById("postImage");

    // 댓글 관련 요소
    const commentsContainer = document.getElementById("commentsContainer");

    // 삭제 버튼에 이벤트 리스너 추가
    const deletePostBtn = document.getElementById("deletePostBtn");
    if (deletePostBtn) {
        deletePostBtn.addEventListener("click", isDeletePost);
    }

    // 게시글 상세조회
    async function fetchPostDetails(postId) {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`);
            if (!response.ok) {
                throw new Error(`게시글을 불러오는 데 실패했습니다. 상태 코드: ${response.status}`);
            }

            const data = await response.json();
            const postData = data.data;
            
            postTitle.innerHTML = `<strong>${postData.title}</strong>`;
            postContent.innerHTML = postData.content;
            postLikes.innerHTML = postData.likes;
            postViews.innerHTML = postData.views;
            postComments.innerHTML = postData.commentsCnt;
            postDate.innerHTML = postData.date;
            postAuthor.innerHTML = postData.author.nickname;
            postImage.src = postData.imageUrl;

            displayComments(postData.comments);
        } catch (error) {
            console.error(error);
            alert(`게시글을 불러오는 중 오류가 발생했습니다. ${error.message}`);
        }
    }

    // 댓글
    function displayComments(comments) {
        commentsContainer.innerHTML = "";
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            commentElement.innerHTML = `
                <div class="profileSection">
                    <div class="normalProfile">
                        <div class="box" style="background: #BDBDBD;">
                            <img class="profile" src="${comment.author.profileImg}">
                        </div>
                    </div>
                </div>
                <div class="userInfo2">
                    <div class="author">
                        <p>${comment.author.nickname}</p>
                        <p>${comment.date}</p>
                    </div>
                    <div class="commentContents">
                        <p>${comment.content}</p>
                    </div>
                </div>
                <div class="edit">
                    <div class="bnt">
                        <div class="commentEditBtn" onclick="editComment(this.closest('.comment'))">
                            <p><strong>수정</strong></p>
                        </div>
                    </div>
                    <div class="bnt" onclick="isDeleteComment()">
                        <div class="commentEditBtn">
                            <p><strong>삭제</strong></p>
                        </div>
                    </div>
                </div>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    // 페이지가 로드될 때 특정 게시글의 데이터를 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    if (postId) {
        fetchPostDetails(postId);
    } else {
        alert("잘못된 게시글 ID입니다.");
    }
});

// 게시글 삭제 로직
function isDeletePost() {
    document.getElementById("modalOverlay").style.display = "flex";
}

// 모달 닫기
function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}

// 게시글 삭제 확인
function confirmDelete() {
    alert("게시글 삭제가 완료되었습니다.");
    closeModal();
    // 실제 삭제 로직 추가
}