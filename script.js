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

    if(parbaudit_uzvaru(aktivais_speletajs)){
        rezultatu_teksts.textContent = `Spēlētājs ${speletajs_O ? "O" : "X"} uzvarēja!`
        rezultatu_logs.classList.add('show');
    }else if(vai_ir_neizskirts()){
        rezultatu_teksts.textContent = "Neizšķirts!"
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