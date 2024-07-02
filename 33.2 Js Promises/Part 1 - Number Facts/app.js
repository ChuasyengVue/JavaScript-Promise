let url = "http://numbersapi.com";
let favNum = 10;
let favNumbers = [6,7,8,9];



// 1. Make a request to get a fact about your favorite number,
// (Include JSON query key)

$.getJSON(`${url}/${favNum}?json`)
    
    .then(response => {
    console.log("This is the first Request")
    console.log(response);   
})
    

// 2. Make request to get multiple numbers in a single request.

$.getJSON(`${url}/${favNumbers}/?json`)
      
    .then(response => {
    console.log("This is the second Request")  
    console.log(response);   
})


// 3. Use api to get 4 facts on favorite number and put them on the page.
// (Note: Multiple request)


let num = favNumbers.map(numbers =>{
    return axios.get(`${url}/${numbers}?json`);
});

Promise.all(num)
    .then(response =>{
        response.forEach(response =>{
            $('body').append(`<p> ${response.data.text} </p>`);
        });
    })

    .catch(err =>{
       console.log("ERROR!!", err);
    });