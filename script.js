// =====================================
// GEZIN PLANNER - SCRIPT.JS
// =====================================


// =====================
// FIREBASE START
// =====================

const auth = firebase.auth();
const db = firebase.firestore();


// =====================
// PERSONEN KLEUREN
// =====================

const familyColors = {

    "Michael": "#2563eb",
    "Annelies": "#16a34a",
    "Zita": "#9333ea",
    "Iluna": "#ea580c",
    "Zeno": "#dc2626"

};


let currentUser = null;
let currentName = "";
let currentColor = "#777";


// =====================
// LOGIN
// =====================


auth.onAuthStateChanged(function(user){

    currentUser = user;


    if(user){

        herkenPersoon(user.displayName);

        toonProfiel();

    }

});





function login(){

    alert("Login gestart");

    let provider = new firebase.auth.GoogleAuthProvider();


    auth.signInWithPopup(provider)

    .then(function(result){

        alert(
            "Inloggen gelukt: " +
            result.user.displayName
        );

    })

    .catch(function(error){

        alert(
            "Foutcode:\n" +
            error.code +
            "\n\nMelding:\n" +
            error.message
        );

        console.log(error);

    });

}



function logout(){

    auth.signOut();

}




// =====================
// PERSOON
// =====================


function herkenPersoon(naam){


    if(!naam){

        currentName="Zeno";

    }

    else if(naam.includes("Michael")){

        currentName="Michael";

    }

    else if(naam.includes("Annelies")){

        currentName="Annelies";

    }

    else if(naam.includes("Zita")){

        currentName="Zita";

    }

    else if(naam.includes("Iluna")){

        currentName="Iluna";

    }

    else{

        currentName="Zeno";

    }


    currentColor =
    familyColors[currentName];


}
// =====================
// PROFIEL
// =====================


function toonProfiel(){


    let bolletje =

    `
    <span style="
    display:inline-block;
    width:14px;
    height:14px;
    background:${currentColor};
    border-radius:50%;
    margin-right:8px;">
    </span>
    `;



    let naamVeld =
    document.getElementById("profileName");


    if(naamVeld){

        naamVeld.innerHTML =
        bolletje + currentName;

    }



    let emailVeld =
    document.getElementById("profileEmail");


    if(emailVeld){

        emailVeld.innerHTML =
        currentUser.email;

    }



    let foto =
    document.getElementById("profilePhoto");


    if(foto && currentUser.photoURL){

        foto.src =
        currentUser.photoURL;

    }



    let loginKnop =
    document.getElementById("loginButton");


    if(loginKnop){

        loginKnop.style.display="none";

    }



    let logoutKnop =
    document.getElementById("logoutButton");


    if(logoutKnop){

        logoutKnop.style.display="block";

    }


}







// =====================
// KALENDER
// =====================


let calendarDate = new Date();

let selectedDate = null;

let events = [];





function renderCalendar(){


    let calendar =
    document.getElementById("calendar");


    if(!calendar){

        return;

    }


    calendar.innerHTML="";


    let jaar =
    calendarDate.getFullYear();


    let maand =
    calendarDate.getMonth();




    let maandTitel =
    document.getElementById("monthYear");


    if(maandTitel){

        maandTitel.innerHTML =
        calendarDate.toLocaleString(
            "nl-BE",
            {
                month:"long",
                year:"numeric"
            }
        );

    }





    let eersteDag =
    new Date(
        jaar,
        maand,
        1
    ).getDay();



    if(eersteDag===0){

        eersteDag=7;

    }





    let aantalDagen =
    new Date(
        jaar,
        maand+1,
        0
    ).getDate();





    for(let i=1;i<eersteDag;i++){


        let leeg =
        document.createElement("div");


        leeg.className =
        "calendar-day";


        calendar.appendChild(leeg);


    }






    for(let dag=1;dag<=aantalDagen;dag++){


        let vak =
        document.createElement("div");


        vak.className =
        "calendar-day";


        vak.innerHTML =
        "<b>"+dag+"</b>";





        vak.onclick=function(){


            selectedDate =
            new Date(
                jaar,
                maand,
                dag
            );


            openAppointment();


        };





        events.forEach(function(event){


            let datum =
            new Date(event.datum);



            if(

                datum.getDate()===dag &&
                datum.getMonth()===maand &&
                datum.getFullYear()===jaar

            ){


                vak.innerHTML +=

                `
                <div class="event-box"
                style="
                background:${event.kleur};
                color:white;
                padding:5px;
                border-radius:8px;
                margin-top:5px;
                ">

                📌 ${event.titel}

                <br>

                👤 ${event.maker}

                <br>

                ⏰ ${event.start} - ${event.end}

                </div>
                `;


            }


        });




        calendar.appendChild(vak);


    }


}





function nextMonth(){

    calendarDate.setMonth(
        calendarDate.getMonth()+1
    );

    renderCalendar();

}




function previousMonth(){

    calendarDate.setMonth(
        calendarDate.getMonth()-1
    );

    renderCalendar();

}
// =====================
// PROFIEL
// =====================


function toonProfiel(){


    let bolletje =

    `
    <span style="
    display:inline-block;
    width:14px;
    height:14px;
    background:${currentColor};
    border-radius:50%;
    margin-right:8px;">
    </span>
    `;



    let naamVeld =
    document.getElementById("profileName");


    if(naamVeld){

        naamVeld.innerHTML =
        bolletje + currentName;

    }



    let emailVeld =
    document.getElementById("profileEmail");


    if(emailVeld){

        emailVeld.innerHTML =
        currentUser.email;

    }



    let foto =
    document.getElementById("profilePhoto");


    if(foto && currentUser.photoURL){

        foto.src =
        currentUser.photoURL;

    }



    let loginKnop =
    document.getElementById("loginButton");


    if(loginKnop){

        loginKnop.style.display="none";

    }



    let logoutKnop =
    document.getElementById("logoutButton");


    if(logoutKnop){

        logoutKnop.style.display="block";

    }


}







// =====================
// KALENDER
// =====================


let calendarDate = new Date();

let selectedDate = null;

let events = [];





function renderCalendar(){


    let calendar =
    document.getElementById("calendar");


    if(!calendar){

        return;

    }


    calendar.innerHTML="";


    let jaar =
    calendarDate.getFullYear();


    let maand =
    calendarDate.getMonth();




    let maandTitel =
    document.getElementById("monthYear");


    if(maandTitel){

        maandTitel.innerHTML =
        calendarDate.toLocaleString(
            "nl-BE",
            {
                month:"long",
                year:"numeric"
            }
        );

    }





    let eersteDag =
    new Date(
        jaar,
        maand,
        1
    ).getDay();



    if(eersteDag===0){

        eersteDag=7;

    }





    let aantalDagen =
    new Date(
        jaar,
        maand+1,
        0
    ).getDate();





    for(let i=1;i<eersteDag;i++){


        let leeg =
        document.createElement("div");


        leeg.className =
        "calendar-day";


        calendar.appendChild(leeg);


    }






    for(let dag=1;dag<=aantalDagen;dag++){


        let vak =
        document.createElement("div");


        vak.className =
        "calendar-day";


        vak.innerHTML =
        "<b>"+dag+"</b>";





        vak.onclick=function(){


            selectedDate =
            new Date(
                jaar,
                maand,
                dag
            );


            openAppointment();


        };





        events.forEach(function(event){


            let datum =
            new Date(event.datum);



            if(

                datum.getDate()===dag &&
                datum.getMonth()===maand &&
                datum.getFullYear()===jaar

            ){


                vak.innerHTML +=

                `
                <div class="event-box"
                style="
                background:${event.kleur};
                color:white;
                padding:5px;
                border-radius:8px;
                margin-top:5px;
                ">

                📌 ${event.titel}

                <br>

                👤 ${event.maker}

                <br>

                ⏰ ${event.start} - ${event.end}

                </div>
                `;


            }


        });




        calendar.appendChild(vak);


    }


}





function nextMonth(){

    calendarDate.setMonth(
        calendarDate.getMonth()+1
    );

    renderCalendar();

}




function previousMonth(){

    calendarDate.setMonth(
        calendarDate.getMonth()-1
    );

    renderCalendar();

}