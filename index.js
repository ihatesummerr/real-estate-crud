require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const estateRouter = require('./routes/estate.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/estate', estateRouter);

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => {
        console.error(err);
    });

mongoose.set('useFindAndModify', false);
