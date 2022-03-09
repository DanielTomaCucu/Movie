const container = document.querySelector('.container');
const seats =  document.querySelectorAll('.row .seat:not(.occupied)');
const count =  document.getElementById('count');
const total =  document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

//save  selected movie and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}


//Update total and count
function updateSelectedCoount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); 

    const seatsIndes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndes));

    const selectedSeatsCount =  selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText =  selectedSeatsCount * ticketPrice;
    
}

//get data from local storage ans populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length >= 0){
        seats.forEach((seat, index) => {
            if( selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex =  localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    
}

//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice =  e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCoount();
})

//seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCoount();
    }
});
//initial count and total set
updateSelectedCoount();


