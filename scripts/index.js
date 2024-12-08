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

const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
/*       The first part of the declarations above (profileEditButton annd editProfileButton) is a unique name I want give them. I added the hashtag on the second part because its a character that tells query selector that you're looking for an element with that id      */
/*       Add the following below the 2nd const just to see if "CLICKED" appears on the console in developer tools if it shows CLICKED and not null or something then it was done corrrect and there's no type or anything like that:      console.log(editProfileModal);       */
/*       The first cont has an id in the html because its the main container, but for the rest of the elements you need to select inside of the that container, instead of adding id after id you'd just select them from inside the element individually like I did with the editModalCloseButton const        */

function openModal() {
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

/*     For the function part to add Modal (make edit profile pop-up work after you click "edit profile"), you just add the word "add". To remove it when you press the X button, all you'd do is change the word add to "remove" and keep teh same classs      */

profileEditButton.addEventListener("click", openModal);

editModalCloseBtn.addEventListener("click", closeModal);
/*     Add the following below profileEditButton just to see if "CLICKED" appears on the console in developer tools if it shows CLICKED and not null or something then it was done corrrect and there's no type or anything like that:      console.log("CLICKED");       */
/*     IMPORTANT: you dont put . on the modal_opened becasue its a classlist. You don't use . on classLists       */
