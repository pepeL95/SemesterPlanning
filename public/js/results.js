propsectedList = document.getElementById("prospected-courses")

prospectedMenu = document.getElementById("prospected-courses-div")

resultsHeading = document.getElementById("results-heading")

mainContentPg1 = document.getElementById("main-content-result-pg1-div")

addedCourses = {}

var toggled = false

function closeMenu() {
    prospectedMenu.style.visibility = "hidden"
    resultsHeading.style.filter = "blur(0px)"
    mainContentPg1.style.filter = "blur(0px)"
    propsectedList.textContent = "My List"
    toggled = false
}

function openMenu() {
    prospectedMenu.style.visibility = "visible"
    resultsHeading.style.filter = "blur(8px)"
    mainContentPg1.style.filter = "blur(8px)"
    propsectedList.textContent = "Close"
    toggled = true
}

function toggleMenu(){
    toggled ? closeMenu() : openMenu()
}

function addToProspectedCourses(courseAbbv, courseId) {
    const menu = document.getElementById('your-courses-menu-content')
    menu.innerHTML += `<input type="button" onclick="deleteAndUnmark(this)" class="course" value="${courseAbbv} ${courseId}" id="${courseAbbv} ${courseId}">`
}

function removeFromProspectedCourses(element) {
    element.remove()
}

function deleteAndUnmark(element) {
    const id = element.id.replace(/\s/g, '') // removes spaces to provide the id of the card
    const card = document.getElementById(id)
    updateQueue(card)
}

function updateQueue(card) {
    const tap = card.querySelector('#tap') // tap to add string
    const courseAbbv = card.querySelector("#course-abbv").textContent
    const courseId = card.querySelector("#course-number").textContent

    if (card.id in addedCourses) {
        console.log(card.id)
        card.style.background = "#009bcb"
        tap.textContent = "Tap to Add to Prospected List"
        delete addedCourses[card.id]
        // delete from prospected list functionality
        const toRemove = document.getElementById(courseAbbv+" "+courseId)
        removeFromProspectedCourses(toRemove)
        return
    }
    card.style.background = "#13AA52"
    tap.textContent = "Added to Prospected List"
    tap.style.padding = "10px"
    addedCourses[card.id] = card
    propsectedList.animate([
        // keyframes
        { transform: 'translateY(0px)' },
        { transform: 'translateY(8px)' }
      ], {
        // timing options
        duration: 200,
        iterations: 2
      })
    // add to container functionality
    addToProspectedCourses(courseAbbv, courseId)
}
