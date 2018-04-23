

    function getUserScores() {
       // if(justPost===false){
            var username = document.getElementById("user").value;
            fetch('/player/' + username, { method: 'GET' })
            /*
            var xml = new XMLHttpRequest();
            xml.onreadystatechange = function() {
                if (xml.readyState == 4 && xml.status == 200) {
                    callback(xml.responseText);
                }
            }
            var username = document.getElementById("username").value;
            xml.open("POST", '/postscore?score=' + game.score.toString() + '&username=' + username, false); //NEED TO FIND URL
            xml.send(null);
        */
    //justPost=true;
    //}
        }
