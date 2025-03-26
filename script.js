document.addEventListener('DOMContentLoaded', function() {
    const somBuzina = new Audio('sons/buzina.mp3');
    const somAcelerar = new Audio('sons/acelerar.mp3');
    const somFrear = new Audio('sons/frear.mp3');
    const somLigar = new Audio('sons/ligar.mp3');
    const somDesligar = new Audio('sons/desligar.mp3');

    // Funções auxiliares para tocar sons
    function tocarSom(audio, volume = 0.5) {
        audio.volume = volume;
        audio.play();
    }

    // Funções auxiliares para exibir alertas
    function mostrarAlerta(mensagem) {
        alert(mensagem);
    }

    // Funções auxiliares para atualizar informações do veículo no HTML
    function atualizarInfoVeiculo(tipo, dados) {
        for (const key in dados) {
            const element = document.getElementById(`${tipo}-${key}`);
            if (element) {
                element.textContent = dados[key];
            }
        }
    }

    // Funções auxiliares para atualizar o status do veículo
    function atualizarStatusVeiculo(tipo, ligado) {
        const statusElement = document.getElementById(`${tipo}-status`);
        if (statusElement) {
            statusElement.textContent = ligado ? "Ligado" : "Desligado";
            statusElement.classList.toggle('status-ligado', ligado);
            statusElement.classList.toggle('status-desligado', !ligado);
        }
    }

    // Função auxiliar para animar o veículo
    function animarVeiculo(tipo, acao) {
        const imgElement = document.getElementById(`${tipo}-img`);
        if (imgElement) {
            imgElement.classList.add(acao);
            setTimeout(() => {
                imgElement.classList.remove(acao);
            }, 300);
        }
    }

    // Classe Veiculo (Classe base)
    class Veiculo {
        constructor(modelo, cor) {
            this.modelo = modelo;
            this.cor = cor;
            this.ligado = false;
            this.velocidade = 0;
        }

        ligar() {
            if (!this.ligado) {
                this.ligado = true;
                tocarSom(somLigar);
                atualizarStatusVeiculo(this.constructor.name.toLowerCase(), this.ligado);
            } else {
                mostrarAlerta("O veículo já está ligado!");
            }
        }

        desligar() {
            if (this.ligado) {
                this.ligado = false;
                this.velocidade = 0; // reset velocidade
                tocarSom(somDesligar);
                atualizarStatusVeiculo(this.constructor.name.toLowerCase(), this.ligado);
                this.atualizarVelocidade();
            } else {
                mostrarAlerta("O veículo já está desligado!");
            }
        }

        atualizarVelocidade() {
            const tipo = this.constructor.name.toLowerCase();
            atualizarInfoVeiculo(tipo, { velocidade: this.velocidade });
        }

        exibirInformacoes() {
            return `Modelo: ${this.modelo}, Cor: ${this.cor}, Estado: ${this.ligado ? 'Ligado' : 'Desligado'}, Velocidade: ${this.velocidade}`;
        }
        //Métodos "vazios" para que os veículos tenham, caso não seja necessário utilizar
        acelerar(){}
        frear(){}
        buzinar(){}
    }

    // Classe Carro (Herda de Veiculo)
    class Carro extends Veiculo {
        acelerar() {
            if (this.ligado) {
                this.velocidade += 10;
                tocarSom(somAcelerar);
                animarVeiculo(this.constructor.name.toLowerCase(), 'acelerando');
                this.atualizarVelocidade();
            } else {
                mostrarAlerta("Ligue o carro antes de acelerar!");
            }
        }

        frear() {
            if (this.ligado && this.velocidade > 0) {
                this.velocidade = Math.max(0, this.velocidade - 10);
                tocarSom(somFrear);
                animarVeiculo(this.constructor.name.toLowerCase(), 'freando');
                this.atualizarVelocidade();
            } else if (!this.ligado) {
                mostrarAlerta("Ligue o carro antes de frear!");
            } else {
                mostrarAlerta("O carro já está parado!");
            }
        }

        buzinar() {
            tocarSom(somBuzina);
        }
    }

    // Classe CarroEsportivo (Herda de Carro)
    class CarroEsportivo extends Carro {
        constructor(modelo, cor) {
            super(modelo, cor);
            this.turboAtivado = false;
        }

        ativarTurbo() {
            if (this.ligado) {
                this.turboAtivado = true;
                this.velocidade += 50;
                this.atualizarTurbo(); // Atualiza o status do turbo na interface
                this.atualizarVelocidade();
                tocarSom(somAcelerar, 0.8); // Som mais intenso
                animarVeiculo(this.constructor.name.toLowerCase(), 'acelerando');
            } else {
                mostrarAlerta("Ligue o carro antes de ativar o turbo!");
            }
        }

        desativarTurbo() {
            if (this.turboAtivado) {
                this.turboAtivado = false;
                this.velocidade = Math.max(0, this.velocidade - 50);
                this.atualizarTurbo(); // Atualiza o status do turbo na interface
                this.atualizarVelocidade();
                tocarSom(somFrear, 0.6); // Som de freio ao desativar o turbo
                animarVeiculo(this.constructor.name.toLowerCase(), 'freando');
            } else {
                mostrarAlerta("O turbo já está desativado!");
            }
        }

        // Método auxiliar para atualizar o status do turbo na interface
        atualizarTurbo() {
            const tipo = this.constructor.name.toLowerCase();
            atualizarInfoVeiculo(tipo, { turbo: this.turboAtivado ? "Ativado" : "Desativado" });
        }

        buzinar() {
            tocarSom(somBuzina, 0.7); // Som diferente para a buzina esportiva
        }
    }

    // Classe Caminhao (Herda de Carro)
    class Caminhao extends Carro {
        constructor(modelo, cor, capacidadeCarga) {
            super(modelo, cor);
            this.capacidadeCarga = capacidadeCarga;
            this.cargaAtual = 0;
        }

        carregar(carga) {
            if (isNaN(carga) || carga <= 0) {
                mostrarAlerta("Por favor, insira uma carga válida!");
                return;
            }

            if (this.cargaAtual + carga <= this.capacidadeCarga) {
                this.cargaAtual += carga;
                atualizarInfoVeiculo(this.constructor.name.toLowerCase(), { carga: this.cargaAtual });
            } else {
                mostrarAlerta("Capacidade máxima de carga excedida!");
            }
        }

        buzinar() {
            tocarSom(somBuzina, 0.9); // Som mais alto para o caminhão
        }

         acelerar() {
            if (this.ligado) {
                this.velocidade += 5;
                tocarSom(somAcelerar);
                animarVeiculo(this.constructor.name.toLowerCase(), 'acelerando');
                this.atualizarVelocidade();
            } else {
                mostrarAlerta("Ligue o caminhão antes de acelerar!");
            }
        }

        frear() {
            if (this.ligado && this.velocidade > 0) {
                this.velocidade = Math.max(0, this.velocidade - 5);
                tocarSom(somFrear);
                animarVeiculo(this.constructor.name.toLowerCase(), 'freando');
                this.atualizarVelocidade();
            } else if (!this.ligado) {
                mostrarAlerta("Ligue o caminhão antes de frear!");
            } else {
                mostrarAlerta("O caminhão já está parado!");
            }
        }
    }

     // Classe Moto (Herda de Veiculo)
    class Moto extends Veiculo {
        acelerar() {
            if (this.ligado) {
                this.velocidade += 15; //Moto acelera mais rápido
                tocarSom(somAcelerar);
                animarVeiculo(this.constructor.name.toLowerCase(), 'acelerando');
                this.atualizarVelocidade();
            } else {
                 mostrarAlerta("Ligue a moto antes de acelerar!");
            }
        }

        frear() {
            if (this.ligado && this.velocidade > 0) {
                this.velocidade = Math.max(0, this.velocidade - 12); //Freio mais potente
                tocarSom(somFrear);
                animarVeiculo(this.constructor.name.toLowerCase(), 'freando');
                this.atualizarVelocidade();
            } else if (!this.ligado) {
                mostrarAlerta("Ligue a moto antes de frear!");
            } else {
                mostrarAlerta("A moto já está parada!");
            }
        }

        buzinar() {
           tocarSom(somBuzina, 0.6);
        }
    }

    // Classe Bicicleta (Herda de Veiculo)
    class Bicicleta extends Veiculo {
        constructor(modelo, cor) {
            super(modelo, cor);
            this.ligado = true; //Bicicleta sempre "ligada" (pronta para uso)
            atualizarStatusVeiculo(this.constructor.name.toLowerCase(), true);
        }

        pedalar() {
            this.velocidade += 1; //Aumenta a velocidade em 1 km/h
            animarVeiculo(this.constructor.name.toLowerCase(), 'acelerando');
            this.atualizarVelocidade();
            atualizarStatusVeiculo(this.constructor.name.toLowerCase(), true);
        }

        frear() {
            if (this.velocidade > 0) {
                this.velocidade = Math.max(0, this.velocidade - 1); //Diminui a velocidade em 1 km/h
                animarVeiculo(this.constructor.name.toLowerCase(), 'freando');
                this.atualizarVelocidade();
            }
            atualizarStatusVeiculo(this.constructor.name.toLowerCase(), true);
        }

        buzinar() {
            tocarSom(somBuzina, 0.4);
        }

         //Para evitar erros, já que bicicleta não tem ligar/desligar
        ligar() {
           mostrarAlerta("Bicicleta está sempre pronta para uso!");
        }

        desligar() {
            mostrarAlerta("Bicicleta não precisa ser desligada!");
        }
    }

    // Objetos dos veículos
    const carro = new Carro("Sedan", "Prata");
    const esportivo = new CarroEsportivo("Ferrari", "Vermelha");
    const caminhao = new Caminhao("Volvo", "Branco", 5000);
    const moto = new Moto("Harley Davidson", "Preto");
    const bicicleta = new Bicicleta("Caloi", "Azul");


    // Esconde todos os containers de veículos inicialmente
    const esconderTodosVeiculos = () => {
        document.querySelectorAll('.veiculo-container').forEach(container => {
            container.style.display = 'none';
        });
    }

    esconderTodosVeiculos();

    // Event listeners para seleção de veículo
    document.querySelectorAll('#veiculo-selection button').forEach(button => {
        button.addEventListener('click', function() {
            const veiculoTipo = this.dataset.veiculo;
            esconderTodosVeiculos();
            document.getElementById(`${veiculoTipo}-container`).style.display = 'block'; // Mostra o container do veículo selecionado
        });
    });

    // Event listeners para ações dos veículos (agora dentro dos containers)
    document.querySelectorAll('.veiculo-container button').forEach(button => {
        button.addEventListener('click', function() {
            const acao = this.dataset.acao;
            const tipo = this.dataset.tipo;  // Obtenha o tipo do veículo a partir do botão

            let veiculo;
            switch (tipo) {
                case 'carro':
                    veiculo = carro;
                    break;
                case 'esportivo':
                    veiculo = esportivo;
                    break;
                case 'caminhao':
                    veiculo = caminhao;
                    break;
                case 'moto':
                    veiculo = moto;
                    break;
                case 'bicicleta':
                    veiculo = bicicleta;
                    break;
                default:
                    console.error('Tipo de veículo inválido:', tipo);
                    return; // Aborta a execução se o tipo for inválido
            }

            switch (acao) {
                case 'ligar':
                    veiculo.ligar();
                    break;
                case 'desligar':
                    veiculo.desligar();
                    break;
                case 'acelerar':
                    veiculo.acelerar();
                    break;
                case 'frear':
                    veiculo.frear();
                    break;
                case 'buzinar':
                    veiculo.buzinar();
                    break;
                case 'ativarTurbo':
                    if (veiculo instanceof CarroEsportivo) {
                        veiculo.ativarTurbo();
                    } else {
                        mostrarAlerta("Apenas carros esportivos têm turbo!");
                    }
                    break;
                case 'desativarTurbo':
                    if (veiculo instanceof CarroEsportivo) {
                        veiculo.desativarTurbo();
                    } else {
                        mostrarAlerta("Apenas carros esportivos têm turbo!");
                    }
                    break;
                case 'carregar':
                    if (veiculo === caminhao) {
                        const cargaInput = document.getElementById('carga');
                        const carga = parseInt(cargaInput.value);
                        caminhao.carregar(carga);
                    } else {
                        mostrarAlerta("Apenas caminhões podem ser carregados!");
                    }
                    break;
                case 'pedalar':
                    bicicleta.pedalar();
                    break;
            }
        });
    });
});