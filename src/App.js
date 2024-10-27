import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './index.css';

function App() {
  const [redeemed, setRedeemed] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Cria um link para pré-conectar ao Google Fonts
    const link1 = document.createElement('link');
    link1.rel = 'preconnect'; // Define o tipo do link como pré-conexão
    link1.href = 'https://fonts.googleapis.com'; // Define o href para o Google Fonts

    // Cria outro link para pré-conectar aos recursos do Google Fonts
    const link2 = document.createElement('link');
    link2.rel = 'preconnect'; // Pré-conexão
    link2.href = 'https://fonts.gstatic.com'; // Define o href para recursos estáticos do Google Fonts
    link2.crossOrigin = 'true'; // Define que o link pode ser acessado de outra origem

    // Cria o link da fonte que você deseja importar
    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&display=swap'; // URL da fonte
    link3.rel = 'stylesheet'; // Define o tipo como stylesheet para fontes

    // Adiciona os links criados ao cabeçalho do documento
    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);

    // Função de limpeza para remover os links ao desmontar o componente
    return () => {
      document.head.removeChild(link1); // Remove o link de pré-conexão ao desmontar
      document.head.removeChild(link2); // Remove o segundo link de pré-conexão
      document.head.removeChild(link3); // Remove o link da fonte
    };
  }, []); // O array vazio significa que esse efeito só roda uma vez, após a montagem do componente


  const handleRedeem = () => {
    setAnimating(true);
    setTimeout(() => {
      setRedeemed(true);
      setAnimating(false);
    }, 200);
  };

  const handleReset = () => setRedeemed(false);

  useEffect(() => {
    const audio = new Audio('/mp3');
    if (redeemed) audio.play();
    return () => audio.pause();
  }, [redeemed]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container" style={{ display: 'flex', height: '100vh' }}>
      <div
        className="left"
        style={{
          flex: 1,
          backgroundImage: `url('${redeemed ? '/new-background.png' : '/background.png'
            }')`, // Troca de imagem com base no estado `redeemed`
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="right">
        {redeemed && <Confetti width={width} height={height} />}
        {!redeemed ? (
          <div className="card">
            <h1 style={{ fontFamily: 'Playwrite GB S, cursive' }}>Feliz Dia (Atrasado 🤣) </h1>
            <p style={{ fontFamily: 'Playwrite GB S, cursive' }}>
              Meu caro, dia 08/08 passou, há muito tempo, inclusive, mas não esqueci 😅.
              Então venho por meio desse pequeno código (vale ressaltar que eu e o chat levamos o dia todo para fazer), te fazer um convite do qual não colocarei a opção de "aceito" ou "não aceito" pois sua opnião é inválida.
            </p>
            <p style={{ fontFamily: 'Playwrite GB S, cursive' }}>
              Então em comemoração desse dia fictício que criamos, chegou minha vez de fazer uma pequena surpresa digna e a nossa cara! 🎉🎉🎉
              <br />
              Fiquei dias pensando em como poderiamos festejar nosso dia e acredito que descobri um jeito legal e que sempre me lembra de você e que me traz memórias doces.🥰
            </p>
            <p>
              👀 Aperte o botão abaixo e acabe com sua curiosidade.👀
            </p>
            <button
              style={{ fontFamily: 'Playwrite GB S, cursive' }}
              className={`button ${animating ? 'animated' : ''}`}
              onClick={handleRedeem}
            >
              Resgatar Presente
            </button>
          </div>
        ) : (
          <div className="card redeemed">
            <h2 style={{ fontFamily: 'Playwrite GB S, cursive' }}>Você acaba de ganhar... 🥁🥁🥁</h2>
            <h1
              style={{
                fontFamily: 'Playwrite GB S',
                fontWeight: 'bold',
                color: 'black',
                fontSize: '1.5rem', // Ajuste o tamanho para destacar mais
                textShadow: `
               -1px -1px 0 white,  
               1px -1px 0 white,  
              -1px 1px 0 white,  
               1px 1px 0 white
    `, // Cria a borda preta ao redor do texto
              }}
            >
               VALE CAFÉ SUPERFATURADO GRÁTIS ☕
            </h1>
            <p style={{ fontFamily: 'Playwrite GB S, cursive' }}>Escolha o dia e o lugar, meu presente é garantido!</p>
            <p style={{ fontFamily: 'Playwrite GB S, cursive' }}>
              <strong>Obs:</strong> Presente válido após o desbloqueio do meu cartão 😅
            </p>
            <button className="button back-button" onClick={handleReset}>
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
