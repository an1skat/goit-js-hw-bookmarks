// Bookmarks
const bookmarkInput = document.getElementById("bookmarkInput");
const addBookmarkBtn = document.getElementById("addBookmarkBtn");
const bookmarkList = document.getElementById("bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
  bookmarkList.innerHTML = "";
  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.target = "_blank";
    link.textContent = bookmark.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Видалити";
    deleteBtn.onclick = () => deleteBookmark(index);

    li.appendChild(link);
    li.appendChild(deleteBtn);
    bookmarkList.appendChild(li);
  });
}

function addBookmark() {
  const url = bookmarkInput.value.trim();
  if (url) {
    const name = url;
    bookmarks.push({ name, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    bookmarkInput.value = "";
    renderBookmarks();
  }
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
}

addBookmarkBtn.addEventListener("click", addBookmark);

bookmarkInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBookmark();
  }
});

renderBookmarks();

// Form
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const saveBtn = document.getElementById("saveBtn");

window.onload = () => {
  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");

  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
  if (savedPassword) {
    passwordInput.value = savedPassword;
  }
};

saveBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  } else {
    alert("Будь ласка, заповніть обидва поля.");
  }
});
