async function getCoderData() {
    // The await keyword lets js know that it needs to wait until it gets a response back to continue.
    var response = await fetch("https://api.github.com/users/Deborah-Na");
    // We then need to convert the data into JSON format.
    var coderData = await response.json();
    return coderData;
}
    
console.log(getCoderData());

// //Begin accessing Json data here
// fetch("https://api.github.com/users/Deborah-Na")
//     .then(response => response.json() )
//     .then(coderData => console.log(coderData) )
//     .catch(err => console.log(err) )


// var data = JSON.parse(this.response)

// data.forEach(object => {
  // Log each movie's title
// console.log(object.name[0])
// // })

// const app = document.getElementById('root')
