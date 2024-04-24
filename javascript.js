
const rechargeNetwork = {
    MTN: '*123*',
    GLO: '*124*',
    AIRTEL: '*125*',
    Etisalat: '*126*'
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

const generatePin = () => {
    let min = 100000000000;
    let max = 999999999999;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}

const generatedAmount = () => {
    let execute = false;
    if (!execute) {
        let inputValue = document.getElementById('inputValue').value;
        let inputAmount = parseInt(inputValue);
        if (!isNaN(inputAmount) && inputAmount % 100 === 0 && inputValue !== "") {
            let result = generatePin();
            amountDisplay.value = result;
            execute = true;
        } else {
            return;
        }
    }
}

let onStatus = 'used';
let  rechargeTable = [];
const oldTable = JSON.parse(localStorage.getItem("rechargeCardTable"));

if(oldTable){
    rechargeTable = oldTable;
}


const displayTable = () => {
         let tableHTML = '<tr><th>S/N</th><th>NETWORK PROVIDER</th><th>DATE PRINTED</th><th>AMOUNT</th><th>PIN</th><th>PRINTREF</th><th>STATUS</th><th>DELETE</th></tr>';
        rechargeTable.forEach((row, index)=> {
            tableHTML += `<tr><td>${index + 1}</td><td>${row.network}</td><td>${row.currentDate}</td><td>${row. amount}</td><td>${row.pin}</td><td id='pinNumber${index}'>${row.printRef}</td><td><span id='changeStatus${index}'>${row.cardStatus}</span></td><td><button onclick='deleteTable(${index})'>Delete</button></td></tr>`;
        });
        document.getElementById('rechargeTable').innerHTML = `<table>${tableHTML}</table>`;
    }
  inputValue.value = '';
  amountDisplay.value = '';


const clearGeneratedAmount = () => {
    if(amountDisplay.value !== ''){
        let networkProvider = SelectOption.value;
        let amount = inputValue.value;
        let pin = rechargeNetwork[SelectOption.value];
        let printRef = rechargeNetwork[SelectOption.value] + amountDisplay.value + '#';
        let currentDate = getCurrentDate()
        rechargeTable.push({ network: networkProvider,  currentDate: currentDate, amount: amount, pin : pin, printRef:printRef , cardStatus:"unused"})         
    };
    localStorage.setItem("rechargeCardTable", JSON.stringify(rechargeTable));
    displayTable()
}

const getTableValues = () => {
    if(amountDisplay.value !== ''){
    let networkProvider = SelectOption.value;
    let amount = inputValue.value;
    let pin = rechargeNetwork[SelectOption.value];
    let printRef = rechargeNetwork[SelectOption.value] + amountDisplay.value + '#';
    let currentDate = getCurrentDate()
    table.push({ network: networkProvider,  currentDate: currentDate, amount: amount, pin : pin, printRef:printRef , cardStatus:"unused"})
    console.log(table)
    table.forEach(entry => {
        console.log(entry.cardStatus);
    });           
}
}

const rechargeCard = () => {
    let rechargePin = document.getElementById('rechargePin').value
    rechargeTable.forEach((entry,index) => {
        if(entry.printRef == rechargePin && entry.cardStatus === "unused"){
            alert(`Account Recharge of N${entry.amount} on your ${entry.network} was successful`)
            entry.cardStatus = onStatus
            document.getElementById(`changeStatus${index}`).innerHTML = onStatus
        }
    });
    localStorage.setItem("rechargeCardTable", JSON.stringify( rechargeTable));
    displayTable();
}

const deleteTable = (index) =>{
    const newTable = rechargeTable.filter((list, i)=> index != i);
    localStorage.setItem("rechargeCardTable", JSON.stringify(newTable));
    rechargeTable = newTable
    displayTable()
}
displayTable()





