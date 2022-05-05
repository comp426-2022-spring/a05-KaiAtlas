// Focus div based on nav button click
function focusbutton(oneButton){
    document.getElementById('single').setAttribute("class", "hidden")
    document.getElementById('multi').setAttribute("class", "hidden")
    document.getElementById('guess').setAttribute("class", "hidden")
    document.getElementById('home').setAttribute("class", "hidden")
    document.getElementById(oneButton).setAttribute("class", "active")
}
// Flip one coin and show coin image to match result when button clicked
const coin = document.getElementById("single")
coin.addEventListener("click", flipCoin)
function flipCoin(){
    // flip = "FLIPPED"
    // document.getElementById("coin").innerHTML = flip
    // console.log("Coin has been flipped. Result: "+flip)
    fetch('http://localhost:5000/app/flip/', {mode:'cors'}).then(function(response){
        return response.json();
    })
    .then(function(something){
        console.log(something)
        document.getElementById("result").innerHTML=something.flip
        document.getElementById("quarter").setAttribute("src", something.flip+".png")
        coin.disabled = true
    })
}
// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
const coins = document.getElementById("coins")
			// Add event listener for coins form
			coins.addEventListener("submit", flipCoins)
			// Create the submit handler
			async function flipCoins(event) {
				event.preventDefault();
				
				const endpoint = "app/flip/coins/"
				const url = document.baseURI+endpoint

				const formEvent = event.currentTarget

				try {
					const formData = new FormData(formEvent);
					const flips = await sendFlips({ url, formData });

					console.log(flips);
					document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
					document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
                    document.getElementById("quarter2").setAttribute("src", "heads.png")
                    document.getElementById("quarter3").setAttribute("src", "tails.png")
				} catch (error) {
					console.log(error);
				}
			}
			// Create a data sender
			async function sendFlips({ url, formData }) {
				const plainFormData = Object.fromEntries(formData.entries());
				const formDataJson = JSON.stringify(plainFormData);
				console.log(formDataJson);

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: formDataJson
				};

				const response = await fetch(url, options);
				return response.json()
			}


// Guess a flip by clicking either heads or tails button

			function newGuess(guess) {
                fetch('http://localhost:5000/app/flip/call', {
                    method: "POST",
                    body:JSON.stringify({
                        "guess": guess
                    }),
                    headers:{
                        "Content-Type": "application/json",
						Accept: "application/json"
                    }
                })
                .then(function(response){
                    return response.json();
                })
                .then(function(sth){
                    console.log(sth)
                    document.getElementById("result2").innerHTML="Result: "+sth.result
                    document.getElementById("call").innerHTML="Your guess: "+sth.call
                    document.getElementById("actual").innerHTML="Flip: "+sth.flip
                    document.getElementById("quarter4").setAttribute("src", sth.call+".png")
                    document.getElementById("quarter5").setAttribute("src", sth.flip+".png")
                    coin.disabled = true
                })
            }
				