const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    // currency: 'USD',
    // maximumSignificantDigits: 0
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //   maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


let button = document.getElementById("#btnAddCol");
// button.addEventListener("click", addColumn('#employeeList'));

function addCol () {
    const myform = $('employeeList'); 
    let iter = 0;
    $('#btnAddCol').click(function () {
        myform.find('tr').each(function(){
            var trow = $(this);
            if(trow.index() === 0){
                trow.append('<td>Month '+iter+'</td>');
            }else{
                trow.append('<td><input type="checkbox" name="cb '+iter+'"/></td>');
            }
            
        });
        iter += 1;
    });
    console.log('Clicked Button!');
};


// create DIV element and append to the table cell
function createCell(cell, text, style) {
    let div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    cell.appendChild(div);                   // append DIV to the table cell
}

// append column to the HTML table
function appendCol() {
    let tbl = document.getElementById('employeeList'), // table reference
        i, tc;
    let totalComp = tbl.getElementsByClassName('totalComp');
    // open loop for each row and append cell
    for (i = 0; i < tbl.rows.length+1; i++) {
        if( i === 0){
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length),`Month ${i}`, 'th');
            let e = document.getElementsByTaName('th')[0];

            let d = document.createElement('th');
            d.innerHTML = e.innerHTML;

            e.parentNode.replaceChild(d, e);
        } else {
            // parse float from total comp column. creates value for month
            tc = parseFloat(totalComp[i].innerText.split(",").join(""));
            
            createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), tc/12, 'td');
        }
        
    }
}

// 2006-08-21 - Created
// 2006-11-05 - Modified - head and body
function addColumn(tblId)
{
    let tbl = document.getElementById('employeeList')
    let totalComp = tbl.getElementsByClassName('totalComp'),
    tc;
    
    let tblHeadObj = document.getElementById(tblId).tHead;
    // Add table header
    for (let h=0; h<tblHeadObj.rows.length; h++) {
		let newTH = document.createElement('th');
		tblHeadObj.rows[h].appendChild(newTH);
		newTH.innerHTML = `Month ${(tblHeadObj.rows[h].cells.length - 6)}`
	}

    // parse float from total comp column. creates value for month

    // Add table body
	let tblBodyObj = document.getElementById(tblId).tBodies[0];
    for (let i=0; i<tblBodyObj.rows.length-1; i++) {
        tc = parseFloat(totalComp[i].innerText.split(",").join(""));
		let newCell = tblBodyObj.rows[i].insertCell(-1);
        // newCell.innerHTML = '[td] row:' + i + ', cell: ' + (tblBodyObj.rows[i].cells.length - 1)
        // newCell.outerHTML = '<td>{{addCommas '+Math.round(tc/12)+' }}</td>';
        newCell.outerHTML =`<td class="month${(tblHeadObj.rows[0].cells.length - 6)}"` +'>' + formatter.format( Math.round(tc/12) ) +'</td>';
    }
    // createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), tc/12, 'td');
    console.log('Clicked Button!');
}
function deleteColumn(tblId)
{
	var allRows = document.getElementById(tblId).rows;
	for (var i=0; i<allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
}

// tblHeadObj=document.getElementById('employeeList').tHead
// tblHeadObj.rows[0].cells

month1 = document.getElementsByClassName('month1');

let values = [];
let numbers = 0;
for(i=0;i < month1.length;i++){
	values.push(month1[i].innerText.split(",").join(""))
};
// values[0] = parseInt(values[0])
for(i=0; i < month1.length; i++){
    numbers += parseFloat(values[i]);
};


function calculateCol(numString){
    // Set variable to equal employee list
    let monthCol = 'month'+numString;
    let tbl = document.getElementById('employeeList');
    // let monthTotalArray = document.getElementsByClassName('month1');
    let monthTotalArray = document.getElementsByClassName(monthCol);
    // Variable for to total column sum
    monthTotal = 0; 
    
    // Iterate through coloumn td's
    for(i = 0; i < monthTotalArray.length; i++){
        
        // values.push(monthTotalArray[i].innerText.split(",").join(""))
        monthTotal += parseFloat(monthTotalArray[i].innerText.split(",").join(""));
    };
    
    // Create new cell at end of total row
    newCell = tbl.rows[tbl.rows.length - 1].insertCell(tbl.rows[tbl.rows.length - 1].cells.length);
    newText = document.createTextNode(monthTotal);
    newCell.appendChild(newText);

    // for(i=0; i < month1.length; i++){
    //     numbers += parseFloat(values[i]);
    // };

}
// console.log(values);

function calcAllCols() {
    let iters = document.getElementsByClassName('month1');
    for (let i = 1; i < iters + 1; i++){
        calculateCol();
        console.log('round '+ i);
    }

};
// formatter.format(2500); /* $2,500.00 */