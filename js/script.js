const navElipsis = document.getElementById("nav-elipsis");
const navCloseBtn = document.getElementById("nav-close-btn");
const containerQuery = document.getElementById("container-query");
const navBarContainer = document.getElementById("nav-bar-container");
const navQueryItems = document.querySelectorAll(".nav-query-item");

console.log(navQueryItems)

navQueryItems.forEach((el, i) => {
	// console.log(`${el.textContent} ${i}`)
	el.addEventListener('click', () => {
		// console.log(`${el.textContent} Button clicked!`);
		containerQuery.style.left = "-100vw";
	})
})

navElipsis.addEventListener('click', () => {
	console.log("Elipsis Clicked!");
	containerQuery.style.left = 0;
})

navCloseBtn.addEventListener('click', () => {
	console.log("Close Button Clicked!");
	containerQuery.style.left = "-100vw";
})

window.addEventListener('scroll', () => {

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

})



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


// SLIDING EFFECT - PROJECTS TAB

const slides = [
	{
	  title: "Title Element",
	  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	  image: "pictures/image02.png"
	},
	{
	  title: "Second Project Title",
	  text: "Here is the content for the second slide. Both the text and image stay on their respective sides and cleanly slide across into view when navigating.",
	  image: "pictures/image01.PNG"
	},
	{
	  title: "Third Project Title",
	  text: "Here is the content for the third slide. Both the text and image stay on their respective sides and cleanly slide across into view when navigating.",
	  image: "pictures/image01.jpeg"
	}
];

let currentIndex = 0;
let isAnimating = false;

const leftPanel = document.getElementById("left-panel");
const rightPanel = document.getElementById("right-panel");
const titleEl = document.getElementById("project-title");
const textEl = document.getElementById("project-text");
const imgEl = document.getElementById("project-img");
const pinsContainer = document.querySelector("#scroll-pins");
let pins = document.querySelectorAll("#scroll-pins span");

if (pins.length < slides.length) {
	for (let i = pins.length; i < slides.length; i++){
		pinsContainer.innerHTML += 
		`
			  <span></span>`
	}
	pins = document.querySelectorAll("#scroll-pins span");
}



function updateSlide(index, direction) {
	if (isAnimating) return;
	isAnimating = true;

	const slide = slides[index];
	const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
	const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

	// Step 1: Slide current panels out
	leftPanel.classList.add(outClass);
	rightPanel.classList.add(outClass);

	setTimeout(() => {
	  // Step 2: Swap content while invisible
	  titleEl.textContent = slide.title;
	  textEl.textContent = slide.text;
	  imgEl.src = slide.image;
	  leftPanel.scrollTop = 0;

	  pins.forEach((pin, i) => {
	  	pin.classList.toggle("active", i === index);
	  });

	  // Instantly position new content off-screen to start sliding in
	  leftPanel.classList.remove(outClass);
	  rightPanel.classList.remove(outClass);
	  leftPanel.classList.add(inClass);
	  rightPanel.classList.add(inClass);

	  void leftPanel.offsetWidth; // Force reflow

	  // Step 3: Slide new content into position
	  leftPanel.classList.remove(inClass);
	  rightPanel.classList.remove(inClass);

	  setTimeout(() => {
	  	isAnimating = false;
	  }, 400);
	}, 400);
}

document.getElementById("prev-btn").addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	updateSlide(currentIndex, "prev");
});

document.getElementById("next-btn").addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % slides.length;
	updateSlide(currentIndex, "next");
});


// SCROLL EFFECT ON PARTNERS PAGE


const container = document.getElementById('partners-container');
const track = document.getElementById('partner-track');

const speed = 0.7; // Pixels per frame (adjust speed here)
let currentX = 0;
let isPaused = false;

// Pause scrolling on hover
container.addEventListener('mouseenter', () => isPaused = true);
container.addEventListener('mouseleave', () => isPaused = false);

// 1. Ensure enough elements exist to fill the container width + buffer space
function populateBuffer() {
  const originalItems = Array.from(track.children);
  while (track.scrollWidth < container.offsetWidth * 2) {
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }
}

// 2. Horizontal Animation & DOM Recycling Loop
function animateMarquee() {
  if (!isPaused) {
    currentX -= speed;

    const firstItem = track.firstElementChild;
    if (firstItem) {
      // Read the exact horizontal column gap dynamically
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const firstItemTotalWidth = firstItem.offsetWidth + gap;

      // Once the first item has completely scrolled off-screen to the left:
      if (Math.abs(currentX) >= firstItemTotalWidth) {
        // Move the element from the front to the back of the track directly
        track.appendChild(firstItem);

        // Instantly compensate currentX back to prevent any jitter or jump
        currentX += firstItemTotalWidth;
      }
    }

    track.style.transform = `translate3d(${currentX}px, 0, 0)`;
  }

  requestAnimationFrame(animateMarquee);
}

// Initialize once layout and images load
window.addEventListener('load', () => {
  populateBuffer();
  requestAnimationFrame(animateMarquee);
});