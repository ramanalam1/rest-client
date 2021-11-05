/**
 * 
 */

var spaces = 0
var testcase = 0
var payloadField = null
function validateJson() {
	var field = document.getElementById("payload");
	this.payloadField = field
	alert(field.value);
	try {

		var obj = JSON.parse(field.value);
		field.value = JSON.stringify(obj, null, 2);
		this.payObj = obj
		return true;

	} catch (e) {
		if (field.value.match("“|”")) {
			alert("problem with smart quotes")
		} else {
			alert(e);
		}

	}
	return false
}

function load() {

	spaces = 5
	if (validateJson()) {
		clearForm();
		var field = document.getElementById("payload");
		// alert("after validate");
		var payloadObj = JSON.parse(field.value);
		var container = document.getElementById("my-form");
		var formContainer;
		if (Array.isArray(payloadObj)) {
			formContainer = processArray(payloadObj, null)
			// container.appendChild(processArray(payloadObj,null))
		} else if (typeof (payloadObj) === 'object') {
			// addButton(container,"collapse")
			formContainer = processObject(payloadObj, null)
			// container.appendChild(processObject(payloadObj,null))
		}

		container.appendChild(addTreeView(formContainer, ""))
		addEventListenerToggle()
		
		// add event listener to add toggle
		// container.appendChild(formContainer)
		// container.addEventListener("click", , false);
		// addOutput();
	}
}

function processArray(obj, container) {

	if (container === null) {

		container = document.createElement("div")
		
		container.setAttribute('name', "root");
		container.setAttribute('id', "root");
		

	}
	for (index in obj) {
		value = obj[index];
		if (value === null || typeof (value) === 'string' || typeof (value) === "number"
				|| typeof (value) === "boolean") {
			
			addInputWithoutLabel(container,index,value,typeof(value))
			
		} else if (Array.isArray(value)) {
			
			var innercon = document.createElement("div")
			innercon.setAttribute('name', index);
			innercon.setAttribute('id', index);
			// innercon.style.display = "flex";
			// innercon.style.paddingLeft = spaces + "px";
			container
					.appendChild(addTreeView(processArray(value, innercon), ""));
			// innercon.appendChild(document.createElement("br"));
			// spaces = spaces - 5;
		} else if (typeof (value) === 'object') {
			// spaces = spaces + 5;
			var innercon = document.createElement("div")
			innercon.setAttribute('name', index);
			innercon.setAttribute('id', index);
			// innercon.style.display = "flex";
			// innercon.style.paddingLeft = spaces + "px";
			container.appendChild(addTreeView(processObject(value, innercon),
					""));
			// innercon.appendChild(document.createElement("br"));
			// spaces = spaces - 5;
		}

	}
	return container;
}

function processObject(obj, container) {

	if (container === null) {
		container = document.createElement("div")
		container.setAttribute('name', "root");
		container.setAttribute('id', "root");
		// container.style.display = "flex";
	}

	for ( var key in obj) {
		value = obj[key]
		if (value === null || typeof (value) === 'string' || typeof (value) === "number"
				|| typeof (value) === "boolean") {
			addInput(container, key, value,typeof(value))
		} else if (Array.isArray(value)) {
			// spaces = spaces + 5;
			var innercon = document.createElement("div")
			innercon.setAttribute('name', key);
			innercon.setAttribute('id', key);
			innercon.style.paddingLeft = spaces + "px";
			// innercon.style.display = "flex";
			// addLabel(innercon, key);
			// innercon.appendChild(document.createElement("br"));
			container.appendChild(addTreeView(processArray(value, innercon),
					key));
			// innercon.appendChild(document.createElement("br"));
			// spaces = spaces - 5;
		} else if (typeof (value) === 'object') {
			// spaces = spaces + 5;
			var innercon = document.createElement("div")
			innercon.setAttribute('name', key);
			innercon.setAttribute('id', key);
			// innercon.style.display = "flex";
			// innercon.style.paddingLeft = spaces + "px";
			// addLabel(innercon, key);
			// innercon.appendChild(document.createElement("br"));
			container.appendChild(addTreeView(processObject(value, innercon),
					key));
			// spaces = spaces - 5;
		}
	}
	return container;
}

function addInputWithoutLabel(container, key, value,type) {

	var label = createLabel(key);
	label.innerHTML = ""
	label.appendChild(createInputBox(key, value, type))
	container.appendChild(label)
	var span = document.createElement("span")
	span.innerHTML = "[ ]"
	label.appendChild(span)


}

function addInput(container, key, value,type) {

	// container = document.getElementById("my-form");
	// Create an <input> element, set its type and name attributes
	// addLabel(container,key)
	var label = createLabel(key);
	
	label.appendChild(createInputBox(key, value, type))
	container.appendChild(label)

	var span = document.createElement("span")
	span.innerHTML = "[ ]"
	label.appendChild(span)



}

function createLabel(key) {
	// alert("before add Label")

	var label = document.createElement("label")
	label.contentEditable = "true";
	label.id = "label_" + key;
	label.innerHTML = key
	return label

}

function createInputBox(key, value, inputType) {
	// alert("before add inputbox")
	var input = document.createElement("input");
	input.type = inputType;
	input.value = value;
	if(value === null){
		input.value = "null"
	}
	input.setAttribute('name', key);
	input.setAttribute('id', key);
	return input

}

/*
 * function addLabel(container, key) { // alert("before add Label")
 * 
 * var label = document.createElement("label") label.contentEditable = "true";
 * label.id = "label_" + key; label.innerHTML = key container.appendChild(label)
 *  }
 */

/*
 * function addInputBox(container, key, value, inputType) { // alert("before add
 * inputbox") var input = document.createElement("input"); input.type =
 * inputType; input.value = value; input.setAttribute('name', key);
 * input.setAttribute('id', key); container.appendChild(input);
 *  }
 */

function addOutput(strPayload) {

	testcase = testcase + 1
	
	var div = document.createElement("div");
	div.setAttribute('class', 'outbox');
	div.setAttribute('title', '#Test Case ' + testcase);
	
	var span = document.createElement("span");
	span.innerHTML= '#Test Case ' + testcase
	div.appendChild(span)
	
	var save = document.createElement("button");
	save.innerHTML= "save"
	save.onclick = downloadFile;
	//save.style.paddingRight = "0px"		
	div.appendChild(save)	
	div.appendChild(document.createElement("br"))

	
	var textarea = document.createElement("textarea");
	textarea.id = "output_ta_1";
	textarea.style.width =  "250px";
	textarea.style.height = "100%";
	textarea.disabled = true;

	textarea.value = strPayload + "\n\n\n" + "Request:\n\n" + payloadField.value;
	div.appendChild(textarea);
	document.getElementById('footer').appendChild(div);
	updateSpan() 

 }  

function downloadFile(event){
	alert("hellow world")
	var text = event.target.parentElement.lastElementChild.value
	var filename = event.target.previousElementSibling.innerText
    var blob = new Blob([text], {type: "text/plain"});
	var url = window.URL.createObjectURL(blob);
	var a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
		
}

function updateSpan(){
	
	var lables = document.getElementById("root").getElementsByTagName("label")
	var seperator = testcase ==1 ? " ":" , "
	for (let value of lables) { 
        
		var input = value.firstElementChild
        var span = value.lastElementChild
        var x = span.innerHTML.substring(1)
        if(!x.includes(input.value+" "))
          span.innerHTML = "[ "+input.value + seperator + x	
     }
	
}

function addTreeView(container, label) {

	var rootUL = createUL(null, "myUL")
	if (label === "")
		var li = createLI(true, "")
	else
		var li = createLI(true, label)

	var nestedUL = createUL("nested", null)
	var nestedLI = createLI(false, null)

	// var nestedLI = createLI(true, label)
	nestedLI.appendChild(container)
	nestedUL.appendChild(nestedLI)

	li.appendChild(nestedUL)
	rootUL.appendChild(li)

	return rootUL
}

function createUL(className, id) {
	var ul = document.createElement("ul");
	if (id !== null) {
		ul.id = id
	}
	if (className !== null) {
		ul.setAttribute('class', className);

	}
	return ul;
}

function createLI(span, spanName) {

	var li = document.createElement("li")
	if (span) {
		var span = document.createElement("span")
		span.setAttribute('class', 'caret');
		span.innerHTML = spanName
		li.appendChild(span)

	}
	return li
}

function addEventListenerToggle() {
	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
		toggler[i].addEventListener("click", function() {
			this.parentElement.querySelector(".nested").classList
					.toggle("active");
			this.classList.toggle("caret-down");
		});
	}
	expandTree()
}

function expandTree(){
	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
		toggler[i].click()
			
	}
}

function onObjectLight(element) {
	alert("hi")
}

function offObjectLight() {
	alert("hi")
}

function ctrlA() {
	if (event.ctrlKey) {
		if (event.keyCode === 1) {
			document.getElementById("payload").select();
		}
	}
}

function clearForm() {
	document.getElementById("my-form").innerHTML = "";
}

function editInput(event) {
	// alert("output edit");
	
	var json = fetchJsonElement(event.target.parentNode)
	if(typeof(json[event.target.id])=="boolean"){
		var updated = event.target.value.toLowerCase() 
		if( updated == "true" || updated == "false"){
			if(updated == "true"){
				json[event.target.id]=true
				event.target.value = true
			}	
			else{
				json[event.target.id]=false
				event.target.value = false
			}
				
		}else{
			alert("Invalid Input :"+event.target.value+"\r\n"+"Valid Values : [true,false] ")
			event.target.value = json[event.target.id]
		}
	}
	else if(event.target.value === "null"){
		json[event.target.id] = null
	}
	else if(event.target.type == "number")
    	json[event.target.id] = event.target.valueAsNumber
    else if(event.target.type == "text")	
    	json[event.target.id] = event.target.value
	// output.value = JSON.stringify(payObj,null,2);
	payloadField.value = JSON.stringify(payObj, null, 2);
	

}

function fetchJsonElement(node) {
	if (node.id == "root") {
		var id = node.id

		return payObj
	}

	var x = fetchJsonElement(node.parentNode)
	if (node.tagName === "DIV")
		return x[node.id]
	else
		return x

}

function sendRequest() {
	// alert("sendHTTP")
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			alert(xhttp.responseText)
			// Typical action to be performed when the document is ready:
			var responsePayload = "Status:  " + this.status + "\r\n"
			responsePayload = responsePayload + xhttp.getAllResponseHeaders()
					+ "\n\n\n" + xhttp.responseText
			document.getElementById("responsepayload").value = responsePayload;
			addOutput(responsePayload)
		}
	};

	var httpMethod = document.getElementById("httpMethod").value

	var url = document.getElementById("endpoint").value
	xhttp.open(document.getElementById("httpMethod").value, url, true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	var payload = payloadField.value
	if (httpMethod === "GET") {
		xhttp.send();
	} else {
		xhttp.send(payload);
	}

}

function addButton(container, value) {
	var button = document.createElement("button")
	button.value = value
	container.appendChild(button)
}

function switchBorder(event) {

	if (event.target.tagName === "DIV") {
		event.stopPropagation();
		if (event.target.style.borderStyle === "solid") {
			event.target.style.borderStyle = "none"
		} else {
			event.target.style.borderStyle = "solid"
		}
	}

}
