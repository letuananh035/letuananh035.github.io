function loadXMLDoc(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  var res = this.responseURL.split("ip=");
	  document.cookie = "token=" + res[1];
      return this.responseURL;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

}

function clickedButton()
{
	var text = $("#text-search").val(); 
	window.location.assign('search.php?text=' + text);
	return false;
}
