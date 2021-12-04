const knex = require('../conexao');
const { schemaCadastrarUsuario } = require('../schema/schemaUsuario');

const cadastrarUsuario = async (req, res) => {
    const { name, squad_id, user_estimated_hours } = req.body;

    try {
        await schemaCadastrarUsuario.validate(req.body);

        const validarSquad = await knex('squad').where('id', squad_id).first();

        if (!validarSquad) {
            return res.status(404).json({ mensagem: 'Squad não encontrado.' });
        }

        const cadastroUsuario = await knex('usuario').insert({ name, squad_id, user_estimated_hours }).returning('*');

        if (!cadastroUsuario) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário.' });
        }

        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { cadastrarUsuario }