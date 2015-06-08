// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { pregunta:{  
                type:DataTypes.STRING,
                  validate: { 
                    notEmpty: {msg: "-> Falta Pregunta"},
                    //not:{ args:/Pregunta/,msg:'-> Escriba alguna pregunta'}
                  }     
                 },
              respuesta: {  
                type:DataTypes.STRING,
                validate: { 
                  notEmpty: {msg: "-> Falta Respuesta"},
                    //not:{ args:/Respuesta/,msg:'-> Escriba alguna respuesta'}
                          
                          }       
                 }
            });
}