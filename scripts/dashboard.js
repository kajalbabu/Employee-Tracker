allEmployees = JSON.parse(localStorage.getItem("all_employees"));
var currentUser = "";
var currentUserIndex;
var urlString = window.location.href;
var url = new URL(urlString);
var username = url.searchParams.get("username");
allEmployees.map((user, index) => {
  if (username == user.username) {
    currentUser = user;
    currentUserIndex = index;
  }
});
document.getElementById("name").innerHTML = currentUser.name;
document.getElementById("id").innerHTML = currentUser.id;
document.getElementById("position").innerHTML = currentUser.position;
const logs = currentUser.logs;
console.log(currentUser);
populateTable();

function submitData() {
  const date = document.getElementById("date").value;
  setDate(date);
  const tymObj = {};
  tymObj.login = document.getElementById("log_in").value;
  tymObj.logout = document.getElementById("log_out").value;
  if (validateTime(tymObj.login, tymObj.logout)) {
    dateFound = false;
    logs.map((item) => {
      if (item.date == date) {
        dateFound = true;
        if (validateTime(item.lastLogout, tymObj.login)) {
          item.tymdata.push(tymObj);
          item.lastLogout = tymObj.logout;
          item.duration = addTimes(
            item.duration,
            timeDiff(tymObj.login, tymObj.logout)
          );
          displayTable(item.tymdata);
        } else {
          alert("Your login should be after last logout");
        }
      }
    });
    if (!dateFound) {
      const logObj = {};
      logObj.date = date;
      logObj.tymdata = [tymObj];
      logObj.firstLogin = tymObj.login;
      logObj.lastLogout = tymObj.logout;
      logObj.duration = timeDiff(logObj.firstLogin, logObj.lastLogout);
      logs.push(logObj);
      displayTable(logObj.tymdata);
    }
    currentUser.logs = logs;
    allEmployees[currentUserIndex] = currentUser;
    localStorage.setItem("all_employees", JSON.stringify(allEmployees));
    populateTable();
  } else {
    alert("Logout time should be  after login time");
  }
}

function setDate(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateObj = new Date(date);
  document.getElementById("specific_date_display").innerHTML =
    dateObj.toLocaleDateString("en-US", options);
}

function timeDiff(start, end) {
  start = start.split(":");
  end = end.split(":");
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);
  if (hours < 0) hours = hours + 24;

  return (
    (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes
  );
}

function displayTable(data) {
  let table = document.getElementById("specific_table");
  table.innerHTML = "";
  let row1 = table.insertRow();
  let row2 = table.insertRow();
  row1.insertCell().innerHTML = "IN";
  row2.insertCell().innerHTML = "OUT";
  data.map((item) => {
    row1.insertCell().innerHTML = item.login;
    row2.insertCell().innerHTML = item.logout;
  });
}

function populateTable() {
  let tableBody = document.getElementById("table_body");
  tableBody.innerHTML = "";
  currentUser.logs.map((item) => {
    let row = tableBody.insertRow();
    row.onclick = handleClick;
    row.insertCell().innerHTML = item.date;
    row.insertCell().innerHTML = item.firstLogin;
    row.insertCell().innerHTML = item.lastLogout;
    row.insertCell().innerHTML = item.duration;
    function handleClick() {
      setDate(item.date);
      displayTable(item.tymdata);
    }
  });
  console.log(currentUser.logs);
}

//Delete Account
function deleteAccount() {
  var confirmation = confirm("Are really want to delete?");
  if (confirmation) {
    allEmployees = allEmployees.filter((data) => {
      return data.id != currentUser.id;
    });
    localStorage.setItem("all_employees", JSON.stringify(allEmployees));
    window.location.href = "../index.html";
  }
}

function timeToMins(time) {
  var b = time.split(":");
  return b[0] * 60 + +b[1];
}
function timeFromMins(mins) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var h = ((mins / 60) | 0) % 24;
  var m = mins % 60;
  return z(h) + ":" + z(m);
}
function addTimes(t0, t1) {
  return timeFromMins(timeToMins(t0) + timeToMins(t1));
}

console.log(validateTime("15:00", "14:59"));
function validateTime(from, to) {
  const fromAr = from.split(":");
  const toAr = to.split(":");
  const diffH = parseInt(toAr[0]) - parseInt(fromAr[0]);
  const diffM = parseInt(toAr[1]) - parseInt(fromAr[1]);
  if (diffH >= 1) {
    return true;
  } else {
    if (diffH == 0) {
      if (diffM >= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

// function test() {
//   const all_employees = [
//     {
//       id: 7,
//       name: "kajal",
//       position: "engineer",
//       logs: [
//         {
//           date: "2/01/2024",
//          duration:
//           tymdata: [
//             {
//               clockin: 12,
//               clockout: 2,
//             },
//           ],
//         },
//       ],
//     },
//   ];
// }
