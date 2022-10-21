
	/**
		Loads another webpage
	*/
	function loadPage(url){
		window.location.href = url;
	}

	/**
		Removes an HTML element given an ID
	*/
	function hideElem(elemId){
		document.getElementById(elemId).className = "hidden";
	}

	/**
		Removes an array of HTML elements given their IDs
	*/
	function hideElemArray(elemIdArray){
	
		for(let i = 0; i < elemIdArray.length; i++){
			hideElem(elemIdArray[i]);
		}
		
	}

	/**
		Gives the user a prompt to enter their name:
	*/
	function tellName(){
		
		var name;
		
		while(true){
			name = prompt("Tell this old man your name:", "Type it carefully here");
			
			if(name == null)
				return;
			if(name == ""){
				alert("Ah, I may provide a name to the blacksmith. Assist me.");
			}
			else if(name.length > 20){
				alert("Try something shorter; more than 20 letters in a name may make the blade shatter.");
			}
			else{
				// Save name as cookie to keep it display name when user comes back:
				setCookie('userName', name, 1);
				// Deletes things that hold relation with giving the name and puts the user's name:
				putName(name);
				// Enables smith and nail area:
				document.getElementById('forgeNailZone').className = "item_big";
				// Plays forging video:
				var forgeVid = document.getElementById('forgeVid');
				controlVideo('forgeVid');
				// Dissapear video only after it has ended
				forgeVid.onended = function(){
					// A timeout receives as parameter a function to execute and a waiting time
					// to execute said function:
					setTimeout(function(){
						hideElem('forgeVidZone');
						// Put nail content:
						displayNail();
						document.getElementById('stag').className = "darkBox";
					}, 300); //miliseconds
				}
				
				break;
			}
		}
		
	}
	
	/**
		Displays the user's name (in index.html) in the corresponding zones and hides very element related to the task:
	*/
	function putName(userName){
		
		hideElem('nameWarning');
		
		// Puts the name where it should go:
		document.getElementById('nameZone_1').innerHTML = "Hello, " + userName + "&#33;";
		document.getElementById('nameZone_2').innerHTML = ", " + userName;
		document.title = "Welcome, " + userName;
	}
	
	/**
		Plays nail forging video in index.html
	*/
	function controlVideo(videoId){
		
		// Starts playing video and waits for video duration (and a bit more) to make video dissapear
		// Surrounds video in a darkBox
		setTimeout(function(){
			document.getElementById(videoId + 'Zone').className = "darkBox";
		}, 2000); // miliseconds
		
		setTimeout(function(){
			document.getElementById(videoId).play();
			// Puts user right were the video is
			setTimeout(function() {
				document.location.href = "#" + videoId;
			}, 500)
		}, 1500); // miliseconds		
	}
	
	/**
		Displays nail (blade) in at index.html
	*/
	function displayNail(){
		document.getElementById('nailZone').className = "item_small";
	}
	
	/**
		Plays an exiting animation and waits *timeOut* seconds loads next HTML file
	*/
	function exitWithAnim(gifPath, timeOut){
		document.getElementById('mainContainer').innerHTML = "";
		document.body.style.backgroundImage = "url('" + gifPath + "')";
		setTimeout(function(){
			loadPage("../HTML/musicChoosing.html")
		}, timeOut);
	}
	
	/**
		Show middle button in musicChoosing.html
	*/
	
	function setVisible(htmlElemId, state){
		
		var elem = document.getElementById(htmlElemId);
		
		if(state)
			elem.style.visibility = "visible";
		else
			elem.style.visibility = "hidden";
	}
	
	/**
		Displays composer's information:
	*/
	function displayChrisLarkin(){
		
		document.getElementById('description').innerHTML = 
		"<b>Christopher Larkin</b> has always had a love of creativity. After discovering improvisation at the piano, " +
		"and music software on the computer in his early teens, he was able to begin exploring the medium of music" +
		"making as an exciting creative process.<br>&nbsp;<br>" +
		"Now a full time composer, Christopher has a number of achievements and collaborations under his belt, " +
		"including the score and sound for indie game hit “Hollow Knight”, sound for “Pac-Man 256”, and recently the " +
		"sweeping orchestral score for feature documentary “Barbecue”. He has also composed for popular children’s" +
		" TV show “Figaro Pho” which was recently awarded Best Music for Children’s TV at the APRA/AGSC Screen Music Awards.";
		document.getElementById('chrisLarkin').className = "chrisLarkin";
		
		hideElem('middleButton');
		document.getElementById('lookUpMsg').className = "f_title";
	}
	
	/**
		Adjusting variables to load music player in musicChoosing.html
	*/
	
	var songs;
	var actualSong;
	var songIndex;
	var songNameTags;
	var actualPage = document.location.href;
	
	function loadMusicPlayer(){
		
		songs = new Array("sharpAcquaintance","keeperOfTheDeep","highLords","sealedVessel","luminousDoom");
		songNameTags = new Array("Sharp Acquaintance", "Keeper Of The Deep", "High Lords", "Sealed Vessel", "Luminous Doom");
		
		var player = document.getElementById('actualSong');	
		
		// Checks if user hadn't already chosen a song
		if(actualSong == ""){
			// Default track info and choice
			songIndex = 0;
			actualSong = songs[0];
			document.getElementById('songNameZone').innerHTML = songNameTags[0];
			document.getElementById('actualSong').innerHTML = "<source src='../Media/Audio/" + songs[0] + ".mp3'>";
		}
		// Proven that a song had been set from previous visit:
		else{
			songIndex = songs.indexOf(actualSong);
			actualSong = songs[songIndex];
			document.getElementById('songNameZone').innerHTML = songNameTags[songIndex];
			document.getElementById('actualSong').innerHTML = "<source src='../Media/Audio/" + songs[songIndex] + ".mp3'>";					
		}
		
		// Adds events for pause and play to add responsiveness to page, notifying user when song is being played or not
		player.addEventListener('play',
			function() { 
				document.getElementById('songNameZone').innerHTML = "(Now playing) " + songNameTags[songIndex];
				document.getElementById('musician').className = "musician_play";
			});
		player.addEventListener('pause',
			function() { 
				document.getElementById('songNameZone').innerHTML = songNameTags[songIndex];
				document.getElementById('musician').className = "musician_idle";
			});
	}
	
	/**
		Plays previous song available in musicChoosing.html
	*/
	function choosePrev(){
		chooseSong(-1);
	}
	
	/**
		Plays next song available in musicChoosing.html
	*/
	function chooseNext(){
		chooseSong(1);
	}
	
	/**
		Advances or steps back in the songs array 
	*/
	function chooseSong(skip){
		
		// Remove instrucions:
		hideElem('instructions');
		
		// If song was changed, stop it:
		document.getElementById('actualSong').pause();
		
		// If we want to advance, we add 1. If we want to play previous track, add -1
		songIndex += skip;
		
		// If we loop back or forth in the musical choice, adjust index:
		if(songIndex < 0)
			songIndex = songs.length - 1;
		else if(songIndex >= songs.length)
			songIndex = 0;
		
		// Change old song info to new song info:
		actualSong = songs[songIndex];
		document.getElementById('songNameZone').innerHTML = songNameTags[songIndex];
		document.getElementById('actualSong').innerHTML = "<source src='../Media/Audio/" + songs[songIndex] + ".mp3'>";
		document.getElementById('actualSong').load();
		
		// Set new music choice to load upon page refresh o revisit:
		setCookie("musicChoice", songs[songIndex], 1);
	}
	
	/**
		Changes the mini game event displayed in the combat scene in battle.html
	*/
	function executeGameEvent(index){
		
		var buttonA = document.getElementById('button_a');
		var buttonB = document.getElementById('button_b');
		var player = document.getElementById('player');
		var enemy = document.getElementById('enemy');
		var video = document.getElementById('outcomeVid');
		var song = document.getElementById('actualSong');
		
		switch(index){
			case 1: // Pressed button a w/ text "Get close"
				buttonA.innerHTML = "Get closer";
				buttonA.setAttribute('onclick','executeGameEvent(2)')
				document.getElementsByTagName("P")[2].className = "p_text";
				enemy.className = "nosk_show1";
			break;
			
			case 2: // Pressed button a w/ text "Get closer"
				buttonA.innerHTML = "Fight!";
				buttonA.setAttribute('onclick','executeGameEvent(3)')
				document.getElementsByTagName("P")[4].className = "p_text";
				enemy.className = "nosk_show2";
				buttonB.className = "action";
				
				//Load music player too, for user to listen to track chosen previously:
				document.getElementById('audioPlayer').className = "item";
				checkMusicSet();
				song.play();
			break;
			
			case 3: // Pressed button a w/ text "Fight"
				buttonA.innerHTML = "Strike it down! <img class='nail' style='height: 70px;'>";
				buttonA.setAttribute('onclick','executeGameEvent(4)')
				player.className = "hk_attack";
				enemy.className = "nosk_final";
				hideElem(buttonB.id);
				
			break;
			
			case 4: // Pressed button a w/ text "Strike it down"
				player.className = "nosk_defeat";
				hideElem(buttonA.id);
				hideElem(buttonB.id);
				hideElem(enemy.id);
				
				// Puts out image to see video:
				setTimeout( function() {
					hideElem(player.id);
					video.src = "../Media/Video/nosk_defeat.mp4";
					video.load();
					song.pause();
					controlVideo(video.id);
					
					// Sets the outcome for attacking enemy
					video.onended = function(){
						setTimeout( function() {
							
							var paragraphs = document.getElementsByTagName("P");
							// Accesing last paragraph in the file
							paragraphs[ paragraphs.length - 1 ].innerHTML =
								"<font class='center'><font class='black'>" +
								"	You fear no creature. Your are it.<br>" + 
								"	&nbsp;<br>" + 
								"	You are the <b>Hollow Knight</b>.<br>" +
								"	&nbsp;<br>" + // Need to use all possible alternatives of quotation marks to get the loadPage function to work
								"	<button class='confirmation' onclick='loadPage(&#34;enemyForeshadowing.html&#34;)'> Continue </button>" +
								"</font></font>";
							
							document.getElementById('result').className = 'item';
							
						}, 650);
					}
					
				}, 1500);
				
			break;
			
			case 5: // Pressed button b w/ text "Flight"
				hideElem(buttonA.id);
				hideElem(buttonB.id);
				hideElem(player.id);
				hideElem(enemy.id);
				
				video.src = "../Media/Video/hk_defeat.mp4";
				video.load();
				song.pause();
				controlVideo(video.id);
				
				// Sets the outcome for not attacking enemy
				video.onended = function(){
					setTimeout( function() {
						
						// New button available will make page reload to retry
						var paragraphs = document.getElementsByTagName("P");
							paragraphs[ paragraphs.length - 1 ].innerHTML =
								"<font class='center'><font class='black'>" +
								"	This is no land for mercy. Shameful.<br>" +
								"	&nbsp;<br>" + 
								"	<button class='confirmation' onclick='window.location.reload(true)'>" + 
								"	Load from last checkpoint </button>" +
								"</font></font>";
						
						document.getElementById('result').className = 'item';
						
					}, 650);
				}
				
			break;
				
			default:
			break;
		}
		
	}
	
	/**
		Build table with images in enemyForeshadowing.html
	*/
	
	// An array with all the pictures to be shown
	var pictureNames = ["broodMawl.png","zote.png","grimm.png","mantisLord.png",
						"godTamer.png","infectedVessel.png","radiance.png","traitorLord.png"];
	
	function buildTable(rows, cols){
		
		// Beggins table
		var tableDef = "<table width='90%' cellpadding='5'>";
		var j = 0;
		var picIndex = 0;
		
		// This loop creates rows
		for(let i = 0; i < rows; i++){
		
			tableDef += "<tr>";
			
			// This loops creates columns in each row, putting the image inside
			for(j = 0; j < cols; j++){
				tableDef += "<td>" + 
					"<img src='../Media/Images/enemyForeshadowing/" + pictureNames[picIndex] + "' " + 
					"style='height:160px;'" +
					"</td>";
					
				picIndex++;
			}
		
			// Ends row
			tableDef += "</tr>";
			j = 0;
		}
				
		// Ends table and puts it in the specified zone:
			tableDef += "</table>";
		<!-- Puts element inside document -->
			document.getElementById('tableZone').innerHTML = tableDef;
	}
	
	function modifyFifthIndex(){
		
		pictureNames[5] = "pureVessel.png";
		buildTable(2,4);
		
		var newlyChangedItem = document.getElementsByTagName("IMG")[5];
		
		// Allows for little clicking action to swap between old and new picture
		newlyChangedItem.setAttribute('onclick','toggleImage()')
		var paragraphs = document.getElementsByTagName("P");
			paragraphs[ paragraphs.length - 1 ].className = "p_text";
		document.getElementById("toggler").onclick = function(){	toggleImage()	};
	}
	
	function toggleImage(){
		var currentImage = document.getElementsByTagName("IMG")[6];
		
		if(currentImage.src == "../Media/Images/enemyForeshadowing/infectedVessel.png")
			currentImage.src = "../Media/Images/enemyForeshadowing/pureVessel.png";
		else
			currentImage.src = "../Media/Images/enemyForeshadowing/infectedVessel.png";
	}
	
	/**
		Looks for a cookie given by parameter and returns its value, or an empty string if not set
	*/
	function getCookieValue(cookieName) {
		// Given the cookie being sought for, add an equals sign to adjust to the way the
		// cookies are stored:
		var name = cookieName + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		// Get the cookies' string:
		var cookieArray = decodedCookie.split(';');
		
		for(let i = 0; i < cookieArray.length; i++) {
			
			var cookie = cookieArray[i];
			while (cookie.charAt(0) == ' '){ // Trims cookie's white spaces
				cookie = cookie.substring(1);
			}
			
			// Having found the cookie-value pair, return value
			if (cookie.indexOf(name) == 0){
				return cookie.substring(name.length, cookie.length);
			}
		}
		
		// Cookie not present
		return "";
	}
	
	/**
		Sets a cookie with expiration days for this document
	*/
	function setCookie(cookieName, cookieValue, expDays) {
		
		const date = new Date();
		
		// Gets actual date and adds expDays (transformed from miliseconds to days) to define its expiring date:
		date.setTime(date.getTime() + (expDays* 24 * 60 * 60 * 1000));
		var expires = "expires=" + date.toUTCString();
		var fullCookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";

		document.cookie = fullCookie;
	}
	
	/**
		In index.html, seeks for a previously-set name to display it and avoid full introduction
	*/
	function checkNameSet(){
		
		var userName = getCookieValue('userName');
		
		if(userName != ""){
			document.title = "Welcome back, " + userName;
			putName(userName);
			document.getElementById('forgeNailZone').className = "item_big";
			displayNail();
		}
		else
			document.title = "Welcome";
	}
	
	function checkMusicSet(){
		
		var musicChoice = getCookieValue('musicChoice');
		
		if(musicChoice != ""){
			actualSong = musicChoice;
		}
		else{
			actualSong = "";
		}
		
		loadMusicPlayer();
	}


	