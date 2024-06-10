import api from "./api";


// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`, );

// 사용자 정보
export const info = () => api.get("/users/info");

// 회원가입
export const join = (data) => api.post("/users", data);

// 회원정보 수정
export const update = (data) => api.put("/users", data);

// 회원탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`);

// 게시글 메인메뉴
export const boardList = () => api.get("/board/list");

//게시글 작성
export const creativeBoardContents = (contents) => api.post(`/board/createContents`, contents);

//게시글 삭제
export const removeBoardContents = (idx) => api.post(`/board/removeContents`, idx);

//게시글 수정
export const updateBoardContents = (contents) => api.post(`/board/updateContents`, contents);

// 게시판 리스트 불러오기
// export const getBoardList = () => api.get("/board/boardlist")

