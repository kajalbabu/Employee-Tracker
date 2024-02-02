var all_employees = localStorage.getItem("all_employees")
  ? JSON.parse(localStorage.getItem("all_employees"))
  : [];

//Reset Form
function resetForm() {
  document.getElementById("user_form").reset();
}

//Form Submission
function formSubmission() {
  const emp_obj = {};
  emp_obj.id = document.getElementById("user_id").value;
  emp_obj.name = document.getElementById("user_name").value;
  emp_obj.position = document.getElementById("user_position").value;

  emp_obj.username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  const encodedPassword = btoa(password);
  emp_obj.password = encodedPassword;

  all_employees.unshift(emp_obj);
  localStorage.setItem("all_employees", JSON.stringify(all_employees));
}
document.addEventListener("DOMContentLoaded", function () {
  const nextEmployeeId =
    all_employees.length > 0
      ? Math.max(...all_employees.map((employee) => employee.id)) + 1
      : 1;
  document.getElementById("user_id").value = nextEmployeeId;
});
