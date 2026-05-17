const currentUser =
    localStorage.getItem("loggedInUser");

const storageKey =
    `expenses_${currentUser}`;

const limitKey =
    `limit_${currentUser}`;


let expenses =
    JSON.parse(localStorage.getItem(storageKey)) || [];

let total = 0;


const totalExpense =
    document.getElementById("totalExpense");

const expenseList =
    document.getElementById("expenseList");

const warningMessage =
    document.getElementById("warningMessage");



function addExpense(){

    const amount =
        document.getElementById("amount").value;

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;

    const description =
        document.getElementById("description").value;



    if(amount === "" || category === ""){

        alert("Please fill required fields");

        return;

    }



    const expense = {

        amount,
        category,
        date,
        description

    };



    expenses.push(expense);



    localStorage.setItem(

        storageKey,
        JSON.stringify(expenses)

    );



    loadExpenses();



    document.getElementById("amount").value = "";

    document.getElementById("category").value = "";

    document.getElementById("date").value = "";

    document.getElementById("description").value = "";

}



function loadExpenses(){

    expenseList.innerHTML = "";

    total = 0;



    expenses.forEach((expense, index) => {

        total += Number(expense.amount);



        const li =
            document.createElement("li");



        li.innerHTML = `

            <div>

                <strong>${expense.category}</strong><br>

                <small>${expense.description}</small><br>

                <small class="expense-date">
                    ${expense.date}
                </small>

            </div>



            <div class="expense-right">

                <span>₹${expense.amount}</span>



                <button onclick="deleteExpense(${index})">

                    Delete

                </button>

            </div>

        `;



        expenseList.appendChild(li);

    });



    totalExpense.innerText = "₹" + total;



    const limit =
        localStorage.getItem(limitKey);



    if(limit !== null &&
        total > Number(limit)){

        warningMessage.innerText =
            "⚠ Budget Limit Exceeded!";

    }else{

        warningMessage.innerText = "";

    }

}



function deleteExpense(index){

    expenses.splice(index, 1);



    localStorage.setItem(

        storageKey,
        JSON.stringify(expenses)

    );



    loadExpenses();

}



function scrollToExpense(){

    document
        .getElementById("expenseSection")
        .scrollIntoView({

            behavior:"smooth"

        });

}



loadExpenses();