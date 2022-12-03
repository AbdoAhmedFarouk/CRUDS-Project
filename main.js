let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let total = document.getElementById("total");

let allInputs = document.querySelectorAll(".price-inputs input");

let mood = "create";
let tmp;
let searchMood = "Title";

allInputs.forEach((input) => {
  input.addEventListener("keyup", function () {
    let resultPrice =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = resultPrice;
  });
});

let AllData;
if (localStorage.products != null) {
  AllData = JSON.parse(localStorage.products);
} else {
  AllData = [];
}

create.onclick = function () {
  let newData = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newData.count < 101
  ) {
    if (mood === "create") {
      if (newData.count > 1) {
        for (let i = 0; i < newData.count; i++) {
          AllData.push(newData);
        }
      } else {
        AllData.push(newData);
      }
    } else {
      AllData[tmp] = newData;
      create.value = "Create";
      mood = "create";
      count.style.display = "block";
    }
    clearAllInputs();
  }
  localStorage.setItem("products", JSON.stringify(AllData));
  showTableData();
  deleteAllData();
};

showTableData();

function showTableData() {
  table = "";
  for (let i = 0; i < AllData.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${AllData[i].title}</td>
      <td>${AllData[i].price}</td>
      <td>${AllData[i].taxes}</td>
      <td>${AllData[i].ads}</td>
      <td>${AllData[i].discount}</td>
      <td>${AllData[i].total}</td>
      <td>${AllData[i].category}</td>
      <td><button id="edit" onclick = "editValues(${i})">Edit</button></td>
      <td><button id="delete" onclick="deleteThisRow(${i})">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
}

function clearAllInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function deleteThisRow(i) {
  if (confirm("Are You Sure You Want To Delete This Row ?")) {
    AllData.splice(i, 1);
    localStorage.products = JSON.stringify(AllData);
    showTableData();
  }
  deleteAllData();
}

deleteAllData();

function deleteAllData() {
  if (AllData.length > 0) {
    let clearBtn = document.getElementById("clear");
    clearBtn.style.display = "block";
    clearBtn.innerHTML = `Delete All (${AllData.length})`;
    clearBtn.onclick = function () {
      if (confirm("Are You Sure You Want To Delete All Data ?")) {
        localStorage.clear();
        AllData.splice(0);
        showTableData();
        clearBtn.style.display = "none";
      }
    };
  } else {
    document.getElementById("clear").style.display = "none";
  }
}

function editValues(i) {
  title.value = AllData[i].title;
  price.value = AllData[i].price;
  taxes.value = AllData[i].taxes;
  ads.value = AllData[i].ads;
  discount.value = AllData[i].discount;
  total.innerHTML = AllData[i].total;
  category.value = AllData[i].category;
  count.style.display = "none";
  create.value = "Edit";
  mood = "edit";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function searchBy(id) {
  let searchInput = document.getElementById("search");
  if (id === "searchtitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  searchInput.placeholder = "Search By " + searchMood;
  searchInput.focus();
  searchInput.value = "";
  showTableData();
}

function searchForIdenticalData(value) {
  let table = "";

  for (let i = 0; i < AllData.length; i++) {
    if (searchMood == "Title") {
      if (AllData[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${AllData[i].title}</td>
          <td>${AllData[i].price}</td>
          <td>${AllData[i].taxes}</td>
          <td>${AllData[i].ads}</td>
          <td>${AllData[i].discount}</td>
          <td>${AllData[i].total}</td>
          <td>${AllData[i].category}</td>
          <td><button id="edit" onclick = "editValues(${i})">Edit</button></td>
          <td><button id="delete" onclick="deleteThisRow(${i})">Delete</button></td>
          </tr>
        `;
      }
    } else {
      if (AllData[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${AllData[i].title}</td>
          <td>${AllData[i].price}</td>
          <td>${AllData[i].taxes}</td>
          <td>${AllData[i].ads}</td>
          <td>${AllData[i].discount}</td>
          <td>${AllData[i].total}</td>
          <td>${AllData[i].category}</td>
          <td><button id="edit" onclick = "editValues(${i})">Edit</button></td>
          <td><button id="delete" onclick="deleteThisRow(${i})">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});