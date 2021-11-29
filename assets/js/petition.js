
if (localStorage.getItem('UserDetails')) {
   authItem.style.display = 'none';
   signHeading.innerText = 'ხელმოწერა'
}

// Show all submited petitions
window.onload = () => getPetitions();

loadBtn.onclick = () => {
   loadBtn.style.display = 'none';
   getPetitions()
}

let submissionCount = 0, usedIdNumbers = [];

async function getPetitions() {
   const domains = await axios.get('assets/js/auth_config.json');
   const axiosInstance = axios.create({
      baseURL: domains.data.DRUPAL_DOMAIN
   })

   const { data: { data } } = await axiosInstance.get(`/jsonapi/webform_submission/legalize_ge_pettition_form?sort=-created&page[offset]=${submissionCount}&page[limit]=20`, {
      headers: {
         "pragma": "no-cache", // Comment this line for testing, otherwise CORS won't let you fetch the data
         "cache-control": "no-cache"
      },
   })

   submissionCount += data.length;

   let fetchedData = '';
   for (const submission of data) {
      const { data: { data } } = await axiosInstance.get(`/webform_rest/legalize_ge_pettition_form/submission/${submission.id}`)

      usedIdNumbers.push(data.personal_number);
      fetchedData += `<li>${data.name} ${data.surname}</li>`
   }
   petitionList.innerHTML += fetchedData;

   if (data.length === 20) loadBtn.style.display = 'inline-block';
}

// Petition submit handler
formPetition.onsubmit = (e) => { sendPetition(e) }

const formDiv = document.querySelector(".form-container");

async function sendPetition(e) {
   e.preventDefault();
   
   let idNumInput = document.querySelector("#personalNumInput").value;
   const hasUniqueId = usedIdNumbers.includes(idNumInput); // Returns true if the inputed ID isn't unique
   const domains = await axios.get('assets/js/auth_config.json');
   const axiosInstance = axios.create({ baseURL: domains.data.DRUPAL_DOMAIN }) 

   if(!hasUniqueId){
      try {
         const accessToken = localStorage.getItem('UserDetails') !== null ? JSON.parse(localStorage.getItem('UserDetails')).token : ""
         const sessionToken = await axiosInstance.get(`/session/token`);
         console.log(sessionToken);

         const config = {
            headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken,
            "X-CSRF-Token": sessionToken.data
            }
         };
         const body = {
            "webform_id": "legalize_ge_pettition_form",
            "name": nameInput.value,
            "surname": surnameInput.value,
            "email": emailInput.value,
            "personal_number": personalNumInput.value,
            "phone_number": phoneNumInput.value,
            "hasSubmited": true
         };

         const response = await axiosInstance.post(`/webform_rest/submit`, body, config);
         if (response.status === 200) {
            setSuccessMsg();
            petitionList.innerHTML = '';
            submissionCount = 0;
            getPetitions();
         }
         formDiv.remove(); // Hide form container elements except success/error message
      } catch (error) {
         if (error) {
            console.log(error);
            setDeniedMsg()
         }
      }
   } else { 
      alert("ამ პირადი ნომრით პეტიციაზე უკვე მოწერილი გაქვთ ხელი");
   }
}

const setSuccessMsg = () => successMessage.classList.add('show');

const setDeniedMsg = () => deniedMessage.classList.add('show');
