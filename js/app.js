const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const result = document.querySelector("#result");
const countListUi = document.querySelector('#countListUi')
const countDoneUi = document.querySelector('#countDoneUi')


//***** Functions

const countList = () => {
    let all = document.querySelectorAll('.list').length;
    countListUi.innerHTML = all;
    return all;
}

const countDone = () => {
    let totalDone = document.querySelectorAll('.form-check-input:checked').length;
    countDoneUi.innerHTML = totalDone;
    return totalDone;
}

const createList = (text) => {
    const div = document.createElement("div");
    div.classList.add("list");
    div.innerHTML = `<div class=" mb-3 d-flex justify-content-between align-items-center p-2">
        <div class=" form-check">
            <input type='checkbox' class=" form-check-input">
            <label for="" class=" form-check-label">${text}</label>
        </div>
        <div>
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
        if (window.confirm("Are you sure to delete?") == true) {
            div.remove();
            countList();
        }
    });

    const formCheckInput = div.querySelector('.form-check-input')
    formCheckInput.addEventListener('click',()=>{
        countDone();
        const label = div.querySelector('.form-check-label')

        label.classList.toggle('text-decoration-line-through')
    })


    const editBtn = div.querySelector('#editBtn');
    editBtn.addEventListener('click',()=>{
        const editInput = document.createElement('input');
        editInput.classList.add('form-control')
        editInput.value = text;


        const label = div.querySelector('.form-check-label')
        label.innerHTML = null;
        label.append(editInput)

        editInput.addEventListener('blur',()=>{
            label.innerHTML = editInput.value;
            text = editInput.value;
        })

    })
    
    // console.dir(div)

    return div
};




addBtn.addEventListener("click", () => {
    result.append(createList(input.value));
    input.value = null;
    countList();
});

input.addEventListener('keyup',(e) => {
    if(e.key == 'Enter'){
        result.append(createList(input.value));
        input.value = null;
        countList();
    }
})
