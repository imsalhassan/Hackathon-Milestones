const toggle = document.getElementById('Toggle-skills') as HTMLButtonElement
const skills = document.getElementById('Skills') as HTMLElement

toggle.addEventListener('click',()=>{
    if(skills.style.display === 'none'){
        skills.style.display = 'block'
    } else{
        skills.style.display = 'none'
    }
});