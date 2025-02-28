document.addEventListener("DOMContentLoaded", loadEntries);

function addEntry() {
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    
    if (description === "" || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }
    
    let entry = { description, amount, type };
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    
    loadEntries();
    resetFields();
}

function loadEntries(filter = "all") {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let list = document.getElementById("entries-list");
    list.innerHTML = "";
    
    let totalIncome = 0, totalExpense = 0;
    
    entries.forEach((entry, index) => {
        if (filter === "all" || entry.type === filter) {
            let li = document.createElement("li");
            li.innerHTML = `${entry.description}: ₹${entry.amount} 
                <button onclick="editEntry(${index})">Edit</button>
                <button onclick="deleteEntry(${index})">Delete</button>`;
            list.appendChild(li);
        }
        if (entry.type === "income") {
            totalIncome += entry.amount;
        } else {
            totalExpense += entry.amount;
        }
    });
    
    document.getElementById("total-income").innerText = `₹${totalIncome}`;
    document.getElementById("total-expense").innerText = `₹${totalExpense}`;
    document.getElementById("balance").innerText = `₹${totalIncome - totalExpense}`;
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let entry = entries[index];
    
    document.getElementById("description").value = entry.description;
    document.getElementById("amount").value = entry.amount;
    document.getElementById("type").value = entry.type;
    
    deleteEntry(index);
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.splice(index, 1);
    localStorage.setItem("entries", JSON.stringify(entries));
    loadEntries();
}

function filterEntries(type) {
    loadEntries(type);
}

function resetFields() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "income";
}

function resetAll() {
    localStorage.removeItem("entries");
    loadEntries();
}