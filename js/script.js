const navElipsis = document.getElementById("nav-elipsis");
const navCloseBtn = document.getElementById("nav-close-btn");
const containerQuery = document.getElementById("container-query")

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