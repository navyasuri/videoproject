console.log("Script Started");

console.log("hash is " + window.location.hash);

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

// check for hash
// if yes, set local storage data

// check for local storage data
// if not then use the default data, if yes use the local storage data

if (window.location.hash) {
    var hash = window.location.hash.substr(1);
    // console.log("hash value " + hash);

    window.sessionStorage.setItem("access_hash", hash);
    // console.log(" local storage " + window.sessionStorage.getItem("access_hash"));

    var getLink = "https://api.instagram.com/v1/users/self/?" + window.location.hash.substr(1);
    // console.log("the link is " + getLink);

    // Send a get request with the token to insta
    fetch(getLink).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            window.sessionStorage.setItem("data", JSON.stringify(data.data));
            console.log("Local storage set");
            return data.data;
        })
        .then(function (json_data){
            updateData(json_data);
            console.log("update data");
        });

    console.log("here");
}

else {
    if (window.sessionStorage.getItem("data") == null) {

        console.log("here2")
        // check if user has already decided to not login to insta. If so then don't do anything
        // If not decided, then display modal and set variable to true
        if (window.sessionStorage.getItem("already_set") == null) {
            displayModal();
            window.sessionStorage.setItem("already_set", true);
        }

        else{
            // user has decided to not login to insta
            var default_data = {
                username: "idonthaveinsta", 
                profile_picture: "http://designatprinting.com/wp-content/uploads/kisspng-stick-man-figure-clip-art-happy-5ab290d04e2772-18.jpg", 
                counts: {
                    followed_by: 0
                }
            };
            window.sessionStorage.setItem("data", JSON.stringify(default_data));
        }

    }

    else {
        updateData(JSON.parse(sessionStorage.getItem("data")));
    }

}


function updateData(json_data){
    
    var text = document.getElementById("para");
    var img = document.getElementById("prof");
    console.log("h1 text" + text);
    console.log("username" + json_data.username);
    text.innerText = "Hello @" + json_data.username + ". You have " + json_data.counts.followed_by + " followers. We can triple that in a week!";
    img.src = json_data.profile_picture;
    console.log("inner html" + text.innerText);
}

// var current = new URLSearchParams(window.location.href);
// if (!window.location.hash) {
//     if (window.sessionStorage.getItem("data") == null) {
//         displayModal();
//     }
// }

// else {

//     var hash = window.location.hash.substr(1);
//     console.log("hash value " + hash);

//     window.sessionStorage.setItem("access_hash", hash);
//     console.log(" local storage " + window.sessionStorage.getItem("access_hash"));

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
//             window.sessionStorage.setItem("data", JSON.stringify(data.data));
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
        "redirect_uri": window.location.href,
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
