class RentsController {
  /**
   * Initializes a new instance of the class with the specified rents service, cars service, and user service.
   *
   * @param {Object} rentsService - The rents service to be used by the class.
   * @param {Object} carsService - The cars service to be used by the class.
   * @param {Object} userService - The user service to be used by the class.
   */
  constructor(rentsService, carsService, userService) {
    this.rentsService = rentsService;
    this.carsService = carsService;
    this.userService = userService;
  }

  /**
   * Configures the application routes for rent-related operations.
   *
   * @param {Object} app - The application instance to configure routes for.
   * @return {void}
   */
  rentsRoutes(app) {
    const root = '/rents';
    app.get(`${root}`, this.rentsPage.bind(this));
    app.get(`${root}/rentForm`, this.rentForm.bind(this));
    app.post(`${root}/rentForm`, this.rentCar.bind(this));
    app.get(`${root}/editRent/:id`, this.editRentForm.bind(this));
    app.post(`${root}/editRent/:id`, this.editRent.bind(this));
    app.get(`${root}/deleteRent/:id`, this.deleteRent.bind(this));
  }

  async rentsPage(req, res) {
    try {
      const rentedCars = await this.rentsService.getAllRents();
      res.render('rents/views/allRents.html', { rentedCars });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener las rentas');
    }
  }

  async rentForm(req, res) {
    try {
      const { users, cars } = await this.rentsService.getRentFormDetails();
      res.render('rents/views/rentForm.html', { users, cars });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al cargar el formulario de renta');
    }
  }

  async rentCar(req, res) {
    try {
      const rentData = req.body;
      await this.rentsService.rentCar(rentData);
      res.redirect('/rents');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al registrar la renta');
    }
  }

  async editRentForm(req, res) {
    try {
      const rentId = req.params.id;
      const { rentData, users, cars } =
        await this.rentsService.getEditRentFormDetails(rentId);
      await this.carsService.getAllCars();
      await this.userService.getAllUsers();
      res.render('rents/views/editRent.html', { rentData, users, cars });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al cargar el formulario de edición de renta');
    }
  }

  async editRent(req, res) {
    try {
      const rentId = req.params.id;
      const rentData = req.body;
      await this.rentsService.editRent(rentId, rentData);
      res.redirect('/rents');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al editar la renta');
    }
  }

  async deleteRent(req, res) {
    try {
      const rentId = req.params.id;
      await this.rentsService.deleteRent(rentId);
      res.redirect('/rents');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al eliminar la renta');
    }
  }
}

module.exports = RentsController;
