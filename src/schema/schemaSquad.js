const yup = require('./config');

const schemaCadastrarSquad = yup.object().shape({
    name: yup.string().required({ mensagem: 'O campo "name" deve ser preenchido.' }),
});

module.exports = {
    schemaCadastrarSquad,
};