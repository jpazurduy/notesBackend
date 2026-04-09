const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 'mongodb+srv://jpazurduy:Control123@notescluster.fbe2baj.mongodb.net/?appName=NotesCluster'
             

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'JavaScript is easy',
  important: true,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({important :true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})