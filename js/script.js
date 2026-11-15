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
	if (window.scrollY > 100) {
		// console.log("scroll 2");
		navBarContainer.style.background = "#02102499"
		navBarContainer.style.padding = "10px 90px"
		navBarContainer.style.backdropFilter = "blur(10px)"
		navBarContainer.style.boxShadow = "1px -3px 30px var(--primary-color)"
	} else {
		navBarContainer.style.background = "none"
		navBarContainer.style.padding = "30px 50px"
		navBarContainer.style.backdropFilter = "unset"
		navBarContainer.style.boxShadow = "unset"
	}
	console.log(Math.floor(window.scrollY))
})

// const contactForm = document.getElementById('contact-form');

// contactForm.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	console.log("Form handled with custom JS!");
// })

const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "7166c755-a696-4368-919e-5121db3efa66");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.filter = "opacity(0.5)";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    submitBtn.style.filter = "opacity(0.75)";
    }
});