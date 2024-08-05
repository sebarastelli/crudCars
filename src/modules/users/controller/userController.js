class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  userRoutes(app) {
    const root = `/users`;
    app.get(`${root}`, this.userPage.bind(this));
    app.get(`${root}/register`, this.registerUserForm.bind(this));
    app.post(`${root}/register`, this.registerUser.bind(this));
    app.get(`${root}/editUser/:id`, this.editUserForm.bind(this));
    app.post(`${root}/editUser/:id`, this.editUser.bind(this));
    app.get(`${root}/deleteUser/:id`, this.deleteUser.bind(this));
  }

  async userPage(req, res) {
    try {
      const usersData = await this.userService.getAllUsers();
      res.render('users/views/allUsers.html', { usersData });
    } catch (error) {
      res.render('users/views/allUsers.html', {
        error: 'Error retrieving users.',
      });
    }
  }

  registerUserForm(req, res) {
    res.render('users/views/register.html');
  }

  async registerUser(req, res) {
    try {
      const formData = req.body;
      await this.userService.createUser(formData);
      res.redirect('/users');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/users/register');
    }
  }

  async editUserForm(req, res) {
    const id = req.params['id'];
    try {
      const userData = await this.userService.getUserById(id);
      res.render('users/views/edit.html', { userData });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/users');
    }
  }

  async editUser(req, res) {
    const userData = {
      id: req.params.id,
      name: req.body.name,
      surname: req.body.surname,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      document: req.body.document,
    };
    try {
      await this.userService.editUser(userData);
      res.redirect('/users');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect(`/users/editUser/${req.params.id}`);
    }
  }

  async deleteUser(req, res) {
    try {
      await this.userService.deleteUser(req.params['id']);
      res.redirect('/users');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/users');
    }
  }
}

module.exports = UserController;
