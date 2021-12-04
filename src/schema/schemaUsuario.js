const yup = require('./config');

const schemaCadastrarUsuario = yup.object().shape({
    name: yup.string().required({ mensagem: 'O campo "name" deve ser preenchido.' }),
    squad_id: yup.number().required({ mensagem: 'O campo "squad_id" deve ser preenchido.' }).positive().integer(),
    user_estimated_hours: yup.number().required({ mensagem: 'O campo "user_estimated_hours" deve ser preenchido.' }).positive().integer()
});

module.exports = {
    schemaCadastrarUsuario
};