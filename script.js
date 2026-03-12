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
const attelot_speletaju = document.querySelector('#display')

let speletajs_O = false

visi_laucini.forEach(laucins =>{
    laucins.addEventListener('click', veikt_gajienu, {once: true})
})

function veikt_gajienu(klikskis){
    const laucins = klikskis.target
    const aktivais_speletajs = speletajs_O ? klase_O : klase_X

    laucins.classList.add(aktivais_speletajs)

    speletajs_O = !speletajs_O
}