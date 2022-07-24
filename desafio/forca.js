class Forca {

  constructor(word) {
    this.palavra = word;
    this.wordSubstitution = this.padraoPalavra()
  }

  tentativas = []; 
  life = 6; 
  acertos = 0; 



  verificarCorrespondencia(letra) { 
    var secret = this.palavra;
    var search;
    var temporaryWord;

    search = secret.match(letra);

    if (search == null) {
      this.life--;
    }

    while (search != null) { 
      temporaryWord = secret.search(letra);
      this.setLetraPalavra(letra, temporaryWord);
      this.acertos++;
      secret = secret.replace(letra, 0);
      search = secret.match(letra); 
    }
  }

  padraoPalavra() {
    var wordToReturn = Array.from(this.palavra);
    for (let i = 0; i < wordToReturn.length; i++) {
      wordToReturn[i] = wordToReturn[i].replace(/[a-zA-z]/g, "_")
    }
    return wordToReturn;
  }

  setLetraPalavra(letra, indexes) {
    let wordSubstitution = this.wordSubstitution;
    for (let i = 0; i < wordSubstitution.length; i++) {
      if (i == indexes) {
        wordSubstitution[i] = wordSubstitution[i].replace("_", letra);
      }
    }
    return wordSubstitution;
  }


  chutar(letra) {
    if (this.tentativas.includes(letra) || letra === '' || letra === ' ') {
      console.log('Verifique a letra')
    } else {
      this.tentativas.push(letra);
      this.verificarCorrespondencia(letra);
      return this.tentativas;
    }
  }

  buscarEstado() {
    var size = this.palavra.length;

    if (this.acertos == size && this.life > 0) {
      return "ganhou"
    }
    if (this.life > 0 && this.acertos <= size) {
      return "aguardando chute"
    } else {
      return "perdeu"
    }


  } 

  buscarDadosDoJogo() {
    return {
      letrasChutadas: this.tentativas, 
      vidas: this.life, 
      palavra: this.wordSubstitution,
      acertos: this.acertos
    }
  }
}

module.exports = Forca;