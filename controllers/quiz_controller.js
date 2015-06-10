var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

// GET /quizes/
exports.index = function(req, res) {
  if(( req.query.tema !== undefined)) {//filtro por temas si tema está definido
    var temas = req.query.tema;
    models.Quiz.findAll(
      {
        where: {
          tema: temas
        },
        //limit: 1
        order: ["tema"]
      }
    ).then(
      function (quizes) {
        res.render('quizes/index', { quizes: quizes, errors:[]});
      }
    ).catch(function (error) { next(error); });
  }
  else if( req.query.search !== undefined) {//si search esta definida filtro por search
    var searchs = req.query.search.replace(/\s/g, "%");
    models.Quiz.findAll(
      {
        where: {
          pregunta: {$like: '%' + searchs + '%'}
        },
        //limit: 1
        order: ["pregunta"]
      }
    ).then(
      function (quizes) {
        res.render('quizes/index', { quizes: quizes, errors:[]});
      }
    ).catch(function (error) { next(error); });
  }
  
  
  // si search o tema son indefinidas muestro todas
 else {
    models.Quiz.findAll().then(
      function (quizes) {
        res.render('quizes/index', { quizes: quizes, errors:[]});
      }
    ).catch(function (error) { next(error); });
  }  
};

// GET /quizes/:id
exports.show = function (req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors:[]});
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, 
                               respuesta: resultado,
                               errors:[]
                              });
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "tema"}
  );

  res.render('quizes/new', {quiz: quiz,errors:[]});
};

// POST /quizes/create el usuario crea preguntas
exports.create = function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  quiz
    .validate()
    .then(
      function (err) {
        if (err) {
          res.render('quizes/new', {quiz: quiz, errors: err.errors});
        } else {
      // guarda en DB los campos pregunta y respuesta de quiz y entonces nos redirige a la pagina de preuntas
          quiz//
            .save({fields: ["pregunta", "respuesta", "tema"]})// guarda en DB los campos pregunta y respuesta y tema 
            .then(function () {
              res.redirect('/quizes'); // res.redirect: Redirección HTTP a lista de preguntas 
            });
        }
      }
    ).catch(function(error){next(error)});
};
// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  ).catch(function(error){next(error)});
};
// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};