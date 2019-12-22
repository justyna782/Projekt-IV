const inputLogin = document.getElementById("inputForLogin");
const inputPassword = document.getElementById("inputForPassword");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function(event){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let url = new URL("http://localhost:3000/api/auth"),
    params = {
      user_email: inputEmail.value,
      user_password: inputPassword.value
    }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  fetch(url, {
    "method": "POST",
    "headers": { myHeaders },
    mode: 'no-cors'
  })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(err => {
      console.log(err);
    });
});


















