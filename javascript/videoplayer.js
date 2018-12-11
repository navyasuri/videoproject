// var videocount = 1;

// $(document).ready(function () {
//     $("#videoplayer").tubeplayer({
//         width: 680,
//         height: 480,
//         controls: 1, 
//         initialVideo: "53sFKtUsNFk", 
//         onPlayerEnded: function(){
//             if (videocount==1){
//                 videocount++;
//                 $("#videoplayer").tubeplayer("play", "75zszOkzQ");
//             }

//             if (videocount==2){
//                 $("#videoplayer").tubeplayer("play", "B6Igjgh629c");
//             }
//         }, 

//         onPause: function(){
//             console.log("paused");
//         }
//     });
// });

// ["75zszOkzQ", "B6Igjgh629c"]

// jQuery(document).ready(function(){
//     jQuery("#videoplayer").tubeplayer({
//         initialVideo: "kOkQ4T5WO9E",
//         onPlayerLoaded: function(){
//             console.log(this.tubeplayer("data"));
//         },
//     });
// });