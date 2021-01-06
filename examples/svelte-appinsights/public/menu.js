$(document).ready(function () {
    if (window.innerWidth <= 700) { // For mobile view
      $("#hamburger").click(function () {
        $("#nav_links, #search_bar").slideToggle(1000); //alternate between showing and hiding navbar
        $("#hamburger i").toggleClass('fa-bars').toggleClass('fa-times'); //alternate bars and times
        document.getElementById("nav_links").style.display = "block";
      });
    } else { // For tablet view and beyond
      $("#hamburger").click(function () {
        $("#nav_links").slideToggle(1000);
        $("#hamburger i").toggleClass('fa-bars').toggleClass('fa-times');
      });
    }
  });