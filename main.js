const form = document.getElementById("flight-search");

form.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector(
    ".load"
  ).innerHTML = `<img src="./images/loading.png" class = "mt 5 text-center"><p class="text-primary ml-3"> Loading...</p> `;
  const dept = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const d_date = document.getElementById("d-date").value;
  const r_date = document.getElementById("r-date").value;
  const a_num = document.getElementById("a-num").value;
  const c_num = document.getElementById("c-num").value;
  const i_num = document.getElementById("i-num").value;
  const cabin = document.getElementById("c-class").value;
  const p_air = document.getElementById("p-air").value;
  const currentDate = new Date();

  if (
    dept.length < 3 ||
    dept.length > 3 ||
    dept == "" ||
    dept !== dept.toUpperCase()
  ) {
    document.getElementById(
      "from"
    ).innerHTML = `<span class="text-danger"> Must be three letters and in uppercase</span>`;
  } else if (
    arrival.length < 3 ||
    arrival.length > 3 ||
    arrival == "" ||
    arrival !== arrival.toUpperCase()
  ) {
    document.getElementById(
      "to"
    ).innerHTML = `<span class="text-danger">Must be three letters and in uppercase</span>`;
  } else if (d_date < currentDate) {
    document.getElementById(
      "departure-date"
    ).innerHTML = `<span class="text-danger"> Date cannot be less than today</span>`;
  } else if (cabin[0] !== cabin[0].toUpperCase()) {
    document.getElementById(
      "cabin"
    ).innerHTML = `<span class="text-danger"> First letter must be in uppercase</span>`;
  } else if (r_date < d_date) {
    document.getElementById(
      "return-date"
    ).innerHTML = `<span class="text-danger"> Date cannot be less than departure date </span>`;
  }

  const flight_dt = {
    departure_city: dept,
    destination_city: arrival,
    departure_date: d_date,
    return_date: r_date
  };
  const search_dt = {
    no_of_adult: a_num,
    no_of_child: c_num,
    no_of_infant: i_num,
    preferred_airline_code: p_air,
    calendar: true,
    cabin: cabin
  };

  axios
    .post("https://www.ije-api.tcore.xyz/v1/flight/search-flight", {
      header: {
        "Content-Type": "application/json",
        cookie: "ayaeh33y1nw4yjtm3fdr0gzq"
      },
      body: { origin_destinations: [flight_dt], search_param: search_dt }
    })
    .then(response => {
      document.querySelectorAll("img").src = "";

      const arrivalDate =
        response.data.body.data.itineraries[0].origin_destinations[0]
          .segments[0].arrival.date;

      const arrivalTime =
        response.data.body.data.itineraries[0].origin_destinations[0]
          .segments[0].arrival.time;

      const departureDate =
        response.data.body.data.itineraries[0].origin_destinations[0]
          .segments[0].departure.date;

      const departureTime =
        response.data.body.data.itineraries[0].origin_destinations[0]
          .segments[0].departure.time;

      const airLine =
        response.data.body.data.itineraries[0].origin_destinations[0]
          .segments[0].marketing_airline.name;

      const pricingCurrency =
        response.data.body.data.itineraries[0].pricing.provider.currency.code;

      const totalAmt =
        response.data.body.data.itineraries[0].pricing.provider.total_fare;

      document.getElementById(
        "rd-date"
      ).innerHTML = `<strong>Departure Date<strong>:  <span class="text-primary">${departureDate}</span>`;
      document.getElementById(
        "rd-time"
      ).innerHTML = `<strong>Departure Time<strong>:  <span class="text-primary">${departureTime}</span>`;
      document.getElementById(
        "ra-date"
      ).innerHTML = `<strong>Arrival Date<strong>:  <span class="text-primary">${arrivalDate}</span>`;
      document.getElementById(
        "ra-time"
      ).innerHTML = `<strong>Arrival Time<strong>:  <span class="text-primary">${arrivalTime}</span>`;
      document.getElementById(
        "d-air"
      ).innerHTML = `<strong>Airline<strong>:  <span class="text-primary">${airLine} </span>`;
      document.getElementById(
        "tAmt"
      ).innerHTML = `<strong>Pricing<strong>: <span class="text-primary">${pricingCurrency}</span> <span class="text-primary">${totalAmt}</span>`;
    });
});
