// Two methods for timers - setTimeout and SetInterval (single / repeating)

//What need to imput 
//var myImage = document.getElementById("mainImage");
// WE NEED AREA FOR PIC

// settimeout is in milliseconds
//setTimeout(simpleMessage,5000);

var myImage = document.getElementById("mainImage");

var imageArray = ["_images/overlook.jpg","_images/winery_sign.jpg","_images/lunch.jpg",
				  "_images/bigSur.jpg","_images/flag_photo.jpg","_images/mission_look.jpg"];
var leftBotton = document.getElementById("leftBotton");
var rightBotton = document.getElementById("rightBotton");
//
var imageIndex = 0;
var intervalHandle = setInterval(changeImageRight,5000);
function changeImageRight() {
	myImage.setAttribute("src",imageArray[imageIndex]);
	imageIndex++;
	if (imageIndex >= imageArray.length) {
		imageIndex = 0;
	}
    clearInterval(intervalHandle);
    intervalHandle = setInterval(changeImageRight,5000);
}

function changeImageLeft() {
    clearInterval(intervalHandle);
	myImage.setAttribute("src",imageArray[imageIndex]);

    imageIndex--;
    if (imageIndex < 0) {
        imageIndex = imageArray.length - 1;
    }
    
    intervalHandle = setInterval(changeImageRight,5000);
}

// setInterval is also in milliseconds


leftBotton.onclick = function() {
    changeImageLeft();
}

rightBotton.onclick = function() {
    changeImageRight();
}






