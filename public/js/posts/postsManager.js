document.addEventListener("DOMContentLoaded", function () {
    const postBtn = document.getElementById("postBtn");
    const postsContainer = document.querySelector('.postList'); // 게시글을 넣을 컨테이너 요소

    // 게시물 작성 버튼
    postBtn.addEventListener("click", function () {
        window.location.href = "./writePost";
    });

    // 게시글 목록 불러오기
    async function loadPostList() {
        try {
            // API 요청: 게시글 목록 가져오기
            const response = await fetch('http://localhost:3000/posts'); // 백엔드 URL
            const result = await response.json();

            // 서버 응답 확인
            if (response.ok && result.data) {
                const postList = result.data; // 게시글 목록

                // 기존 게시물들 제거 (초기화)
                postsContainer.innerHTML = '';

                // 게시글이 있는 경우 처리
                if (postList.length > 0) {
                    postList.forEach(post => {
                        // 게시글 요소 만들기
                        const postElement = document.createElement('div');
                        postElement.classList.add('post');
                        
                        // 게시글 제목
                        const postTitle = document.createElement('div');
                        postTitle.classList.add('title');
                        postTitle.innerHTML = `
                            <div class="titleTxt">
                                <p><strong>${post.title}</strong></p>
                            </div>
                            <div class="postElement">
                                <div class="ele1">
                                    <p id="likes">좋아요 ${post.likes || 0}</p>
                                    <p id="comments">댓글 ${post.commentsCnt || 0}</p>
                                    <p id="views">조회수 ${post.views || 0}</p>
                                </div>
                                <p id="date">${post.date}</p>
                            </div>
                        `;

                        // 게시글 작성자 정보
                        const postAuthor = document.createElement('div');
                        postAuthor.classList.add('user');
                        postAuthor.innerHTML = `
                            <div class="profileContainer">
                                <div class="box" id="author" style="background: #BDBDBD;">
                                    <img class="profile" src="${post.author.profileImg}" alt="${post.author.nickname}의 프로필">
                                </div>
                            </div>
                            <div class="nickname">
                                <p id="userTxt">${post.author.nickname}</p>
                            </div>
                        `;

                        // 게시글 전체 요소에 제목과 작성자 추가
                        postElement.appendChild(postTitle);
                        postElement.appendChild(postAuthor);

                        // 게시글을 postList 컨테이너에 추가
                        postsContainer.appendChild(postElement);

                        // 게시물 클릭 시 상세보기 페이지로 이동
                        postElement.addEventListener("click", function () {
                            window.location.href = `/viewPost?postId=${post.postId}`;
                        });
                    });
                } else {
                    // 게시글이 없을 경우 메시지 표시
                    postsContainer.innerHTML = '<p>게시글이 없습니다.</p>';
                }
            } else {
                alert(result.message || "게시글 목록을 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("게시글 목록을 불러오는 중 오류 발생:", error);
            alert("서버에 연결할 수 없습니다.");
        }
    }
    // 페이지 로드 시 게시글 목록 불러오기
    loadPostList();
});
