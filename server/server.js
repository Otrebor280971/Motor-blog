const express = require('express');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config()

const app = express();
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(express.json());

const pgp = require('pg-promise')();
const cn = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    allowExitOnIdle: true
}
const db = pgp(cn)

app.use(session({
    store: new pgSession({
        pgPromise: db,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10*60*1000, secure: false},
}));

const authenticateSession = (req, res, next) => {
    if ( req.session.id_author) {
        next();
    } else {
        res.sendStatus(401);
    }
};

app.get('/hello', (req, res) => {
    res.json({ message: "Hola" });
});

app.listen(8000, () => {
    console.log('Servidor corriéndose en el puerto 8000');
});


const storage = multer.diskStorage({
    destination: '../client/src/assets/',
    filename: function (req, file, cb){
        const ext = file.originalname.split('.').pop(); 
        
        const safeTitle = req.body.title.replace(/\s+/g, '-'); 
        
        const newFileName = safeTitle + '.' + ext;
        
        cb(null, newFileName);
    }
});

const upload = multer({ storage });


/* ENDPOINTS */

app.get('/posts', (req, res) => {
    const query = `
        SELECT post.*, author.name AS author_name 
        FROM post 
        JOIN author ON post.id_author = author.id_author
    `;

    db.any(query)
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
});

app.get('/posts/:id_post', (req, res) => {

    const query = `
        SELECT post.*, author.name AS author_name 
        FROM post 
        JOIN author ON post.id_author = author.id_author 
        WHERE post.id_post=$1
    `;

    db.one(query,[req.params.id_post])
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
})

app.get('/authors', authenticateSession, (req, res) => {
    const query = 'SELECT id_author, name FROM author ORDER BY name ASC';
    
    db.any(query)
        .then((data) => res.json(data))
        .catch((error) => console.log('ERROR:', error));
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to destroy session');
        }
        res.send('Session destroyed');
    });
});

app.get('/authors/:id_author', authenticateSession, (req, res) => {
    const { id_author } = req.params;

    const query = `
        SELECT id_author, name, username
        FROM author
        WHERE id_author = $1
    `;

    db.oneOrNone(query, [id_author])
        .then((data) => {
            if (!data) {
                return res.sendStatus(404);
            }
            res.json(data);
        })
        .catch((error) => {
            console.log('ERROR:', error);
            res.status(500).send('Error interno');
        });
});

app.get('/session-info', (req, res) => {
    res.json(req.session);
});

app.post('/posts/new', upload.single('image'), function(req, res){
    const query = `
        INSERT INTO post(
            title,
            image,
            text,
            id_author,
            engine,
            hp,
            "weight-kg",
            max_speed_kmh
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    const imagePath = './src/assets/' + req.file.filename; 
    db.none(query, [
        req.body.title,
        imagePath,
        req.body.text,
        req.body.id_author,
        req.body.engine,
        req.body.hp,
        req.body.weight_kg,
        req.body.max_speed_kmh
    ])
    .then(() => {
        res.send({ message: 'Post agregado correctamente' });
    })
    .catch((error) => console.log('Error: ', error));
});

app.post('/login', upload.none(), (req, res, next) => {
    const { username, password } = req.body;

    db.oneOrNone("SELECT * FROM author WHERE username=$1", [username])
    .then((data) => {
        if (data != null){
            if(data.password == password){
                req.session.id_author = data.id_author;
                req.session.save(function (err){
                    if (err) return next(err)
                })
            res.send(req.session);
            } else {
                res.status(401).send('Invalid email/password');
            }
        } else{
            res.status(401).send('Invalid credentials');
        }
    })
    .catch((error) => console.log('ERROR: ', error));
});