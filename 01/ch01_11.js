let test;
console.log(typeof (test)); //undefined

test = typeof (test) != 'undefined' ? test : 'inital';
console.log(test) //inital