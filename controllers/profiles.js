import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "PROFILES"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: `Profile ${profile.name}'s profile`,
      profile,
      isSelf,
      getRandomSnacks: () => {
        const snacks = ["🐈", "🐱", "😸", "😹", "😺", "😻", "😼", "😾", "🙀"]
        return snacks[Math.floor(Math.random() * snacks.length)]
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function createSnack(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.snacks.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createSnack,

}