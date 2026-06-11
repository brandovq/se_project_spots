import "./index.css"; //Add this to fix my website layout to show up normal after typing in nmp run dev (nmp run build?) in terminal (to view it on the internet) to be able to see in on the browser correctly. This is because the css file is what gives the website its layout and design, so without it, the website would just show up as plain text and images without any styling.
import {
  enableValidation,
  disableButton,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

enableValidation(settings);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "28ea96c7-9894-446d-bd5f-7a7c8ee85463",
    "Content-Type": "application/json",
  },
});

let currentUserId;

// This fallback helper function made the like buttons work again. And with both the old and new API response formats. It checks if the card data has an "isLiked" property (new format) or a "likes" array (old format) to determine if the card is liked by the current user.
function getEntityId(entity) {
  if (!entity) {
    return null;
  }

  if (typeof entity === "string") {
    return entity;
  }

  return entity.id || entity._id || null;
}

// (Uses liked isLiked) Likes and unlikes can have different data structures, so this function checks both possible formats to determine if the card is liked by the current user.
function getCardLikedState(cardData, userId) {
  if (typeof cardData?.isLiked === "boolean") {
    return cardData.isLiked;
  }

  if (Array.isArray(cardData?.likes)) {
    return cardData.likes.some((likeUser) => getEntityId(likeUser) === userId);
  }

  return false;
}

//destructured the second item in the callback of the .then() below
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    currentUserId = getEntityId(userInfo);

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    //Part 4: Handle the user's information
    //Set the src of the avatar image
    // set the textcontent of both the text elements
    profileAvatar.src = userInfo.avatar;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: new URL(
//       "../images/1-photo-by-moritz-feldmann-from-pexels.jpg",
//       import.meta.url,
//     ).href,
//   },
//   {
//     name: "Restaurant terrace",
//     link: new URL(
//       "../images/2-photo-by-ceiline-from-pexels.jpg",
//       import.meta.url,
//     ).href,
//   },
//   {
//     name: "An outdoor cafe",
//     link: new URL(
//       "../images/3-photo-by-tubanur-dogan-from-pexels.jpg",
//       import.meta.url,
//     ).href,
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: new URL(
//       "../images/4-photo-by-maurice-laschet-from-pexels.jpg",
//       import.meta.url,
//     ).href,
//   },
//   {
//     name: "Tunnel with morning light",
//     link: new URL(
//       "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//       import.meta.url,
//     ).href,
//   },
//   {
//     name: "Mountain house",
//     link: new URL(
//       "../images/6-photo-by-moritz-feldmann-from-pexels.jpg",
//       import.meta.url,
//     ).href,
//   },
// ];

//Profile elements below
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalButton = document.querySelector(".profile__add-btn");

const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Form elements for Modal 3 Avatar-modal
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector("#edit-avatar-form");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");

//Form elements for Modal 4 Delete-modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector("#delete-form");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteSubmitBtn = deleteModal.querySelector(".modal__submit-btn");
const deleteCancelBtn = deleteModal.querySelector(
  ".modal__submit-btn_type_cancel",
);

let cardToDeleteId = null;
let cardToDeleteElement = null;

//Form elements for Modal 1 Edit-profile-modal
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input",
);

//Form elements for Modal 2 Add-card-modal
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
/*  Good to know: I added this part below for the resetValidation code which just removed the error message when the modal opens again, it doesn't just stay there. after reopening */
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn");
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
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

//Card related elements below
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function setButtonLoading(button, isLoading, loadingText, defaultText) {
  button.textContent = isLoading ? loadingText : defaultText;
}

//To explain what I did below, the getCardElement function is what's cloning the cards.
//I just had to add the const cardTitle and const cardImage for src and alt to get added onto each card. The info that's being added to each card was added at the top of this javascript file. The name and link (which is the image for each card) is what's being cloned in the getCardElement function. That's how the info is showing on each card.

function getCardElement(data) {
  const cardId = getEntityId(data);
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
  let isLiked = getCardLikedState(data, currentUserId);
  // Like/Unlike Lag Fix - Step 1: Track request state so repeated rapid clicks do not queue conflicting API calls.
  let likeRequestInFlight = false;

  cardLikeBtn.classList.toggle("card__like-btn_liked", isLiked);
  //TODO, last step: assign values to the image src and alt attributes (2nd and 3rd line above is what I added)
  cardLikeBtn.addEventListener("click", () => {
    // Like/Unlike Lag Fix - Step 2: Exit early if card id is missing or a previous like/unlike request is still running.
    if (!cardId || likeRequestInFlight) {
      return;
    }

    // Like/Unlike Lag Fix - Step 3: Save previous state, compute next state, then update UI immediately (optimistic update).
    const previousLikedState = isLiked;
    const nextLikedState = !isLiked;

    // Update UI immediately so the like action feels responsive.
    isLiked = nextLikedState;
    cardLikeBtn.classList.toggle("card__like-btn_liked", isLiked);

    // Like/Unlike Lag Fix - Step 4: Lock button during request to keep state transitions predictable.
    likeRequestInFlight = true;
    cardLikeBtn.disabled = true;

    // Like/Unlike Lag Fix - Step 5: Send the matching API request based on the newly intended state.
    const likeRequest = nextLikedState
      ? api.likeCard(cardId)
      : api.unlikeCard(cardId);

    likeRequest
      .then((updatedCard) => {
        // Like/Unlike Lag Fix - Step 6: Re-sync from server response so local UI matches backend truth.
        isLiked = getCardLikedState(updatedCard, currentUserId);
        cardLikeBtn.classList.toggle("card__like-btn_liked", isLiked);
      })
      .catch((error) => {
        // Like/Unlike Lag Fix - Step 7: If request fails, restore previous state to avoid false visual feedback.
        isLiked = previousLikedState;
        cardLikeBtn.classList.toggle("card__like-btn_liked", isLiked);
        console.error(error);
      })
      .finally(() => {
        // Like/Unlike Lag Fix - Step 8: Always unlock button after request settles.
        likeRequestInFlight = false;
        cardLikeBtn.disabled = false;
      });
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
    cardToDeleteId = cardId;
    cardToDeleteElement = cardElement;
    openModal(deleteModal);
  });
  //DELETE BUTTON (above) step 2 add event listener, then step 3 add handler to remove card from DOM. I used arrow function which acts as the event handler.

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  // previewModal.remove();
  closeModal(previewModal);
});
/*       Step 3 for previewModal = close Modal using another add event listener     */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey); // Add listener when modal opens
  //For the adding the class step, I created the modal_opened class in modal.css and added visibility: visible to make it pop up when edit profile is clicked and close when the modal closes (aka classList.add on this openModal function makes it appear and the classList.remove makes it close on the closeModal function below)
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey); // Remove listener when modal closes
}
/*     For the function part to add Modal (make edit profile pop-up work after you click "edit profile"), you just add the word "add". To remove it when you press the X button, all you'd do is change the word add to "remove" and keep the same class      */

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});
//GOOD TO KNOW (reusable code): Code above closes the modal when clicking on the overlay

function handleEscapeKey(event) {
  // First "if" below checks "if" the pressed key is the Escape key
  if (event.key === "Escape") {
    // Second, code below selects the modal that's currently open (if any)
    const openModal = document.querySelector(".modal_opened");
    // Third (code below). If modal is open, close it
    if (openModal) {
      closeModal(openModal);
    }
  }
}
//First step to make escape button close modal was to create this escape "keydown" function handleEscapeKey above. Then I had to create / add a "keydown" event listener and make an add AND remove event listener (aka handler) for the open and close modal functions right up above. So basically after creating the "keydown" event listener I ran handleEscapeKey as a parameter.

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  setButtonLoading(
    editFormElement.querySelector(".modal__submit-btn"),
    true,
    "Saving...",
    "Save",
  );

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      //Used data argument instead of the input values
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonLoading(
        editFormElement.querySelector(".modal__submit-btn"),
        false,
        "Saving...",
        "Save",
      );
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };

  setButtonLoading(cardSubmitBtn, true, "Saving...", "Save");

  api
    .addCard(inputValues)
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      closeModal(cardModal);
      evt.target.reset();
      disableButton(cardSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      setButtonLoading(cardSubmitBtn, false, "Saving...", "Save");
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  setButtonLoading(avatarSubmitBtn, true, "Saving...", "Save");

  api
    .updateAvatar({ avatar: avatarInput.value })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      setButtonLoading(avatarSubmitBtn, false, "Saving...", "Save");
    });
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  if (!cardToDeleteId || !cardToDeleteElement) {
    return;
  }

  setButtonLoading(deleteSubmitBtn, true, "Deleting...", "Delete");

  api
    .deleteCard(cardToDeleteId)
    .then(() => {
      cardToDeleteElement.remove();
      closeModal(deleteModal);
      cardToDeleteId = null;
      cardToDeleteElement = null;
    })
    .catch(console.error)
    .finally(() => {
      setButtonLoading(deleteSubmitBtn, false, "Deleting...", "Delete");
    });
}

profileAvatarBtn.addEventListener("click", () => {
  avatarInput.value = profileAvatar.src;
  resetValidation(avatarForm, [avatarInput], settings);
  openModal(avatarModal);
});

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  //The resetValidation code below, which I added in validation.jss and index.js, is OPTIONAL. It's to make the error reset after you close it with an error. That way once you open it, it won't show the error and it'll reset the error message.
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings,
  );
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

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeDeleteModal();
});

deleteCancelBtn.addEventListener("click", () => {
  closeDeleteModal();
});

function closeDeleteModal() {
  closeModal(deleteModal);
  cardToDeleteId = null;
  cardToDeleteElement = null;
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteForm.addEventListener("submit", handleDeleteCardSubmit);
/*     Add the following below profileEditButton just to see if "CLICKED" appears on the console in developer tools if it shows CLICKED and not null or something then it was done corrrect and there's no type or anything like that:      console.log("CLICKED");       */
/*     IMPORTANT: you dont put . on the modal_opened becasue its a classlist. You don't use . on classLists       */

// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]);
//   //added to DOM
//   cardsList.append(cardElement);
//   //added append above even though the project video said to use prepend because prepend will make the first card go last and the second follows right after it. With append, it puts the it leaves the order how it shows it in the design.
// }

//I commented the for method that I used above instead of removing it as a side note that I changed the changed it to the foreach method below which is more preferrable in code. Its the better alternative.
