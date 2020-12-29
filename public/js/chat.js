var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${formatedTime}  ${message.from} : ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>');
    var formatedTime = moment(message.createdAt).format('h:mm a');

    li.text(`${formatedTime}  ${message.from} : `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function (){
        $('[name=message]').val('');
    });
});

$('#send-location').on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    $('#send-location').attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        $('#send-location').removeAttr('disabled').text('Send Loaction');
        socket.emit('getCurrentLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        $('#send-location').removeAttr('disabled').text('SEnd Location');
        alert('Unable to fetch location');
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});