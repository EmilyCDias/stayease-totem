
let reservas = [];

fetch('reservas.json')
  .then(response => response.json())
  .then(data => {
    reservas = data;
  });

function showScreen(id){
  document.querySelectorAll('.screen').forEach(screen=>{
    screen.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
}

function buscarReserva(){

  const cpf = document.getElementById('cpf').value;
  const codigo = document.getElementById('codigo').value;

  const reserva = reservas.find(r =>
    r.cpf === cpf && r.reserva === codigo
  );

  if(reserva){

    document.getElementById('nomeHospede').innerText = reserva.nome;
    document.getElementById('quartoHospede').innerText = reserva.quarto;

    showScreen('reserva');

  }else{
    alert('Reserva não encontrada.');
  }
}

function validarRosto(){

  showScreen('face');

  setTimeout(()=>{
    document.getElementById('faceText').innerText =
      'Identidade validada com sucesso';

    setTimeout(()=>{
      showScreen('success');
    },1500);

  },2500);
}

function checkout(){

  alert('Check-out realizado com sucesso.');

  showScreen('home');
}
