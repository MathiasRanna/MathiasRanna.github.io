const project = "Random-Quote-Generator";
localStorage.setItem("project", "Quote Generator");
let quotesData;

var currentQuote = "";
var currentAuthor = "";

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

var picBackGrounds = [
"https://kikomatching.files.wordpress.com/2014/01/stand1.jpg",
"http://qlifeus.com/wp-content/uploads/2018/05/100816800-131574791r.600x400.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IXVQ42VKwmYkv-sW_ve3YDGm3m1M9hgG-N41oJ3OkXOMEFLPvg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWWZ8wHM3a5jacCKt0nGNXGQxI8PSBJxC5pnE9urf3f8m3OhB9Ng",
"https://steemitimages.com/DQmNYdoNk7WdHpghuAy9Pzes3mdsEkojE8XRTysKgUm6p4w/life.jpg"];

var colors = ["#81C784", "#FFD54F", "#FF8A65", "#9575CD", "#64B5F6"];

function openURL(url) {
  window.open(url, "Share");
}

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json" },

    url:
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
        console.log("quotesData");
        console.log(quotesData);
      }
    } });

}

function getRandomQuote() {
  return quotesData.quotes[
  Math.floor(Math.random() * quotesData.quotes.length)];

}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  if (inIframe()) {
    $("#tweet-quote").attr(
    "href",
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
    encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

  }

  $(".quote-text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(randomQuote.quote);
  });

  $(".quote-author").animate(({ opacity: 0 }, 500), function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(randomQuote.author);
  });

  /* HERE IS THE CHANGE PART */

  var color = colors[Math.floor(Math.random() * colors.length)];
  var changeBack = picBackGrounds[Math.floor(Math.random() * picBackGrounds.length)];

  $("#quote-box").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(this).css("color", color);
  });

  $(".button").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(this).css("backgroundColor", color);
  });

  $("html body").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(this).css("background", "url(" + changeBack + ")");
  });

}


$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);

  $("#tweet-quote").on("click", function () {
    if (!inIframe()) {
      openURL(
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

    }
  });
});