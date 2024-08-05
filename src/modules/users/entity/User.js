class User {
  /**
   * Creates a new User object with the given parameters.
   *
   * @param {number} id - The unique identifier of the user.
   * @param {string} name - The name of the user.
   * @param {string} surname - The surname of the user.
   * @param {number} age - The age of the user.
   * @param {number} phone - The phone number of the user.
   * @param {string} email - The email address of the user.
   * @param {number} document - The document number of the user.
   */
  constructor(id, name, surname, age, phone, email, document) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.phone = phone;
    this.email = email;
    this.document = document;
  }
}

module.exports = User;
