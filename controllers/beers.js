import { Beer } from '../models/beer.js'

function index(req, res) {
  Beer.find({})
  .then (beers => {
    res.render('beers/index', {
      beers,
      title: "Beers"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.great = !!req.body.great
  Beer.create(req.body)
  .then(beer => {
    res.redirect('/beers')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beers')
  })
}

function show(req, res) {
  Beer.findById(req.params.id)
  .populate("owner")
  .then(beer => {
    res.render('beers/show', {
      beer,
      title: "Beers showing"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beers')
  })
}

export {
  index,
  create,
  show,
}