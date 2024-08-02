exports.findAll = (req, res) => {
  const routes = {
    '/front/home': 'home.html'

  }

  res.status(200).send(routes)
}
