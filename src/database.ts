import { Sequelize } from 'sequelize';
import { UserModel } from './user/user';
import { UniversityModel } from './university/university';
import { SubjectsModel } from './Subjects/subjects';
import { UserSubjectsModel } from './UserSubjects';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', // SQLite database file path
});

export const db = {
    sequelize,
    Sequelize,
    models: {
        User: UserModel(sequelize),
        University: UniversityModel(sequelize),
        Subjects: SubjectsModel(sequelize),
        UserSubjects: UserSubjectsModel(sequelize),
    },
};

db.models.User.belongsTo(db.models.University, {
    foreignKey: 'universityId',
    as: 'university',
});

db.models.University.hasMany(db.models.User, {
    foreignKey: 'universityId',
    as: 'users',
});

//Defining many-to-many because many subjects can belong to many users and a user can have many subjects
db.models.User.belongsToMany(db.models.Subjects,{
    through: 'user_subjects',
    foreignKey: 'user_id',
    otherKey: 'subject_id',
});
db.models.Subjects.belongsToMany(db.models.User,{
    through: 'user_subjects',
    foreignKey: 'subject_id',
    otherKey: 'user_id',
});

