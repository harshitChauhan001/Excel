let fileData = {}

for(let i = 0; i < rows; ++i){
    for(let j = 0; j < cols; ++j){
        let rowId = i + 1;
        let colId = String.fromCharCode(j + 65);
        let key = `${colId}${rowId}`;
        fileData[key] = {
            content : "",
            fontFamily :"monospace",
            fontSize : 14,
            isBold : false,
            isItalic : false,
            isUnderline: false,
            textAlign: "left", 
            backgroundColor : "white", 
            fontColor : "black",
        }
    }

}


let fontFamilyButton = document.querySelector(".font-family-prop");
let fontSizeButton = document.querySelector(".font-size-prop")
let boldButton = document.querySelector(".material-icons.bold");
let alignmentButtons = document.querySelectorAll(".alignment");

let leftalignButton = document.querySelector(".material-icons.left.alignment");
let centeralignButton = document.querySelector(".center.material-icons.alignment");
let rightalignButton = document.querySelector(".right.material-icons.alignment");


let isitalicButton=document.querySelector(".material-icons.italic");
let underlineButton=document.querySelector(".material-icons.underline");
let fontColorButton=document.querySelector(".font-color-prop");

let BGcolorbutton=document.querySelector(".BGcolor-prop");

let formulaBar = document.querySelector(".formula-bar");



allCells.forEach((cell) => {
    cell.addEventListener("click", () => {
        let address = addressBar.value;
        let DATA = fileData[address];

        for(let key in DATA){
            // fontFamily :"monospace",
            // fontSize : 14,
            // isBold : false,
            // isItalic : false,
            // isUnderline: false,
            // textAlign: "left", 
            // backgroundColor : "white", 
            // fontColor : "black",
            if(key == "formula"){
                formulaBar.value = DATA[key];
            }
            else if(key == "isBold"){

                if(DATA[key] == true){
                    boldButton.style.backgroundColor = "green";
                }
                else{
                    boldButton.style.backgroundColor = "white";
                }

            }
            else if(key=="isItalic"){
                if(DATA[key]==true){
                    isitalicButton.style.backgroundColor = "green";
                }
                else{
                    isitalicButton.style.backgroundColor = "white";
                }

            }
            else if(key=="isUnderline"){
                if(DATA[key]==true){
                    underlineButton.style.backgroundColor = "green";
                }
                else{
                    underlineButton.style.backgroundColor = "white";
                }
            }
            else if(key=="textAlign"){
                if(DATA[key]=="left"){
                    leftalignButton.style.backgroundColor = "green";
                    centeralignButton.style.backgroundColor = "white";
                    rightalignButton.style.backgroundColor = "white";
                }
                else if(DATA[key]=="center"){
                    leftalignButton.style.backgroundColor = "white";
                    centeralignButton.style.backgroundColor = "green";
                    rightalignButton.style.backgroundColor = "white";
                }
                else if(DATA[key]=="right"){
                    leftalignButton.style.backgroundColor = "white";
                    centeralignButton.style.backgroundColor = "white";
                    rightalignButton.style.backgroundColor = "green";
                }
            }
            else if(key=="fontFamily"){
                let fontFamily=DATA[key];
                fontFamilyButton.value=fontFamily;
            }

        }

        // console.log(DATA);


    })  
})





function getRowIdColIdCell(address){
    let colId = address.charCodeAt(0) - 65;
    let rowId = Number(address.slice(1)) - 1;
    let cell = document.querySelector(`.cell[rid="${rowId}"][cid="${colId}"]`);
    return [rowId,colId,cell];
}


//db and ui change

fontFamilyButton.addEventListener("change" , (e) => {
    // 2 things to do
    //  fileData => save 
    let address = addressBar.value;
    fileData[address].fontFamily = e.target.value;
    //  change in UI
    let [rowId, colId , cell] = getRowIdColIdCell(address);

    cell.style.fontFamily = e.target.value;

    // 2 way binding
})


fontSizeButton.addEventListener("change", (e) => {
    // console.log(e.target.value);
    let address = addressBar.value;
    fileData[address].fontSize = e.target.value;
    //  change in UI
    let [rowId, colId , cell] = getRowIdColIdCell(address);

    cell.style.fontSize = `${e.target.value}px`;
})



boldButton.addEventListener("click" , (e) => {
    let address = addressBar.value;

    let isBold = fileData[address].isBold;
    let [rowId, colId , cell] = getRowIdColIdCell(address);

    if(isBold == false) {
        // db change
        fileData[address].isBold = true;
        // ui change
        cell.style.fontWeight = 'bold';
        boldButton.style.backgroundColor = "grey";
    }
    else{
        // db change/
        fileData[address].isBold = false;
        // ui change
        cell.style.fontWeight = 'normal';
        boldButton.style.backgroundColor = "white";
    }


})



isitalicButton.addEventListener("click",(e)=>{
    let address=addressBar.value;

    let isItalic=fileData[address].isItalic;
    let[rowId, colId, cell]= getRowIdColIdCell(address);
    if(isItalic==true){
        fileData[address].isItalic=false;
        cell.style.fontStyle = 'normal';
        isitalicButton.style.backgroundColor='white';
    }
    else{
        fileData[address].isItalic=true;
        cell.style.fontStyle = 'italic';
        isitalicButton.style.backgroundColor='grey';
    }

})


underlineButton.addEventListener("click",(e)=>{
    let address=addressBar.value;

    let isUnderline =fileData[address].isUnderline;
    let[rowId, colId, cell]= getRowIdColIdCell(address);
    // console.log(isUnderline);
    
    if(isUnderline){
        fileData[address].isUnderline=false;
        cell.style.textDecoration='none';
        underlineButton.style.backgroundColor='white';
    }
    else{
        fileData[address].isUnderline=true;
        cell.style.textDecoration='underline';
        underlineButton.style.backgroundColor='grey';
    }

})


fontColorButton.addEventListener("input",(e)=>{
    // console.log(e.target.value);
    let address=addressBar.value;
    let[rowId, colId, cell]= getRowIdColIdCell(address);

    //color selected
    let NewColor=e.target.value;
    //color change
   //db change
    fileData[address].fontColor=NewColor;
     //ui change
    cell.style.color=NewColor;
})


alignmentButtons.forEach((alignmentButton) => {

    alignmentButton.addEventListener("click", (e) => {
        let address = addressBar.value;
        let alignDirection = alignmentButton.getAttribute("data-align")
        // console.log(alignDirection);
        // console.log(alignmentButton.classList);


        let [rowId, colId , cell] = getRowIdColIdCell(address);
        
        
        // db
        fileData[address].textAlign = alignDirection;
        // ui change
        cell.style.textAlign = alignDirection;
        if(alignDirection=="left"){
            leftalignButton.style.backgroundColor = "green";
            centeralignButton.style.backgroundColor = "white";
            rightalignButton.style.backgroundColor = "white";
        }
        else if(alignDirection=="center"){
            leftalignButton.style.backgroundColor = "white";
            centeralignButton.style.backgroundColor = "green";
            rightalignButton.style.backgroundColor = "white";
        }
        else if(alignDirection=="right"){
            leftalignButton.style.backgroundColor = "white";
            centeralignButton.style.backgroundColor = "white";
            rightalignButton.style.backgroundColor = "green";
        }
    })

})

BGcolorbutton.addEventListener("input",(e)=>{
    let address=addressBar.value;
    let [rowId, colId, cell] = getRowIdColIdCell(address);

    let NewColor=e.target.value;
    fileData[address].backgroundColor=NewColor;
    cell.style.backgroundColor=NewColor;

})


