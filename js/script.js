//const $_ = selector => document.querySelector(selector)
/* ==========Typing Animation============ */

var typed = new Typed(".typing", {
  strings: [
    "",
    "Board worker",
    "Software king",
    "Normal worker",
    "Programmer",
    "",
    "Web Designer",
    "Web Developer",
    "Graphic Designer",
    "Android App Developer",
    "",
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

/*====Asaid====*/
const nav = document.querySelector('.nav')
      navList = nav.querySelectorAll('li')
      totalNavLis = navList.length;
      console.log(totalNavLis)
for (var i = 0; i < totalNavLis.length; i++) {
        console.log(navList[i])
        console.log('f')
      }
    
    
    const $_ = selector => document.querySelector(selector);

