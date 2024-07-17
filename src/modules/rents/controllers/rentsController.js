class rentsController {
  constructor(rentsService) {
    this.rentsService = rentsService;
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
    const rents = await this.rentsService.getRents();
    try {
      res.render("rents/views/allRents.html", {
        rents,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async rentsCarForm(req, res) {
    res.render("rents/views/rentForm.html");
  }

  async rentCar(req, res) {
    //terminar luego cuando sepa los datos exactamente
    const { id, startDate, finishDate } = req.body;
    try {
      await this.rentsService.rentCar();
      res.redirect("/rents");
    } catch (error) {
      console.log(error);
    }
  }
}