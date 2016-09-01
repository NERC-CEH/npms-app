module.exports = {
  main: {
    files: [
      // HTML
      {
        src: 'src/*.html', dest: 'dist/main/',
        expand: true, flatten: true,
      },
      // IMAGES
      {
        src: 'src/common/images/*', dest: 'dist/main/images/',
        expand: true, flatten: true,
      },
      // FONTS
      {
        src: 'src/common/vendor/fontello/font/*', dest: 'dist/main/font/',
        expand: true, flatten: true,
      },
    ],
  },
};
