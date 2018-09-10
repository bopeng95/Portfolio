$(document).ready(function() {
	let stablize = 35;
	$(document).on("keypress", function(e) {
		let r = Math.floor(Math.random()*256);let g = Math.floor(Math.random()*256); let b = Math.floor(Math.random()*256);
		let pos = 50;
		let pos2 = $(".rowZero").position();
		//console.log(e.keyCode);
		if(e.keyCode === 49 || e.keyCode === 33) { pos = $("#one").position(); }
		else if(e.keyCode === 50 || e.keyCode === 64) { pos = $("#two").position(); }
		else if(e.keyCode === 51 || e.keyCode === 35) { pos = $("#three").position(); }
		else if(e.keyCode === 52 || e.keyCode === 36) { pos = $("#four").position(); }
		else if(e.keyCode === 53 || e.keyCode === 37) { pos = $("#five").position(); }
		else if(e.keyCode === 54 || e.keyCode === 94) { pos = $("#six").position(); }
		else if(e.keyCode === 55 || e.keyCode === 38) { pos = $("#seven").position(); }
		else if(e.keyCode === 56 || e.keyCode === 42) { pos = $("#eight").position(); }
		else if(e.keyCode === 57 || e.keyCode === 40) { pos = $("#nine").position(); }
		else if(e.keyCode === 41 || e.keyCode === 48) { pos = $("#zero").position(); }
		else if(e.keyCode === 126 || e.keyCode === 96) { pos = $("#tick").position(); }
		else if(e.keyCode === 45 || e.keyCode === 95) { pos = $("#dash").position(); }
		else if(e.keyCode === 61 || e.keyCode === 43) { pos = $("#equal").position(); }

		else if(e.keyCode === 113 || e.keyCode === 81) { pos = $("#q").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 119 || e.keyCode === 87) { pos = $("#w").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 101 || e.keyCode === 69) { pos = $("#e").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 114 || e.keyCode === 82) { pos = $("#r").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 116 || e.keyCode === 84) { pos = $("#t").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 121 || e.keyCode === 89) { pos = $("#y").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 117 || e.keyCode === 85) { pos = $("#u").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 105 || e.keyCode === 73) { pos = $("#i").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 111 || e.keyCode === 79) { pos = $("#o").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 112 || e.keyCode === 80) { pos = $("#p").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 123 || e.keyCode === 91) { pos = $("#sqr-left").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 125 || e.keyCode === 93) { pos = $("#sqr-right").position(); pos2 = $(".rowOne").position(); }
		else if(e.keyCode === 124 || e.keyCode === 92) { pos = $("#back-dash").position(); pos2 = $(".rowOne").position(); }

		else if(e.keyCode === 97 || e.keyCode === 65) { pos = $("#a").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 115 || e.keyCode === 83) { pos = $("#s").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 100 || e.keyCode === 68) { pos = $("#d").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 102 || e.keyCode === 70) { pos = $("#f").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 103 || e.keyCode === 71) { pos = $("#g").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 104 || e.keyCode === 72) { pos = $("#h").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 106 || e.keyCode === 74) { pos = $("#j").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 107 || e.keyCode === 75) { pos = $("#k").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 108 || e.keyCode === 76) { pos = $("#l").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 59 || e.keyCode === 58) { pos = $("#semi").position(); pos2 = $(".rowTwo").position(); }
		else if(e.keyCode === 39 || e.keyCode === 34) { pos = $("#quote").position(); pos2 = $(".rowTwo").position(); }

		else if(e.keyCode === 122 || e.keyCode === 90) { pos = $("#z").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 120 || e.keyCode === 88) { pos = $("#x").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 99 || e.keyCode === 67) { pos = $("#c").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 118 || e.keyCode === 86) { pos = $("#v").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 98 || e.keyCode === 66) { pos = $("#b").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 110 || e.keyCode === 78) { pos = $("#n").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 109 || e.keyCode === 77) { pos = $("#m").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 44 || e.keyCode === 60) { pos = $("#comma").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 46 || e.keyCode === 62) { pos = $("#period").position(); pos2 = $(".rowThree").position(); }
		else if(e.keyCode === 47 || e.keyCode === 63) { pos = $("#forward-dash").position(); pos2 = $(".rowThree").position(); }

		let x = pos.left + pos2.left + stablize + 'px';
		let y = pos2.top + stablize + 'px';
		if(e.keyCode === 32) { x = '49%'; y = '92%'}
		if(e.keyCode === 13) { x = '92%'; y = '74%'}
		let elem = '<div class="circle" '+
		'style="position:absolute;'+
		'top:'+y+';left:'+x+';border:5px solid rgb('+r+','+g+','+b+');"></div>';
		$(elem).appendTo("#main").animate({width:'500px', height:'500px', opacity: 0}, 900, "linear", function() { 
			$(this).remove();
		});;
	});
	$(document).on('keyup keypress', function(e) {
		if(e.type=="keypress") {
			if(e.keyCode === 113 || e.keyCode === 81) { $("#q").addClass('active');$("#q").addClass('scale')}
			else if(e.keyCode === 119 || e.keyCode === 87) { $("#w").addClass('active');$("#w").addClass('scale'); }
			else if(e.keyCode === 101 || e.keyCode === 69) { $("#e").addClass('active');$("#e").addClass('scale'); }
			else if(e.keyCode === 114 || e.keyCode === 82) { $("#r").addClass('active');$("#r").addClass('scale'); }
			else if(e.keyCode === 116 || e.keyCode === 84) { $("#t").addClass('active');$("#t").addClass('scale'); }
			else if(e.keyCode === 121 || e.keyCode === 89) { $("#y").addClass('active');$("#y").addClass('scale'); }
			else if(e.keyCode === 117 || e.keyCode === 85) { $("#u").addClass('active');$("#u").addClass('scale'); }
			else if(e.keyCode === 105 || e.keyCode === 73) { $("#i").addClass('active');$("#i").addClass('scale'); }
			else if(e.keyCode === 111 || e.keyCode === 79) { $("#o").addClass('active');$("#o").addClass('scale'); }
			else if(e.keyCode === 112 || e.keyCode === 80) { $("#p").addClass('active');$("#p").addClass('scale'); }
			else if(e.keyCode === 49 || e.keyCode === 33) { $("#one").addClass('active');$("#one").addClass('scale'); }
			else if(e.keyCode === 50 || e.keyCode === 64) { $("#two").addClass('active');$("#two").addClass('scale'); }
			else if(e.keyCode === 51 || e.keyCode === 35) { $("#three").addClass('active');$("#three").addClass('scale'); }
			else if(e.keyCode === 52 || e.keyCode === 36) { $("#four").addClass('active');$("#four").addClass('scale'); }
			else if(e.keyCode === 53 || e.keyCode === 37) { $("#five").addClass('active');$("#five").addClass('scale'); }
			else if(e.keyCode === 54 || e.keyCode === 94) { $("#six").addClass('active');$("#six").addClass('scale'); }
			else if(e.keyCode === 55 || e.keyCode === 38) { $("#seven").addClass('active');$("#seven").addClass('scale'); }
			else if(e.keyCode === 56 || e.keyCode === 42) { $("#eight").addClass('active');$("#eight").addClass('scale'); }
			else if(e.keyCode === 57 || e.keyCode === 40) { $("#nine").addClass('active');$("#nine").addClass('scale'); }
			else if(e.keyCode === 41 || e.keyCode === 48) { $("#zero").addClass('active');$("#zero").addClass('scale'); }
			else if(e.keyCode === 97 || e.keyCode === 65) { $("#a").addClass('active');$("#a").addClass('scale'); }
			else if(e.keyCode === 115 || e.keyCode === 83) { $("#s").addClass('active');$("#s").addClass('scale'); }
			else if(e.keyCode === 100 || e.keyCode === 68) { $("#d").addClass('active');$("#d").addClass('scale'); }
			else if(e.keyCode === 102 || e.keyCode === 70) { $("#f").addClass('active');$("#f").addClass('scale'); }
			else if(e.keyCode === 103 || e.keyCode === 71) { $("#g").addClass('active');$("#g").addClass('scale'); }
			else if(e.keyCode === 104 || e.keyCode === 72) { $("#h").addClass('active');$("#h").addClass('scale'); }
			else if(e.keyCode === 106 || e.keyCode === 74) { $("#j").addClass('active');$("#j").addClass('scale'); }
			else if(e.keyCode === 107 || e.keyCode === 75) { $("#k").addClass('active');$("#k").addClass('scale'); }
			else if(e.keyCode === 108 || e.keyCode === 76) { $("#l").addClass('active');$("#l").addClass('scale'); }
			else if(e.keyCode === 122 || e.keyCode === 90) { $("#z").addClass('active');$("#z").addClass('scale'); }
			else if(e.keyCode === 120 || e.keyCode === 88) { $("#x").addClass('active');$("#x").addClass('scale'); }
			else if(e.keyCode === 99 || e.keyCode === 67) { $("#c").addClass('active');$("#c").addClass('scale'); }
			else if(e.keyCode === 118 || e.keyCode === 86) { $("#v").addClass('active');$("#v").addClass('scale'); }
			else if(e.keyCode === 98 || e.keyCode === 66) { $("#b").addClass('active');$("#b").addClass('scale'); }
			else if(e.keyCode === 110 || e.keyCode === 78) { $("#n").addClass('active');$("#n").addClass('scale'); }
			else if(e.keyCode === 109 || e.keyCode === 77) { $("#m").addClass('active');$("#m").addClass('scale'); }
		} else if(e.type=="keyup"){
			if(e.keyCode === 113 || e.keyCode === 81) { $("#q").removeClass('active');$("#q").removeClass('scale') }
			else if(e.keyCode === 119 || e.keyCode === 87) { $("#w").removeClass('active');$("#w").removeClass('scale'); } 
			else if(e.keyCode === 101 || e.keyCode === 69) { $("#e").removeClass('active');$("#e").removeClass('scale'); } 
			else if(e.keyCode === 114 || e.keyCode === 82) { $("#r").removeClass('active');$("#r").removeClass('scale'); }
			else if(e.keyCode === 116 || e.keyCode === 84) { $("#t").removeClass('active');$("#t").removeClass('scale'); }
			else if(e.keyCode === 121 || e.keyCode === 89) { $("#y").removeClass('active');$("#y").removeClass('scale'); }
			else if(e.keyCode === 117 || e.keyCode === 85) { $("#u").removeClass('active');$("#u").removeClass('scale'); }
			else if(e.keyCode === 105 || e.keyCode === 73) { $("#i").removeClass('active');$("#i").removeClass('scale'); }
			else if(e.keyCode === 111 || e.keyCode === 79) { $("#o").removeClass('active');$("#o").removeClass('scale'); }
			else  if(e.keyCode === 112 || e.keyCode === 80) { $("#p").removeClass('active');$("#p").removeClass('scale'); }
			else if(e.keyCode === 49 || e.keyCode === 33) { $("#one").removeClass('active');$("#one").removeClass('scale'); }
			else if(e.keyCode === 50 || e.keyCode === 64) { $("#two").removeClass('active');$("#two").removeClass('scale'); }
			else if(e.keyCode === 51 || e.keyCode === 35) { $("#three").removeClass('active');$("#three").removeClass('scale'); }
			else if(e.keyCode === 52 || e.keyCode === 36) { $("#four").removeClass('active');$("#four").removeClass('scale'); }
			else if(e.keyCode === 53 || e.keyCode === 37) { $("#five").removeClass('active');$("#five").removeClass('scale'); }
			else if(e.keyCode === 54 || e.keyCode === 94) { $("#six").removeClass('active');$("#six").removeClass('scale'); }
			else if(e.keyCode === 55 || e.keyCode === 38) { $("#seven").removeClass('active');$("#seven").removeClass('scale'); }
			else if(e.keyCode === 56 || e.keyCode === 42) { $("#eight").removeClass('active');$("#eight").removeClass('scale'); }
			else if(e.keyCode === 57 || e.keyCode === 40) { $("#nine").removeClass('active');$("#nine").removeClass('scale'); }
			else if(e.keyCode === 41 || e.keyCode === 48) { $("#zero").removeClass('active');$("#zero").removeClass('scale'); }
			else if(e.keyCode === 97 || e.keyCode === 65) { $("#a").removeClass('active');$("#a").removeClass('scale'); }
			else if(e.keyCode === 115 || e.keyCode === 83) { $("#s").removeClass('active');$("#s").removeClass('scale'); }
			else if(e.keyCode === 100 || e.keyCode === 68) { $("#d").removeClass('active');$("#d").removeClass('scale'); }
			else if(e.keyCode === 102 || e.keyCode === 70) { $("#f").removeClass('active');$("#f").removeClass('scale'); }
			else if(e.keyCode === 103 || e.keyCode === 71) { $("#g").removeClass('active');$("#g").removeClass('scale'); }
			else if(e.keyCode === 104 || e.keyCode === 72) { $("#h").removeClass('active');$("#h").removeClass('scale'); }
			else if(e.keyCode === 106 || e.keyCode === 74) { $("#j").removeClass('active');$("#j").removeClass('scale'); }
			else if(e.keyCode === 107 || e.keyCode === 75) { $("#k").removeClass('active');$("#k").removeClass('scale'); }
			else if(e.keyCode === 108 || e.keyCode === 76) { $("#l").removeClass('active');$("#l").removeClass('scale'); }
			else if(e.keyCode === 122 || e.keyCode === 90) { $("#z").removeClass('active');$("#z").removeClass('scale'); }
			else if(e.keyCode === 120 || e.keyCode === 88) { $("#x").removeClass('active');$("#x").removeClass('scale'); }
			else if(e.keyCode === 99 || e.keyCode === 67) { $("#c").removeClass('active');$("#c").removeClass('scale'); }
			else if(e.keyCode === 118 || e.keyCode === 86) { $("#v").removeClass('active');$("#v").removeClass('scale'); }
			else if(e.keyCode === 98 || e.keyCode === 66) { $("#b").removeClass('active');$("#b").removeClass('scale'); }
			else if(e.keyCode === 110 || e.keyCode === 78) { $("#n").removeClass('active');$("#n").removeClass('scale'); }
			else if(e.keyCode === 109 || e.keyCode === 77) { $("#m").removeClass('active');$("#m").removeClass('scale'); }
		} 
	});
});