//const { ler_json, escrever_json } = require('./app.js');
    // Seu código JavaScript aqui

const inputUsuario = document.querySelector("#inputUsuario");
const inputSenha = document.querySelector("#inputSenha");
const butao_entrar = document.querySelector("#entrar");
const mensagem = document.querySelector("#mensagem");
const inputs = document.querySelector("#inputs");
const logout = document.querySelector("#logout");
const nome = document.querySelectorAll(".nome");
const butao_sair =document.querySelector("#logout-button");
const imagem_token = document.querySelectorAll(".tokens");
const imagem_perfil = document.querySelector("#login img");

const tokens_button = document.querySelectorAll("#imagem-perfil button");

const token_0 = document.querySelector("#token_0");
const token_1 = document.querySelector("#token_1");
const token_2 = document.querySelector("#token_2");
const token_3 = document.querySelector("#token_3");
const json = document.querySelector("#login-json");


const tokens = [token_0,token_1,token_2,token_3];

let logado = false;
let nick;

class user {
    constructor(ausuario,asenha,aperfil){
        this.usuario = ausuario;
        this.senha = asenha;
        this.tokens = [];
        this.perfil = aperfil;
    }
    set login(newUser){
        this.usuario = newUser;
    }
    get login() {
        return this.usuario;
    }

    set password(newSenha) {
        this.senha = newSenha;
    }
    get password() {
        return this.senha;
    }

    set token(newToken){
        this.tokens = newToken;
    }
    get token(){
        return this.tokens;
    }

    set img_perfil(newPerfil){
        this.perfil = newPerfil;
    }
    get img_perfil(){
        return this.perfil;
    }

    buildTokensid() {
        this.tokens.push(`./imagens/${this.usuario}/tokens/LOGO-rpgdosmanos.png`);
        let j;
        for(j=1;j<4;j++){
            this.tokens.push(`./imagens/${this.usuario}/tokens/token_${j}.webp`);
        }
    }
};
let usuarios = [];



const login_imagem = document.querySelector('#login');
const login_tela = document.querySelector('#tela-login');
const estamos_dentro = document.querySelector('#estamos-dentro');
function abrir_login(){
    if(login_tela.style.display == "block"){
        login_tela.style.display = "none";
    }else{
        login_tela.style.display = "block";
    }
    fetch("/users").then((response) =>{
        response.json().then((users)=>{
            users.forEach((element) =>{
                if(indexUsuarioPorNome(element.usuario) == null){
                    usuarios.push(new user(element.usuario,element.senha,element.perfil));
                }
            })
        })
    })
    if(logado ){
        voltar_Logout();
    }else{
        voltar_register();
    }
}

login_imagem.onclick = abrir_login;

function indexUsuarioPorNome(nome) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].login === nome) {
            return i;
        }
    }
    return null; // Retorna null se não encontrar o objeto com o nome especificado
}

function clica_entrar() {

    usuarios.forEach(element => {
        if(inputUsuario.value == element.login && inputSenha.value == element.password){
            logado = true;
            nome.forEach(name => {
                name.innerText = element.login;
                nick = element.login;
                inputUsuario.value = "";
                inputSenha.value = ""; 
            });
            element.buildTokensid();
            if(element.img_perfil != ""){
                imagem_perfil.src = element.img_perfil;
                imagem_perfil.style.width = "70px";
                imagem_perfil.style.height = "70px";
                login_imagem.style.padding = "0px";
            }
            let j = 0;
            imagem_token.forEach(imagem =>{
                imagem.src = element.tokens[j];
                j++;
        })
        }
    });
    //teste 
    if(logado){
        inputs.style.display = "none";
        logout.style.display = "block";
    }else{
        if(inputUsuario.value != "" ||inputSenha.value != ""  ){
            alert("Senha Incorreta!");
        }else{
            alert("Digite seu Usuário ou Senha!");
        }
    }
    window.scrollTo(0, 0);
}

butao_entrar.onclick = clica_entrar;


function clica_sair(){
    logado = false;
    inputs.style.display = "block";
    logout.style.display = "none";
    nome.forEach(name => {
        name.innerText = "";
    });
    nick = '';
    imagem_perfil.src = "imagens/login.png";
    imagem_perfil.style.width = "50px";
    imagem_perfil.style.height = "50px";
    login_imagem.style.padding = "10px";
}
butao_sair.onclick = clica_sair;


tokens.forEach(token =>{
    token.onclick = () => {
        imagem_perfil.src = imagem_token[tokens.indexOf(token)].src;
        let encontrado = indexUsuarioPorNome(nick);
        usuarios[encontrado].img_perfil = imagem_perfil.src;
        escrever__json();
        imagem_perfil.style.width = "70px";
        imagem_perfil.style.height = "70px";
        login_imagem.style.padding = "0px";
    };
})

const mudar_senha_butao = document.querySelector("#change-password");

function escrever__json(){
    fetch('/api/updateUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarios)
})
.then(response => response.json())
.then(data => {
    console.log(data.message); // Mensagem de sucesso do servidor
})
.catch(error => {
    console.error('Erro ao atualizar o usuário:', error);
});
}
const mudar_senha_display = document.querySelector("#mudar_senha");
function abrir_mudar_senha(){
    logout.style.display = "none";
    mudar_senha_display.style.display = "block";
}
mudar_senha_butao.onclick = abrir_mudar_senha;

const mudarSenha = document.querySelector("#mudarSenha");
const mudar_senha1 = document.querySelector("#mudarSenha1");
const mudar_senha2 = document.querySelector("#mudarSenha2");
function mudar_senha(){
    if(mudar_senha1.value == mudar_senha2.value && mudar_senha1.value != ""){
        let encontrado = indexUsuarioPorNome(nick);
        usuarios[encontrado].password = mudar_senha1.value;
        escrever__json();
         
        alert("Senha mudada com sucesso!");
        voltar_Logout();
        window.scrollTo(0, 0);
    }else{
         
        alert("Senhas não compativeis!");
        window.scrollTo(0, 0);
    }
}
mudarSenha.onclick = mudar_senha;
const registro_display = document.querySelector("#register");
const voltarRegister = document.querySelector("#voltarLogoutRegister");
const voltarLogout = document.querySelector("#voltarLogout");
function voltar_Logout(){
    mudar_senha1.value = "";
    mudar_senha2.value = "";
    logout.style.display = "block";
    registro_display.display = "none";
    mudar_senha_display.style.display = "none";
}
voltarLogout.onclick = voltar_Logout;

function voltar_register(){
    registro_display.style.display = "none";
    inputs.style.display = "block";
    registrar_usuario.value = "";
    registrar_senha1.value = "";
    registrar_senha2.value = "";
    login_tela.style.height = "250px";
}
voltarRegister.onclick = voltar_register;

const registro_display_butao = document.querySelector("#registro-display");
function abrir_register(){
    inputs.style.display = "none";
    registro_display.style.display = "block";
    login_tela.style.height = "300px";
}
registro_display_butao.onclick = abrir_register;
function criarPastasUsuario(nomeUsuario) {
    fetch(`/criar-pastas/${nomeUsuario}`, {
        method: 'POST',
    })
    .then(response => {
        if (response.ok) {
            console.log('Pastas criadas com sucesso.');
        } else {
            console.error('Erro ao criar as pastas:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Erro de rede:', error);
    });
}
const registrar_butao = document.querySelector("#registrar");
const registrar_usuario = document.querySelector("#registerUsuario");
const registrar_senha1 = document.querySelector("#registerSenha1");
const registrar_senha2 = document.querySelector("#registerSenha2");
function registrar(){
    if(registrar_usuario.value != "" && registrar_senha1.value == registrar_senha2.value && registrar_senha1.value != "" && indexUsuarioPorNome(registrar_usuario.value) == null){
            usuarios.push(new user(registrar_usuario.value,registrar_senha1.value,""));
            criarPastasUsuario(registrar_usuario.value);
            escrever__json();
            voltar_register();
    }else{
        if(indexUsuarioPorNome(registrar_usuario.value) != null){alert("Usuário já registrado!");}
        if(registrar_usuario.value == "" || registrar_senha1.value == "" || registrar_senha2.value == ""){alert("Complete todos os campos!");}
        if(registrar_senha1.value != registrar_senha2.value){alert("Senha não identicas!");}

    }
}
registrar_butao.onclick = registrar;