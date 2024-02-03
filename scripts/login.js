all_employees = JSON.parse(localStorage.getItem("all_employees"));
function redirectToRegistrationPage() {
  window.location.href = "./pages/registration.html";
}
var loggedin = false;
var form = document.getElementById("user_form");
function handleForm(event) {
  event.preventDefault();
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  all_employees.map((user) => {
    console.log(user.username);
    console.log(username);
    if (username == user.username && btoa(password) == user.password) {
      loggedin = true;
      localStorage.setItem("log_employee", JSON.stringify(user));
      var dashboardUrl =
        "./pages/dashboard.html?username=" + encodeURIComponent(user.username);
      console.log(dashboardUrl);
      window.location.href = dashboardUrl;
    }
  });
  if (!loggedin) {
    alert("Invalid Username or Password");
  }
  loggedin = false;
}

form.addEventListener("submit", handleForm);
