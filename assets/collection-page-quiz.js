const initialize = () => {

  const quizBlocks = document.querySelectorAll('.questions [class^="step-row"]')

  let array = new Array();

  quizBlocks.forEach(quiz => {
    const answer = quiz.querySelectorAll('a')

    answer.forEach(ans => {
      ans.addEventListener('click', (event) => { //&& event.target.href.includes('#')
        event.preventDefault()
        if (!array.includes(event.target.outerText)) {
          event.preventDefault()
          if (event.target.outerText.toLowerCase() != "scroll naar beneden") {
            array.push(event.target.outerText);
          }
          // debugger
          console.log(`${event.target.href.split('#')[1]}`)
          console.log("dfgfg",document.querySelector(`#${event.target.href.split('#')[1]}`))
          if (document.querySelector(`#${event.target.href.split('#')[1]}`)) {
            if (event.target.outerText.toLowerCase() != "scroll naar beneden") {
              ans.closest('.questions').style.display = 'none'
            }
            document.querySelector(`#${event.target.href.split('#')[1]}`).style.display = 'block'

            const focusElement = document.querySelector(`#${event.target.href.split('#')[1]}`)
            const headerHeight = document.querySelector('#SiteHeader').offsetHeight;
            const y = focusElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scroll({
              top: y,
              behavior: 'smooth'
            });
          }
        } else {}
        console.log(array)
        if (array.length > 3) {
          array.shift()
          const className = array.join('-').toLowerCase()
          if (document.querySelector(`.${className}`)) {
            const focusElement = document.querySelector(`.${className}`)
            focusElement.style.display = 'block'
            // focusElement.scrollIntoView(true);

            const headerHeight = document.querySelector('#SiteHeader').offsetHeight;
            const y = focusElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scroll({
              top: y,
              behavior: 'smooth'
            });
          }
        }
      })
    })
  })
}

initialize();