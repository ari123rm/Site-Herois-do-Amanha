const desc_terras = document.querySelectorAll('.desc-terra');
const terras = document.querySelectorAll('#terras ul li');
const barras = document.querySelectorAll('#terras hr');

let i = 0;

desc_terras.forEach(
    (desc_terra) => {
        if(desc_terra.innerText == 'Desconhecido!'){
            terras[i].style.display = "none";
            barras[i].style.display = "none";
        }
        i++;
    }
);