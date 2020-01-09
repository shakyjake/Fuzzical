var Fuzzical = function(Input, Haystack){

	var _ = this;
	
	_.Input = Input;
	_.InputChars = _.Input.toLowerCase().split('');
	_.Haystack = Haystack;
	
	_.Map = {
		'1' : ['q', '2'],
		'2' : ['1', 'q', 'w', '3'],
		'3' : ['2', 'w', 'e', '4'],
		'4' : ['3', 'e', 'r', '5'],
		'5' : ['4', 'r', 't', '6'],
		'6' : ['5', 't', 'y', '7'],
		'7' : ['6', 'y', 'u', '8'],
		'8' : ['7', 'u', 'i', '9'],
		'9' : ['8', 'i', 'o', '0'],
		'0' : ['9', 'o', 'p'],
		'q' : ['a', 'w', '2', '1'],
		'w' : ['q', 'a', 's', 'a', '2', '3'],
		'e' : ['w', 's', 'd', 's', '3', '4'],
		'r' : ['e', 'd', 'f', 'd', '4', '5'],
		't' : ['r', 'f', 'g', 'f', '5', '6'],
		'y' : ['t', 'g', 'h', 'g', '6', '7'],
		'u' : ['y', 'h', 'j', 'h', '7', '8'],
		'i' : ['u', 'j', 'k', 'j', '8', '9'],
		'o' : ['i', 'k', 'l', 'k', '9', '0'],
		'p' : ['o', 'l', '0'],
		'a' : ['z', 's', 'w', 'q'],
		's' : ['a', 'z', 'x', 'd', 'e', 'w'],
		'd' : ['s', 'x', 'c', 'f', 'r', 'e'],
		'f' : ['d', 'c', 'v', 'g', 't', 'r'],
		'g' : ['f', 'v', 'b', 'h', 'y', 't'],
		'h' : ['g', 'b', 'n', 'j', 'u', 'y'],
		'j' : ['h', 'n', 'm', 'k', 'i', 'u'],
		'k' : ['j', 'm', 'l', 'o', 'i'],
		'l' : ['k', 'p'],
		'z' : [' ', 'x', 's', 'a'],
		'x' : ['x', ' ', 'c', 'd', 's'],
		'c' : ['c', ' ', 'v', 'f', 'd'],
		'v' : ['v', ' ', 'b', 'g', 'f'],
		'b' : ['b', ' ', 'n', 'h', 'g'],
		'n' : ['n', ' ', 'm', 'j', 'h'],
		'm' : ['m', ' ', 'k', 'j'],
		' ' : ['z', 'x', 'c', 'v', 'b', 'n', 'm']
	};
	
	_.MatchChar = function(UserChar, ToMatch){
		var RE = new RegExp('[' + _.Map[ToMatch].join('') + ']', 'i');
		return RE.test(UserChar);
	};
	
	_.Match = function(Phrase){
		if(_.Input.toLowerCase() === Phrase.toLowerCase()){
			return 1;
		}
		var Score = 0;
		var PhraseChars = Phrase.toLowerCase().split('');
		PhraseChars.forEach(function(Char, Index){
			if(Index < _.InputChars.length){
				if(Char.toLowerCase() === _.InputChars[Index].toLowerCase()){
					Score += 1;/* right character, right place */
					return;
				}
				if(_.MatchChar(_.InputChars[Index], Char)){
					Score += 0.75;/* wrong character, right place */
					return;
				}
			}
			if(Index < _.InputChars.length - 1){
				if(Char.toLowerCase() === _.InputChars[Index + 1].toLowerCase()){
					Score += 0.5;/* right character, wrong place */
					return;
				}
				if(_.MatchChar(_.InputChars[Index + 1], Char)){
					Score += 0.25;/* wrong character, wrong place */
					return;
				}
			}
			if(Index > 0 && (Index + 1) < _.InputChars.length){
				if(Char.toLowerCase() === _.InputChars[Index - 1].toLowerCase()){
					Score += 0.5;/* right character, wrong place */
					return;
				}
				if(_.MatchChar(_.InputChars[Index - 1], Char)){
					Score += 0.25;/* wrong character, wrong place */
					return;
				}
			}
		});
		return Score / Phrase.length;
	};
	
	_.GetMatches = function(){
		if(typeof(_.Haystack) === 'string'){
			return [{
				'Phrase' : _.Haystack,
				'Score' : _.Match(_.Haystack)
			}];
		} else {
			var Results = [];
			_.Haystack.forEach(function(Phrase){
				Results.push({
					'Phrase' : Phrase,
					'Score' : _.Match(Phrase)
				});
			});
			return Results.sort(function(a, b){
				return b.Score - a.Score;
			});
		}
	};
	
	return _.GetMatches();

};
