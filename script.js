class Carro {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;

        // Obtém os elementos de áudio
        this.somLigar = document.getElementById("som-ligar");
        this.somDesligar = document.getElementById("som-desligar");
        this.somAcelerar = document.getElementById("som-acelerar");
        this.somFrear = document.getElementById("som-frear");
        this.somBuzina = document.getElementById("som-buzina");
    }

    ligar() {
        if (!this.ligado) {
            this.ligado = true;
            console.log("Carro ligado!");
            this.atualizarStatusNaPagina();
            this.somLigar.play();
        } else {
            console.log("O carro já está ligado.");
        }
    }

    desligar() {
        if (this.ligado) {
            this.ligado = false;
            this.velocidade = 0;
            console.log("Carro desligado!");
            this.atualizarStatusNaPagina();
            this.atualizarVelocidadeNaPagina();
            this.somAcelerar.pause();
            this.somAcelerar.currentTime = 0;
        } else {
            console.log("O carro já está desligado.");
        }
    }

    acelerar(incremento) {
        console.log("Função acelerar chamada com incremento:", incremento);
        if (this.ligado) {
            this.velocidade += incremento;
            console.log(`Acelerando para ${this.velocidade} km/h.`);
            this.atualizarVelocidadeNaPagina();

            if (this.velocidade > 0) {
                this.somAcelerar.play(); // Toca o som ao acelerar
            }
        } else {
            console.log("O carro precisa estar ligado para acelerar.");
        }
    }

    freiar(decremento) {
        if (this.ligado) {
            this.velocidade -= decremento;
            if (this.velocidade < 0) {
                this.velocidade = 0;
            }
            console.log(`Freando para ${this.velocidade} km/h.`);
            this.atualizarVelocidadeNaPagina();
            this.somAcelerar.pause();
            this.somAcelerar.currentTime = 0;
            this.somFrear.play();
        } else {
            console.log("O carro precisa estar ligado para frear.");
        }
    }

    diminuirVelocidade(decremento) {
        if (this.ligado) {
            this.velocidade -= decremento;
            if (this.velocidade < 0) {
                this.velocidade = 0;
            }
            console.log(`Diminuindo a velocidade para ${this.velocidade} km/h.`);
            this.atualizarVelocidadeNaPagina();
        } else {
            console.log("O carro precisa estar ligado para diminuir a velocidade.");
        }
    }

    buzinar() {
        this.somBuzina.play();
    }

    trocarCor(novaCor) {
        this.cor = novaCor;
        console.log(`Cor do carro alterada para ${novaCor}.`);
        this.atualizarCorNaPagina();
    }

    atualizarCorNaPagina() {
      document.getElementById("cor").textContent = this.cor;
    }

    atualizarVelocidadeNaPagina() {
        document.getElementById("velocidade").textContent = this.velocidade;
    }

    atualizarStatusNaPagina() {
        const statusElement = document.getElementById("status");
        statusElement.textContent = this.ligado ? "Ligado" : "Desligado";
    }
}

// Cria uma instância da classe Carro
const meuCarro = new Carro("Fusca", "Azul");

// Atualiza os elementos HTML com as informações do carro
document.getElementById("modelo").textContent = meuCarro.modelo;
document.getElementById("cor").textContent = meuCarro.cor;
document.getElementById("velocidade").textContent = meuCarro.velocidade;

// Obtém os botões do HTML
const ligarBtn = document.getElementById("ligar-btn");
const desligarBtn = document.getElementById("desligar-btn");
const acelerarBtn = document.getElementById("acelerar-btn");
const freiarBtn = document.getElementById("freiar-btn");
const diminuirBtn = document.getElementById("diminuir-btn");
const buzinarBtn = document.getElementById("buzinar-btn");
const trocarCorBtn = document.getElementById("trocar-cor-btn");

// Adiciona os event listeners aos botões
ligarBtn.addEventListener("click", () => {
    meuCarro.ligar();
});

desligarBtn.addEventListener("click", () => {
    meuCarro.desligar();
});

acelerarBtn.addEventListener("click", () => {
    console.log("Botão Acelerar clicado");
    meuCarro.acelerar(10);
});

freiarBtn.addEventListener("click", () => {
    meuCarro.freiar(10);
});

diminuirBtn.addEventListener("click", () => {
    meuCarro.diminuirVelocidade(5);
});

buzinarBtn.addEventListener("click", () => {
    meuCarro.buzinar();
});

trocarCorBtn.addEventListener("click", () => {
    const novaCor = prompt("Digite a nova cor do carro:");
    if (novaCor) {
        meuCarro.trocarCor(novaCor);
    }
});

meuCarro.atualizarStatusNaPagina();