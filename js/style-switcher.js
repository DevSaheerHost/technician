/* ================Toggle Style Switcher============== */
const $ = (selector) => document.querySelector(selector);

const styleSwitcherToggle = $(".style-switcher-toggler");

styleSwitcherToggle.onclick = () => {
  $(".style-switcher").classList.toggle("open");
};

// Hide Style switcher on scroll

window.onscroll = () => {
  if ($(".style-switcher").classList.contains("open")) {
    $(".style-switcher").classList.remove("open");
  }
};

/* ================Theme colors============== */

const alternateStyles = document.querySelectorAll(".alternate-style")
      alternateThemes = document.querySelectorAll(".alternate-theme")

const setActiveStyle = (color) => {
    alternateStyles.forEach(style  =>{
if(color === style.getAttribute("title")){
    style.removeAttribute("disabled")
}else{
    style.setAttribute("disabled", "true")
}
    })
    
    
    alternateThemes.forEach(style  =>{
if(color === style.getAttribute("title")){
    style.removeAttribute("disabled")
}else{
    style.setAttribute("disabled", "true")
}
    })
};
/* ================Theme Light and kark mode============== */
const dayNight = $(".day-night")
dayNight.onclick=()=>{
    dayNight.querySelector("i").classList.toggle("fa-sun")
    dayNight.querySelector("i").classList.toggle("fa-moon")
    document.body.classList.toggle("dark")

}
window.onload=()=>{
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun")
        dayNight.querySelector("i").classList.remove("fa-moon")
        // alert(dayNight.querySelector('i').classList);
        
    }else{
        dayNight.querySelector("i").classList.add("fa-moon")
        dayNight.querySelector("i").classList.remove("fa-sun")


    }
}
