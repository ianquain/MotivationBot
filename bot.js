console.log("Bot starting");

var Twit = require('twit');
var Config = require('./config');

//Create Twit object with config
var T = new Twit(Config);

//Setting up a user stream
var stream = T.stream('user');

//Anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
	console.log("Someone followed me!");
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt(' @' + screenName + ' Thanks for the follow!');
}

//Anytime someone tweets me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
	/*var fs = require('fs');
	var json = JSON.stringify(tweet,null,2);
	fs.writeFile("tweet.json", json);*/
	
	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;
	
	console.log(replyto + ' ' + from);
	
	if (replyto === 'Bot_ivate') {
		var newtweet = '@' + from + ' ' + randomQuote();
		tweetIt(newtweet);
	}
}

//Function to tweet messages
function tweetIt(txt){
	var tweet = {
		status: txt
	}
	
	T.post('statuses/update', tweet, tweeted);
	
	function tweeted(err, data, response){
		if(err) {
			console.log("Uh-oh, that didn't do what it was supposed to!");
		}
		else {
			console.log("It worked!");
		}
	}
}




function randomQuote(){
	//Array of Quotes
	var quotes = [
	"Only I can change my life.  No one can do it for me.",
	"Quality is not an act, it is a habit.",
	"Good, better, best. Never let it rest. 'Til your good is better and your better is best!",
	"Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
	"Life is 10 percent what happens to you and 90 percent how you react to it.",
	"With the new day comes new strength and new thoughts",
	"Failure will never overtake me if my determination to succeed is strong enough",
	"Change your life today. Don't gamble on the future, act now, without delay.",
	"The past cannot be changed. The future is yet in your power.",
	"It does not matter how slowly you go as long as you do not stop.",
	"Set your goals high and don't stop till you get there!",
	"It always seems impossible until it's done.",
	"We should not give up and we should not allow the problem to defeat us.",
	"Always do your best. What you plant now, you will harvest later.",
	"You can't cross the sea merely by standing and staring at the water.",
	"Problems are not stop signs they are guidelines.",
	"A creative man is motivated by the desire to achieve, not by the desire to beat others!",
	"Accept the challenges so that you can feel the exhiliration of victory.",
	"If you can dream it, you can do it.",
	"If you want to conquer fear, don't sit at home and think about it. Go out and get busy!",
	"Without hard work, nothing grows but weeds",
	"If you fell down yesterday, stand up today!",
	"Start where you are. Use what you have. Do what you can.",
	"Quality is not an act, it is a habit.",
	"Keep your eyes on the stars and your feet on the ground.",
	"Our greatest weakness lies in giving up. The most certain way to succeed is to always try just one more time.",
	"The secret of getting ahead is getting started.",
	"Setting goals is the first step in turning the invisible into visible!",
	"The will to win, the desire to succeed, the urge to reach your full potential, these are the keys that will unlock the door to personal excellence.",
	"Be kind whenever possible. It is always possible.",
	"If you're going through hell, keep going!",
	"We aim above the mark to hit the mark.",
	"What you do today can improve all of your tomorrows.",
	"Either you run the day or the day runs you.",
	"We may encounter many defeats but we must not be defeated.",
	"When something is important enough, you do it even if the odds are not in your favor.",
	"Perseverance is not a long race; it is many short races one after the other.",
	"Aim for the moon, if you miss, you may hit a star.",
	"You are never too old to set another goal or to dream another dream!",
	"Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begn with a single step.",
	"Don't watch the clock; do what it does. Keep going!",
	"Ever tried? Ever failed? No matter. Try again! Fail again! Fail better!",
	"Never give up, for that is the time and place that the tide will turn.",
	"The key is to keep company with people who uplift you, whose presence calls forth your best.",
	"When you reach the end of your rope, tie a knot in it and hang on.",
	"Do your work with your whole heart, and you will succeed - there's so little competition.",
	"I'd rather attempt to do something great and fail than attempt to do nothing and succeed.",
	"in order to succeed we must first believe that we can.",
	"Every exit is an entry somewhere else.",
	"The best to get started is to quit talking and start doing.",
	"By failing to prepare, you are preparing to fail.",
	"The more man meditates upon good thoughts, the better will be his world and the world at large.",
	"Things do not happen, they are made to happen.",
	"Expect problems and eat them for breakfast!",
	"Perseverance is failing 19 times and succeeding the 20th.",
	"Do you want to know who you are? Don't ask. Act! Action will delineate and define you.",
	"The harder the conflict, the more glorious the triumph.",
	"Oppportunity does not knock, it presents itself when you beat down the door!",
	"The ultimate aim of the ego is not to see something, but to be something.",
	"The people who influence you are the people who believe in you.",
	"Either I will find a way, or I will make one!",
	"A goal is a dream with a deadline.",
	"You will never win if you never begin.",
	"Do not wait to strike till the iron is hot; but make it hot by striking.",
	"If you do not like how things are, change it! You are not a tree!",
	"You just can't beat the person who never gives up.",
	"Motivation is the art of getting people to do what you want them to do because they want to do it.",
	"If you think you can do it, you can!",
	"The will to succeed is important, but what's more important is the will to prepare.",
	"Never complain and never explain.",
	"Do something wonderful, people may imitate it.",
	"One way to keep momentum is to have constantly greater goals.",
	"Follow your inner moonlight; don't hide the madness.",
	"Arriving at one goal is the starting point to another.",
	"You need to overcome the tug of people against you as you reach for high goals.",
	"It is very important to know who you are. To make decisions. To show who you are.",
	"Even if you fall on your face, you're still moving forward.",
	"No bird soars too high if he soars with his own wings.",
	"You have to learn the rules of the game. And then you have to play better than anyone else.",
	"Always desire to learn something useful.",
	"You can never quit.  Winners never quit, and quitters never win.",
	"The most effective way to do it, is to do it!",
	"Go for it now, the future is promised to no-one.",
	"Act as if waht you do makes a difference.  It does.",
	"It's always too early to quit.",
	"After a storm comes the calm.",
	"Small deeds done are better than great deeds planned.",
	"There's a way to do it better - find it.",
	"A somebody was once a nobody who wanted to and did.",
	"To be a good loser is to learn how to win.",
	"I am not afraid, I was born to do this!",
	"You can't build a reputation on what you are going to do.",
	"Step by step and the thing is done.",
	"Be gentle to all and stern with yourself!",
	"True happiness involves full use of one's power and talents.",
	"Motivation will almost always beat mere talent.",
	"Don't give up. Don't lose hope. Don't sell out.",
	"Don't fight the problem, decide it.",
	"Decide what you want, decide what you are willing to exchange for it. Establish your priorities and go to work.",
	"We make the world we live in and shape our own environment!",
	"The wise does at once what the fool does at last."
	];
	
	var num = Math.floor(Math.random()*quotes.length);
	
	return quotes[num];
}