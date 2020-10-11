import React, { Component } from 'react';
import './style.css';

import Button from '../Button';

class Calculadora extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display:  '0',
            calculo: '0',
            ligado: false,
            erro: false
        }
        this.timeout = undefined;
    }

    ligar = () => {
        this.setState({
            ligado: true
        })
    }

    desligar = () => {
        this.setState({
            ligado: false,
            erro: false
        })
        this.resetar();
    }

    isOperator(operator) {
        let operators = ['*', '/', '+', '-'];

        return operators.includes(operator);
    }

    resultado = () => {
        try {
            let { calculo } = this.state;
    
            this.setState({
                // eslint-disable-next-line
                display: eval(calculo).toString(),
                // eslint-disable-next-line
                calculo: eval(calculo).toString()
            })
        } catch(err) {
            this.setState({
                display: 'ERROR',
                calculo: '0',
                erro: true
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    display: '0',
                    calculo: '0',
                    erro: false
                });
            }, 2000)

        }

    }

    calcular = (simbolo, operador) => {
        let { calculo, display } = this.state;

        if (calculo && !calculo.includes('*') && !calculo.includes('/') && !calculo.includes('-') && !calculo.includes('+')) {
            this.setState(prevState => ({
                display: prevState.display + simbolo,
                calculo: prevState.calculo + operador
            }));
        } else {
            if (this.isOperator(calculo[calculo.length - 1])) {
                let newDisplay = display.replace(/[÷×\-+]/, simbolo);
                let newCalculo = calculo.replace(/[/*\-+]/, operador);
                this.setState({
                    display: newDisplay,
                    calculo: newCalculo
                });
            }
        }

    }

    inserirNumero = (numero) => {
        if (numero === ',') {
            numero = '.';

            this.setState(prevState => ({
                display: prevState.display + numero,
                calculo: prevState.calculo + numero
            }));

        } else {
            this.setState(prevState => ({
                display: prevState.display === '0' ? numero : prevState.display + numero,
                calculo: prevState.calculo === '0' ? numero : prevState.calculo + numero
            }));
        }

    }

    resetar = () => {
        this.setState({
            display: '0',
            calculo: '0'
        })
    }

    digitarNumero = (opcao) => {

        if (this.state.ligado && !this.state.erro) {
            switch(opcao) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case ',':
                    this.inserirNumero(opcao);
                    break;
                case '÷':
                    this.calcular('÷', '/');
                    break;
                case '×':
                    this.calcular('×', '*');
                    break;
                case '-':
                    this.calcular('-', '-');
                    break;
                case '+':
                    this.calcular('+', '+');
                    break;
                case '=':
                    this.resultado();
                    break;
                case 'ON':
                    this.ligar();
                    break;
                case 'OFF':
                    this.desligar();
                    break;
                case 'CE':
                case 'C':
                    this.resetar();
                    break;
                default:
                    break;
            }
        }

        switch (opcao) {
            case 'ON':
                this.ligar();
                break;
            case 'OFF':
                this.desligar();
                break;
            default:
                break;
        }

    }

    render() {
        let { display, ligado } = this.state;
        return (
            <section className="calculadora">
                <div className="row">
                    <p className={ligado ? 'display active' : 'display'}>{display}</p>
                </div>
                <div className="row">
                <Button buttonText="CE" acao={this.digitarNumero} />
                <Button buttonText="C" acao={this.digitarNumero} />
                <Button buttonText="ON" class="btn-on" acao={this.digitarNumero} />
                <Button buttonText="OFF" class="btn-danger" acao={this.digitarNumero} />
                </div>
                <div className="row">
                    <Button buttonText="7" acao={this.digitarNumero} />
                    <Button buttonText="8" acao={this.digitarNumero} />
                    <Button buttonText="9" acao={this.digitarNumero} />
                    <Button buttonText="÷" class="btn-primary" acao={this.digitarNumero} />
                </div>
                <div className="row">
                    <Button buttonText="4" acao={this.digitarNumero} />
                    <Button buttonText="5" acao={this.digitarNumero} />
                    <Button buttonText="6" acao={this.digitarNumero} />
                    <Button buttonText="×" class="btn-primary" acao={this.digitarNumero} />
                </div>
                <div className="row">
                    <Button buttonText="1" acao={this.digitarNumero} />
                    <Button buttonText="2" acao={this.digitarNumero} />
                    <Button buttonText="3" acao={this.digitarNumero} />
                    <Button buttonText="-" class="btn-primary" acao={this.digitarNumero} />
                </div>
                <div className="row">
                    <Button buttonText="0" acao={this.digitarNumero} />
                    <Button buttonText="," class="btn-secondary" acao={this.digitarNumero} />
                    <Button buttonText="=" class="btn-primary" acao={this.digitarNumero} />
                    <Button buttonText="+" class="btn-primary" acao={this.digitarNumero} />
                </div>
            </section>
        )
    }
}

export default Calculadora;