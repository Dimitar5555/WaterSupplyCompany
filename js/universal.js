function sn(number, decPlaces) {var iso = 0;if(number<0){var number = number*(-1);var iso = 1;}var number = parseFloat(number);var abbR = ["", "K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","ODc","NDc","Vi","UVi","DVi","TVi","QaVi","QiVi","SxVi","SpVi","OVi","NVi","Tg","UTg","DTg","TTg","QaTg","QiTg","SxTg","SpTg","OTg","NTg","Qd","UQd","DQd","TQd","QaQd","QiQd","SxQd","SpQd","OQd","NQd","Qq","UQq","DQq","TQq","QaQq","QiQq","SxQq","SpQq","OQq","NQq","Sg","USg","DSg","TSg","QaSg","QiSg","SxSg","SpSg","OSg","NSg","St","USt","DSt","TSt","QaSt","QiSt","SxSt","SpSt","OSt","NSt","Og","UOg","DOg","TOg","QaOg","QiOg","SxOg","SpOg","OOg","NOg"];for(i=0;number>=999;i++){var number = number/1000;}if(iso==1){var number = number*(-1);var iso = 0;}var number = number.toFixed(decPlaces);var number = number + abbR[i];return number;}
function sn2(a){var b = sn(a,2); return b;}
function id2w(a, b){return document.getElementById(a).innerHTML = b;}
function p(a){return a;}
function buypipes(count, water, tier){
	var price = game[water]['pipeprice'][tier];
	if(tier==0){
		if((game.city.house * 2) >= (count + game[water]['pipe'][1]+game[water]['pipe'][0])){
			if(price*count<=game.bank.money){
				game.bank.money = game.bank.money - price*count;
				window['game'][water]['pipe'][tier] = game[water]['pipe'][tier] + count;
				refpipes();
			}
		}
	}
	else{
		if(price*count<=game.bank.money && game[water]['pipe'][0]>=count){
			game.bank.money = game.bank.money - price*count;
			window['game'][water]['pipe'][1] = game[water]['pipe'][1] + count;
			window['game'][water]['pipe'][0] = game[water]['pipe'][0] - count;
			refpipes();
		}
	}	
	refreshcity();
}
function upgrade(where, what, multiplier, price, pricemultiplier, number){
	if(multiplier>1){
		var pricea = window['game']['upgrades']['increase'][price];
	}
	else{
		var pricea = window['game']['upgrades']['decrease'][price];
	}
	if(game.bank.money>=pricea){
		game.bank.money = game.bank.money - pricea;
		if(multiplier>1){
			window['game']['upgrades']['increase'][price] = pricea * pricemultiplier;
		}
		else{
			window['game']['upgrades']['decrease'][price] = pricea * pricemultiplier;
		}
		if(number>1){
			for(i=0;i<number;i++){
				window['game'][where][what][i] = window['game'][where][what][i] * multiplier;
			}
		}
		else{
			window['game'][where][what] = window['game'][where][what] * multiplier;
		}
		id2w("money", sn2(game.bank.money));
	}
	else{
		alert("Not enoug money");
	}
	refreshupgrades();
	refreshwater();
	refreshbank();
	refreshcity();
}
function buy(water, thing, number, tier){
	if(game[water][thing + 'price'][tier]*number<=game.bank.money){
		game.bank.money = game.bank.money - game[water][thing + 'price'][tier]*number;
		game[water][thing][tier] = game[water][thing][tier] + number;
		id2w("money", sn2(game.bank.money));
		refreshwater();
		refreshcity();
	}
	else{
		alert("Not enugh money");
	}
}
function sell(water, thing, number, tier){
	var price = game[water][thing + "price"][tier];
	if(game[water][thing][tier]>=number){
		game[water][thing][tier] = game[water][thing][tier] - number;
		game.bank.money = game.bank.money + number * price;
		refreshwater();
		refreshcity();
		id2w("money", sn2(game.bank.money));
	}
}