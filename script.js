let intervalo;
let esperando = false;

function clicarEVerificar() {
    if (esperando) return;

    const link = [...document.querySelectorAll('a')].find(a => a.textContent.trim() === 'R$ 2.194,40'); 

    if (link) {
        esperando = true;
        link.click(); 
        console.log('Clique no link realizado!'); 

        setTimeout(() => {
            try {
                const radios = document.querySelectorAll('input[type="radio"][name="cota"]'); 
                let numerosEncontrados = []; 

                radios.forEach(radio => { 
                    const valor = parseInt(radio.value, 10); 

                    if (!isNaN(valor) && valor >= 1000 && valor <= 1500) { 
                        console.log(`Número encontrado: ${valor}`); 
                        numerosEncontrados.push(valor); 

                        radio.style.border = '3px solid red'; 
                        radio.style.backgroundColor = 'rgba(255, 255, 0, 0.2)'; 
                        radio.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.6)';
                    } 
                });

                if (numerosEncontrados.length > 0) { 
                    console.log('Números encontrados:', numerosEncontrados.join(', ')); 
                    clearInterval(intervalo);
                } else {
                    console.log('Nenhum número encontrado. Continuando a busca...');
                }
            } catch (error) {
                console.error('Erro durante a verificação:', error);
            } finally {
                esperando = false;  
            }
        }, 8000);  
    } else {
        console.log('Link não encontrado!');
    }
}

intervalo = setInterval(clicarEVerificar, 10000);
