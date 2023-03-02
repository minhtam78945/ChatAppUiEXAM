const tabs = document.querySelectorAll(".tab-item");
const panes = document.querySelectorAll(".tab-pane");
console.log(tabs, panes);

tabs.forEach((tab, index) => {
  tab.addEventListener("click", function () {
    // remove active class from all tabs
    tabs.forEach(function (tab) {
      tab.classList.remove("active");
    });

    // add active class to clicked tab
    this.classList.add("active");

    // hide all panes
    panes.forEach(function (pane) {
      pane.classList.remove("active");
    });

    // show corresponding pane
    panes[index].classList.add("active");
  });
});
