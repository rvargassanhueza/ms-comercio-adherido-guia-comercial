const joi = require('joi');

module.exports = joi.extend({
  base: joi.string(),
  name: 'RutValidacion',
  language: {
    RutValido: 'Rut incorrecto',
  },
  rules: [
    {
      name: 'RutValido',
      validate(params, value, state, options) {
        try {
          value = value.split('-').join('').split('.').join('');
          if (!/^[0-9]+[0-9kK]{1}$/.test(value)) {
            return this.createError('formato', { v: value }, state, options);
          }

          const cuerpo = value.slice(0, -1);

          let dv = value.slice(-1).toUpperCase();
          let suma = 0;
          let multiplo = 2;

          for (i=1; i<=cuerpo.length; i++) {
            index = multiplo * value.charAt(cuerpo.length - i);
            suma += index;
            if (multiplo < 7) {
              multiplo += 1;
            } else {
              multiplo = 2;
            }
          }

          const dvEsperado = 11 - (suma % 11);
          dv = (dv == 'K')?10:dv;
          dv = (dv == 0)?11:dv;

          if (dvEsperado != dv) {
            return this.createError('dv invalido', {}, state, options);
          }
        } catch (error) {
          return this.createError('error en la validación', {}, state, options);
        }

        return value;
      }
    }
  ]
});
