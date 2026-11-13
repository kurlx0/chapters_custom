const navElipsis = document.getElementById("nav-elipsis");
const navCloseBtn = document.getElementById("nav-close-btn");
const containerQuery = document.getElementById("container-query");
const navBarContainer = document.getElementById("nav-bar-container");
const navQueryItems = document.querySelectorAll(".nav-query-item");

console.log(navQueryItems)

navQueryItems.forEach((el, i) => {
	console.log(`${el.textContent} ${i}`)
	el.addEventListener('click', () => {
		console.log(`${el.textContent} Button clicked!`);
		containerQuery.style.left = "-100vw";
	})
})

navElipsis.addEventListener('click', () => {
	console.log("Elipsis Clicked!");
	// containerQuery.style.display = "block"
	containerQuery.style.left = 0;
})

navCloseBtn.addEventListener('click', () => {
	console.log("Close Button Clicked!");
	containerQuery.style.left = "-100vw";
	// containerQuery.style.display = "none"
})

window.addEventListener('scroll', () => {
	// for (let i = 0; i < 600; i++) {
	// 	console.log("1. Page No.: " + i)
	// };
	// let scrolled = 1;
	// console.log("2. Page No.: " + (scrolled += 1));
	if (window.scrollY > 200) {
		// console.log("scroll 2");
		navBarContainer.style.background = "#02102499"
		navBarContainer.style.padding = "10px 90px"
	} else {
		navBarContainer.style.background = "none"
		navBarContainer.style.padding = "30px 50px"
	}
})