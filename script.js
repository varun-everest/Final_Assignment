var shoppingItemsList = [];
const itemBox = document.querySelector("#text-box");
const listOfItems = document.querySelector("#item-list");
const itemsCount = document.querySelector("#itemsCount");
const hideMarked = document.querySelector("#hideMarked");

var uniqueItems = new Set();

var isHide = false;

function shoppingItem(name) {
    this.description = name;
    this.done = false;
    this.deleted = false;

    this.getName = function() {
        return this.description;
    }

    this.setDonestatus = function() {
        this.done = !this.done;
    }

    this.setDeleted = function() {
        this.deleted = true;
    }

    this.getDeleteStatus = function() {
        return this.deleted;
    }

    this.getDoneStatus = function() {
        return this.done;
    }

}

function renderList() {
    listOfItems.textContent =  " ";
    let markedCount = 0;
    let unmarkedCount = 0;

    shoppingItemsList.forEach((item,index) => {
        
        if(!item.getDeleteStatus()){

            const li = document.createElement("li");
            const deletButton = document.createElement("span");
            const shopItem = document.createElement("span");
            shopItem.textContent = item.getName();
            shopItem.classList.add("shop-item");
            deletButton.textContent = "X";
            deletButton.classList.add("dlt-button");

            li.classList.add("list-item");

            li.addEventListener("click", function() {
                toggleCompleted(index);
            });

            if (item.getDoneStatus() ) {
                li.classList.add("done");
                shopItem.classList.remove("shop-item");
                shopItem.classList.add("shop-item-selected");
                markedCount++;
            } 
            else {
                unmarkedCount++;
            }

           

            deletButton.addEventListener("click" , function(event) {
                event.stopPropagation();
                deleteItem(index);
            });


            li.appendChild(shopItem);
            li.appendChild(deletButton);

            if(!isHide){
                listOfItems.appendChild(li);
            }
            else {
                if(!item.getDoneStatus()) {
                    listOfItems.appendChild(li);
                }
            }
        }
    });
    itemsCount.textContent = `Total Items : ${markedCount + unmarkedCount} || Marked Items : ${markedCount} || Unmarked Items : ${unmarkedCount}`;
}


function addItem() {
    let val = itemBox.value.trim();
    console.log(val);
    if(val !== '') {

        if(!uniqueItems.has(val.toLowerCase())) {
            uniqueItems.add(val.toLowerCase());
            shoppingItemsList.push(new shoppingItem(val));
            renderList();
            itemBox.value = "";
        }
        else {
            alert(val + " is alredy exists in yout lists");
        }
    }
    else {
        alert("Please enter an item !!!");
    }
    console.log(shoppingItemsList);
}

function toggleCompleted(index) {
    shoppingItemsList[index].setDonestatus();
    renderList();
}

function deleteItem(index) {
    shoppingItemsList[index].setDeleted();
    renderList();
}

itemBox.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        addItem();
        return ;
    }
});

hideMarked.addEventListener("change", function() {
    isHide = !isHide;
    renderList();
});