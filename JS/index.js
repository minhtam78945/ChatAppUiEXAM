const userRender = document.querySelector(".user-list");

const users = [
  {
    id: 1,
    name: "The Anh",
    image:
      "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1",
    time: "13:11",
    message: "code đến đâu rồi",
  },
  {
    id: 2,
    name: "Anh Tuấn",
    image:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/anh-avatar-facebook-ngau-hot-nhat-hien-nay.jpg",
    time: "6:00",
    message: "Xin chào",
    active: 2,
    unRead: "true",
  },
  {
    id: 3,
    name: "Hữu Tú",
    image:
      "https://thuthuatnhanh.com/wp-content/uploads/2022/10/hinh-anh-avatar-den-nam-ngau.jpg",
    time: "Yesterday",
    message: "Bài này làm sao di chỉ với ? ",
    active: 2,
    unRead: "true",
  },
];
users.forEach((user) => {
  const userHmtl = `
    <div class="block ${user.unRead ? "unRead" : ""}">
        <div class="userImage">
          <img
            src="${user.image}"
            alt="avater-user"
            class="cover"
          />
        </div>
        <div class="details">
          <div class="listhead">
            <h4>${user.name}</h4>
            <p class="time">${user.time}</p>
          </div>
          <div class="message">
            <p>${user.message}</p>
            ${user.active ? `<b>${user.active}</b>` : ""}
          </div>
        </div>
      </div>
    `;
  userRender.innerHTML += userHmtl;
});
