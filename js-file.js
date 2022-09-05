    
    // Getting all the necessary selectors
    const range = document.querySelector('#range-input');
    const colorInput = document.querySelector('#col')
    const canvas = document.querySelector('#canvas');
    const scale = document.querySelector('#scale');
    const buttons = document.querySelectorAll('.button');
    const clear = document.querySelector('#clear');
    const eraser = document.querySelector('#eraser');
    const colorMode = document.querySelector('#color-mode');
    const rainbowMode = document.querySelector('#rainbow-mode');
    const back = document.querySelector('#back');
    const frame = document.querySelector('#frame');

    document.querySelector('#back').value = "#FFFFFF";

    // Setting up an initial color and canvas scale
    let brushColor = "black", rainbow = false, erase = false, first = 0, prevBackColor = `rgb(${hexToRgb('#FFFFFF').r}, ${hexToRgb('#FFFFFF').g}, ${hexToRgb("#FFFFFF").b})`;;
    if(first === 0) {
        first++;
        filling(16, "#FFFFFF");
    }

    function filling(value, backColor) {        
        canvas.textContent = ''; // Emptying the canvas     
        let fragment = new DocumentFragment(); 
        for (var i = 0; i<value*value; i++) { // Filling the fragment with div elements
            var div = document.createElement('div');
            div.classList.add("cell");  
            div.style.value = "clean";
            div.style.backgroundColor = backColor;
            // alert(document.querySelector('.cell').style.backgroundColor);
            var width = height = (450/value);     
            div.style.width = `${width}px`;
            div.style.height = `${height}px`;
            fragment.appendChild(div);
        }
        canvas.appendChild(fragment); // Adding the fragment to the canvas
        painting();
    }

    function painting() {
        // accounting for different scenarios based on mouse input
        var mouseIsDown = false;
        const cells = document.querySelectorAll('.cell');   
        cells.forEach((cell) => {            
            cell.addEventListener('mouseup', (event) => {                         
                mouseIsDown = false;            
            });                            
            cell.addEventListener('mousedown', (event) => {      
                clearSelection(); // function for clearing selected items without which painting over previously selected items is impossible   
                mouseIsDown = true;               
                if (rainbow === true) {
                    // generating a random color
                    cell.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16); 
                    cell.style.value = "painted";
                }
                else if (erase === true) {
                    cell.style.backgroundColor = document.querySelector('#back').value;
                    cell.style.value = "clear";
                }  
                else {                    
                    cell.style.backgroundColor = brushColor;    
                    cell.style.value = "painted";
                }     
            });            
            // checking what happens to a mouse outside of the canvas
            canvas.addEventListener('mouseleave', (event) => {
                document.onmouseup = () => {                
                    mouseIsDown = false;
                };
            });   
            cell.addEventListener('mouseover', (event) => {                         
                if (mouseIsDown === true) {
                    if (rainbow === true) {
                        // generating a random color
                        cell.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
                        cell.style.value = "painted";
                    }  
                    else if (erase === true) {
                        cell.style.backgroundColor = document.querySelector('#back').value;
                        cell.style.value = "clean";
                    }
                    else {
                        cell.style.backgroundColor = brushColor;    
                        cell.style.value = "painted";
                    }                                       
                }                                              
            });                                     
        });
    }

    // function for clearing selected items without which painting over previously selected items is impossible   
    function clearSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        else if (document.selection) {
            document.selection.empty();
        }
    }

    // changing the color of selected items
    buttons.forEach((button) => {     
        button.addEventListener('click', (event) => { 
            resetColor(); // clearing previously selected button                         
            button.style.backgroundColor = "#333";            
            button.style.color = "white";            
        });                            
    });

    // function for clearing previously selected button
    function resetColor() {
        buttons.forEach((button) => {
            button.style.backgroundColor = "white";            
            button.style.color = "#333";  
        });
    }

    colorInput.addEventListener("input", () => {
        if (brushColor != "white" && rainbow === false) {
            brushColor = colorInput.value;
        }
    })

    clear.addEventListener("click", () => {
        filling(range.value, document.querySelector('#back').value);
    })
    
    eraser.addEventListener("click", () => {
        erase = true;
        rainbow = false;
    })

    rainbowMode.addEventListener("click", () => {
        erase = false;
        rainbow = true;
    })

    colorMode.addEventListener("click", () => {
        erase = false;
        rainbow = false;
        brushColor = colorInput.value;
    })

    function changeBackground(back) {
        let scale = document.querySelector('#range-input').value;
        const cells = document.querySelectorAll('.cell');   
        cells.forEach((cell) => {
            if (cell.style.backgroundColor == prevBackColor && cell.style.value == "clean") {
                // console.log("cell.style.backgroundColor = "+ cell.style.backgroundColor);
                // console.log("prevBackColor = " + prevBackColor);
                cell.style.backgroundColor = back;
            }
        });      
        // alert(back);
        prevBackColor = `rgb(${hexToRgb(back).r}, ${hexToRgb(back).g}, ${hexToRgb(back).b})`;
        // alert(prevBackColor);
        // painting();
        // filling(scale, back);
    }

    frame.addEventListener("click", () => {
        back.click();
    })

    // dynamically showing the scale of the canvas
    function showScale(value) {
        scale.textContent = `${value}x${value}`;  
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
      function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

      function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }


    