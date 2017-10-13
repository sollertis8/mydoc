//const BETTER_DOCTOR_API = 'https://api.betterdoctor.com/2016-03-01/doctors';

$(document).ready(function () {
    new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('trigger'));
    console.log("ready!");
    getUserLocation();
    $(watchSubmit);
});

// const crypto = require('crypto');

// const generate_key = function() {
//     const sha = crypto.createHash('sha256');
//     sha.update(Math.random().toString());
//     return sha.digest('hex');
// };
// initialize google maps
function initMap(latitude, longitude) {
    var uluru = {
        lat: parseInt(latitude),
        lng: parseInt(longitude)
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    // ${initMap(result.practices[0].lat, result.practices[0].lon)}
}
// get data from API and limit results
function getDataFromApi(location, callback) {

    const settings = {
        data: {
            location: `${location}`,
            skip: '2',
            limit: '12',
            user_key: 'ca6c55cccdb1c2084039aeadd09f13b3',
        },
        url: 'https://api.betterdoctor.com/2016-03-01/doctors',
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings)
}
// gets user location
function getUserLocation() {
    $.get("https://ipinfo.io", function (response) {
        result = response.loc;
        var values = result.split(',');
        lat = values[0];
        long = values[1];
        initMap(lat, long);
    }, "jsonp")
}
// renders results to user
function renderResult(result) {
    $('.js-search-results').show();
    $('.bio').shorten();
    return `
        <div class="col-sm-4">
    <div class="card-container">
    <div class="card">
        <div class="front">
            <div class="cover">
                <img src="images/rotating_card_thumb5.jpg"/>
            </div>
            <div class="user">
                <img class="img-circle" src="${result.profile.image_url}"/>
            </div>
            <div class="content">
                <div class="main">
                    <h3 class="name">${result.profile.first_name} ${result.profile.last_name}, ${result.profile.title}</h3>
                    <p class="profession">${result.practices[0].name}</p>

                    <p class="text-center">${result.specialties[0].description}</p>
                </div>
                <div class="footer">
                    <div class="rating">
                        <i class="fa fa-mail-forward"></i> Auto Rotation
                    </div>
                </div>
            </div>
        </div> <!-- end front panel -->
        <div class="back">
            <div class="header">
                <h5 class="motto">State Licensed In: ${result.licenses[0].state}</h5>
            </div>
            <div class="content">
                <div class="main">
                    <h4 class="text-center">Bio</h4>
                    <p class="text-center"><div class="bio">${result.profile.bio}</div></p>
                    <div class="map" id="map">
                    
                    </div>
                    <div class="stats-container">
                        <div class="stats">
                            <h4></h4>
                            <p>
                            <a href="">
                            <span class="glyphicon glyphicon-earphone"></span> Contact
                          </a>
                            </p>
                        </div>
                        <div class="stats">
                            <h4></h4>
                            <p>
                            <a href="">
                            <span class="glyphicon glyphicon-map-marker"></span> View Map
                            </a>
                            </p>
                        </div>
                        <div class="stats">
                            <h4></h4>
                            <p>
                            <a href="">
                            <span class="glyphicon glyphicon-circle-arrow-right"></span> More
                            </a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="footer">
                <div class="social-links text-center">
                    <a href="#" class="facebook"><i class="fa fa-facebook fa-fw"></i></a>
                    <a href="#" class="google"><i class="fa fa-google-plus fa-fw"></i></a>
                    <a href="#" class="twitter"><i class="fa fa-twitter fa-fw"></i></a>
                </div>
            </div>
        </div> <!-- end back panel -->
    </div> <!-- end card -->
</div> <!-- end card-container -->
    `;
}
// parses API response data
function displayResponseData(response) {
    const results = response.data.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
    renderResult(results);
    console.log("displayResponseData ran");
}
// listen's for form submission
function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();
        const target = $(event.currentTarget).find('.js-location');
        const query = (target.val());
        target.val("");
        getDataFromApi(query, displayResponseData);
        console.log("watchSubmit ran");
    });
}

