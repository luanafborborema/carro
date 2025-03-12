class Veiculo {
    constructor(cor, containerId) {
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;
        this.containerId = containerId;

        this.somLigar = document.getElementById("som-ligar");
        this.somDesligar = document.getElementById("som-desligar");
        this.somAcelerar = document.getElementById("som-acelerar");
        this.somFrear = document.getElementById("som-frear");

        this.imagemElement = document.getElementById(`${containerId}-imagem`);
        this.corElement = document.getElementById(`${containerId}-cor`);
        this.velocidadeElement = document.getElementById(`${containerId}-velocidade`);
        this.statusElement = document.getElementById(`${containerId}-status`);

        this.corElement.textContent = this.cor;
        this.atualizarStatusNaPagina(); // Inicializa o status na página
        this.atualizarVelocidadeNaPagina(); // Inicializa a velocidade na página
        this.atualizarCorNaPagina(); // Exibe a imagem inicial
        this.configurarBotoes();
    }

    ligar() {
        if (!this.ligado) {
            this.ligado = true;
            console.log(`Veículo ${this.cor} ligado!`);
            this.atualizarStatusNaPagina();
            this.somLigar.play();
        } else {
            console.log(`O veículo ${this.cor} já está ligado.`);
        }
    }

    desligar() {
        if (this.ligado) {
            this.ligado = false;
            this.velocidade = 0;
            console.log(`Veículo ${this.cor} desligado!`);
            this.atualizarStatusNaPagina();
            this.atualizarVelocidadeNaPagina();
            this.somAcelerar.pause();
            this.somAcelerar.currentTime = 0;
            this.somFrear.pause();
            this.somFrear.currentTime = 0;
            this.somDesligar.play();
        } else {
            console.log(`O veículo ${this.cor} já está desligado.`);
        }
    }

    acelerar(incremento) {
        if (this.ligado) {
            this.velocidade += incremento;
            console.log(`Acelerando ${this.cor} para ${this.velocidade} km/h.`);
            this.atualizarVelocidadeNaPagina();

            if (this.velocidade > 0) {
                this.somAcelerar.play();
            }
        } else {
            console.log(`O veículo ${this.cor} precisa estar ligado para acelerar.`);
        }
    }

    atualizarVelocidadeNaPagina() {
        this.velocidadeElement.textContent = this.velocidade;
    }

    atualizarStatusNaPagina() {
        this.statusElement.textContent = this.ligado ? "Ligado" : "Desligado";
    }

    atualizarCorNaPagina() {
        const cor = this.cor.toLowerCase();

        if(this instanceof Carro){
            this.imagemElement.src = `imagens/carro${cor}.png`;
        } else if (this instanceof CarroEsportivo) {
            this.imagemElement.src = `imagens/cesportivo${cor}.png`;
        } else if (this instanceof Caminhao) {
            this.imagemElement.src = `imagens/caminhao${cor}.png`;
        }
        this.corElement.textContent = this.cor;
    }

    configurarBotoes() {
        const container = document.getElementById(this.containerId);
        const botoes = container.querySelectorAll('button');

        botoes.forEach(botao => {
            const classe = botao.className;

            if (classe.includes('ligar-btn')) {
                botao.addEventListener('click', () => this.ligar());
            } else if (classe.includes('desligar-btn')) {
                botao.addEventListener('click', () => this.desligar());
            } else if (classe.includes('acelerar-btn')) {
                botao.addEventListener('click', () => this.acelerar(10));
            }
        });
    }
}
