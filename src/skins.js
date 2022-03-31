const fontDropdown = document.querySelector("#Font__Select");
const boardEle = document.querySelector(".Board");

export default () => {
  fontDropdown.addEventListener("change", (e) => {
    boardEle.setAttribute("data-font", e.currentTarget.value);
  });
};
