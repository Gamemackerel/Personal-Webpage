  var videoList;
  var player;
  var tag;
  var firstScriptTag;
  var volState;

  window.onload = function() {
    document.getElementById("statusBox").style.display = 'none'; 
    document.getElementById("url").value = "";
    //This code loads the IFrame Player API code asynchronously.
    tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    document.getElementById("submit").onclick = updateQueue;
    document.getElementById("upload").onclick = toggleUpBox;
    document.getElementById("vol").onclick = toggleVol;
  };


  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('vf', {
      playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'iv_load_policy': 3 },
      host: 'http://www.youtube.com',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    $("#start").show();
    document.getElementById("start").onclick = start;
  }

  //The API will call this function when the video player changes its state
  function onPlayerStateChange(event) {
      if(event.data == YT.PlayerState.ENDED && player.getPlaylistIndex() == player.getPlaylist().length - 1) {
        fromTheTop();
      }
  }

  function start() {
    $("#intro").hide("slide", {direction: 'down'}, 200);
    $("#introOuterDiv").hide();
    player.setVolume(50); 
    window.onkeypress = handleInput; 
    fromTheTop();
  }

  function fromTheTop() {
    videoList = readVideoList().split("\n");
    player.loadPlaylist(videoList);
  }

  function handleInput(e) {
    var code = e.keyCode ? e.keyCode : e.which;

    if (code === 32) {
      if(player.getPlaylistIndex() != player.getPlaylist().length - 1) {
        player.nextVideo();
      } else {
        fromTheTop();
      }
    }
  }

  function stopVideo() {
    player.stopVideo();
  }

  
  function toggleUpBox() {
    $("#uploadDiv").toggle( "slide", {direction: 'right'}, 200);
    var button = document.getElementById("upload");
    if(button.className == "upload1") {
      button.className = "upload2";
    } else {
      button.className = "upload1";
    }
  }

  function toggleVol () {
    button = document.getElementById("vol");

    if (button.className == "muted") {
      button.className = "full";
      player.setVolume(100); 
    } else if (button.className == "half") {
      button.className = "muted"; 
      player.setVolume(0); 
    } else {
      button.className = "half"
      player.setVolume(50); 
    }
  }


  function updateQueue() {
    var url = document.getElementById("url").value;
    sendData("url=" + url, submissionReport);
  }

  function submissionReport() {
    document.getElementById("statusBox").style.display = "";
    document.getElementById("status").innerHTML = this.responseText;
    setTimeout(
        function() {document.getElementById("statusBox").style.display = "none";},
        5000);
  }

  function sendData(params, onload) {
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'one.php?' + params, true);
    xhr.onload = onload;
    xhr.send();
  }

  function readVideoList() {
    var request = new XMLHttpRequest();
    request.open("GET", "one.php", false);
    request.send(null);
    var returnValue = request.responseText;
    return returnValue;
  }








