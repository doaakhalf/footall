let today = new Date();
let day = today.getDate();
let month= today.getMonth()+1; //January is 0!
let year = today.getFullYear();
 if(day<10){
        day='0'+day
    } 
    if(month<10){
        month='0'+month
    } 

today = year+'-'+month+'-'+day;
document.getElementById('birthdate').setAttribute("max", today);


$("input#birthdate").on("change", function() {
    this.setAttribute(
        "data-date",
        moment(this.value, "YYYY-MM-DD")
        .format( this.getAttribute("data-date-format") )
    )
}).trigger("change")