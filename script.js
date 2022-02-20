function darkmode(){
  if(localStorage.getItem('darkmode') == "true"){
    document.getElementById('darkmode-icon').className = "ai-moon-fill"; //ai-moon-fill old: fas fa-moon
    document.body.style.setProperty('--maincolor', '#3498db');
    document.body.style.setProperty('--secondcolor', '#2980b9');
    document.body.style.setProperty('--background', '#eaf2f8');
    document.body.style.setProperty('--color', '#000');
    localStorage.setItem('darkmode', 'false');
    console.log('Darkmode deactivated.');
  }
  else{
    document.getElementById('darkmode-icon').className = "ai-sun-fill"; // fas fa-sun
    document.body.style.setProperty('--maincolor', '#3498db');
    document.body.style.setProperty('--secondcolor', '#2980b9');
    document.body.style.setProperty('--background', '#181818');
    document.body.style.setProperty('--color', '#fff');
    localStorage.setItem('darkmode', 'true');
    console.log('Darkmode activated.');
  }
}

function scrollToTop(){
  var speed = 500;
  var time = 15;
  var step = (window.scrollY * -1) / (speed / time),
  scroll = setInterval(function(){
  if (window.scrollY != 0){
      window.scrollBy(0, step);
  }
  else clearInterval(scroll);
},time);
}

function age(birthday, birthmonth, birthyear){
  var birthmonth = birthmonth - 1;
  var ageText = document.getElementById('age');
  var date = new Date();
  var year = date.getFullYear();
  if(date.getMonth() == birthmonth){
    if(date.getDate() >= birthday){
      ageText.innerHTML = Number(year) - birthyear;
    }
    else{
      ageText.innerHTML = Number(year) - birthyear - 1;
    }
  }
  else if(date.getMonth() >= birthmonth){
    ageText.innerHTML = Number(year) - birthyear;
  }
  else if(date.getMonth() <= birthmonth){
    ageText.innerHTML = Number(year) - birthyear - 1;
  }
}

function toggleSection(sectionName){
  var section = document.getElementById(sectionName);
  if(section.style.display == "block"){
    section.style.display = "none";
  }
  else{
    section.style.display = "block";
  }
}

function toggleQuestion(){
  if(event.target.tagName == "DIV"){
    if(event.target.getElementsByTagName('p')[0].style.display == "none"){
      event.target.getElementsByTagName('p')[0].style.display = "block";
      event.target.getElementsByTagName('i')[0].style.transform = "rotate(180deg)";
    }
    else{
      event.target.getElementsByTagName('p')[0].style.display = "none";
      event.target.getElementsByTagName('i')[0].style.transform = "rotate(0deg)";
    }
  }
  else if(event.target.tagName == "H3" || event.target.tagName == "I"){
    if(event.target.parentElement.getElementsByTagName('p')[0].style.display == "none"){
      event.target.parentElement.getElementsByTagName('p')[0].style.display = "block";
      event.target.parentElement.getElementsByTagName('i')[0].style.transform = "rotate(180deg)";
    }
    else{
      event.target.parentElement.getElementsByTagName('p')[0].style.display = "none";
      event.target.parentElement.getElementsByTagName('i')[0].style.transform = "rotate(0deg)";
    }
  }
  else console.log("An error occurred while opening this section. Element: {0}", event.target);
}

document.getElementById('toggle-nav').addEventListener("click", function(){
  var navbar = document.getElementById('navbar');
  var navbarLinks = document.getElementById('navbar-links');
  var navbarIcon = document.getElementById('toggle-nav-icon');
  var delay = 300;
  navbar.style.background = "var(--maincolor)";
  navbarLinks.style.color = "#fff";
  if(navbarLinks.style.display == "block"){
    navbarIcon.classList = "blur";
    setTimeout(function(){
      navbarIcon.classList = "ai-text-align-right"; //ai-text-align-right // ai-cross // fas fa-bars
    }, (delay / 2));
    navbarLinks.style.animation = "swipeOut 300ms linear";
    setTimeout(function(){
      navbarLinks.style.marginLeft = "-100%";
      navbarLinks.style.display = "none";
    }, delay);
  }
  else{
    navbarLinks.style.display = "block";
    navbarIcon.classList = "blur";
    setTimeout(function(){
      navbarIcon.classList = "ai-cross"; // fas fa-times
    }, (delay / 2));
    navbarLinks.style.animation = "swipeIn 300ms linear";
    setTimeout(function(){
      navbarLinks.style.marginLeft = "0px";
    }, delay);
  }
});

function navbarClick(){
  var links = document.getElementById('navbar-links').getElementsByTagName('a');
  for(var i = 0; i < links.length; i++){
    links[i].addEventListener('click', function(e) {
      var navbar = document.getElementById('navbar');
      var navbarLinks = document.getElementById('navbar-links');
      var navbarIcon = document.getElementById('toggle-nav-icon');
      if(window.innerWidth <= 640){
        if(navbarLinks.style.display == "block"){
          navbarIcon.classList = "ai-text-align-right";
          navbarLinks.style.animation = "swipeOut 300ms linear";
          setTimeout(function(){
            navbarLinks.style.marginLeft = "-100%";
            navbarLinks.style.display = "none";
          }, 300);
        }
        else{
          navbarLinks.style.display = "block";
          navbarIcon.classList = "ai-cross";
          navbarLinks.style.animation = "swipeIn 300ms linear";
          setTimeout(function(){
            navbarLinks.style.marginLeft = "0px";
          }, 300);
        }
      }
    });
  }
}

function search(searchEvent){
  var search = document.getElementById('search');
  var searchField = document.getElementById('searchField');
  var searchValue = searchField.value.toUpperCase();
  var content = document.getElementsByClassName('section');
  var results = document.getElementById('searchResultsContainer');
  results.innerHTML = "";
  if(searchValue != ""){
    for(var i = 0; i < content.length; i++){
      if(content[i].innerHTML.toUpperCase().indexOf(searchValue) > -1){
        var resultName = content[i].dataset.section;
        var resultID = content[i].id;
        var resultContent = content[i];
        var resultText = content[i].getElementsByTagName('p')[0].textContent;

        var newResult = document.createElement('div');
        newResult.classList = "searchResult";

        var newResultName = document.createElement('h3');
        if(resultName == null || resultName == "") newResultName.textContent = resultID;
        else newResultName.textContent = resultName;

        var newResultText = document.createElement('p');
        newResultText.textContent = resultText;

        newResult.appendChild(newResultName);
        newResult.appendChild(newResultText);
        results.appendChild(newResult);
      }
      if(results.innerHTML == ""){
        var newResult = document.createElement('div');
        newResult.classList = "searchResult";

        var newResultName = document.createElement('h3');
        newResultName.textContent = "No results found.";

        var newResultText = document.createElement('p');
        newResultText.textContent = "Check your input for spelling mistakes and try again.";

        newResult.appendChild(newResultName);
        newResult.appendChild(newResultText);
        results.appendChild(newResult);
      }
    }
  }
  else{
    results.innerHTML = "";
  }
}
