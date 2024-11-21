import { DataTypes, Model, Sequelize, Optional, HasOneSetAssociationMixin } from 'sequelize';

interface UserSubjectAttributes{
    user_id: number;
    subject_id:number;
}

/*
This model defines the meadiary table 
that is going to represent the many to many 
relationship between users and subjects
*/ 

export class UserSubjects extends Model<UserSubjectAttributes> implements UserSubjectAttributes{
    public user_id!: number;
    public subject_id!:number;
}
export const UserSubjectsModel = (sequelize: Sequelize) =>{
    UserSubjects.init(
        {
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Users',
                key: 'id',
            },
        },
        subject_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Subjects',
                key: 'id',
            },
        },
    },
        {
            sequelize,
            tableName: 'user_subjects',
        }
    );
    return UserSubjects;
};