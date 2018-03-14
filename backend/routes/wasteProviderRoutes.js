const mongoose = require('mongoose');
const WasteProvider = mongoose.model('WasteProvider');

module.exports = app => {
  app.get('/api/waste_providers', async (req, res) => {
    const wasteMgmts = await WasteProvider.find({});
    res.send(wasteMgmts);
  });

  app.get('/api/waste_providers/:id', async (req, res) => {
    const wasteProvider = await WasteProvider.find({ _id: req.params.id });
    res.send(wasteProvider);
  });

  /*
   Comment this before pushing to master.  uncomment for easy manipulation on
   WasteProviders database before loading scripts feature is completed
  app.post('/api/waste_provider', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      res.send(400);
    }

    const wasteProvider = new WasteProvider({
      name,
      email,
      phone
    });

    const data = await wasteProvider.save();
    res.send(data);
  });

  app.delete('/api/waste_providers/:id', async (req, res) => {
    WasteProvider.findByIdAndRemove(req.params.id, (err, wasteProvider) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: 'Waste Provider successfully deleted',
        id: wasteProvider._id
      };
      return res.status(200).send(response);
    });
  });
  */
};
