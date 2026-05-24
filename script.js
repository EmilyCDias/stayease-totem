let reservas = [];
let currentLang = "pt";
let currentReservation = null;

// busca os dados fake
fetch('reservas.json')
  .then(response => response.json())
  .then(data => {
    reservas = data;
  });


// controla troca de telas
function showScreen(id){

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');

  // timeout automático pra voltar ao início
  if(id === 'success'){
    setTimeout(() => {
      showScreen('home');
    },10000);
  }
}


// MULTI IDIOMA
function changeLanguage() {
  const lang = document.getElementById("language").value;
  currentLang = lang;

  const translations = {
    pt: {
      title: "Totem Inteligente de Autoatendimento",
      checkin: "Fazer Check-in",
      checkout: "Fazer Check-out",
      search: "Buscar Reserva",
      success: "Check-in Concluído",
      face: "Analisando identidade...",
      faceOk: "Identidade validada com sucesso"
    },
    en: {
      title: "Smart Self-Service Kiosk",
      checkin: "Check-in",
      checkout: "Check-out",
      search: "Find Reservation",
      success: "Check-in Completed",
      face: "Analyzing identity...",
      faceOk: "Identity validated successfully"
    }
  };

  const t = translations[lang];

  // home
  document.querySelector("#home p").innerText = t.title;
  document.querySelector("#home button:nth-of-type(1)").innerText = t.checkin;
  document.querySelector("#home button:nth-of-type(2)").innerText = t.checkout;

  // checkout label
  const transportLabel = document.getElementById("transportLabel");
  if (transportLabel) {
    transportLabel.innerText =
      lang === "pt"
        ? "Deseja transporte para o aeroporto?"
        : "Do you need airport transportation?";
  }
}


// BUSCA RESERVA
function buscarReserva(){

  const cpf = document
    .getElementById('cpf')
    .value
    .replace(/\D/g,'');

  const codigo = document.getElementById('codigo').value;

  if(!cpf || !codigo){
    alert("Preencha todos os campos");
    return;
  }

  const reserva = reservas.find(r =>
    r.cpf === cpf &&
    r.reserva === codigo
  );

  if(reserva){

    currentReservation = reserva;

    document.getElementById('nomeHospede').innerText =
      reserva.nome;

    document.getElementById('quartoHospede').innerText =
      reserva.quarto;

    // LOCALIZAÇÃO DO QUARTO 
    document.getElementById('localizacaoQuarto').innerText =
      `Andar ${Math.floor(parseInt(reserva.quarto) / 100)} - Ala Principal`;

    showScreen('reserva');

  }else{
    alert('Reserva não encontrada.');
  }
}


// RECONHECIMENTO FACIAL SIMULADO
function validarRosto(){

  showScreen('face');

  const faceText = document.getElementById('faceText');

  setTimeout(() => {

    faceText.innerText =
      currentLang === "pt"
        ? "Identidade validada com sucesso ✔"
        : "Identity validated successfully ✔";

  },2500);

  setTimeout(() => {
    showScreen('success');
  },4000);
}


// CHECKOUT COM TRANSPORTE
function checkout(){

  const transport = document.getElementById("transport").value;

  let message =
    currentLang === "pt"
      ? "Check-out realizado com sucesso."
      : "Check-out completed successfully.";

  if(transport !== "nao"){
    message +=
      currentLang === "pt"
        ? ` Transporte solicitado: ${transport}`
        : ` Transport requested: ${transport}`;
  }

  alert(message);

  showScreen('home');
}


//  MÁSCARA CPF 
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', () => {

  let value = cpfInput.value.replace(/\D/g,'');

  value = value.replace(/(\d{3})(\d)/,'$1.$2');
  value = value.replace(/(\d{3})(\d)/,'$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/,'$1-$2');

  cpfInput.value = value;
});
