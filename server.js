// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// // const userRoutes = require('./src/routes/userRoutes');

// const app = express();

// // Set up middleware
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Set up routes
// // app.use('/users', userRoutes);

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });

const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
