var root = window.location.protocol + "//" + window.location.hostname + "/";
var input_history = [];
var input_history_curpos = 0;
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) callback(xmlHttp.responseText);
            else callback("Command not recognized.");
        }
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function add_text_block(text) {
       	elem = document.createElement("div");
       	elem.className = "textblock";
       	elem.innerHTML = text;
       	document.getElementsByTagName("form")[0].insertBefore(elem,document.getElementById("inputblock"));
	if (elem.getElementsByTagName("b")[0]) document.getElementById("top").innerHTML = "&nbsp;" + elem.getElementsByTagName("b")[0].innerHTML;
       	document.getElementById("inputblock").scrollIntoView();
}

function submit_handler() {
       	form = document.getElementsByTagName("form")[0];
       	input_history.push(document.getElementById("textentry").value);
       	input_history_curpos = input_history.length-1;
       	document.getElementById("textentry").value = "";
       	// Command feedback
       	e1 = document.createElement("div");
       	e1.className = "textblock";
       	t1 = document.createTextNode("> " + input_history[input_history_curpos]);
       	e1.appendChild(t1);
       	form.insertBefore(e1,document.getElementById("inputblock"));
       	document.getElementById("inputblock").scrollIntoView();
       	// Command output
       	httpGetAsync(root + input_history[input_history_curpos] + ".txt", add_text_block);
}

document.onkeydown = function(e) {
       	e = e || window.event;
       	input = document.getElementById("textentry");
       	if (e.keyCode == "38" && document.activeElement === input && input_history_curpos > 0) {
       		input_history_curpos -= 1;
       		input.value = input_history[input_history_curpos];
       		setTimeout(function(){ input.selectionStart = input.selectionEnd = 10000; }, 0);
       	}
       	if (e.keyCode == "40" && document.activeElement === input && input_history_curpos < input_history.length-1) {
       		input_history_curpos += 1;
       		input.value = input_history[input_history_curpos];
       		setTimeout(function(){ input.selectionStart = input.selectionEnd = 10000; }, 0);
       	}
}
