const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];//array to hold all the qotes in

//show loading
function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//loading completed, hide loading
function complete()
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];//this is set up in a way so that the number is returned as a whole number and it is impossible to go above the number of quotes in the array.
    //check to see if the author field is blank, and if so replace it with unknown
    if(!quote.author)
    {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //check the quote length to determine the styling
    if(quote.text.length > 40)
    {
        quoteText.classList.add('long-quote');//if the quote is long, make the text smaller
    } else {
        quoteText.classList.remove('long-quote');//if the quote is short, make the text larget
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;//after the first two if statements are ran, the quote is finally posted for the user to see
    complete();
}


// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const responce = await fetch(apiUrl);//gets the data from the api and fills it into the responce constant
        apiQuotes = await responce.json();//turns the responce into a json, and passes it into apiQuotes
        newQuote();//runs the next method to post the quote.
    } catch (error) {
        //catch error here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click',newQuote);//new button is pressed, get a new quote
twitterBtn.addEventListener('click', tweetQuote);//tweet button is pressed, open a twitter page up


//on load
getQuotes();
