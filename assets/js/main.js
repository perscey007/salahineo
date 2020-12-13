$(function () {
  "use strict";
  /* --------------------------------------- Main Variables --------------------------------------- */
  var body = $("body"), moodIco = $("#color-mood i"), backToTopArrow = $(".back-to-top"), typed = $(".typed"),
    scrollableBody = $("html, body");
  /* ------------------------- Check local storage color mood & Preloader ------------------------- */
  $(window).on("load", (function () {
    "light" === localStorage.getItem("MS-Mood") ? (body.attr("data-theme", "light"), moodIco.attr("class", "bx bxs-moon"), $("#aboutImage").attr("src", "assets/img/light_illustration.svg")) : (body.attr("data-theme", "dark"), moodIco.attr("class", "bx bxs-sun"), $("#aboutImage").attr("src", "assets/img/dark_illustration.svg")), $("#preloader").length && $("#preloader").delay(500).fadeOut("slow", (function () {
      $(this).remove();
    }));
  }));
  /* -------------------------------------- Toggle color mode ------------------------------------- */
  $("#color-mood").on("click", (function () {
    "light" === body.attr("data-theme") ? (body.attr("data-theme", "dark"), moodIco.attr("class", "bx bxs-sun"), $("#aboutImage").attr("src", "assets/img/dark_illustration.svg"), localStorage.setItem("MS-Mood", "dark")) : (body.attr("data-theme", "light"), moodIco.attr("class", "bx bxs-moon"), $("#aboutImage").attr("src", "assets/img/light_illustration.svg"), localStorage.setItem("MS-Mood", "light"));
  }));
  /* ------------------------------------- Back to top button ------------------------------------- */
  $(window).scroll((function () {
    $(this).scrollTop() > 100 ? backToTopArrow.fadeIn("slow") : backToTopArrow.fadeOut("slow");
  })), backToTopArrow.click((function () {
    return scrollableBody.animate({scrollTop: 0}, 1500, "easeInOutExpo"), !1;
  }));
  /* ---------------------------------------- Hero typedJS ---------------------------------------- */
  if (typed.length) {
    var typed_strings = typed.data("typed-items");
    typed_strings = typed_strings.split(","), new Typed(".typed", {
      strings: typed_strings,
      loop: !0,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500
    });
  }
  /* ------------ Smooth scroll for the navigation menu and links with '.scrollto' classes ---------- */
  $(document).on("click", ".nav-menu a, .scrollto", (function (e) {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();
        var scrollto = target.offset().top;
        return scrollableBody.animate({scrollTop: scrollto}, 1500, "easeInOutExpo"), $(this).parents(".nav-menu, .mobile-nav").length && ($(".nav-menu .active, .mobile-nav .active").removeClass("active"), $(this).closest("li").addClass("active")), body.hasClass("mobile-nav-active") && (body.removeClass("mobile-nav-active"), $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close")), !1;
      }
    }
  }));
  /* --------------- Activate smooth scroll on page load with hash links in the url --------------- */
  $(document).ready((function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        scrollableBody.animate({scrollTop: scrollto}, 1500, "easeInOutExpo");
      }
    }
  })), $(document).on("click", ".mobile-nav-toggle", (function (e) {
    body.toggleClass("mobile-nav-active"), $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close");
  })), $(document).click((function (e) {
    var container = $(".mobile-nav-toggle");
    container.is(e.target) || 0 !== container.has(e.target).length || body.hasClass("mobile-nav-active") && (body.removeClass("mobile-nav-active"), $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close"));
  }));
  /* ------------------------------ Navigation active state on scroll ----------------------------- */
  var nav_sections = $("section"), main_nav = $(".nav-menu, #mobile-nav");
  $(window).on("scroll", (function () {
    var cur_pos = $(this).scrollTop() + 300;
    nav_sections.each((function () {
      var top = $(this).offset().top, bottom = top + $(this).outerHeight();
      cur_pos >= top && cur_pos <= bottom && (cur_pos <= bottom && main_nav.find("li").removeClass("active"), main_nav.find("a[href=\"#" + $(this).attr("id") + "\"]").parent("li").addClass("active")), cur_pos < 200 && $(".nav-menu ul:first li:first").addClass("active");
    }));
  }));
  /* ------------------------------------ Skills progress bars ------------------------------------ */
  $(".skills-content").waypoint((function () {
    $(".progress .progress-bar").each((function () {
      $(this).css("width", $(this).attr("aria-valuenow") + "%");
    }));
  }), {offset: "80%"});

  /* ------------------------------------------ Init AOS ------------------------------------------ */
  function aos_init() {
    AOS.init({duration: 1e3, once: !0});
  }

  /* ---- Portfolio isotope & filter, Initiate venobox, Trigger aos_init(), Trigger Nice Scroll --- */
  $(window).on("load", (function () {
    var certificationsIsotope = $("#certifications .portfolio-container").isotope({itemSelector: ".portfolio-item"});
    var portfolioIsotope = $("#portfolio .portfolio-container").isotope({itemSelector: ".portfolio-item"});
    $("#portfolio-flters li").on("click", (function () {
      $("#portfolio-flters li").removeClass("filter-active"), $(this).addClass("filter-active"), portfolioIsotope.isotope({filter: $(this).data("filter")}), aos_init();
    })), $(".venobox").venobox({share: !1}), aos_init();
    $("#portfolio-filters li").on("click", (function () {
      $("#portfolio-filters li").removeClass("filter-active"), $(this).addClass("filter-active"), certificationsIsotope.isotope({filter: $(this).data("filter")}), aos_init();
    })), $(".venobox").venobox({share: !1}), aos_init();
  }));

  /*  --------------------------- Form Validation & Ajax Submission ----------------------------- */
  // Get Form Elements
  let formName = document.getElementById("name");
  let formEmail = document.getElementById("email");
  let formSubject = document.getElementById("subject");
  let formMessage = document.querySelector("textarea");
  let formSubmit = document.querySelector("button[type='submit']");
  let alertContainer = document.querySelector(".form-alert");
  let alertContainerJQ = $(".form-alert");
  let formAlert;
  // Form Submit Button Listener
  formSubmit.addEventListener("click", formValidattion);

  // Form Validation
  function formValidattion(e) {
    // Check Empty Fields
    if (
      formName.value === "" ||
      formEmail.value === "" ||
      formSubject.value === "" ||
      formMessage.value === ""
    ) {
      e.preventDefault();
      setAlert("danger", "Error", "All Fields Are Required");
    }
    // Check Email Contain '@' Symbol
    else if (formEmail.value.split("@").length <= 1) {
      e.preventDefault();
      setAlert("danger", "Error", "Enter a correct email");
    }
    // No Errors
    else {
      // Send Form Values
      $("#contact-form").ajaxForm();
      setAlert("success", "Success", "Your message has been sent");
    }
    // Show Alert
    alertContainer.innerHTML = formAlert;
    alertContainerJQ.fadeIn();
  }

  // Set Alert Message
  function setAlert($color, $state, $message) {
    formAlert = `<div class="alert alert-${$color} alert-dismissible fade show">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">
      &times;
    </a>
    <strong>${$state}!</strong> ${$message}
  </div>`;
  }
});
