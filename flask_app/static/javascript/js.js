function addShadow(element){
    element.classList.add("shadow");
}

function removeShadow(element){
    element.classList.remove("shadow");
}

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

const liveAuthToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhYWUubmFAYmlvbGEuZWR1Iiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI3NzMxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMi0wMi0yNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY0NjM3NzI1NCwibmJmIjoxNjQ2MzcwMDU0fQ.CxKNQ1c9VvmFz4rDgPLWqPjmrjbY5j2EuK_QZMkEUTo";

/* Calling the symptom API  i just changed this to live token*/
const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhYWUubmFAYmlvbGEuZWR1Iiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI3NzMxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMi0wMi0yNyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTY0NjQzMDU5OSwibmJmIjoxNjQ2NDIzMzk5fQ.aYP3eX65-xRCg7HQUGE-msUH5nBnPqdnbx8TZeFgTGE"

const authToken2 ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhYWUubmFAYmlvbGEuZWR1Iiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMDM2NyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMi0wMi0yNyIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjQ2MzY5Mzg0LCJuYmYiOjE2NDYzNjIxODR9.vS51ssGrFyrchD9T67ALgK1F6xjoO088qOWYq4WJGf4"


function createDiagnosisElement(diagnosisObject) {
    console.log(diagnosisObject);
    var newDiagnosis = document.createElement('div');
    const diagnosisName = diagnosisObject.Issue.Name;
    newDiagnosis.innerHTML = diagnosisName;
    newDiagnosis.style.fontSize = "16pt";
    newDiagnosis.style.color = "rgb(73, 77, 82)";
    newDiagnosis.style.textAlign = "left";
    newDiagnosis.style.textIndent = "50px";
    newDiagnosis.style.transitionDelay = "3s";
    const resultElement = document.querySelector('.result');
    console.log(resultElement);
    resultElement.appendChild(newDiagnosis)

}

function deleteOldDiagnosis() {
    const resultElement = document.querySelector('.result');
    resultElement.innerHTML = '';
}

async function searchSymptom(event) {
    deleteOldDiagnosis();
    //getting the event target for the form
    const selectedDiagnosis = event.target[0].value;
    const selectedYear = event.target[1].value;
    const selectedGender = event.target[2].value.toLowerCase();

    var response = await fetch(`https://healthservice.priaid.ch/diagnosis?symptoms=[${selectedDiagnosis}]&gender=${selectedGender}&year_of_birth=${selectedYear}&token=${authToken}&format=json&language=en-gb`);  /* i changed this to live site prev. sandbox*/

    var medData = await response.json();
    console.log(medData);
    const resultElement = document.querySelector('.result');
    //to change the css from js
    resultElement.innerText = "(at your own discretion...)";
    resultElement.style.fontSize = "16pt";
    resultElement.style.textIndent = "20px";
    medData.forEach(data => {
        createDiagnosisElement(data);
    });
}
async function getMedicalJson(){ 
    var response = await fetch(`https://healthservice.priaid.ch/symptoms?format=json&language=en-gb&token=${authToken}`)
    /* i changed this to live site prev. sandbox*/

    var medData = await response.json();

    console.log(medData);
    var symptom = document.getElementById("symptom");
    var option = document.createElement('option')

    for (row in medData){
        newOption = `<option value="${medData[row].ID}">${medData[row].Name}</option>`;
        console.log(newOption);
        symptom.innerHTML += newOption; 
    }

    return medData;
    return false;
};
console.log(getMedicalJson());

// const getDiagnosis = async () => {
//     const request = await fetch(`https://sandbox-healthservice.priaid.ch/diagnosis?format=json&language=en-gb&token=${authToken2}`);
//     const data = await request.json();
//     return data;
// }

//need this for live auth version: 
// function loginMedicalAPI () {
//     var uri = "https://authservice.priaid.ch/login";
//     var secret_key = "";
//     var computedHash = CryptoJS.HmacMD5(uri, secret_key);
//     var computedHashString = computedHash.toString(CryptoJS.enc.Base64);  
// }













// var gender, year, ID;
//             function myFunction(value) {
//                 gender = value;
//             }
//             function func()
//             {
//                 $("#tbody tr").remove();
//                 ID = document.getElementById('ID').value;
//                 year = document.getElementById('year').value;
//                 var dict=['{"id":"' + ID + '","year":"' + year + '","gender":"' + gender + '"}'];
//                 j = JSON.parse(dict);
//                 $.ajax({
//                         type: "POST",
//                         url: "/api/two/result",
//                         contentType: "application/json",
//                         data: JSON.stringify(j),
//                         dataType: "json",
//                         success: function(response) {
//                             row = "";
//                             for(var element in response)
//                             {
//                                 row += "<tr><td>" + response[element] + "</td></tr>";
//                             }
//                             $('#tbody').append(row);
//                         },
//                         error: function(err) {
//                             console.log(err);
//                         }
//                     });
//             }

//             <script>
//                     function getID() {
//                         var result = [];
//                         var options = document.getElementById("mySelect");
//                         var opt;
//                         for (var i=0, iLen=options.length; i<iLen; i++) {
//                             opt = options[i];
//                             if (opt.selected) {
//                                 result.push(opt.value || opt.text);
//                             }
//                         }
//                         var ids=result.join(',');
//                         $("#ID").val(ids);
//                     }