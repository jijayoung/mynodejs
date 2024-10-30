const date = new Date();
const hour = date.getHours();

if(hour<11){
    console.log(`아침`,date,hour);
} else{
    if(hour < 15) {
        console.log(`점심`,date,hour);
    } else {
        console.log(`저녁`,date,hour);
    }
}

