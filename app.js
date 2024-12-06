let dificuldade = 1;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
console.log(numeroSecreto);
exibirMensagemInicial();


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female' ,
         {rate:1.2});
}


function exibirMensagemInicial() { 
    exibirTextoNaTela('h1', 'Jogo do número secreto'); 
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${dificuldade}`);
    
}


function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
                let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
                let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
                exibirTextoNaTela('p', mensagemTentativas);
                document.getElementById('reiniciar').removeAttribute('disabled');
                document.getElementById('chute').setAttribute('disabled',true);
            } else {
                if (chute > numeroSecreto) {
                        exibirTextoNaTela('p', 'O número secreto é menor');
                } else {
                        exibirTextoNaTela('p', 'O número secreto é maior');
                }
                tentativas++;
                limparCampo();
        }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNalista==dificuldade){
        listaDeNumerosSorteados = [];
        dificuldade = dificuldade *10;
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        
        return numeroEscolhido;
    }
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    console.log(numeroSecreto);
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('chute').removeAttribute('disabled');
}