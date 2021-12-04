const knex = require('../conexao');
const { schemaCadastrarSquad } = require('../schema/schemaSquad');
const isValid = require('date-fns/isValid');

const cadastrarSquad = async (req, res) => {
    const { name } = req.body;

    try {
        await schemaCadastrarSquad.validate(req.body);

        const cadastroUsuario = await knex('squad').insert({ name }).returning('*');

        if (!cadastroUsuario) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o squad.' });
        }

        res.status(201).json({ mensagem: 'Squad cadastrado com sucesso!' });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


const listarHorasGastas = async (req, res) => {
    const { squad_id, periodoInicio, periodoFim } = req.params;

    const dataInicioValida = isValid(new Date(periodoInicio));
    const dataFimValida = isValid(new Date(periodoInicio));

    if (!dataInicioValida || !dataFimValida || periodoInicio.length != 10 || periodoFim.length != 10) {
        res.status(400).json({ mensagem: "Data no formato inválido! Utilize YYYY-MM-DD." });
    }

    try {
        const verificaSquadId = await knex('squad').where('id', squad_id).first();
        if (!verificaSquadId) {
            return res.status(404).json({ mensagem: "Squad não localizado." });
        }


        const listarHoras = await knex('usuario').distinct('name as nome').sum('report.spent_hours as horas_gastas').join('report', 'user_id', '=', 'usuario.id').whereBetween('report.created_at', [periodoInicio, periodoFim]).where('squad_id', squad_id).groupBy('name');

        if (listarHoras.length < 1) {
            return res.status(404).json({ mensagem: "Não há horas cadastradas nesse período." });
        }
        return res.status(200).json(listarHoras);

    } catch (error) {
        console.log(error.message);
    }
}

const listarTempoTotal = async (req, res) => {
    const { squad_id, periodoInicio, periodoFim } = req.params;

    const dataInicioValida = isValid(new Date(periodoInicio));
    const dataFimValida = isValid(new Date(periodoInicio));

    if (!dataInicioValida || !dataFimValida || periodoInicio.length != 10 || periodoFim.length != 10) {
        res.status(400).json({ mensagem: "Data no formato inválido! Utilize YYYY-MM-DD." });
    }

    try {
        const verificaSquadId = await knex('squad').where('id', squad_id).first();
        if (!verificaSquadId) {
            return res.status(404).json({ mensagem: "Squad não localizado." });
        }

        const listarTotaldeHoras = await knex('usuario').select('squad.name as nome').sum('report.spent_hours as total').join('report', 'user_id', '=', 'usuario.id').join('squad', 'squad.id', '=', 'squad_id').whereBetween('report.created_at', [periodoInicio, periodoFim]).where('squad_id', squad_id).groupBy('squad.name').first();

        if (!listarTotaldeHoras) {
            return res.status(404).json({ mensagem: "Não há horas cadastradas nesse período." });
        }
        return res.status(200).json(listarTotaldeHoras);
    } catch (error) {
        console.log(error.message);
    }
}

function calcDate(date1, date2) {
    let diff = Math.floor(date1.getTime() - date2.getTime());
    let day = 1000 * 60 * 60 * 24;

    let days = Math.floor(diff / day);
    return days;
}

const listarMediaDeHoras = async (req, res) => {
    const { squad_id, periodoInicio, periodoFim } = req.params;

    const dataInicioValida = isValid(new Date(periodoInicio));
    const dataFimValida = isValid(new Date(periodoInicio));

    if (!dataInicioValida || !dataFimValida || periodoInicio.length != 10 || periodoFim.length != 10) {
        res.status(400).json({ mensagem: "Data no formato inválido! Utilize YYYY-MM-DD." });
    }

    try {
        const verificaSquadId = await knex('squad').where('id', squad_id).first();
        if (!verificaSquadId) {
            return res.status(404).json({ mensagem: "Squad não localizado." });
        }

        const listarTotaldeHoras = await knex('usuario').select('squad.name').sum('report.spent_hours as total').join('report', 'user_id', '=', 'usuario.id').join('squad', 'squad.id', '=', 'squad_id').whereBetween('report.created_at', [periodoInicio, periodoFim]).where('squad_id', squad_id).groupBy('squad.name').first();

        if (!listarTotaldeHoras) {
            return res.status(404).json({ mensagem: "Não há horas cadastradas nesse período." });
        }

        const intervalo = calcDate(new Date(periodoFim), new Date(periodoInicio));

        let media = listarTotaldeHoras.total / intervalo;
        return res.status(200).json({ media: media });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { cadastrarSquad, listarHorasGastas, listarTempoTotal, listarMediaDeHoras }