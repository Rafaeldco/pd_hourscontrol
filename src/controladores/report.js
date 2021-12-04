const knex = require('../conexao');
const { schemaCadastrarReport } = require('../schema/schemaReport');

const cadastrarReport = async (req, res) => {
    const { description, user_id, spent_hours } = req.body;

    try {
        await schemaCadastrarReport.validate(req.body);

        const validarUsuario = await knex('usuario').where('id', user_id).first();

        if (!validarUsuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const cadastroReport = await knex('report').insert({ description, user_id, spent_hours }).returning('*');

        if (!cadastroReport) {
            return res.status(400).json({ mensagem: 'Não foi possível inserir o report.' });
        }

        res.status(201).json({ mensagem: 'Report feito com sucesso!' });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { cadastrarReport }