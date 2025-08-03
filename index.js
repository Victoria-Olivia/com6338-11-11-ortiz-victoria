const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = function(poemData) {
  const poem = poemData[0]
  const title = poem.title
  const author = poem.author
  const lines = poem.lines
  const makeH2 = makeTag('h2')
  const makeH3 = makeTag('h3')
  const makeP = makeTag('p')
  const makeEm = makeTag('em')

  const byAuthor = name => `by ${name}`
  const authorIntroLine = pipe(byAuthor, makeEm, makeH3)
  const stanzas = []
  let currentStanza = []
  lines.forEach(line => {
    if (line === '') {
      stanzas.push(currentStanza)
      currentStanza = []
    } else {
      currentStanza.push(line)
    }
  })
  if (currentStanza.length > 0) {
    stanzas.push(currentStanza)
  }
  const paragraphHTML = stanzas.map(stanza => makeP(stanza.join('<br>'))).join('');
  return makeH2(title) + authorIntroLine(author) + paragraphHTML
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
