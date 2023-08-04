"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completeLoader() {
  quoteContainer.hidden = false;
  loader.hidden = true;
  loader.textContent = "";
}

// Show New Quote
function newQuote() {
  showLoader();
  // Pick a random new quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  console.log(quote.author);
  console.log(quote.text);

  if (!quote.author) {
    authorText.textContent = "-Unknown";
  } else {
    authorText.textContent = `-${quote.author}`;
  }

  if (quote.text.length > 60) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // set the quote and hide the loader
  quoteText.textContent = quote.text;
  completeLoader();
}

// Get Quote From API
async function getQuotes() {
  showLoader();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listner
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

getQuotes();

//showLoader();
