module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: '¿Cuál es el nombre para tu nuevo proyecto?',
        default: this.outFolder,
        filter: val => val.toLowerCase(),
      },
      {
        name: 'description',
        message: '¿Cuál es la descripción del proyecto?',
        default({ name }) {
          return `${name} el super proyecto`;
        },
      },
      {
        name: 'username',
        message: '¿Cuál es tu usuario de GitHub?',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: '¿Cuál es tu correo electrónico?',
        default: this.gitUser.email,
        store: true
      },
      {
        name: 'website',
        message: 'La URL de tu sitio web',
        default({ username }) {
          return `github.com/${username}`
        },
        store: true
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore'
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  }
}
