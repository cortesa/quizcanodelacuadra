var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};
//función de búsqueda

// GET /quizes/
exports.index = function(req, res) {
   if(req.query.search === undefined){
     models.Quiz.findAll().then(
    function (quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch (function (error) { next(error);});
   } 
  else{//añado código de fitrado de preguntas
  var searchs=req.query.search.replace(" ", "%");
    console.log();
    models.Quiz.findAll(
    
    {
         where:{
        pregunta:{$like: '%'+searchs+'%'}
              },
        //limit:1
     order:["pregunta"]
      }
      
   
  ).then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch(function(error) { next(error);});
}
  };

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};