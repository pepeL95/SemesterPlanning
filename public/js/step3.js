cPool = document.querySelector('#pool-btn')

cMenu = document.querySelector('#your-courses-menu-div')

pCourses = document.querySelector('#your-courses-btn')

pMenu = document.querySelector('.class-cards-div')

// if colors get changed in the future, do it below
colors = { 'orig-font-color': "#33373B", 'marked-font-color': "rgb(0, 124, 173)", 'no-color': "" }
// will be dynamically filled as courses get checked and unchecked

checkedCourses = new Map() // to be posted to the results route

function emptyList(container) {
    container = []
}

function addToAvoidCourses(container) {
    avoidCourses = []
    if (container.length != 0)
        for (item of container)
        avoidCourses.push(item[0]) 

    return avoidCourses
    
}

function oscillateMenu(men1, men2) {
    men1.style.borderBottom = "2px solid #33373B"
    men2.style.borderBottom = "solid 1px lightgray"
    if (men1 == pCourses) {
        pMenu.style.visibility = "hidden"
        cMenu.style.visibility = "visible"
        return
    }
    pMenu.style.visibility = "visible"
    cMenu.style.visibility = "hidden"
}

function markCourse(thisCourse) {
    if (checkedCourses.has(thisCourse.id)) { // if checked, uncheck it!!
        checkedCourses.delete(thisCourse.id)
        thisCourse.style.color = colors['orig-font-color'] // unmark it
        thisCourse.style.borderBottom = colors['no-color'] // no borders
        toDelete = cMenu.querySelector(`#${thisCourse.id}`)
        removeCourse(toDelete) //delete course from "Your Courses"
        return
    }
    // if not checked already
    console.log("added")
    checkedCourses.set(thisCourse.id, thisCourse) // add it to the checked list
    thisCourse.style.color = colors['marked-font-color']
    thisCourse.style.borderBottom = `1px solid ${colors['marked-font-color']}`
    cMenu.innerHTML += `<input type="button" onclick="removeFromYourCourses(this)" class="card my-course" value="${thisCourse.value}" id="${thisCourse.id}">`// add course to "Your Courses"
}

function removeFromYourCourses(thisCourse) {
    //alert(thisCourse.id)
    toUnmark = pMenu.querySelector(`#${thisCourse.id}`) // unmark it from the pool of course
    markCourse(toUnmark) // this will call removeCourse() from within
}

function removeCourse(thisCourse) { // helper function
    thisCourse.remove()
}

async function postData(url = '/results', data) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }

    const response = await fetch(url, options);
    
    const returnedData = await response.text()

    return returnedData
}

async function postUpdatedData() {
    var toBeParsed = addToAvoidCourses(checkedCourses)

    const data = await postData('/results', toBeParsed)
    
    document.open();
    
    document.write(data);
    
    document.close();
}
