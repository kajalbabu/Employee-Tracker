var allEmployees = localStorage.getItem("all_employees")
  ? JSON.parse(localStorage.getItem("all_employees"))
  : [];
const nextEmployeeId = localStorage.getItem("nextEmployeeId")
  ? parseInt(localStorage.getItem("nextEmployeeId"))
  : 1;
document.getElementById("user_id").value = nextEmployeeId;

const urlString = window.location.href;
const url = new URL(urlString);
const id = url.searchParams.get("id") ? url.searchParams.get("id") : 0;
var editEmployee;
var editEmployeeIndex;
if (id) {
  allEmployees.map((item, index) => {
    if (id == item.id) {
      editEmployee = item;
      editEmployeeIndex = index;
      document.getElementById("user_id").value = item.id;
      document.getElementById("user_name").value = item.name;
      document.getElementById("user_position").value = item.position;
      document.getElementById("user").value = item.username;
      // document.getElementById("pass").value = item.password;
      // document.getElementById("confirmpass").value = item.password;
    }
  });
}

//Reset Form
function resetForm() {
  document.getElementById("user_form").reset();
}

//Form Submission
function formSubmission() {
  event.preventDefault();
  if (validateReg()) {
    if (id) {
      editFormSubmission();
    } else {
      newFormSubmission();
    }
    window.location.href = "../index.html";
  }
}

//Check User
function checkUser() {
  return allEmployees.some((user) => {
    return document.getElementById("user").value == user.username;
  });
}

//Password validation
function validateReg() {
  if (!checkUser()) {
    if (
      document.getElementById("pass").value ==
      document.getElementById("confirmpass").value
    ) {
      return true;
    } else {
      alert("Password does not match");
    }
  } else {
    alert("Username already exists");
  }
}

function createEmployeeObj(empObj) {
  empObj.id = document.getElementById("user_id").value;
  empObj.name = document.getElementById("user_name").value;
  empObj.position = document.getElementById("user_position").value;

  empObj.username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  const encodedPassword = btoa(password);
  empObj.password = encodedPassword;
  return empObj;
}

function newFormSubmission() {
  const emp_obj = createEmployeeObj({});
  emp_obj.logs = [];
  allEmployees.unshift(emp_obj);
  localStorage.setItem("all_employees", JSON.stringify(allEmployees));
  localStorage.setItem("nextEmployeeId", nextEmployeeId + 1);
}
function editFormSubmission() {
  const emp_obj = createEmployeeObj(editEmployee);
  emp_obj.logs = editEmployee.logs;
  allEmployees[editEmployeeIndex] = emp_obj;
  localStorage.setItem("all_employees", JSON.stringify(allEmployees));
}
// document.addEventListener("DOMContentLoaded", function () {
//   const nextEmployeeId =
//     all_employees.length > 0
//       ? Math.max(...all_employees.map((employee) => employee.id)) + 1
//       : 1;
//       console.log(Math.max(...all_employees.map((employee) => employee.id)))
//   document.getElementById("user_id").value = nextEmployeeId;
// });
