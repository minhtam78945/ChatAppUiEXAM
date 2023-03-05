var userRender = document.querySelector(".user-list");
var userAddFriend = document.querySelector(".addfriend");
var userRequets = document.querySelector(".requestLinks");
/// user Chatting
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
// hard code user addfrinend
const friends = [
  {
    id: 1,
    name: "Sinh Hùng",
    image:
      "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/326403390_1522209771635250_7604274983211479574_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=52fL_fp1vSsAX_Qt2Ry&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfC_73IUK3AidK4ykB02uKHdfBJUoDrakWBmhja7xuRePw&oe=6408860A",
  },
  {
    id: 2,
    name: "Thế Anh",
    image:
      "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/169147778_3000080340318830_8496454307966035293_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Snk6uDma-q8AX-MkCMg&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfAbvDZmkoChRDVh4nwtRjGecNYmACdcxDU6Euv3SVoUhw&oe=640A1C74",
  },
  {
    id: 3,
    name: "Việt Quang",
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/309388201_3308232702789043_645801797319481363_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2ywyrl8SmtcAX95FD2y&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfANs6MPE_NhUbk03tkufCfDv3cl7KxJRjPRPz8qexGzbg&oe=640A19DF",
  },
];

const requests = [
  {
    id: 1,
    name: "Sinh Hùng",
    image:
      "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/326403390_1522209771635250_7604274983211479574_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=52fL_fp1vSsAX_Qt2Ry&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfC_73IUK3AidK4ykB02uKHdfBJUoDrakWBmhja7xuRePw&oe=6408860A",
  },
  {
    id: 2,
    name: "Thế Anh",
    image:
      "https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/169147778_3000080340318830_8496454307966035293_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Snk6uDma-q8AX-MkCMg&_nc_ht=scontent.fsgn8-3.fna&oh=00_AfAbvDZmkoChRDVh4nwtRjGecNYmACdcxDU6Euv3SVoUhw&oe=640A1C74",
  },
  {
    id: 3,
    name: "Việt Quang",
    image:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/309388201_3308232702789043_645801797319481363_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2ywyrl8SmtcAX95FD2y&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfANs6MPE_NhUbk03tkufCfDv3cl7KxJRjPRPz8qexGzbg&oe=640A19DF",
  },
];
users.forEach((user) => {
  const userHmtl = `
  <div class="block ${user.unRead ? "unRead" : ""}" id ='${user.id}'>
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
  const userElement = document.getElementById(`${user.id}`);
  userElement.addEventListener("click", () => {
    console.log(user);
  });
});
friends.forEach((friend) => {
  const friendHtml = `
  <div class="block ">
  <div class="userImage">
    <img
      src="${friend.image}"
      alt="avater-user"
      class="cover"
    />
  </div>
  <div class="details">
    <div class="listhead">
      <h4>${friend.name}</h4>
      <div class="btnAndremove">
        <button class="add">
        <i class="fa-sharp fa-solid fa-plus"></i>
          Add
        </span>
        </button>
        <button class="add">
        <span>
          Skip
        </span>
        </button>
        </div>
    </div>
  </div>
</div>`;
  userAddFriend.innerHTML += friendHtml;
});

requests.forEach((request) => {
  const requestHtml = `<div class="block ">
  <div class="userImage">
    <img
      src="${request.image}"
      alt="avater-user"
      class="cover"
    />
  </div>
  <div class="details">
    <div class="listhead">
      <h4>${request.name}</h4>
      <div class="btnAndremove">
        <i class="fa-solid fa-check accpet"></i>
        <i class="fa-solid fa-xmark remove"></i>
    </div>
  </div>
</div>`;
  userRequets.innerHTML += requestHtml;
});
