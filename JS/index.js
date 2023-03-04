//Menu-mobile
const menu = document.getElementById("menu-mobile");
const wrapperMenu = document.querySelector(".wrapper-sidebar");
const closeMenu = document.querySelector(".toggle");

menu.addEventListener("click", (event) => {
  event.preventDefault();
  wrapperMenu.classList.add("display");
});
closeMenu.addEventListener("click",(e) => {
    wrapperMenu.classList.remove("display");
})