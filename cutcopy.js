let copyButton=document.querySelector(".copy");
let cutButton=document.querySelector(".cut");
let pasteButton=document.querySelector(".paste");

let data = "";

copyButton.addEventListener("click", ()=>{
    let address=addressBar.value;
    let [rowId, colId , cell] = getRowIdColIdCell(address);
    let data=cell.innerText;
    console.log(data);
})
cutButton.addEventListener("click", ()=>{
    let address=addressBar.value;
    let [rowId, colId , cell] = getRowIdColIdCell(address);
    let data=cell.innerText;
})
pasteButton.addEventListener("click", ()=>{
    console.log(data);
    let address=addressBar.value;
    let [rowId, colId , cell] = getRowIdColIdCell(address);
    cell.innerText=data;
    fileData[address].content=data;
})
