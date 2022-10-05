import { Beer } from '../models/beer.js'
import { Profile } from '../models/profile.js'

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
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.favorites.push(beer._id)
      profile.save()
      res.redirect('/beers')
    })
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

function flipGreat(req, res) {
  Beer.findById(req.params.id)
  .then(beer => {
    beer.great = !beer.great
    beer.save()
    .then(()=> {
      res.redirect(`/beers/${beer._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beers')
  })
}

function edit (req, res) {
  Beer.findById(req.params.id)
  .then(beer => {
    res.render('beers/edit', {
      beer, 
      title: "edit beer"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/beers')
  })
}

function update(req, res) {
  Beer.findById(req.params.id)
  .then(beer => {
    if (beer.owner.equals(req.user.profile._id)) {
      req.body.great = !!req.body.great
      beer.updateOne(req.body)
      .then(()=> {
        res.redirect(`/beers/${beer._id}`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/beers`)
  })
}

function deleteBeer(req, res) {
  Beer.findById(req.params.id)
  .then(beer => {
    if (beer.owner.equals(req.user.profile._id)) {
      beer.delete()
      .then(() => {
        res.redirect('/beers')
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }   
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
  flipGreat,
  edit,
  update,
  deleteBeer as delete,
}