document.addEventListener('DOMContentLoaded', (e) => {
//when page loads first 50 monsters should show name, age, and description
console.log('DOM fully loaded')

const monsterContainer = document.getElementById('monster-container');
//console.log(monsterContainer)
const createMonster = document.getElementById('create-monster');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
let pageNum = 1
getMonsters()
createMonsterForm()

//fetch to getMonsters
function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(response => response.json())
        .then(monsterData => monsterData.forEach(monster => renderMonster(monster)))
        monsterContainer.innerHTML = `Page ${pageNum}`
}
//fetch to getMonsters



//function to render fetched monsters
function renderMonster(monsters){
    let oneMonster = document.createElement('div')
    oneMonster.innerHTML = `
        <h2>${monsters.name}</h2>
        <h4>Age: ${monsters.age}</h4>
        <p> Bio: ${monsters.description}<p>
        `
    monsterContainer.appendChild(oneMonster)
}
//function to render fetched monsters

//function to create form
function createMonsterForm(){
    const monsterForm = document.createElement('form')
    const nameInput = document.createElement('input')
    nameInput.id = "name"
    nameInput.placeholder = "name"
    const ageInput = document.createElement('input')
    ageInput.id = "age"
    ageInput.placeholder = "age"
    const descInput = document.createElement('input')
    descInput.id= "description"
    descInput.placeholder= "description"
    const createbtn = document.createElement('button')
    createbtn.innerText = "Create"

    monsterForm.appendChild(nameInput)
    monsterForm.appendChild(ageInput)
    monsterForm.appendChild(descInput)
    monsterForm.appendChild(createbtn)
    createMonster.appendChild(monsterForm)
}
//function to create form


//post fetch to addMonsters
createMonster.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("submit")

    fetch('http://localhost:3000/monsters/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(
        {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            description: document.getElementById('description').value,
        })
    })
})
//post fetch to addMonsters

//button info
backButton.addEventListener('click', () => {
    if(pageNum === 1){
        window.alert('No monsters here!')
    }
    else{
        pageNum -= 1
        getMonsters()
    }    
})
forwardButton.addEventListener('click', () => {
    if(pageNum === 22){
        pageNum -= 1
        window.alert('No more monsters this way!')
    }else
    pageNum += 1
    getMonsters()
})
//button info
})