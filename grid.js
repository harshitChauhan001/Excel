let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");



for (let i = 0;i < rows;i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for (let i = 0;i < cols;i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

for (let i = 0;i < rows;i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for (let j = 0;j < cols;j++) {


        let cell = document.createElement("div");


        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");

        // Attributes for cell and storage identification

        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowCont.appendChild(cell);
    }
    cellsCont.appendChild(rowCont);
}

let allCells = document.querySelectorAll(".cell");




allCells.forEach((cell) =>{
    cell.addEventListener("click", () => {
        let rowId = Number(cell.getAttribute("rid")) + 1;
        let colId = String.fromCharCode(Number(cell.getAttribute("cid"))+65);
        // console.log(rowId, colId);
        addressBar.value = `${colId}${rowId}`


    })
})



