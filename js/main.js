const emergencyContact = document.getElementById("emergency-contact");
const favoriteContact = document.getElementById("favorite-contact");
const searchInput = document.getElementById("search-input");

const favTag = document.getElementById("fav-tag");
const emerTag = document.getElementById("emer-tag");


var contacts = JSON.parse(localStorage.getItem("contacts")) || [];

const contactHtml=`
    <form id="contactForm" class="text-start">

      <label for="full-name" class="form-label fw-bold">
        Full Name <span class="text-danger">*</span>
      </label>

      <input oninput="fullNameValidation()"
        type="text"
        class="form-control bg-body-tertiary mb-3"
        id="full-name"
        placeholder="Enter full name"
      />
<p class="fs-sm text-danger d-none">Name should contain only letters and spaces (2-50 characters)</p>
      
      <label for="phone" class="form-label fw-bold">
        Phone Number <span class="text-danger">*</span>
      </label>

      <input oninput="phoneValidation()"
        type="tel"
        class="form-control bg-body-tertiary mb-3"
        id="phone"
        placeholder="e.g., 01012345678"
      />
      <p class="fs-sm text-danger d-none">Please enter a valid Egyptian phone number</p>

      <label for="email-address" class="form-label fw-bold">
        Email address <span class="text-danger">*</span>
      </label>

      <input oninput="mailValidation()"
        type="email"
        class="form-control bg-body-tertiary mb-3"
        id="email-address"
        placeholder="name@example.com"
      />
      <p class="fs-sm text-danger d-none">Please enter a valid email address</p>


      <label for="address" class="form-label fw-bold">
        Address
      </label>

      <input
        type="text"
        class="form-control bg-body-tertiary mb-3"
        id="address"
        placeholder="Enter address"
      />

      <label for="group" class="form-label fw-bold">
        Group
      </label>

      <select
        class="form-select bg-body-tertiary mb-3"
        id="group"
      >
        <option value="">Select a group</option>
        <option value="Family">Family</option>
        <option value="Friends">Friends</option>
        <option value="Work">Work</option>
        <option value="School">School</option>
        <option value="Other">Other</option>
      </select>

      <label for="notes" class="form-label fw-bold">
        Notes
      </label>

      <textarea
        class="form-control bg-body-tertiary mb-3"
        id="notes"
        rows="2"
        placeholder="Add notes about this contact"
        style="resize: none;"
      ></textarea>

      <div class="d-flex gap-4 mb-3">

        <div>
          <input
            class="form-check-input"
            type="checkbox"
            id="favorite"
          />

          <i class="fa-solid fa-star text-warning"></i>

          <label
            class="form-check-label text-secondary"
            for="favorite"
          >
            Favorite
          </label>
        </div>

        <div>
          <input
            class="form-check-input"
            type="checkbox"
            id="emergency"
          />

          <i class="fa-solid fa-heart-pulse text-danger"></i>

          <label
            class="form-check-label text-secondary"
            for="emergency"
          >
            Emergency
          </label>
        </div>

      </div>

    </form>
  `;
displayContacts(contacts);

function displayContacts(contactList) {
  var htmlContent = "";
  if (!contactList.length) {
    htmlContent = `
    <div
                class="no-contact p-5 d-flex flex-column justify-content-center align-items-center gap-3"
              >
                <i
                  class="fa-solid fa-address-book text-body-tertiary fs-1 bg-body-secondary py-4 px-5 border border-0 rounded-4 d-flex justify-content-center"
                ></i>
                <span class="text-secondary fw-bold">No contacts found</span>
                <p class="text-secondary">Click "Add Contact" to get started</p>
              </div>
    `;
  } else {
    htmlContent = `
    <div class="row contact-cards g-3">

    `;
    for (var i = 0; i < contactList.length; i++) {
      var favorite = "";
      var emergency = "";
      var favTag = "";
      var emerTag = "";
      var emergencyGrp="";
      if (contactList[i].favorite) {
        favorite = `
        <i class="fa-solid fa-star text-warning  "></i>
        `;
        favTag = `<i class=" position-absolute favorite-tag fa-solid fa-star text-white bg-warning py-1 px-2 d-flex justify-content-center border border-2 rounded-circle"></i>
`;
      } else {
        favorite = `
        <i class="text-secondary fa-regular fa-star "></i>
        `;
        favTag = "";
      }
      if (contactList[i].emergency) {
        emergency = `
        <i class="fa-solid text-danger fa-heart-pulse "></i>`;
        emerTag = `<i class=" position-absolute emergency-tag  fa-solid fa-heart-pulse text-white bg-danger py-1 px-2 d-flex justify-content-center border border-2 rounded-circle"></i>
`;
emergencyGrp=` <span
                        class=" fw-semibold text-danger fs-sm bg-light-danger py-2 px-3 border border-0 rounded-3"
                      >
                        Emergency
                      </span> `;
      } else {
        emergency = `
        <i class="text-secondary fa-regular fa-heart "></i>`;
        emerTag = "";
        emergencyGrp="";
      }
      htmlContent += `<div class="col-sm-6">
                  <div
                    class="contact-card shadow overflow-hidden bg-white border border-0 rounded-4"
                  >
                    <div class="p-3 d-flex align-items-start flex-column gap-3">
                      <div class="contact-heading d-flex gap-3">
                        <span
                          class="position-relative contact-img fw-bold text-capitalize bg-violet px-4 py-3 text-white border border-0 rounded-4"
                        >
                          ${contactList[i].fullName[0]}
                         ${favTag}
                         ${emerTag}
                    
                          </span>
                        
                        <div class="contact-details">
                          <h5 class="mb-1 fw-bold">${contactList[i].fullName}</h5>

                          <div class="contact-info d-flex gap-2">
                            <i
                              class="fa-solid fa-phone text-primary fs-sm d-flex justify-content-center border border-0 rounded-2 py-2 px-3 bg-light-blue"
                            ></i>
                            <span
                              class="fs-md text-secondary-emphasis"
                              id="phone-num"
                              >${contactList[i].phoneNum}</span
                            >
                          </div>
                        </div>
                      </div>

                      <div class="contact-info d-flex gap-2">
                        <i
                          class="fa-solid fa-envelope text-violet fs-sm d-flex justify-content-center border border-0 rounded-2 py-2 px-3 bg-light-violet"
                        ></i>
                        <span class="fs-md text-secondary-emphasis"
                          >${contactList[i].emailAddress}</span
                        >
                      </div>
                      <div class="contact-info d-flex gap-2">
                        <i
                          class="fa-solid fa-location-dot text-success fs-sm d-flex justify-content-center border border-0 rounded-2 py-2 px-3 bg-light-green"
                        ></i>
                        <span class="fs-md text-secondary-emphasis"
                          >${contactList[i].address}</span
                        >
                      </div>
                      <div class="d-flex gap-3 justify-content-start">
                        <span
                            class="contact-group fw-semibold text-violet fs-sm bg-light-violet py-2 px-3 border border-0 rounded-3"
                        >
                            ${contactList[i].group}
                        </span>
                        ${emergencyGrp}
                      </div>
                    </div>
                    <div
                      class="contact-actions p-3 bg-light d-flex justify-content-between"
                    >
                      <div class="d-flex gap-3">
                        <a href="">
                          <i
                            class="fa-solid fa-phone text-success d-flex justify-content-center py-2 px-3 bg-light-green border border-0 rounded-2"
                          ></i>
                        </a>

                        <a href="">
                          <i
                            class="fa-solid fa-envelope text-violet d-flex justify-content-center py-2 px-3 bg-light-violet border border-0 rounded-2"
                          ></i>
                        </a>
                      </div>

                      <div class="d-flex gap-3 text-secondary">
                        <a href="" id="favorite-contact" onclick="toggleFav(${i})">
                          ${favorite}
                        </a>

                        <a href="" id="emergency-contact" onclick="toggleEmergency(${i})">
                          ${emergency}
                        </a>

                        <a href="#" id="edit-btn" onclick="updateContact(${i})" return false;>
                          <i class="fa-solid fa-pen text-secondary"></i>
                        </a>

                        <a href="" id="delete-btn" onclick="deleteContact(${i})">
                          <i class="fa-solid fa-trash text-secondary"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>`;
    }
    htmlContent += "</div>";
  }
  document.getElementById("display-contacts").innerHTML = htmlContent;
  document.getElementById("total-count").textContent = contactList.length;
  document.getElementById("tot-count").textContent = contactList.length;

  displayFavorite();
  displayEmergency();
}
function addContactClick() {
  Swal.fire({
    title: "Add New Contact",

    html: contactHtml,

    showCancelButton: true,

    confirmButtonText: `
    <i class="fa-solid fa-check"></i>
    Save Contact
  `,

    cancelButtonText: "Cancel",

    confirmButtonColor: "#7c3aed",

    preConfirm: () => {
      const fullNameInput = document.getElementById("full-name");
      const phoneNumInput = document.getElementById("phone");
      const emailAddressInput = document.getElementById("email-address");

      const isNameValid = fullNameValidation(fullNameInput);
      const isPhoneValid = phoneValidation(phoneNumInput);
      const isEmailValid = mailValidation(emailAddressInput);

      if (!isNameValid || !isPhoneValid || !isEmailValid) {
        Swal.showValidationMessage("Please enter valid data");
        return false;
      }

      return {
        fullName: fullNameInput.value,
        phoneNum: phoneNumInput.value,
        emailAddress: emailAddressInput.value,
        address: document.getElementById("address").value,
        group: document.getElementById("group").value,
        notes: document.getElementById("notes").value,
        favorite: document.getElementById("favorite").checked,
        emergency: document.getElementById("emergency").checked,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      contacts.push(result.value);

      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts(contacts);
    }
  });
}
function displayFavorite() {
  var htmlInner = "";
  var favCount = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite) {
      htmlInner += `
        <div class="col-sm-6 col-xl-12">
                    <div
                      class="mini-contact p-2 d-flex align-items-center justify-content-between border border-0 bg-light rounded-4"
                    >
                      <div class="contact-details d-flex gap-3">
                        <span
                          class="bg-violet px-3 py-2 text-white border border-0 rounded-3"
                          >${contacts[i].fullName[0]}</span
                        >

                        <div class="contact-info">
                          <div class="fw-semibold fs-sm">${contacts[i].fullName}</div>

                          <span class="fs-sm text-secondary">
                            ${contacts[i].phoneNum}
                          </span>
                        </div>
                      </div>
                      <a href="">
                        <i
                          class="fa-solid fa-phone text-success d-flex justify-content-center py-2 px-3 bg-light-green border border-0 rounded-2"
                        ></i>
                      </a>
                    </div>
                  </div>`;
      favCount++;
    }
  }
  document.getElementById("fav-count").textContent = favCount;

  document.getElementById("fav_contacts").innerHTML = htmlInner;
}
function displayEmergency() {
  var htmlInner = "";
  var emerCount = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].emergency) {
      htmlInner += `
         <div class="col-sm-6 col-xl-12">
                    <div
                      class="mini-contact p-2 d-flex align-items-center justify-content-between border border-0 bg-light rounded-4"
                    >
                      <div class="contact-details d-flex gap-3">
                        <span
                          class="bg-violet px-3 py-2 text-white border border-0 rounded-3"
                          >${contacts[i].fullName[0]}</span
                        >

                        <div class="contact-info">
                          <div class="fw-semibold fs-sm">${contacts[i].fullName}</div>

                          <span class="fs-sm text-secondary">
                            ${contacts[i].phoneNum}
                          </span>
                        </div>
                      </div>
                      <a href="">
                        <i
                          class="fa-solid fa-phone text-danger d-flex justify-content-center py-2 px-3 bg-light-danger border border-0 rounded-2"
                        ></i>
                      </a>
                    </div>
                  </div>`;
      emerCount++;
    }
  }
  document.getElementById("emer-count").textContent = emerCount;

  document.getElementById("emerg-contacts").innerHTML = htmlInner;
}
function deleteContact(contactIndex) {
  contacts.splice(contactIndex, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
}
function updateContact(contactIndex) {
  Swal.fire({
    title: "Edit Contact",

    html:contactHtml,

    showCancelButton: true,

    confirmButtonText: `
    <i class="fa-solid fa-check"></i>
    Save Contact
  `,

    cancelButtonText: "Cancel",

    confirmButtonColor: "#7c3aed",

    didOpen: () => {
      document.getElementById("full-name").value =
        contacts[contactIndex].fullName;
      document.getElementById("phone").value = contacts[contactIndex].phoneNum;
      document.getElementById("email-address").value =
        contacts[contactIndex].emailAddress;
      document.getElementById("address").value = contacts[contactIndex].address;
      document.getElementById("group").value = contacts[contactIndex].group;
      document.getElementById("notes").value = contacts[contactIndex].notes;
      document.getElementById("emergency").checked =
        contacts[contactIndex].emergency;
      document.getElementById("favorite").checked =
        contacts[contactIndex].favorite;
    },
    preConfirm: () => {
      const fullNameInput = document.getElementById("full-name").value;
      const phoneNumInput = document.getElementById("phone").value;
      const emailAddressInput = document.getElementById("email-address").value;

      if (!fullNameInput || !phoneNumInput || !emailAddressInput) {
        Swal.showValidationMessage("Please fill in all required fields");

        return false;
      }

      return {
        fullName: fullNameInput,
        phoneNum: phoneNumInput,
        emailAddress: emailAddressInput,
        address: document.getElementById("address").value,
        group: document.getElementById("group").value,
        notes: document.getElementById("notes").value,
        favorite: document.getElementById("favorite").checked,
        emergency: document.getElementById("emergency").checked,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      contacts[contactIndex] = result.value;

      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts(contacts);
    }
  });
}

function toggleFav(CurrentIndex) {
  contacts[CurrentIndex].favorite = !contacts[CurrentIndex].favorite;
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts(contacts);
}
function toggleEmergency(CurrentIndex) {
  contacts[CurrentIndex].emergency = !contacts[CurrentIndex].emergency;
  localStorage.setItem("contacts", JSON.stringify(contacts));

  displayContacts(contacts);
}
function fullNameValidation(
  fullNameInput = document.getElementById("full-name"),
) {
  var regex = /^[A-Za-z ]{2,50}$/;
  if (regex.test(fullNameInput.value.trim())) {
    fullNameInput.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    fullNameInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function phoneValidation(phoneNumInput = document.getElementById("phone")) {
  var regex = /^(002)?(01)[0125]\d{8}$/;
  if (regex.test(phoneNumInput.value.trim())) {
    phoneNumInput.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    phoneNumInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function mailValidation(
  emailAddressInput = document.getElementById("email-address"),
) {
  var regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (regex.test(emailAddressInput.value.trim())) {
    emailAddressInput.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    emailAddressInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function searchFunction() {
  var term = searchInput.value.trim().toLowerCase();
  var searchArr = [];
  for (var i = 0; i < contacts.length; i++) {
    if (
      contacts[i].fullName.trim().toLowerCase().includes(term) ||
      contacts[i].phoneNum.trim().toLowerCase().includes(term) ||
      contacts[i].emailAddress.trim().toLowerCase().includes(term)
    )
      searchArr.push(contacts[i]);
  }
  displayContacts(searchArr);
}
