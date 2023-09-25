window.addEventListener("DOMContentLoaded", () => {
	// const lenis = new Lenis();
	// lenis.on("scroll", ScrollTrigger.update);
	// gsap.ticker.add((time) => {
	// 	lenis.raf(time * 1000);
	// });
	// gsap.ticker.lagSmoothing(0);

	gsap.registerPlugin(ScrollTrigger);
	const checkMedia = gsap.matchMedia();

	let marquee = document.querySelectorAll(".hero_heading_text");
	marquee.forEach((el) => {
		// set a default rate, the higher the value, the faster it is
		let rate = 80;
		// get the width of the element
		let distance = el.clientWidth;
		// get the margin-right of the element
		let style = window.getComputedStyle(el);
		let marginRight = parseInt(style.marginRight) || 0;
		// get the total width of the element
		let totalDistance = distance + marginRight;
		// get the duration of the animation
		// for a better explanation, see the quoted codepen in the first comment
		let time = totalDistance / rate;
		// get the parent of the element
		let container = el.parentElement;

		gsap.to(container, time, {
			repeat: -1,
			x: "-" + totalDistance,
			ease: Linear.easeNone,
		});
	});

	const header_nav = gsap.timeline();
	header_nav.from(
		[".header_links_list li, .header_logo, .header_cta, .header_menu"],
		{
			duration: 0.8,
			opacity: 0,
			y: -100,
			stagger: 0.2,
			delay: 0.5,
		}
	);

	const arrowScroll = gsap.timeline({ repeat: -1 });
	arrowScroll.fromTo(
		".arrow-down-1",
		{ yPercent: -20, opacity: 1 },
		{ yPercent: 20, opacity: 0, duration: 3 },
		0
	);

	checkMedia.add("(max-width: 47.999rem)", function () {
		let burger = document.querySelector(".header_menu");
		let menuIsOpen = false; // tracks state

		const menuIn = gsap.timeline({
			paused: true,
		});

		menuIn
			.fromTo(
				".header_links",
				{
					autoAlpha: 0,
					y: -150,
				},
				{
					duration: 0.2,
					autoAlpha: 1,
					y: 0,
				}
			)
			.fromTo(
				[".header_links_list li"],
				{
					y: -100,
					opacity: 0,
				},
				{
					duration: 0.2,
					opacity: 1,
					y: 0,
					stagger: 0.2,
				}
			);

		let menuOut = gsap.timeline({
			paused: true,
		});

		menuOut
			.fromTo(
				[".header_links_list li"],
				{
					opacity: 1,
					y: 0,
				},
				{
					duration: 0.2,
					opacity: 0,
					y: -100,
					stagger: 0.2,
				}
			)
			.fromTo(
				".header_links",
				{},
				{
					duration: 0.2,
					opacity: 0,
					y: -150,
				}
			);

		burger.addEventListener("click", () => {
			menuIsOpen = !menuIsOpen; // toggle
			if (menuIsOpen) {
				menuIn.restart();
			} else {
				menuOut.restart();
			}
		});
	});

	const loadTl = gsap.timeline({
		defaults: { ease: "ease-in" },
	});
	loadTl.add(onLoadAnimation());

	gsap.fromTo("body", { opacity: 0 }, { opacity: 1 });
});

//Animations after page load
heroScrollAnimation();

function onLoadAnimation() {
	const hero_image = gsap.timeline();
	hero_image
		.from(
			".header",
			{
				y: -100,
				opacity: 0,
				delay: 0.5,
			},
			"start"
		)
		.from(
			".hero_image",
			{
				y: 100,
				opacity: 0,
				delay: 0.2,
				duration: 0.8,
			},
			"start"
		)
		.from(
			".scroll_down",
			{
				y: 100,
				delay: 0.5,
				opacity: 0,
				duration: 1,
			},
			"start"
		)
		.from(
			[".hero_heading, .hero_designation"],
			{
				opacity: 0,
				delay: 0.5,
				duration: 0.8,
			},
			"start"
		);
	return hero_image;
}
function heroScrollAnimation() {
	const hero = gsap.timeline();
	hero
		.to([".hero_image, .scroll_down, .hero_designation, .hero_heading"], {
			autoAlpha: 0,
			y: 100,
			duration: 0.5,
			scrollTrigger: {
				trigger: ".hero_section",
				start: "top top",
				end: "+=100%",
				scrub: 0.3,
				toggleActions: "play pause play reverse",
				invalidateOnRefresh: false,
				// markers: true,
			},
		})
		.fromTo(
			[
				".about_section_heading span,.about_section_icon,.about_section_description",
			],
			{ opacity: 0, y: 200 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.2,
				scrollTrigger: {
					trigger: ".about_section",
					start: "top center",
					end: "center center",
					scrub: 0.3,
					toggleActions: "play pause play reverse",
					invalidateOnRefresh: false,
					// markers: true,
				},
			}
		)
		.fromTo(
			".about_section_icon",
			{ rotate: -45 },
			{
				rotate: 0,
				scrollTrigger: {
					trigger: ".about_section",
					start: "top center",
					end: "90% center",
					scrub: 0,
					toggleActions: "play pause play reverse",
					invalidateOnRefresh: false,
					// markers: true,
				},
			},
			"start"
		)
		.fromTo(
			".about_section_bar_inner",
			{ x: 0, ease: Power2.easeOut },
			{
				x: "-=200",
				scrollTrigger: {
					trigger: ".about_section",
					start: "top top",
					end: "100% top",
					scrub: 0,
					toggleActions: "play pause play reverse",
					invalidateOnRefresh: false,
					// markers: true,
				},
			},
			"start"
		);
	return hero;
}
