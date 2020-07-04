// contact class
class Contact {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
}

class Ui {
  static displayContact() {
    const contacts = Store.getContacts();
    contacts.forEach(contact => Ui.addContact(contact));
  }
  // method add the contact
  static addContact(contact) {
    const list = document.getElementById("contact-list");
    // create tr
    const tr = document.createElement("tr");
    tr.className = "collection-contact";
    tr.innerHTML = `
      <td class="filter-name">${contact.name}</td>
      <td class="filter-number">${contact.number}</td>
      <td><i class="ion-close-round btn btn-danger btn-sm delete"></i></td>
    `;
    // append the child
    list.appendChild(tr);

    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
  }
  static showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let form = document.getElementById("form-group");
    container.insertBefore(div, form);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
}

// star local storige
class Store {
  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }
  static addNewContact(contact) {
    const contacts = Store.getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  static removeContact(number) {
    const contacts = Store.getContacts();
    contacts.forEach((contact, index) => {
      if (contact.number === number) {
        contacts.splice(index, 1);
      }
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}
// end local storige

// call the method if dom loaded
document.addEventListener("DOMContentLoaded", Ui.displayContact);

// event submit form add new contact
const form = document.getElementById("form-group");
form.addEventListener("submit", e => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let number = document.getElementById("number").value;

  if (name !== "" || number !== "") {
    // create new object from class
    const contact = new Contact(name, number);
    Ui.addContact(contact);
    // add contact to store
    Store.addNewContact(contact);
    Ui.showAlert("contact added", "success");
  } else {
    Ui.showAlert("field can not by emty", "danger");
  }
});

// event remove a contact on click
document.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    Store.removeContact(
      e.target.parentElement.previousElementSibling.textContent
    );
    Ui.showAlert("contact removed", "success");
  }
});

// search contact with name
let inputSearch = document.getElementById("filter-input");
inputSearch.addEventListener("keyup", filterContactName);
// function filter contact
function filterContactName() {
  let theTr = document.querySelectorAll(".collection-contact");
  console.log(theTr.length);
  let inputSearchValue = document
    .getElementById("filter-input")
    .value.toLocaleLowerCase();
  for (let i = 0; i < theTr.length; i++) {
    let theTd = theTr[i].getElementsByClassName("filter-name")[0];
    if (theTd.innerHTML.toLocaleLowerCase().indexOf(inputSearchValue) > -1) {
      theTr[i].style.display = "";
    } else {
      theTr[i].style.display = "none";
    }
  }
}
// search contact with name
