const mongoose = require("mongoose");
const helper = require("../helpers/basic.helper");
const PrettyError = require("pretty-error");

const pe = new PrettyError();

const Filter = mongoose.model("Filter");

module.exports = {
    create: async (req, res) => {
        try {
            const { label, expression, fields } = req.body;

            if (!label || !expression) {
                return res.status(400).json({
                    msg: 'no labe or expression'
                });
            }

            const filter = new Filter({
                label,
                expression,
                fields: fields || [],
                ownerId: req.payload.id,
            });

            await filter.save();

            res.status(200).json({
                msg: 'filter created'
            });
        } catch (e) {
            helper.log(pe.render(e), "ROUTE: /api/filter/create", "red");
            res.status(500).json({
                msg: e,
            });
        }
    },
    getOwned: async (req, res) => {
        try {
            const filters = await Filter.find({ ownerId: req.payload.id });

            res.status(200).json(filters);
        } catch (e) {
            helper.log(pe.render(e), "ROUTE: /api/filter/getOwned", "red");
            res.status(500).json({
                msg: e,
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const filter = await Filter.findById(id);

            if (!filter) {
                return res.status(404).json({
                    msg: 'filter not found'
                });
            }

            res.status(200).json(filter);
        } catch (e) {
            helper.log(pe.render(e), "ROUTE: /api/filter/getById", "red");
            res.status(500).json({
                msg: e,
            });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.body;
            const { label, expression, fields } = req.body;

            const filter = await Filter.findById(id);

            if (!filter) {
                return res.status(404).json({
                    msg: 'filter not found'
                });
            }

            filter.label = label;
            filter.expression = expression;
            filter.fields = fields || [];

            await filter.save();

            res.status(200).json({
                msg: 'filter updated'
            });
        } catch (e) {
            helper.log(pe.render(e), "ROUTE: /api/filter/update", "red");
            res.status(500).json({
                msg: e,
            });
        }
    }
}