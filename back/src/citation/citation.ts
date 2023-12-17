import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

export class Citation extends Model {}

Citation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        creationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: db,
        modelName: 'Citations',
        tableName: 'citations',
        timestamps: false,
    }
);
