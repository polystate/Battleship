const nodeContainer = document.createElement("div");

const dragShip = (highlightedNodes) => {
  console.clear();

  const parentGrid = highlightedNodes[0].parentNode;
  console.log(parentGrid);
  parentGrid.appendChild(nodeContainer);
  nodeContainer.setAttribute("id", "node-container");
  nodeContainer.style.position = "absolute";
  highlightedNodes.forEach((node) => {
    nodeContainer.appendChild(node);
  });
  console.log(nodeContainer);
};

// const follower = document.getElementById("follower");
// let followMouse = false;

// const toggleFollowing = () => {
//   followMouse = !followMouse;
// };

// const mouseFollow = (e) => {
//   if (followMouse) {
//     console.clear();
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     follower.style.left = mouseX + "px";
//     follower.style.top = mouseY + "px";

//     const cells = document.querySelectorAll(".cell");
//     cells.forEach((cell) => {
//       const cellRect = cell.getBoundingClientRect();
//       if (
//         mouseX >= cellRect.left &&
//         mouseX <= cellRect.right &&
//         mouseY >= cellRect.top &&
//         mouseY <= cellRect.bottom
//       ) {
//         console.log("Follower is over a grid cell!");
//       }
//     });
//   }
// };
// follower.addEventListener("click", toggleFollowing);
// document.addEventListener("mousemove", mouseFollow);

export default dragShip;
