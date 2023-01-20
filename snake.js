const axios = require('axios');
const FormData = require('form-data');
const querystring = require('node:querystring');
const readline = require('readline');
const {GlobalKeyboardListener} = require("node-global-key-listener");
const v = new GlobalKeyboardListener();
const { Input, AutoComplete } = require('enquirer');


const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let game_over = false;
let tabl_url = "";
let url_id = "";
let rev = 0;
const table_id = 30710966;
let tab_id = 0;
let cell = {
	inited:false,
	x:0,
	y:0,
	move:function(dx, dy){
		var data = new FormData();
		data.append('rev', rev);
		data.append('selection', '['+table_id+',"[[[\\"'+tab_id+'\\",'+(this.y+dy)+','+(this.x+dx)+'],[[\\"'+tab_id+'\\",'+(this.y+dy)+','+(this.y+dy+1)+','+(this.x+dx)+','+(this.x+dx+1)+']]]]"]');
		this.x += dx;
		this.y += dy;
		if(this.x < 0 || this.y < 0 || this.x > snake.field.x-1 || this.y > snake.field.y-1){
			game_over = true;
			return;
		}
var config = {
  method: 'post',
  url: 'https://docs.google.com/spreadsheets/d/'+url_id+'/selection?id='+url_id+'&sid='+this.sid+'&vc=1&c=1&w=1&flr=0&smv=108&includes_info_params=true&cros_files=false'+(this.token!=""?'&token='+this.token:''),
  headers: { 
    'Pragma': ' no-cache', 
    'Cache-Control': ' no-cache', 
    'sec-ch-ua': ' "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 
    'X-Same-Domain': ' 1', 
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
    'sec-ch-ua-platform': ' "Windows"', 
    'Accept': ' */*', 
    'Origin': ' https://docs.google.com',  
    'Referer': ' https://docs.google.com/spreadsheets/d/'+url_id+'/edit', 
    'Accept-Language': ' ru', 
},
  data : data
};
if(this.cookie != "")
	config.headers['Cookie'] = this.cookie;
axios(config)
.then(function (response) {
	if("\")]}'\\n{}\"" == JSON.stringify(response.data))
		;//console.log("Sucess move")
	else
  		console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
	},
	sid:"",
	cookie:"",
	token:"",
	init:async function(){
		let status = "";
		let res = await axios({
			method: 'get',
			url: tabl_url,
	}).then(async function (response) {
   		//console.log(response.statusText+"+0");
   		if(rev == 0){
   		let tabs = [];
   		JSON.parse(response.data.match(/"topsnapshot"\:.*,"revision"/)[0].substring(14, response.data.match(/"topsnapshot"\:.*,"revision"/)[0].length-11)).map(e => JSON.parse(e[1])).map(e => {if(typeof e[0] == "number" && e[1] == 0)tabs.push([e[3][0][1][0][2],e[2]]);return e;})

   		// Let the user choose one answer
const chooseTab = new AutoComplete({
  name: 'tab',
  message: 'Выбери вкладку',
  limit: 50,
  initial: 0,
  choices: tabs.map(e => e[0])
});
		const tab_name = await chooseTab.run();
		tabs.forEach(e => {if(e[0] == tab_name)tab_id = e[1];})
		console.log("Tab id: "+tab_id);

		rev = response.data.match(/"revision":\d+,/g)[0].match(/\d+/g)[0];
   		console.log("Revision: "+rev);
   	}
   		let id = response.data.match(/"sid":"\w+"/g)[0].match(/\w{5}\w+/)[0];

   		let cookie = response.headers['set-cookie'].join(' ');
   		
   		let core_url = response.data.match(/"core":\["\/static\/spreadsheets2\/client\/js\/[^\]]*\.js"\]/g)[0].match(/"[^"]{5}[^"]*"/g)[0].replaceAll("\"","");
   		
   		let res = [id, cookie];

   		axios({url:'https://docs.google.com/spreadsheets/d/'+url_id+'/bind?id='+url_id+'&sid='+id+'&includes_info_params=true&cros_files=false&VER=8&lsq=-1&u='+response.data.match(/"oui":"ANONYMOUS_\d+"/gi)[0].match(/ANONYMOUS_\d+/g)[0]+'&vc=1&c=1&w=1&gsi&smv=108&flr=0&RID=55646&CI=1&AID=0&TYPE=xmlhttp&zx=jdun7ho1uhwd&t=1',
   			method:"post",
   			headers:{
   				'Cookie':cookie,
   				'X-Same-Domain':1
   			},
   			data:querystring.stringify({'count':0})
   		})
   		.then(function (response1) {
   		
   			//console.log(response1.statusText+"+1");
   	})
   	.catch(function (error) {
  		console.log(error.code);
  		console.log("-1");
});

   	return res;
})
.catch(function (error) {
  		console.log(error);
  		status = error.code;
  		console.log("-0");
});

this.sid = res[0];
this.cookie = res[1];
this.inited = true;
return "inited";
	},
};



let snake = {
	field:{
		x:0,
		y:0
	},
	dir:"r",
	adding:false,
	speed:1000,
	cells:[],
	move:function(direction){
		let dx = 0;
		let dy = 0;
		if(direction == null)
			direction = this.dir;
		switch(direction.toLowerCase()){
			case 'u': case 'up':dy = -1;break; 
			case 'd': case 'down':dy = 1;break;
			case 'r': case 'right':dx = 1;break; 
			case 'l': case 'left':dx = -1;break; 
		}
		let lasts = [0,0];
		for(let i = 0; i < this.cells.length; i++){
			if(game_over){
				console.log("Вы проиграли");
				break;
			}
			let buff;
			if(i == 0){
				buff = [this.cells[i].x, this.cells[i].y];
				this.cells[i].move(dx, dy);
				if(this.cells[i].x == this.food.x && this.cells[i].y == this.food.y)
					this.food.eat();
				if(this.cells.some((e,indx) => indx != i && e.x == this.cells[i].x && e.y == this.cells[i].y)){
					game_over = true;
					console.log("Вы проиграли");
					break;
				}
			}
			else
				if(this.cells[i].inited && lasts && (lasts.x != this.cells[i].x || lasts.y != this.cells[i].y)){
					//console.log("Moving: "+i)
					buff = [this.cells[i].x, this.cells[i].y];
					this.cells[i].move(lasts[0] - this.cells[i].x, lasts[1] - this.cells[i].y);
				}
			lasts = buff;
		}
			
	},
	addCell:async function(){
		this.cells.push(Object.assign({}, cell));
		console.log("Status: "+await this.cells[this.cells.length-1].init());
		if(this.cells.length > 1)
			this.cells[this.cells.length-1].move(this.cells[this.cells.length-2].x, this.cells[this.cells.length-2].y);
		else
			this.cells[this.cells.length-1].move(1,1);
		console.log("New length: "+this.cells.length)
		return this.cells[this.cells.length-1];
	},
	changeDirectionWASD:function(newDir){
		if(this.dir.match(/[rl]/)){
			if(newDir.match(/[ws]/)){
				this.dir = newDir == "w"?"u":"d";
				//console.log("new dir: "+this.dir);
			}
		}else
			if(newDir.match(/[ad]/)){
				this.dir = newDir == "d"?"r":"l";
				//console.log("new dir: "+this.dir);
			}
	},
	food:{
		x:0,
		y:0,
		init:async function(){
			let status = "";
			let res = await axios({
				method: 'get',
				url: tabl_url,
	}).then(async function (response) {

   		//console.log(response.statusText+"+0");

   		let id = response.data.match(/"sid":"\w+"/g)[0].match(/\w{5}\w+/)[0];

   		let cookie = response.headers['set-cookie'].join(' ');

   		let res = [id, cookie];

   		axios({url:'https://docs.google.com/spreadsheets/d/'+url_id+'/bind?id='+url_id+'&sid='+id+'&includes_info_params=true&cros_files=false&VER=8&lsq=-1&u='+response.data.match(/"oui":"ANONYMOUS_\d+"/gi)[0].match(/ANONYMOUS_\d+/g)[0]+'&vc=1&c=1&w=1&gsi&smv=108&flr=0&RID=55646&CI=1&AID=0&TYPE=xmlhttp&zx=jdun7ho1uhwd&t=1',
   			method:"post",
   			headers:{
   				'Cookie':cookie,
   				'X-Same-Domain':1
   			},
   			data:querystring.stringify({'count':0})
   		})
   		.then(function (response1) {
   			//console.log(response1.statusText+"+1");
   	})
   	.catch(function (error) {
  		console.log(error.code);
  		console.log("-1");
});
   	return res;
})
.catch(function (error) {
  		console.log(error.code);
  		status = error.code;
  		console.log("-0");
});

this.sid = res[0];
this.cookie = res[1];
this.eat();
return "inited";
		},
		eat:function(){
			snake.addCell();
			let new_x = rnd(0,snake.field.x-1);
			let new_y = rnd(0,snake.field.y-1);
			while(snake.cells.some(e => e.x == new_x && e.y == new_y)){
				new_x = rnd(0,snake.field.x-1);
				new_y = rnd(0,snake.field.y-1);
			}
			console.log("new food place: "+new_x+" "+new_y);
			this.x = new_x;
			this.y = new_y;
		var data = new FormData();
		data.append('rev', rev);
		data.append('selection', '['+table_id+',"[[[\\"'+tab_id+'\\",'+new_y+','+new_x+'],[[\\"'+tab_id+'\\",'+new_y+','+(new_y+1)+','+new_x+','+(new_x+1)+']]]]"]');

var config = {
  method: 'post',
  url: 'https://docs.google.com/spreadsheets/d/'+url_id+'/selection?id='+url_id+'&sid='+this.sid+'&vc=1&c=1&w=1&flr=0&smv=108&includes_info_params=true&cros_files=false',
  headers: { 
    'Pragma': ' no-cache', 
    'Cache-Control': ' no-cache', 
    'sec-ch-ua': ' "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 
    'X-Same-Domain': ' 1', 
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
    'sec-ch-ua-platform': ' "Windows"', 
    'Accept': ' */*', 
    'Origin': ' https://docs.google.com',  
    'Referer': ' https://docs.google.com/spreadsheets/d/'+url_id+'/edit', 
    'Accept-Language': ' ru', 
},
  data : data
};
if(this.cookie != "")
	config.headers['Cookie'] = this.cookie;

axios(config)
.then(function (response) {
	if("\")]}'\\n{}\"" == JSON.stringify(response.data))
		;//console.log("Sucess move food")
	else
  		console.log(response.data);
})
.catch(function (error) {
  console.log(error);
  console.log("Food error");
});
	
		}
	}
};


game();

async function game(){
const askUrl = new Input({
  name: 'url',
  message: 'Ссылка на таблицу'
});
tabl_url = await askUrl.run();
url_id = tabl_url.match(/\/d\/[^/]+\//g)[0].substring(3).replace("/","");
const askHeight = new Input({
  name: 'height',
  message: 'Высота поля'
});
const askWidth = new Input({
  name: 'width',
  message: 'Ширина поля (Hex)'
});
snake.field.y = parseInt(await askHeight.run(),10);
snake.field.x = (await askWidth.run()).toUpperCase().charCodeAt(0)-64; 
console.log("Размер поля: "+snake.field.x+"x"+snake.field.y);
await snake.addCell();
setTimeout(async function(){console.log("Food: "+await snake.food.init());},300);
await snake.addCell();
snake.move("right");

console.log("Listening WASD global");
	let adding = false;
	tick(snake.speed);
	function tick(time){
		setTimeout(()=>{
			if(game_over)
				return;
			if(!adding){
				snake.move();
				tick(snake.speed);
			}else
				tick(snake.speed/4);
		}, time)
}
v.addListener(async function (e, down) {
	if(e.state == "DOWN"){
	if(e.name.match(/^[WASD]$/))
		snake.changeDirectionWASD(e.name.toLowerCase());
	if(e.name == "R")
		snake.food.eat();
	if(e.name == "NUMPAD PLUS"){
		snake.speed += 50;
		console.log("new speed: "+snake.speed)
	}
	if(e.name == "NUMPAD MINUS"){
		snake.speed -= 50;
		console.log("new speed: "+snake.speed)
	}
	if(e.name == "RIGHT SHIFT"){
		adding = true;
		await snake.addCell();
		adding = false;
	}
	}

});
}
function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// function add(x, y, ishead){
// axios({
// 	method: 'get',
// 	url: tabl_url,
// }).then(function (response) {
// 	console.log(response.status);
//    	console.log(response.statusText);
//    	//console.log(response.data);
//    	console.log(response.headers);
//    	console.log(response.data.match(/"sid":"\w+"/g));
//    	let id = response.data.match(/"sid":"\w+"/g)[0].match(/\w{5}\w+/)[0];
//    	console.log(response.headers['set-cookie']);
//    	let cookie = response.headers['set-cookie'].join(' ');
//    	console.log(response.data.match(/"oui":"ANONYMOUS_\d+"/gi)[0].match(/ANONYMOUS_\d+/g)[0]);
//    	console.log('https://docs.google.com/spreadsheets/d/'+url_id+'/bind?id='+url_id+'&sid='+id+'&includes_info_params=true&cros_files=false&VER=8&lsq=-1&u='+response.data.match(/"oui":"ANONYMOUS_\d+"/gi)[0].match(/ANONYMOUS_\d+/g)[0]+'&vc=1&c=1&w=1&flr=0&gsi&ssfi=217&smv=108&cimpl=0&RID=rpc&CI=1&AID=0&TYPE=xmlhttp&zx=jdun7ho1uhwd&t=1');
//    	axios({url:'https://docs.google.com/spreadsheets/d/'+url_id+'/bind?id='+url_id+'&sid='+id+'&includes_info_params=true&cros_files=false&VER=8&lsq=-1&u='+response.data.match(/"oui":"ANONYMOUS_\d+"/gi)[0].match(/ANONYMOUS_\d+/g)[0]+'&vc=1&c=1&w=1&gsi&smv=108&flr=0&RID=55646&CI=1&AID=0&TYPE=xmlhttp&zx=jdun7ho1uhwd&t=1',
//    		method:"post",headers:{'Cookie':cookie, 'X-Same-Domain':1}, data:querystring.stringify({'count':0})})
//    	.then(function (response) {
   		
//    		console.log(response.statusText);
//    		console.log(response.data);
//    		console.log("+");
//    		select(x,y,id,"",cookie, ishead);
//    	})
//    	.catch(function (error) {
//   		console.log(error);
//   		console.log("-1");
// });
   	
// })
// .catch(function (error) {
//   		console.log(error.code);
//   		console.log("-0");
// });
// }
// //select(coords.x, coords.y, id, "AC4w5VibmMX9ORB5-CuA-VF8QuC7-_fj2A:1673195271639", ' S=apps-spreadsheets=iGTF5cn2eQVslIjaOUE4W_lQHWbmphgqlQusmm79LcQ; COMPASS=apps-spreadsheets=Ck8ACWuJV9fSj3CK1GC4NdDMNeQXXzzzF0RfCzGke8wiR2GIMc5lHzP2O9msunmsT9hZ56L277ijDbweb_abf5WYOB11CmATk7aHHadpPRmJELKNmpwGGlEACWuJV23OJwL4TypCPwvuRcSOnD2rs4qZDud017dlO6yrCZFycQ31YmIzZOkPe0tt10ew514Wt-NkeqRoP_GqIonmddQgkaj5yBIFk2MMRDc=; NID=511=IdfjN1DmxcIWauZ3Wf35euQBsv2jjsx2YKYr8pYhwMVwq50HXNVJSrauPlOQWwrDhdwTFHPvuIJlaDuDw1PjKAr-ecNimoUvyYfBhh4hMbDCnnfjXrujFnu5Wa8T3yNtAAYtHoUUrvtS_xDrNe2E-QE3_7Xp_un5JoekrXw0F1E; lbcs=4; S=apps-spreadsheets=6WvTOjpEs4xS8MSathDm31s_RVtf6BPrYuo7XTDXV34; COMPASS=apps-spreadsheets=CmUACWuJVyiQVEeskDL78omyOpUMER9_S09ThQ3A-zm1MD6tueHcMZZRs_qGvoGRAi1azyN4el6D83_NnbA6_8Kf-kiKlRkKHtiNHY6ohyU62KawFIIkqQ6z58PTtkOsF3L8pB8mnxDm-uudBhpnAAlriVecPs8kpbeBROzSjYykeD1mnHDGm4vD7o2d8EBSTV1dUB8jfePvtCuK2hsMj6izENR9H0u8IaGHgWxI3BDkQrl1ju5rW9UMw4ATDIwuFWlNP6ho8HEyDhDCOqdIDL5Nqq3i3g==; HSID=ADgS3vl0BCvJf8pl6; SSID=AApk5TnGscjEFJSnm; APISID=hgxII5jWYJ3ujwS1/AYGt_E1YNSqOsEUKz; SAPISID=KTLW-CYB-x88CIQc/AAcX6VFAurgxCiyVO; __Secure-1PAPISID=KTLW-CYB-x88CIQc/AAcX6VFAurgxCiyVO; __Secure-3PAPISID=KTLW-CYB-x88CIQc/AAcX6VFAurgxCiyVO; __Secure-ENID=8.SE=OeEmLTlGlIwaiekzdMUKB78nq83-Z-c9tCJUd26HZ5ZTq-3HmD13pBxSM6ikqlay_TOmZPXdIX840e2wsKgPSL5jYjSQq7Q_Tchi_t2E6J08vkCVmzF1GxtJpQE7os1H8GBwd8hSRk0ncI8XLghmOn4VjxU7b1Zx5K3zy_tep0JnKDUhzczPtBcj34UsdsS553fdowZrvQ5Jye1MNAva2g; SID=RghBUaVCroWv-x223g2j_JTWjrGt1uCWBVAp5uIv-nHVScEQa04hpR3ciJSNjca0XncxQA.; __Secure-1PSID=RghBUaVCroWv-x223g2j_JTWjrGt1uCWBVAp5uIv-nHVScEQywKQ1OkHZfLQn_aycnyIRw.; __Secure-3PSID=RghBUaVCroWv-x223g2j_JTWjrGt1uCWBVAp5uIv-nHVScEQ9ZEcFW7kA7fcN2j4sAdsZw.; S=billing-ui-v3=JwthdcL--zRdH-5T8cc0dqnDblORFxgV:billing-ui-v3-efe=JwthdcL--zRdH-5T8cc0dqnDblORFxgV; 1P_JAR=2023-01-05-13; AEC=AakniGNFNdzAS050JMYaYBWpT0m8IGVNkOzy-epa0uNQ2gn_0ZlMjs9FRFU; NID=511=XQY4fPJ6NffV1ZFAV5hnNCnB80Q-oQYJRkfvG0AQpU5hrPvGK8KY6HM039DsaihS5zlYtdO9yPDJUoFdcEzadLlDwRDjtGap2rUSnZxVXob-3DNotCSnc1R0xWt4KM1kgv19jNXuRuiJ2koYOTni2W-ZVNRGd_W9lPti66qnb-m4cp2WzDGohO0Pg6gf6MkG1-YXBLLnF2bRY5UhQkMwDsPpYmFrn0YfAPHOSXGDGbAhjJ6c9bl3ezhqzr0fVwFc0QbnrNo8I88; lbcs=5; SIDCC=AIKkIs1r_SCqFmig9Tf170xdbTDyVljOg7iwVmRz7-j9LymbKXYZ8jEIT73Xu5l4do2t6wCV1Y0; __Secure-1PSIDCC=AIKkIs26M6R9-Q3ciRfxFh173qb2Jd50hgotmUY0EM3nNd85sY1JhdJ-r3uzztvxzswUMKacQYU; __Secure-3PSIDCC=AIKkIs3EsY1qPlI-cKS_S3MMYwF-95N2Rk-FxBCxbx9G6-ViZVuU4MRVVwvPGVk7kr313GI8Ma9R'
// //  );
// function select(x, y, id, token, cookie, ishead){
// 	console.log(x+" "+y)
// var data = new FormData();
// data.append('rev', '4068');
// data.append('selection', '[30710966,"[[[\\"923714611\\",'+x+','+y+'],[[\\"923714611\\",'+x+','+(x+1)+','+y+','+(y+1)+']]]]"]');

// var config = {
//   method: 'post',
//   url: 'https://docs.google.com/spreadsheets/d/'+url_id+'/selection?id='+url_id+'&sid='+id+'&vc=1&c=1&w=1&flr=0&smv=108&includes_info_params=true&cros_files=false'+(token!=""?'&token='+token:''),
//   headers: { 
//     'Pragma': ' no-cache', 
//     'Cache-Control': ' no-cache', 
//     'sec-ch-ua': ' "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"', 
//     'X-Same-Domain': ' 1', 
//     'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
//     'sec-ch-ua-platform': ' "Windows"', 
//     'Accept': ' */*', 
//     'Origin': ' https://docs.google.com',  
//     'Referer': ' https://docs.google.com/spreadsheets/d/'+url_id+'/edit', 
//     'Accept-Language': ' ru', 
//     'Cookie': cookie
// },
//   data : data
// };
// //console.log(data.getHeaders());
// axios(config)
// .then(function (response) {
// 	console.log("Sucess")
//   	console.log(response.data);
//   	setTimeout(()=>{
//   		select(x+1, y+1, id, token, cookie, ishead);
//   		if(ishead)
//   			add(x, y, false);
// },1000)
// })
// .catch(function (error) {
//   console.log(error);
// });
// }