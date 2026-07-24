// =====================================
// GEZIN PLANNER - VOLLEDIGE SCRIPT
// =====================================


// =====================
// GEZINSKLEUREN
// =====================

const familyColors = {

    "Michael": "#2563eb",
    "Annelies": "#16a34a",
    "Zita": "#9333ea",
    "Iluna": "#ea580c",
    "Zeno": "#dc2626"

};





// =====================
// MENU
// =====================


function openMenu(){

    document
    .getElementById("sideMenu")
    .classList.add("open");

}



function closeMenu(){

    document
    .getElementById("sideMenu")
    .classList.remove("open");

}







// =====================
// PAGINA'S
// =====================


function showPage(page){


    document
    .querySelectorAll(".page")
    .forEach(function(p){

        p.classList.add("hidden");

    });



    let gekozen =
    document.getElementById(page);



    if(gekozen){

        gekozen.classList.remove("hidden");

    }



    closeMenu();



    if(page==="agenda"){

        renderCalendar();

    }

}








// =====================
// LOGIN
// =====================


let currentUser = null;

let currentName = "";

let currentColor = "#6b7280";





auth.onAuthStateChanged(function(user){


    currentUser = user;



    if(user){


        bepaalPersoon(user.displayName);



        toonProfiel();


    }
    else{


        currentName="";
        currentColor="#6b7280";


    }


});







function login(){


    let provider =
    new firebase.auth.GoogleAuthProvider();



    auth.signInWithPopup(provider)

    .catch(function(error){

        alert(error.message);

    });


}





function logout(){

    auth.signOut();

}








// =====================
// PERSOON HERKENNEN
// =====================


function bepaalPersoon(naam){


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



    document
    .getElementById("profileName")
    .innerHTML =
    bolletje + currentName;



    document
    .getElementById("profileEmail")
    .innerHTML =
    currentUser.email;



    if(currentUser.photoURL){

        document
        .getElementById("profilePhoto")
        .src =
        currentUser.photoURL;

    }



    document
    .getElementById("loginButton")
    .style.display="none";


    document
    .getElementById("logoutButton")
    .style.display="block";


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



    let year =
    calendarDate.getFullYear();



    let month =
    calendarDate.getMonth();





    document
    .getElementById("monthYear")
    .innerHTML =

    calendarDate.toLocaleString(
        "nl-BE",
        {
            month:"long",
            year:"numeric"
        }
    );







    let start =
    new Date(year,month,1)
    .getDay();



    if(start===0){

        start=7;

    }





    let dagen =
    new Date(year,month+1,0)
    .getDate();







    for(let i=1;i<start;i++){


        let leeg =
        document.createElement("div");


        leeg.className =
        "calendar-day";


        calendar.appendChild(leeg);


    }






    for(let dag=1;dag<=dagen;dag++){


        let vak =
        document.createElement("div");



        vak.className =
        "calendar-day";



        vak.innerHTML =
        "<b>"+dag+"</b>";





        vak.onclick=function(){


            selectedDate =
            new Date(year,month,dag);


            openAppointment();


        };





        events.forEach(function(event){


            let datum =
            new Date(event.datum);



            if(

            datum.getDate()===dag &&
            datum.getMonth()===month &&
            datum.getFullYear()===year

            ){


                vak.innerHTML +=

                `
                <div class="event-box"
                style="background:${event.kleur}">

                📌 ${event.titel}

                <br>

                ⏰ ${event.start} - ${event.end}

                <br>

                👤 ${event.maker}

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
// AFSPRAAK SCHERM
// =====================


function openAppointment(){


    document
    .getElementById("appointmentPage")
    .classList.remove("hidden");



    document
    .getElementById("appointmentDate")
    .innerHTML =

    selectedDate.toLocaleDateString(
        "nl-BE"
    );


}






function closeAppointment(){


    document
    .getElementById("appointmentPage")
    .classList.add("hidden");


}







function saveAppointment(){


    let titel =
    document
    .getElementById("appointmentTitle")
    .value;



    let beschrijving =
    document
    .getElementById("appointmentDescription")
    .value;



    let start =
    document
    .getElementById("appointmentStart")
    .value;



    let einde =
    document
    .getElementById("appointmentEnd")
    .value;





    if(titel===""){

        alert("Vul een titel in");

        return;

    }







    let nieuweAfspraak = {


        titel:titel,


        beschrijving:beschrijving,


        start:start,


        end:einde,


        datum:selectedDate,



        maker:
        currentName || "Gast",



        kleur:
        currentColor


    };





    events.push(nieuweAfspraak);







    document
    .getElementById("appointmentTitle")
    .value="";



    document
    .getElementById("appointmentDescription")
    .value="";



    document
    .getElementById("appointmentStart")
    .value="";



    document
    .getElementById("appointmentEnd")
    .value="";





    closeAppointment();



    renderCalendar();


}








// =====================
// GEZIN
// =====================


function createFamily(){


    if(!currentUser){

        alert("Log eerst in");

        return;

    }



    let code =
    "GP" + Math.floor(
        1000 + Math.random()*9000
    );





    db.collection("families")
    .add({

        naam:"Mijn gezin",

        code:code,


        leden:[

            currentUser.uid

        ]

    })

    .then(function(doc){



        document
        .getElementById("familyCode")
        .innerHTML = code;



        document
        .getElementById("familyName")
        .innerHTML =
        "Mijn gezin";


    });



}







function joinFamily(){


    let code =

    document
    .getElementById("joinCode")
    .value;



    if(code===""){

        alert("Vul een code in");

        return;

    }




    db.collection("families")

    .where("code","==",code)

    .get()

    .then(function(result){


        if(result.empty){


            alert("Geen gezin gevonden");

            return;


        }



        result.forEach(function(doc){



            doc.ref.update({

                leden:

                firebase.firestore.FieldValue
                .arrayUnion(currentUser.uid)


            });



            alert("Je bent lid van het gezin!");



        });



    });



}
// =====================
// START APP
// =====================


window.onload = function(){


    renderCalendar();


};