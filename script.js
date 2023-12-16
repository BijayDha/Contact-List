const apiEp = "https://randomuser.me/api/?results=5";

// 1. Create a function to call the api age fetch the data from  random user server

let userList = [];

const displayElm = document.getElementById("list");

// 2. put the user array in the global variable
const fetchUsers = (url) => {
  try {
    //promise using fetch to get data from the server

    fetch(url)
      .then((dt) => {
        console.log(dt);
        return dt.json();
      })
      .then((data) => {
        userList = data.results;
        console.log(data);
        display(userList);
      })

      .catch((error) => {
        console.log(error);
      });
    //aysnc/await to fetch data from the server
  } catch (error) {
    console.log(error);
  }
};

fetchUsers(apiEp);

// 3. Crate a fucntion that will loop through the array and displays the content in the dom

const display = (users) => {
  console.log(users);
  let str = "";
  users.map((user, i) => {
    str += ` <div class="card flex-grow-1" style="width: 18rem">
    <img src="${user.picture.large}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${
        user.name.title + " " + user.name.first + " " + user.name.last
      }</h5>
      <div class="card-text">
      <ul class="list-unstyled">
          <li><i class="fa-solid fa-phone"></i>${"   " + user.cell}</li>
          <li><i class="fa-solid fa-envelope"></i>  
          ${"   " + user.email}</li>
          <li><i class="fa-solid fa-map"></i></i>${
            "   " +
            user.location.street.number +
            " " +
            user.location.street.name +
            ", " +
            user.location.country
          }</li>
      </ul>
      </div>
      
    </div>
  </div>`;
  });
  displayElm.innerHTML = str;
  document.querySelector("#counter").innerHTML = users.length;
};

const handleOnGenderSelect = (e) => {
  const g = e.value;
  const url = apiEp + "&gender=" + g;
  console.log(g);
  fetchUsers(url);
};

// handling the search function
document.getElementById("search").addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);

  const filteredArg = userList.filter((user) => {
    const fullName = (user.name.first + "" + user.name.last).toLowerCase();
    return fullName.includes(value);
  });
  display(filteredArg);
});
