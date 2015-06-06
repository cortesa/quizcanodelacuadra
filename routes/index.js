var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET página de inicio. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
/* GET página de autor. */
router.get('/autor', function(req, res) {
  res.render('autor', { title: 'Creditos' });
});
// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


module.exports = router;
