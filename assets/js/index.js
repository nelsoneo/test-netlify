let inputNewTask = document.querySelector('#inputNewTask');
let btnAddTask = document.querySelector('#btnAddTask');
let listTasks = document.querySelector('#listTasks');
let janelaEdicao = document.querySelector('#janelaEdicao');
let windowEditionBackground = document.querySelector('#windowEditionBackground');
let windowEditionBtnClosed = document.querySelector('#windowEditionBtnClosed');
let btnUpdateTask = document.querySelector('#btnUpdateTask');
let idTaskEdition = document.querySelector('#idTaskEdition');
let inputTaskNameEdition = document.querySelector('#inputTaskNameEdition');
const qtdIdsDisponiveis = Number.MAX_VALUE;

inputNewTask.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let tarefa = {
            nome: inputNewTask.value,
            id: gerarIdV2(),
        }
        adicionarTarefa(tarefa);
    }
});

windowEditionBtnClosed.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

btnAddTask.addEventListener('click', (e) => {

    let tarefa = {
        nome: inputNewTask.value,
        id: gerarIdV2(),
    }
    adicionarTarefa(tarefa);
});

btnUpdateTask.addEventListener('click', (e) => {
    e.preventDefault();

    let idTarefa = idTaskEdition.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTaskNameEdition.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual) {
        let li = criarTagLI(tarefa);
        listTasks.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Tag HTML not found!');
    } 
});

function gerarId() {
    return Math.floor(Math.random() * qtdIdsDisponiveis);
}

function gerarIdV2() {
    return gerarIdUnico();
}

function gerarIdUnico() {

    // debugger;
    let itensDaLista = document.querySelector('#listTasks').children;
    let idsGerados = [];

    for(let i=0;i<itensDaLista.length;i++) {
        idsGerados.push(itensDaLista[i].id);
    }

    let contadorIds = 0;
    let id = gerarId();

    while(contadorIds <= qtdIdsDisponiveis && 
        idsGerados.indexOf(id.toString()) > -1) {
            id = gerarId();
            contadorIds++;

            if(contadorIds >= qtdIdsDisponiveis) {
                alert("Oops, we not more IDS :/");
                throw new Error("Oops end IDs :/");
            }
        }

    return id;
}

function adicionarTarefa(tarefa) {
    console.log(tarefa);
    if(tarefa.nome != "") {
        let li = criarTagLI(tarefa);
    listTasks.appendChild(li);  
    inputNewTask.value = ''; 
    } else {
        alert("Your can type a new task")
    }
}

function criarTagLI(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div  = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');
    
    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTaskEdition.innerHTML = '#' + idTarefa;
        inputTaskNameEdition.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Tag HTML not found!');
    }
}

function excluir(idTarefa) {
    let confirmacao = window.confirm('You can trash the task? ');
    if(confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if(li) {
            listTasks.removeChild(li);
        } else {
            alert('Tag HTML not found!');
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    windowEditionBackground.classList.toggle('abrir');
}