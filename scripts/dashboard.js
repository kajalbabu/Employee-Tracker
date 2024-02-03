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

function submitData() {
  const date = document.getElementById("date").value;
  const tymObj = {};
  tymObj.login = document.getElementById("log_in").value;
  tymObj.logout = document.getElementById("log_out").value;
  dateFound = false;
  logs.map((item) => {
    if (item.date == date) {
      dateFound = true;
      item.tymdata.push(tymObj);
    }
  });
  if (!dateFound) {
    const logObj = {};
    logObj.date = date;
    logObj.tymdata = [tymObj];
    logs.push(logObj);
  }
  currentUser.logs = logs;
  allEmployees[currentUserIndex] = currentUser;
  localStorage.setItem("all_employees", JSON.stringify(allEmployees));
  console.log(allEmployees);

  // logObj.firstLogin=logObj.firstLogin?logObj.firstLogin:tymObj.login;
  // logObj.lastLogout=logObj.lastLogout?tymObj.logout:logObj.lastLogout;
  // var t= diff(tymObj.login,tymObj.logout);
  // console.log(t)
  // logObj.duration=logObj.duration+t;
}

// function submitData(){
//     const master_obj={}
//     const data_obj={}
//     const tymObj={}

//     master_obj.id=currentUser.id;
//     master_obj.name=currentUser.name;
//     master_obj.position=currentUser.position;
//     master_obj.username=currentUser.username;
//     master_obj.password=currentUser.password;

//     document.getElementById("specific_date_display").innerHTML=document.getElementById("date").value;
//     tymObj.login=document.getElementById("log_in").value;
//     tymObj.logout=document.getElementById("log_out").value;
//     tymdata.push(tymObj);
//     d=false;

//     data_obj.date=document.getElementById("date").value;
//     var t= diff(tymObj.login,tymObj.logout);
//     data_obj.duration=t;
//     console.log(data_obj)
//     data.map((user)=>{
//         if(user.date==data_obj.date){
//             d=true;
//             user.tymdata.push(data_obj.tymdata);
//         }
//     })
//     if(!d){
//         data.push(data_obj);
//     }

//     data_obj.tymdata=tymdata;
//     master_obj.data=data;
//     console.log(master_obj);
//     all_employees.map((user,index)=>{
//         if(username==user.username){
//             all_employees[index]=master_obj;
//             // localStorage.setItem("all_employees", JSON.stringify(all_employees));
//             console.log(all_employees);
//         }
//     })
//     displayTable();
//}

function diff(start, end) {
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

function displayTable() {
  let table = document.getElementById("specific_table");
  table.innerHTML = "";
  logs.map((user) => {
    let row = table.insertRow();
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    c1.innerHTML = user.date;
    let loginValue = "";
    let logoutValue = "";
    user.tymdata.map((tym) => {
      loginValue = tym.login;
      logoutValue = tym.logout;
    });
    c2.innerHTML = loginValue;
    c3.innerHTML = logoutValue;
    c4.innerHTML = "";
  });
}

//Delete Account
function deleteAccount() {
    var confirmation=confirm("Are really want to delete?");
    if(confirmation){
        allEmployees = allEmployees.filter((data) => {
            return data.id != currentUser.id;
         });
         localStorage.setItem("all_employees", JSON.stringify(allEmployees));
         window.location.href="../index.html";
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
