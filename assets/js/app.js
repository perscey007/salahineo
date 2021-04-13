$(function () {
  "use strict";
  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Main Variables
  var
    body = $("body"),
    moodIco = $("#color-mood i"),
    backToTopArrow = $(".back-to-top"),
    typed = $(".typed"),
    scrollableBody = $("html, body");

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Check LocalStorage Color Mode & Trigger Preloader
  $(window).on("load", (function () {
    "light" === localStorage.getItem("MS-Mood") ? (body.attr("data-theme", "light"), moodIco.attr("class", "bx bxs-moon"), $("#aboutImage").attr("src", "assets/img/illustration/light_illustration.svg")) : (body.attr("data-theme", "dark"), moodIco.attr("class", "bx bxs-sun"), $("#aboutImage").attr("src", "assets/img/illustration/dark_illustration.svg")), $("#preloader").length && $("#preloader").delay(500).fadeOut("slow", (function () {
      $(this).remove();
    }));
  }));

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Toggle Color Mode
  $("#color-mood").on("click", function () {
    "light" === body.attr("data-theme") ? (body.attr("data-theme", "dark"), moodIco.attr("class", "bx bxs-sun"), $("#aboutImage").attr("src", "assets/img/illustration/dark_illustration.svg"), localStorage.setItem("MS-Mood", "dark")) : (body.attr("data-theme", "light"), moodIco.attr("class", "bx bxs-moon"), $("#aboutImage").attr("src", "assets/img/illustration/light_illustration.svg"), localStorage.setItem("MS-Mood", "light"));
  });


  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Back To Top Functionality
  $(window).on("scroll", function () {
    $(this).scrollTop() > 100 ? backToTopArrow.fadeIn("slow") : backToTopArrow.fadeOut("slow");
  });
  backToTopArrow.on("click", function () {
    return scrollableBody.animate({scrollTop: 0}, 1500, "easeInOutExpo");
  });

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // TypedJS
  if (typed.length) {
    let typed_strings = typed.data("typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: !0,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500
    });
  }

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Smooth Scrolling
  $(document).on("click", ".nav-menu a, .scrollto", function (e) {
    if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
      let target = $(this.hash);
      if (target.length) {
        e.preventDefault();
        let scrollto = target.offset().top;
        return scrollableBody.animate({scrollTop: scrollto}, 1500, "easeInOutExpo"), $(this).parents(".nav-menu, .mobile-nav").length && ($(".nav-menu .active, .mobile-nav .active").removeClass("active"), $(this).closest("li").addClass("active")), body.hasClass("mobile-nav-active") && (body.removeClass("mobile-nav-active"), $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close")), !1;
      }
    }
  });

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Activate Smooth Scroll On Page Load With Hash Links In The URL
  $(document).on("ready", function () {
    if (window.location.hash) {
      let initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        let scrollto = $(initial_nav).offset().top;
        scrollableBody.animate({scrollTop: scrollto}, 1500, "easeInOutExpo");
      }
    }
  });

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Toggle Navbar On Mobile Screens
  $(document).on("click", ".mobile-nav-toggle", function () {
    body.toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close");
  });
  $(document).on("click", function (e) {
    let container = $(".mobile-nav-toggle");
    container.is(e.target) || 0 !== container.has(e.target).length || body.hasClass("mobile-nav-active") && (body.removeClass("mobile-nav-active"), $(".mobile-nav-toggle i").toggleClass("icofont-navigation-menu icofont-close"));
  });

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Navigation Active State On Scroll
  let
    nav_sections = $("section"),
    main_nav = $(".nav-menu, #mobile-nav");
  $(window).on("scroll", (function () {
    let cur_pos = $(this).scrollTop() + 300;
    nav_sections.each((function () {
      let top = $(this).offset().top, bottom = top + $(this).outerHeight();
      cur_pos >= top && cur_pos <= bottom && (cur_pos <= bottom && main_nav.find("li").removeClass("active"), main_nav.find("a[href=\"#" + $(this).attr("id") + "\"]").parent("li").addClass("active")), cur_pos < 200 && $(".nav-menu ul:first li:first").addClass("active");
    }));
  }));

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Skills Progress Bar
  $(".skills-content").waypoint((function () {
    $(".progress .progress-bar").each((function () {
      $(this).css("width", $(this).attr("aria-valuenow") + "%");
    }));
  }), {offset: "80%"});

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Init AOS
  AOS.init({duration: 1e3, once: !0});

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  /* Form Validation & Ajax Submission */

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
      empty(formName.value) ||
      empty(formEmail.value) ||
      empty(formSubject.value) ||
      empty(formMessage.value)
    ) {
      e.preventDefault();
      setAlert("danger", "Error", "All Fields Are Required");
    }
    // Check Email Contain '@' Symbol
    else if (!isEmail(formEmail.value)) {
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

  // Check Email Validation Function
  function isEmail(val) {
    // Regular Expression Constant
    const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Return True Or False According To Email Value
    return exp.test(String(val).toLowerCase());
  }

  // Check Empty Validation Function
  function empty(val) {
    // Return True Or False According To Element Value
    return val.length <= 0;
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

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Lazy Loading For Images, Then IsoTop Filter Trigger
  $(".lazy").lazy({
    placeholder: "data:image/gif;base64,R0lGODlhQABAANUAAHy2RMTepOTuzKTSdOz23MzazJTGVPz69NTqvLTWjOTm7NTmtPT69NzqzIy+TJzOZLzalMzirOTy3KzOhPT27Nzi5Pz+9Ozu7IS+RMTipOTy1NTa3JTGZNzqxLTajKzSfOTu1Oz25Mza3Pz6/LTWlOTq5NTmvPT6/NzuzIy+XJzObLzanPT67Pz+/PTy9IS+TMTirJzKbNzuxKzShP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQIBgAAACwAAAAAQABAAAAG/kCacEgsGo/IpHLJbDqf0Kh0Sq1ar9isdstFMhoNRrfLmgDOgAlrnGWl0OjUmm01w9ETepVxvx/0Uw19cAKARi0ICTMQEkaCg2eFhkMsMS8YGJcQLUR8kAB/kzQtMZiXmRgBRXZ9eaI0JpeyqA5iQxRvdw6hRhcVFZxaCRgOmMWoDUUHrGkuSC4iGyIKWzOYAMXYmSZHBx0lFEoX0iIVWyuZx8cYIFUj0SIXWxKYqBjYHCNWIwrOXBCXsL1w8ELSqyctAjg4ZqDdQSkHGpgAoe+hxYsYM2rciISAiQghOC6xkMCASQMeeIks4uHkSQ+GTqh0QuDkC5eN6JQoUKBE2JQILl1GoNOCJ88TUBAEPYmAzgmjBZA+qXkzaE42O8tJaWkTZcxwUhhwNenB1sojEmAguHq2rdu3cOPKZdLiQLC5LTKoeDBAxlwaEGI8iCG4w5UWJlbAAKuFgGDBgwfcnWKCRAISKyZfQTD4gefBM6OsuGw5pBYQnx8YEKw5CgzLJEiYxdJiwGPBQ5O0aF2EwgrLKLoQ+PAZggUkLSJ8+BCB9xALIWZvOYCiAwElMAZ8GDAgd9wWy7Vrdy4SvPjl5EVGOA/jb/LlMNKf3f23vv37+PPr3982CAAh+QQIBgAAACwAAAAAQABAAIWEukTE3qTk7tykzmy01oTs9tzM5rT8+vSUxlS81qSkxozc7sTM2tzk8tS83pzs9uyczmzE3rS82pTU5rz8/vScxmS0zpyMwkys0ny01pSUyly81rSsxpTc6tTs8uT0+uzM3rzU6sSEukzk6uyk0ny02ozs9uT8+vyUxly82qzc7szk8tzU5sT8/vysypz0+vTM4rz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCYcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdstFUlaeQ7d7yIgAAFFGPMa+Kug4AHVqXzNyecZepZzzaCIvfFMrgHIChEcrARIGH0YCh3EdikQUGBcXIpoGRQd/gIJHHh0CLVwEm5oAmiFFeIcKRi0bCrcuD1ornJq+ABqoQy8ooYF1RSC3txwuwlcBrBdovh5FLy5xIgrIRC3LHMuJWA6t06ytKkcvHR2DRyfL8pVYBtLm05BSLS7yt9ZYPvQy14pElQ4KwoXbsMUePk0mrHTox4EBGy0hNJyDEPFKixPduLRY0UCXpZMoU6pcyfLkgQYNLrZk0sKABhQoNBh4NjOJ4wEEKBBoAOqJEEgpB24CXapBZpcRDBiMiNIg6NCrKBrYORE1qtMlVYFeUIpAaxuuXb8qSYpVaFM+UKVK+Wl1LAxFB9TStJlTAwyePZO8jBm4sOHDiBMrXrx4AQEMDjoyFjIBAoQBlyVTadEBBot3WihgHg1BwhUVCVJHAGzFg+UKAypAwHAFRurUoANetoy5xBUWt1OwtiJhN+YFV15ESL2CTHHYE5K0WCBBgorhQ1q8wB6wAAUlHTCIx4B8shAJJMY7MC/EwXgS69kvGE+efYzpJRws4G6/v///AAYo4IAEohQEACH5BAgGAAAALAAAAABAAEAAhXyyRMTWtJTKXNzuzKzOhPT27MTipIzCTLzelOzy3LzWnNTizKTKfLTWnKzWhOTu7Pz+9NTmvIzGTIy6XOTu1LTSjIS6RMza3KTObKzOjPz69MzirIy+XOz23KTSdOTy1IS2TMTepJzKXPT67Nzq3KTOfMzmtHy2RKzSfIzCVLzenOzy5NTmzLTWhPz+/NTqvJTGVOTu3KzSjMzitJS+ZOz25OTy3MzevJzObPT69KTOhP///wAAAAAAAAAAAAAAAAb+wJ1wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y0W6CgVXt+sKpSyWVEg8xrow6LilxG5XQ3J5yF51cdAgFoFoKXV8UAVxJ2gnHIsFh0cjLyYDhkKJaI6MaCNFOQ0TACAMMVsuBikHqwIURS5ni3mFRCuiACe4ADNaBqsSB8ASCUV4cn8We0MuNLoAz7iuVyMpwKvXKK8lcot0RDO5z7nhDFgv18LBBxCvIchqlzLi0OIgWCbq19eeRi45OZeEMAini2DAKAPQqZMg4eASBfPonZjgRoS+awimUIA2DlqDLAPSARORgwoKAChR5joAKUsCD78Q8JvigkBHADSIcYEwgh3+FgoKGLSI4DOS0aNIkypd2iSHBqZSPqAQIADFB6hOPsCgKoKqND4unkqZKmIrDBEeDj24cOFBlBxUucYVO8YFW7Z0m2gQUDZu15JtNNy9kLfJVL5xCahl6zYKBcSIv9rRUPgJBRRbCUjGykQDYM6gQ4seTbq06dNHamxQEaGyaRseMGDA0cJ1FBssYtiu0gJDbA84IlyxEaD4Ai5vcMz2ndHKguLFHdJE8Vu5gSsxAjQIcKNLBOWyPdS4ooEF9/HIX3jw4MCGkg4bNnRgIt1N/R0JHOh3oBO1kA0OoNCCAxv4NwSAARJooBAdODBgC/0ZmEB87i1o4YUYZqjhhhwEdmhgEAAh+QQIBgAAACwAAAAAQABAAIV8tkTE3pyk0nTc7sSMxkzE1sS02oz09uy00ozk7uTU5sSMvlycymTU5rT8/vSEvkSs1ny82pS01pTs9uTc6sTM4rzk8tSUylzM2tz0+uzk7uyczmS83pSEulTE4qSszoTc7syMxlTM2sy01oTk8tzU4tSUwmScymzU5rz8/vyEvkys1oS81pzc6tz0+vS83pz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCYcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdstNplLdcAp1Uj1OKHAYm5I83maVRL2uoh7mzvuNqlvLew96Z35UKWaCgXp0hUQpJBYTRymJb4NvjDAuLAsACx8JXCAMBKUQB0YngZaERAedALGxFVoDpRelIQwZRXeDl31DKSayxQChVykMIaUEJqUvRSkRqw8sjCjGxR9YJKXPzQQMRmMnemiZCNqyHVgW4c0mF0kOmUMf67JYB+ELzdxSWOTzlAUCOGelGkyxMBBBlgmkwo2w5wSftg6osmQIwIDBhwYUnaSwKMtExkZUEiD48EHESZQwY8qcSbOmTSwbBQh4wesmzZMMAi50ZCCgp58vU150vLBBaDQ/GjBg0CBFAAOmV4kelSo1ZBKrTRk0FbCVq1ckAYSGZfC0TtSpUoAKvVq0kQsXVHLuNOqzr9+/gAMLHky4sBMHFCpYOPvXxQqdAjwwbnKgRYLJUTzohKDTwpUDBQqIaNFlBGSdCq20CC26y4vTAihcSSAidIkuFj5AHuEgWQsRCl5qsRBhRADhRVxQUIDX8JBNEgyw4FuYgoTrEhQ4F6LAAHbt211gN9B8e4bl1LerX8++vfv38OMPDgIAIfkECAYAAAAsAAAAAEAAQACFfLZExNqk5O7UpMaMzNrM7PbkrNJ8vNaklMZU1ObEvNqUzOa0/Pr0tNqMrNKMjMJMxOKk5PLU3ObUnM5kxN609PbstNaEnMZs3OrE/P70hLZMxN6c5Ork1N7UrNZ8vNa0lMpctNKMjL5c7PLk9Prs5O7czNrUvNaslMZc1OrE1Oq8/Pr8zOK03Obc9Pb03OrM/P78hLpMxN6krNaEtNaUlMJk7PLs////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7Am3BILBqPyKRyyWw6n9CodEqtWq/YrHbL7XqZkRkKZYl8tayHOqZmna+RB5stf5jfVIN6vTfgqSh1fDEgf0gZFTBIgQ8AdWyFRSQBNTEiDiNcBTMIDxMbikV6e3QxHkUVNQCrGgAaCVoFE50gDwgeoUMRbI57dkQwqq6rrJlYnLa0DypGC3xyEEUpMcStrQB+VxnKILQWRxEeICAed0QNrMSsIlgVD920nadSDsPqrFgwE7a1/QpTB67dA1Ajy4Z47xCYgzJi4LUAWWB4QLigigWBxGow0AJDRQMDDRZKgRHiWqsaFQxVGRHAQAgMG1XKnEmzps2bOEeqUKBARfCuLzAknPgg4WcTGA0mKJ1gwegWGCcGSB1wwqkSFUsnXJiQ4oyEqVMlQFGgNeu/L1HBDvgwdunWCWe9fFC7FgrWt1thffmqtgWUFUmXNj0DFeyHFVFgJFBAwyeeFS0+fGiBOKfly5gza97MubMXGAUEkPBcBMYGA6i7YnHBwYZVKylQT0A92ooLEwRMcOgCAbXvF1dK4DbRocsCAxM8JC9wxQZuAn65kPDgW8HrJzA4mGjhwguJBTJSXL8Bo0SJ8ZlhBDhwgEJM0jdKsGdfAr6QCPMP1Le/ggJ79/YJsUIJL6AX4IEIJqjgggw26KBKQQAAIfkECAYAAAAsAAAAAEAAQACFfLJExNa03O7MnMpk9PL0tNaE3N7clMZUxOKkrNJ87PLcpNJ0nMp09PrsjMJM1ObEvN6c7Pbk/Pr0jLpUvNaUlMZkzOLEpMp0hLpEzNrc5O7UpM5s3OrEzOK07O7s9Pr8vNqUpM58xN6knM5s9PbslMZc9Pr0jMJc1Oq87Pbs/P78nMZspMp8hLpM5PLU5ObkzOa07PLsvNqc////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AmXBILBqPyKRyyWw6n9CodEqtWq/YrHbL7XqZDVFiIWp8tYKDY+04CM7XhprNNsOpIjodcacu9GwLfVMJgGuCRSodFycVFCRcEggbFQlvRhCGDhBFEgMAGKAYLZdYEgslJQcHJXxFcoAHEUUhGLahti2QWAiqvqwuRml6pUIutqLIGBRZG78DrK5FEQgLCwizRQiiAN23FVkVrOOsnFIgysigJ1kJ478wUwgtoMmhI1kov6ojdlEp6bjFy4IAGqsRxaJAaHELVwUVW1wggADD3xQVC+thGPFhUJUUMApACOaxpMmTKFNOifDgQTaVTVJc6NbtQgopCmDAUAAnxewEmjQnvGwCY8SGESMGepkJlOaFJwqMDtgwlSQXEk2bDlUC46hRpEq3PGgaiiYKJzCmDpAaVsvYrPXONokq9SjPLhFolgW6lStVo223MNXbbUCUnDvhRPhZz9tNmEoiDAYwwCLkJBFQoOh7ubPnz6BDf5YQAaLoIygSJChw98oHDzFMb1GgWnUB2VQ+ZNjtoUvqMaofV/GwO4OBLgJqqzZxhUDxF11UgLAdWIoKDwZeSPCiQgAMq0hUxIh92oiKBwECWMBdPkb69DHKE3EfQEaA+PKFqLCQfn3+IeKlwN5/BBZo4IEIJqjggqIFAQAh+QQIBgAAACwAAAAAQABAAIV8tkTE3pzc7sSkzmz08vTM2tys1oSMxkzM4rTs8tyk0nT0+uycylzc6sTk7szc5tS83pzU6ryMvlSszny01oz8+vScymzE1sSkynz09uzU5rzs9uSs0nzk8tTc4uS02oyEukTE3qzc7sykznTU2tyUylzM5qzs7uz0+vyczmTk7tTU6sSUwlz8/vyczmz09vSs0oTk5uy02pT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCZcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvtepmtCAQSaX21G9dhfRhsztfW4MCirwdmODXCZtcjelQQdYRsEIFTEH1rdYdFLQ0wFhghFVwtIh8GAW9GEYV1dIBEFRMgp6cSCVotASUMJa8iRi0pi215QxSovBK5ViKxwq+WRRtzhG7GpwDMqCFZH7DTsQ1HYWMRxUQIvCASzSAjWQbDryUaUwGo4LwWWa7UsSpTK869ClkbwiywE79PKkjwxmyFFhEMYJWYsKBKt3aoYAC0UqGBBhUToyAYiEoGCkRVFqwIoaETyJMoU6pcKSXDigYmWTLJgAGATQAYMkipIEJF7sMzGcDdtClB55MOCgYoUNDhTM2hNzEEVDBigFUF27ZsgArVKBMRSl0kHTCrSwOuQx846TDAhVWxZbk8QHszXZMFVJMuzYqGrs0TR5OKbfrlKVepUHh24MslAwiuIAjIXELAME7Jk5mceKABcObPoEOLHk1aSIuMpWd00BTg5xUUJzBzWUCBA4VNWFCQKFDA8xYVBoJzMID6yYkCuz102WDAtoEPxZ0Q4E1C+SUEzSkQvnKCRAzGWFpscOAaSYsXL6KHbvHgwoUH6j+/cO++fOoF9C/YL83evQrwpLVQQXqpFWjggQgmqOCCDDZYRRAAIfkECAYAAAAsAAAAAEAAQACFfLZExN6k5ObspNJ07PbczNrM/Pr0lMZUtNaM1Oa05O7U9Pr03OrMjL5MrNaE9PL0zOa0rM6E9Pbs3OLk/P70lMZkvNqc3OrE7O7shL5ExOKk1NrctNqM1Oq85PLUrNJ8nMpk5Ork7PbkzNrc/Pr8tNaU1Oa89Pr83O7MjL5c9Prs/P78hL5MxOKs5PLcrNKEnMps////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AmHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7XqbBBOE8N1SEIf0gWMoYzlqNcdtJahZcRedConHIXtTJml4f0cuFh8IHStdIhAaHW1GLn5qekQrFhkZLJ0wElsXICAHIAMiR3BxLHNFGp2cnhkwjVgipLkgDrZEC6tpDgtFCyyeLA2cySZZELq5qYcQEJhFKJzYxxkIWRqkpqYgHlMdnsksAOcRWR3PpcNSHtrJ2BZZFAOluRpUKwez6TIkU6BFhIN98KbIS0YPgL0tK0R4UIEFRQVZDQL0CiRlhQITDCZxHEmypMmTUhYwYJAQJRMVEQDIBBCBYpQVKiRs7KIixd7MmSlsOlHBYcAADqG+xPw5c52TFUWNHt2ZZQFTpiKXqJA64MOApFwYXP1JsIkEo16Ngt0idqzMskygckVAFYsKtzKzLpGAwCiCtVyWXnX6ZIUECRTcSPDJtIFel0YMCKb5AHITAxdCALbMubPnz6BDi0YioYUFE3WlnMBQuYsmBCVKMLuyYMOIERgcxYb90AqG2xsmdFkAG3YLLA9G2BbgBUVsC5unYNgggMSXBSIeGyFxYvSREAUKhPBO5ET48N3JxyBxvkB69RMKjBCufsiJ9/Xz69/Pv7///wBaFgQAIfkECAYAAAAsAAAAAEAAQACFhLpExN6k5O7MpMaM7PbczOa0rMqclMZU/Pr0pNJ0zNrcxN605Ors3OrEnM5ktNaE7Pbs5O7cvNaknMZk/P70jMJMzOKs1ObElMpcrNJ8zN683OrUvNqU9PrsvNa0hLpMxOKk5PLUrMaU7PbklMZc/Pr8pNJ87PLk3O7EnM5stNaU5PLcvNqs/P781OrEzOK89Pr0////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AmHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7XqbiFAI8d22ChgSCVNolbGFA+mAkRfeVkRazseQ8VMhc3WEJCGAgXMkFXsHh0YdFhwBK14tAi4ESHprdZ1/RAUVox8VGW5aIwkOrByoRRZ1cowWRi4VpaOjGVotq6ysAUctsZ1tRS2LFQDLzY9XAqwTKRMOKa9FYWNHI7nNzBUsWS7WwKygUCHfuswcWSfSDtOnUx3gzPd3WRzmDg1VJkaB0wVBC4IAKRyY+FflhK5v+swgKIFFFTgMLhBd6RBiBQyNIEOKHEmSCoUVJ9CVXIJAxQcAAD6oUOmkBTYvCEi8hAmTBPbFJ8QyZLBwc4sKnkgBqIBiIYGJDAlqeYGxM2nMj01aZHiaQGhRLCesIo1QU2jXrl+vrBDLc8OTAmczgPjSomrSD1ibUAAhFERaLEfFDpBiEw8MElY//FyZBIaBnR8GLGasBMaGDXkpa97MubPnKC1K/PW8wcAAERpGT4Fx4cUG1Uw2nB5A2wOXFhok6HZbpYUBEbSDn9iCQIIK3S/yBF/OO0sLFrolXLDSAnhw4Ay4nNC9IPMUDcsHGIANGgbsEpONlPBAW4SBgiUZKFCQXcmJDQzShywxfz7Nz/z1999n8tH3WRIIDHjgggw26OCDEEYo4YRYBAEAIfkECAYAAAAsAAAAAEAAQACFfLJExNa0lMpc3O7ErNJ89PbsjMJMxOKk5O7ctNqM1OLMpMp8jLpU/P70jMZM7PbcvNac1Oa8hLpEzNrcpM5s5O7UtNac/Pr0jL5c7PLcvNqUhLZMxN6knMpcrM6M9PrszOK03OrcpM58vN6UfLZE3O7MjMJU5O7s1ObMjLpc/P78lMZU7Pbk1Oq85PLUlL5k7PLkzN68nM5srNKM9Pr0zOa0pM6EvN6c////AAAAAAAAAAAAAAAAAAAAAAAAAAAABv5AnHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7XqdtMu36yIIBATXOOtanTvnyvpq7rhXHdG8Sju//WJ7UhcCdn5wNEcqJTUtH18fD4FHIoWWaEcVHQacDgcqWxcaMjIUEUgufm9yRS4mnLAGB1sjpaQUA0gVBHgerEUEDgbCwsOPWB+3HRQyCUo0iUcNsZ2cLVkZtrcEVB/D37E1WQ3M5R03VCrF38S5WREdtgsPVRrrsAINWyUJBBosVmjIYDfMnSApNEYUo6DmYBUVH445nEixosWLTVQUKAAKY0YOJiRIMMGho0ckKiiIXClBhMmMJTRoKPGSCweWLDlAKUGgJ/wBg1xUYBC5QUJRkSZqKtHgk8CILwVWkhBJAsPUAk+Y+nTmJapIq1RFSmQyoGmJLypCTsWZ9MmiBAlojrm5EiwGdCcViTDK0mVelCCR3lD6l4gKGiwIF17MuPHBChBEeIig+K8KDwAyZ34Bw7EQzCQAhA7NIFoWFSFQdK5SQbPr0Ba2KAhAG0EVC6Jzh86MQYsK2rRRVBHhWvPuLTECWAgQosoM3bkzb9jCIjmKykwiFM8cekEX7ENUTCqi4gV07r8mnpgw4QSSDAyMiwZhUQV79uOJ0IBgAICEBelNdMF9E+RnBHiCrNeeZ0dcYCCDEEYo4YQUVmjhhRgaEQQAIfkECAYAAAAsAAAAAEAAQACFfLZExN6cpM5s3O7MjMZMtNqM9PbsxNbEtNKMjL5crNZ87PbcnMpk1ObE/P78hL5E1Oa8rM6E5O7k/Pr0tNaUzOK8lMpc9PrszNrcnM5k3OrchLpUzOKspNJ05PLcjMZUvN6czNrMtNaElMJkrNaE7PbknMps1OLUhL5MrNJ85O7svNac9Pr0////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AlnBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4OYF1OkELmHsRcBoWzrodBXEsGTsDJC82mHc3R17VH0WdRkMgUgGAx4OXw6OSQF4f3pGBgoEmgwDXA4QKQIiHkgXHYV2cEYXDJoWmh+dWhAdGR0CHSWlZGZxRSAEH5oEIwQMkVcOKRkCAswcVQzCxMMEC1kOuNodllOv1cOyWCLMJrUQVQLfmsUEBloeZbckE1UQmgnVEVwlHCAQ9ao4oDCsGIN3gqR8YsMgQMCEECNKnEixIhhIFp18MoHigQkIyDIaGfigZEcUFEI2WcCBwzUwEB4kKLmh5AN0T0qQ2KlA194XEzaDbmAAhYOCFCQQQPPi4EFNp0ETqFTCgYQIBQqWdmkaFGrJh0wWkEBK4qUXE0+fljQRhaXLMDG71sQpsoiDFV5Lrphat8VCpx/B9jUyQfDgw4gT7/GwIgKCBnz7OkAAoHLlET4TR7DMOQGLLQ4kaEBIRQLn0yu2aAhx4ABpKStOd97CurWGKptlW95yovUBCVUo6wawYcuEEyE0RG4CYTiAfRMdGBbiYMRw4BJVYMCgQtEG2SGib98+vcUEBAmIR8AuccJ4DOUPa+eu+Ejh+vjz69/Pv7///wAyEQQAIfkECAYAAAAsAAAAAEAAQACFfLZExNqk5OrkpMaMzOa07PbkrNZ8lMZU3ObU/Pr0vNaszNrMvNqUjMJM3OrE5PLU9PbstNaUnM5kxOKkpNJ01Oa0nMZs/P707PLk9PrshLZMtNaElMpc3Obc1N7UjL5crNKM1ObExN6krNaElMZc3OrM/Pr8vNa0zNrUvN6U3O7E5PLc9Pb0tNqMzOK0rNJ81Oq8/P787PLs9Pr0hLpMlMJk////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5Am3BILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4GYMxmDAYmFsrCVpSyLodBXmdlfkVYbEsm8z8FR6bnx/SDEZCYBHdHx2RzEiHAcNGwVdKykbEzNIJmx9cEYxL5OSDRKWWg8UrBQbF50VDC0VcUUwpQ0cDQcjWykUL60OVRu6B6WTtlcRrax3VBSm0wcZWhPOFA95x90cy1YZG6wvAeBQD8nHE1wJDi4PsFYE6gbnik0PwBtn+P7/AAMKHEgw4IMRJEhs2FYwiYsGEGlAdCFlhgMYnMA8aCBRIscGDJ1kiECSQUYvICBGVAkCSgmSJGGAIdFxJQ0OUGDAjEDsy+EuiABW4nwygwHJFie7gPD4kaOBKBlgOEjaZWNNlSoaHiGwkiM7rUdUGODAQRvYs2jTqtWKQcGGCCXuaY0RQQOAuwAsQFgbAa/duzUSaYkhQwALKxgA/FXMOMAWAShQLDhMJcDdxXhrbPGwYAEKAVVA4B19eUsHyShkVKlLGu+HLTNOC5BrIwYCBScQnHNAenFLfDEUDBg+QAG4GBYYX1aMwR8C4sQRGMFQozc0fMKhDzhxJEGAGho0vGj+74T27WttPNfeIX0M88RPmEhvwwSCEyc6zKfPv7///wAGKGB6QQAAIfkECAYAAAAsAAAAAEAAQACFfLJExN6c5ObknMpk7PbkvNaUzNrclMZUpNJ0/Pr05O7UnMp0jMJMzOa09Pr01ObE9PL0xN607O7sjLpU9PbsvN6clMZk7PLcpMp03O7MhLpExOKkpM5svNakrNJ85PLU3OrEpM58xN6knM5s7PbsvNqc3N7clMZc/P785O7cjMJc9Pr81OrEzOK09PrsnMZspMp8hLpMrNaE////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AmXBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/YOel0biEtY0RZzRqnK8X9YAz/7yrjbWa7b5PG3MDcn1+UXFya2ZHLB6CGwldLg0bLChJeYIchEUbJweeJwiQWi4yHggeFZZIY2VIH6CfnxtbDae3BFWdsqAIWyK3qBlVFbyyI1uMqKgueMaevlooFbcgVi4DsScnLFwoFwrNVxkjsge0hVOSFRu56e/w8fLz9PXyLsAIIuL2SBkHDAIyODAsCooUKVZ9oQBQoEB+TVBEKNAhwigvGxw6ROckRYePHVKAQaBRYLSOIEOC8VAy4MmIEyte7FKhJYMKURKkyDCzi96Dhg4PuOtX5J/GgkSNENiAAEG7pFCjSp1KlEKLEiIUUBWCQkQMABrAhnBAVURYDWjDDlCIBQUECSusUPiaFmzYFlskGNjbE0qEumfRLthiYq8BCUouPHhA4kgJu2fBAlCxRYBhCEgIYADAGQCGxkTMBkYL1sKWBJYlsB0yt3PnCaCFKJA8GkCJdJtdd8ZQJATp3zFivyGgW/fQGQ4s/NYQA+mdB7rDdu5GROIIFSpkkE0Hvbhk6kmJc5bu+jjR3J2lD5hKYML49MKhanY9wrxUAixY2N/Kv7///wDyFwQAIfkECAYAAAAsAAAAAEAAQACFfLZExNa03O7EpM5s9PL0rNaEzNrcjMZMzOK07PLcpNJ09PrsvNqUnMpc3OrErM581Oq8/Pr0jL5U5O7MpMp8tNaE3OLk7PbknMpsxN6c1Oa87O7srNJ8/P70tNqUhLpE3O7MpM509Pbs1NrclMpczOLE9Pr8vN6cnM5k1OrElMJc5PLUpM58tNaM5ObsnM5sxN6s7PLsrNKE/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5AmnBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/YGcENFmEtStFSKFYna8RxWA+UETeVdD6JR+A8FQrAy9zfH+AUgtyi3ZIFycFDAIzXTMgEAlKaYNtSCANJKEkJ5RaMwwcqRBKYyt3RwsYoaCgh1kgqQWpZlQgJKCiDR5bEKkKuhdVGsGiMlsJuqkVpVMrv7O/J1zFBQWZVTMcoSqz31sLF9RVC+K0tohRMxMaDq/w9/j5+vv8/fkzEE6cgKDOn5ELAw4oPDAgWbwYMQpymfHiAIkDKhS+kKhkhoYAAUpwzOJgYUaMB1Y9iQESZAwwJ1AqPKltJcgTAV5+iTnTZOtNJzNKgBQJRoNMmSqfzIA4MgvFoww7GDyCsGfDqUg6aDjBAII9rGDDih3bL0IKGAgckqWhQcKHtx9aNO2nAQBcuCzmSiGwwYSVCG7f2oWbYssGAwZG+KWiQfDdt860WEhsYIOSCw5SiDgC47EEAJ8xbHGB2AABRxQAqAZAYTMRBI8Hf2CxJYILC5aPxPi8WrUE10IuPL4LA17q3qspFGnxAfRdErzwiECOHDiNCCw86wRUl/pqDUVmpJCBgQWMxYgceP8e9sJ61bnBHqeuXCyB5sg/nB5LYD7r/WttoMEI5qxl4IEIJqhggkEAACH5BAgGAAAALAAAAABAAEAAhXy2RMTenOTu1KTSdMza3PT67MTipJTGVLTWjPTy9NTmtOz23Nzm1Pz69Iy+TKzWhOzu7KzOhJTGZLzalNzqxIS+RMTWxOTy1Nzi5PT6/MzmrNTqvOTm7Pz+9KzSfJzKZMTepNTa3PT69LTajPT29NTmvOz25NzqzIy+XLzanIS+TOTy3MzmtPz+/KzShJzKbP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJhwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v2Bnq0BqhbWF0WAwIp2vLfWabX5TC/OBZ1CwU0lre2t9flJxeQh1Rh0bICwmXi0mAoRIJAhrCJVFeB8HHx8bXC0sDw8IF0odBQUNSB0eni+gH5BaJg8eCB4jilIFsrQfGlsCpx6nHVUXwp4fBlsFubkBVgUStAcDB6JbFxMeBptTBtkfAyJdLcpYLQafHw/jhVAiCwsZ9Pr7/P3+/wD/LSjBYkHAJR0QHFh4YISrKC1IlDkzgiHDERAZWLDAwBcXEwxVWFwBhcTGjem+KLBokUW9kxZSelkpkqXLJy00WhDw0AvoSJYLSUJp0WBimIoWVWA8eEQE0oUPZDI1soIFC6FTs2rdyvVgiwslTvTsKkBCBRUVHIDwOPUE2gpnz07okgBCviotPpx1APctViwQCBAIcXeKgLhx+apIsQXDYAIQlIg4cULqkBJ902aOsIWDYAIJLEUAQBpAhHFu+QJQzRfBlgYcMEQ+QgJF6dIoNjV4y1dzhRL0Rt8uzZkIiLdvAbxgC0bE8OFjW0xAu1rFCzeFTjy/LcCIgBQREJQYa0f7dtLdszo/D4D8QeHPi2sl4eC5A/dMG8A3HbqrkAYMCNCffwQWaOCBCCIYBAAh+QQIBgAAACwAAAAAQABAAIWEukTE3qTk7sykxozs9tzM5rSsypz8+vSUxlSk0nTc6sTM3rzk8tTs9uyczmS01oTM4qz8/vScxmTc6tT09uyMwkzE4qTk6uTU5ry82pyUylys0nzc7sTs8uS82pT0+uyEukysxpTs9uT8+vyUxlyk0nzM2szk8tyczmy01pT8/vzE4qzk7tzU6sS81rTc7sz0+vT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCYcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gp0oV3qogmw2EXL5CEqVNAtK2qjbxRJpdl97lgHx9UQV6eitKBC0CglswIo1FEStpK5FCER4OmyUEXS8pKRkUS2NKFpupCZdUMCkPoYhVKgkOErabAlsioa8ZVgepDii2CmYZvRh2tbe3Dh1cFAEZGKxPCsOpHoNUCiXDASPcVCoH4uPo6err7O3ufQcMDAfvSioFGiQkGgXWSiMw2hRAQAKBBoIFpFwwYWJCmBH5CErUQO8JDIYMA345UfCgRxIMoIzAaEKjFxYHSVSIiCAklIUmLoSBsW8fQQ0UpcAgVWZB9koNK+nUM3LvZ7+hSOLNQ8q0qdOn7T4w6OBv1oGqTUSUqACgAokWXFQsGDDAgMMqIhBwrVABRIWEWlyQDUH27JQNbteyrcDzSgeygMtiPQKja1e2huFemTCA7twB54xEONGhYhEGe9ceTpGFReC5kQ6kAAEAAIgUloWc0MzaQhYVBh4PMGGEJunSpUlEjqFCpV7EJ7R0MODYxW4hKXArB8CZSIvDhyuU4DLiwgRoRkbcXm7apJACe7uWGKzlBHflLIw0WOHBgktu5s+XtlvvwPblIPoOTX5+gFPb+B03FAUG3AYCZFAJQcEEE3iX4IMQRijhhE0FAQAh+QQIBgAAACwAAAAAQABAAIV8skTE3qSUylzk7tSszoTs9tzM5rS02oyMwkz8+vSkyny01pzc7sTM2tzk8tSMxkyMulTE3rT09uy82qyEukSkzmyszozU5ry82pSMvlz8/vSEtkycylzk6uykzny81pzc6tTs8tzM4rT0+uzU6ry83pR8tkTE4qTk7tys0nzs9uSMwlT8+vzc7syUxlSs0ozU5sSUvmT8/vyczmykzoS81qTs8uTM4rz0+vS83pz///8AAAAAAAAAAAAAAAAAAAAG/kCdcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsFgpa2EwLdn42kq5U4y1FfNOleRV+vuApzLqLUo4BSNgMglqSWUHB2lJJBUzMxgJXTYTNRGVVgySkRUYXDITHzU1MFcHMxUcnoVaCTULsjdXKZ6rHCpbMhGmNSBXGKyRqyxcODA3IIlVKsWRF31TKnQHcdPZ2tvc3d7f4OFEOJviSA4pAgIpDlQsx2IOLuoc6gNSHQ0NHWLpHPMuOHiIwkKfvnJdEqijtxAhk4IGHW7BIeDfwno4ouTb1y9gRXUEpiSQ2GVAvYv3zBUZ4I9ASpVGcGSESbOmzZtFZFywQGDB/EsrMkZosBQDgFGjBJpJwVHCBQIE7LTggGACQNWqAEJOwVHh6QMEX39WWXD0KFaxTko8XQtWgFIqGazKNVr1gxQZTr9+XRsIaNm5VrXmlCDhrZARbMEqNoBlw1W6R1PkDJCBAoUVAd4m0JsYAQksCsxCBiBtCAsPllNT8PC2wl7OD15ZcYB1rokYQ4cEUK06QBEbe9nm0CKidlUIIYjIqGzZhOoVbwcI0Psgh+EqAxRQAADhgIQiI3g330Dhe04GJ0jIxiOBgvPmzCnMFCdjReoM7y9f97bbPW/fMMmAGm807PeNDAHYR0EGJ8xXkwwS4GAgThRWaOGFGGoTBAAh+QQIBgAAACwAAAAAQABAAIV8tkTE3pykzmzc7syMxky02ozM2tz09uy00oyMvlzM4qys1nzs8uScymTU5sT8/vyEvkSszoT8+vS01pTE1rTk7uyUylz0+uzU5rzs9tyczmTc6tyEulSk0nTk8tyMxlS83pzU4sy01oSUwmTM4rys1oScymzU5syEvkys0ny81pzM3rz0+vTs9uT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCXcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHiZUSgyY2yrxF4w0lbFIlUSKeBVRZ1+x08zJQtsb0oPD2GHSwxmhEgeIgIdGIlbBysUIZRULR2RAgIYXZcUFBtXCgIaqR0pmlcPpCAUJ1cgnp0arlcnpBQVVxgaHaoCE10PGye/VywFnx0dHn5TEhggCi3T2tvc3d7f4OHi41EXAdAgF1QPEmMsAhYN8h3qURUGBstgARYa/fEgojzAh68dmA7yGsRr0CGKBIIGDH5B2E+hMCn38okJIO9fg4BSJEgEc4DivHrkiFwAgQ5lypcwY8qc2eSBAwQRVEiT2WIE2YCfPxHoevIAQweALq2wSAC0KQIqEgoQmEogXjYsKppq3RkFA4EPBEZQTZGFqVagKqYIAEt16gg0V842jYBEwlAhFtxOTTB1ABYOcn/SJVLUBAcIJiYZaSC27dRGVSIEBhCCiAQVEDJDQAFhgqsAjsU2uAvFQ+AEIzFkPrwaQiiVDRwT8JtlxdkEkF00YA2BtwkjB1KEJdCAthYGkgEkQHCgyAHemntDGHpgQIaRcCQkaC09M+luDaJHFwATA+vzrmE+wCxexXdvRQX0Tvw+nEia+PPr388/ZRAAIfkECAYAAAAsAAAAAEAAQACFfLZExNqk3O7EpMaMxOKkrNZ89PbslMZU1ObEvNasvNqUjMJM7PLk/P703OrE1Oa0tNaUnM5kxNbE5O7kpNJ0/Pr0nMZshLZMzOK0tNaE9PrslMpc3ObUjL5c3OrcrNKMxN6k5PLUrNaElMZc1OLUvNa0vN6U7Pbk/P783OrM1Oq8tNqMzNrM5PLcrNJ8hLpMzOa09Pr0lMJk////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AmXBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4GXOoYmOsBsJWoNPVFJutgldVc4jDTo0p2CtvfFIaKg6CRxoEECYhXjEkLB4oVxUiFJgUjlwkEp4MVw6YLpgKXSwsnhNXMJmYGV0enhIGVyGZpCBdKAwctZUgLhEUGb+DUCghDw4Vx87P0NHS09TV1lEoHAkSCJRhKCoKCireTygJA+kDCeW7KxHwERDtTBzq6hxgCPHxCFDo9wZIAKMgggWD8Ew9kRBQIJh38Q4qdGIvYL4v+xDC82cOYDoJzb6ggBBxBT0mFTh4IhESTAUE4lS0vEazps2bOKegkAMhwemJnAYsABgK4MI8KyEUuBBBTksMGUMvEAUwUQqGAws2HDhQYGaVAFOlFgUASkqIBVvRotWFBarYqQACTFGAdUNWuxFOSnkRFS6AD1NcZD1gF+sBDVg6vIULwUiIDCNGZNhUJEPdwXYbYPngV+weIhgWvFggegEGIyqyqsW6IguDxWItzGQwujTpF5SFoChAeCvhn1kQLAbQwZiQDLVJAyAtwkgFEHY3FACuhYGLCxdkBDAuBOvo5AtGIEGhAREfC6RvlxZfs8Do5aVfFLB5Nn1yATdDwxdNIGeIAhtsoElOBBZo4IEIJphTEAAh+QQIBgAAACwAAAAAQABAAIV8skTE3pzk7tScymTs9uTM2sy81pSUxlSk0nT8+vTU5sScynSMwkzM5rTk8tT09uzE3rTc7syMulS83pyUxmTc5tykynT0+uyEukTE4qTk6uSkzmzU3tS81qSs0nz8/vzc6sTs8uykznzE3qTk7tyczmzs9uzM2tS82pyUxlz8+vzU6sSMwlzs8tz09vTM4rScxmykynz0+vSEukys1oT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCacEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHj5IZE+Y+wHYuhAVGkrqUPvkOLVef2On67bEAl9VCoRJDJKHysZDRdeKhUcGmhWHyMeCB40jlwVJwUnIVchmaUNXRygBRpXEZivGV0anycuVxelmCBdHyEVtlggpQGUg1EXAgTFxszNzs/Q0WIECgoE0komFgDcABYm2EYPEt3dEtdgLQ0NLVEL5eUWYA0lGyUlp04E8PDoXC31BmwQ6MCJgnIYuCUEsMILvXv28DlZwa9cwy4vBmockI/JPoX8/G0BGNFeOyfbEHIrMU/ggBIvoJggB2BhTXDp1p2EQiDl50qR4YgQWLECaNCjSJMyEzDCwIsHSoXIEJEQA4YZI5ZJkdFgQoadamBUrQpgRBUHAw4cSHEgVpYXNa3GvQpVygUKa9myvXhlgNy/Nd1GaaB37VoaWVjErckYA4opEwwXZolF7FirCScYuXAJwQhORTKwTWuY8hUDiy9HKOKAgWvXB1YXacFWctssJmZcrrmgiIkUr4ODHiJaMgJEWSLoHksBOfHgwQUTWYHgXgbnWS6gYMGixHUjNKC/RpAUgXjX5JGOOM9AM9ILB8QfMIotQvzXsaPWIJABAYIM9Okn4IAEFmjggeEEAQAh+QQIBgAAACwAAAAAQABAAIV8tkTE1rTc7sSkzmz08vSs1oTM2tyMxkzs8tyk0nT0+uy82pTM4rTU6sScylyszny01oT8+vSMvlTk7sykynzs9uScymy02pTE3pzc3tzs7uys0nzU6rzk5uS02oz8/vSEukTc7sykznT09uzM4sSUylz0+vy83pzU5rzc6sSczmS01oyUwlzk8tSkznyczmzE3qzs8uys0oT8/vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCacEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHg5i8VmY+wMFQiQ0OlqrN2OxeXtU8B+n85IbW99VGVnSy0cIXBcMx0ZGotVDRuUC5FZHQaafFURlBsFGyFdGZoGGlcVoJ8cXRqmEVcRoRsJBS1dMwQdsVgIK6Gtg34VvcPHyMnKy8xpIw0pFc1KIxQA1wAUI9NGFRLY2BLbYAoTIcZO1uDYFGATCSIJCbhOI+vr41wKGyID/gnolKC4Bw6FlwkvBrxI4G9UkxQEsRnsMiGeQoYOmVSIeA1VlwgM/S0MqETdvXZf3sWbB4UAiHsgCISJEGKCAikETGaTye2I8oYMKHj2HEq0qLIKDGA0INnzwwoQUEFImFhlRgsUAm5qmfEgqleqUvaVGOsg45UGXl9ClaA1yowNY8mWkIZFRlQA36I2mDIhroO4GLJY8ApAamEYU1DILfFXRhYKUPGmZWBkBocTJzhcEiIgLuOxC7LAuJuW7pAKL0ocYHHghekhEf7+ZcE4RZYPEqSmvVBkxosDwFcfGPDBSIi/ny1pQcCicFQZJoo0EM46uLAiCDDIuJBisxUFMBJYkNFg84ngwKufKHqCdXXh64lyCP7+gG2iMwagZ03caAX91Q2AgFFCrHHCAhwwReCCDDbo4IMQLhgEACH5BAgGAAAALAAAAABAAEAAhXy2RMTenOTu1KTSdMza3PT67MTipJTGVLTWjPTy9NTmtOz23Nzm1Pz69Iy+TKzWhOzu7KzOhJTGZLzalNzqxIS+RMTWxOTy1Nzi5PT6/MzmrNTqvOTm7Pz+9KzSfJzKZMTepNTa3PT69LTajPT29NTmvOz25NzqzIy+XLzanIS+TOTy3MzmtPz+/KzShJzKbP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJhwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweNkikVpjbIthsTDQ6Sqp3RbFqyK6xX6frtsCDX1ULQ1nSwUCJnBcLRwYEFkrD5QajFocBJoJVy0jHggeDwtdGAQhBJFWDZQPoQJdEJohJFggD6IPBV4JELVYJAEPExeDVR0dxsrLzM3Oz3ciJyd80EgFEQDaABG71kUFKNvbKN5fLQWHUNnj2xFgJCMDAyO/TSLt7YJdnvPzI5eUnMg3DlaXAvM8JDThZCBBbQa5JPDnz9wSfA8B7OPSAQFFBAGVsMv37ksDjx8QbGxCwkE+Byu7NCjQIFmUBiO5cfp2pAHkAwE7eQodSrRZgxMlLoTk2QKEigpPJUSsUmDFIi4Tnmqt4OBElRYGPoh9wFASVK4V0qqQsLSJgQNixQ6weSVFWrVnK0x9IiKuWLgbsnh46gBqYa4lplzwC/eDgSwIzgIoPLmCVyMLFLAoa8RE3AMD4GrIUoLw3cIqYnY8wPrAiJgwWjz4K5eUmhd4tYIwgqB16xFHTAzwG1gLiRcuKU8IuKC1Ct8rjnTYYEADZy0NSiCIMMF2kRK+nRcXyuLA8/AsiDYPzzo60RG+nz8oCkPEA98jqhVdwYKFe/oABijggAQWaGAQACH5BAgGAAAALAAAAABAAEAAhYS6RMTepOTuzKTGjOz23MzmtKzKnPz69JTGVKTSdNzqxMzevOTy1Oz27JzOZLTWhMzirLzanPz+9JzGZNzq1PT27IzCTMTipOTq5NTmvJTKXKzSfNzuxOzy5LzalPT67IS6TKzGlOz25LTOnPz6/JTGXKTSfMzazOTy3JzObLTWlLzWtPz+/MTirOTu3NTqxNzuzPT69P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJlwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CwmEmKjbWY04lyvsbUanObSoKf5HMiy0XpLNMnGHlFDQYDhyssSjEVTCwiB10sI4eVJ1cNESoqMFwulSGHIYpVLSoPm3hYFJWtJFaamw8NWx2thwakVBmnKhG6WSuhA6GCViQZEQGNXCQLomyDUyTU0tbX2Nna20MSKB2R3EkHKiAAACAq4eJEMRPn8AAlr2EswE4q8fEqYCQtGxsg3FMiwZy+cyBUbYGQYEMCExCeoDgYz4UXFhtMOAQ4EIkLivCiccG4sWHHIwcMHgTBrEuBhg1bQMlHcQAYFhA0FpAAJUb3CZUI6d08uaSCAYMgBghlV6QCBQoKmUqdStXaIwFRp76YYAGEhQQisLA4QHSXBQAW0gJAELaKAhMOUlwoC+WDV7Vpv7p1wJevBy0F8KJFa+HDFBZw+U7g6weLB8KQzzKYEkNxir4KslzAezYviiMSGDBYV4RFgr6LHQjIwmBw3rMa7rEooKFECQ0FOgZwsPiyiaVWNghO+8JIAQQlkCMvgNKD4g2Ns2B8bUFmkRgaEGTPrp00ERQKYNCdAuOCihaGjTDInvw28slTGdy2wD47fKnYb8/XoME7u+MIaJccc1XNVpt2uVU1xAGiZaXggxBGKOGEFEIYBAAh+QQIBgAAACwAAAAAQABAAIV8skTE3qSUylzk7tSszoTs9tzM5rS02oyMwkz8+vS01pzc7sTM2tykynzk8tSMxkyMulTE3rS00oz09uy82qyEukSszozU5ry82pSMvlz8/vSEtkykzmzk6uy81pzc6tSkznzs8tzM4rT0+uzU6ry83pR8tkTE4qSczmzk7tys0nzs9uSMwlT8+vzc7syUxlSs0ozU5sSUvmT8/vy81qSkzoTs8uTM4rz0+vS83pz///8AAAAAAAAAAAAAAAAAAAAG/kCdcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsJjZao21HQajc7621OpE25hqbAAZxQj5hsvnQyImAIMAABA2SGlrgEMphYaEADIaSAl/SjMJM1wNkpCDF1U4IjQ0iVoVkZKRElUxNAo0FJxZhqCSBFURpqY4Whm3q4YeVR+mCje1WB6Rg88AA1UaHzcxE1sjEJCRKo1PNjLQJgSV304aIhINGNLn7/Dx8lkzExPL80gzASwVFSwB8OUbMoODv4MVQAgcGAAhwgBgZrjAgMHFwiQzMvjbUIGjPxYXsXxQQVLFgicTDprwZyLDSmxeSpRUUeLJiIMuWfrb4wXD/swDTzJWWOkQ5BcXIEq6gNIQocYKEL9ILHHAIpQZIBwmDDlvH4uVLGgNxIgDB9exaNOqfadhxNmBIVQgQPCixK+1OgY8QLB3Loq7VFbkUHHgpJYZAubyXVwzMAcOKFBwEJXFxdy+ih+8TYIhMmTJmKwYyLx4L08pKiCrRhEiC4nFihUDLqJhtpEDkiNLhnllxOXSCDgccaBCgAAVDpAs8PyCA4YtJ2JfTl7EgfHrAtwZufDYuW0rM07sHb/USHEBL9Cj8IZkRAjeXEaQOLHgogbsKF6kDz0Wh/H0L+QnAH9jnYeeceytNQB6HAT4AnV4EZeeCtrhJcQlFmao4YYcB3bo4YdDBAEAIfkECAYAAAAsAAAAAEAAQACFfLZExN6cpM5s3O7MjMZMtNqMzNrc9PbstNKMjL5czOKsrNZ87PLknMpk1ObE/P78hL5ErM6E/Pr0tNaUxNa05O7slMpc9Prs1Oa87PbcnM5k3OrchLpUpNJ05PLcjMZUvN6c1OLMtNaElMJkzOK8rNaEnMps1ObMhL5MrNJ8vNaczN689Pr07Pbk////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5Al3BILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LCY+ZCMtRWDoXK+PtRqc7voiXAAIxULKYEb5HNCJACEhQkMSGlrgUMehY94gEUSkkkPXRGQjxhVDyEUKwdbd5qECFUbFKorW6WFEVWfFCAUl1kjrgCnVAyqFCFbKrmIVR4hG7ZZFwmlsIxODLiPEZXPShIhEREIxNbe3+DhWQ/J4pYYJigQJhjl5kMPExDz6igT7u8YEAnzHPMQnMBkUKAgQxQT/xJyaACmRYmHC7qRUQfBX8V5CfBlUZBiQQoRCp48uJjwX7WNJUQ8DPkEYb+XJsAwWFAiRQmDT/RZTBjwC98DgjhFqvhnUYVGcw8wCJjH7uS7IZSeSp1KtapVIxdAaLAgoN3VAw0IjCBA4EOBo04kYAChoAWXBWTjku0pRUKJDgI0dPCgpcUHAhbIjiUgoAqGDhoEKJ6gZUBguWQtVAGhGDFetFAYxE0Qd4SGKgryKhbQAbPIsJ3JBjiStUOHABeQtMDbwUQHulcGCI7bIHaRAx0aCLfQwbcRDyJIe90yADWBFKKMgGhgYauGBiCUkPvyIMOA6EfyUh/f4Wrw6g22lrcaAL0F4dmtXjiv3njV1q/tX93Pv7///wAG+F8QACH5BAgGAAAALAAAAABAAEAAhXy2RMTapNzuxKTGjMTipKzWfPT27JTGVNTmxLzWrLzalIzCTOzy5Pz+9NzqxKTSdNTmtLTWlJzOZMTWxOTu5Pz69JzGbLTSjIS2TMzitLTWhPT67JTKXNzm1Iy+XNzq3KzSjMTepOTy1KzWhJTGXNTi1LzWtLzelOz25Pz+/NzqzKzSfNTqvLTajMzazOTy3IS6TMzmtPT69JTCZP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJpwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+BmqpOYIFJhbCoxaA8S6HS143Z35FV2fTDBGxkgHjAzATJHE3t8fkQIGAAAjgAzBkYIiXeLNAwwkI+dFnFDKSZ1ExWZNCCeq48ORhUdExMlp0gpHy4lhloekawYF1UMsrNbnKyewVSxLhMuWzO+vgABVQbEH1sBv50MVgYdDKFYMjPIAMqoTQYWj47AtepNFQ4XFwEU8vr7/P3+8iJGkCChQcS/JBkWKIShMMNBIyIWMGQocYFBMDIcsNj1BITChR9BgNkQoaQCjk1IVAQJgwMYByVLsoCicgGAigxdfmERM4LjqycjKK6EUQCjgpItUDKJuPKjgDAZN0pJOFEigYdHRBTgcKDARaxgw4odS7asKBYaVrR4UTbFigMLuB6IcSWFCAgC4mUJERcuXA5fpaQI8aDwiA1aUnCN23fBiSoiCku+mmXDgcuMuT6ogqDwisIatFTIjJlDaCoCJBdWsGVEacYzjaRgoUABi3FEKhTw/CDwFRSLFxfATSNFCwnIJUQgLsQAgQsKfGNBoeEvgQZHWCRPjmBfgw3MhSiQYIE8ctZjxycvj16s9vLcyVY4bj4CdrIpENRGcN+s//8ABijggAT6EwQAIfkECAYAAAAsAAAAAEAAQACFfLJExN6c5O7UnMpk7PbkzNrMvNaUlMZUpNJ0/Pr01ObEjL5MnMp0zOa05PLU9PbsxN603O7MjLpUvN6clMZk3ObcpMp09PrshLpExOKk5OrkpM5s1N7UvNakrNJ8/P783OrEjMJc7PLspM58xN6k5O7cnM5s7PbszNrUvNqclMZc/Pr81OrEjMJM7PLc9Pb0zOK0nMZspMp89Pr0hLpMrNaE////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5Am3BILBqPyKRyyWw6n9CodEqtWq/YrHbLRRIUCkK3e7IAzgDLaZx90NBoyZptNcPRFnqVcL+L9VIKcBhnhAAsgEYPBhQhFjAfRYJ9aIiJQxE0hJsxM0R8AIZ+l0JuGKenoSNFdoWFA6RCKZuhqAAOnxJ9GHNFHxocFStbFLW0pxNFZXAmf0YiKCgFFVsqtaHYGClHBCwszkcaBQXRWwypqJsQVTPSBRpbMNebp71TLxoikVofA8abyWJBmTGCFo0J+wRCiTAhRQZPCiNKnEixosUjF0h4QEDiwkUlEQ60GNniQISPGEWSHBnCI50PJUokdEJi5coMLyEY6AAhAeYUBDZJIqAjoIPRDiWgeAg6cigbB0eRQgnAtEXAMR8gHJ3J5ILKlQfAdfkgwAHXJiFtnkTJLQMCBBnEsp1Lt67du3iRuMgwoQFEvBlUHBA8ANeVCwIInLUCQrDjAxT+TgHx1gPCLTUODN6sokGVCx42bgRR7THhq1IiIBANdwsCzptxUiHA2oNnLRlgCzZshECDBi6SfJgguobLLAkQmJZtpIEJExtM3D7ygUWGBsf5ZXhew1Lv5xsGRA9+13l0E+Kn13UuHrp0vC6gix9ggnz58xvU33XRAIb9vAAGKOCABBZo4F1BAAAh+QQIBgAAACwAAAAAQABAAIV8tkTE1rTc7sSkzmz08vSs1oTM2tyMxkzs8tyk0nT0+uy82pTM4rTU6sScyly01oT8+vSMvlTk7sysznzs9uScymy02pTE3pykynzc3tzs7uys0nzU6rzk5uS02oz8/vSEukTc7sykznT09uzM4sSUylz0+vy83pzU5rzc6sSczmS01oyUwlzk8tSczmzE3qzs8uys0oT8/vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCZcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdstFjhopSrc7wgDOAMxonKVE0OjImm01w9EYenV0v8/1UQ19cCiARhAvIhUxDTJFKYNohYZDLSwgmJgTjkMwkWcalEIQEZmmK0V2fXmiMy+mmACYYkMEIH0gBEcyGhkdnFkimbKmDEVlcBi6RwQGzh1bFZhv1LIvR70oy0gdzgYZWzG3psQNVRDeoVoNsJkRClYQHQTAWDIT7SDmrVAyKwBvQETYxy8KBQYvGpgoyLChw4cQIyKRweHECQ71JBqhMOCAxwMDaGksIsPFgRIHWHh0kZGLDBgwWi7hkPKjShYc6MggESAA/QmZSU7Y/HjgBJ0RPXvCgHJCpcebRekg6HkiwNInNJ0SzclmZ8+f/VTUrDngg56XMaWMEPsx5EgkH1IsuIDC7Nu7ePPq3cuXCQQBDFoAfRtCRYnDG+BdkUEBQhcKDg5HLrFhcBMEDzZs4KrlxOHPkSVU8behgOYWWwpEnnx40hQKpjUXcI3FA+gSkVNUUaA5gekQW0JEZnGYRQXHRxRICIEcCYfSGxbYzSJjwWrcwI+0SJBARALUSVqgEGB5iowUFmJcQIDExIYB8AckaJ5XgosE9+Fn1xsiAfz8++UFgX/+3UdfXtsN4MIG4PUFQQgtKNbXhBRWaOGFGGbIVxAAOw==\n",
    effect: "fadeIn",
    effectTime: 2000,
    threshold: 0,
    afterLoad: function (element) {
      // called after an element was successfully handled
      let certificationsIsotope = $("#certifications .portfolio-container").isotope({itemSelector: ".portfolio-item"});
      let portfolioIsotope = $("#portfolio .portfolio-container").isotope({itemSelector: ".portfolio-item"});
      let venobox = $(".venobox");
      $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("filter-active"), $(this).addClass("filter-active"), portfolioIsotope.isotope({filter: $(this).data("filter")});
      });
      venobox.venobox({share: !1});
      $("#portfolio-filters li").on("click", function () {
        $("#portfolio-filters li").removeClass("filter-active"), $(this).addClass("filter-active"), certificationsIsotope.isotope({filter: $(this).data("filter")});
      });
      venobox.venobox({share: !1});
    }
  });

  /* -------------------------------------------------------------------------------------------------------------------------------- */

  // Dynamic Current Year Date
  let currentDate = new Date();
  document.getElementById("footer-copyright-year").innerHTML = String(currentDate.getFullYear());
  document.getElementById("learning_journey_current_year").innerHTML = String(currentDate.getFullYear());
});
