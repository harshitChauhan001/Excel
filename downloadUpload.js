let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

// Download Task

// 1) JSON => stringify
// 2) Blob => data to binary
// 3) New anchor Element => href => Bolb data url
// 4) new anchor element click


downloadBtn.addEventListener("click", (e) => {

    // file creating
    let jsonData = JSON.stringify(fileData);
    let file = new Blob([jsonData], { type: "text/json" });

    // download 
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "file.json";

    a.click();


})



// // // Open task (upload)
openBtn.addEventListener("click", (e) => {


    // Opens file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // input
    // change

    input.addEventListener("change", (e) => {


        let fr = new FileReader();

        // input.files => will return a array of files

        let files = input.files;

        // input.files[0] => file upload

        let fileObj = files[0];


        
        fr.readAsText(fileObj);


        fr.addEventListener("load", (e) => {
            
            let readSheetData = JSON.parse(fr.result);

            for(let key in readSheetData){
                fileData[key] = readSheetData[key];
            }







            for(let i = 0; i < 100 ; ++i){
                for(let j = 0; j < 26; ++j) {



                    let rid = i + 1;
                    let cid = String.fromCharCode(j + 65);

                    let address = `${cid}${rid}`

                    // console.log

                    let DATA = fileData[address];
                    let [rowId, colId, cell] = getRowIdColIdCell(address);

                    for(let key in DATA){

                        if(key == "content"){
                            cell.innerText = DATA[key];
                        }
                        
                        else if(key == "isBold"){
                            if(DATA[key] == true){
                                cell.style.fontWeight = "bold"
                            }
                            else{
                                cell.style.fontWeight = "normal";
                            }
                        }

                        else if(key == "isItalic"){
                            if(DATA[key] == true){
                                cell.style.fontStyle = "italic";
                            }
                            else{
                                cell.style.fontStyle = "normal";
                            }
                        }

                        else if(key == "isUnderline"){

                            if(DATA[key] == true){
                                cell.style.textDecoration = "underline";
                            }
                            else{
                                cell.style.textDecoration = "none";
                            }

                        }
                        else if(key == "textAlign"){

                            let direction = DATA[key];
                            cell.style.textAlign = direction;
                        }
                        else if(key == "fontFamily"){
                            let fontFamily = DATA[key];
                            cell.style.fontFamily = fontFamily
                        }
                        else if(key == "fontSize"){
                            let fontsize = DATA[key]
                            cell.style.fontSize= fontsize      
                        }

                        

                        else if(key == "fontColor"){
                            cell.style.color = DATA[key];
                        }  

                        else if(key == "backgroundColor"){
                            cell.style.backgroundColor = DATA[key];
                        }

                        
                    }
                
                
                }
            }



            firstCell.click();



        })
    })
})