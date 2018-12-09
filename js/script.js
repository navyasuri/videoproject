console.log("Script Started");

console.log("hash is " + window.location.hash);

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

// check for hash
// if yes, set local storage data

// check for local storage data
// if not then use the default data, if yes use the local storage data

if (window.location.hash) {
    // var hash = window.location.hash.substr(1);
    // console.log("hash value " + hash);

    window.localStorage.setItem("access_hash", hash);
    // console.log(" local storage " + window.localStorage.getItem("access_hash"));

    var getLink = "https://api.instagram.com/v1/users/self/?" + window.location.hash.substr(1);
    // console.log("the link is " + getLink);

    // Send a get request with the token to insta
    fetch(getLink).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            window.localStorage.setItem("data", JSON.stringify(data.data));
            console.log("Local storage set");
        });
}

// if the data is null, check whether user has visited or not

if(window.localStorage.getItem("data")==null){
    // check if user has already decided to not login to insta. If so then don't do anything
    // If not decided, then display modal and set variable to true
    if (window.localStorage.getItem("already_set")==null){
        displayModal();
        window.localStorage.setItem("already_set", true);
    }

}

else{
    var text = document.getElementById("para");
    console.log("h1 text" + text);
    console.log("username" + data.data.username);
    text.innerText = "Hello @" + data.data.username + ". You have " + data.data.counts.followed_by + " followers. We can triple that in a week!";
    window.localStorage.setItem("data", JSON.stringify(data.data));
    console.log("inner html" + text.innerText);
}



// var current = new URLSearchParams(window.location.href);
// if (!window.location.hash) {
//     if (window.localStorage.getItem("data") == null) {
//         displayModal();
//     }
// }

// else {

//     var hash = window.location.hash.substr(1);
//     console.log("hash value " + hash);

//     window.localStorage.setItem("access_hash", hash);
//     console.log(" local storage " + window.localStorage.getItem("access_hash"));

//     var getLink = "https://api.instagram.com/v1/users/self/?" + window.location.hash.substr(1);
//     console.log("the link is " + getLink);

//     var myData;

//     // Send a get request with the token to insta
//     fetch(getLink).then(function (response) {
//         return response.json();
//     })
//         .then(function (data) {
//             console.log(data.data);
//             var text = document.getElementById("para");
//             console.log("h1 text" + text);
//             console.log("username" + data.data.username);
//             text.innerText = "Hello @" + data.data.username + ". You have " + data.data.counts.followed_by + " followers. We can triple that in a week!";
//             window.localStorage.setItem("data", JSON.stringify(data.data));
//             console.log("inner html" + text.innerText);
//         });
// }

var client_id = "45613755265c43eb9bf9e42e72c14896";
var link = "https://api.instagram.com/v1/users/self/?access_token=364867749.4561375.4be49395decb48af99f2f713a0694e92";
function displayModal() {
    console.log("Modal should show");
    // Get the modal
    var modal = document.getElementById('myModal');

    // // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    // // When the user clicks on the button, open the modal 
    // btn.onclick = function () {
    //     modal.style.display = "block";
    // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //     modal.style.display = "none";
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

    console.log("Modal Style " + modal.style.display);
    modal.style.display = "block";

}

function getToken(username) {
    var params = {
        "client_id": client_id,
        "redirect_uri": "http://ns3774.nyuad.im",
        "response_type": "token"
    };
    var query = $.param(params);
    console.log(query);
    var auth = "https://api.instagram.com/oauth/authorize/?" + query;
    window.location.replace(auth);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
