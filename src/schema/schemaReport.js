const yup = require('./config');

const schemaCadastrarReport = yup.object().shape({
    description: yup.string().required({ mensagem: 'O campo "description" deve ser preenchido.' }),
    user_id: yup.number().required({ mensagem: 'O campo "user_id" deve ser preenchido.' }).positive().integer(),
    spent_hours: yup.number().required({ mensagem: 'O campo "spent_hours" deve ser preenchido.' }).positive().integer(),
});

module.exports = {
    schemaCadastrarReport
};