allCells.forEach((cell) => {
    cell.addEventListener("blur", (e) => {
        let address = addressBar.value;
        let [rowId, colId, cell] = getRowIdColIdCell(address);
        let DATA = fileData[address];
        DATA.content = cell.innerText
        // console.log(fileData);

        // propgate 
        // DFS propagation required

        
        // for(let i= 0; i< 100; ++i){
        //     for(let j = 0; j < 26; ++j){
        //         let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        //         let rowId = i+1;
        //         let colId = String.fromCharCode(Number(j+65));
        //         let address = `${colId}${rowId}`;
        //         let DATA = fileData[address];
        //         // console.log(DATA);
        //         if(DATA.formula == ""){
        //             continue;
        //         }
        //         else{
        //             let formula = DATA.formula;
        //             // let [rowId, colId, cell] = getRowIdColIdCell(address);
        //             // let DATA = fileData[address];
        //             // DATA.formula = formula;
        //             // evalute formula
        //             let evaluatedValue = evalute(formula);
        //             if(evaluatedValue ==  undefined){
        //                 return;
        //             }
        //             // console.log(evaluatedValue);
        //             //  DB change
        //             DATA.content = evaluatedValue;
        //             //  ui change
        //             cell.innerText = evaluatedValue;
        //         }
        //     }
        // }
    })
})

allCells.forEach((cell) => {

    cell.addEventListener("focus", (e) => {


        let address = addressBar.value;
        // console.log(address);

        let formula = formulaBar.value;
        // let address = addressBar.value;
        let [rowId, colId, cell] = getRowIdColIdCell(address);
    
        let DATA = fileData[address];
        DATA.formula = formula;


        // evalute formula
        let evaluatedValue = evalute(formula);

        if(evaluatedValue ==  undefined){
            return;
        }

        // console.log(evaluatedValue);
        //  DB change
        DATA.content = evaluatedValue;
        //  ui change
        cell.innerText = evaluatedValue;
        


    })

})



formulaBar.addEventListener("keydown", (e) => {

    if(e.keyCode != 13){
        // console.log("enter cliced")
        return ;
    }

    // db save 
    let formula = formulaBar.value;
    let address = addressBar.value;
    let [rowId, colId, cell] = getRowIdColIdCell(address);

    let DATA = fileData[address];
    DATA.formula = formula;
    // evalute formual
    let evaluatedValue = evalute(formula);
    console.log(evaluatedValue);
    //  DB change
    DATA.content = evaluatedValue;
    //  ui change   
    cell.innerText = evaluatedValue;
})



let evalute = (formula) => {


    let formulaArray = formula.split(" ");
    for(let i = 0; i < formulaArray.length; ++i){
        if(formulaArray[i][0] >= 'A' && formulaArray[i][0] <= 'Z'){
            let valueToReplace = fileData[formulaArray[i]].content;
            formulaArray[i] = valueToReplace;
        }
    }

    let formulaString = formulaArray.join(" ");

    return eval(formulaString);


    // console.log(formulaArray);


}