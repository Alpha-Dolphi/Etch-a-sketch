    
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

    // Setting up an initial color and canvas scale
    let brushColor = "black";
    rainbow = false;
    var first = 0;
    if(first === 0) {
        first++;
        filling(16);
    }

    function filling(value) {        
        canvas.textContent = ''; // Emptying the canvas     
        let fragment = new DocumentFragment(); 
        for (var i = 0; i<value*value; i++) { // Filling the fragment with div elements
            var div = document.createElement('div');
            div.classList.add("cell");  
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
                }  
                else {                    
                    cell.style.backgroundColor = brushColor;    
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
                    }  
                    else {
                        cell.style.backgroundColor = brushColor;    
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
        filling(range.value);
    })
    
    eraser.addEventListener("click", () => {
        rainbow = false;
        brushColor = "white";
    })

    rainbowMode.addEventListener("click", () => {
        rainbow = true;
    })

    colorMode.addEventListener("click", () => {
        rainbow = false;
        brushColor = colorInput.value;
    })

    background.addEventListener("click", () => {
        
    })

    // dynamically showing the scale of the canvas
    function showScale(value) {
        scale.textContent = `${value}x${value}`;  
    }

    