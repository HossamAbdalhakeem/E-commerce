export default {
  validEmail: (v) => /.+@.+\..+/.test(v) || "Email must be correct",
  NameRequired: (v) => !!v || "Please enter the name",
  nameLength: (v) =>
    (v && v.length <= 10) ||
    "You must enter a name of no more than ten characters",
  minNameLen: (len) => (v) =>
    (v || "").length >= len || ` The name must be at least ${len} characters`,
  length: (len) => (v) =>
    (v || "").length >= len || ` Not enough number required ${len} numbers`,
  password: (v) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "It must contain an uppercase letter, lowercase letter, a number, and a special character such as !",

  required: (v) => !!v || "required",
  confirmPassword: (value) =>
    value === this.newUser.password || "Password does not match",
};
