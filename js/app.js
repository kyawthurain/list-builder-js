const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const doneAll = document.querySelector("#doneAll");
const result = document.querySelector("#result");
const countListUi = document.querySelector("#countListUi");
const countDoneUi = document.querySelector("#countDoneUi");

//***** Functions


const randomId = function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const countList = () => {
  let all = document.querySelectorAll(".list").length;
  countListUi.innerHTML = all;
  return all;
};

const countDone = () => {
  let totalDone = document.querySelectorAll(".form-check-input:checked").length;
  countDoneUi.innerHTML = totalDone;
  return totalDone;
};

const createList = (text) => {
    let dyId = randomId(5)
  const div = document.createElement("div");
  div.classList.add("list");
  div.innerHTML = `<div class=" border rounded mb-3 d-flex justify-content-between align-items-center p-2 animate__animated animate__lightSpeedInRight">
        <div class=" form-check">
            <input id="${dyId}" type='checkbox' class=" form-check-input">
            <label for="${dyId}" class=" form-check-label">${text}</label>
        </div>
        <div id='controls'>
            <button id='editBtn' class=" btn btn-primary">
                <i class=" bi bi-pencil-fill"></i>
            </button>
            <button id='delBtn' class=" btn btn-primary">
                <i class=" bi bi-trash3-fill"></i>
            </button>
        </div>
    </div>`;

  const delBtn = div.querySelector("#delBtn");
  delBtn.addEventListener("click", () => {
    // if (window.confirm("Are you sure to delete?") == true) {

    // }
    div.children[0].classList.replace(
      "animate__lightSpeedInRight",
      "animate__lightSpeedOutRight"
    );

    div.children[0].addEventListener("animationend", () => {
      div.remove();
      countList();
      countDone();
    });
  });

  const formCheckInput = div.querySelector(".form-check-input");
  formCheckInput.addEventListener("click", () => {
    countDone();
    const label = div.querySelector(".form-check-label");

    label.classList.toggle("text-decoration-line-through");

    div.querySelector("#editBtn").classList.toggle("disabled");
  });

// *************************************************************************************** Edit Btn
  const editBtn = div.querySelector("#editBtn");
  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.classList.add("form-control");
    editInput.value = text;

    const label = div.querySelector(".form-check-label");
    label.innerHTML = null;
    label.append(editInput);
    editInput.focus();

    editInput.addEventListener("blur", () => {
      label.innerHTML = editInput.value;
      text = editInput.value;
    });
  });

  // console.dir(div)

  return div;
};

// *************************************************************************************** Done All Btn


doneAll.addEventListener("click", () => {
  document.querySelectorAll(".list").forEach((list) => {
    list.querySelector(".form-check-input").click();
  });
});

// *************************************************************************************** Add to list Btn


addBtn.addEventListener("click", () => {
  result.append(createList(input.value));
  input.value = null;
  countList();
  countDone();
});

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    result.append(createList(input.value));
    input.value = null;
    countList();
    countDone();
  }
});
