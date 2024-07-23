class RentsController {
  constructor(rentsService, carsService, userService) {
      this.rentsService = rentsService;
      this.carsService = carsService;
      this.userService = userService;
  }

  rentsRoutes(app) {
      const root = "/rents";
      app.get(`${root}`, this.rentsPage.bind(this));
      app.get(`${root}/rentForm`, this.rentsCarForm.bind(this));
      app.post(`${root}/rentForm`, this.rentCar.bind(this));
      app.get(`${root}/editRent/:id`, this.editRentForm.bind(this));
      app.post(`${root}/editRent/:id`, this.editRent.bind(this));
      app.get(`${root}/deleteRent/:id`, this.deleteRent.bind(this));
  }

  async rentsPage(req, res) {
      try {
        const rentedCars = await this.rentsService.getAllRents();
        res.render("rents/views/allRents.html", { rentedCars });
      } catch (error) {
          console.log(error);
      }
  }

  async rentsCarForm(req, res) {
      try {
          const users = await this.userService.getAllUsers();
          const cars = await this.carsService.getAllCars();
          res.render("rents/views/rentForm.html", { users, cars });
      } catch (error) {
          console.log(error);
      }
  }

  async rentCar(req, res) {
    const { car, user, startDate, finishDate } = req.body;
    const totalDays = Math.ceil((new Date(finishDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const rentData = {
        id: Date.now(),
        fk_car: car,
        fk_user: user,
        startDate: new Date(startDate).toISOString(),
        finishDate: new Date(finishDate).toISOString(),
        totalDays
    };
    try {
        await this.rentsService.rentCar(rentData);
        res.redirect("/rents");
    } catch (error) {
        console.log(error);
    }
  }

  async editRentForm(req, res) {
      
      try {
        const rentId = req.params.id;
        const rentData = await this.rentsService.getRentById(rentId);
        rentData.startDate = new Date(rentData.startDate).toISOString().split('T')[0];
        rentData.finishDate = new Date(rentData.finishDate).toISOString().split('T')[0];
        const cars = await this.carsService.getAllCars();
        const users = await this.userService.getAllUsers();
          res.render("rents/views/editRent.html", { rentData, cars, users });
      } catch (error) {
          console.log(error);
      }
  }

  async editRent(req, res) {
    const id = req.params.id;
    const { car, user, startDate, finishDate } = req.body;
    const totalDays = Math.ceil((new Date(finishDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const formData = {
        fk_car: car,
        fk_user: user,
        startDate,
        finishDate,
        totalDays
    };
    try {
        await this.rentsService.editRent({ id, ...formData });
        res.redirect("/rents");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al editar la renta");
    }
  }

  async deleteRent(req, res) {
      const id = req.params.id;
      try {
          await this.rentsService.deleteRent(id);
          res.redirect("/rents");
      } catch (error) {
          console.log(error);
      }
  }
}

module.exports = RentsController;