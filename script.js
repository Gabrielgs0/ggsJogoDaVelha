const jogoDaVelha = {

    tabuleiro: ['','','','','','','','',''],
    symbols: {
                options: ['O','X'],
                virada: 0,
                change(){
                    this.virada = ( this.virada === 0 ? 1:0 );
                }
            },
    container_element: null,
    gameover: false,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // FUNCTIONS
    init(container) {
        this.container_element = container;
    },

    jogabilidade(position) {
        if (this.gameover || this.tabuleiro[position] !== '') return false;

        const simboloAtual = this.symbols.options[this.symbols.virada];
        this.tabuleiro[position] = simboloAtual;
        this.draw();

        const winning_sequences_index = this.check_winning_sequences(simboloAtual);
        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.tipo_de_vitoria(this.winning_sequences[winning_sequences_index]);
        } else {
            this.symbols.change();
        }

        return true;
    },

    tipo_de_vitoria(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    check_winning_sequences(symbol) {

        for ( i in this.winning_sequences ) {
            if (this.tabuleiro[ this.winning_sequences[i][0] ] == symbol  &&
                this.tabuleiro[ this.winning_sequences[i][1] ] == symbol &&
                this.tabuleiro[ this.winning_sequences[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    game_is_over() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    is_game_over() {
        return !this.tabuleiro.includes('');
    },

    start() {
        this.tabuleiro.fill('');
        this.draw();
        this.gameover = false;       
    },

    restart() {
        if (this.is_game_over() || this.gameover) {
            this.start();
        } else if (confirm('esse jogo ainda não acabou! Deseja reiniciar a partida')) {
            this.start();
        }
    },

    draw() {
        this.container_element.innerHTML = this.tabuleiro.map((element, index) => `<div onclick="jogoDaVelha.jogabilidade('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};
