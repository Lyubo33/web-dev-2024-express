import { DataTypes, Model, Sequelize, Optional, HasOneSetAssociationMixin } from 'sequelize';

interface SubjectAttributes{
    id:number;
    name:string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

export class Subjects extends Model<SubjectAttributes,SubjectCreationAttributes> implements SubjectAttributes{
    public id!: number;
    public name!:string;
}
export const SubjectsModel = (sequelize: Sequelize) =>{
    Subjects.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'subjects',
        }
    );
    return Subjects;
};