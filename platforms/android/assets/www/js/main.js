var thisUserId;


$(document).on("pagecreate", "#page_posts", function (event) {
    //$(function (event, data) {
    $.getJSON(encodeURI("http://sbawebdev-dataparser.rhcloud.com/api/get_recent_posts/"), function (data) {
        //$('.result').html('<p>' + data.foo + '</p>'
        //    + '<p>' + data.baz[1] + '</p>');
        $.each(data.posts, function (index, post) {
            var item = document.createElement("li");
            var link = document.createElement("a");
            var text = document.createTextNode(post.title);

            //$.data(link, "id", post.id);
            link.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
            link.href = "viewpost.html";
            $(link).on("click", function saveCurrentPostID() {
                localStorage.postid = post.id;
            });
            link.appendChild(text);
            item.appendChild(link);
            document.getElementById("list_posts").appendChild(item);
        });
    });
    //});
});


$(document).on("pagecreate", "#page_viewpost", function (event) {
    $.getJSON(encodeURI("http://sbawebdev-dataparser.rhcloud.com/api/get_post/?post_id=" + localStorage.postid), function (data) {
        var h3 = document.createElement("h3");
        var text = document.createTextNode(localStorage.postid);
        h3.appendChild(text);
        var el = document.getElementById("div_viewpost");
        el.appendChild(h3);

        //var p = document.createElement("p");
        text = document.createTextNode(data.post.content);
        //p.appendChild(text);
        $(el).append(text);
    });
});

$(document).on("mobileinit", function () {
    //$.mobile.pageContainer = $("#container"); /* different pagecontainer (not <body>) */
    $.mobile.hideUrlBar = false;
});


$(document).on("pagecreate", "#page_index", function (event) {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
});

function onGeoSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
        'Heading: ' + position.coords.heading + '<br />' +
        'Speed: ' + position.coords.speed + '<br />' +
        'Timestamp: ' + position.timestamp + '<br />' +
        'test distance:' + distanceBetweenCoordinates(43.8982226, -79.46687, 43.8982841, -79.46684010000001);
}

// onError Callback receives a PositionError object
function onGeoError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

//Returns distance between 2 points in meters
function distanceBetweenCoordinates(lat1, long1, lat2, long2) {
    var latDif, longDif, centralAngle, distance, earthRadius;

    earthRadius = 6371;
    latDif = Math.abs(lat1 - lat2);
    longDif = Math.abs(long1 - long2);

    centralAngle = 2 * Math.asin(
            Math.sqrt(
                Math.pow(Math.sin(latDif / 2), 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.pow(Math.sin(longDif / 2), 2)
            ));

    distance = Math.PI / 180 * centralAngle * earthRadius;

    return Math.round(distance * 1000);
}