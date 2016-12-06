var items = 0;
var table = [];

$('.sub').click(function () {
	items = $('.starting').val();
	
	$('.starting').hide();
	getInputs();
});

function getInputs() {
	for (var i = 1; i <= items; i++) {
		$('.inputs').append('<div id="'+i+'" class="line"><span  id="" class="i">'+i+' .</span><input id="inic" class="tableIns" type="number" placeholder="I. Inic."><input id="fin" class="tableIns" type="number" placeholder="I. Fin."><input id="fi" class="tableIns" type="number" placeholder="FI"></div>');
		
	}

	$('.inputs').append('<input class="tableSub" type="submit" value="Registrar">');
}

$('.container').on('click', '.tableSub', function () {

	for (var i = 1; i <= items; i++) {
		var object = {
			i: i,
			intervalo: {
				inicial: parseInt($('#'+i).find('#inic').val()),
				final: parseInt($('#'+i).find('#fin').val())
			},
			fi: parseInt($('#'+i).find('#fi').val())
		};

		table.push(object);
		object = {};
	}

	results();
});


function results() {

	construtor();

	$('.line').hide();
	$('.tableSub').hide();

	$('.container').append('<br><span>Moda: '+moda()+'</span><br><span>Média: '+media()+'</span><br><span>Mediana: '+mediana()+'</span><br><span>Quartil 1: '+q1()+'</span><br><span>Quartil 3: '+q3()+'</span><br><span>Desvio Padrão: '+dp()+'</span><br><span>Aplitude Amostral: '+aa()+'</span><br><br>')
}


// Logics


var tabela = table;

var totais = {
	fi : 0,
	fixi : 0,
	fixi2 : 0
}


function construtor () {

	for (var i = 0 ; i < tabela.length; i++) {
		
		let item = tabela[i];

		item.xi = (item.intervalo.inicial + item.intervalo.final)/2;

		item.fixi = item.fi*item.xi;

		item.xi2 = item.xi*item.xi;

		item.fixi2 = item.fi*item.xi2;

		if(i>0){
			item.otofi = item.fi+tabela[i-1].otofi;
		}else{
			item.otofi = item.fi;
		}

		totais.fi += item.fi;
		totais.fixi += item.fixi;
		totais.fixi2 += item.fixi2;

	}

}


function moda () {
	var posit = 0;
  	var maior = 0;
	
	for (var i = tabela.length - 1; i >= 0; i--) {
		if(tabela[i].fi > maior){
			maior = tabela[i].fi;
			posit = i;
		}	
	}
	return tabela[posit].xi;

};

function media () {
	return totais.fixi/totais.fi;
};

function findChoosenOne(e) {

	for (var i = 0; i < tabela.length; i++) {
		let item = tabela[i];

		if(item.otofi > e){
			var obj = {
				l: item.intervalo.inicial,
				h: item.intervalo.final - item.intervalo.inicial,
				fant: tabela[i-1].otofi,
				fi: item.fi
			}

			return obj;
		}
	}
} 

function mediana () {
	let e = totais.fi/2;

	var obj = findChoosenOne(e);

	return (obj.l + (e - obj.fant) * obj.h)/obj.fi;

}


function q1 () {
	let e = totais.fi/4;

	var obj = findChoosenOne(e);

	return (obj.l + (e - obj.fant) * obj.h)/obj.fi;

}

function q3 () {
	let e = (3*totais.fi)/4;

	var obj = findChoosenOne(e);

	return (obj.l + (e - obj.fant) * obj.h)/obj.fi;

}

function dp () {
	var calc = (totais.fixi2 / totais.fi) - ((totais.fixi / totais.fi) * (totais.fixi / totais.fi))
	return Math.sqrt(calc, 2);
}


function aa () {

	return tabela[tabela.length - 1].intervalo.final - tabela[0].intervalo.inicial;

}