let nomesSorteio = [];

function adicionar() {
    //recuperar valores
    let inputNome = document.getElementById('nome-amigo');

    // pegar o valor e converter para MAIÚSCULO
    let nome = inputNome.value.trim().toUpperCase();

    //não deixar incluir nome em branco
    if (nome == '') {
        alert('Insira um nome!');
        return;
    }

    //não deixar nome repetido
    if (nomesSorteio.includes(nome)) {
        alert('Nome ja adicionado!');
        return;
    }

    //adicionar nome no array
    nomesSorteio.push(nome);
    
    //adicionar nomes no sorteio
    let lista = document.getElementById('lista-amigos');
        
    if (lista.textContent == '') {
        lista.textContent = nome;
    } else {
        lista.textContent += ', '+nome;
    }

    inputNome.value = '';

    atualizarLista();
    atualizarSorteio();
    

}

function sortear() {
    //minimo 4 nomes para sorteio
    if (nomesSorteio.length < 4) {
        alert('Adicione pelo menos 4 pessoas!');
        return;
    }

    embaralha(nomesSorteio);
    let sorteio = document.getElementById('lista-sorteio');

    for (let i = 0; i < nomesSorteio.length; i++) {

        if (i == nomesSorteio.length - 1) {
            sorteio.innerHTML += nomesSorteio[i] + '--> '+ nomesSorteio[0] + '<br>';
        } else {
            sorteio.innerHTML += nomesSorteio[i] + '--> '+ nomesSorteio[i + 1] + '<br>';
        }
    }

}

function reiniciar() {
    nomesSorteio = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}

//função para embaralhar array
function embaralha(lista) {

    for (let indice = lista.length; indice; indice--) {

        const indiceAleatorio = Math.floor(Math.random() * indice);

        // atribuição via destructuring
        [lista[indice - 1], lista[indiceAleatorio]] = 
            [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function exlcuirNome(index) {
    nomesSorteio.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < nomesSorteio.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = nomesSorteio[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            exlcuirNome(i);
        });


        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

