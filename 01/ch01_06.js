
//string
console.log(String(52));
console.log(typeof(String(52))); //string
console.log(typeof(52+""));//string
console.log(typeof(`${52}`));//string

//number
console.log(typeof(Number("52")));
console.log(typeof(parseInt("45")));
console.log(typeof(parseFloat("45.23")));

//NnN 
console.log(Number('hello'))//NnN
console.log(isNaN(Number('hello')))// true
