const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//Profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Form elements for Modal 1
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

//Form elements for Modal 2
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
/*       For the "const cardModal" part, I can call the variable whatever I want where it says cardModal but that would be an appropriate name in this case so I'm using that one. Also, I can find the appropriate class to give it by finding its id name on my html. In this case we want to use add-card-modal. DON'T FORGET TO ADD THE HASHTAG*/
/*       The first part of the declarations above (profileEditButton annd editProfileButton) is a unique name I want give them. I added the hashtag on the second part because its a character that tells query selector that you're looking for an element with that id      */
/*       Add the following below the 2nd const just to see if "CLICKED" appears on the console in developer tools if it shows CLICKED and not null or something then it was done corrrect and there's no type or anything like that:      console.log(editProfileModal);       */
/*       The first cont has an id in the html because its the main container, but for the rest of the elements you need to select inside of the that container, instead of adding id after id you'd just select them from inside the element individually like I did with the editModalCloseButton const. I entered "editModal.querySelector" instead of document.querySelector       */
/*       For the third const I added an ID, then went to html to edit and add that same name for the "id" and "for" values of the input and label. Remember that the id and for values have to be the same in the html             */
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
/*       Step 1 for previewModal = select it    */
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__container_type_preview"
);

//Card related elements below
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

//To explain what I did below, the getCardElement function is what's cloning the cards.
//I just had to add the const cardTitle and const cardImage for src and alt to get added onto each card. The info that's being added to each card was added at the top of this javascript file. The name and link (which is the image for each card) is what's being cloned in the getCardElement function. That's how the info is showing on each card.

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  //Last step: I selected the image element (2nd line is what I added)
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  //LIKE BUTTON: Step 1 was to select the element (in this case the like btn above). If I forget what class to put inside the parenthesis above then look at the html and find the class I used for the like button. IMPORTANT, don't forget to put a " . " for the class that's why I kept getting an error I had forgot the dot.
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  //DELETE BUTTON: Step 1: select the delete button

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  //TODO, last step: assign values to the image src and alt attributes (2nd and 3rd line above is what I added)
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });
  //LIKE BUTTON (above): Step 2 add the event listener for the like button and STEP 3 add event handler

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });
  /*       Step 2 for previewModal = add event listener     */

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  //DELETE BUTTON (above) step 2 add event listener, then step 3 add handler to remove card from DOM. I used arrow function which acts as the event handler.

  previewModalCloseBtn.addEventListener("click", () => {
    // previewModal.remove();
    closeModal(previewModal);
  });
  /*       Step 3 for previewModal = close Modal using another add event listener     */

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  //For the adding the class step, I created the modal_opened class in modal.css and added visibility: visible to make it pop up when edit profile is clicked and close when the modal closes (aka classList.add on this openModal function makes it appear and the classList.remove makes it close on the closeModal function below)
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
/*     For the function part to add Modal (make edit profile pop-up work after you click "edit profile"), you just add the word "add". To remove it when you press the X button, all you'd do is change the word add to "remove" and keep the same class      */

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  //The step above makes the image name and actual image appear when adding a new card
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  //To make the new card appear as the first card instead of the last I added prepend above instead of append (this one adds the new card at the end not at the beginning which is what we don't want
  closeModal(cardModal);
  //closeModal above closes the modal after clicking save
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
/*     Add the following below profileEditButton just to see if "CLICKED" appears on the console in developer tools if it shows CLICKED and not null or something then it was done corrrect and there's no type or anything like that:      console.log("CLICKED");       */
/*     IMPORTANT: you dont put . on the modal_opened becasue its a classlist. You don't use . on classLists       */

// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]);
//   //added to DOM
//   cardsList.append(cardElement);
//   //added append above even though the project video said to use prepend because prepend will make the first card go last and the second follows right after it. With append, it puts the it leaves the order how it shows it in the design.
// }

//I commented the for method that I used above instead of removing it as a side note that I changed the changed it to the foreach method below which is more preferrable in code. Its the better alternative.

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
