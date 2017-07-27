import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import config from './config.json'

firebase.initializeApp(config)

export default class extends Component {
  captchaHandle = () =>
  firebase.auth().signInWithPhoneNumber(document.getElementById('fono').value, new firebase.auth.RecaptchaVerifier('captcha'))
  .then(res => { console.log('SMS enviado:', res); window.confirmationResult = res })
  .catch(err => console.log('error enviando:', err))

  verificationHandle = () =>
  window.confirmationResult.confirm(document.getElementById('code').value)
  .then(res => console.log('EXITO!!', res))
  .catch(err => console.log('error verificando:', err))

  render() {
    return (
      <div>
        <div id="captcha"></div><br/>
        <input id="fono" />
        <button onClick={ this.captchaHandle } >Enviar SMS</button>
        <br/><br/>
        <input id="code" />
        <button onClick={ this.verificationHandle } >Verificar</button>
      </div>
    )
  }
}