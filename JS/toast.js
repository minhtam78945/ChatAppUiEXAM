function toast({ title = "", message = "", type = "infor", duration = 3000 }) {
  const main = document.querySelector(".wrapper-toats");
  console.log(main);
  if (main) {
    const toast = document.createElement("div");
    const autoRemoveID = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);
    toast.addEventListener("click", function (e) {
      if (e.target.closest(".toast_close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveID);
      }
    });
    const icons = {
      success: "fas fa-solid fa-check",
      waring: "fas fa-solid fa-triangle-exclamation",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `sildeLeft ease .3s , fadout linear 1s ${delay}s  forwards`;
    toast.innerHTML = ` 
        <div class="toast_icon">
            <i class="${icon}"></i>

        </div>
        <div class="toast_body">
            <h3 class="toast_title">${title}</h3>
            <p class="toast_msg">${message}</p>
        </div>
        <div class="toast_close">
            <i class="fa-solid fa-circle-xmark"></i>
     </div>`;
    main.appendChild(toast);
  }
}

