module.exports = {
  apps : [{
    script: 'dist/server/index.js',
    watch: '.'
  }],

  deploy : {
    production : {
      ref  : 'origin/master',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
