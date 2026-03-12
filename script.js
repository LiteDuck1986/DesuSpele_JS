console.log("Script started")

const klase_X = 'x'
const klase_O = 'circle'

/*
0 1 2
3 4 5
6 7 8
*/

const uzvaras_nosacijumi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const visi_laucini = document.querySelectorAll('.cell')
const rezultatu_logs = document.querySelector('#resultBox')
const rezultatu_teksts = document.querySelector('#resultInfo')
const atjaunot = document.querySelector('#restartButton')
const reset = document.querySelector('#resetScore')
const attelot_speletaju = document.querySelector('#display')
const punkti_X = document.querySelector('#punkti-X')
const punkti_O = document.querySelector('#punkti-O')

// Save funkcija
function saveScore(){
    localStorage.setItem("score-x", JSON.stringify(x_punkti))
    localStorage.setItem("score-o", JSON.stringify(o_punkti))
}

let speletajs_O = false
let x_punkti = JSON.parse(localStorage.getItem("score-x")) || 0
let o_punkti = JSON.parse(localStorage.getItem("score-o")) || 0

visi_laucini.forEach(laucins =>{
    laucins.addEventListener('click', veikt_gajienu, {once: true})
})

function veikt_gajienu(klikskis){
    const laucins = klikskis.target
    const aktivais_speletajs = speletajs_O ? klase_O : klase_X

    laucins.classList.add(aktivais_speletajs)

    if(parbaudit_uzvaru(aktivais_speletajs)){
        rezultatu_teksts.textContent = `Spēlētājs ${speletajs_O ? "O" : "X"} uzvarēja!`

        if(aktivais_speletajs == klase_O){
            o_punkti++
            punkti_O.textContent = `Spēlētāja O punkti: ${o_punkti}`
            punkti_X.textContent = `Spēlētāja X punkti: ${x_punkti}`
        }

        if(aktivais_speletajs == klase_X){
            x_punkti++
            punkti_O.textContent = `Spēlētāja O punkti: ${o_punkti}`
            punkti_X.textContent = `Spēlētāja X punkti: ${x_punkti}`
        }
        saveScore()
        rezultatu_logs.classList.add('show');
    }else if(vai_ir_neizskirts()){
        rezultatu_teksts.textContent = "Neizšķirts!"

        punkti_O.textContent = `Spēlētāja O punkti: ${o_punkti}`
        punkti_X.textContent = `Spēlētāja X punkti: ${x_punkti}`

        rezultatu_logs.classList.add('show');
    }else{
        speletajs_O = !speletajs_O
        attelot_speletaju.textContent = speletajs_O ? "O" : "X"
    }   
}

function parbaudit_uzvaru(aktivais){
    for(let i = 0; i < uzvaras_nosacijumi.length; i++){
        const kombinacija = uzvaras_nosacijumi[i]
        const a = kombinacija[0]
        const b = kombinacija[1]
        const c = kombinacija[2]

        if( visi_laucini[a].classList.contains(aktivais) &&
            visi_laucini[b].classList.contains(aktivais) &&
            visi_laucini[c].classList.contains(aktivais)){
                return true
            }
        
    }
    return false
}

function vai_ir_neizskirts(){
    for(let i = 0; i < visi_laucini.length; i++){
        const laucins = visi_laucini[i]

        if(!laucins.classList.contains(klase_X) && !laucins.classList.contains(klase_O)){
            return false
        }
    }

    return true
}

atjaunot.addEventListener('click', () =>{
    location.reload()
})

reset.addEventListener('click', () =>{
    x_punkti = 0
    o_punkti = 0
    
    saveScore()
    location.reload()
})

