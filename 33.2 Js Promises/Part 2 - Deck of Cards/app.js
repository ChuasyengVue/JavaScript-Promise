let url = "https://deckofcardsapi.com/api/deck";

$.getJSON(`${url}/new/draw`)
    .then(response =>{
        console.log(response)
    })

// 1. Make request to get a single card

$.getJSON(`${url}/new/draw`)
    .then(response =>{
        let {suit, value} = response.cards[0];
        console.log(`Your card is a ${value} of ${suit}`)
        // $('body').append(`<p> Your card is a "${value.toLowerCase()} of ${suit.toLowerCase()}" </p>`)
    });


// 2. Make a request to the deck of cards to get a single card
// from a newly shuffled deck

$.getJSON(`${url}/new/draw/`)
    .then(response =>{
        deckId = response.deck_id;
        let {suit, value} = response.cards[0];
        
        console.log(`Your card is a ${value} of ${suit}`);

        // $('body').append(`<p> Your card is a "${value.toLowerCase()} of ${suit.toLowerCase()}" </p>`);
        return $.getJSON(`${url}/${deckId}/draw/`);
    })
    
    .then(response =>{
        let {suit, value} = response.cards[0];

        console.log(`Your card is a ${value} of ${suit}`);
        
        // $('body').append(`<p> Your card is a "${value.toLowerCase()} of ${suit.toLowerCase()}" </p>`);
        return $.getJSON(`${url}/${deckId}/draw/`);
    })
    .then(response =>{
        let {suit, value} = response.cards[0];

        console.log(`Your card is a ${value} of ${suit}`);
        
        // $('body').append(`<p> Your card is a "${value.toLowerCase()} of ${suit.toLowerCase()}" </p>`);
        
    })


// 3. Build HTML that lets you draw a card from a deck.

let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

$.getJSON(`${url}/new/shuffle/`)
    .then(response => {
        deckId = response.deck_id;
        $btn.show()
    });

    
$btn.on('click', function(){
    $.getJSON(`${url}/${deckId}/draw/`)
        .then(response => {
            let card = response.cards[0].image;
            let toss = Math.random() * 90-40;

            $cardArea.append(
                $(`<img>`, {
                    src: card,
                    css:{
                        transform: `rotate(${toss}deg)`
                    }
                })
            );
            if (response.remaining === 0) $btn.remove();
        });
});