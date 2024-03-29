var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET página de inicio. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});
/* GET página de autor. */
router.get('/autor', function(req, res) {
  res.render('autor', { title: 'Creditos', errors:[] });
});
// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId

//Definición de las rutas de sesión
router.get('/login',                       sessionController.new);//mostrar formulario login
router.post('/login',                      sessionController.create);//crear sesion
router.get('/logout',                      sessionController.destroy);//destruir sesion

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
// rutas de crear preguntas
router.get('/quizes/new',                  sessionController.loginRequired , quizController.new);
router.post('/quizes/create',              sessionController.loginRequired , quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired , quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired , quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired , quizController.destroy);

// rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',              commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);//moderacion de comentarios
module.exports = router;
