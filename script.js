var page = 0;

function getPhotos (tag, fresh) {	
	// reformat the tag from the input
	tag = tag.replace(/\s/g, "");
	
	// load pages from beginning		
	if(fresh)
		page = 0;
		
	// load next page
	page++;
	
	// Hinzufügen von Script-Tags zur Laufzeit:
	var s = document.createElement("script");
	//s.src="http://api.flickr.com/services/rest/?format=json&sort=random&method=flickr.photos.search&page="+page+"&per_page=150&tags="+tag+"&tag_mode=all&api_key=6202031574e5d7c896dd4711b2611cc5&jsoncallback=?";
	s.src="http://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&page="+page+"&per_page=150&tags="+tag+"&tag_mode=all&api_key=6202031574e5d7c896dd4711b2611cc5&jsoncallback=?";
	document.getElementsByTagName('head')[0].appendChild(s);
	
	jsonFlickrApi = function(response) {
		if (response.stat != "ok")
			return;
		
		var photosList = document.getElementById("photosList");
		
		// remove all images when user inputs tag
		while (photosList.hasChildNodes() && fresh) {
			photosList.removeChild(photosList.firstChild);
		}

		for (var i=0; i < response.photos.photo.length; i++) {
			photo = response.photos.photo[i];
			var li = document.createElement("li");
			var a = document.createElement("a");
			var url = pictureLarge(photo)
			var img = document.createElement("img");
			img.setAttribute("src", pictureThumb(photo));
			img.setAttribute("alt", photo.title);
			a.setAttribute("href", url);
			a.appendChild(img);
			li.appendChild(a);
			photosList.appendChild(li);
			a.onclick = clickPic;
		}
	}
	
	// remove the inserted script block after loading the images,
	// so we don't clutter the header
	document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('head')[0].lastChild);
};

window.onload = function() {
	// load photos for the first time
	getPhotos(document.getElementById('tag').value, true);
	
	// scroll handler to load new images when scrolled to bottom of page
	window.onscroll = scrolled;
};

function clickPic(event) {
	var img = document.createElement("img");
	var capPara = document.createElement("p");
	var caption = document.createTextNode(event.target.getAttribute("alt"));
	var hover = document.getElementById("hover");
	
	img.setAttribute("src", event.target.parentNode.href);
	img.setAttribute("alt", event.target.getAttribute("alt"));
	capPara.appendChild(caption);
	//capPara.classList.add("caption");
	capPara.setAttribute("id", "caption");
	hover.style.display = "table-cell";
	
	img.onload = function(event) {
		// resize image when loaded if bigger than browser window
		hover.appendChild(img);
		hover.appendChild(capPara);
		var capHeight = parseInt(window.getComputedStyle(capPara,null).getPropertyValue("margin-top"))*2 + parseInt(window.getComputedStyle(capPara,null).getPropertyValue("height"));
		var marginTop = parseInt(window.getComputedStyle(img,null).getPropertyValue("margin-top"));
		if(img.height + marginTop + capHeight > window.innerHeight /* - marginTop - capHeight */)
			img.height = window.innerHeight - marginTop - capHeight;
		hover.style.backgroundImage = "none"
	}
	
	// hide the image if the user clicks on it
	hover.onclick = function(event) {
		var hover = document.getElementById("hover");
		
		while(hover.hasChildNodes())
			hover.removeChild(hover.firstChild);
			
		hover.style.display = "";
		hover.style.background = "";
	};
	
	// pretend default behaviour
	return false;
}

function scrolled(event){
	var photosList = document.getElementById("photosList");
	
	// calculate scroll height	
	var pos = window.pageYOffset;
    var max = document.documentElement.scrollHeight - document.documentElement.clientHeight;

	// load new photos when at bottom of page
    if (max - 80 < pos)
		getPhotos(document.getElementById('tag').value, false);
}

// Utility-Functions: Generieren von Flickr-URLs
// Dokumentation siehe http://www.flickr.com/services/api/misc.urls.html

// Die URL des Fotos (Thumbnail):	
function pictureThumb(photo) {
	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	photo.id + "_" + photo.secret + "_" + "s.jpg";				
}

// Die URL des Fotos (Mittel):	
function pictureMedium(photo) {
	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	photo.id + "_" + photo.secret + "_" + "z.jpg";				
}

// Die URL des Fotos (Groß):		
function pictureLarge(photo) {
	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	photo.id + "_" + photo.secret + "_" + "b.jpg";				
}

// Die URL zur entsprechenden Seite bei Flickr:
function linkURL(photo) {	
	return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
}

function goDashed(FRM,BTN)
{
   document.getElementById("search").style.borderStyle = "dashed";
}

function goDotted(FRM,BTN)
{
   document.getElementById("search").style.borderStyle = "dotted";
}