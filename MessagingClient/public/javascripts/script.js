var ul = document.getElementById('messages');
socketClient.on('receiveMessage', function (data) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(data.message));
    ul.appendChild(li);
});

document.getElementById('postMessage').onclick = function (e) {
    var message = document.getElementById('message').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/messages');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            //alert(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({
        message: message
    }));

    document.getElementById('message').value = '';
};