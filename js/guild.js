// edit these

var region = "eu";
var locale = "en_EU";
var realm = "Argent Dawn";
var guild = "Dark Steel";
var fields = "members,achievements,challenges,news";
var api_key = "gu2d5ktxrxfamm8s9h7xzjbdaq7g8wd2";

/*

DON'T TOUCH ANYTHING UNDER HERE UNLESS YOU KNOW WHAT YOU'RE DOING!!!

*/

var dashRealm = realm.replace(/ /g, "-");
var guildUnderscore = guild.replace(/ /g, "_");

var api_url = "https://"; //base
api_url += region; //region
api_url += ".api.battle.net/wow/guild/"; //base
api_url += realm; //server
api_url += "/"; //data
api_url += guild; //guild
api_url += "?fields="; //data
api_url += fields; //fields
api_url += "&locale="; //data
api_url += locale; //locale
api_url += "&apikey="; //data

$('document').ready(function() {

	$.getJSON( api_url + api_key, {
		dataType: "jsonp",
		format: "json"
		})
		.done( function ( data ) {
			//console.log( data );
			$( ".guildname" ).append( data.name );
			$( ".guildrealm" ).append( data.realm );

			$.each( data.news, function( i, news ) {

				//datetime
				var formattedDate = new Date(news.timestamp);
				var d = formattedDate.getDate();
				if (d < 10){
					d = "0" + d;
				}
				var m =  formattedDate.getMonth();
				m += 1;  // JavaScript months are 0-11
				if (m < 10){
					m = "0" + m;
				}
				var y = formattedDate.getFullYear();
				var true_date = d + "/" + m + "/" + y;

				//stuff happens under here
				if (news.type == "itemLoot") {
					var idStore = news.itemId;
					$.getJSON( "https://us.api.battle.net/wow/item/" + idStore + "?locale=en_US&apikey=gu2d5ktxrxfamm8s9h7xzjbdaq7g8wd2", {
						dataType: "jsonp",
						format: "json"
					})
					.done( function ( item_data ) {
						item_name = item_data.name;
						console.log("Loot: " + idStore + " " + item_data.name);

						$( "<li>" + true_date + " - " + "<a class='focal' target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + news.character + "/simple'>" + news.character + "</a>" + " aquired item " + "<a target='_blank' class='" + "item-quality-" + item_data.quality + "'' href='http://www.wowhead.com/item=" + idStore + "'>[" + item_name + "]</a>" + "</li>" ).appendTo( "#guildnews-items" );
					});
				}
				if (news.type == "playerAchievement") {
					console.log("Achievement: " + news.achievement.id + " " + news.achievement.title);
					$( "<li>" + true_date + " - " + "<a class='focal' target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + news.character + "/simple'>" + news.character + "</a>" + " earned the achievement " + "<a class='focal' target='_blank' href='http://www.wowhead.com/achievement=" + news.achievement.id + "'>[" + news.achievement.title + "]</a>" + "</li>" ).appendTo( "#guildnews-achievements" );
				}
				if (news.type == "guildCreated") {
					$( "<li>" + true_date + " - " + "<a class='focal' target='_blank' href='http://" + region + ".battle.net/wow/en/guild/" + dashRealm + "/" + guildUnderscore + "/'>" + guild + "</a>" + " was founded!" + "</li>" ).appendTo( "#guildnews-achievements" );
				}
				if (news.type == "guildAchievement") {
					console.log("Achievement: " + news.achievement.id + " " + news.achievement.title);
					$( "<li>" + true_date + " - " + "<a class='focal' target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + guildUnderscore + "/'>" + guild + "</a>" + " earned the achievement " + "<a class='focal' target='_blank' href='http://www.wowhead.com/achievement=" + news.achievement.id + "'>[" + news.achievement.title + "]</a>" + "</li>" ).appendTo( "#guildnews-achievements" );
				}
			});
			$.each( data.members, function( i, members ) {
				console.log( "Member: " + members.character.name );
				$( "<li>" + "<a class='focal' target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + members.character.name + "/simple'>" + members.character.name + "</a>" + "</li>" ).appendTo( "#guildroster" );
			});
		});
});

				/*

			$.each( data.news, function( i, news ) {
				var formattedDate = new Date(news.timestamp);
				var d = formattedDate.getDate();
				if (d < 10){
					d = "0" + d;
				}
				var m =  formattedDate.getMonth();
				m += 1;  // JavaScript months are 0-11
				if (m < 10){
					m = "0" + m;
				}
				var y = formattedDate.getFullYear();
				var true_date = d + "/" + m + "/" + y;

				var item_name = "";
				var item_class= "white";

				//if a player got an item
				if (news.type = "itemLoot"){
					var idStore = news.itemId;
					$.getJSON( "https://us.api.battle.net/wow/item/" + idStore + "?locale=en_US&apikey=gu2d5ktxrxfamm8s9h7xzjbdaq7g8wd2", {
						dataType: "jsonp",
						format: "json"
					})
					.done( function ( item_data ) {
						console.log(idStore);
						item_name = item_data.name;
						console.log(item_data.name);
						if (item_data.quality == 5){
							item_class = "legendary";
							$( "<li>" + true_date + " - " + "<a target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + news.character + "/simple'>" + news.character + "</a>" + " aquired item " + "<a target='_blank' class='" + item_class + "'' href='http://www.wowhead.com/item=" + idStore + "'>[" + item_name + "]</a>" + "</li>" ).appendTo( "#guildnews-items" );
						}
						if (item_data.quality == 4){
							item_class = "epic";
							$( "<li>" + true_date + " - " + "<a target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + news.character + "/simple'>" + news.character + "</a>" + " aquired item " + "<a target='_blank' class='" + item_class + "'' href='http://www.wowhead.com/item=" + idStore + "'>[" + item_name + "]</a>" + "</li>" ).appendTo( "#guildnews-items" );
						}
					})
					.fail( function ( error ) {
						console.log( "Request Failed: " + error );
					});
				}
				//if it's a player achievement
				if (news.type = "playerAchievement") {
					if (news.itemId > 0){
					}
					else {
						console.log( "Achievement: " + news.achievement.title );
						$( "<li>" + true_date + " - " + "<a target='_blank' href='http://" + region + ".battle.net/wow/en/character/" + dashRealm + "/" + news.character + "/simple'>" + news.character + "</a>" + " earned the achievement " + "<a target='_blank' href='http://www.wowhead.com/achievement=" + news.achievement.id + "'>[" + news.achievement.title + "]</a>" + "</li>" ).appendTo( "#guildnews-achievements" );
					}
				}
				//number of new items in news items to display
				if ( i === 200 ) {
					return false;
				}
			});

			$.each( data.members, function( i, members ) {
				$( "<li>" + members.character.name + " - " + members.character.realm + "</li>" ).appendTo( "#guildroster" );
			});
		})
		.fail( function ( error ) {
			console.log( "Request Failed: " + error );
		});

});

*/
